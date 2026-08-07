/**
 * GESTION PRO v9.0 - Core Logic
 */

const $ = (id) => document.getElementById(id);

// Gestion du LocalStorage
const G = {
    get: (k) => JSON.parse(localStorage.getItem(k) || '[]'),
    set: (k, v) => { localStorage.setItem(k, JSON.stringify(v)); Supa.push(k, v); },
    val: (k) => localStorage.getItem(k) || '0'
};

// Synchronisation Supabase
const SUPA_URL = 'https://eusukwnfoixjsjqoptfr.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1c3Vrd25mb2l4anNqcW9wdGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5OTQ3NjMsImV4cCI6MjA4OTU3MDc2M30.ZkmqvszuljAPmvAqrmWT87fFOlJEm7WyrqC6E_f_FbI';

// Réparation recommandée côté Supabase (SQL à exécuter une fois dans l'éditeur
// SQL) — l'ancien push accumulait des lignes en double dans app_data, ce qui
// faisait revenir d'anciennes données au hasard à chaque ouverture de l'app :
//
//   -- 1. Supprimer les doublons en gardant la ligne la plus récente par clé
//   delete from app_data a using app_data b
//     where a.key = b.key and a.ctid < b.ctid;
//   -- 2. Empêcher leur retour
//   alter table app_data add constraint app_data_key_unique unique (key);
//
// Le nouveau push ci-dessous fonctionne même sans cette réparation : il purge
// lui-même les doublons de chaque clé au fil des sauvegardes.
const Supa = {
    _h: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates' },
    state: { lastPushOk: null, lastPushErr: null, pushFails: 0, lastPullOk: null },
    _q: Promise.resolve(), // file d'attente : les écritures partent une par une, jamais entrelacées

    push(key, value) {
        Supa._q = Supa._q.then(async () => {
            try {
                // DELETE puis INSERT : convergent quel que soit le schéma de la table
                // (pas besoin de contrainte unique), et purge les doublons existants.
                const del = await fetch(`${SUPA_URL}/rest/v1/app_data?key=eq.${encodeURIComponent(key)}`, {
                    method: 'DELETE', headers: Supa._h
                });
                const ins = await fetch(`${SUPA_URL}/rest/v1/app_data`, {
                    method: 'POST', headers: Supa._h,
                    body: JSON.stringify({ key, value })
                });
                if (!del.ok || !ins.ok) throw new Error(`HTTP ${del.ok ? ins.status : del.status}`);
                Supa.state.lastPushOk = Date.now();
                Supa.state.pushFails = 0;
                Supa.state.lastPushErr = null;
            } catch (e) {
                Supa.state.pushFails++;
                Supa.state.lastPushErr = e.message;
                // Une seule alerte (au 3e échec consécutif), pas une par sauvegarde
                if (Supa.state.pushFails === 3) {
                    toast('⚠️ Synchronisation cloud en échec — tes données restent enregistrées sur cet appareil. Vois Paramètres → Synchronisation.', 'warn');
                }
            }
            renderSyncStatus();
        });
        return Supa._q;
    },

    async pullAll(manual = false) {
        try {
            const base = `${SUPA_URL}/rest/v1/app_data?select=key,value`;
            const h = { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` };
            // Tri par id croissant : la ligne insérée en dernier (la plus récente)
            // gagne la déduplication. Repli sans tri si la colonne id n'existe pas.
            let res = await fetch(base + '&order=id.asc', { headers: h });
            if (!res.ok) res = await fetch(base, { headers: h });
            if (!res.ok) {
                if (manual) toast(`❌ Lecture cloud impossible (HTTP ${res.status})`, 'error');
                return;
            }
            const rows = await res.json();
            Supa.state.lastPullOk = Date.now();
            if (rows.length) {
                const latest = {};
                rows.forEach(r => { latest[r.key] = r.value; }); // dédup : dernière occurrence gagne
                Object.entries(latest).forEach(([k, v]) => {
                    localStorage.setItem(k, (v !== null && typeof v === 'object') ? JSON.stringify(v) : String(v ?? ''));
                });
                db.clis   = G.get('v90_clis');
                db.prods  = G.get('v90_prods');
                db.ents   = G.get('v90_ents');
                db.hist   = G.get('v90_hist');
                db.bls    = G.get('v90_bls');
                db.drafts = G.get('v90_drafts');
                db.prixCli = JSON.parse(localStorage.getItem('v90_prix_cli') || '{}');
                db.mailCategories = G.get('v90_mail_categories');
                // Ne pas écraser une saisie en cours : si des quantités sont déjà
                // tapées dans la grille BL, on garde l'affichage tel quel (les
                // données db sont à jour, le rendu suivra à la prochaine navigation).
                const saisieEnCours = Array.from(document.querySelectorAll('[id^="qty-"]'))
                    .some(i => parseFloat(i.value) > 0);
                if (!saisieEnCours) renderAll();
            }
            renderSyncStatus();
            if (manual) toast('✅ Données récupérées du cloud.', 'success');
        } catch (e) {
            if (manual) toast('❌ Synchronisation impossible : ' + e.message, 'error');
        }
    },

    // Renvoie toutes les données locales vers le cloud (outil de récupération :
    // à utiliser si le statut indique des échecs d'envoi passés).
    async forcePushAll() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('v90_') && k !== 'v90_claude_key') keys.push(k);
        }
        for (const k of keys) {
            const raw = localStorage.getItem(k);
            let v; try { v = JSON.parse(raw); } catch (e) { v = raw; }
            Supa.push(k, v);
        }
        await Supa._q;
        toast(Supa.state.lastPushErr
            ? '❌ Échec de l\'envoi : ' + Supa.state.lastPushErr
            : `✅ ${keys.length} collection(s) envoyée(s) vers le cloud.`,
            Supa.state.lastPushErr ? 'error' : 'success');
    }
};

// Statut de synchronisation affiché dans Paramètres (honnête : basé sur les
// vrais succès/échecs, pas un "✅ actif" décoratif).
function renderSyncStatus() {
    const el = $('sync-status');
    if (!el) return;
    const fmt = (t) => t ? new Date(t).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '—';
    if (Supa.state.lastPushErr) {
        el.innerHTML = `<span style="color:var(--danger)">⚠️ Dernier envoi échoué (${mailEsc(Supa.state.lastPushErr)})</span> — les données restent sur cet appareil. Réessaie avec « Forcer l'envoi ».`;
    } else if (Supa.state.lastPushOk || Supa.state.lastPullOk) {
        el.innerHTML = `<span style="color:#4ADE80">✅ Synchronisé</span> <span style="opacity:.6">· reçu ${fmt(Supa.state.lastPullOk)} · envoyé ${fmt(Supa.state.lastPushOk)}</span>`;
    } else {
        el.innerHTML = `<span style="opacity:.6">Aucune synchronisation effectuée pour l'instant.</span>`;
    }
}

// Formatage devise
const eur = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

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
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    $('page-' + id).classList.add('active');
    
    $('hd-page-name').innerText = id === 'home' ? 'TABLEAU DE BORD' : id.toUpperCase();
    $('global-back').style.display = (id === 'home') ? 'none' : 'flex';
    
    if (id === 'facture') $('f-num').value = genNum(); // aperçu ; le numéro définitif est réservé à l'aperçu facture
    if (id === 'mail') renderMailConnexion();

    window.scrollTo(0, 0);
    renderAll();
}

// Aperçu non engageant du prochain numéro (peut être dépassé si un autre appareil
// facture entre-temps) — le numéro réellement attribué vient de reserveInvoiceNumber().
function genNum() {
    let c = (parseInt(G.val('v90_inv_count')) || 0) + 1;
    return new Date().getFullYear() + "-" + String(c).padStart(3, '0');
}

// Réservation atomique du numéro de facture via une fonction Postgres
// (voir le SQL en commentaire au-dessus de finalizeInvoice) : évite que deux
// appareils facturant au même moment obtiennent le même numéro. Repli sur le
// compteur local si Supabase est injoignable (mode hors-ligne).
async function reserveInvoiceNumber() {
    try {
        const res = await fetch(`${SUPA_URL}/rest/v1/rpc/next_invoice_number`, {
            method: 'POST', headers: Supa._h, body: '{}'
        });
        if (!res.ok) throw new Error('rpc indisponible');
        const n = await res.json();
        localStorage.setItem('v90_inv_count', n);
        return new Date().getFullYear() + "-" + String(n).padStart(3, '0');
    } catch (e) {
        let c = (parseInt(G.val('v90_inv_count')) || 0) + 1;
        localStorage.setItem('v90_inv_count', c);
        Supa.push('v90_inv_count', c);
        // Avertir UNE fois par session, pas à chaque facture : tant que la
        // fonction SQL next_invoice_number n'est pas installée dans Supabase,
        // ce repli est le fonctionnement normal, pas une anomalie.
        if (!reserveInvoiceNumber._warned) {
            reserveInvoiceNumber._warned = true;
            toast("ℹ️ Numérotation locale (compteur de cet appareil). Si tu factures depuis plusieurs appareils, installe la fonction SQL next_invoice_number (voir Paramètres).", 'info');
        }
        return new Date().getFullYear() + "-" + String(c).padStart(3, '0');
    }
}

// --- SAUVEGARDE DE SECOURS (export/import fichier, indépendant du cloud) ---
// La clé API Claude (v90_claude_key) est volontairement exclue : c'est un
// secret, pas une donnée — un fichier de sauvegarde peut circuler (mail,
// clé USB), il ne doit jamais contenir de credential.
function exportBackup() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('v90_') && k !== 'v90_claude_key') data[k] = localStorage.getItem(k);
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
        const n = Object.keys(payload.data).length;
        if (!confirm(`Restaurer cette sauvegarde du ${new Date(payload.exportedAt).toLocaleDateString('fr-FR')} ?\n${n} collection(s) — les données actuelles de cet appareil seront remplacées.`)) return;
        Object.entries(payload.data).forEach(([k, v]) => localStorage.setItem(k, v));
        db.clis   = G.get('v90_clis');
        db.prods  = G.get('v90_prods');
        db.ents   = G.get('v90_ents');
        db.hist   = G.get('v90_hist');
        db.bls    = G.get('v90_bls');
        db.drafts = G.get('v90_drafts');
        db.prixCli = JSON.parse(localStorage.getItem('v90_prix_cli') || '{}');
        db.mailCategories = G.get('v90_mail_categories');
        renderAll();
        toast(`✅ Sauvegarde restaurée (${n} collection(s)). Envoi vers le cloud…`, 'success');
        Supa.forcePushAll();
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
    } else {
        $('mp-title').innerText = "Nouveau Produit"; $('mp-id').value = ''; $('mp-icon').value = '';
        $('mp-nom').value = ''; $('mp-desc').value = ''; $('mp-prix').value = ''; $('mp-poids').value = '';
        $('mp-seuil').value = '';
    }
    openModal('mod-prod');
}

