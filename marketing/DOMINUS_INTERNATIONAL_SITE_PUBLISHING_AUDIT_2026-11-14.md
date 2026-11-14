# DOMINUS — Editorial, Website, SEO, and Publishing Growth Audit

**Audit date:** 2026-11-14 (Europe/Berlin)  
**Prepared for:** DOMINUS — The Vatican Protocol / Pavel Velichii  
**Scope:** One official commercial fiction website; EN/DE/FR. Separate scientific relic project is out of scope.  
**Evidence:** Live connected GitHub repo; OpenSEO crawl and Search Console URL Inspection; Metricool planner; Amazon KDP documentation. Scores and statuses are date-sensitive, and book status must never be inferred from a stale KDP screen.

## Executive decision

Shift from decorative output to a testable **reader acquisition → sample → verified Amazon product page → purchase** funnel. The core differentiator is not generic Vatican mystery but the ethical dilemma: **Who is entitled to have the final word about a human life?** Preserve the novel canon: Vatican thriller, AI, memory, human agency. No Vatican endorsement, supernatural confirmation, or invented testimonials.

## Source-verified baseline (Nov 14 2026)

- Main: `https://pavelvialiki84-afk.github.io/dominus-vatican-protocol/` (HTTP 200, one H1, approximately 593 visible words, 11 images).
- DE: `dominus-band1-de.html` (HTTP 200, one H1, approximately 574 words).
- FR: `dominus-volume1-fr.html` (HTTP 200, one H1, approximately 626 words).
- Responsive Playwright QA from GitHub Actions: 18/18 pass (EN/DE/FR × six widths: 320, 375, 430, 768, 1024, 1440). This tests geometry/image loading, not the full user journey in Safari or real devices.
- OpenSEO latest simple crawl: 0 reported technical issues; this **does not mean pages are indexed or that conversion is good**.
- Search Console: homepage `Crawled – currently not indexed`, last crawl 2026-11-13; DE + FR unknown to Google. GSC Performance last 28 days: 0 rows. Sitemap present in GitHub; GSC sitemap submission NOT confirmed.
- Prior Lighthouse run before some optimizations (2026-11-14 18:49): mobile performance 75/100, mobile LCP ~22.2 sec; desktop ~79–80. Best practices 73, accessibility and SEO 100. **Retest on current build before treating as current.**
- GitHub has English buy links Kindle `B0HM4CLBZ2`, Paperback `B0HM42FNB3`; German Kindle `B0HRM5NLBY`. French CTA uses an Amazon.fr search query, not a direct verified product page.
- The FR and DE book-cover images are low-resolution previews about 125×200px / ~11kB, not production-quality cover artwork.
- Fictional character portraits and illustrations are mostly low-res imported thumbnails. Cast is shown in a preview strip and repeated as dossier cards.
- Site plays 12-second WAV soundtrack on entry **if browser allows audible autoplay**, and loops it continuously; UX review recommended.
- GA4: no GA4 properties detected in connected Google account. JS dispatches local `dominus:retailer-click` events but no server/dashboard receives them; site cannot yet report real Amazon outbound clicks or purchase conversions.
- Metricool brand 8094045 linked to Instagram `dominus.vatican.protocol`. Queued Nov 16 18:00 DE Instagram copy still says German Kindle was 'submitted'; as of last author KDP statement it is LIVE. Verify KDP status before changing post.
- Three live-ish product links and other formats in review as of prior author statements; need fresh KDP check before any new promises.

## Critical release gates — P0

