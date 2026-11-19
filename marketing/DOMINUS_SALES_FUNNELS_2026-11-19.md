# DOMINUS — International Sales Funnels v1.0
Date: 2026-11-19 | Internal operating document (RU)
Owner: Pavel Velichii | Site: https://dominusbooks.com/
Constraint: zero new spend; no invented reviews, sales, endorsements, availability, or conversion data.

## Conversion architecture
Discovery → edition-specific landing page → genuine opening excerpt → format selection → Amazon product page → sale (sale only measurable in KDP reports).
Track separately: social reach, link clicks, site visits (only if verified), Amazon outbound clicks (only if analytics receiver configured), KDP orders/royalties (only from KDP exports).
A click to Amazon is NOT a sale. Do not infer purchases from rank or traffic.

## Funnel A — English (priority 1)
Audience: US/UK/other English-language readers of intelligent Vatican mysteries, AI and identity thrillers.
Acquisition: existing Instagram Reel and feed, author profile link, organic book communities where posting is permitted.
Hook: “A death inside the Vatican. A system that can reconstruct a voice. Who gets the final word about a human being?”
Destination: https://dominusbooks.com/
Page sequence: immediate premise → short authentic opening excerpt → Kindle/paperback options → Amazon.com verified ASIN destinations.
Primary CTA: “Read the opening” / secondary: “Choose your edition”.
Amazon identifiers in site source: Kindle B0HM4CLBZ2, another format B0HM42FNB3; live product format must be independently verified.
KPIs: landing visits, excerpt engagement (requires instrumentation), Amazon outbound by ASIN, KDP sales when available.

## Funnel B — German (priority 2)
Audience: Germany, Austria, Switzerland; readers of Vatikan-Thriller and KI-Thriller.
Acquisition: existing scheduled DE Instagram content; German book community posts only after editorial review.
Hook: “Ein Todesfall im Vatikan. Eine Stimme, die sich rekonstruieren lässt. Wer entscheidet, was von einem Menschen bleibt?”
Destination: https://dominusbooks.com/dominus-band1-de.html
Sequence: Schisma premise → original excerpt → format choice → Amazon.de.
Primary CTA: “Leseprobe lesen”; secondary: “Ausgabe wählen”.
Site ASINs: B0HRM5NLBY, B0HRQMHRW4, B0HRQT4453; verify format assignments.
KPIs: same as English, segmented by language and marketplace.

## Funnel C — France, Italy, Spain
Acquisition: localized organic social posts after verifying available formats and proofreading each native-language CTA.
Destinations:
FR https://dominusbooks.com/dominus-volume1-fr.html
IT https://dominusbooks.com/dominus-volume1-it.html
ES https://dominusbooks.com/dominus-volumen1-es.html
Sequence: localized hook → edition details / actual excerpt if present → Amazon marketplace.
Do not promise a sample on a page unless it contains a real sample.
Primary CTA per market: “Découvrir le livre” / “Scopri il libro” / “Descubre el libro”.
Scale only after the EN/DE funnels have functioning attribution and verified retailer destinations.

## Funnel D — Organic search
Google query → relevant language page (canonical on dominusbooks.com) → excerpt → edition selection → Amazon.
Prerequisite: verified official-domain Search Console property and sitemap submission; currently OpenSEO only sees github.io property.
Create targeted, factual on-page copy without keyword stuffing or Vatican endorsement claims.
Track GSC impressions/clicks separately from website sessions.

## Funnel E — Return visitors (privacy-first)
Do not introduce email capture, retargeting pixels, cookies or unsolicited messages without separate permission and privacy review.
Instead, offer visible “Read the opening” and “Explore the world” paths to increase engagement on the existing site.
Optional newsletter only after explicit opt-in, a working service, privacy notice and tested unsubscribe.

## Measurement contract
Event: dominus_amazon_click
Fields: book_language, amazon_marketplace, amazon_asin.
Current site code pushes to window.dataLayer only if the array exists; this is NOT a confirmed analytics event in Metricool or GA4.
Before calling it measurable: install/verify consent-appropriate receiver, test actual event in browser, verify dashboard reception.
Daily/weekly dashboard: reach; verified visits; Amazon outbound; KDP orders; KDP net royalties; channel and edition.
Do not compute purchase conversion unless both attribution and comparable denominator are established.

## Execution order
1. Verify Amazon destinations and formats for all five languages; remove inaccurate stock/price claims if found.
2. Confirm production deployment and test mobile purchase flows.
3. Confirm Metricool website-visit reception; choose a privacy-compliant click receiver and test.
4. Add/verify dominusbooks.com in Google Search Console and submit https://dominusbooks.com/sitemap.xml.
5. Review existing Instagram queue; do not duplicate already scheduled posts.
6. Run 14-day zero-spend organic pilot, EN/DE first, using only verified measurements.
7. Assess results and refine landing pages before any paid advertising.

## Decision gates
- No paid ads or credits without explicit authorization.
- No claim that Instagram posts are published when only scheduled.
- No claim of Amazon sales without KDP reporting.
- No new newsletter or tracking integrations without privacy review.
- No fabricated quotes, reviews, Vatican endorsement, or claims about supernatural facts.
