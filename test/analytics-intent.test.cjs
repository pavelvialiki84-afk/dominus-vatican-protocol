// DOMINUS retail-intent contract tests. No external dependencies or network.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require('node:path').join(__dirname, '../assets/analytics.js'), 'utf8');

function run(urls, { dnt = '0', withLayer = true } = {}) {
  const events = [];
  let clickHandler;
  const context = {
    location: { hostname: 'dominusbooks.com' },
    navigator: { doNotTrack: dnt, globalPrivacyControl: false },
    window: { ...(withLayer ? { dataLayer: events } : {}) },
    document: {
      documentElement: { lang: 'en' },
      head: { appendChild() {} },
      createElement() { return {}; },
      addEventListener(name, cb) { if (name === 'click') clickHandler = cb; }
    },
    URL
  };
  vm.runInNewContext(code, context);
  for (const url of urls) {
    if (clickHandler) clickHandler({
      target: { closest: () => ({ href: url }) }
    });
  }
  return events.map(e => JSON.parse(JSON.stringify(e)));
}

const amazon = run(['https://www.amazon.com/dp/B0HM4CLBZ2']);
assert.equal(amazon[0].event, 'dominus_store_redirect_intent');
assert.equal(amazon[0].retailer, 'amazon');
assert.equal(amazon[0].amazon_asin, 'B0HM4CLBZ2');
assert.equal(amazon[1].event, 'dominus_amazon_click');

for (const [host, name] of [
  ['www.kobo.com', 'kobo'],
  ['play.google.com', 'google_play'],
  ['www.bol.com', 'bol']
]) {
  const events = run(['https://' + host + '/some-book']);
  assert.equal(events.length, 1);
  assert.equal(events[0].retailer, name);
}
assert.equal(run(['https://example.org/not-a-store']).length, 0);
assert.equal(run(['https://www.amazon.com/dp/INVALID']).length, 0);
assert.equal(run(['https://www.kobo.com/book'], {dnt: '1'}).length, 0);
assert.equal(run(['https://www.kobo.com/book'], {withLayer: false}).length, 0);
console.log('PASS: DOMINUS intent event classification (not sales attribution)');