function openCliModal(id = null) {
    if (id) {
        let c = db.clis.find(x => x.id == id);
        $('mc-title').innerText = "Modifier Client"; $('mc-id').value = c.id; $('mc-nom').value = c.nom;
        $('mc-adr').value = c.adr; $('mc-ville').value = c.ville || ''; $('mc-email').value = c.email || ''; $('mc-siret').value = c.siret || '';
    } else {
        $('mc-title').innerText = "Nouveau Client"; $('mc-id').value = ''; $('mc-nom').value = '';
        $('mc-adr').value = ''; $('mc-ville').value = ''; $('mc-email').value = ''; $('mc-siret').value = '';
    }
    openModal('mod-cli');
}

function openCliPrixModal(cliId) {
    let cli = db.clis.find(c => c.id == cliId);
    if (!cli) return;
    let prices = db.prixCli[cliId] || {};
    $('mcp-cli-id').value = cliId;
    $('mcp-title').innerText = `💰 Prix pour ${cli.nom}`;
    $('mcp-list').innerHTML = db.prods.map(p => `
        <div class="field">
            <label>${p.icon} ${p.nom} <small style="opacity:.5; font-weight:400">(base : ${eur(p.prix)} / ${p.unite})</small></label>
            <input type="number" id="cprix-${p.id}" step="0.01" value="${prices[p.id] !== undefined ? prices[p.id] : p.prix}">
        </div>`).join('');
    openModal('mod-cli-prix');
}

function saveCliPrix() {
    let cliId = $('mcp-cli-id').value;
    if (!db.prixCli[cliId]) db.prixCli[cliId] = {};
    db.prods.forEach(p => {
        let v = parseFloat($('cprix-' + p.id).value);
        if (!isNaN(v)) db.prixCli[cliId][p.id] = v;
    });
    localStorage.setItem('v90_prix_cli', JSON.stringify(db.prixCli));
    Supa.push('v90_prix_cli', db.prixCli);
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
    let ex = db.prods.find(p => p.id == id); if (ex) o.stock = ex.stock;
    db.prods = db.prods.filter(p => p.id != id); db.prods.push(o); G.set('v90_prods', db.prods); closeModals(); renderAll();
}

