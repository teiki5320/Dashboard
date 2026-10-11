/**
 * GESTION PRO v9.0 - Core Logic
 */

const $ = (id) => document.getElementById(id);

// Échappement HTML. À appliquer à TOUTE donnée insérée dans un gabarit : un
// nom de produit contenant une balise s'exécutait sinon dans la liste des
// réglages. Court exprès — pour qu'il n'y ait aucune raison de s'en passer.
function ech(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Gestion du LocalStorage
const G = {
    get: (k) => JSON.parse(localStorage.getItem(k) || '[]'),
    set: (k, v) => { localStorage.setItem(k, JSON.stringify(v)); },
    val: (k) => localStorage.getItem(k) || '0'
};

// Formatage devise
const eur = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

// Le module Mail a été retiré : ses clés n'ont plus de lecteur. On les efface
// une fois — v90_claude_key est un identifiant d'API, il n'a aucune raison de
// traîner dans le navigateur une fois la fonction partie.
['v90_claude_key', 'v90_gmail_token', 'v90_mail_categories'].forEach((k) => {
    try { localStorage.removeItem(k); } catch (e) {}
});

// Base de données locale
let db = {
    clis: G.get('v90_clis'),
    prods: G.get('v90_prods'),
    ents: G.get('v90_ents'),
    hist: G.get('v90_hist'),
    bls: G.get('v90_bls'),
    drafts: G.get('v90_drafts'),
    prixCli: JSON.parse(localStorage.getItem('v90_prix_cli') || '{}')
};

let curLines = [], blSel = [], curDraftId = null;

// --- NAVIGATION ---
// Historique interne : la flèche ← revient à la page PRÉCÉDENTE (elle allait
// toujours à l'accueil auparavant, quel que soit le chemin parcouru).
const navStack = [];

function showPage(id, _sansHistorique) {
    // L'aperçu d'impression couvre toute la page : sans ça, il restait
    // par-dessus la page suivante et les clics du menu tombaient dessus.
    if ($('preview-wrap') && $('preview-wrap').style.display === 'block') closePreview();
    if (!_sansHistorique && showPage._cur && showPage._cur !== id) {
        navStack.push(showPage._cur);
        if (navStack.length > 30) navStack.shift();
    }
    showPage._cur = id;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    $('page-' + id).classList.add('active');

    $('hd-page-name').innerText = id === 'home' ? 'TABLEAU DE BORD' : id.toUpperCase();
    $('global-back').style.display = (id === 'home') ? 'none' : 'flex';

    if (id === 'facture') $('f-num').value = genNum(); // aperçu ; le numéro définitif est réservé à l'aperçu facture

    window.scrollTo(0, 0);
    renderAll();
}

function goBack() {
    // Dans Mes apps : un premier retour ramène à la vue d'ensemble du module
    // avant de quitter la page (le module définit window.dashBack).
    if (showPage._cur === 'dash' && typeof window.dashBack === 'function' && window.dashBack()) return;
    showPage(navStack.pop() || 'home', true);
}

// Aperçu non engageant du prochain numéro (peut être dépassé si un autre appareil
// facture entre-temps) — le numéro réellement attribué vient de reserveInvoiceNumber().
// SheetJS (lecture et écriture de fichiers Excel) n'est chargé qu'au premier
// import ou export : dans l'en-tête, il bloquait l'affichage jusqu'à quatre
// secondes au premier lancement, pour une bibliothèque que l'accueil n'utilise
// jamais. L'empreinte garantit que le fichier servi est bien celui attendu.
let _xlsxEnCours = null;
function chargerXLSX() {
    if (typeof XLSX !== 'undefined') return Promise.resolve();
    if (_xlsxEnCours) return _xlsxEnCours;
    _xlsxEnCours = new Promise((resoudre, rejeter) => {
        const b = document.createElement('script');
        b.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
        b.integrity = 'sha384-vtjasyidUo0kW94K5MXDXntzOJpQgBKXmE7e2Ga4LG0skTTLeBi97eFAXsqewJjw';
        b.crossOrigin = 'anonymous';
        b.onload = () => resoudre();
        b.onerror = () => { _xlsxEnCours = null; rejeter(new Error('SheetJS indisponible')); };
        document.head.appendChild(b);
    });
    return _xlsxEnCours;
}

// Valeur glissée dans un gestionnaire onclick : échappée d'abord pour
// JavaScript, puis pour l'attribut HTML. Sans ça, un guillemet dans un
// numéro de facture ou un nom de fichier suffit à sortir de l'attribut.
function jsArg(v) { return ech(JSON.stringify(String(v == null ? '' : v))); }

function genNum() {
    let c = (parseInt(G.val('v90_inv_count')) || 0) + 1;
    return new Date().getFullYear() + "-" + String(c).padStart(3, '0');
}

// Lecture d'un montant écrit pour l'affichage (« 1 234,56 € ») : on garde le
// signe, sans quoi un avoir de -500 € serait compté +500 €.
function montantDepuisTexte(t) {
    const n = parseFloat(String(t == null ? '' : t).replace(/[^\d,-]/g, '').replace(',', '.'));
    return isFinite(n) ? n : 0;
}

// Montants d'une facture de l'historique. Les lignes font foi : elles portent
// le taux de TVA de chaque produit. Le total formaté n'est relu que pour les
// vieilles factures sans détail, et 20 % n'est alors qu'un repli.
function histMontants(h) {
    if (h && typeof h.htNum === 'number' && typeof h.ttcNum === 'number' && isFinite(h.htNum) && isFinite(h.ttcNum)) {
        return { ht: h.htNum, tva: h.ttcNum - h.htNum, ttc: h.ttcNum };
    }
    if (h && h.items && h.items.length) {
        const ht = h.items.reduce((s, i) => s + (Number(i.qte) || 0) * (Number(i.prix) || 0), 0);
        const tva = h.items.reduce((s, i) => s + (Number(i.qte) || 0) * (Number(i.prix) || 0) * ((i.tva == null ? 20 : Number(i.tva) || 0) / 100), 0);
        return { ht: ht, tva: tva, ttc: ht + tva };
    }
    const ttc = montantDepuisTexte(h && h.total);
    return { ht: ttc / 1.2, tva: ttc - ttc / 1.2, ttc: ttc };
}

// Numéro de facture : compteur local de cet appareil. La réservation
// atomique passait par une fonction Postgres ; il n'y a plus de serveur, donc
// plus de garantie entre appareils — facturer depuis deux appareils à la fois
// donnerait deux fois le même numéro.
function reserveInvoiceNumber() {
    const c = (parseInt(G.val('v90_inv_count')) || 0) + 1;
    localStorage.setItem('v90_inv_count', c);
    return new Date().getFullYear() + "-" + String(c).padStart(3, '0');
}

// --- SAUVEGARDE DE SECOURS (export/import fichier, indépendant du cloud) ---
function exportBackup() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('v90_')) data[k] = localStorage.getItem(k);
    }
    const payload = { app: 'gestion-pro', version: 1, exportedAt: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Sauvegarde_GestionPro_' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast(`✅ Sauvegarde téléchargée (${Object.keys(data).length} collection(s)).`, 'success');
}

// Une sauvegarde circule par mail ou par clé USB : on ne réécrit que des clés
// connues, et seulement si leur contenu a la forme attendue. Sans ce filtre,
// le fichier pouvait injecter n'importe quoi dans l'application, puis le
// propager au cloud et aux autres appareils.
const FORMES_SAUVEGARDE = {
    v90_clis: 'tableau', v90_prods: 'tableau', v90_ents: 'tableau', v90_hist: 'tableau',
    v90_bls: 'tableau', v90_drafts: 'tableau',
    v90_prix_cli: 'objet', v90_inv_count: 'nombre',
    v90_ebe_documents: 'objet', v90_ebe_agregats: 'objet'
};
function valeurSauvegardeValide(cle, brut) {
    const forme = FORMES_SAUVEGARDE[cle];
    if (!forme) return false;
    if (typeof brut !== 'string') return false;
    if (forme === 'nombre') return /^\d+$/.test(brut.trim());
    let v;
    try { v = JSON.parse(brut); } catch (e) { return false; }
    if (forme === 'tableau') return Array.isArray(v);
    return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function importBackup(ev) {
    const file = ev.target.files && ev.target.files[0];
    ev.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        let payload;
        try { payload = JSON.parse(reader.result); } catch (e) { return toast('❌ Fichier illisible (pas un JSON valide).', 'error'); }
        if (!payload || payload.app !== 'gestion-pro' || !payload.data) {
            return toast('❌ Ce fichier n\'est pas une sauvegarde Gestion Pro.', 'error');
        }
        const entrees = Object.entries(payload.data).filter(([k, v]) => valeurSauvegardeValide(k, v));
        const ignorees = Object.keys(payload.data).length - entrees.length;
        if (!entrees.length) return toast('❌ Sauvegarde inutilisable : aucune collection reconnue.', 'error');
        const n = entrees.length;
        if (!confirm(`Restaurer cette sauvegarde du ${new Date(payload.exportedAt).toLocaleDateString('fr-FR')} ?\n${n} collection(s) — les données actuelles de cet appareil seront remplacées.`)) return;
        entrees.forEach(([k, v]) => localStorage.setItem(k, v));
        db.clis   = G.get('v90_clis');
        db.prods  = G.get('v90_prods');
        db.ents   = G.get('v90_ents');
        db.hist   = G.get('v90_hist');
        db.bls    = G.get('v90_bls');
        db.drafts = G.get('v90_drafts');
        db.prixCli = JSON.parse(localStorage.getItem('v90_prix_cli') || '{}');
        renderAll();
        toast(`✅ Sauvegarde restaurée (${n} collection(s)${ignorees ? `, ${ignorees} ignorée(s) car non reconnue(s)` : ''}).`, 'success');
    };
    reader.readAsText(file);
}

// --- NOTIFICATIONS (remplace alert() par un message non bloquant) ---
function toast(msg, kind = 'info') {
    const holder = $('toast-holder');
    if (!holder) { console.log(msg); return; }
    const el = document.createElement('div');
    el.className = 'toast' + (kind !== 'info' ? ' toast-' + kind : '');
    el.textContent = msg;
    holder.appendChild(el);
    setTimeout(() => {
        el.classList.add('toast-out');
        setTimeout(() => el.remove(), 200);
    }, 3600);
}

// --- ANIMATIONS (bouton global, header — partagé avec le module Mes Apps) ---
const ANIM_KEY = 'dash-anim'; // même clé que dash-module.js : un seul état partagé
function animOn() {
    try { return localStorage.getItem(ANIM_KEY) !== 'off'; } catch (e) { return true; }
}
function applyGlobalAnim(on) {
    document.documentElement.setAttribute('data-anim', on ? 'on' : 'off');
    let btn = $('hd-anim-toggle');
    if (btn) { btn.textContent = on ? '⚡' : '⏸'; btn.style.color = on ? '' : 'var(--accent)'; }
    let dashBtn = document.getElementById('anim-toggle');
    if (dashBtn) dashBtn.textContent = on ? '⚡ ANIMATIONS' : '⏸ ANIMATIONS';
    try { localStorage.setItem(ANIM_KEY, on ? 'on' : 'off'); } catch (e) {}
}
function toggleGlobalAnim() { applyGlobalAnim(!animOn()); }
applyGlobalAnim(animOn());

// Horloge Header
function tick() {
    let n = new Date();
    $('hd-date').innerText = n.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
    $('hd-time').innerText = n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0');
}
setInterval(tick, 1000);
tick();