1. **Catalog accuracy.** Confirm KDP ASIN and availability for each locale/format. Publish direct FR Amazon links only once actually live and verified. Remove/replace stale `in review as of Nov 14` date text when no longer true. No public sales claims without actual KDP exports.
2. **Google indexing.** Submit `sitemap.xml` in verified GSC UI and request indexing on canonical EN, DE, FR URLs. Verify search appearance and coverage weekly (indexation is not guaranteed by a submitted sitemap). Preserve bidirectional hreflang.
3. **Mobile performance.** Current-value Lighthouse run and audit requests/waterfall. Target LCP <2.5s on mobile on representative connections, CLS <0.1, INP <200ms, and ideally Lighthouse mobile >=90. Avoid unbounded image/video preload and autoplay overhead; supply optimized WEBP/AVIF plus `srcset`, poster, appropriately sized thumbnails, explicit dimensions and caching.
4. **Do not start paid acquisition without measurement.** GA4 missing. Configure consent-aware privacy model, GA4 property, outbound retailer event with marketplace/edition/language, campaign UTMs and external KDP sales reconciliation. No conversion-rate claim based on mere outbound clicks.
5. **Compliance baseline.** For a commercial site operated from Germany, review §5 DDG Impressum obligations and applicable Datenschutz/telemedia rules with qualified legal advice. No invented street address, phone, author bio, privacy policy, or organizational registration. Include links only once verified. Do not insert tracking scripts until consent/legal setup.
6. **Planner accuracy.** Review upcoming Metricool auto-published social copy and correct time-sensitive claims before scheduled publication with author's explicit approval.

## UX and creative direction — P1

- Keep the gold-on-charcoal cinematic look, but simplify above-the-fold hierarchy: **real high-resolution cover, one-line high-concept hook, Read Chapter 1 and direct Buy Kindle CTA**. Lead with the book rather than generic stock mood.
- Use localized canonical front covers, each from the actual KDP cover design. Stop scaling 125×200 previews; get 1600×2560+ source JPG/PNG, resize for ~300/600px render and `srcset`.
- Curate a **maximum 3–4 hero story images**, each distinct: Vatican / secret record / AI evidence / investigation. Avoid duplicating the same three portraits twice on the same page.
- Replace long looping soundtrack-on-entry with opt-in, persistent user choice, muted trailer by default. Test mobile Safari and screen readers.
- Use a proper trailer with music only after users activate it. Provide poster and accessible play/stop/replay. Respect data saver, reduced motion, visibility changes, web vitals and no-cookies initial paint.
- Home page flow: Hero → offer + formats → first-page sample → why this book / stakes → compact characters → verified editions + availability → author & press / newsletter. Worldbuilding/interactive dossiers belong deeper, not before buy path.
- Adapt EN, DE, FR editorial copy rather than machine translating UI labels. Remove EN-only 'Character Study' and 'DOSSIER FICTION' boilerplate from DE/FR where possible. Preserve Latin and line-by-line translation.

## Publisher and reader trust — P1

- Dedicated author profile with **verified, user-approved** bio, portrait and provenance. Do not invent biography or institutional endorsements.
- One separate Book One product profile per language; clear reading order for trilogy without fabricated Book Two/Three release dates.
- Real chapter sample in accessible typography, with chapter extraction parity check against approved EPUB and copyediting; offer link to downloadable sample only where rights/formats permit.
- Media/press kit: official blurb, hi-res covers, clean author photo, author contact, logline, rights/territories, press-ready screenshots, copyright and credits. Never claim fictitious reviews.
- Opt-in newsletter with real mailing provider, confirmation and privacy disclosures, language preferences. No fake signup form or uncontrolled PII storage in GitHub Pages.
- Trust details: high quality covers, published format statuses, ISBN/ASIN only when verified, publisher imprint if real, clear independent fiction / no Vatican association notice.

## Retail experience / Amazon — P1

