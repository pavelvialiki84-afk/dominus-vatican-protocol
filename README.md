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
