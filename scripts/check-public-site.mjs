#!/usr/bin/env node
/**
 * DOMINUS public website smoke test.
 * Usage: node scripts/check-public-site.mjs
 * No dependencies, credentials, cookies or analytics.
 * The cache-busting query is deliberate: CDN/tool caches previously served
 * stale 404s even though GitHub Pages deployment had succeeded.
 */
const origin = process.env.DOMINUS_ORIGIN || 'https://dominusbooks.com';
const pages = [
  ['en','world-atlas.html'],
  ['de','world-atlas-de.html'],
  ['fr','world-atlas-fr.html'],
  ['it','world-atlas-it.html'],
  ['es','world-atlas-es.html'],
];
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
async function read(path, retries = 3) {
  let failure;
  for (let attempt = 1; attempt <= retries; attempt++) {
    const url = new URL(path, origin);
    url.searchParams.set('smoke', String(Date.now()) + '-' + attempt);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(18000),
        headers: { 'Accept': 'text/html,*/*' }, redirect: 'follow' });
      if (response.ok) return { response, body: await response.text() };
      failure = `${response.status} ${response.statusText}`;
    } catch (e) { failure = e.message; }
    if (attempt < retries) await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
  }
  throw new Error(failure);
}
for (const [lang, file] of pages) {
  try {
    const { response, body } = await read('/' + file);
    check(body.includes('<html lang="' + lang + '"'),
      file + ': wrong or missing lang attribute');
    check(body.includes('<title>'), file + ': missing HTML title');
    check(body.includes('rel="canonical"'), file + ': missing canonical');
    check(body.includes('assets/analytics.js'), file + ': analytics script absent');
    check(body.includes('assets/hero-vatican.webp'), file + ': hero image absent');
    check(body.includes('role="tabpanel"'), file + ': interactive locations absent');
    check(body.includes('Salvatore Ventresca'), file + ': character dossier absent');
    for (const [, sibling] of pages) {
      check(body.includes(sibling), file + ': locale link absent: ' + sibling);
    }
    check(body.includes('editions.html') || body.includes('/dp/'),
      file + ': no book conversion link');
    const expectedMarkets = { en: 'www.amazon.com', de: 'www.amazon.de',
      fr: 'www.amazon.fr', it: 'www.amazon.it', es: 'www.amazon.es' };
    check(body.includes(expectedMarkets[lang] + '/dp/'),
      file + ': wrong or absent localized Kindle marketplace');
    console.log('PASS',lang,response.status,file,'chars='+body.length);
  } catch (e) { errors.push(file + ': request failed: ' + e.message); console.error('FAIL',file,e.message); }
}
for (const asset of ['/assets/hero-vatican.webp', '/assets/illustrations/scene-archive-noir.webp',
                    '/assets/illustrations/scene-corridor-noir.webp', '/assets/illustrations/scene-ai-noir.webp',
                    '/assets/illustrations/portrait-salvatore-realistic.webp',
                    '/assets/illustrations/portrait-rafael-realistic.webp',
                    '/assets/illustrations/portrait-luiza-realistic.webp']) {
  try {
    const url = new URL(asset, origin);
    url.searchParams.set('smoke', Date.now().toString());
    const response = await fetch(url, { signal: AbortSignal.timeout(18000) });
    check(response.ok, asset + ': HTTP ' + response.status);
    check((response.headers.get('content-type') || '').startsWith('image/'),
      asset + ': response not an image');
    console.log(response.ok ? 'PASS' : 'FAIL','asset',asset,response.status);
  } catch (e) { errors.push(asset + ': ' + e.message); }
}
if (errors.length) {
  console.error('\n' + errors.length + ' issue(s):\n' + errors.map(x => '- ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('\nDOMINUS public site smoke test passed: five locales and critical images.');
}
