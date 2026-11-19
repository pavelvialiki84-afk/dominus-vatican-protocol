# Website analytics

Installed 2026-11-19 for dominusbooks.com using the existing Metricool brand dominus.vatican.protocol (8094045).

- Loader: assets/analytics.js. Official Metricool be.js and beTracker.t API, matching the vendor's WordPress tracking-script.php template.
- Public brand tracking hash is not an API credential. Do not put authentication tokens in the website.
- Production hostnames only; localhost and previews do not send visits. Do Not Track and Global Privacy Control disable the loader. Duplicate inclusion is guarded.
- Tracks page views, visits, visitors and traffic sources. Does not track purchases or custom Amazon click events. Existing dominus:retailer-click remains a local event only.
- Coverage: five language landing pages, editions, three author pages, reading guide, English book details and analytics privacy page. Old duplicate/archive HTML files are intentionally excluded.
- Privacy information linked from each included page, in EN/DE/FR/IT/ES. Metricool's tracker transmits full URL and referrer where available; never place personal information in public campaign URLs.
- Dashboard: Metricool > DOMINUS > Web. Real-time visits may appear immediately; aggregate analytics is normally available the following day. Do not report empty/absent data as zero confirmed visitors.
- Connector fields: WTEV01 page views, WTEV02 visits, WTEV03 visitors; WTSO01/02 traffic sources; WTPA01/02 pages.
- Setup checks may contribute visits. Exclude your own IP through Metricool Real-Time > Exclude visits if desired. Daily unique-visitor counts must not be summed and labelled period-unique visitors.

References:
https://help.metricool.com/how-to-connect-your-website-or-blog-to-metricool-ejuy1
https://help.metricool.com/use-of-cookies-in-metricool-v5dg7

Rollback: remove the assets/analytics.js script tags from the included HTML files. DNS, mail and retailer links are independent of this integration.
