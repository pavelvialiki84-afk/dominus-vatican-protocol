/* Cookie-free page analytics for the DOMINUS Metricool brand.
   The brand hash is a public tracker identifier, not an API credential. */
(() => {
  'use strict';
  if (!['dominusbooks.com', 'www.dominusbooks.com'].includes(location.hostname)) return;
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
})();