- Set up and verify **Amazon Author Central** for key locales. Ensure linked titles, bios, correct cover/metadata and format linking.
- Create KDP **A+ Content** on live titles: visual motifs, evidence of genre, book/series positioning, author overview. Follow KDP guidance: no pricing or sales CTAs inside A+ blocks; no fake reviews, time-sensitive claims or watermarked/blurry graphics. Source: https://kdp.amazon.com/en_US/help/topic/GHL7P99B7AA543CN and https://kdp.amazon.com/en_US/help/topic/G4WB7VPPEAREHAAD .
- Confirm KDP AI-generated text/image/translation disclosure based on actual production chain (https://kdp.amazon.com/en_US/help/topic/G200644110).
- Do not spend on ads before a verified live ASIN, compliant detail page, and modest measurable test plan.

## Search strategy and content plan — P2

- Site structured taxonomy: `/book-one/`, `/author/`, `/the-world/`, `/press/` and `/journal/` (localized equivalents). Keep existing URLs or permanent redirects if moving to new host; avoid unnecessary refactors before Google indexing.
- Publish 1–2 **substantial original pieces per language per month**, anchored in *fictional themes* not misleading Vatican documentary claims: AI and memory, theology and human identity in science fiction, author’s worldbuilding methods, novel research without spoilers.
- Add book structured data from confirmed retail metadata; validate with Google's rich-results tooling. Schema does not guarantee a rich result.
- Implement clean canonical self-references, reciprocal hreflang and sitemap; file exists but submission to GSC remains unconfirmed.
- Consider acquiring a trustworthy author-owned custom domain only after measuring benefits and planning 301 redirects from current Pages URL; domain itself does not guarantee rankings.

## Social and publishing operation — P2

- Use the connected Metricool planner for a focused **two-week publishing calendar** on IG/FB: high-concept hook, voice of character, chapter excerpt, suspense visuals, author note, direct product CTA where supported. Social copy in EN/DE/FR to match website markets; Russian social decisions must remain separate from the instruction to remove Russian from website.
- Human-approved marketing claims. Mark AI-generated imagery transparently when platforms require it.
- Maintain a locked novel canon and translation parity sheet; editorial QA remains a prerequisite for scaling promotions. Check story arc continuity, the human-agency central theme and Latin cases, not fabricated Vatican history.
- Separate the unrelated relic academic site and its images, funding and endorsements from the commercial novel brand.
- For follow-on books, create a series landing page only with author-confirmed descriptions and publication schedules.

## 30-day priority roadmap

| Window | Work | Acceptance |
|---|---|---|
| D0–D2 | Confirm editions, replace dated review statuses, check queued DE post | All live product buttons resolve to the correct edition; no stale claims |
| D0–D3 | Submit GSC sitemap + inspect/request EN/DE/FR | Screenshots/log of actual submission; no promise of immediate index |
| D1–D5 | Build audited hi-res EN/DE/FR covers, optimize hero and images | All cover art >=600px width in source; no stretched 125px source; web vitals rechecked |
| D2–D7 | Revised above-the-fold hierarchy + mobile access | 18/18 Playwright geometry checks pass plus true CTA click-through verification |
| D3–D10 | GA4, compliant privacy and Impressum review | Observable event count by language/retailer; consent and pages reviewed |
| D5–D14 | Author Central and A+ content on published books | KDP review accepted for eligible ASINs and marketplaces |
| D7–D21 | Verified author/press assets; newsletter provider | No fabricated personal details; signup tested end-to-end |
| D14–D30 | SEO editorial plan, social cadence, two market-specific book creatives | Consistent attribution and campaign naming; weekly metrics document |
| D21–D30 | Optional Amazon Sponsored Products microtest | Paid spend requires author approval; define target CPA/royalty floor before starting |

## KPI definitions (no fabricated forecasts)

- Organic search impressions / clicks / CTR by page and language: Google Search Console.
- Site visits, engaged sessions, reader-to-sample engagement, outbound Amazon CTR: consent-aware GA4 once connected.
- Retailer clicks ≠ book sales. Sales/royalties from KDP reports only.
- Posts reach / engagement / profile visits: Metricool/connected social accounts.
- Publisher funnel efficiency: verified product clicks per 100 qualified sessions and royalties / paid spend after reconciliation.
- Time-to-first-meaningful paint: monthly mobile Lighthouse; verify on actual phones.

## Acceptance and guardrails

No new marketing spend, author impersonation, personal legal address, reader data capture, direct KDP publication or outbound mail without explicit owner approval. Keep this book website EN/DE/FR only; do not merge it with the LTL21008 academic relic site. Keep consent, copyright and accessibility in scope. GitHub Actions visual QA, OpenSEO crawl, and actual browser tests must run after every design change.
