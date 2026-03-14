/**
 * GESTION PRO v9.0 - Core Logic
 */

const $ = (id) => document.getElementById(id);

// Gestion du LocalStorage
const G = {
    get: (k) => JSON.parse(localStorage.getItem(k) || '[]'),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    val: (k) => localStorage.getItem(k) || '0'
};

// Formatage devise
const eur = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

// Base de données locale
let db = {
    clis: G.get('v90_clis'),
    prods: G.get('v90_prods'),
    ents: G.get('v90_ents'),
    hist: G.get('v90_hist'),
    bls: G.get('v90_bls'),
    drafts: G.get('v90_drafts')
};

let curLines = [], blSel = [], curDraftId = null;

// --- NAVIGATION ---
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    $('page-' + id).classList.add('active');
    
    $('hd-page-name').innerText = id === 'home' ? 'TABLEAU DE BORD' : id.toUpperCase();
    $('global-back').style.display = (id === 'home') ? 'none' : 'flex';
    
    if (id === 'facture') $('f-num').value = genNum();
    
    window.scrollTo(0, 0);
    renderAll();
}

function genNum() {
    let c = parseInt(G.val('v90_inv_count')) + 1;
    return new Date().getFullYear() + "-" + String(c).padStart(3, '0');
}

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
    } else {
        $('mp-title').innerText = "Nouveau Produit"; $('mp-id').value = ''; $('mp-icon').value = '';
        $('mp-nom').value = ''; $('mp-desc').value = ''; $('mp-prix').value = '';
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
    let o = { id, icon: $('mp-icon').value || '📦', nom: $('mp-nom').value, desc: $('mp-desc').value, prix: parseFloat($('mp-prix').value) || 0, unite: $('mp-unite').value, tva: parseFloat($('mp-tva').value), stock: 0 };
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
    $('tab-bl-prise').classList.toggle('active', t === 'prise');
    $('tab-bl-suivi').classList.toggle('active', t === 'suivi');
    $('view-bl-prise').style.display = t === 'prise' ? 'block' : 'none';
    $('view-bl-suivi').style.display = t === 'suivi' ? 'block' : 'none';
    if (t === 'suivi') renderSuiviBL();
}

function changeQty(id, d) {
    let e = $('qty-' + id);
    e.value = Math.max(0, parseInt(e.value) + d);
}

function saveBL() {
    let items = [];
    db.prods.forEach(p => {
        let q = parseInt($('qty-' + p.id).value);
        if (q > 0) items.push({ pid: p.id, icon: p.icon, nom: p.nom, prix: p.prix, qte: q, unite: p.unite, tva: p.tva });
    });
    if (!items.length) return;
    db.bls.push({ id: Date.now(), date: new Date().toLocaleDateString('fr-FR'), cid: $('bl-cli-select').value, cliNom: db.clis.find(c => c.id == $('bl-cli-select').value).nom, items, status: 'en-cours' });
    G.set('v90_bls', db.bls);
    alert("Livraison enregistrée !");
    showPage('home');
}