function saveCli() {
    let id = $('mc-id').value || Date.now();
    let o = { id, nom: $('mc-nom').value, adr: $('mc-adr').value, ville: $('mc-ville').value, email: $('mc-email').value, siret: $('mc-siret').value };
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
                <b style="flex:2">${t.icon} ${mailEsc(t.nom)}</b>
                <span style="flex:1; text-align:center; font-size:20px; font-weight:700; color:var(--sage)">${t.qte} ${mailEsc(t.unite)}</span>
                <span style="flex:1; text-align:right; color:var(--text-muted)">${t.poids ? t.poids.toFixed(1) + ' kg' : '—'}</span>
            </div>`).join('')}
        <div class="card" style="background:var(--bg-elev-2)">
            <b>POIDS TOTAL À CHARGER</b>
            <b style="font-size:20px; color:var(--gold)">${poidsTotal.toFixed(1)} kg</b>
        </div>
        <div class="section-title" style="margin-top:24px">Détail par client</div>
        ${bls.map(b => `
            <div class="card" style="flex-direction:column; align-items:stretch; gap:6px">
                <b style="font-size:16px; color:var(--gold)">👤 ${mailEsc(b.cliNom)}</b>
                ${b.items.map(i => `
                    <div style="display:flex; justify-content:space-between; font-size:14px; padding:4px 0; border-bottom:1px dashed var(--border)">
                        <span>${i.icon} ${mailEsc(i.nom)}</span>
                        <span style="font-weight:600">${i.qte} ${mailEsc(i.unite)}</span>
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
                    ${totaux.map(t => `<tr><td>${t.icon} ${mailEsc(t.nom)}</td><td style="text-align:center"><b>${t.qte} ${mailEsc(t.unite)}</b></td><td style="text-align:right">${t.poids ? t.poids.toFixed(1) + ' kg' : '—'}</td></tr>`).join('')}
                </tbody>
            </table>
            <div class="inv-totals">
                <div class="inv-total-final"><span>POIDS TOTAL</span><span>${poidsTotal.toFixed(1)} kg</span></div>
            </div>
            <table class="inv-table" style="margin-top:30px">
                <thead><tr><th>Client</th><th>Détail</th><th style="text-align:center">Livré ☐</th></tr></thead>
                <tbody>
                    ${bls.map(b => `<tr>
                        <td style="font-weight:700">${mailEsc(b.cliNom)}</td>
                        <td>${b.items.map(i => `${i.qte} ${mailEsc(i.unite)} ${mailEsc(i.nom)}`).join(' · ')}</td>
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
    e.value = Math.max(0, parseInt(e.value) + d);
}

function saveBL() {
    let cliId = $('bl-cli-select').value;
    let prixCli = (cliId && db.prixCli[cliId]) ? db.prixCli[cliId] : {};
    let items = [];
    db.prods.forEach(p => {
        let q = parseInt($('qty-' + p.id).value);
        let prixInput = parseFloat($('prix-' + p.id).value);
        let prixDefaut = prixCli[p.id] !== undefined ? prixCli[p.id] : p.prix;
        let prix = isNaN(prixInput) ? prixDefaut : prixInput;
        if (q > 0) items.push({ pid: p.id, icon: p.icon, nom: p.nom, prix: prix, qte: q, unite: p.unite, tva: p.tva, poids: p.poids || 0 });
    });
    if (!items.length) return;
    const [y, m, d] = $('bl-date').value.split('-');
    const dateStr = `${d}/${m}/${y}`;
    db.bls.push({ id: Date.now(), date: dateStr, cid: cliId, cliNom: db.clis.find(c => c.id == cliId).nom, entId: $('bl-ent-select').value, items, status: 'en-cours' });
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
                    <button class="btn" style="width: 40px; height: 40px; padding: 0; font-size: 18px; border-radius: 8px; background:rgba(255,255,255,0.1)" onclick="printBL(${b.id})" title="Imprimer ce bon">🖨️</button>
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
    let cumul = {};
    sel.forEach(bl => {
        bl.items.forEach(it => {
            if (!cumul[it.pid]) cumul[it.pid] = { ...it };
            else cumul[it.pid].qte += it.qte;
        });
        bl.status = 'facturé';
    });
    db.drafts.push({ id: Date.now(), cid: sel[0].cid, cliNom: sel[0].cliNom, items: Object.values(cumul) });
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
                <input type="number" step="0.01" value="${l.qte}" oninput="curLines[${i}].qte=parseFloat(this.value);calcFact()">
                <input type="number" step="0.01" value="${l.prix}" oninput="curLines[${i}].prix=parseFloat(this.value);calcFact()">
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
    $('bl-prod-grid').innerHTML = db.prods.map(p => {
        let poidsLabel = p.poids ? `<span style="opacity:.6;font-size:13px">${p.poids} kg / ${p.unite}</span>` : '';
        let prix = prixCli[p.id] !== undefined ? prixCli[p.id] : p.prix;
        return `
        <div class="card" style="flex-direction:column; padding: 20px; align-items: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">${p.icon} <b>${p.nom}</b></div>
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

// --- RENDU GLOBAL DES LISTES ---
function renderAll() {
    // 1. Sélecteur client + entreprise pour le BL
    $('bl-date').value = new Date().toISOString().split('T')[0];
    $('bl-ent-select').innerHTML = db.ents.map(e => `<option value="${e.id}">${e.nom}</option>`).join('');
    $('bl-cli-select').innerHTML = db.clis.map(c => `<option value="${c.id}">${c.nom}</option>`).join('');

    // 2. Grille des produits pour le BL
    renderBLGrid();

    // 3. Listes dans les paramètres
    $('list-prods-settings').innerHTML = db.prods.map(p => `<div class="card card-link" onclick="openProdModal(${p.id})"><div><b>${p.icon} ${p.nom}</b></div><span>✏️</span></div>`).join('');
    $('list-clis-settings').innerHTML = db.clis.map(c => `
        <div class="card" style="gap:8px; align-items:center">
            <b style="flex:1; cursor:pointer" onclick="openCliModal(${c.id})">👤 ${c.nom}</b>
            <button class="btn" style="width:auto;padding:6px 12px;font-size:12px;background:rgba(255,255,255,0.1)" onclick="openCliPrixModal(${c.id})">💰 Prix</button>
            <span style="cursor:pointer" onclick="openCliModal(${c.id})">✏️</span>
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
        sel.innerHTML = ['Toutes', ...entNames].map(n => `<option${n === cur ? ' selected' : ''}>${mailEsc(n)}</option>`).join('');
    });
    $('f-ent').innerHTML = db.ents.map(e => `<option value="${e.id}">${e.nom}</option>`).join('');
    $('f-cli').innerHTML = db.clis.map(c => `<option value="${c.id}">${c.nom}</option>`).join('');
    $('f-prod-picker').innerHTML = db.prods.map(p => `<option value="${p.id}">${p.nom}</option>`).join('');
    
    // 5. Affichage du stock actuel et ajustement (avec alerte seuil bas)
    const lowStock = db.prods.filter(p => p.seuil > 0 && p.stock <= p.seuil);
    $('list-stock').innerHTML = db.prods.map(p => {
        const bas = p.seuil > 0 && p.stock <= p.seuil;
        return `<div class="card${bas ? ' stock-low' : ''}" style="flex-direction:column">
            <b>${p.icon} ${p.nom}</b>
            <div style="font-size:20px;color:${bas ? 'var(--danger)' : 'var(--sage)'};font-weight:700">${p.stock} ${p.unite}</div>
            ${bas ? `<span class="badge-statut badge-retard" style="margin-top:6px">⚠️ Stock bas (seuil : ${p.seuil})</span>` : ''}
        </div>`;
    }).join('');
    $('adj-prod').innerHTML = db.prods.map(p => `<option value="${p.id}">${p.nom}</option>`).join('');
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
    $('list-hist').innerHTML = list.length === 0
        ? `<div style="text-align:center; padding:40px 20px; opacity:.4; font-size:14px">${histFilter === 'impayees' ? 'Aucune facture impayée 🎉' : 'Aucune facture archivée'}</div>`
        : list.slice().reverse().map(h => {
            const itemsHtml = (h.items || []).map(i =>
                `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:13px">
                    <span>${i.icon || ''} ${mailEsc(i.nom)}</span>
                    <span style="opacity:.6">${i.qte} ${mailEsc(i.unite)} × ${eur(i.prix)}</span>
                    <span style="font-weight:600">${eur(i.qte * i.prix * (1 + (i.tva || 20) / 100))}</span>
                </div>`
            ).join('');
            const statut = computeHistStatus(h);
            const badgeCls = statut === 'payee' ? 'badge-payee' : statut === 'en_retard' ? 'badge-retard' : 'badge-attente';
            const badgeLbl = statut === 'payee' ? '✅ Payée' : statut === 'en_retard' ? '⏰ En retard' : '⏳ En attente';
            return `
            <div class="card" style="flex-direction:column; align-items:stretch; gap:0; padding:0; overflow:hidden">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.08)">
                    <div>
                        <b style="font-size:16px; color:var(--gold)">🧾 ${mailEsc(h.num)}</b>
                        ${h.date ? `<span style="font-size:12px; opacity:.5; margin-left:10px">📅 ${mailEsc(h.date)}</span>` : ''}
                    </div>
                    <button class="btn btn-red" style="width:34px; height:34px; padding:0; font-size:14px; border-radius:8px; flex-shrink:0" onclick="deleteHist(${h.id || 0}, '${(h.num || '').replace(/'/g, "\\'")}')">✕</button>
                </div>
                <div style="padding:12px 16px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08)">
                    ${h.ent ? `<span style="font-size:12px; opacity:.6">🏢 <b>${mailEsc(h.ent)}</b></span><span style="opacity:.3">→</span>` : ''}
                    <span style="font-size:13px; font-weight:600">👤 ${mailEsc(h.cli)}</span>
                    <span class="badge-statut ${badgeCls}" style="margin-left:auto">${badgeLbl}</span>
                </div>
                ${itemsHtml ? `<div style="padding:8px 16px">${itemsHtml}</div>` : ''}
                <div style="display:flex; justify-content:space-between; padding:12px 16px; background:rgba(255,255,255,0.04)">
                    ${h.ht ? `<span style="font-size:12px; opacity:.5">HT : ${mailEsc(h.ht)}</span>` : '<span></span>'}
                    <b style="font-size:18px; color:var(--gold)">TTC : ${mailEsc(h.total)}</b>
                </div>
                <div style="display:flex; gap:8px; padding:0 16px 14px">
                    <button class="btn" style="flex:1; font-size:11px; padding:8px; background:rgba(255,255,255,0.06)" onclick="toggleInvoicePaid(${h.id})">${statut === 'payee' ? '↩️ Marquer non payée' : '✅ Marquer payée'}</button>
                    ${statut !== 'payee' ? `<button class="btn" style="flex:1; font-size:11px; padding:8px; background:rgba(255,255,255,0.06)" onclick="relanceHist(${h.id})">✉️ Relancer</button>` : ''}
                </div>
            </div>`;
        }).join('');
}

// --- IMPRESSION & FINALISATION ---
//
// Numérotation séquentielle des factures (SQL à exécuter une seule fois,
// manuellement, dans l'éditeur SQL Supabase) :
//
//   create table if not exists invoice_counter (
//     id int primary key default 1,
//     count int not null default 0,
//     constraint invoice_counter_single_row check (id = 1)
//   );
//   insert into invoice_counter (id, count) values (1, 0) on conflict (id) do nothing;
//
//   create or replace function next_invoice_number()
//   returns int language sql as $$
//     update invoice_counter set count = count + 1 where id = 1 returning count;
//   $$;
//
// L'UPDATE ... RETURNING est atomique côté Postgres : deux appels concurrents
// (deux appareils qui facturent au même moment) ne peuvent jamais recevoir le
// même numéro. Sans cette table, l'app repli sur un compteur local (voir
// reserveInvoiceNumber) qui peut se dupliquer entre appareils.
async function previewInvoice() {
    let ent = db.ents.find(e => e.id == $('f-ent').value), cli = db.clis.find(c => c.id == $('f-cli').value);
    if (!ent || !cli) return toast("Émetteur ou Client manquant", 'error');

    $('f-num').value = '…';
    $('f-num').value = await reserveInvoiceNumber();

    let rows = '', ht = 0, ttc = 0;
    curLines.forEach(l => {
        let lht = l.prix * l.qte;
        let lttc = lht * (1 + (l.tva || 20) / 100);
        ht += lht; ttc += lttc;
        rows += `<tr><td>${l.nom}</td><td style="text-align:center">${l.qte}</td><td>${eur(l.prix)}</td><td style="text-align:right">${eur(lht)}</td></tr>`;
    });

    $('sheet-holder').innerHTML = `
        <div class="inv-wrap">
            <h1>Facture</h1>
            <div class="inv-header-grid">
                <div><b>Émetteur</b>${ent.nom}<br>${ent.adr}<br>${ent.ville}<br>SIRET: ${ent.siret}</div>
                <div style="text-align:right"><b>Client</b>${cli.nom}<br>${cli.adr}<br>${cli.ville}</div>
            </div>
            <div style="margin-bottom:20px"><b>N° FACTURE :</b> ${$('f-num').value}<br><b>DATE :</b> ${$('f-date').value}</div>
            <table class="inv-table">
                <thead><tr><th>Description</th><th>Qté</th><th>P.U HT</th><th style="text-align:right">Total HT</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="inv-totals">
                <div class="inv-total-line"><span>Total HT</span><span>${eur(ht)}</span></div>
                <div class="inv-total-final"><span>TOTAL TTC</span><span>${eur(ttc)}</span></div>
            </div>
            <div class="payment-box">
                <div><h3>Coordonnées Bancaires</h3>IBAN: ${ent.iban}</div>
                <div class="payment-mentions">${ent.mentions.replace(/\n/g, '<br>')}</div>
            </div>
        </div>`;
    $('preview-wrap').style.display = 'block';
}

function finalizeInvoice() {
    curLines.forEach(l => { let p = db.prods.find(x => x.id == l.pid); if (p) p.stock -= l.qte; });
    G.set('v90_prods', db.prods);
    let ht = curLines.reduce((s, l) => s + (l.qte * l.prix), 0);
    let ttc = curLines.reduce((s, l) => s + (l.qte * l.prix * (1 + (l.tva || 20) / 100)), 0);
    let entObj = db.ents.find(e => e.id == $('f-ent').value);
    let cliObj = db.clis.find(c => c.id == $('f-cli').value);
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
        statut: 'en_attente'
    });
    G.set('v90_hist', db.hist);
    if (curDraftId) db.drafts = db.drafts.filter(d => d.id != curDraftId);
    G.set('v90_drafts', db.drafts);
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

function tvaParseExcel(buffer, bankName) {
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
    reader.onload = e => {
        const parsed = tvaParseExcel(new Uint8Array(e.target.result), name);
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
    const soldeColor = tot.solde >= 0 ? '#fbbf24' : '#4ade80';
    el.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; justify-content:center';
    el.innerHTML = `
        <div class="tva-stat">${tvaState.rows.length}<small>Transactions</small></div>
        <div class="tva-stat" style="color:#4ade80">${tvaFmt(tot.tvaC)}<small>TVA collectée</small></div>
        <div class="tva-stat" style="color:#fb923c">${tvaFmt(tot.tvaD)}<small>TVA déductible brute</small></div>
        ${tot.tvaR > 0 ? `<div class="tva-stat" style="color:#a78bfa">${tvaFmt(tot.tvaR)}<small>TVA annulée (rejets)</small></div>` : ''}
        <div class="tva-stat" style="color:${soldeColor}">${tvaFmt(Math.abs(tot.solde))}<small>${tot.solde >= 0 ? 'À reverser' : 'Crédit TVA'}</small></div>`;
}

function tvaRenderBanksList() {
    const el = $('tva-banks-list'); if (!el) return;
    el.innerHTML = tvaState.banks.map(b => {
        const count = tvaState.rows.filter(r => r.source === b).length;
        return `<span class="tva-bank-tag">✓ ${b} <span style="opacity:.7">(${count})</span> <span onclick="tvaRemoveBank('${b.replace(/'/g, "\\'")}')" style="cursor:pointer; margin-left:4px; opacity:.6">×</span></span>`;
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
                <label style="font-size:12px; color:#fb923c; display:flex; align-items:center; gap:5px">Achats
                    <select class="tva-sel" onchange="tvaState.defaultAchat=this.value">
                        ${TAUX.map(t => `<option${t === tvaState.defaultAchat ? ' selected' : ''}>${t}</option>`).join('')}
                    </select>
                </label>
                <label style="font-size:12px; color:#4ade80; display:flex; align-items:center; gap:5px">Ventes
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
        const bg = i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent';
        const typeColor = r.type === 'vente' ? '#4ade80' : r.type === 'rejet' ? '#a78bfa' : '#fb923c';
        const typeBg = r.type === 'vente' ? 'rgba(74,222,128,0.1)' : r.type === 'rejet' ? 'rgba(167,139,250,0.1)' : 'rgba(251,146,60,0.1)';
        const typeBd = r.type === 'vente' ? 'rgba(74,222,128,0.3)' : r.type === 'rejet' ? 'rgba(167,139,250,0.3)' : 'rgba(251,146,60,0.3)';
        const tvaColor = r.type === 'vente' ? '#4ade80' : r.type === 'rejet' ? '#a78bfa' : tva > 0 ? '#fb923c' : 'rgba(255,255,255,0.3)';
        const tc = r.taux === '0%' ? 'zero' : r.taux === '5.5%' ? 'low' : r.taux === '10%' ? 'mid' : 'high';
        const rid = r.id.replace(/'/g, "\\'");
        return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
            <td style="padding:9px 12px;background:${bg};font-size:11px;opacity:.7;white-space:nowrap">${r.date}</td>
            <td style="padding:9px 12px;background:${bg};max-width:220px">
                <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;color:${r.isRejet ? '#a78bfa' : 'inherit'}" title="${r.label.replace(/"/g,'&quot;')}">
                    ${r.isRejet ? '<span style="font-size:10px;margin-right:4px;opacity:.7">⊘</span>' : ''}${r.label}
                </div>
            </td>
            <td style="padding:9px 12px;background:${bg}"><span style="background:rgba(255,255,255,0.06);border-radius:6px;padding:2px 8px;font-size:11px;opacity:.7">${r.source}</span></td>
            <td style="padding:9px 12px;background:${bg}">
                <select onchange="tvaUpdate('${rid}','type',this.value)" style="background:${typeBg};color:${typeColor};border:1px solid ${typeBd};border-radius:20px;padding:3px 8px;font-size:12px;font-weight:600;cursor:pointer;outline:none;font-family:inherit">
                    <option value="vente"${r.type === 'vente' ? ' selected' : ''}>Vente</option>
                    <option value="achat"${r.type === 'achat' ? ' selected' : ''}>Achat</option>
                    <option value="rejet"${r.type === 'rejet' ? ' selected' : ''}>Rejet</option>
                </select>
            </td>
            <td style="padding:9px 12px;background:${bg};text-align:right;font-weight:600;white-space:nowrap">${tvaFmt(ttc)}</td>
            <td style="padding:9px 12px;background:${bg};text-align:center">
                <select class="tva-sel tva-taux-${tc}" onchange="tvaUpdate('${rid}','taux',this.value)">
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
            <td colspan="4" style="padding:11px 14px;font-weight:700;color:#a78bfa;font-size:13px">REJETS (TVA annulée)</td>
            <td style="padding:11px 14px;text-align:right;font-weight:700;color:#a78bfa">${tvaFmt(tot.ttcR)}</td>
            <td></td><td></td>
            <td style="padding:11px 14px;text-align:right;font-weight:800;color:#a78bfa;font-size:15px">−${tvaFmt(tot.tvaR)}</td>
        </tr>` : '';
    const soldeColor = tot.solde >= 0 ? '#fbbf24' : '#4ade80';
    const soldeBg = tot.solde >= 0 ? 'rgba(251,191,36,0.05)' : 'rgba(74,222,128,0.05)';

    wrap.innerHTML = `
        <table class="tva-table">
            <thead>
                <tr style="background:rgba(255,255,255,0.04);border-bottom:2px solid rgba(255,255,255,0.1)">
                    ${['Date','Libellé','Banque','Type','Montant TTC','Taux TVA','HT','TVA'].map((h, i) =>
                        `<th style="padding:10px 12px;text-align:${i >= 4 ? 'right' : 'left'};font-size:11px;font-weight:600;letter-spacing:.5px;opacity:.5;white-space:nowrap">${h}</th>`
                    ).join('')}
                </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
            <tfoot>
                <tr style="background:rgba(74,222,128,0.07);border-top:2px solid rgba(74,222,128,0.3)">
                    <td colspan="4" style="padding:11px 14px;font-weight:700;color:#4ade80;font-size:13px">TOTAL VENTES</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:#4ade80">${tvaFmt(tot.ttcV)}</td>
                    <td></td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:#4ade80">${tvaFmt(tot.htV)}</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:800;color:#4ade80;font-size:15px">${tvaFmt(tot.tvaC)}</td>
                </tr>
                <tr style="background:rgba(251,146,60,0.07);border-top:1px solid rgba(251,146,60,0.3)">
                    <td colspan="4" style="padding:11px 14px;font-weight:700;color:#fb923c;font-size:13px">TOTAL ACHATS (brut)</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:#fb923c">${tvaFmt(tot.ttcA)}</td>
                    <td></td>
                    <td style="padding:11px 14px;text-align:right;font-weight:700;color:#fb923c">${tvaFmt(tot.htA)}</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:800;color:#fb923c;font-size:15px">${tvaFmt(tot.tvaD)}</td>
                </tr>
                ${rejetRow}
                <tr style="border-top:1px solid rgba(255,255,255,0.08)">
                    <td colspan="7" style="padding:11px 14px;font-size:12px;opacity:.5">TVA déductible nette (achats − rejets)</td>
                    <td style="padding:11px 14px;text-align:right;font-weight:800;color:#fb923c;font-size:15px">${tvaFmt(tot.tvaDeductibleNette)}</td>
                </tr>
                <tr style="background:${soldeBg};border-top:2px solid rgba(255,255,255,0.1)">
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

function tvaExport() {
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

const comptaState = { filtered: [], mailInvoices: [] };

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
        let ttc = parseFloat(h.total.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        ca += ttc / 1.2;
        tvaCol += ttc - (ttc / 1.2);
    });

    let depensesHtml = '';
    comptaState.mailInvoices = [];
    try {
        const invoices = await MailSupa.listInvoices();
        const filteredMail = invoices.filter(i => {
            if (entFilter && entFilter !== 'Toutes' && (i.entity || '') !== entFilter) return false;
            if (!i.invoice_date) return !debut && !fin;
            const mk = i.invoice_date.slice(0, 7);
            if (debut && mk < debut) return false;
            if (fin && mk > fin) return false;
            return true;
        });
        comptaState.mailInvoices = filteredMail;
        if (filteredMail.length) {
            const totalDepenses = filteredMail.reduce((s, i) => s + (i.amount || 0), 0);
            depensesHtml = `
                <div class="section-title" style="margin-top:24px">📥 Dépenses détectées par mail (${filteredMail.length})</div>
                ${filteredMail.map(i => `
                    <div class="card" style="gap:10px; align-items:center">
                        <div style="flex:1; min-width:0">
                            <b>${mailEsc(i.vendor || 'Fournisseur inconnu')}</b>
                            <div style="font-size:12px; opacity:.6">${mailEsc(i.invoice_date || '—')} · ${mailEsc(i.entity || '—')} · ${i.status === 'valide' ? '✅ vérifiée' : '⏳ à vérifier'}</div>
                        </div>
                        <b>${i.amount != null ? eur(i.amount) : '—'}</b>
                        ${i.status !== 'valide' ? `<button class="btn" style="width:auto; padding:6px 12px; font-size:11px; background:rgba(255,255,255,0.08)" onclick="comptaValiderDepense('${(i.gmail_message_id||'').replace(/'/g,"\\'")}')">✅ Vérifier</button>` : ''}
                    </div>`).join('')}
                <div class="card" style="background:var(--bg-elev-2)"><span style="font-weight:700">Total dépenses (période)</span><b style="color:var(--danger)">${eur(totalDepenses)}</b></div>`;
        }
    } catch (e) { /* passerelle mail indisponible (pas encore configurée) : on ignore silencieusement */ }

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
            <div class="card"><b>${mailEsc(h.num)}</b> — ${mailEsc(h.cli)}<b style="float:right">${mailEsc(h.total)}</b></div>
        `).join('') || '<div style="color:var(--text-muted); text-align:center">Aucune facture sur cette période</div>'}
        ${depensesHtml}
        ${comptaStatsHtml(filtered)}`;
}

// --- STATISTIQUES DE VENTES (CA mensuel, top produits, top clients) ---
// Calculées sur les factures filtrées (entreprise + période) — barres en CSS
// pur, aucune dépendance. Le HT vient des lignes quand elles existent, sinon
// du total TTC / 1,2 (anciennes factures sans détail).
function comptaHistHt(h) {
    if (h.items && h.items.length) return h.items.reduce((s, i) => s + i.qte * i.prix, 0);
    const ttc = parseFloat((h.total || '').replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    return ttc / 1.2;
}

function comptaBarList(entries, color) {
    const max = Math.max(...entries.map(e => e[1]), 1);
    return entries.map(([label, val]) => `
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
            <span style="flex:0 0 110px; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap" title="${mailEsc(label)}">${mailEsc(label)}</span>
            <div style="flex:1; height:18px; background:rgba(255,255,255,0.05); border-radius:4px; overflow:hidden">
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

async function comptaValiderDepense(gmailMessageId) {
    try {
        const res = await fetch(`${SUPA_URL}/rest/v1/mail_invoices?gmail_message_id=eq.${encodeURIComponent(gmailMessageId)}`, {
            method: 'PATCH', headers: Supa._h, body: JSON.stringify({ status: 'valide' })
        });
        if (!res.ok) throw new Error('échec de la mise à jour');
        toast('✅ Dépense marquée comme vérifiée.', 'success');
        calcCompta();
    } catch (e) {
        toast('❌ Impossible de mettre à jour cette dépense.', 'error');
    }
}

function comptaExport() {
    if (!window.XLSX) return toast('SheetJS non chargé', 'error');
    if (!comptaState.filtered.length && !comptaState.mailInvoices.length) return toast('Aucune donnée à exporter pour cette période (clique d\'abord sur "Voir le bilan").', 'error');

    const wb = XLSX.utils.book_new();

    const headers1 = ['N° Facture', 'Date', 'Client', 'Entreprise', 'HT', 'TTC', 'Statut'];
    const rows1 = comptaState.filtered.map(h => [h.num, h.date, h.cli, h.ent || '', h.ht || '', h.total, comptaStatutLabel(h)]);
    const ws1 = XLSX.utils.aoa_to_sheet([headers1, ...rows1]);
    ws1['!cols'] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Factures');

    let ca = 0, tvaCol = 0;
    comptaState.filtered.forEach(h => {
        let ttc = parseFloat(h.total.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        ca += ttc / 1.2; tvaCol += ttc - (ttc / 1.2);
    });
    const totalDepenses = comptaState.mailInvoices.reduce((s, i) => s + (i.amount || 0), 0);
    const ws2 = XLSX.utils.aoa_to_sheet([
        ['RÉCAPITULATIF', ''], ['', ''],
        ["Chiffre d'affaires HT", parseFloat(ca.toFixed(2))],
        ['TVA collectée', parseFloat(tvaCol.toFixed(2))],
        ['Dépenses détectées (mail)', parseFloat(totalDepenses.toFixed(2))],
        ['', ''],
        ['Solde net (CA HT − dépenses)', parseFloat((ca - totalDepenses).toFixed(2))],
    ]);
    ws2['!cols'] = [{ wch: 32 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Récapitulatif');

    if (comptaState.mailInvoices.length) {
        const headers3 = ['Date', 'Entité', 'Fournisseur', 'Montant', 'Catégorie', 'Statut'];
        const rows3 = comptaState.mailInvoices.map(i => [i.invoice_date || '', i.entity || '', i.vendor || '', i.amount ?? '', i.category || '', i.status || '']);
        const ws3 = XLSX.utils.aoa_to_sheet([headers3, ...rows3]);
        ws3['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 26 }, { wch: 12 }, { wch: 18 }, { wch: 12 }];
        XLSX.utils.book_append_sheet(wb, ws3, 'Dépenses (Mail)');
    }

    XLSX.writeFile(wb, 'Compta_' + new Date().toLocaleDateString('fr-FR').replace(/\//g, '-') + '.xlsx');
}

function comptaStatutLabel(h) {
    const s = computeHistStatus(h);
    return s === 'payee' ? 'Payée' : s === 'en_retard' ? 'En retard' : 'En attente';
}

// Initialisation
$('f-date').value = new Date().toLocaleDateString('fr-FR');
showPage('home');
Supa.pullAll();

// --- MAIL INTEGRATION ---
//
// SETUP GOOGLE CLOUD (à faire une seule fois, manuellement, avant utilisation) :
//   1. Créer un projet sur https://console.cloud.google.com
//   2. Activer l'API Gmail (API et services > Bibliothèque > "Gmail API")
//   3. Créer des identifiants OAuth : "Créer des identifiants" > "ID client OAuth" > type "Application Web"
//      Origine JavaScript autorisée : https://teiki5320.github.io
//   4. Scopes nécessaires : gmail.readonly, gmail.modify, gmail.compose
//   5. Laisser l'app en mode "Test" (comptes personnels autorisés) — aucune validation Google requise
//   6. Copier le Client ID obtenu et le coller ci-dessous à la place de GMAIL_CLIENT_ID
//
// SETUP SUPABASE (à exécuter une seule fois, manuellement, dans l'éditeur SQL Supabase) :
//
//   create table mail_invoices (
//     id uuid primary key default gen_random_uuid(),
//     created_at timestamptz default now(),
//     gmail_message_id text unique,
//     entity text,
//     vendor text,
//     amount numeric,
//     currency text default 'EUR',
//     invoice_date date,
//     category text,
//     status text default 'a_verifier',
//     raw_extract jsonb
//   );
//
//   create table mail_state (
//     gmail_message_id text primary key,
//     category text,
//     processed_at timestamptz default now(),
//     draft_created boolean default false
//   );
//
// Aucune clé n'est en dur dans ce fichier : le Client ID Gmail ci-dessous est un identifiant
// public (pas un secret), le jeton OAuth reste en mémoire (+ sessionStorage pour survivre à un
// rafraîchissement de page), et la clé API Claude est saisie par l'utilisateur dans l'onglet
// Connexion puis stockée en localStorage, exactement comme le reste de la configuration de l'app.
//
// Limite connue : l'extraction de factures lit le corps texte des mails mais ne fait pas d'OCR/
// parsing des pièces jointes PDF (aucune lib PDF n'est chargée) — les noms de pièces jointes sont
// transmis à Claude comme contexte, mais leur contenu doit être vérifié manuellement.

const GMAIL_CLIENT_ID = 'GMAIL_CLIENT_ID'; // <-- remplacer par le Client ID OAuth Google Cloud
const GMAIL_SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose';
const GMAIL_API = 'https://gmail.googleapis.com/gmail/v1/users/me';
const MAIL_CLAUDE_MODEL = 'claude-sonnet-5'; // Modèle Claude utilisé pour le tri / résumé / extraction

const DEFAULT_MAIL_CATEGORIES = [
    { id: 'cat-scea',    nom: 'SCEA Terres et Vie', label: 'SCEA Terres et Vie', draft: false, prompt: '' },
    { id: 'cat-matevie', nom: 'SARL Matevie',       label: 'SARL Matevie',       draft: false, prompt: '' },
    { id: 'cat-aloha',   nom: 'ALOHASH',            label: 'ALOHASH',            draft: false, prompt: '' },
    { id: 'cat-perso',   nom: 'Personnel',          label: 'Personnel',          draft: false, prompt: '' },
    { id: 'cat-fact',    nom: 'Factures / Compta',  label: 'Factures-Compta',    draft: false, prompt: '' },
    { id: 'cat-urgent',  nom: 'Urgent',             label: 'Urgent',             draft: true,  prompt: "Réponds brièvement pour accuser réception et indiquer qu'un retour complet suivra rapidement." },
    { id: 'cat-spam',    nom: 'Spam / Promo',       label: 'Spam-Promo',         draft: false, prompt: '' },
    { id: 'cat-autre',   nom: 'Autre',              label: 'Autre',              draft: false, prompt: '' }
];

const mailState = {
    token: null, tokenExpiry: 0, email: null, tokenClient: null,
    resume: [], triage: [], draftsGenerated: [], invoices: [],
    busy: { resume: false, tri: false, drafts: false, extraction: false }
};

// --- Init / persistance des catégories ---
function initMailCategories() {
    let stored = G.get('v90_mail_categories');
    db.mailCategories = stored.length ? stored : DEFAULT_MAIL_CATEGORIES.slice();
    if (!stored.length) G.set('v90_mail_categories', db.mailCategories);
    renderMailConnexion();
}

// --- Helpers génériques ---
function mailEsc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function mailSetStatus(elId, msg, kind = 'info') {
    const el = $(elId); if (!el) return;
    const colors = { info: 'var(--text-muted)', error: 'var(--danger)', success: '#4ADE80', loading: 'var(--accent)' };
    el.style.color = colors[kind] || colors.info;
    el.innerText = msg;
}

function mailIsReady() { return !!mailState.token && !!getMailClaudeKey(); }

function mailGuard(tabName) {
    if (mailIsReady()) return true;
    mailSetStatus(`mail-${tabName}-status`, "⚠️ Connecte Gmail et renseigne ta clé API Claude dans l'onglet Connexion avant d'utiliser cette fonction.", 'error');
    return false;
}

function mailParseJson(text) {
    try {
        const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        return JSON.parse(match ? match[0] : text);
    } catch (e) { return null; }
}

// --- Clé API Claude (stockée localement, jamais commitée) ---
function getMailClaudeKey() { return localStorage.getItem('v90_claude_key') || ''; }

function saveMailClaudeKey() {
    let v = $('mail-claude-key').value.trim();
    if (!v) return toast('Merci de renseigner une clé.', 'error');
    localStorage.setItem('v90_claude_key', v);
    $('mail-claude-key').value = '';
    renderMailConnexion();
    toast('✅ Clé API Claude sauvegardée.', 'success');
}

function clearMailClaudeKey() {
    if (!confirm('Supprimer la clé API Claude ?')) return;
    localStorage.removeItem('v90_claude_key');
    renderMailConnexion();
}

// --- OAuth Gmail (Google Identity Services) ---
function mailInitTokenClient() {
    if (!window.google || !google.accounts || !google.accounts.oauth2) return null;
    if (mailState.tokenClient) return mailState.tokenClient;
    mailState.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GMAIL_CLIENT_ID,
        scope: GMAIL_SCOPES,
        callback: (resp) => {
            if (resp.error) { mailSetStatus('mail-gmail-status', "Connexion Gmail refusée : " + resp.error, 'error'); return; }
            mailState.token = resp.access_token;
            mailState.tokenExpiry = Date.now() + (resp.expires_in * 1000);
            sessionStorage.setItem('v90_gmail_token', JSON.stringify({ token: mailState.token, expiry: mailState.tokenExpiry }));
            mailFetchProfile();
        }
    });
    return mailState.tokenClient;
}

function mailConnectGmail() {
    if (GMAIL_CLIENT_ID === 'GMAIL_CLIENT_ID') {
        toast("⚠️ Configuration requise : remplace GMAIL_CLIENT_ID dans script.js par ton Client ID Google Cloud (voir le commentaire en tête de la section Mail).", 'warn');
        return;
    }
    const client = mailInitTokenClient();
    if (!client) { toast("Google Identity Services n'est pas encore chargé. Vérifie ta connexion internet et recharge la page.", 'error'); return; }
    client.requestAccessToken({ prompt: mailState.token ? '' : 'consent' });
}

function mailDisconnectGmail() {
    if (mailState.token && window.google?.accounts?.oauth2) {
        google.accounts.oauth2.revoke(mailState.token, () => {});
    }
    mailState.token = null; mailState.email = null;
    sessionStorage.removeItem('v90_gmail_token');
    renderMailConnexion();
}

function mailRestoreSession() {
    try {
        const raw = sessionStorage.getItem('v90_gmail_token');
        if (!raw) return;
        const { token, expiry } = JSON.parse(raw);
        if (token && expiry > Date.now()) {
            mailState.token = token; mailState.tokenExpiry = expiry;
            mailFetchProfile();
        } else {
            sessionStorage.removeItem('v90_gmail_token');
        }
    } catch (e) {}
}

async function mailFetchProfile() {
    try {
        const res = await mailGmailFetch(`${GMAIL_API}/profile`);
        mailState.email = res.emailAddress;
    } catch (e) {
        mailState.email = null;
        console.error('Mail: impossible de récupérer le profil Gmail', e);
    }
    renderMailConnexion();
}

async function mailGmailFetch(url, opts = {}) {
    if (!mailState.token) throw new Error("Gmail non connecté");
    const res = await fetch(url, { ...opts, headers: { ...(opts.headers || {}), 'Authorization': `Bearer ${mailState.token}` } });
    if (res.status === 401) {
        mailState.token = null;
        sessionStorage.removeItem('v90_gmail_token');
        throw new Error("Session Gmail expirée, merci de te reconnecter.");
    }
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Erreur Gmail API (${res.status}) : ${txt.slice(0, 200)}`);
    }
    return res.status === 204 ? null : res.json();
}

// --- Appel Claude API (direct navigateur) ---
async function mailClaudeCall(system, userContent, maxTokens = 2000) {
    const key = getMailClaudeKey();
    if (!key) throw new Error("Clé API Claude manquante (onglet Connexion).");
    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({ model: MAIL_CLAUDE_MODEL, max_tokens: maxTokens, system, messages: [{ role: 'user', content: userContent }] })
    });
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Erreur Claude API (${res.status}) : ${txt.slice(0, 300)}`);
    }
    const data = await res.json();
    return (data.content || []).map(b => b.text || '').join('');
}

// --- Décodage MIME / extraction du corps des mails ---
function mailB64UrlDecode(str) {
    try {
        let s = str.replace(/-/g, '+').replace(/_/g, '/');
        while (s.length % 4) s += '=';
        return decodeURIComponent(escape(atob(s)));
    } catch (e) { return ''; }
}

function mailExtractBody(payload) {
    if (!payload) return { text: '', attachments: [] };
    let text = '', attachments = [];
    function walk(part) {
        if (!part) return;
        if (part.filename) attachments.push(part.filename);
        if (part.body && part.body.data && part.mimeType === 'text/plain' && !text) {
            text += mailB64UrlDecode(part.body.data);
        } else if (part.body && part.body.data && part.mimeType === 'text/html' && !text) {
            text += mailB64UrlDecode(part.body.data).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        }
        (part.parts || []).forEach(walk);
    }
    walk(payload);
    return { text: text.slice(0, 4000), attachments };
}

function mailHeader(headers, name) {
    const h = (headers || []).find(x => x.name.toLowerCase() === name.toLowerCase());
    return h ? h.value : '';
}

function mailBuildMime(to, subject, body) {
    const mime = `To: ${to}\r\nSubject: ${mailMimeEncodeSubject(subject)}\r\nContent-Type: text/plain; charset="UTF-8"\r\n\r\n${body}`;
    return btoa(unescape(encodeURIComponent(mime))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function mailMimeEncodeSubject(s) { return '=?UTF-8?B?' + btoa(unescape(encodeURIComponent(s))) + '?='; }

async function mailFetchMessagesMeta(ids) {
    const out = [];
    for (const id of ids) {
        try {
            const m = await mailGmailFetch(`${GMAIL_API}/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`);
            out.push({
                id: m.id, threadId: m.threadId,
                from: mailHeader(m.payload?.headers, 'From'),
                subject: mailHeader(m.payload?.headers, 'Subject'),
                date: mailHeader(m.payload?.headers, 'Date'),
                snippet: m.snippet || '', labelIds: m.labelIds || []
            });
        } catch (e) { /* mail inaccessible, on l'ignore et on continue le lot */ }
    }
    return out;
}

async function mailEnsureLabels() {
    const existing = await mailGmailFetch(`${GMAIL_API}/labels`);
    const map = {};
    (existing?.labels || []).forEach(l => { map[l.name] = l.id; });
    for (const cat of db.mailCategories) {
        const name = cat.label || cat.nom;
        if (!map[name]) {
            try {
                const created = await mailGmailFetch(`${GMAIL_API}/labels`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, labelListVisibility: 'labelShow', messageListVisibility: 'show' })
                });
                if (created?.id) map[name] = created.id;
            } catch (e) { /* création du label impossible, cette catégorie ne sera pas labellisée */ }
        }
    }
    return map;
}

// --- Rendu onglet Connexion ---
function renderMailConnexion() {
    const statusEl = $('mail-gmail-status'), actionsEl = $('mail-gmail-actions');
    if (statusEl) {
        statusEl.innerHTML = mailState.token
            ? `<div style="display:flex;align-items:center;gap:10px"><span style="font-size:20px">✅</span><div><b>${mailEsc(mailState.email || 'Connecté')}</b><br><small style="color:var(--text-muted)">Compte Gmail actif</small></div></div>`
            : `<div style="display:flex;align-items:center;gap:10px"><span style="font-size:20px">⚪</span><div><b>Non connecté</b><br><small style="color:var(--text-muted)">Connecte ton compte Gmail pour activer le tri, le résumé et l'extraction</small></div></div>`;
    }
    if (actionsEl) {
        actionsEl.innerHTML = mailState.token
            ? `<button class="btn btn-red" onclick="mailDisconnectGmail()">DÉCONNECTER</button>`
            : `<button class="btn btn-gold" onclick="mailConnectGmail()">CONNECTER GMAIL</button>`;
    }
    const keyEl = $('mail-claude-status');
    if (keyEl) {
        keyEl.innerHTML = getMailClaudeKey()
            ? `<span style="color:#4ADE80">✅ Clé API enregistrée</span> — <a href="#" onclick="clearMailClaudeKey();return false" style="color:var(--danger)">supprimer</a>`
            : `<span style="color:var(--text-muted)">Aucune clé enregistrée</span>`;
    }
    renderMailCatList();
    mailApplyLockState();
}

function mailApplyLockState() {
    const ready = mailIsReady();
    ['resume', 'tri', 'brouillons', 'extraction'].forEach(k => {
        const tab = $('tab-mail-' + k);
        if (tab) { tab.style.opacity = ready ? '1' : '0.4'; tab.style.pointerEvents = ready ? 'auto' : 'none'; }
    });
}

function renderMailCatList() {
    const el = $('mail-cat-list'); if (!el || !db.mailCategories) return;
    el.innerHTML = db.mailCategories.map(c => `
        <div class="card" style="gap:8px; align-items:center">
            <div style="flex:1">
                <b>${mailEsc(c.nom)}</b>
                ${c.draft ? '<span class="mini-tag" style="margin-left:8px">✍️ Brouillon auto</span>' : ''}
            </div>
            <span style="cursor:pointer" onclick="openMailCatModal('${c.id}')">✏️</span>
            <span style="cursor:pointer; color:var(--danger)" onclick="deleteMailCat('${c.id}')">🗑️</span>
        </div>`).join('');
}

function openMailCatModal(id = null) {
    if (id) {
        let c = db.mailCategories.find(x => x.id === id);
        $('mcat-title').innerText = "Modifier Catégorie"; $('mcat-id').value = c.id;
        $('mcat-nom').value = c.nom; $('mcat-label').value = c.label || '';
        $('mcat-draft').value = c.draft ? '1' : '0'; $('mcat-prompt').value = c.prompt || '';
    } else {
        $('mcat-title').innerText = "Nouvelle Catégorie"; $('mcat-id').value = '';
        $('mcat-nom').value = ''; $('mcat-label').value = ''; $('mcat-draft').value = '0'; $('mcat-prompt').value = '';
    }
    mailToggleCatPromptField();
    openModal('mod-mail-cat');
}

function mailToggleCatPromptField() {
    $('mcat-prompt-field').style.display = $('mcat-draft').value === '1' ? 'block' : 'none';
}

function saveMailCat() {
    let nom = $('mcat-nom').value.trim();
    if (!nom) return toast("Le nom est obligatoire.", 'error');
    let id = $('mcat-id').value || ('cat-' + Date.now());
    let o = {
        id, nom,
        label: ($('mcat-label').value.trim() || nom).replace(/\//g, '-'),
        draft: $('mcat-draft').value === '1',
        prompt: $('mcat-prompt').value
    };
    db.mailCategories = db.mailCategories.filter(c => c.id !== id);
    db.mailCategories.push(o);
    G.set('v90_mail_categories', db.mailCategories);
    closeModals();
    renderMailCatList();
}

function deleteMailCat(id) {
    if (!confirm("Supprimer cette catégorie ?")) return;
    db.mailCategories = db.mailCategories.filter(c => c.id !== id);
    G.set('v90_mail_categories', db.mailCategories);
    renderMailCatList();
}

// --- Navigation sous-onglets Mail ---
function toggleMailTab(t) {
    ['connexion', 'resume', 'tri', 'brouillons', 'extraction'].forEach(k => {
        $('tab-mail-' + k).classList.toggle('active', k === t);
        $('view-mail-' + k).style.display = k === t ? 'block' : 'none';
    });
    if (t === 'connexion') renderMailConnexion();
    if (t === 'resume') renderMailResumeList();
    if (t === 'tri') renderMailTriList();
    if (t === 'brouillons') renderMailDraftsList();
    if (t === 'extraction') renderMailInvoicesTable();
}

// --- Persistance Supabase dédiée (tables mail_state / mail_invoices) ---
const MailSupa = {
    async listStates() {
        try {
            const res = await fetch(`${SUPA_URL}/rest/v1/mail_state?select=*`, { headers: Supa._h });
            if (!res.ok) return [];
            return await res.json();
        } catch (e) { return []; }
    },
    async upsertState(row) {
        try {
            await fetch(`${SUPA_URL}/rest/v1/mail_state?on_conflict=gmail_message_id`, { method: 'POST', headers: Supa._h, body: JSON.stringify(row) });
        } catch (e) {}
    },
    async listInvoices() {
        try {
            const res = await fetch(`${SUPA_URL}/rest/v1/mail_invoices?select=*&order=invoice_date.desc`, { headers: Supa._h });
            if (!res.ok) return [];
            return await res.json();
        } catch (e) { return []; }
    },
    async upsertInvoice(row) {
        try {
            await fetch(`${SUPA_URL}/rest/v1/mail_invoices?on_conflict=gmail_message_id`, { method: 'POST', headers: Supa._h, body: JSON.stringify(row) });
        } catch (e) {}
    }
};

// --- Onglet Résumé ---
async function mailGenerateSummary() {
    if (!mailGuard('resume')) return;
    mailState.busy.resume = true;
    mailSetStatus('mail-resume-status', "⏳ Récupération des mails des dernières 24h...", 'loading');
    try {
        const listRes = await mailGmailFetch(`${GMAIL_API}/messages?q=${encodeURIComponent('newer_than:1d')}&maxResults=30`);
        const ids = (listRes?.messages || []).map(m => m.id);
        if (!ids.length) { mailSetStatus('mail-resume-status', "Aucun mail reçu dans les dernières 24h.", 'info'); return; }
        mailSetStatus('mail-resume-status', `⏳ Analyse de ${ids.length} mail(s)...`, 'loading');
        const meta = await mailFetchMessagesMeta(ids);
        const catNames = db.mailCategories.map(c => c.nom).join(', ');
        const prompt = `Voici une liste de mails reçus dans les dernières 24h, au format JSON. Pour CHAQUE mail (même index), retourne un objet avec : "resume" (une phrase courte en français résumant le contenu), "categorie" (choisie strictement parmi : ${catNames}). Réponds UNIQUEMENT avec un tableau JSON de même longueur et même ordre que la liste fournie, sans texte autour.\n\nMails :\n${JSON.stringify(meta.map(m => ({ from: m.from, subject: m.subject, snippet: m.snippet })))}`;
        const raw = await mailClaudeCall("Tu es un assistant de tri de boîte mail professionnelle. Réponds uniquement en JSON valide, sans markdown.", prompt, 3000);
        const parsed = mailParseJson(raw) || [];
        mailState.resume = meta.map((m, i) => ({ ...m, resume: parsed[i]?.resume || m.snippet, categorie: parsed[i]?.categorie || 'Autre' }));
        renderMailResumeList();
        mailSetStatus('mail-resume-status', `✅ ${meta.length} mail(s) analysé(s)${meta.length < ids.length ? ` (${ids.length - meta.length} inaccessible(s))` : ''}.`, 'success');
    } catch (e) {
        mailSetStatus('mail-resume-status', "❌ " + e.message, 'error');
    } finally {
        mailState.busy.resume = false;
    }
}

function renderMailResumeList() {
    const el = $('mail-resume-list'); if (!el) return;
    el.innerHTML = mailState.resume.map(m => `
        <div class="card" style="flex-direction:column; align-items:stretch; gap:6px">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px">
                <div>
                    <b>${mailEsc(m.subject || '(sans objet)')}</b><br>
                    <small style="color:var(--text-muted)">${mailEsc(m.from)}</small>
                </div>
                <span class="mini-tag">${mailEsc(m.categorie)}</span>
            </div>
            <div style="font-size:14px; color:var(--text-main); opacity:.85">${mailEsc(m.resume)}</div>
            <a href="https://mail.google.com/mail/u/0/#inbox/${m.threadId}" target="_blank" rel="noopener" style="font-size:12px; color:var(--accent)">Ouvrir dans Gmail →</a>
        </div>`).join('') || '<div style="text-align:center; padding:30px; opacity:.5">Aucun résumé pour cette session. Clique sur "Générer le résumé du jour".</div>';
}

// --- Onglet Tri ---
async function mailScanInbox() {
    if (!mailGuard('tri')) return;
    mailState.busy.tri = true;
    mailSetStatus('mail-tri-status', "⏳ Recherche des mails non traités...", 'loading');
    try {
        const states = await MailSupa.listStates();
        const processedIds = new Set(states.map(s => s.gmail_message_id));
        const listRes = await mailGmailFetch(`${GMAIL_API}/messages?q=${encodeURIComponent('in:inbox newer_than:14d')}&maxResults=40`);
        const allIds = (listRes?.messages || []).map(m => m.id);
        const newIds = allIds.filter(id => !processedIds.has(id));
        if (!newIds.length) { mailSetStatus('mail-tri-status', "Aucun nouveau mail à trier.", 'info'); return; }
        mailSetStatus('mail-tri-status', `⏳ Classement de ${newIds.length} mail(s)...`, 'loading');
        const meta = await mailFetchMessagesMeta(newIds);
        const labelMap = await mailEnsureLabels();
        const catNames = db.mailCategories.map(c => c.nom).join(', ');
        const prompt = `Classe chacun des mails suivants dans UNE seule catégorie parmi : ${catNames}. Réponds UNIQUEMENT avec un tableau JSON (même ordre que la liste) d'objets {"categorie": "..."}, sans texte autour.\n\nMails :\n${JSON.stringify(meta.map(m => ({ from: m.from, subject: m.subject, snippet: m.snippet })))}`;
        const raw = await mailClaudeCall("Tu es un assistant de classement d'emails professionnels. Réponds uniquement en JSON valide.", prompt, 3000);
        const parsed = mailParseJson(raw) || [];
        let warnings = 0;
        for (let i = 0; i < meta.length; i++) {
            const m = meta[i];
            const catNom = parsed[i]?.categorie || 'Autre';
            const cat = db.mailCategories.find(c => c.nom === catNom) || db.mailCategories.find(c => c.nom === 'Autre');
            try {
                const labelId = labelMap[cat?.label || catNom];
                if (labelId) {
                    await mailGmailFetch(`${GMAIL_API}/messages/${m.id}/modify`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ addLabelIds: [labelId] })
                    });
                }
            } catch (e) { warnings++; }
            await MailSupa.upsertState({ gmail_message_id: m.id, category: cat?.nom || catNom, draft_created: false });
            mailState.triage.unshift({ ...m, categorie: cat?.nom || catNom });
        }
        renderMailTriList();
        mailSetStatus('mail-tri-status', `✅ ${meta.length} mail(s) classé(s)${warnings ? ` (${warnings} label(s) non appliqué(s))` : ''}.`, 'success');
    } catch (e) {
        mailSetStatus('mail-tri-status', "❌ " + e.message, 'error');
    } finally {
        mailState.busy.tri = false;
    }
}

function renderMailTriList() {
    const el = $('mail-tri-list'); if (!el) return;
    if (!mailState.triage.length) {
        el.innerHTML = '<div style="text-align:center; padding:30px; opacity:.5">Aucun mail trié dans cette session. Clique sur "Scanner l\'inbox".</div>';
        return;
    }
    el.innerHTML = mailState.triage.map((m, i) => `
        <div class="card" style="gap:10px; align-items:center">
            <div style="flex:1; min-width:0">
                <b style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${mailEsc(m.subject || '(sans objet)')}</b>
                <small style="color:var(--text-muted)">${mailEsc(m.from)}</small>
            </div>
            <select onchange="mailOverrideCategory(${i}, this.value)">
                ${db.mailCategories.map(c => `<option value="${mailEsc(c.nom)}"${c.nom === m.categorie ? ' selected' : ''}>${mailEsc(c.nom)}</option>`).join('')}
            </select>
            <a href="https://mail.google.com/mail/u/0/#inbox/${m.threadId}" target="_blank" rel="noopener" style="font-size:12px; color:var(--accent); white-space:nowrap">Ouvrir →</a>
        </div>`).join('');
}

async function mailOverrideCategory(i, catNom) {
    const m = mailState.triage[i]; if (!m) return;
    const oldCat = m.categorie;
    m.categorie = catNom;
    const cat = db.mailCategories.find(c => c.nom === catNom);
    try {
        const labelMap = await mailEnsureLabels();
        const oldCatObj = db.mailCategories.find(c => c.nom === oldCat);
        if (oldCatObj && labelMap[oldCatObj.label || oldCatObj.nom]) {
            await mailGmailFetch(`${GMAIL_API}/messages/${m.id}/modify`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ removeLabelIds: [labelMap[oldCatObj.label || oldCatObj.nom]] })
            });
        }
        if (cat && labelMap[cat.label || cat.nom]) {
            await mailGmailFetch(`${GMAIL_API}/messages/${m.id}/modify`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ addLabelIds: [labelMap[cat.label || cat.nom]] })
            });
        }
        await MailSupa.upsertState({ gmail_message_id: m.id, category: catNom, draft_created: false });
    } catch (e) {
        mailSetStatus('mail-tri-status', "❌ Erreur lors de la correction : " + e.message, 'error');
    }
}

