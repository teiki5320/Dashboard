// Tests du convertisseur Markdown — la seule brique du dépôt qui transforme
// du texte en HTML affiché. Ce qu'on vérifie ici, ce sont les pièges déjà
// rencontrés : une adresse citée dans une fiche doit devenir cliquable, un
// bloc de code ne doit jamais l'être, et chaque titre doit porter une ancre
// stable — c'est elle qui relie un service à sa section.
'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { mdToHtml, slugify, stripInline, escapeHtml } = require('./markdown.js');

const html = (md) => mdToHtml(md).html;

test('les adresses deviennent cliquables', () => {
  assert.match(html('- **Console** : <https://example.test/a>'),
    /<a href="https:\/\/example\.test\/a">https:\/\/example\.test\/a<\/a>/);
  assert.match(html('voir https://example.test pour la suite'),
    /<a href="https:\/\/example\.test">/);
});

test('la ponctuation finale reste hors du lien', () => {
  const out = html('rendez-vous sur https://example.test.');
  assert.match(out, /<a href="https:\/\/example\.test">/);
  assert.ok(out.includes('</a>.'), 'le point doit rester dehors : ' + out);
});

test('un lien Markdown garde son texte', () => {
  assert.match(html('[le dépôt](https://example.test/r)'),
    /<a href="https:\/\/example\.test\/r">le dépôt<\/a>/);
});

test('une adresse entre accents graves reste du code', () => {
  const out = html('la clé `https://abc.example.test` est publique');
  assert.match(out, /<code>https:\/\/abc\.example\.test<\/code>/);
  assert.ok(!out.includes('<a href'), 'rien ne doit être cliquable : ' + out);
});

test('le HTML du texte est neutralisé', () => {
  const out = html('un <script>alert(1)</script> dans une fiche');
  assert.ok(!out.includes('<script>'), out);
  assert.match(out, /&lt;script&gt;/);
});

test('chaque titre porte une ancre, préfixe compris', () => {
  const { toc } = mdToHtml('## Vue d’ensemble\n\n### 3. Supabase\n', { anchorPrefix: 'i-kultiva' });
  assert.deepEqual(toc.map((t) => t.level), [2, 3]);
  assert.equal(toc[1].id, 'i-kultiva-3-supabase');
  assert.equal(toc[1].text, '3. Supabase');
});

test('slugify et stripInline', () => {
  assert.equal(slugify('3. Café & Thé'), '3-cafe-the');
  assert.equal(stripInline('**gras** et `code` et [lien](u)'), 'gras et code et lien');
  assert.equal(escapeHtml('<a & "b">'), '&lt;a &amp; &quot;b&quot;&gt;');
});

test('les tableaux et les listes passent', () => {
  assert.match(html('| a | b |\n|---|---|\n| 1 | 2 |'), /<table>[\s\S]*<td>1<\/td>/);
  assert.match(html('- un\n- deux'), /<ul><li>un<\/li><li>deux<\/li><\/ul>/);
});
