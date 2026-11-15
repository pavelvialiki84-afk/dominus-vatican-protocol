# DOMINUS — The Vatican Protocol
Official author website of Pavel Velichii. Static HTML, CSS and JavaScript, hosted on GitHub Pages.

## Site structure
- `index.html`: browser-language router and manual language selection (stored in localStorage; no cookies)
- `en/`, `de/`, `it/`, `fr/`, `es/`, `pt-br/`, `nl/`, `pl/`: localized home, both books, author, reading order and editions
- `data/editions.json`: central edition, format and retailer database
- `i18n/<language>.json`: catalogue and interface labels
- `assets/dominus-premium.css`: original visual identity
- `assets/dominus-premium.js`: soundtrack and trailer behavior
- `sitemap.xml`: localized canonical URL inventory

## Adding an edition
Add a record to `data/editions.json`. Use existing records as a schema reference:
```json
{
  "language": "de",
  "volume": 2,
  "title": "Das Vatikan-Protokoll. Band 2: Der letzte Tag",
  "format": "ebook",
  "store": "amazon-de",
  "url": null,
  "price": null,
  "currency": "EUR",
  "status": "soon"
}
```
Supported format identifiers: `ebook`, `paperback`, `hardcover`. Store identifiers: `amazon-com`, `amazon-de`, `amazon-fr`, `amazon-it`, `amazon-es`, `amazon-com-br`, `amazon-nl`, `amazon-pl`, `amazon-co-uk`, `kobo`, `google-play`.

The listing is only clickable if `status` is `live` **and** `url` is a confirmed valid HTTPS listing URL. Never guess a link or price. A volume with no valid store link appears as a title with a localized coming-soon label.

**Digital distribution:** confirm existing retailer exclusivity before adding an alternative storefront.

## Changing interface text
Edit the appropriate `i18n/<language>.json` file. Keep all eight languages synchronized for newly introduced fields. Some legacy long-form page text still lives in localized HTML and is scheduled for extraction in the next editorial pass.

## Updating covers and portraits
Place the author-approved language-specific artwork in `assets/` (prefer WebP) and update the matching page's references, Open Graph images and `schema.org` image URLs. Do not substitute an English cover on a different-language page. Missing artwork should be shown as an explicit TODO, never stretched from a thumbnail.

## Adding weekly Archivum packets
**TODO / Stage 4:** `data/packets.json` and the Archivum view have not been implemented. Once introduced, packets will be stored as dated log entries, most recent first, editable without HTML changes.

## Content TODO (not published as invented copy)
- Volume 2: author-approved synopsis, covers, opening excerpts and confirmed store links for eight languages
- PT-BR, NL and PL: final editorial book text, covers, and author-approved first-chapter extracts
- IT, ES: final approved local-language covers and excerpts
- Polish Amazon: confirmed print listing required
- Other retailers: confirmed store URLs only
- Stage 3 onwards: Substack confirmation flow, dossier reward, press kit, legal copy, Archivum and glossary

## Deployment and review
Never commit directly to `main` to publish work. Submit a PR with screenshots at 390px and 1366px and a test report, then obtain explicit author approval. No private publishing operations or personal contact details belong in this public repository.

## Substack sign-up and reader downloads
The newsletter banner on localized pages is inserted by `assets/dominus-reader.js`, with text from the `reader` section of `i18n/<language>.json`. It never receives or stores an email address. The user explicitly acknowledges navigation to the author's supplied Substack profile and submits their email on Substack if they choose.

**Before publishing:** confirm the Substack publication-specific subscription URL and enable/test the publisher's **Require email address confirmation** setting (Publisher Dashboard → Settings → Emails) to enforce double opt-in. Verify the legal privacy disclosure and address with qualified counsel. The current `/<language>/privacy.html` pages are transparent drafts and **not completed GDPR legal notices**.

Exclusive dossier PDF and first-chapter EPUB/PDF downloads are configured in `data/reader-downloads.json` (one record per language and kind: `dossier_pdf`, `chapter_pdf`, `chapter_epub`). Upload the author-approved asset, set `url` to a real file path or HTTPS destination and change `status` to `live`. Entries with no URL or pending status are not shown. Never advertise a nonexistent download. Do not copy texts from unapproved marketing drafts.

## Official social networks and mail (draft)
All eight localized page footers load official contacts from `data/social-contacts.json` via `assets/dominus-social.js`. Instagram `@dominus.vatican.protocol` was verified through the connected Metricool brand. **Facebook is deliberately absent until the author confirms the actual Facebook Page URL**. No speculative links or Meta/Instagram tracking scripts are inserted. The only enabled public email is `contact@dominusbooks.com`, verified against the connected Hostinger Mail account; aliases `press@`, `rights@`, `publishing@` and `readers@` remain marked `not-created` and must not be published as available until configured in Hostinger hPanel.

Create aliases under Hostinger hPanel → Emails → Mailboxes (`dominusbooks.com`) → Email Alias → Create Alias; attach each to `contact@dominusbooks.com`. Then verify delivery with one test per alias and change the corresponding JSON status to `verified`. This Hostinger Mail connector cannot directly create aliases. Mailbox ownership has been confirmed, not alias readiness. Keep MX/SPF/DKIM/DMARC intact if connecting the domain to GitHub Pages. No changes to DNS or `main` in this PR.
