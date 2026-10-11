/**
 * Dashboard — la coquille.
 *
 * Depuis le 11 octobre 2026, ce tableau de bord ne sert plus qu'aux projets
 * numériques : le module « Mes apps », et deux raccourcis vers le Studio
 * (Publicité, Chaîne). Toute la gestion commerciale — bons de livraison,
 * facturation, stock, TVA, comptabilité, analyse EBE — a été retirée.
 *
 * Il ne reste donc ici que ce dont Mes apps a besoin : le thème (dans
 * index.html), les animations, l'horloge, les messages, la flèche retour —
 * plus un sauvetage ponctuel des données laissées par l'ancienne application.
 */
'use strict';

const $ = (id) => document.getElementById(id);

// Échappement HTML. À appliquer à TOUTE donnée insérée dans un gabarit.
function ech(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// --- NAVIGATION ---
// Il n'y a plus qu'une page. showPage reste parce que le module Mes apps
// s'accroche dessus pour s'initialiser et pour nettoyer le rail.
function showPage(id) {
    showPage._cur = id;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const cible = $('page-' + id);
    if (cible) cible.classList.add('active');
    window.scrollTo(0, 0);
}

// La flèche retour appartient au module : elle ramène à sa vue d'ensemble.
// Depuis la vue d'ensemble il n'y a plus rien derrière, donc elle s'efface —
// un bouton qui ne fait rien vaut moins qu'un bouton absent.
function goBack() {
    if (typeof window.dashBack === 'function') window.dashBack();
}
function majBoutonRetour() {
    const b = $('global-back');
    if (!b) return;
    const dansUneFiche = !!document.querySelector('#page-dash .app-head, #page-dash .cat-section');
    b.style.display = dansUneFiche ? 'flex' : 'none';
}

// --- NOTIFICATIONS (message non bloquant) ---
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

// --- ANIMATIONS (bouton de l'en-tête — état partagé avec le module) ---
const ANIM_KEY = 'dash-anim'; // même clé que dash-module.js : un seul état
function animOn() {
    try { return localStorage.getItem(ANIM_KEY) !== 'off'; } catch (e) { return true; }
}
function applyGlobalAnim(on) {
    document.documentElement.setAttribute('data-anim', on ? 'on' : 'off');
    const btn = $('hd-anim-toggle');
    if (btn) { btn.textContent = on ? '⚡' : '⏸'; btn.style.color = on ? '' : 'var(--accent)'; }
    try { localStorage.setItem(ANIM_KEY, on ? 'on' : 'off'); } catch (e) {}
}
function toggleGlobalAnim() { applyGlobalAnim(!animOn()); }
applyGlobalAnim(animOn());

// --- HORLOGE DE L'EN-TÊTE ---
function tick() {
    const n = new Date();
    $('hd-date').innerText = n.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
    $('hd-time').innerText = String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
}
setInterval(tick, 1000);
tick();

// --- RÉCUPÉRATION DES DONNÉES DE L'ANCIENNE GESTION PRO ---
//
// Retirer l'application ne vide pas le navigateur : les clients, bons de
// livraison, factures et relevés TVA sont toujours sous les clés « v90_ » du
// localStorage, mais plus rien ne sait les lire. Ce bandeau les rend
// récupérables en un clic, et ne s'affiche que tant qu'il en reste.
function anciennesCles() {
    const out = [];
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('v90_')) out.push(k);
        }
    } catch (e) {}
    return out;
}

function telechargerAnciennesDonnees() {
    const data = {};
    anciennesCles().forEach(k => { data[k] = localStorage.getItem(k); });
    const payload = { app: 'gestion-pro', version: 1, exportedAt: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'GestionPro_donnees_' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast(`✅ ${Object.keys(data).length} collection(s) téléchargée(s). Range le fichier avant d'effacer.`, 'success');
}

function effacerAnciennesDonnees() {
    const cles = anciennesCles();
    if (!confirm(`Effacer définitivement les ${cles.length} collection(s) de l'ancienne Gestion Pro de ce navigateur ?\n\nClients, bons de livraison, factures, historique, TVA, EBE. C'est sans retour : télécharge-les d'abord si ce n'est pas fait.`)) return;
    cles.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    renderRecuperation();
    toast('Anciennes données effacées de ce navigateur.', 'info');
}

function renderRecuperation() {
    const zone = $('recup-anciennes');
    if (!zone) return;
    const n = anciennesCles().length;
    if (!n) { zone.style.display = 'none'; zone.innerHTML = ''; return; }
    zone.style.display = 'block';
    zone.innerHTML =
        '<b>📦 Données de l’ancienne Gestion Pro</b>' +
        '<p>' + n + ' collection(s) — clients, bons de livraison, factures, historique, TVA — dorment encore dans ce navigateur. ' +
        'Plus rien ne sait les afficher : télécharge-les pour les garder, puis efface-les.</p>' +
        '<div class="recup-actions">' +
        '<button type="button" class="recup-btn" onclick="telechargerAnciennesDonnees()">📥 Télécharger</button>' +
        '<button type="button" class="recup-btn recup-danger" onclick="effacerAnciennesDonnees()">🗑 Effacer de ce navigateur</button>' +
        '</div>';
}
renderRecuperation();

// --- ACCESSIBILITÉ ---
// Les éléments cliquables qui ne sont pas des boutons doivent l'être au
// clavier aussi. Le module régénère son HTML : on repasse après chaque rendu.
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
}
appliquerAccessibilite();

// Le module régénère tout son HTML à chaque navigation : on repasse derrière
// lui pour le clavier, la flèche retour et le titre de l'en-tête.
(function suivreLeModule() {
    const zone = $('dash-contenu');
    if (!zone) return;
    new MutationObserver(() => { majBoutonRetour(); appliquerAccessibilite(); })
        .observe(zone, { childList: true });
    majBoutonRetour();
})();