function renderSuiviBL() {
    $('list-bl-encours').innerHTML = db.bls.filter(b => b.status === 'en-cours').map(b => {
        
        // On vérifie si ce BL est déjà dans la sélection pour garder la case cochée
        let isChecked = blSel.includes(b.id) ? 'checked' : '';
        
        // Création de la liste détaillée des articles de la commande
        let itemsDetail = b.items.map(i => `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed var(--border); font-size: 14px; color: #4A4A4A; padding-left: 45px;">
                <span style="flex: 2;"><b>${i.icon} ${i.nom}</b></span>
                <span style="flex: 1; text-align: center; color: var(--sage); font-weight: 700;">${i.qte} ${i.unite}</span>
                <span style="flex: 1; text-align: right;">${eur(i.prix)} / ${i.unite}</span>
            </div>
        `).join('');

        return `
        <div class="card" style="flex-direction: column; align-items: stretch; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <input type="checkbox" style="width: 28px; height: 28px; cursor: pointer; accent-color: var(--gold);" ${isChecked} onchange="toggleBLSel(${b.id}, this.checked)">
                    <div>
                        <b style="font-size: 18px; color: var(--header);">${b.cliNom}</b><br>
                        <small style="color: var(--sage); font-weight: 600;">📅 Date : ${b.date}</small>
                    </div>
                </div>
                <button class="btn btn-red" style="width: 40px; height: 40px; padding: 0; font-size: 16px; border-radius: 8px;" onclick="deleteItem('bls',${b.id})" title="Supprimer ce bon">✕</button>
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
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed var(--border); font-size: 14px; color: #4A4A4A;">
                <span style="flex: 2;"><b>${i.icon} ${i.nom}</b></span>
                <span style="flex: 1; text-align: center;">${i.qte} ${i.unite}</span>
                <span style="flex: 1; text-align: right;">${eur(i.prix)} / ${i.unite}</span>
                <span style="flex: 1; text-align: right; font-weight: 700; color: var(--text);">${eur(i.qte * i.prix)} HT</span>
            </div>
        `).join('');

        // Affichage des dates des BL d'origine (si dispo)
        let blRefs = d.dates ? `<div style="font-size: 12px; color: var(--sage); margin-top: 4px;">📍 Commandes du : <b>${d.dates}</b></div>` : '';

        return `
        <div class="card draft-card" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 15px;">
                <div>
                    <b style="font-size: 18px;">${d.cliNom}</b>
                    ${blRefs}
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--gold-dark);">Total TTC Prévu</span><br>
                    <b style="font-size: 22px; color: var(--sage);">${eur(tot)}</b>
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

// --- RENDU GLOBAL DES LISTES ---
function renderAll() {
    // 1. Sélecteur client pour le BL
    $('bl-cli-select').innerHTML = db.clis.map(c => `<option value="${c.id}">${c.nom}</option>`).join('');
    
    // 2. Grille des produits pour le BL (AVEC LES GROS BOUTONS CARRÉS)
    $('bl-prod-grid').innerHTML = db.prods.map(p => `
        <div class="card" style="flex-direction:column; padding: 20px; align-items: center;">
            <div style="font-size: 18px; margin-bottom: 15px;">${p.icon} <b>${p.nom}</b></div>
            <div style="display:flex; gap:12px; align-items:center; justify-content: center;">
                <button class="btn btn-gold" style="width: 60px; height: 60px; padding: 0; font-size: 35px; border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;" onclick="changeQty('${p.id}',-1)">−</button>
                <input type="number" id="qty-${p.id}" value="0" style="width: 100px; height: 60px; text-align:center; font-size: 26px; font-weight: 700; border-radius: 12px; margin: 0; padding: 0; background: #fff; border: 2px solid var(--border); color: var(--header);">
                <button class="btn btn-gold" style="width: 60px; height: 60px; padding: 0; font-size: 35px; border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;" onclick="changeQty('${p.id}',1)">+</button>
            </div>
        </div>`).join('');
    
    // 3. Listes dans les paramètres
    $('list-prods-settings').innerHTML = db.prods.map(p => `<div class="card card-link" onclick="openProdModal(${p.id})"><div><b>${p.icon} ${p.nom}</b></div><span>✏️</span></div>`).join('');
    $('list-clis-settings').innerHTML = db.clis.map(c => `<div class="card card-link" onclick="openCliModal(${c.id})"><b>👤 ${c.nom}</b></div><span>✏️</span></div>`).join('');
    $('list-ents-settings').innerHTML = db.ents.map(e => `<div class="card card-link" onclick="openEntModal(${e.id})"><b>🏢 ${e.nom}</b></div><span>✏️</span></div>`).join('');
    
    // 4. Sélecteurs pour la facturation libre
    $('f-ent').innerHTML = db.ents.map(e => `<option value="${e.id}">${e.nom}</option>`).join('');
    $('f-cli').innerHTML = db.clis.map(c => `<option value="${c.id}">${c.nom}</option>`).join('');
    $('f-prod-picker').innerHTML = db.prods.map(p => `<option value="${p.id}">${p.nom}</option>`).join('');
    
    // 5. Affichage du stock actuel et ajustement
    $('list-stock').innerHTML = db.prods.map(p => `<div class="card" style="flex-direction:column"><b>${p.icon} ${p.nom}</b><div style="font-size:20px;color:var(--sage);font-weight:700">${p.stock} ${p.unite}</div></div>`).join('');
    $('adj-prod').innerHTML = db.prods.map(p => `<option value="${p.id}">${p.nom}</option>`).join('');
    
    // 6. Historique des factures
    $('list-hist').innerHTML = db.hist.slice().reverse().map(h => `<div class="card"><b>${h.num}</b> — ${h.cli} <b style="float:right">${h.total}</b></div>`).join('');
}

// --- IMPRESSION & FINALISATION ---
function previewInvoice() {
    let ent = db.ents.find(e => e.id == $('f-ent').value), cli = db.clis.find(c => c.id == $('f-cli').value);
    if (!ent || !cli) return alert("Émetteur ou Client manquant");
    
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
                <div><h3>Notes</h3>${ent.mentions.replace(/\n/g, '<br>')}</div>
            </div>
        </div>`;
    $('preview-wrap').style.display = 'block';
}

function finalizeInvoice() {
    curLines.forEach(l => { let p = db.prods.find(x => x.id == l.pid); if (p) p.stock -= l.qte; });
    G.set('v90_prods', db.prods);
    db.hist.push({ num: $('f-num').value, cli: db.clis.find(c => c.id == $('f-cli').value).nom, total: $('f-tot-ttc').innerText });
    G.set('v90_hist', db.hist);
    if (curDraftId) db.drafts = db.drafts.filter(d => d.id != curDraftId);
    G.set('v90_drafts', db.drafts);
    localStorage.setItem('v90_inv_count', parseInt(G.val('v90_inv_count')) + 1);
    window.print();
    closePreview();
    showPage('home');
}

function deleteItem(t, id) { if (confirm("Supprimer ?")) { db[t] = db[t].filter(x => x.id != id); G.set('v90_' + t, db[t]); renderAll(); } }
function closePreview() { $('preview-wrap').style.display = 'none'; }

// Initialisation
$('f-date').value = new Date().toLocaleDateString('fr-FR');
showPage('home');