// --- Onglet Brouillons ---
async function mailGenerateDrafts() {
    if (!mailGuard('brouillons')) return;
    const draftCats = db.mailCategories.filter(c => c.draft);
    if (!draftCats.length) {
        mailSetStatus('mail-drafts-status', "Aucune catégorie n'est configurée pour générer des brouillons (onglet Connexion → catégorie → 'Génère un brouillon ?').", 'info');
        return;
    }
    mailState.busy.drafts = true;
    mailSetStatus('mail-drafts-status', "⏳ Recherche des mails concernés...", 'loading');
    try {
        const states = await MailSupa.listStates();
        const draftCatNames = new Set(draftCats.map(c => c.nom));
        const candidates = states.filter(s => draftCatNames.has(s.category) && !s.draft_created);
        if (!candidates.length) {
            mailSetStatus('mail-drafts-status', "Aucun nouveau mail éligible à un brouillon (trie d'abord ta boîte dans l'onglet Tri).", 'info');
            return;
        }
        mailSetStatus('mail-drafts-status', `⏳ Génération de ${candidates.length} brouillon(s)...`, 'loading');
        let created = 0, failed = 0;
        for (const s of candidates) {
            try {
                const full = await mailGmailFetch(`${GMAIL_API}/messages/${s.gmail_message_id}?format=full`);
                const from = mailHeader(full.payload?.headers, 'From');
                const subject = mailHeader(full.payload?.headers, 'Subject');
                const { text } = mailExtractBody(full.payload);
                const cat = draftCats.find(c => c.nom === s.category);
                const prompt = `Voici un mail reçu :\nDe : ${from}\nObjet : ${subject}\nContenu : ${text || full.snippet}\n\nRédige une réponse en français à ce mail. Instructions de ton/style : ${cat.prompt || 'Réponds de façon courtoise et professionnelle.'}\n\nRéponds UNIQUEMENT avec le corps du mail de réponse, sans objet ni signature d'en-tête.`;
                const replyBody = await mailClaudeCall("Tu rédiges des brouillons de réponse email professionnels en français. Ne signe jamais à la place de l'utilisateur, laisse la validation finale à l'humain.", prompt, 1000);
                const toAddr = (from.match(/<(.+)>/) || [, from])[1];
                const rawMime = mailBuildMime(toAddr, 'Re: ' + subject.replace(/^Re:\s*/i, ''), replyBody);
                const draftRes = await mailGmailFetch(`${GMAIL_API}/drafts`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: { raw: rawMime, threadId: full.threadId } })
                });
                mailState.draftsGenerated.unshift({ id: draftRes.id, to: toAddr, subject, snippet: replyBody.slice(0, 140), threadId: full.threadId });
                await MailSupa.upsertState({ gmail_message_id: s.gmail_message_id, category: s.category, draft_created: true });
                created++;
            } catch (e) { failed++; }
        }
        renderMailDraftsList();
        mailSetStatus('mail-drafts-status', `✅ ${created} brouillon(s) créé(s)${failed ? `, ${failed} échec(s)` : ''}.`, failed ? 'error' : 'success');
    } catch (e) {
        mailSetStatus('mail-drafts-status', "❌ " + e.message, 'error');
    } finally {
        mailState.busy.drafts = false;
    }
}

