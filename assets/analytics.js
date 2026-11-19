/* DOMINUS analytics: Metricool page tracking and privacy-conscious outbound intent events.
   Outbound events are emitted to dataLayer only when an analytics consumer exists.
   No personal data, cookies or extra network requests are created here. */
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

  // The dataLayer event becomes measurable only after a compatible analytics
  // integration is configured. This does not claim an Amazon purchase occurred.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    let destination;
    try { destination = new URL(link.href); } catch { return; }
    if (!/^www\\.amazon\\.(com|de|fr|it|es)$/.test(destination.hostname)) return;
    if (!/^\\/dp\\/[A-Z0-9]{10}(?:[/?#]|$)/.test(destination.pathname)) return;
    if (!Array.isArray(window.dataLayer)) return;
    const pageLanguage = document.documentElement.lang || 'en';
    const asin = destination.pathname.split('/')[2];
    window.dataLayer.push({
      event: 'dominus_amazon_click',
      book_language: pageLanguage,
      amazon_marketplace: destination.hostname,
      amazon_asin: asin
    });
  });
})();