// --- MODALS ---
function closeModals() { document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none'); }
function openModal(id) { $(id).style.display = 'flex'; }

function openProdModal(id = null) {
    if (id) {
        let p = db.prods.find(x => x.id == id);
        $('mp-title').innerText = "Modifier Produit"; $('mp-id').value = p.id; $('mp-icon').value = p.icon;
        $('mp-nom').value = p.nom; $('mp-desc').value = p.desc || ''; $('mp-prix').value = p.prix;
        $('mp-unite').value = p.unite; $('mp-tva').value = p.tva || 20;
        $('mp-poids').value = p.poids || '';
        $('mp-seuil').value = p.seuil || '';
        $('mp-archive').style.display = 'flex';
        $('mp-archive').textContent = p.archived ? '↩️ Restaurer' : '🗂 Archiver';
    } else {
        $('mp-title').innerText = "Nouveau Produit"; $('mp-id').value = ''; $('mp-icon').value = '';
        $('mp-nom').value = ''; $('mp-desc').value = ''; $('mp-prix').value = ''; $('mp-poids').value = '';
        $('mp-seuil').value = '';
        $('mp-archive').style.display = 'none';
    }
    openModal('mod-prod');
}

function openCliModal(id = null) {
    if (id) {
        let c = db.clis.find(x => x.id == id);
        $('mc-title').innerText = "Modifier Client"; $('mc-id').value = c.id; $('mc-nom').value = c.nom;
        $('mc-adr').value = c.adr; $('mc-ville').value = c.ville || ''; $('mc-email').value = c.email || ''; $('mc-siret').value = c.siret || '';
        $('mc-echeance').value = c.echeanceJours || '';
        $('mc-archive').style.display = 'flex';
        $('mc-archive').textContent = c.archived ? '↩️ Restaurer' : '🗂 Archiver';
    } else {
        $('mc-title').innerText = "Nouveau Client"; $('mc-id').value = ''; $('mc-nom').value = '';
        $('mc-adr').value = ''; $('mc-ville').value = ''; $('mc-email').value = ''; $('mc-siret').value = '';
        $('mc-echeance').value = '';
        $('mc-archive').style.display = 'none';
    }
    openModal('mod-cli');
}

function openCliPrixModal(cliId) {
    let cli = db.clis.find(c => c.id == cliId);
    if (!cli) return;
    let prices = db.prixCli[cliId] || {};
    $('mcp-cli-id').value = cliId;
    $('mcp-title').innerText = `💰 Prix pour ${cli.nom}`;
    $('mcp-list').innerHTML = actifs(db.prods).map(p => `
        <div class="field">
            <label>${p.icon} ${ech(p.nom)} <small style="opacity:.5; font-weight:400">(base : ${eur(p.prix)} / ${p.unite})</small></label>
            <input type="number" id="cprix-${p.id}" step="0.01" value="${prices[p.id] !== undefined ? prices[p.id] : p.prix}">
        </div>`).join('');
    openModal('mod-cli-prix');
}

function saveCliPrix() {
    let cliId = $('mcp-cli-id').value;
    if (!db.prixCli[cliId]) db.prixCli[cliId] = {};
    actifs(db.prods).forEach(p => {
        let v = parseFloat($('cprix-' + p.id).value);
        if (!isNaN(v)) db.prixCli[cliId][p.id] = v;
    });
    localStorage.setItem('v90_prix_cli', JSON.stringify(db.prixCli));
    closeModals();
    renderBLGrid();
    toast('✅ Prix spécifiques sauvegardés !', 'success');
}

function openEntModal(id = null) {
    if (id) {
        let e = db.ents.find(x => x.id == id);
        $('me-title').innerText = "Modifier Entreprise"; $('me-id').value = e.id; $('me-nom').value = e.nom;
        $('me-adr').value = e.adr; $('me-ville').value = e.ville || ''; $('me-siret').value = e.siret || '';
        $('me-iban').value = e.iban || ''; $('me-mentions').value = e.mentions || '';
    } else {
        $('me-id').value = ''; $('me-nom').value = ''; $('me-adr').value = ''; $('me-ville').value = ''; $('me-siret').value = ''; $('me-iban').value = ''; $('me-mentions').value = '';
    }
    openModal('mod-ent');
}

// --- SAUVEGARDES ---
function saveProd() {
    let id = $('mp-id').value || Date.now();
    let o = { id, icon: $('mp-icon').value || '📦', nom: $('mp-nom').value, desc: $('mp-desc').value, prix: parseFloat($('mp-prix').value) || 0, unite: $('mp-unite').value, tva: parseFloat($('mp-tva').value), poids: parseFloat($('mp-poids').value) || 0, seuil: parseFloat($('mp-seuil').value) || 0, stock: 0 };
    let ex = db.prods.find(p => p.id == id); if (ex) { o.stock = ex.stock; o.archived = ex.archived; }
    db.prods = db.prods.filter(p => p.id != id); db.prods.push(o); G.set('v90_prods', db.prods); closeModals(); renderAll();
}

function saveCli() {
    let id = $('mc-id').value || Date.now();
    let o = { id, nom: $('mc-nom').value, adr: $('mc-adr').value, ville: $('mc-ville').value, email: $('mc-email').value, siret: $('mc-siret').value, echeanceJours: parseInt($('mc-echeance').value) || 30 };
    let exCli = db.clis.find(c => c.id == id); if (exCli) o.archived = exCli.archived;
    db.clis = db.clis.filter(c => c.id != id); db.clis.push(o); G.set('v90_clis', db.clis); closeModals(); renderAll();
}

function saveEnt() {
    let id = $('me-id').value || Date.now();
    let o = { id, nom: $('me-nom').value, adr: $('me-adr').value, ville: $('me-ville').value, siret: $('me-siret').value, iban: $('me-iban').value, mentions: $('me-mentions').value };
    db.ents = db.ents.filter(e => e.id != id); db.ents.push(o); G.set('v90_ents', db.ents); closeModals(); renderAll();
}

// --- GESTION DES BONS DE LIVRAISON (BL) ---
function toggleBLTab(t) {
    ['prise', 'suivi', 'charge'].forEach(k => {
        $('tab-bl-' + k).classList.toggle('active', k === t);
        $('view-bl-' + k).style.display = k === t ? 'block' : 'none';
    });
    if (t === 'suivi') renderSuiviBL();
    if (t === 'charge') {
        if (!$('charge-date').value) $('charge-date').value = new Date().toISOString().split('T')[0];
        renderChargement();
    }
}

// --- FEUILLE DE CHARGEMENT (tournée du jour) ---
// Agrège les BL "en cours" (pas encore facturés = pas encore livrés) d'une
// date donnée : totaux à charger par produit + détail par client.
function chargementData(dateIso) {
    const [y, m, d] = dateIso.split('-');
    const dateFr = `${d}/${m}/${y}`;
    const bls = db.bls.filter(b => b.status === 'en-cours' && b.date === dateFr);
    const totaux = {};
    bls.forEach(b => b.items.forEach(i => {
        if (!totaux[i.pid]) totaux[i.pid] = { icon: i.icon, nom: i.nom, unite: i.unite, qte: 0, poids: 0 };
        totaux[i.pid].qte += i.qte;
        totaux[i.pid].poids += i.qte * getPoids(i);
    }));
    const poidsTotal = Object.values(totaux).reduce((s, t) => s + t.poids, 0);
    return { dateFr, bls, totaux: Object.values(totaux), poidsTotal };
}

function renderChargement() {
    const el = $('charge-content'); if (!el) return;
    const dateIso = $('charge-date').value;
    if (!dateIso) { el.innerHTML = ''; return; }
    const { bls, totaux, poidsTotal } = chargementData(dateIso);
    $('btn-print-charge').style.display = bls.length ? 'flex' : 'none';
    if (!bls.length) {
        el.innerHTML = `<div style="text-align:center; padding:40px 20px; opacity:.4; font-size:14px">Aucun bon de livraison en cours à cette date</div>`;
        return;
    }
    el.innerHTML = `
        <div class="section-title">À charger (${bls.length} livraison${bls.length > 1 ? 's' : ''})</div>
        ${totaux.map(t => `
            <div class="card" style="gap:10px; align-items:center">
                <b style="flex:2">${t.icon} ${ech(t.nom)}</b>
                <span style="flex:1; text-align:center; font-size:20px; font-weight:700; color:var(--sage)">${t.qte} ${ech(t.unite)}</span>
                <span style="flex:1; text-align:right; color:var(--text-muted)">${t.poids ? t.poids.toFixed(1) + ' kg' : '—'}</span>
            </div>`).join('')}
        <div class="card" style="background:var(--bg-elev-2)">
            <b>POIDS TOTAL À CHARGER</b>
            <b style="font-size:20px; color:var(--gold)">${poidsTotal.toFixed(1)} kg</b>
        </div>
        <div class="section-title" style="margin-top:24px">Détail par client</div>
        ${bls.map(b => `
            <div class="card" style="flex-direction:column; align-items:stretch; gap:6px">
                <b style="font-size:16px; color:var(--gold)">👤 ${ech(b.cliNom)}</b>
                ${b.items.map(i => `
                    <div style="display:flex; justify-content:space-between; font-size:14px; padding:4px 0; border-bottom:1px dashed var(--border)">
                        <span>${i.icon} ${ech(i.nom)}</span>
                        <span style="font-weight:600">${i.qte} ${ech(i.unite)}</span>
                    </div>`).join('')}
            </div>`).join('')}`;
}

function printChargement() {
    const dateIso = $('charge-date').value;
    if (!dateIso) return;
    const { dateFr, bls, totaux, poidsTotal } = chargementData(dateIso);
    if (!bls.length) return toast('Aucun bon à imprimer pour cette date.', 'info');
    $('sheet-holder').innerHTML = `
        <div class="inv-wrap">
            <h1 style="font-size:42px">Feuille de chargement</h1>
            <div style="margin-bottom:24px; font-size:16px"><b>TOURNÉE DU :</b> ${dateFr} — ${bls.length} livraison(s)</div>
            <table class="inv-table">
                <thead><tr><th>Produit</th><th style="text-align:center">Quantité totale</th><th style="text-align:right">Poids</th></tr></thead>
                <tbody>
                    ${totaux.map(t => `<tr><td>${t.icon} ${ech(t.nom)}</td><td style="text-align:center"><b>${t.qte} ${ech(t.unite)}</b></td><td style="text-align:right">${t.poids ? t.poids.toFixed(1) + ' kg' : '—'}</td></tr>`).join('')}
                </tbody>
            </table>
            <div class="inv-totals">
                <div class="inv-total-final"><span>POIDS TOTAL</span><span>${poidsTotal.toFixed(1)} kg</span></div>
            </div>
            <table class="inv-table" style="margin-top:30px">
                <thead><tr><th>Client</th><th>Détail</th><th style="text-align:center">Livré ☐</th></tr></thead>
                <tbody>
                    ${bls.map(b => `<tr>
                        <td style="font-weight:700">${ech(b.cliNom)}</td>
                        <td>${b.items.map(i => `${i.qte} ${ech(i.unite)} ${ech(i.nom)}`).join(' · ')}</td>
                        <td style="text-align:center; font-size:20px">☐</td>
                    </tr>`).join('')}
                </tbody>
            </table>
            <div class="payment-box" style="margin-top:auto">
                <div style="font-size:13px; color:#555">Feuille de chargement — usage interne</div>
            </div>
        </div>`;
    $('btn-finalize-inv').style.display = 'none';
    $('btn-print-bl').style.display = 'flex';
    $('preview-wrap').style.display = 'block';
}

function changeQty(id, d) {
    let e = $('qty-' + id);
    e.value = Math.max(0, (parseFloat(e.value) || 0) + d);
}

function saveBL() {
    let cliId = $('bl-cli-select').value;
    let prixCli = (cliId && db.prixCli[cliId]) ? db.prixCli[cliId] : {};
    let items = [];
    actifs(db.prods).forEach(p => {
        let q = parseFloat($('qty-' + p.id).value);
        let prixInput = parseFloat($('prix-' + p.id).value);
        let prixDefaut = prixCli[p.id] !== undefined ? prixCli[p.id] : p.prix;
        let prix = isNaN(prixInput) ? prixDefaut : prixInput;
        if (q > 0) items.push({ pid: p.id, icon: p.icon, nom: p.nom, prix: prix, qte: q, unite: p.unite, tva: p.tva, poids: p.poids || 0 });
    });
    if (!items.length) return toast("Aucune quantité saisie", 'warn');
    const cli = db.clis.find(c => c.id == cliId);
    if (!cli) return toast("Choisis un client avant d'enregistrer la livraison", 'error');
    if (!$('bl-date').value) return toast("Choisis une date de livraison", 'error');
    const [y, m, d] = $('bl-date').value.split('-');
    const dateStr = `${d}/${m}/${y}`;
    db.bls.push({ id: Date.now(), date: dateStr, cid: cliId, cliNom: cli.nom, entId: $('bl-ent-select').value, items, status: 'en-cours' });
    G.set('v90_bls', db.bls);
    toast("✅ Livraison enregistrée !", 'success');
    showPage('home');
}

function renderSuiviBL() {
    $('list-bl-encours').innerHTML = db.bls.filter(b => b.status === 'en-cours').map(b => {
        
        // On vérifie si ce BL est déjà dans la sélection pour garder la case cochée
        let isChecked = blSel.includes(b.id) ? 'checked' : '';
        
        // Création de la liste détaillée des articles de la commande
        let itemsDetail = b.items.map(i => `
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed var(--border); font-size: 20px; color: var(--text-main); padding-left: 45px;">
                <span style="flex: 2;"><b>${i.icon} ${i.nom}</b></span>
                <span style="flex: 1; text-align: center; color: var(--sage); font-weight: 700;">${i.qte} ${i.unite}</span>
                <span style="flex: 1; text-align: right; opacity:.7">${eur(i.prix)} / ${i.unite}</span>
                <span style="flex: 1; text-align: right; font-weight: 600; color: var(--accent)">${eur(i.qte * i.prix)} HT</span>
            </div>
        `).join('');

        let poidsTotal = b.items.reduce((s, i) => s + i.qte * getPoids(i), 0);

        return `
        <div class="card" style="flex-direction: column; align-items: stretch; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <input type="checkbox" style="width: 28px; height: 28px; cursor: pointer; accent-color: var(--gold);" ${isChecked} onchange="toggleBLSel(${b.id}, this.checked)">
                    <div>
                        <b style="font-size: 26px; color: var(--gold);">${b.cliNom}</b><br>
                        <small style="font-size: 16px; color: var(--sage); font-weight: 600;">📅 Date : ${b.date}</small>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="text-align: right;">
                        <div style="font-size: 14px; color: var(--text-muted); text-transform: uppercase;">Total HT</div>
                        <b style="font-size: 20px; color: var(--text-muted);">${eur(b.items.reduce((s,i) => s + i.qte * i.prix, 0))}</b>
                        <div style="font-size: 14px; color: var(--text-muted); text-transform: uppercase; margin-top:4px">Total TTC</div>
                        <b style="font-size: 24px; color: var(--gold);">${eur(b.items.reduce((s,i) => s + i.qte * i.prix * (1 + (i.tva||20)/100), 0))}</b>
                        <div style="font-size: 14px; color: var(--text-muted); margin-top:2px">${poidsTotal.toFixed(2)} kg</div>
                    </div>
                    <button class="btn" style="width: 40px; height: 40px; padding: 0; font-size: 18px; border-radius: 8px; background:var(--ligne)" onclick="printBL(${b.id})" title="Imprimer ce bon">🖨️</button>
                    <button class="btn btn-red" style="width: 40px; height: 40px; padding: 0; font-size: 16px; border-radius: 8px;" onclick="deleteItem('bls',${b.id})" title="Supprimer ce bon">✕</button>
                </div>
            </div>
            
            <div>
                ${itemsDetail}
            </div>
        </div>`;
    }).join('');
}

function toggleBLSel(id, s) {
    if (s) blSel.push(id); else blSel = blSel.filter(x => x != id);
    $('bl-bar').style.display = blSel.length ? 'flex' : 'none';
    $('bl-count').innerText = blSel.length + " sélection(s)";
}

function processBLToDraft() {
    let sel = db.bls.filter(b => blSel.includes(b.id));
    if (!sel.length) return;
    // Un brouillon ne concerne qu'un seul client : sinon la facture partirait
    // au nom du premier avec les marchandises livrées aux autres.
    const clients = [...new Set(sel.map(b => b.cid))];
    if (clients.length > 1) {
        const noms = [...new Set(sel.map(b => b.cliNom))].join(', ');
        return toast(`Ces bons concernent plusieurs clients (${noms}) : fais-en un brouillon par client.`, 'error');
    }
    let cumul = {};
    sel.forEach(bl => {
        bl.items.forEach(it => {
            // On ne regroupe que ce qui a le même produit ET le même prix :
            // deux livraisons au même prix se cumulent, deux prix différents
            // restent deux lignes, sinon le second prix serait perdu.
            const cle = it.pid + '@' + it.prix;
            if (!cumul[cle]) cumul[cle] = { ...it };
            else cumul[cle].qte += it.qte;
        });
        bl.status = 'facturé';
    });
    db.drafts.push({
        id: Date.now(), cid: sel[0].cid, cliNom: sel[0].cliNom, items: Object.values(cumul),
        blIds: sel.map(b => b.id),
        dates: [...new Set(sel.map(b => b.date))].join(', ')
    });
    G.set('v90_drafts', db.drafts); G.set('v90_bls', db.bls);
    blSel = []; $('bl-bar').style.display = 'none';
    showPage('facture'); toggleFactTab('draft');
}

// --- FACTURATION ---
function toggleFactTab(t) {
    $('tab-f-libre').classList.toggle('active', t === 'libre');
    $('tab-f-draft').classList.toggle('active', t === 'draft');
    $('f-view-libre').style.display = t === 'libre' ? 'block' : 'none';
    $('f-view-draft').style.display = t === 'draft' ? 'block' : 'none';
    if (t === 'draft') renderDrafts();
}

function renderDrafts() {
    $('list-drafts').innerHTML = db.drafts.map(d => {
        // Calcul du total TTC
        let tot = d.items.reduce((s, i) => s + (i.qte * i.prix * (1 + (i.tva || 20) / 100)), 0);
        
        // Création d'une vraie liste détaillée au lieu des mini-tags
        let itemsDetail = d.items.map(i => `
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed var(--border); font-size: 20px; color: var(--text-main);">
                <span style="flex: 2;"><b>${i.icon} ${i.nom}</b></span>
                <span style="flex: 1; text-align: center;">${i.qte} ${i.unite}</span>
                <span style="flex: 1; text-align: right;">${eur(i.prix)} / ${i.unite}</span>
                <span style="flex: 1; text-align: right; font-weight: 700; color: var(--text-main);">${eur(i.qte * i.prix)} HT</span>
            </div>
        `).join('');

        // Affichage des dates des BL d'origine (si dispo)
        let blRefs = d.dates ? `<div style="font-size: 16px; color: var(--sage); margin-top: 4px;">📍 Commandes du : <b>${d.dates}</b></div>` : '';

        return `
        <div class="card draft-card" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 15px;">
                <div>
                    <b style="font-size: 26px;">${d.cliNom}</b>
                    ${blRefs}
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 14px; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">Total HT</span><br>
                    <b style="font-size: 22px; color: var(--text-muted);">${eur(d.items.reduce((s,i) => s + i.qte * i.prix, 0))}</b><br>
                    <span style="font-size: 14px; text-transform: uppercase; font-weight: 700; color: var(--accent);">Total TTC</span><br>
                    <b style="font-size: 30px; color: var(--sage);">${eur(tot)}</b>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                ${itemsDetail}
            </div>
            
            <button class="btn btn-gold" onclick="loadDraft(${d.id})">✏️ VÉRIFIER & FACTURER</button>
        </div>`;
    }).join('');
}

function loadDraft(id) {
    let d = db.drafts.find(x => x.id == id);
    curLines = [...d.items];
    $('f-cli').value = d.cid;
    curDraftId = id;
    toggleFactTab('libre');
    renderLines();
}

function addLine() {
    let p = db.prods.find(x => x.id == $('f-prod-picker').value);
    if (p) {
        curLines.push({ pid: p.id, icon: p.icon, nom: p.nom, prix: p.prix, qte: 1, unite: p.unite, tva: p.tva });
        renderLines();
    }
}

function renderLines() {
    $('f-lines').innerHTML = curLines.map((l, i) => `
        <div class="card" style="flex-direction:column;align-items:stretch">
            <b>${l.icon} ${l.nom}</b>
            <div class="r2" style="margin-top:5px">
                <input type="number" step="0.01" value="${l.qte}" oninput="curLines[${i}].qte=parseFloat(this.value)||0;calcFact()">
                <input type="number" step="0.01" value="${l.prix}" oninput="curLines[${i}].prix=parseFloat(this.value)||0;calcFact()">
            </div>
            <button class="btn btn-red" style="margin-top:5px;padding:4px;font-size:10px" onclick="curLines.splice(${i},1);renderLines()">Supprimer</button>
        </div>`).join('');
    calcFact();
}

function calcFact() {
    let ttc = curLines.reduce((s, l) => s + (l.qte * l.prix * (1 + (l.tva || 20) / 100)), 0);
    $('f-tot-ttc').innerText = eur(ttc);
}

// --- STOCK ---
function adjustStock() {
    let p = db.prods.find(x => x.id == $('adj-prod').value), q = parseFloat($('adj-qty').value);
    if (p && q) {
        p.stock += q;
        G.set('v90_prods', db.prods);
        $('adj-qty').value = '';
        renderAll();
    }
}

// Helper : poids unitaire d'un item BL
// Si poids non renseigné : 1 kg par défaut quand l'unité est "kg" (logique physique)
function getPoids(i) {
    return i.poids || db.prods.find(p => p.id == i.pid)?.poids || (i.unite === 'kg' ? 1 : 0);
}

// --- RENDU GRILLE BL ---
function renderBLGrid() {
    let cliId = $('bl-cli-select').value;
    let prixCli = (cliId && db.prixCli[cliId]) ? db.prixCli[cliId] : {};
    $('bl-prod-grid').innerHTML = actifs(db.prods).map(p => {
        let poidsLabel = p.poids ? `<span style="opacity:.6;font-size:13px">${p.poids} kg / ${p.unite}</span>` : '';
        let prix = prixCli[p.id] !== undefined ? prixCli[p.id] : p.prix;
        return `
        <div class="card" style="flex-direction:column; padding: 20px; align-items: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">${p.icon} <b>${ech(p.nom)}</b></div>
            ${poidsLabel ? `<div style="margin-bottom: 12px;">${poidsLabel}</div>` : ''}
            <div style="display:flex; gap:12px; align-items:center; justify-content: center;">
                <button class="btn btn-gold" style="width: 60px; height: 60px; padding: 0; font-size: 35px; border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;" onclick="changeQty('${p.id}',-1)">−</button>
                <input type="number" id="qty-${p.id}" value="0" style="width: 100px; height: 60px; text-align:center; font-size: 26px; font-weight: 700; border-radius: 12px; margin: 0; padding: 0;">
                <button class="btn btn-gold" style="width: 60px; height: 60px; padding: 0; font-size: 35px; border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;" onclick="changeQty('${p.id}',1)">+</button>
            </div>
            <div style="display:flex; gap:8px; align-items:center; justify-content: center; margin-top: 12px;">
                <label style="font-size: 13px; color: var(--text-muted); font-weight: 600;">Prix :</label>
                <input type="number" id="prix-${p.id}" step="0.01" value="${prix}" style="width: 100px; height: 40px; text-align:center; font-size: 16px; font-weight: 600; border-radius: 8px; margin: 0; padding: 0 8px;">
                <span style="font-size: 13px; color: var(--text-muted);">€ / ${p.unite}</span>
            </div>
        </div>`; }).join('');
}

// --- ARCHIVAGE (clients / produits) ---
// Un élément archivé disparaît des sélecteurs et grilles mais reste en base :
// l'historique et les BL existants gardent leurs références intactes.
function actifs(arr) { return arr.filter(x => !x.archived); }

function toggleArchive(type, id) {
    const item = db[type].find(x => x.id == id);
    if (!item) return;
    item.archived = !item.archived;
    G.set('v90_' + type, db[type]);
    closeModals();
    renderAll();
    toast(item.archived ? '🗂 Archivé — il n\'apparaît plus dans les listes, ses données restent conservées.' : '✅ Restauré.', 'success');
}

// --- SOUS-ONGLETS PARAMÈTRES ---
function toggleParamTab(t) {
    ['produits', 'clients', 'entreprises', 'donnees'].forEach(k => {
        $('tab-param-' + k).classList.toggle('active', k === t);
        $('view-param-' + k).style.display = k === t ? 'block' : 'none';
    });
}

// --- BANDEAU « D'UN COUP D'ŒIL » (accueil) ---
function renderHomeResume() {
    const el = $('home-resume'); if (!el) return;
    const now = new Date();
    const todayFr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const moisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const aLivrer = db.bls.filter(b => b.status === 'en-cours' && b.date === todayFr);
    const poids = aLivrer.reduce((s, b) => s + b.items.reduce((s2, i) => s2 + i.qte * getPoids(i), 0), 0);

    const impayees = db.hist.filter(h => computeHistStatus(h) !== 'payee');
    const duTtc = impayees.reduce((s, h) => s + histMontants(h).ttc, 0);

    const bas = actifs(db.prods).filter(p => p.seuil > 0 && p.stock <= p.seuil);

    const caMois = db.hist.filter(h => histMonthKey(h.date) === moisKey)
        .reduce((s, h) => s + histMontants(h).ht, 0);

    el.innerHTML = `
        <div class="hr-card hr-mint" onclick="goResumeLivraisons()">
            <b>${aLivrer.length}</b><span>À livrer aujourd'hui</span>
            <small>${aLivrer.length ? poids.toFixed(0) + ' kg à charger' : 'rien de prévu'}</small>
        </div>
        <div class="hr-card hr-peach" onclick="goResumeImpayees()">
            <b>${impayees.length}</b><span>Facture${impayees.length > 1 ? 's' : ''} impayée${impayees.length > 1 ? 's' : ''}</span>
            <small>${impayees.length ? eur(duTtc) + ' TTC dus' : 'tout est réglé'}</small>
        </div>
        <div class="hr-card hr-sun" onclick="showPage('stock')">
            <b>${bas.length}</b><span>Stock bas</span>
            <small>${bas.length ? ech(bas.slice(0, 2).map(p => p.nom).join(', ')) + (bas.length > 2 ? '…' : '') : 'niveaux OK'}</small>
        </div>
        <div class="hr-card hr-sky" onclick="goResumeCompta()">
            <b>${eur(caMois)}</b><span>CA HT du mois</span>
            <small>${db.hist.filter(h => histMonthKey(h.date) === moisKey).length} facture(s)</small>
        </div>`;
}

function goResumeLivraisons() {
    showPage('bl');
    toggleBLTab('charge');
    $('charge-date').value = new Date().toISOString().split('T')[0];
    renderChargement();
}
function goResumeImpayees() {
    showPage('historique');
    toggleHistFilter('impayees');
}
function goResumeCompta() {
    showPage('compta');
    calcCompta();
}

// --- RENDU GLOBAL DES LISTES ---
function renderAll() {
    setTimeout(appliquerAccessibilite, 0);
    renderHomeResume();
    // 1. Sélecteur client + entreprise pour le BL
    $('bl-date').value = new Date().toISOString().split('T')[0];
    $('bl-ent-select').innerHTML = db.ents.map(e => `<option value="${e.id}">${ech(e.nom)}</option>`).join('');
    $('bl-cli-select').innerHTML = actifs(db.clis).map(c => `<option value="${c.id}">${ech(c.nom)}</option>`).join('');

    // 2. Grille des produits pour le BL
    renderBLGrid();

    // 3. Listes dans les paramètres
    $('list-prods-settings').innerHTML = actifs(db.prods).map(p => `<div class="card card-link" onclick="openProdModal(${p.id})"><div><b>${p.icon} ${p.nom}</b></div><span>✏️</span></div>`).join('');
    const prodsArch = db.prods.filter(p => p.archived);
    $('title-prods-archives').style.display = prodsArch.length ? 'block' : 'none';
    $('list-prods-archives').innerHTML = prodsArch.map(p => `
        <div class="card" style="gap:8px; align-items:center; opacity:.65">
            <b style="flex:1">${p.icon} ${ech(p.nom)}</b>
            <button class="btn" style="width:auto;padding:6px 12px;font-size:12px;background:var(--ligne)" onclick="toggleArchive('prods', ${p.id})">↩️ Restaurer</button>
        </div>`).join('');
    $('list-clis-settings').innerHTML = actifs(db.clis).map(c => `
        <div class="card" style="gap:8px; align-items:center">
            <b style="flex:1; cursor:pointer" onclick="openCliModal(${c.id})">👤 ${ech(c.nom)}</b>
            <button class="btn" style="width:auto;padding:6px 12px;font-size:12px;background:var(--ligne)" onclick="openCliPrixModal(${c.id})">💰 Prix</button>
            <span style="cursor:pointer" onclick="openCliModal(${c.id})">✏️</span>
        </div>`).join('');
    const clisArch = db.clis.filter(c => c.archived);
    $('title-clis-archives').style.display = clisArch.length ? 'block' : 'none';
    $('list-clis-archives').innerHTML = clisArch.map(c => `
        <div class="card" style="gap:8px; align-items:center; opacity:.65">
            <b style="flex:1">👤 ${ech(c.nom)}</b>
            <button class="btn" style="width:auto;padding:6px 12px;font-size:12px;background:var(--ligne)" onclick="toggleArchive('clis', ${c.id})">↩️ Restaurer</button>
        </div>`).join('');
    $('list-ents-settings').innerHTML = db.ents.map(e => `<div class="card card-link" onclick="openEntModal(${e.id})"><b>🏢 ${e.nom}</b><span>✏️</span></div>`).join('');
    
    // 4. Sélecteurs pour la facturation libre + filtres par entreprise
    // (les filtres utilisent le NOM car l'historique stocke h.ent en nom ;
    // on ajoute aussi les noms orphelins présents dans l'historique, pour ne
    // jamais rendre d'anciennes factures infiltrables après renommage.)
    const entNames = [...new Set([...db.ents.map(e => e.nom), ...db.hist.map(h => h.ent).filter(Boolean)])];
    ['hist-ent-filter', 'compta-ent'].forEach(selId => {
        const sel = $(selId); if (!sel) return;
        const cur = sel.value || 'Toutes';
        sel.innerHTML = ['Toutes', ...entNames].map(n => `<option${n === cur ? ' selected' : ''}>${ech(n)}</option>`).join('');
    });
    $('f-ent').innerHTML = db.ents.map(e => `<option value="${e.id}">${ech(e.nom)}</option>`).join('');
    $('f-cli').innerHTML = actifs(db.clis).map(c => `<option value="${c.id}">${ech(c.nom)}</option>`).join('');
    $('f-prod-picker').innerHTML = actifs(db.prods).map(p => `<option value="${p.id}">${ech(p.nom)}</option>`).join('');
    
    // 5. Affichage du stock actuel et ajustement (avec alerte seuil bas)
    const lowStock = actifs(db.prods).filter(p => p.seuil > 0 && p.stock <= p.seuil);
    $('list-stock').innerHTML = actifs(db.prods).map(p => {
        const bas = p.seuil > 0 && p.stock <= p.seuil;
        return `<div class="card${bas ? ' stock-low' : ''}" style="flex-direction:column">
            <b>${p.icon} ${ech(p.nom)}</b>
            <div style="font-size:20px;color:${bas ? 'var(--danger)' : 'var(--sage)'};font-weight:700">${p.stock} ${p.unite}</div>
            ${bas ? `<span class="badge-statut badge-retard" style="margin-top:6px">⚠️ Stock bas (seuil : ${p.seuil})</span>` : ''}
        </div>`;
    }).join('');
    $('adj-prod').innerHTML = actifs(db.prods).map(p => `<option value="${p.id}">${ech(p.nom)}</option>`).join('');
    const stockBadge = $('stock-alert-badge');
    if (stockBadge) {
        stockBadge.style.display = lowStock.length ? 'flex' : 'none';
        stockBadge.textContent = lowStock.length;
    }
    
    // 6. Historique des factures
    renderHistorique();
}

// Statut de paiement : "payée" est le seul état réellement stocké (bascule
// manuelle) ; "en retard" est calculé à l'affichage (>30 jours sans paiement),
// c'est un simple libellé, jamais une action déclenchée automatiquement.
function computeHistStatus(h) {
    if (h.statut === 'payee') return 'payee';
    // Priorité à la vraie date d'échéance de la facture (délai de paiement du
    // client) ; repli 30 jours après la date de facture pour les anciennes.
    const ref = (h.echeance || '').split('/');
    if (ref.length === 3) {
        const d = new Date(+ref[2], +ref[1] - 1, +ref[0]);
        return Date.now() > d.getTime() + 86400000 ? 'en_retard' : 'en_attente';
    }
    const p = (h.date || '').split('/');
    if (p.length === 3) {
        const d = new Date(+p[2], +p[1] - 1, +p[0]);
        if ((Date.now() - d.getTime()) / 86400000 > 30) return 'en_retard';
    }
    return 'en_attente';
}

function toggleInvoicePaid(id) {
    const h = db.hist.find(x => x.id == id);
    if (!h) return;
    h.statut = h.statut === 'payee' ? 'en_attente' : 'payee';
    G.set('v90_hist', db.hist);
    renderHistorique();
}

// Relance manuelle uniquement : ouvre le client mail de l'utilisateur avec un
// brouillon pré-rempli — rien n'est jamais envoyé automatiquement, l'envoi
// reste un geste volontaire de l'utilisateur dans son propre client mail.
function relanceHist(id) {
    const h = db.hist.find(x => x.id == id);
    if (!h) return;
    if (!h.cliEmail) return toast("Pas d'email enregistré pour ce client — ajoute-le dans sa fiche (Paramètres).", 'error');
    const sujet = encodeURIComponent(`Relance — Facture ${h.num}`);
    const corps = encodeURIComponent(`Bonjour,\n\nSauf erreur de notre part, la facture ${h.num} du ${h.date} d'un montant de ${h.total} TTC ne semble pas encore réglée.\n\nMerci de nous confirmer son état ou de procéder au règlement dès que possible.\n\nCordialement.`);
    window.open(`mailto:${h.cliEmail}?subject=${sujet}&body=${corps}`, '_blank');
}

function toggleBlOrigin(histId) {
    const el = $('bl-origin-' + histId);
    if (el) el.hidden = !el.hidden;
}

// Envoi manuel de la facture : ouvre le client mail avec un message prêt —
// rien n'est envoyé automatiquement (et mailto: ne peut pas joindre de PDF,
// le message le rappelle).
function envoyerFactureMail(id) {
    const h = db.hist.find(x => x.id == id);
    if (!h) return;
    if (!h.cliEmail) return toast("Pas d'email enregistré pour ce client — ajoute-le dans sa fiche (Paramètres).", 'error');
    const sujet = encodeURIComponent(`Facture ${h.num}${h.ent ? ' — ' + h.ent : ''}`);
    const corps = encodeURIComponent(`Bonjour,\n\nVeuillez trouver ci-joint la facture ${h.num} du ${h.date} d'un montant de ${h.total} TTC${h.echeance ? `, payable au plus tard le ${h.echeance}` : ''}.\n\nCordialement.\n\n(⚠️ Pense à joindre le PDF de la facture avant d'envoyer.)`);
    window.open(`mailto:${h.cliEmail}?subject=${sujet}&body=${corps}`, '_blank');
}

let histFilter = 'toutes';
function toggleHistFilter(f) {
    histFilter = f;
    $('tab-hist-toutes').classList.toggle('active', f === 'toutes');
    $('tab-hist-impayees').classList.toggle('active', f === 'impayees');
    renderHistorique();
}

function renderHistorique() {
    let list = histFilter === 'impayees' ? db.hist.filter(h => computeHistStatus(h) !== 'payee') : db.hist;
    const entFilter = $('hist-ent-filter') ? $('hist-ent-filter').value : '';
    if (entFilter && entFilter !== 'Toutes') list = list.filter(h => (h.ent || '') === entFilter);
    // Au-delà de cinquante factures, la page devenait lourde à chaque
    // navigation : on affiche les plus récentes, le reste à la demande.
    const total = list.length;
    if (!renderHistorique.limite) renderHistorique.limite = 50;
    const visibles = list.slice(Math.max(0, total - renderHistorique.limite));
    $('list-hist').innerHTML = list.length === 0
        ? `<div style="text-align:center; padding:40px 20px; opacity:.4; font-size:14px">${histFilter === 'impayees' ? 'Aucune facture impayée 🎉' : 'Aucune facture archivée'}</div>`
        : visibles.slice().reverse().map(h => {
            const itemsHtml = (h.items || []).map(i =>
                `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--carte-2); font-size:13px">
                    <span>${i.icon || ''} ${ech(i.nom)}</span>
                    <span style="opacity:.6">${i.qte} ${ech(i.unite)} × ${eur(i.prix)}</span>
                    <span style="font-weight:600">${eur(i.qte * i.prix * (1 + (i.tva || 20) / 100))}</span>
                </div>`
            ).join('');
            const statut = computeHistStatus(h);
            const badgeCls = statut === 'payee' ? 'badge-payee' : statut === 'en_retard' ? 'badge-retard' : 'badge-attente';
            const badgeLbl = statut === 'payee' ? '✅ Payée' : statut === 'en_retard' ? '⏰ En retard' : '⏳ En attente';
            return `
            <div class="card" style="flex-direction:column; align-items:stretch; gap:0; padding:0; overflow:hidden">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-bottom:1px solid var(--carte-2)">
                    <div>
                        <b style="font-size:16px; color:var(--gold)">🧾 ${ech(h.num)}</b>
                        ${h.date ? `<span style="font-size:12px; opacity:.5; margin-left:10px">📅 ${ech(h.date)}</span>` : ''}
                    </div>
                    <button class="btn btn-red" style="width:34px; height:34px; padding:0; font-size:14px; border-radius:8px; flex-shrink:0" onclick="deleteHist(${h.id || 0}, ${jsArg(h.num)})">✕</button>
                </div>
                <div style="padding:12px 16px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; border-bottom:1px solid var(--carte-2)">
                    ${h.ent ? `<span style="font-size:12px; opacity:.6">🏢 <b>${ech(h.ent)}</b></span><span style="opacity:.3">→</span>` : ''}
                    <span style="font-size:13px; font-weight:600">👤 ${ech(h.cli)}</span>
                    ${h.echeance && statut !== 'payee' ? `<span style="font-size:11px; opacity:.5; margin-left:auto">échéance ${ech(h.echeance)}</span><span class="badge-statut ${badgeCls}">${badgeLbl}</span>` : `<span class="badge-statut ${badgeCls}" style="margin-left:auto">${badgeLbl}</span>`}
                </div>
                ${(h.blIds && h.blIds.length) ? `
                <div style="padding:8px 16px; border-bottom:1px solid var(--carte-2)">
                    <span style="font-size:12px; cursor:pointer; color:var(--accent); font-weight:600" onclick="toggleBlOrigin(${h.id})">📦 ${h.blIds.length} bon${h.blIds.length > 1 ? 's' : ''} de livraison d'origine ▾</span>
                    <div id="bl-origin-${h.id}" hidden style="margin-top:8px">
                        ${h.blIds.map(bid => {
                            const b = db.bls.find(x => x.id == bid);
                            return b
                                ? `<div style="font-size:12px; padding:4px 0; opacity:.8">📅 ${ech(b.date)} — ${b.items.map(i => `${i.qte} ${ech(i.unite)} ${ech(i.nom)}`).join(' · ')}</div>`
                                : `<div style="font-size:12px; padding:4px 0; opacity:.5">bon supprimé (réf. ${bid})</div>`;
                        }).join('')}
                    </div>
                </div>` : ''}
                ${itemsHtml ? `<div style="padding:8px 16px">${itemsHtml}</div>` : ''}
                <div style="display:flex; justify-content:space-between; padding:12px 16px; background:var(--carte-2)">
                    ${h.ht ? `<span style="font-size:12px; opacity:.5">HT : ${ech(h.ht)}</span>` : '<span></span>'}
                    <b style="font-size:18px; color:var(--gold)">TTC : ${ech(h.total)}</b>
                </div>
                <div style="display:flex; gap:8px; padding:0 16px 14px; flex-wrap:wrap">
                    <button class="btn" style="flex:1; min-width:120px; font-size:11px; padding:8px; background:var(--carte-2)" onclick="toggleInvoicePaid(${h.id})">${statut === 'payee' ? '↩️ Marquer non payée' : '✅ Marquer payée'}</button>
                    ${h.cliEmail ? `<button class="btn" style="flex:1; min-width:120px; font-size:11px; padding:8px; background:var(--carte-2)" onclick="envoyerFactureMail(${h.id})">📤 Envoyer</button>` : ''}
                    ${statut !== 'payee' ? `<button class="btn" style="flex:1; min-width:120px; font-size:11px; padding:8px; background:var(--carte-2)" onclick="relanceHist(${h.id})">✉️ Relancer</button>` : ''}
                </div>
            </div>`;
        }).join('');
}

// --- IMPRESSION & FINALISATION ---
//
// Date d'échéance : date de facture + délai de paiement du client (30 j par défaut).
function calcEcheance(dateFr, jours) {
    const p = (dateFr || '').split('/');
    if (p.length !== 3) return '';
    const d = new Date(+p[2], +p[1] - 1, +p[0]);
    d.setDate(d.getDate() + (jours || 30));
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

// Mentions obligatoires sur toute facture B2B (C. com. art. L441-10) — toujours
// imprimées, en plus des mentions libres saisies dans la fiche entreprise.
const MENTIONS_LEGALES = "En cas de retard de paiement : pénalités au taux de 3 fois le taux d'intérêt légal et indemnité forfaitaire pour frais de recouvrement de 40 €. Pas d'escompte pour paiement anticipé.";

async function previewInvoice() {
    let ent = db.ents.find(e => e.id == $('f-ent').value), cli = db.clis.find(c => c.id == $('f-cli').value);
    if (!ent || !cli) return toast("Émetteur ou Client manquant", 'error');

    // Numéro provisoire à l'aperçu : le définitif n'est réservé qu'à la
    // validation, pour qu'un aperçu abandonné ne laisse pas de trou.
    if (!$('f-num').value || $('f-num').value === '…') $('f-num').value = genNum();

    // Lignes avec taux de TVA affiché + ventilation de la TVA par taux
    // (mentions obligatoires : taux par ligne, montant de taxe par taux).
    let rows = '', ht = 0, ttc = 0;
    const parTaux = {};
    curLines.forEach(l => {
        const taux = l.tva === undefined || l.tva === null ? 20 : l.tva;
        let lht = l.prix * l.qte;
        let ltva = lht * taux / 100;
        ht += lht; ttc += lht + ltva;
        parTaux[taux] = (parTaux[taux] || 0) + ltva;
        rows += `<tr><td>${ech(l.nom)}</td><td style="text-align:center">${l.qte}</td><td>${eur(l.prix)}</td><td style="text-align:center">${taux} %</td><td style="text-align:right">${eur(lht)}</td></tr>`;
    });
    const lignesTva = Object.entries(parTaux)
        .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
        .map(([taux, m]) => `<div class="inv-total-line"><span>TVA ${taux} %</span><span>${eur(m)}</span></div>`)
        .join('');
    const echeance = calcEcheance($('f-date').value, cli.echeanceJours);

    $('sheet-holder').innerHTML = `
        <div class="inv-wrap">
            <h1>Facture</h1>
            <div class="inv-header-grid">
                <div><b>Émetteur</b>${ech(ent.nom)}<br>${ech(ent.adr)}<br>${ech(ent.ville)}<br>SIRET: ${ech(ent.siret)}</div>
                <div style="text-align:right"><b>Client</b>${ech(cli.nom)}<br>${ech(cli.adr)}<br>${ech(cli.ville)}</div>
            </div>
            <div style="margin-bottom:20px">
                <b>N° FACTURE :</b> ${ech($('f-num').value)}<br>
                <b>DATE :</b> ${ech($('f-date').value)}
                ${echeance ? `<br><b>DATE D'ÉCHÉANCE :</b> ${echeance}` : ''}
            </div>
            <table class="inv-table">
                <thead><tr><th>Description</th><th>Qté</th><th>P.U HT</th><th style="text-align:center">TVA</th><th style="text-align:right">Total HT</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="inv-totals">
                <div class="inv-total-line"><span>Total HT</span><span>${eur(ht)}</span></div>
                ${lignesTva}
                <div class="inv-total-line"><span>Total TVA</span><span>${eur(ttc - ht)}</span></div>
                <div class="inv-total-final"><span>TOTAL TTC</span><span>${eur(ttc)}</span></div>
            </div>
            <div class="payment-box">
                <div><h3>Coordonnées Bancaires</h3>IBAN: ${ech(ent.iban)}</div>
                <div class="payment-mentions">${ech(ent.mentions).replace(/\n/g, '<br>')}${ent.mentions ? '<br>' : ''}${MENTIONS_LEGALES}</div>
            </div>
        </div>`;
    $('preview-wrap').style.display = 'block';
}

async function finalizeInvoice() {
    let entObj = db.ents.find(e => e.id == $('f-ent').value);
    let cliObj = db.clis.find(c => c.id == $('f-cli').value);
    if (!cliObj) return toast("Client manquant : impossible de valider la facture", 'error');
    if (!curLines.length) return toast("Facture vide : ajoute au moins une ligne", 'error');
    let ht = curLines.reduce((s, l) => s + ((Number(l.qte) || 0) * (Number(l.prix) || 0)), 0);
    let ttc = curLines.reduce((s, l) => s + ((Number(l.qte) || 0) * (Number(l.prix) || 0) * (1 + ((l.tva == null ? 20 : Number(l.tva) || 0) / 100))), 0);
    if (!isFinite(ht) || !isFinite(ttc) || ttc <= 0) {
        return toast("Une quantité ou un prix est vide : corrige la ligne avant de valider", 'error');
    }
    // Le numéro définitif n'est réservé qu'ici, puis l'aperçu est redessiné
    // pour que la feuille imprimée porte bien ce numéro.
    $('f-num').value = await reserveInvoiceNumber();
    await previewInvoice();
    curLines.forEach(l => { let p = db.prods.find(x => x.id == l.pid); if (p) p.stock -= (Number(l.qte) || 0); });
    G.set('v90_prods', db.prods);
    // Traçabilité : si la facture vient d'un brouillon issu de BL, on garde
    // les références des bons d'origine (affichées dans l'Historique).
    let srcDraft = curDraftId ? db.drafts.find(d => d.id == curDraftId) : null;
    db.hist.push({
        id: Date.now(),
        num: $('f-num').value,
        date: $('f-date').value,
        cli: cliObj.nom,
        cliEmail: cliObj.email || '',
        ent: entObj ? entObj.nom : '',
        items: curLines.map(l => ({ icon: l.icon, nom: l.nom, qte: l.qte, prix: l.prix, unite: l.unite, tva: l.tva })),
        ht: eur(ht),
        total: eur(ttc),
        htNum: ht,
        ttcNum: ttc,
        statut: 'en_attente',
        echeance: calcEcheance($('f-date').value, cliObj.echeanceJours),
        blIds: srcDraft && srcDraft.blIds ? srcDraft.blIds : []
    });
    G.set('v90_hist', db.hist);
    if (curDraftId) db.drafts = db.drafts.filter(d => d.id != curDraftId);
    G.set('v90_drafts', db.drafts);
    // Remise à zéro : sans elle, les lignes de cette facture repartaient dans
    // la suivante et le stock était décrémenté une seconde fois.
    curLines = [];
    curDraftId = null;
    renderLines();
    $('f-num').value = genNum();
    // Le numéro a déjà été réservé (atomiquement) dans previewInvoice() — ne pas réincrémenter ici.
    window.print();
    closePreview();
    showPage('home');
}

function deleteItem(t, id) { if (confirm("Supprimer ?")) { db[t] = db[t].filter(x => x.id != id); G.set('v90_' + t, db[t]); renderAll(); } }
function deleteHist(id, num) {
    if (!confirm(`Supprimer la facture ${num} ?`)) return;
    db.hist = id ? db.hist.filter(h => h.id != id) : db.hist.filter(h => h.num !== num);
    G.set('v90_hist', db.hist);
    renderAll();
}
function closePreview() {
    $('preview-wrap').style.display = 'none';
    $('btn-finalize-inv').style.display = 'flex';
    $('btn-print-bl').style.display = 'none';
}

function printBL(id) {
    let b = db.bls.find(x => x.id == id);
    if (!b) return;
    let ent = (b.entId ? db.ents.find(e => e.id == b.entId) : null) || db.ents[0] || null;
    let cli = db.clis.find(c => c.id == b.cid);
    let rows = '', poidsTotal = 0;
    b.items.forEach(i => {
        let pu = getPoids(i);
        let lpoids = i.qte * pu;
        poidsTotal += lpoids;
        rows += `<tr><td>${i.icon || ''} ${i.nom}</td><td style="text-align:center">${i.qte}</td><td style="text-align:center">${i.unite}</td><td style="text-align:right">${pu ? pu + ' kg' : '—'}</td><td style="text-align:right">${lpoids ? lpoids.toFixed(2) + ' kg' : '—'}</td></tr>`;
    });
    $('sheet-holder').innerHTML = `
        <div class="inv-wrap" style="background:#fff">
            <h1>Bon de Livraison</h1>
            <div class="inv-header-grid">
                <div>${ent ? `<b>Émetteur</b>${ent.nom}<br>${ent.adr}<br>${ent.ville}${ent.siret ? '<br>SIRET : ' + ent.siret : ''}` : ''}</div>
                <div style="text-align:right"><b>Destinataire</b>${cli ? cli.nom + '<br>' + (cli.adr || '') + '<br>' + (cli.ville || '') : b.cliNom}</div>
            </div>
            <div style="margin-bottom:20px"><b>DATE :</b> ${b.date}</div>
            <table class="inv-table">
                <thead><tr><th>Désignation</th><th style="text-align:center">Qté</th><th style="text-align:center">Unité</th><th style="text-align:right">Poids unit.</th><th style="text-align:right">Poids total</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="inv-totals">
                <div class="inv-total-final"><span>POIDS TOTAL</span><span>${poidsTotal.toFixed(2)} kg</span></div>
            </div>
            <div class="payment-box" style="margin-top:40px">
                <div style="font-size:13px; color:#555">Bon de livraison — à conserver</div>
                ${ent?.mentions ? `<div class="payment-mentions">${ent.mentions.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        </div>`;
    $('btn-finalize-inv').style.display = 'none';
    $('btn-print-bl').style.display = 'flex';
    $('preview-wrap').style.display = 'block';
}

// --- TVA ASSISTANT ---
const tvaState = {
    rows: [], banks: [], filterType: 'tous', search: '',
    defaultAchat: '20%', defaultVente: '5.5%'
};

const TVA_KW_EXACT = ['salaire','paie','msa','pret','pret','interet','interet','retard','remboursement','sie','ballanger','gauvrit','lebreton','perraudeau'];
const TVA_KW_PARTIAL = ['cotis','retraite','agrica','impot','impot','tresor','tresor','assur','pacifica','caae','cnp','macif','maif','ag2r','prevoyance','revolut','virement','loyer'];

function tvaDetectTaux(label, isDebit) {
    const low = (label || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const words = low.split(/[\s\W]+/);
    for (const kw of TVA_KW_EXACT) {
        if (words.includes(kw.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) return '0%';
    }
    for (const kw of TVA_KW_PARTIAL) {
        if (low.includes(kw.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) return '0%';
    }
    if (/rejet/i.test(label)) return '20%';
    return isDebit ? '20%' : '5.5%';
}

function tvaParseAmount(val) {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return val;
    let s = String(val).replace(/[\u00a0\u202f\u2009\s]/g, '').replace('€', '');
    if (s.match(/^-?\d+\.\d{3},\d+$/)) s = s.replace('.', '').replace(',', '.');
    else s = s.replace(',', '.');
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
}

async function tvaParseExcel(buffer, bankName) {
    await chargerXLSX();
    const wb = XLSX.read(buffer, { type: 'array', cellDates: true, raw: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: true });
    let headerRow = -1, colDate = -1, colLabel = -1, colDebit = -1, colCredit = -1, colMontant = -1;
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i].map(c => String(c || '').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' '));
        const dIdx = r.findIndex(c => c === 'date' || c === 'date operation' || c === 'date op');
        const dFallback = r.findIndex(c => c.startsWith('date'));
        const finalD = dIdx >= 0 ? dIdx : dFallback;
        const lIdx = r.findIndex(c => c === 'libelle' || c === 'nom de la contrepartie' || c.includes('contrepartie') || c.includes('libel') || c.includes('wording') || c.includes('label') || c.includes('operat') || c.includes('descrip'));
        if (finalD >= 0 && lIdx >= 0) {
            headerRow = i; colDate = finalD; colLabel = lIdx;
            const dbIdx = r.findIndex(c => c.includes('debit'));
            const crIdx = r.findIndex(c => c.includes('credit'));
            if (dbIdx >= 0 && crIdx >= 0 && dbIdx !== crIdx) { colDebit = dbIdx; colCredit = crIdx; }
            else {
                const mIdx = r.findIndex(c => c.includes('montant') || c.includes('mont') || c.includes('amount') || c.includes('total'));
                colMontant = mIdx >= 0 ? mIdx : -1;
            }
            break;
        }
    }
    if (headerRow < 0) return [];
    const result = [];
    for (let i = headerRow + 1; i < rows.length; i++) {
        const r = rows[i];
        if (!r || r.every(c => c === null || c === '' || c === undefined)) continue;
        const label = String(r[colLabel] || '').replace(/\n/g, ' ').trim();
        if (!label) continue;
        let debit = null, credit = null;
        if (colDebit >= 0 && colCredit >= 0) {
            debit = tvaParseAmount(r[colDebit]); credit = tvaParseAmount(r[colCredit]);
        } else if (colMontant >= 0) {
            const m = tvaParseAmount(r[colMontant]);
            if (m !== null) { if (m < 0) debit = Math.abs(m); else credit = m; }
        }
        if (debit === null && credit === null) continue;
        const dateRaw = r[colDate];
        let dateStr = '';
        if (dateRaw instanceof Date) {
            dateStr = dateRaw.toLocaleDateString('fr-FR');
        } else if (dateRaw) {
            const s = String(dateRaw).trim();
            const m = s.match(/(\d{2})[-/](\d{2})[-/](\d{4})/);
            if (m) dateStr = `${m[1]}/${m[2]}/${m[3]}`;
            else { const iso = s.match(/(\d{4})[-/](\d{2})[-/](\d{2})/); if (iso) dateStr = `${iso[3]}/${iso[2]}/${iso[1]}`; else dateStr = s; }
        }
        const isDebit = debit !== null && debit > 0;
        const isRejet = /rejet/i.test(label);
        result.push({
            id: `${i}-${Math.random().toString(36).slice(2, 7)}`,
            date: dateStr, label, montant: isDebit ? debit : credit,
            type: isDebit ? 'achat' : (isRejet ? 'rejet' : 'vente'),
            taux: tvaDetectTaux(label, isDebit),
            source: bankName, isRejet
        });
    }
    return result;
}

function tvaLoadFile(file) {
    const name = file.name.replace(/\.xlsx?$/i, '');
    const reader = new FileReader();
    reader.onload = async e => {
        let parsed;
        try { parsed = await tvaParseExcel(new Uint8Array(e.target.result), name); }
        catch (err) { return toast("📊 Fichier illisible ou outil Excel indisponible.", 'error'); }
        tvaState.rows = tvaState.rows.filter(r => r.source !== name).concat(parsed).sort((a, b) => {
            return a.date.split('/').reverse().join('').localeCompare(b.date.split('/').reverse().join(''));
        });
        if (!tvaState.banks.includes(name)) tvaState.banks.push(name);
        const fi = $('tva-file-input'); if (fi) fi.value = '';
        tvaRender();
    };
    reader.readAsArrayBuffer(file);
}

function tvaRemoveBank(name) {
    tvaState.rows = tvaState.rows.filter(r => r.source !== name);
    tvaState.banks = tvaState.banks.filter(b => b !== name);
    tvaRender();
}

function tvaUpdate(id, field, val) {
    const r = tvaState.rows.find(x => x.id === id);
    if (r) { r[field] = val; tvaRenderTable(); tvaRenderStats(); }
}

function tvaApplyDefaults() {
    tvaState.rows = tvaState.rows.map(r => ({
        ...r, taux: r.taux === '0%' ? '0%' : (r.type === 'achat' || r.type === 'rejet') ? tvaState.defaultAchat : tvaState.defaultVente
    }));
    tvaRenderTable(); tvaRenderStats();
}

function tvaCalcTotaux() {
    let tvaC = 0, tvaD = 0, tvaR = 0, htV = 0, htA = 0, ttcV = 0, ttcA = 0, ttcR = 0;
    for (const r of tvaState.rows) {
        const t = parseFloat(r.taux) / 100;
        const ttc = r.montant || 0;
        const ht = t > 0 ? ttc / (1 + t) : ttc;
        const tva = ttc - ht;
        if (r.type === 'vente')      { ttcV += ttc; htV += ht; tvaC += tva; }
        else if (r.type === 'achat') { ttcA += ttc; htA += ht; tvaD += tva; }
        else if (r.type === 'rejet') { ttcR += ttc; tvaR += tva; }
    }
    return { tvaC, tvaD, tvaR, tvaDeductibleNette: tvaD - tvaR, htV, htA, ttcV, ttcA, ttcR, solde: tvaC - (tvaD - tvaR) };
}

function tvaFmt(n) {
    if (!n && n !== 0) return '—';
    return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function tvaFilteredRows() {
    return tvaState.rows.filter(r => {
        if (tvaState.filterType !== 'tous' && r.type !== tvaState.filterType) return false;
        if (tvaState.search && !r.label.toLowerCase().includes(tvaState.search.toLowerCase())) return false;
        return true;
    });
}

function tvaRenderStats() {
    const el = $('tva-stats-bar'); if (!el) return;
    if (!tvaState.rows.length) { el.style.display = 'none'; return; }
    const tot = tvaCalcTotaux();
    const soldeColor = tot.solde >= 0 ? 'var(--run)' : 'var(--ok)';
    el.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; justify-content:center';
    el.innerHTML = `
        <div class="tva-stat">${tvaState.rows.length}<small>Transactions</small></div>
        <div class="tva-stat" style="color:var(--ok)">${tvaFmt(tot.tvaC)}<small>TVA collectée</small></div>
        <div class="tva-stat" style="color:var(--peach-ink)">${tvaFmt(tot.tvaD)}<small>TVA déductible brute</small></div>
        ${tot.tvaR > 0 ? `<div class="tva-stat" style="color:var(--lilac-ink)">${tvaFmt(tot.tvaR)}<small>TVA annulée (rejets)</small></div>` : ''}
        <div class="tva-stat" style="color:${soldeColor}">${tvaFmt(Math.abs(tot.solde))}<small>${tot.solde >= 0 ? 'À reverser' : 'Crédit TVA'}</small></div>`;
}

function tvaRenderBanksList() {
    const el = $('tva-banks-list'); if (!el) return;
    el.innerHTML = tvaState.banks.map(b => {
        const count = tvaState.rows.filter(r => r.source === b).length;
        return `<span class="tva-bank-tag">✓ ${ech(b)} <span style="opacity:.7">(${count})</span> <span onclick="tvaRemoveBank(${jsArg(b)})" style="cursor:pointer; margin-left:4px; opacity:.6">×</span></span>`;
    }).join('');
}

function tvaRenderToolbar() {
    const el = $('tva-toolbar'); if (!el) return;
    if (!tvaState.rows.length) { el.style.display = 'none'; return; }
    el.style.display = 'block';
    const rejetCount = tvaState.rows.filter(r => r.isRejet).length;
    const filtered = tvaFilteredRows();
    const TAUX = ['0%', '5.5%', '10%', '20%'];
    const mkFlt = (v, l, rejet = false) => {
        const on = tvaState.filterType === v;
        const cls = rejet ? (on ? 'tva-flt tva-flt-rejet-on' : 'tva-flt tva-flt-rejet-off') : (on ? 'tva-flt tva-flt-on' : 'tva-flt tva-flt-off');
        return `<button class="${cls}" onclick="tvaState.filterType='${v}';tvaRenderTable();tvaRenderToolbar()">${l}</button>`;
    };
    el.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:10px">
            <div class="tva-defaults-bar">
                <span style="font-size:12px; opacity:.6">Taux défaut :</span>
                <label style="font-size:12px; color:var(--peach-ink); display:flex; align-items:center; gap:5px">Achats
                    <select class="tva-sel" onchange="tvaState.defaultAchat=this.value">
                        ${TAUX.map(t => `<option${t === tvaState.defaultAchat ? ' selected' : ''}>${t}</option>`).join('')}
                    </select>
                </label>
                <label style="font-size:12px; color:var(--ok); display:flex; align-items:center; gap:5px">Ventes
                    <select class="tva-sel" onchange="tvaState.defaultVente=this.value">
                        ${TAUX.map(t => `<option${t === tvaState.defaultVente ? ' selected' : ''}>${t}</option>`).join('')}
                    </select>
                </label>
                <button class="btn tva-btn-ghost" onclick="tvaApplyDefaults()">Réappliquer</button>
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap">
                ${mkFlt('tous','Tout')}${mkFlt('vente','Ventes')}${mkFlt('achat','Achats')}
                ${mkFlt('rejet','Rejets' + (rejetCount ? ` (${rejetCount})` : ''), true)}
            </div>
            <input type="search" class="tva-search" placeholder="Rechercher…" value="${tvaState.search.replace(/"/g,'&quot;')}" oninput="tvaState.search=this.value;tvaRenderTable()">
            <span style="font-size:12px; opacity:.6">${filtered.length} ligne${filtered.length > 1 ? 's' : ''}</span>
            <button class="btn tva-btn-export" onclick="tvaExport()">📊 Export Excel</button>
        </div>`;
}

function tvaRenderTable() {
    const wrap = $('tva-table-wrap');
    const info = $('tva-info');
    if (!wrap) return;
    if (!tvaState.rows.length) { wrap.style.display = 'none'; if (info) info.style.display = 'none'; return; }
    wrap.style.display = 'block';
    if (info) info.style.display = 'block';
    const TAUX = ['0%', '5.5%', '10%', '20%'];
    const filtered = tvaFilteredRows();
    const tot = tvaCalcTotaux();

    const rowsHtml = filtered.map((r, i) => {
        const t = parseFloat(r.taux) / 100;
        const ttc = r.montant || 0;
        const ht = t > 0 ? ttc / (1 + t) : ttc;
        const tva = ttc - ht;
        const bg = i % 2 === 0 ? 'var(--carte-2)' : 'transparent';
        const typeColor = r.type === 'vente' ? 'var(--ok)' : r.type === 'rejet' ? 'var(--lilac-ink)' : 'var(--peach-ink)';
        const typeBg = r.type === 'vente' ? 'rgba(74,222,128,0.1)' : r.type === 'rejet' ? 'rgba(167,139,250,0.1)' : 'rgba(251,146,60,0.1)';
        const typeBd = r.type === 'vente' ? 'rgba(74,222,128,0.3)' : r.type === 'rejet' ? 'rgba(167,139,250,0.3)' : 'rgba(251,146,60,0.3)';
        const tvaColor = r.type === 'vente' ? 'var(--ok)' : r.type === 'rejet' ? 'var(--lilac-ink)' : tva > 0 ? 'var(--peach-ink)' : 'var(--muted)';
        const tc = r.taux === '0%' ? 'zero' : r.taux === '5.5%' ? 'low' : r.taux === '10%' ? 'mid' : 'high';
        const rid = r.id.replace(/'/g, "\\'");
        return `<tr style="border-bottom:1px solid var(--carte-2)">
            <td style="padding:9px 12px;background:${bg};font-size:11px;opacity:.7;white-space:nowrap">${ech(r.date)}</td>
            <td style="padding:9px 12px;background:${bg};max-width:220px">
                <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;color:${r.isRejet ? 'var(--lilac-ink)' : 'inherit'}" title="${r.label.replace(/"/g,'&quot;')}">
                    ${r.isRejet ? '<span style="font-size:10px;margin-right:4px;opacity:.7">⊘</span>' : ''}${ech(r.label)}
                </div>
            </td>
            <td style="padding:9px 12px;background:${bg}"><span style="background:var(--carte-2);border-radius:6px;padding:2px 8px;font-size:11px;opacity:.7">${ech(r.source)}</span></td>
            <td style="padding:9px 12px;background:${bg}">
                <select onchange="tvaUpdate(${jsArg(rid)},'type',this.value)" style="background:${typeBg};color:${typeColor};border:1px solid ${typeBd};border-radius:20px;padding:3px 8px;font-size:12px;font-weight:600;cursor:pointer;outline:none;font-family:inherit">
                    <option value="vente"${r.type === 'vente' ? ' selected' : ''}>Vente</option>
                    <option value="achat"${r.type === 'achat' ? ' selected' : ''}>Achat</option>
                    <option value="rejet"${r.type === 'rejet' ? ' selected' : ''}>Rejet</option>
                </select>
            </td>
            <td style="padding:9px 12px;background:${bg};text-align:right;font-weight:600;white-space:nowrap">${tvaFmt(ttc)}</td>
            <td style="padding:9px 12px;background:${bg};text-align:center">
                <select class="tva-sel tva-taux-${tc}" onchange="tvaUpdate(${jsArg(rid)},'taux',this.value)">
                    ${TAUX.map(tx => `<option${tx === r.taux ? ' selected' : ''}>${tx}</option>`).join('')}
                </select>
            </td>
            <td style="padding:9px 12px;background:${bg};text-align:right;font-size:12px;opacity:.7;white-space:nowrap">${t > 0 ? tvaFmt(ht) : '—'}</td>
            <td style="padding:9px 12px;background:${bg};text-align:right;font-weight:700;white-space:nowrap;color:${tvaColor}">
                ${tva > 0 ? (r.type === 'rejet' ? '−' : '') + tvaFmt(tva) : '—'}
            </td>
        </tr>`;
    }).join('');

    const rejetRow = tot.tvaR > 0 ? `
        <tr style="background:rgba(167,139,250,0.07);border-top:1px solid rgba(167,139,250,0.3)">
            <td colspan="4" style="padding:11px 14px;font-weight:700;color:var(--lilac-ink);font-size:13px">REJETS (TVA annulée)</td>
            <td style="padding:11px 14px;text-align:right;font-weight:700;color:var(--lilac-ink)">${tvaFmt(tot.ttcR)}</td>
            <td></td><td></td>
            <td style="padding:11px 14px;text-align:right;font-weight:800;color:var(--lilac-ink);font-size:15px">−${tvaFmt(tot.tvaR)}</td>
        </tr>` : '';
    const soldeColor = tot.solde >= 0 ? 'var(--run)' : 'var(--ok)';
    const soldeBg = tot.solde >= 0 ? 'rgba(251,191,36,0.05)' : 'rgba(74,222,128,0.05)';

    wrap.innerHTML = `
        <table class="tva-table">
            <thead>
                <tr style="background:var(--carte-2);border-bottom:2px solid var(--ligne)">
                    ${['Date','Libellé','Banque','Type','Montant TTC','Taux TVA','HT','TVA'].map((h, i) =>
                        `<th style="padding:10px 12px;text-align:${i >= 4 ? 'right' : 'left'};font-size:11px;font-weight:600;letter-spacing:.5px;opacity:.5;white-space:nowrap">${h}</th>`
                    ).join('')}
                </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
            <tfoot>
                <tr style="background:rgba(74,222,128,0.07);border-top:2px solid rgba(74,222,128,0.3)">
                    <td colspan="4" style="padding:11px 14px;font-weight:700;color:var(--ok);font-size:13px">TOTAL VENTES</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:var(--ok)">${tvaFmt(tot.ttcV)}</td>
                    <td></td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:var(--ok)">${tvaFmt(tot.htV)}</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:800;color:var(--ok);font-size:15px">${tvaFmt(tot.tvaC)}</td>
                </tr>
                <tr style="background:rgba(251,146,60,0.07);border-top:1px solid rgba(251,146,60,0.3)">
                    <td colspan="4" style="padding:11px 14px;font-weight:700;color:var(--peach-ink);font-size:13px">TOTAL ACHATS (brut)</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:var(--peach-ink)">${tvaFmt(tot.ttcA)}</td>
                    <td></td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:var(--peach-ink)">${tvaFmt(tot.htA)}</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:800;color:var(--peach-ink);font-size:15px">${tvaFmt(tot.tvaD)}</td>
                </tr>
                ${rejetRow}
                <tr style="border-top:1px solid var(--carte-2)">
                    <td colspan="7" style="padding:11px 14px;font-size:12px;opacity:.5">TVA déductible nette (achats − rejets)</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:800;color:var(--peach-ink);font-size:15px">${tvaFmt(tot.tvaDeductibleNette)}</td>
                </tr>
                <tr style="background:${soldeBg};border-top:2px solid var(--ligne)">
                    <td colspan="6" style="padding:14px;font-weight:700;color:${soldeColor};font-size:14px">
                        ${tot.solde >= 0 ? '▶ TVA NETTE À REVERSER' : '▶ CRÉDIT DE TVA'}
                        <span style="font-weight:400;font-size:12px;margin-left:8px;opacity:.6">collectée − déductible nette</span>
                    </td>
                    <td colspan="2" style="padding:14px;text-align:right;font-weight:800;color:${soldeColor};font-size:22px">${tvaFmt(Math.abs(tot.solde))}</td>
                </tr>
            </tfoot>
        </table>`;
}

function tvaRender() {
    tvaRenderBanksList();
    tvaRenderStats();
    tvaRenderToolbar();
    tvaRenderTable();
}

function tvaDragOver(e) { e.preventDefault(); $('tva-drop-zone').classList.add('tva-drop-active'); }
function tvaDragLeave() { $('tva-drop-zone').classList.remove('tva-drop-active'); }
function tvaDrop(e) {
    e.preventDefault();
    $('tva-drop-zone').classList.remove('tva-drop-active');
    Array.from(e.dataTransfer.files).filter(f => f.name.match(/\.xlsx?$/i)).forEach(tvaLoadFile);
}
function tvaFileChange(e) { if (e.target.files[0]) tvaLoadFile(e.target.files[0]); }

async function tvaExport() {
    try { await chargerXLSX(); } catch (e) { return toast("📊 Outil Excel indisponible : vérifie ta connexion, puis réessaie.", 'error'); }
    if (!window.XLSX) return toast('SheetJS non chargé', 'error');
    const wb = XLSX.utils.book_new();
    const headers = ['Date','Libellé','Banque','Type','Montant TTC','Taux TVA','HT','TVA'];
    const dataRows = tvaState.rows.map(r => {
        const t = parseFloat(r.taux) / 100;
        const ttc = r.montant || 0;
        const ht = t > 0 ? ttc / (1 + t) : ttc;
        const tva = t > 0 ? ttc - ht : 0;
        return [r.date, r.label, r.source, r.type === 'vente' ? 'Vente' : r.type === 'rejet' ? 'Rejet' : 'Achat', ttc, r.taux, t > 0 ? parseFloat(ht.toFixed(2)) : '', t > 0 ? parseFloat(tva.toFixed(2)) : ''];
    });
    const ws1 = XLSX.utils.aoa_to_sheet([headers, ...dataRows]);
    ws1['!cols'] = [{wch:12},{wch:50},{wch:25},{wch:10},{wch:14},{wch:10},{wch:14},{wch:14}];
    const tot = tvaCalcTotaux();
    const ws2 = XLSX.utils.aoa_to_sheet([
        ['RÉCAPITULATIF TVA', ''], ['', ''],
        ['TVA collectée (ventes)', parseFloat(tot.tvaC.toFixed(2))],
        ['TVA déductible brute (achats)', parseFloat(tot.tvaD.toFixed(2))],
        ['TVA annulée (rejets)', parseFloat(tot.tvaR.toFixed(2))],
        ['TVA déductible nette', parseFloat(tot.tvaDeductibleNette.toFixed(2))],
        ['', ''],
        [tot.solde >= 0 ? 'TVA NETTE À REVERSER' : 'CRÉDIT DE TVA', parseFloat(Math.abs(tot.solde).toFixed(2))],
        ['', ''], ['DÉTAIL TTC', ''],
        ['Total ventes TTC', parseFloat(tot.ttcV.toFixed(2))],
        ['Total achats TTC', parseFloat(tot.ttcA.toFixed(2))],
        ['Total rejets TTC', parseFloat(tot.ttcR.toFixed(2))],
    ]);
    ws2['!cols'] = [{wch:35},{wch:18}];
    XLSX.utils.book_append_sheet(wb, ws1, 'Transactions');
    XLSX.utils.book_append_sheet(wb, ws2, 'Récapitulatif TVA');
    XLSX.writeFile(wb, 'TVA_' + new Date().toLocaleDateString('fr-FR').replace(/\//g, '-') + '.xlsx');
}

// --- COMPTA ---
function histMonthKey(dateStr) {
    const p = (dateStr || '').split('/');
    return p.length === 3 ? `${p[2]}-${p[1]}` : null;
}

const comptaState = { filtered: [] };

// Comptabilité : filtre par période (les champs "Période" existaient déjà côté
// UI mais n'étaient jusqu'ici jamais utilisés dans le calcul) + fait remonter
// les dépenses détectées par le module Mail (passerelle Mail → Compta).
async function calcCompta() {
    const debut = $('compta-debut').value, fin = $('compta-fin').value;
    const entFilter = $('compta-ent') ? $('compta-ent').value : '';

    const filtered = db.hist.filter(h => {
        if (entFilter && entFilter !== 'Toutes' && (h.ent || '') !== entFilter) return false;
        const mk = histMonthKey(h.date);
        if (!mk) return true;
        if (debut && mk < debut) return false;
        if (fin && mk > fin) return false;
        return true;
    });
    comptaState.filtered = filtered;

    let ca = 0, tvaCol = 0;
    filtered.forEach(h => {
        const m = histMontants(h);
        ca += m.ht;
        tvaCol += m.tva;
    });


    $('compta-stats').innerHTML = `
        <div class="card" style="flex-direction:column; align-items:center; gap:6px">
            <span style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Chiffre d'Affaires HT</span>
            <b style="font-size:22px">${eur(ca)}</b>
        </div>
        <div class="card" style="flex-direction:column; align-items:center; gap:6px">
            <span style="font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">TVA Collectée</span>
            <b style="font-size:22px; color:var(--gold)">${eur(tvaCol)}</b>
        </div>`;
    $('compta-result').innerHTML = `
        <div class="section-title" style="margin-top:10px">Factures (${filtered.length})</div>
        ${filtered.slice().reverse().map(h => `
            <div class="card"><b>${ech(h.num)}</b> — ${ech(h.cli)}<b style="float:right">${ech(h.total)}</b></div>
        `).join('') || '<div style="color:var(--text-muted); text-align:center">Aucune facture sur cette période</div>'}
        ${comptaTresoHtml(filtered)}
        ${comptaStatsHtml(filtered)}`;
}

// --- ENCAISSEMENTS (mois par mois) ---
// Factures MARQUÉES PAYÉES, comptées à leur date de facture : la date
// d'encaissement exacte n'est pas saisie. Les dépenses venaient du module Mail,
// retiré — il n'y a donc plus de colonne « dépensé » ni de solde.
function comptaTresoHtml(filtered) {
    const entrees = {};
    filtered.filter(h => h.statut === 'payee').forEach(h => {
        const mk = histMonthKey(h.date);
        if (!mk) return;
        entrees[mk] = (entrees[mk] || 0) + histMontants(h).ttc;
    });
    const mois = Object.keys(entrees).sort();
    if (!mois.length) return '';
    let total = 0;
    const lignes = mois.map(mk => {
        const [y, m] = mk.split('-');
        const ein = entrees[mk];
        total += ein;
        return `
        <div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px dashed var(--border); font-size:13px">
            <b style="flex:0 0 70px">${m}/${y}</b>
            <span style="flex:1; text-align:right; color:var(--sage)">+ ${eur(ein)}</span>
        </div>`;
    }).join('');
    return `
        <div class="section-title" style="margin-top:28px">💶 Encaissements par mois</div>
        <div class="card" style="flex-direction:column; align-items:stretch">
            <div style="display:flex; gap:10px; font-size:11px; color:var(--text-muted); text-transform:uppercase; padding-bottom:6px">
                <span style="flex:0 0 70px">Mois</span>
                <span style="flex:1; text-align:right">Encaissé TTC</span>
            </div>
            ${lignes}
            <div style="display:flex; align-items:center; gap:10px; padding-top:10px; font-size:14px">
                <b style="flex:0 0 70px">Total</b>
                <b style="flex:1; text-align:right; font-size:16px; color:var(--sage)">+ ${eur(total)}</b>
            </div>
            <div style="font-size:11px; opacity:.5; margin-top:8px">Factures marquées payées, comptées à leur date de facture.</div>
        </div>`;
}

// --- STATISTIQUES DE VENTES (CA mensuel, top produits, top clients) ---
// Calculées sur les factures filtrées (entreprise + période) — barres en CSS
// pur, aucune dépendance. Le HT vient des lignes quand elles existent, sinon
// du total TTC / 1,2 (anciennes factures sans détail).
function comptaHistHt(h) {
    return histMontants(h).ht;
}

function comptaBarList(entries, color) {
    const max = Math.max(...entries.map(e => e[1]), 1);
    return entries.map(([label, val]) => `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
            <span style="flex:0 0 110px; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap" title="${ech(label)}">${ech(label)}</span>
            <div style="flex:1; height:18px; background:var(--carte-2); border-radius:4px; overflow:hidden">
                <div style="width:${(val / max * 100).toFixed(1)}%; height:100%; background:${color}; border-radius:4px"></div>
            </div>
            <b style="flex:0 0 90px; text-align:right; font-size:12px">${eur(val)}</b>
        </div>`).join('');
}

function comptaStatsHtml(filtered) {
    if (!filtered.length) return '';
    const parMois = {}, parProduit = {}, parClient = {};
    filtered.forEach(h => {
        const ht = comptaHistHt(h);
        const mk = histMonthKey(h.date);
        if (mk) parMois[mk] = (parMois[mk] || 0) + ht;
        parClient[h.cli || '?'] = (parClient[h.cli || '?'] || 0) + ht;
        (h.items || []).forEach(i => {
            parProduit[i.nom] = (parProduit[i.nom] || 0) + i.qte * i.prix;
        });
    });
    const mois = Object.entries(parMois).sort((a, b) => a[0].localeCompare(b[0]))
        .map(([mk, v]) => { const [y, m] = mk.split('-'); return [`${m}/${y}`, v]; });
    const topProduits = Object.entries(parProduit).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topClients = Object.entries(parClient).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return `
        <div class="section-title" style="margin-top:28px">📈 CA HT par mois</div>
        <div class="card" style="flex-direction:column; align-items:stretch">${comptaBarList(mois, 'var(--accent)')}</div>
        ${topProduits.length ? `
            <div class="section-title" style="margin-top:20px">🏆 Top produits (HT)</div>
            <div class="card" style="flex-direction:column; align-items:stretch">${comptaBarList(topProduits, 'var(--sage)')}</div>` : ''}
        <div class="section-title" style="margin-top:20px">👥 Top clients (HT)</div>
        <div class="card" style="flex-direction:column; align-items:stretch">${comptaBarList(topClients, 'var(--ambre)')}</div>`;
}

async function comptaExport() {
    try { await chargerXLSX(); } catch (e) { return toast("📊 Outil Excel indisponible : vérifie ta connexion, puis réessaie.", 'error'); }
    if (!window.XLSX) return toast('SheetJS non chargé', 'error');
    if (!comptaState.filtered.length) return toast('Aucune donnée à exporter pour cette période (clique d\'abord sur "Voir le bilan").', 'error');

    const wb = XLSX.utils.book_new();

    const headers1 = ['N° Facture', 'Date', 'Client', 'Entreprise', 'HT', 'TTC', 'Statut'];
    const rows1 = comptaState.filtered.map(h => [h.num, h.date, h.cli, h.ent || '', h.ht || '', h.total, comptaStatutLabel(h)]);
    const ws1 = XLSX.utils.aoa_to_sheet([headers1, ...rows1]);
    ws1['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Factures');

    let ca = 0, tvaCol = 0;
    comptaState.filtered.forEach(h => {
        const m = histMontants(h);
        ca += m.ht; tvaCol += m.tva;
    });
    const ws2 = XLSX.utils.aoa_to_sheet([
        ['RÉCAPITULATIF', ''], ['', ''],
        ["Chiffre d'affaires HT", parseFloat(ca.toFixed(2))],
        ['TVA collectée', parseFloat(tvaCol.toFixed(2))],
    ]);
    ws2['!cols'] = [{ wch: 32 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Récapitulatif');

    XLSX.writeFile(wb, 'Compta_' + new Date().toLocaleDateString('fr-FR').replace(/\//g, '-') + '.xlsx');
}

function comptaStatutLabel(h) {
    const s = computeHistStatus(h);
    return s === 'payee' ? 'Payée' : s === 'en_retard' ? 'En retard' : 'En attente';
}

// Les tuiles et les sous-onglets sont des div cliquables : on les rend
// atteignables au clavier, on relie chaque libellé à son champ et on annonce
// les intertitres, sans toucher à l'apparence.
function appliquerAccessibilite() {
    document.querySelectorAll('[onclick]:not(button):not(a):not(input):not(select):not(textarea)').forEach(el => {
        if (el.dataset.clavierOk) return;
        el.dataset.clavierOk = '1';
        if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
    });
    document.querySelectorAll('label:not([for])').forEach(l => {
        const champ = l.parentElement && l.parentElement.querySelector('input[id], select[id], textarea[id]');
        if (champ) l.setAttribute('for', champ.id);
    });
    document.querySelectorAll('.section-title:not([role])').forEach(t => {
        t.setAttribute('role', 'heading');
        t.setAttribute('aria-level', '2');
    });
}

// Échap ferme la fenêtre ouverte, quelle qu'elle soit.
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const apercu = $('preview-wrap');
    if (apercu && apercu.style.display === 'block') return closePreview();
    const ouverte = [...document.querySelectorAll('.modal-overlay')].find(m => m.style.display === 'flex');
    if (ouverte) closeModals();
});

// Initialisation
$('f-date').value = new Date().toLocaleDateString('fr-FR');
showPage('home');
appliquerAccessibilite();

// « Suis-je à jour ? » — date de publication du fichier réellement chargé
// (en-tête Last-Modified servi par GitHub Pages), affichée dans
// Paramètres → Données pour lever le doute après un déploiement.
try {
    const lm = new Date(document.lastModified);
    if (!isNaN(lm.getTime())) {
        $('site-version').textContent = '🏷 Version du site : ' +
            lm.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) + ' à ' +
            lm.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
} catch (e) {}
