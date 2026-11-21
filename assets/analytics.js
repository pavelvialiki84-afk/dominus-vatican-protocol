/* DOMINUS website intent instrumentation.
   Emits only non-PII interaction events to an ALREADY configured dataLayer.
   Does not create cookies, load a measurement consumer or report purchases.
   Sending/storing events requires a separately reviewed, consent-compliant tag configuration. */
(() => {
  'use strict';
  const productionHosts = ['dominusbooks.com', 'www.dominusbooks.com'];
  if (!productionHosts.includes(location.hostname)) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  if (window.dominusAnalyticsLoaded) return;
  window.dominusAnalyticsLoaded = true;

  const script = document.createElement('script');
  script.src = 'https://tracker.metricool.com/resources/be.js';
  script.async = true;
  script.onload = () => {
    if (window.beTracker && typeof window.beTracker.t === 'function') {
      window.beTracker.t({ hash: '34e85461985ca391b5fa72323e5fc30b' });
    }
  };
  document.head.appendChild(script);

  const amazonHosts = new Set([
    'www.amazon.com', 'www.amazon.de', 'www.amazon.fr',
    'www.amazon.it', 'www.amazon.es'
  ]);
  const storeHosts = new Map([
    ['play.google.com', 'google_play'],
    ['books.google.com', 'google_play'],
    ['www.kobo.com', 'kobo'],
    ['kobo.com', 'kobo'],
    ['www.bol.com', 'bol'],
    ['bol.com', 'bol']
  ]);

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link || !Array.isArray(window.dataLayer)) return;
    let destination;
    try { destination = new URL(link.href); } catch { return; }
    if (!['https:', 'http:'].includes(destination.protocol)) return;

    const language = document.documentElement.lang || 'en';
    let retailer = storeHosts.get(destination.hostname);
    let asin;

    if (amazonHosts.has(destination.hostname)) {
      const match = destination.pathname.match(/^\/dp\/([A-Z0-9]{10})(?:\/|$)/);
      if (!match) return;
      retailer = 'amazon';
      asin = match[1];
    }
    if (!retailer) return;

    const payload = {
      event: 'dominus_store_redirect_intent',
      book_language: language,
      retailer: retailer
    };
    if (asin) payload.amazon_asin = asin;
    window.dataLayer.push(payload);

    // Preserve the pre-existing Amazon click event for existing tag consumers.
    if (retailer === 'amazon') {
      window.dataLayer.push({
        event: 'dominus_amazon_click',
        book_language: language,
        amazon_marketplace: destination.hostname,
        amazon_asin: asin
      });
    }
  });
})();