function renderMailDraftsList() {
    const el = $('mail-drafts-list'); if (!el) return;
    el.innerHTML = mailState.draftsGenerated.map(d => `
        <div class="card" style="flex-direction:column; align-items:stretch; gap:6px">
            <b>${mailEsc(d.subject || '(sans objet)')}</b>
            <small style="color:var(--text-muted)">À : ${mailEsc(d.to)}</small>
            <div style="font-size:13px; opacity:.8">${mailEsc(d.snippet)}…</div>
            <a href="https://mail.google.com/mail/u/0/#inbox/${d.threadId}" target="_blank" rel="noopener" style="font-size:12px; color:var(--accent)">Valider dans Gmail →</a>
        </div>`).join('') || '<div style="text-align:center; padding:30px; opacity:.5">Aucun brouillon généré dans cette session</div>';
}

// --- Onglet Extraction (factures) ---
async function mailScanInvoices() {
    if (!mailGuard('extraction')) return;
    const factCat = db.mailCategories.find(c => c.nom.toLowerCase().includes('facture'));
    if (!factCat) { mailSetStatus('mail-extraction-status', "Aucune catégorie 'Factures / Compta' configurée.", 'error'); return; }
    mailState.busy.extraction = true;
    mailSetStatus('mail-extraction-status', "⏳ Recherche des mails de facturation...", 'loading');
    try {
        const states = await MailSupa.listStates();
        const existingInvoices = await MailSupa.listInvoices();
        mailState.invoices = existingInvoices;
        const alreadyExtracted = new Set(existingInvoices.map(i => i.gmail_message_id));
        const candidates = states.filter(s => s.category === factCat.nom && !alreadyExtracted.has(s.gmail_message_id));
        if (!candidates.length) {
            mailSetStatus('mail-extraction-status', "Aucun nouveau mail de facturation à extraire (trie d'abord ta boîte dans l'onglet Tri).", 'info');
            renderMailInvoicesTable();
            return;
        }
        mailSetStatus('mail-extraction-status', `⏳ Extraction de ${candidates.length} facture(s)...`, 'loading');
        let ok = 0, failed = 0;
        for (const s of candidates) {
            try {
                const full = await mailGmailFetch(`${GMAIL_API}/messages/${s.gmail_message_id}?format=full`);
                const from = mailHeader(full.payload?.headers, 'From');
                const subject = mailHeader(full.payload?.headers, 'Subject');
                const date = mailHeader(full.payload?.headers, 'Date');
                const { text, attachments } = mailExtractBody(full.payload);
                const entities = db.ents.map(e => e.nom).concat(['SCEA Terres et Vie', 'SARL Matevie', 'ALOHASH', 'Personnel']);
                const prompt = `Voici un mail de facturation :\nDe : ${from}\nObjet : ${subject}\nDate : ${date}\nPièces jointes : ${attachments.join(', ') || 'aucune'}\nContenu :\n${text || full.snippet}\n\nExtrait les informations de facturation et réponds UNIQUEMENT avec un objet JSON strict de cette forme (utilise null si une info est introuvable) :\n{"entite": "l'une de [${entities.join(', ')}] ou null", "fournisseur": "...", "montant": nombre ou null, "devise": "EUR", "date_facture": "YYYY-MM-DD ou null", "categorie": "..."}\nSi le contenu du mail ne permet pas de déterminer le montant avec certitude (ex : facture en pièce jointe PDF non lisible), mets "montant": null plutôt que d'inventer un chiffre.`;
                const raw = await mailClaudeCall("Tu extrais des données de facturation depuis des emails pour la comptabilité. Ne jamais inventer un montant : utilise null si l'info n'est pas explicitement présente dans le texte fourni. Réponds uniquement en JSON valide.", prompt, 800);
                const parsed = mailParseJson(raw) || {};
                const invoice = {
                    gmail_message_id: s.gmail_message_id,
                    entity: parsed.entite || null,
                    vendor: parsed.fournisseur || from,
                    amount: typeof parsed.montant === 'number' ? parsed.montant : null,
                    currency: parsed.devise || 'EUR',
                    invoice_date: parsed.date_facture || null,
                    category: factCat.nom,
                    status: 'a_verifier',
                    raw_extract: parsed
                };
                await MailSupa.upsertInvoice(invoice);
                mailState.invoices.unshift(invoice);
                ok++;
            } catch (e) { failed++; }
        }
        renderMailInvoicesTable();
        mailSetStatus('mail-extraction-status', `✅ ${ok} facture(s) extraite(s)${failed ? `, ${failed} échec(s)` : ''}.`, failed ? 'error' : 'success');
    } catch (e) {
        mailSetStatus('mail-extraction-status', "❌ " + e.message, 'error');
    } finally {
        mailState.busy.extraction = false;
    }
}

