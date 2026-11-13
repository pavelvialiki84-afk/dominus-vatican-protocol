# FR and IT initial publishing-package preflight — 2026-11-13

Private source books and manuscript files remain in user uploads; do not upload copyright material to this public repository.

| Edition | EPUB | Kindle cover 1600x2560 | Print interior and cover PDF | Reading PDF pages | ZIP/EPUB CRC |
|---|---|---|---|---|---|
| FR Vol 1: Schisme | present | yes | yes | 322 | passed |
| FR Vol 2: Le Dernier Jour | present | yes | yes | 318 | passed |
| IT Vol 1: Scisma | present | yes | yes | 316 | passed |
| IT Vol 2: L'ultimo giorno | present | yes | yes | 310 | passed |

EPUB author: Pavel Velichii. Language properties: fr-FR / it-IT. Each EPUB has distinct unique identifier, proper series grouping and volume position 1/2.
Potential issue: both volumes in French use identical generic dc:title Le Protocole du Vatican; both in Italian use Il Protocollo Vaticano. Recommend distinct volume-specific titles before KDP, once exact naming approved.

All eight files received. Packages include reader PDFs, EPUB, Kindle covers, print interiors and paperback covers, and promotional copy. ZIP and EPUB CRC integrity passed. Archive READMEs claim EPUBCheck 0 errors, but this audit did not independently run EPUBCheck or Kindle Previewer.

Pre-release gates remaining: literary/canon/chronology verification across source and translations, Latin grammar and adjacent translations, independent EPUBCheck and Kindle Previewer, print layout/cover bleed and spine calculation, metadata/KDP AI-generated translation declaration, titles and series numbering alignment, author approval.

Status: Files complete and archives readable, but publication-ready QA not yet complete. None of the four FR/IT editions has verified Amazon ASIN or Live status. Do not automatically upload books or spend money.

## Deep QA findings — 2026-11-13
- Examined all four original packages. EPUB: FR1 24 XHTML, FR2 25, IT1 24, IT2 25; CRC checks passed; zero broken local EPUB href / anchors; TOC chapter ranges FR/IT Vol 1 = 1–15, Vol 2 = 16–31.
- Print interiors: FR1 320pp, FR2 316pp, IT1 314pp, IT2 308pp, all 396 x 612pt. Separate reader PDFs each have +2 pages (322, 318, 316, 310).
- The EPUB dc:title is generic/identical for both volumes within each language; propose distinct volume titles once authorized.
- FR and IT Vol 1 both include narrative scene dated 12 June 2035, but CAPUT_XXIII file creation dated 11 November 2035. The future-created file may be deliberate plot anomaly; master-canon review required before changing.
- Extracted PDF text can merge words even where visual render is correct: 'Non sumDeus', 'Audi vocemmeam' are not demonstrated EPUB typos (EPUB has spaced Latin). Do not perform blind corrections.
- EPUBCheck and Kindle/KDP preview not independently performed. Native literary/canon comparison not completed; publication remains HOLD.
- Private detailed report created in current conversation as DOMINUS_FR_IT_углубленный_аудит_2026-11-13.md. Do not upload manuscripts to public repository.
