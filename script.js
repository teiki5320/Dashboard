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

// Synchronisation GitHub
const Sync = {
    cfg: () => JSON.parse(localStorage.getItem('v90_gh_config') || 'null'),
    setCfg: (c) => localStorage.setItem('v90_gh_config', JSON.stringify(c)),

    async pull() {
        const c = Sync.cfg();
        if (!c?.token) return alert("Configure d'abord GitHub dans Paramètres");
        const url = `https://api.github.com/repos/${c.owner}/${c.repo}/contents/${c.path}`;
        let res;
        try { res = await fetch(url, { headers: { Authorization: `token ${c.token}` } }); }
        catch (e) { return alert("Erreur réseau : " + e.message); }
        if (!res.ok) return alert("Erreur lecture GitHub : " + res.status + " — vérifie le token et le dépôt");
        const file = await res.json();
        localStorage.setItem('v90_gh_sha', file.sha);
        let data;
        try { data = JSON.parse(atob(file.content.replace(/\n/g, ''))); }
        catch (e) { return alert("Fichier JSON invalide sur GitHub"); }
        ['clis','prods','ents','hist','bls','drafts'].forEach(k => {
            db[k] = data[k] || [];
            G.set('v90_' + k, db[k]);
        });
        localStorage.setItem('v90_inv_count', data.inv_count || '0');
        renderAll();
        alert("✅ Données chargées depuis GitHub !");
    },

    async push() {
        const c = Sync.cfg();
        if (!c?.token) return alert("Configure d'abord GitHub dans Paramètres");
        const data = {
            version: "9.0",
            lastSync: new Date().toISOString(),
            clis: db.clis, prods: db.prods, ents: db.ents,
            hist: db.hist, bls: db.bls, drafts: db.drafts,
            inv_count: G.val('v90_inv_count')
        };
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
        const sha = localStorage.getItem('v90_gh_sha');
        const body = { message: "sync " + new Date().toISOString(), content };
        if (sha) body.sha = sha;
        const url = `https://api.github.com/repos/${c.owner}/${c.repo}/contents/${c.path}`;
        let res;
        try { res = await fetch(url, { method: 'PUT', headers: { Authorization: `token ${c.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); }
        catch (e) { return alert("Erreur réseau : " + e.message); }
        if (res.status === 409) return alert("Conflit : fais d'abord un ⬇️ Pull pour récupérer la version distante");
        if (!res.ok) return alert("Erreur écriture GitHub : " + res.status);
        const result = await res.json();
        localStorage.setItem('v90_gh_sha', result.content.sha);
        alert("✅ Données sauvegardées sur GitHub !");
    }
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
    
    if (id === 'facture') $('f-num').value = genNum();

    if (id === 'parametres') {
        const ghCfg = Sync.cfg();
        if (ghCfg) {
            $('gh-token').value = ghCfg.token || '';
            $('gh-repo').value = (ghCfg.owner && ghCfg.repo) ? `${ghCfg.owner}/${ghCfg.repo}` : '';
            $('gh-path').value = ghCfg.path || 'data.json';
        }
    }

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
    closeModals();
    renderBLGrid();
    alert('✅ Prix spécifiques sauvegardés !');
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
    let cliId = $('bl-cli-select').value;
    let prixCli = (cliId && db.prixCli[cliId]) ? db.prixCli[cliId] : {};
    let items = [];
    db.prods.forEach(p => {
        let q = parseInt($('qty-' + p.id).value);
        let prix = prixCli[p.id] !== undefined ? prixCli[p.id] : p.prix;
        if (q > 0) items.push({ pid: p.id, icon: p.icon, nom: p.nom, prix: prix, qte: q, unite: p.unite, tva: p.tva });
    });
    if (!items.length) return;
    const [y, m, d] = $('bl-date').value.split('-');
    const dateStr = `${d}/${m}/${y}`;
    db.bls.push({ id: Date.now(), date: dateStr, cid: cliId, cliNom: db.clis.find(c => c.id == cliId).nom, items, status: 'en-cours' });
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

        let total = b.items.reduce((s, i) => s + (i.qte * i.prix * (1 + (i.tva || 20) / 100)), 0);

        return `
        <div class="card" style="flex-direction: column; align-items: stretch; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border); padding-bottom: 15px; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <input type="checkbox" style="width: 28px; height: 28px; cursor: pointer; accent-color: var(--gold);" ${isChecked} onchange="toggleBLSel(${b.id}, this.checked)">
                    <div>
                        <b style="font-size: 18px; color: var(--gold);">${b.cliNom}</b><br>
                        <small style="color: var(--sage); font-weight: 600;">📅 Date : ${b.date}</small>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="text-align: right;">
                        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Total TTC</div>
                        <b style="font-size: 18px; color: var(--gold);">${eur(total)}</b>
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

// --- RENDU GRILLE BL ---
function renderBLGrid() {
    let cliId = $('bl-cli-select').value;
    let prices = (cliId && db.prixCli[cliId]) ? db.prixCli[cliId] : {};
    $('bl-prod-grid').innerHTML = db.prods.map(p => {
        let prix = prices[p.id] !== undefined ? prices[p.id] : p.prix;
        let hasCustom = prices[p.id] !== undefined && prices[p.id] !== p.prix;
        let prixLabel = hasCustom
            ? `<span style="color:var(--gold);font-weight:700">${eur(prix)}</span> <small style="opacity:.4;text-decoration:line-through">${eur(p.prix)}</small>`
            : `<span style="opacity:.6;font-size:13px">${eur(prix)}</span>`;
        return `
        <div class="card" style="flex-direction:column; padding: 20px; align-items: center;">
            <div style="font-size: 18px; margin-bottom: 6px;">${p.icon} <b>${p.nom}</b></div>
            <div style="margin-bottom: 12px; font-size:13px">${prixLabel} / ${p.unite}</div>
            <div style="display:flex; gap:12px; align-items:center; justify-content: center;">
                <button class="btn btn-gold" style="width: 60px; height: 60px; padding: 0; font-size: 35px; border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;" onclick="changeQty('${p.id}',-1)">−</button>
                <input type="number" id="qty-${p.id}" value="0" style="width: 100px; height: 60px; text-align:center; font-size: 26px; font-weight: 700; border-radius: 12px; margin: 0; padding: 0; background: #fff; border: 2px solid var(--border); color: var(--header);">
                <button class="btn btn-gold" style="width: 60px; height: 60px; padding: 0; font-size: 35px; border-radius: 12px; display: flex; align-items: center; justify-content: center; line-height: 1;" onclick="changeQty('${p.id}',1)">+</button>
            </div>
        </div>`; }).join('');
}

// --- RENDU GLOBAL DES LISTES ---
function renderAll() {
    // 1. Sélecteur client pour le BL
    $('bl-date').value = new Date().toISOString().split('T')[0];
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
    
    // 4. Sélecteurs pour la facturation libre
    $('f-ent').innerHTML = db.ents.map(e => `<option value="${e.id}">${e.nom}</option>`).join('');
    $('f-cli').innerHTML = db.clis.map(c => `<option value="${c.id}">${c.nom}</option>`).join('');
    $('f-prod-picker').innerHTML = db.prods.map(p => `<option value="${p.id}">${p.nom}</option>`).join('');
    
    // 5. Affichage du stock actuel et ajustement
    $('list-stock').innerHTML = db.prods.map(p => `<div class="card" style="flex-direction:column"><b>${p.icon} ${p.nom}</b><div style="font-size:20px;color:var(--sage);font-weight:700">${p.stock} ${p.unite}</div></div>`).join('');
    $('adj-prod').innerHTML = db.prods.map(p => `<option value="${p.id}">${p.nom}</option>`).join('');
    
    // 6. Historique des factures
    $('list-hist').innerHTML = db.hist.length === 0
        ? `<div style="text-align:center; padding:40px 20px; opacity:.4; font-size:14px">Aucune facture archivée</div>`
        : db.hist.slice().reverse().map(h => {
            const itemsHtml = (h.items || []).map(i =>
                `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:13px">
                    <span>${i.icon || ''} ${i.nom}</span>
                    <span style="opacity:.6">${i.qte} ${i.unite} × ${eur(i.prix)}</span>
                    <span style="font-weight:600">${eur(i.qte * i.prix * (1 + (i.tva || 20) / 100))}</span>
                </div>`
            ).join('');
            return `
            <div class="card" style="flex-direction:column; align-items:stretch; gap:0; padding:0; overflow:hidden">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.08)">
                    <div>
                        <b style="font-size:16px; color:var(--gold)">🧾 ${h.num}</b>
                        ${h.date ? `<span style="font-size:12px; opacity:.5; margin-left:10px">📅 ${h.date}</span>` : ''}
                    </div>
                    <button class="btn btn-red" style="width:34px; height:34px; padding:0; font-size:14px; border-radius:8px; flex-shrink:0" onclick="deleteHist(${h.id || 0}, '${h.num}')">✕</button>
                </div>
                <div style="padding:12px 16px; display:flex; gap:10px; flex-wrap:wrap; border-bottom:1px solid rgba(255,255,255,0.08)">
                    ${h.ent ? `<span style="font-size:12px; opacity:.6">🏢 <b>${h.ent}</b></span><span style="opacity:.3">→</span>` : ''}
                    <span style="font-size:13px; font-weight:600">👤 ${h.cli}</span>
                </div>
                ${itemsHtml ? `<div style="padding:8px 16px">${itemsHtml}</div>` : ''}
                <div style="display:flex; justify-content:space-between; padding:12px 16px; background:rgba(255,255,255,0.04)">
                    ${h.ht ? `<span style="font-size:12px; opacity:.5">HT : ${h.ht}</span>` : '<span></span>'}
                    <b style="font-size:18px; color:var(--gold)">TTC : ${h.total}</b>
                </div>
            </div>`;
        }).join('');
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
    db.hist.push({
        id: Date.now(),
        num: $('f-num').value,
        date: $('f-date').value,
        cli: db.clis.find(c => c.id == $('f-cli').value).nom,
        ent: entObj ? entObj.nom : '',
        items: curLines.map(l => ({ icon: l.icon, nom: l.nom, qte: l.qte, prix: l.prix, unite: l.unite, tva: l.tva })),
        ht: eur(ht),
        total: eur(ttc)
    });
    G.set('v90_hist', db.hist);
    if (curDraftId) db.drafts = db.drafts.filter(d => d.id != curDraftId);
    G.set('v90_drafts', db.drafts);
    localStorage.setItem('v90_inv_count', parseInt(G.val('v90_inv_count')) + 1);
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
    let ent = db.ents[0] || null;
    let cli = db.clis.find(c => c.id == b.cid);
    let rows = '', ht = 0, ttc = 0;
    b.items.forEach(i => {
        let lht = i.prix * i.qte;
        let lttc = lht * (1 + (i.tva || 20) / 100);
        ht += lht; ttc += lttc;
        rows += `<tr><td>${i.icon || ''} ${i.nom}</td><td style="text-align:center">${i.qte}</td><td style="text-align:center">${i.unite}</td><td>${eur(i.prix)}</td><td style="text-align:right">${eur(lht)}</td></tr>`;
    });
    $('sheet-holder').innerHTML = `
        <div class="inv-wrap">
            <h1>Bon de Livraison</h1>
            <div class="inv-header-grid">
                <div>${ent ? `<b>Émetteur</b>${ent.nom}<br>${ent.adr}<br>${ent.ville}${ent.siret ? '<br>SIRET : ' + ent.siret : ''}` : ''}</div>
                <div style="text-align:right"><b>Destinataire</b>${cli ? cli.nom + '<br>' + (cli.adr || '') + '<br>' + (cli.ville || '') : b.cliNom}</div>
            </div>
            <div style="margin-bottom:20px"><b>DATE :</b> ${b.date}</div>
            <table class="inv-table">
                <thead><tr><th>Désignation</th><th style="text-align:center">Qté</th><th style="text-align:center">Unité</th><th>P.U HT</th><th style="text-align:right">Total HT</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="inv-totals">
                <div class="inv-total-line"><span>Total HT</span><span>${eur(ht)}</span></div>
                <div class="inv-total-final"><span>TOTAL TTC</span><span>${eur(ttc)}</span></div>
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
    if (!window.XLSX) return alert('SheetJS non chargé');
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
function calcCompta() {
    let ca = 0, tvaCol = 0;
    db.hist.forEach(h => {
        let ttc = parseFloat(h.total.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        ca += ttc / 1.2;
        tvaCol += ttc - (ttc / 1.2);
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
        <div class="section-title" style="margin-top:10px">Dernières factures</div>
        ${db.hist.slice().reverse().map(h => `
            <div class="card"><b>${h.num}</b> — ${h.cli}<b style="float:right">${h.total}</b></div>
        `).join('') || '<div style="color:var(--text-muted); text-align:center">Aucune facture</div>'}`;
}

function saveGhConfig() {
    const repoVal = $('gh-repo').value.trim();
    const parts = repoVal.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) return alert("Format dépôt invalide — ex: mon-pseudo/mon-depot");
    if (!$('gh-token').value.trim()) return alert("Le token est requis");
    Sync.setCfg({ token: $('gh-token').value.trim(), owner: parts[0], repo: parts[1], path: $('gh-path').value.trim() || 'data.json' });
    alert("✅ Config GitHub sauvegardée !");
}

// Initialisation
$('f-date').value = new Date().toLocaleDateString('fr-FR');
showPage('home');
