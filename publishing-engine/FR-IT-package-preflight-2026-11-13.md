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

## Follow-up deep audit results, 13 November 2026 — current release gate
- FR and IT align at Volume 1 chapter 14.1 (25 August) and chapter 15.1 (14 September), and Volume 2 chapter 16.1 (20 September). The currently supplied/published EN_KDP EPUB starts chapter 14.1 on 3 September and 15.1 on 24 October 2035: confirmed incompatible chronological branches. German chronology memo already notes same difference. No timeline automatically changed.
- Complete programmatic EPUB text-level chapter inventory found all story chapters FR/IT (Vol 1: 1-15, Vol 2: 16-31) and consistent FR-to-IT chapter-length ratios; these do not establish semantic translation fidelity.
- Latin centered/italic styling in XHTML/CSS is confirmed for standard div.latin blocks; do not incorrectly report missing centering. Selected Latin passages in Volume 1 chapter 3 and 5 put translated meaning in a subsequent dialogue rather than immediately next styled paragraph; assess editorial conventions and drama before intervention.
- EPUB title needs per-volume specificity. EPUBCheck and Kindle Previewer NOT independently run; spot-check print page text geometry only, not full print proof.
- Separate full private report was generated in author conversation: DOMINUS_FR_IT_FULL_QA_2026-11-13.md. No copyrighted books or manuscripts uploaded here.
- REMAINS HOLD until author approves the master chronology, source/translation sentence-level audit, independent EPUB and print preflight.

## Four ebook metadata release candidates prepared — 2026-11-13
- Four new private candidate EPUBs generated from user-supplied FR/IT Vol1/Vol2 EPUB. Only EPUB/content.opf dc:title field changed to distinct title per volume; entire story text, chronology, cover and other files are byte-for-byte unchanged within repacked archive. Original source ZIPs untouched.
- Entire print-interior page geometry scanned programmatically, no text spans beyond MediaBox; intentionally blank pages exist and need Print Previewer visual inspection.
- Print full-cover widths exactly match KDP 5.5x8.5, B&W WHITE-paper spine formulas: FR1 11.9706 in (320p), FR2 11.9616 (316p), IT1 11.9571 (314p), IT2 11.9436 (308p). Cream paper would mismatch. Height 8.75 in with bleed.
- Parsed all EPUB XML/XHTML without syntax errors, ZIP CRC passed, mimetype stored/uncompressed and first. Not a substitute for epubcheck.
- Private conversation deliverable is DOMINUS_FR_IT_4BOOKS_RELEASE_CANDIDATES_2026-11-13.zip containing 4 candidate EPUBs and RELEASE_AUDIT.md / JSON manifests, NOT full copyrighted print assets. Status remains EDITORIAL HOLD (canon dates EN vs FR/IT divergence, native line edit, EPUBCheck, Kindle/Print Previewer, AI disclosure, rights and author final signoff).

## Editorial parallel-alignment deliverable — 2026-11-13
- A new private release-candidate ZIP `DOMINUS_FR_IT_EDITED_ALIGNMENT_PACKAGE_2026-11-13.zip` is available as a conversation attachment only. DO NOT push it or copyrighted text to public GitHub.
- Machine-parsed all 31 chapters in FR and IT; exactly 10,823 corresponding non-empty text paragraphs; every paired chapter has equal paragraph count. This is structural alignment, NOT verified semantic equivalence or a substitute for native-editor proofreading.
- Registered 224 Latin-styled blocks in four editions; FR and IT counts per chapter identical; 8 instances of Cyrillic text use class `latin`; need editorial formatting review.
- 127 literal numeric formatting flags reduced to 13 after normalizing French/Italian time formats. Corrected confirmed IT discrepancy in Chapter 23: Montserrat night spans October 11–12, not only October 12.
- Additional IT Chapter 3 year clarity fixes: '29 -> 2029 and '31 -> 2031, matching exact corresponding French years.
- 62 XHTML head <title> entries revised from generic chNNN.xhtml to actual chapter heading (FR1 15; FR2 16; IT1 15; IT2 16). Every modified EPUB passes CRC and XML parse tests; fictional plot chronology intentionally unchanged.
- Status: WORKING EDITORIAL CANDIDATE, RELEASE HOLD. EN published Book One remains on a conflicting timeline in ch14–15; master chronology not author-approved and EN Book Two not available for comparison. Full human literary line edit, philological verification, independent EPUBCheck/Kindle Previewer and print QA remain mandatory.

## Editorial packaging update — Nov 13 2026, 22:xx CET
- Four private EPUB candidates generated in current conversation package `DOMINUS_FR_IT_PREPUBLICATION_EDITED_2026-11-13.zip`. Originals remain unchanged. 12 files in package, including 4 EPUBs, release report, manifest, change journal and consistency registries.
- Safe semantic EPUB fixes only: eight Russian-language original-quote blocks (FR1/IT1) reclassified from `latin` to `foreign-quote` with lang=ru; four vernacular-language blocks previously mislabeled Latin (one per volume) reclassified to `foreign-quote`. Visual alignment and italics retained, prose unchanged.
- All four new EPUBs: ZIP CRC pass; XML/XHTML parse pass; zero missing local linked resources; first `mimetype` stored/uncompressed; full visible reading text identical to previous editorial candidates.
- Editorial chronology decision: FR/IT coherent working timeline 25 Aug -> 14 Sep -> 20 Sep 2035 across chapters 14–16. This is NOT verified against authoritative RU master or published EN Book One (3 Sep -> 24 Oct branch). No narrative dates silently rewritten.
- Not a final human copyedit of all sentences; no verified EPUBCheck, Kindle Previewer or Print Previewer. Printed PDFs not rebuilt. KDP release HOLD remains mandatory until source/canon author approval and editorial/technical QA.

## Final tool-available technical gate 2026-11-13
- Reexamined last author candidate archive; discovered and corrected 24 additional non-chapter HTML `<title>` placeholders (6 per EPUB), contrary to prior assumption that all title metadata had been corrected. Corrected files repackaged privately as `DOMINUS_FR_IT_TECHNICALLY_REFINED_2026-11-13.zip` (user attachment); NO literary narrative change.
- Full EPUB hyperlink + anchor audit: FR1 70 references, FR2 73, IT1 70, IT2 73. Zero dangling links/fragments, duplicate IDs or XML parse errors; ZIP tests pass.
- Programmatic original PDF page-by-page physical page-boundary text scan: FR1 320, FR2 316, IT1 314, IT2 308 pages (396x612 pt), no text bounding-box beyond MediaBox. This is NOT a visual print proof.
- Explicit HOLD: No source-authoritative RU manuscript available to resolve differing EN versus FR/IT ch14–15 timelines, no independently installed EPUBCheck, no Kindle/Print Previewer, and full native-language human literary correction not completed. Avoid calling these release-certified.
