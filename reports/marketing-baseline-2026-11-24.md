# DOMINUS website & storefront baseline — 24 November 2026

## Source and interpretation
- Metricool connected brand: `dominus.vatican.protocol` / blog ID `8094045`.
- Read directly from Metricool's **website** analytics (not inferred from Facebook post reach).
- Query window: 14–24 November 2026; **returned daily rows cover only 19–22 November**. No 23–24 November row was returned; do not treat missing dates as zero.
- Reported page views: 24 (19 Nov), 23 (20 Nov), 8 (21 Nov), 8 (22 Nov) = **63**.
- Reported visits: 20, 16, 8, 7 = **51**.
- Reported daily visitors: 17, 16, 8, 7. **Do not sum them as deduplicated unique visitors across the entire four-day window.**
- Reported source rows: Direct 50, facebook.com 10, bing.com 1. Source aggregation may cover a different granularity/window.
- Page rows in the response: `/` 46; `/dominus-volume1-fr.html` 4; `/why-archives-are-not-neutral.html` 4; `/editions.html` 3; `/author.html` 2; `/dominus-band1-de.html` 2; `/read.html` 2. Total 63.
- The first interactive atlas went live *after* much of this reporting window. No conversion uplift can be inferred.

## Verified Amazon listing metadata (public storefront requests, 24 Nov)
- DE Kindle, ASIN `B0HRM5NLBY`: product title and **€3.99** appeared publicly.
- IT Kindle, ASIN `B0HRS5T51P`: product title and **€4.99** appeared publicly.
- ES Kindle, ASIN `B0HRSHCBF1`: product title and **€4.99** appeared publicly.
- EN Kindle `B0HM4CLBZ2` and FR Kindle `B0HRS1TDS6`: public checks returned Amazon intermediate/continue-shopping pages, so storefront purchase readiness **was not established** by these checks.
- For DE/IT/ES, product metadata visibility is **not** proof that checkout works, that a purchase took place, or that an order was paid.

## Measurement limitations
- `assets/analytics.js` loads Metricool website tracking and conditionally pushes an `dominus_amazon_click` event into an existing `dataLayer`. Without an event collection consumer, this is **not** a verified outbound-click metric.
- No KDP or retailer sales reports were connected to this audit; **confirmed orders and revenue remain unknown**.
- No visitor-level user tracking, ad spend, or performance claims should be inferred.

## Next commercial measurement review
1. Metricool: review daily pageviews/sessions and page path performance after public five-locale launch.
2. KDP: gather actual orders/royalties for the five ASINs from the authenticated Reports dashboard.
3. Only label an acquisition event as a sale when the storefront reports a paid order.
4. Create source-tagged campaign links to the landing pages to attribute social campaigns using Metricool page/source reports.