async function renderMailInvoicesTable() {
    const wrap = $('mail-invoices-table-wrap'); if (!wrap) return;
    if (!mailState.invoices.length) mailState.invoices = await MailSupa.listInvoices();

    const filterEl = $('mail-inv-entity-filter');
    if (filterEl) {
        const entities = [...new Set(mailState.invoices.map(i => i.entity).filter(Boolean))];
        const cur = filterEl.value || 'Toutes';
        filterEl.innerHTML = ['Toutes', ...entities].map(e => `<option${e === cur ? ' selected' : ''}>${mailEsc(e)}</option>`).join('');
    }
    const filterVal = filterEl ? filterEl.value : 'Toutes';
    const list = (filterVal && filterVal !== 'Toutes') ? mailState.invoices.filter(i => i.entity === filterVal) : mailState.invoices;

    if (!list.length) {
        wrap.innerHTML = '<div style="text-align:center; padding:30px; opacity:.5">Aucune facture extraite pour le moment</div>';
        return;
    }
    wrap.innerHTML = `
        <table class="tva-table">
            <thead><tr>
                ${['Date', 'Entité', 'Fournisseur', 'Montant', 'Catégorie', 'Statut'].map(h => `<th style="padding:10px 12px; text-align:left; font-size:11px; opacity:.5; text-transform:uppercase">${h}</th>`).join('')}
            </tr></thead>
            <tbody>${list.map(i => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
                    <td style="padding:9px 12px; font-size:12px">${mailEsc(i.invoice_date || '—')}</td>
                    <td style="padding:9px 12px; font-size:12px">${mailEsc(i.entity || '—')}</td>
                    <td style="padding:9px 12px; font-size:13px">${mailEsc(i.vendor || '—')}</td>
                    <td style="padding:9px 12px; text-align:right; font-weight:600">${i.amount != null ? eur(i.amount) : '—'}</td>
                    <td style="padding:9px 12px; font-size:12px">${mailEsc(i.category || '—')}</td>
                    <td style="padding:9px 12px; font-size:12px">${mailEsc(i.status || '—')}</td>
                </tr>`).join('')}
            </tbody>
        </table>`;
}

function mailExportInvoices() {
    if (!window.XLSX) return toast('SheetJS non chargé', 'error');
    if (!mailState.invoices.length) return toast('Aucune facture à exporter.', 'error');
    const headers = ['Date facture', 'Entité', 'Fournisseur', 'Montant', 'Devise', 'Catégorie', 'Statut'];
    const rows = mailState.invoices.map(i => [i.invoice_date || '', i.entity || '', i.vendor || '', i.amount ?? '', i.currency || 'EUR', i.category || '', i.status || '']);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = [{ wch: 14 }, { wch: 22 }, { wch: 28 }, { wch: 12 }, { wch: 8 }, { wch: 20 }, { wch: 14 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Factures Mail');
    XLSX.writeFile(wb, 'Factures_Mail_' + new Date().toLocaleDateString('fr-FR').replace(/\//g, '-') + '.xlsx');
}

// Initialisation Mail (toujours après le reste : mailState et db.mailCategories doivent
// être prêts avant qu'un rendu ne les lise, ce qui est garanti par l'ordre du fichier).
initMailCategories();
mailRestoreSession();
