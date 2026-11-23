#!/usr/bin/env node
/**
 * Static DOMINUS atlas QA. Zero npm dependencies.
 * Validates five locales, local asset existence, navigation, SEO metadata,
 * unique IDs, tab/panel relationships and marketplace destinations.
 */
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const locales = {
  en: { file: 'world-atlas.html', market: 'www.amazon.com' },
  de: { file: 'world-atlas-de.html', market: 'www.amazon.de' },
  fr: { file: 'world-atlas-fr.html', market: 'www.amazon.fr' },
  it: { file: 'world-atlas-it.html', market: 'www.amazon.it' },
  es: { file: 'world-atlas-es.html', market: 'www.amazon.es' },
};
const failures = [];
const expect = (ok, msg) => { if (!ok) failures.push(msg); };
const extract = (html, re) => [...html.matchAll(re)].map(m => m[1]);
for (const [locale, {file, market}] of Object.entries(locales)) {
  if (!fs.existsSync(path.join(root, file))) { failures.push('File missing: ' + file); continue; }
  const html = fs.readFileSync(path.join(root,file),'utf8');
  const test = (ok,msg) => expect(ok, file + ': ' + msg);
  test(html.includes('<html lang="' + locale + '"'), 'html language mismatch');
  test(html.includes('<title>') && html.includes('name="description"'), 'missing SEO tags');
  test(html.includes('rel="canonical" href="https://dominusbooks.com/' + file + '"'), 'wrong canonical');
  test(html.includes('assets/analytics.js'), 'analytics tag absent');
  test(html.includes('assets/hero-vatican.webp'), 'hero artwork absent');
  test(html.includes('Salvatore Ventresca'), 'character missing');
  for (const [lang, {file: sibling}] of Object.entries(locales)) {
    test(html.includes('href="' + sibling + '"'), 'missing ' + lang + ' language switch');
    test(html.includes('hreflang="' + lang + '" href="https://dominusbooks.com/' + sibling + '"'), 'missing reciprocal hreflang ' + lang);
  }
  const ids = extract(html, /\bid="([^"]+)"/g);
  const seen = new Set();
  for (const id of ids) { test(!seen.has(id), 'duplicate ID '+id); seen.add(id); }
  const tabs = extract(html, /\brole="tab"[^>]*\baria-controls="([^"]+)"/g);
  test(tabs.length === 3, 'expected 3 accessible location tabs, got ' + tabs.length);
  for (const id of tabs) test(seen.has(id), 'tab without corresponding panel '+id);
  for (const ref of extract(html, /\b(?:src|href)="([^"]+)"/g)) {
    if (!ref || ref.startsWith('#') || /^(?:https?:|mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!clean || clean==='/' || clean==='./') continue;
    test(fs.existsSync(path.join(root,clean)), 'missing internal file '+clean);
  }
  test(html.includes(market + '/dp/'), 'no correct locale marketplace Kindle link');
  const inlineScript = /<script>([\s\S]*?)<\/script>/g;
  for (const [,js] of html.matchAll(inlineScript)) {
    try { new Function(js); } catch(e) { failures.push(file + ': JS syntax ' + e.message); }
  }
  console.log('SOURCE', locale.toUpperCase(), file, 'IDs=' + ids.length, 'tabs=' + tabs.length);
}
if (failures.length) {
 console.error('\nSOURCE QA FAILURES ('+failures.length+'):\n'+failures.map(x=>' - '+x).join('\n'));
 process.exitCode = 1;
} else {
 console.log('\nSOURCE QA PASSED for 5 locales');
}
