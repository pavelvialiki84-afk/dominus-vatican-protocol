# DOMINUS — Commercial Operating System v1.0
Date: 2026-11-19. Internal management language: Russian. Public-facing copy: EN/DE/FR/IT/ES only.
Owner: Pavel Velichii. No new paid services or advertising without approval.

## 1. Source-of-truth contract
| Stage | System | Metric | What it proves | What it does NOT prove |
|---|---|---|---|---|
| Discovery | Metricool Instagram | impressions, reach, post interactions | exposure on social platform | site visits, orders |
| Acquisition | Site analytics (when validated) | visits, landing page, source | traffic to site | Amazon visits or purchases |
| Intent | Verified event receiver (not yet configured) | dominus_amazon_click, language, marketplace, ASIN | click toward Amazon | order |
| Search | GSC official domain (not yet connected) | impressions, clicks, query, page | Google search performance | orders |
| Checkout | Amazon KDP reports | units ordered, refunds, estimated royalties | sales/royalties within KDP reporting scope | exact social attribution |

Metricool website query for 2026-11-12..19 returned zeros; site reception NOT validated.
OpenSEO sees only old github.io Search Console property. GA4 properties: none.
Existing assets/analytics.js only pushes dataLayer events if a compatible consumer already exists.
Do not infer or fabricate missing metrics. Mark missing values N/A, not zero.

## 2. Channel ownership
| Channel | Commercial job | CTA | Weekly evidence | Owner function |
|---|---|---|---|---|
| Instagram EN | acquire qualified reader attention | opening excerpt | reach, profile actions, attributed site visits if validated | Social lead |
| Instagram DE | test German-speaking demand | German excerpt | same | Social lead |
| Instagram FR/IT/ES | low-cost localized discovery | localized book page | reach, localized visits if validated | Localization |
| Google organic | evergreen demand capture | relevant language landing page | GSC clicks and landing page | SEO lead |
| dominusbooks.com | convert curiosity into Amazon intent | read sample / choose edition | sessions, verified outbound events | Web/CRO |
| Amazon product pages | convert retailer traffic to orders | Buy/Read | KDP units, royalties, refunds | Retail lead |
| Review outreach | earn independent discovery/trust | retailer/site link | pitches, replies, published reviews (no purchased ratings) | PR lead |
| Reader retention | promote next book when actually available | next-book link | repeat-book orders only if observable | Publishing lead |

## 3. Campaign taxonomy
UTM keys: utm_source, utm_medium, utm_campaign, utm_content.
Source values: instagram, facebook, bookblog, newsletter (only after consent), partner.
Medium values: organic_social, referral, email (only after consent).
Campaign: dominus_book1_2026q4_<lang>; lang: en,de,fr,it,es.
Content: archive_01, ai_01, corridor_01, etc.
Example: https://dominusbooks.com/?utm_source=instagram&utm_medium=organic_social&utm_campaign=dominus_book1_2026q4_en&utm_content=archive_01
Never place UTM values on Amazon links if they change marketplace tracking or product IDs. Campaign links must point to correct localized site pages.
Do not claim UTM attribution works until analytics ingestion is tested.

## 4. Weekly scorecard (one row per language and channel)
week_start | language | channel | posts | reach | profile_link_clicks | verified_landing_sessions | verified_amazon_outbounds | KDP_units_market | KDP_royalties_market | costs | data_quality | decision | owner
Use N/A for unavailable fields. Do not assign KDP marketplace sales to an individual post.
Ratios ONLY when numerator and denominator are measured on compatible scope:
- Site-to-Amazon intent rate = verified outbounds / verified landing sessions.
- Organic search CTR = GSC clicks / GSC impressions.
- Royalties per reported unit = KDP royalties / KDP units (same market, same period).
- Do NOT calculate site-to-sale conversion from aggregated KDP market units.
Data-quality labels: VERIFIED, PARTIAL, UNAVAILABLE, SUSPECT.

## 5. Decisions, not vanity metrics
GATE 0 — infrastructure: official site resolves, five localized pages load, Amazon destination opens, mobile CTA usable, analytics receiver test passes. If not: stop scaling; fix.
GATE 1 — initial 14-day organic pilot: publish consistent EN/DE creative, preserve post URLs and campaign labels. No inference from tiny samples.
GATE 2 — after 2 complete weeks of VERIFIED data: compare qualified site visits and Amazon-intent events by creative/market. Improve weak landing pages before increasing output.
GATE 3 — after 4 weeks: prioritize the market with the strongest verified *intent*, while checking KDP sales independently. If data remain partial, do not rank by fabricated ROI.
GATE 4 — paid tests: only with separate approval, a cost ceiling, and confirmed KDP royalty economics.
Stop conditions: broken retailer link; inaccurate price/status; tracking/privacy issue; unverified content rights; material negative reader feedback.

## 6. Publishing workflow
Monday: extract previous week's Metricool metrics, GSC (when available), site analytics (when available), KDP report (only if provided/connected).
Tuesday: editorial review of 3 content concepts and localization; confirm image rights.
Wednesday/Friday: publish according to existing Metricool queue, avoiding duplication.
Sunday: produce scorecard and a 3-item decision log: KEEP / CHANGE / STOP with evidence and owner.
Creative hypotheses: Vatican mystery, AI reconstruction, right to the last word.
Do not label fictional Vatican events as historical fact or imply Vatican endorsement.
Never publish Russian copy on the official multilingual website.

## 7. Launch blockers as of 2026-11-19
P0: Verify live DNS/HTTPS and all localized pages on actual production.
P0: Validate Metricool website measurement or install a consent-appropriate compatible receiver and test live outbound events.
P0: Add official dominusbooks.com property to GSC; OpenSEO currently cannot select it.
P1: Independently verify all Amazon ASINs/formats and availability.
P1: Obtain KDP sales export to establish baseline.
P1: Confirm media usage rights and Instagram publication statuses.
P2: Run 14-day EN/DE pilot, then allocate efforts by measured outcomes.

## 8. Evidence log format
date | channel | observed fact | source | confidence | decision | next check
No sale claims from link clicks; no conversion percentages without measured numerator and denominator.
