# DOMINUS Publishing Automation — live implementation

**Last updated:** 2026-11-15.  
**Status:** GitHub-driven publishing metadata validation is operational; manuscript file QA is a private/offline opt-in. Amazon KDP uploads and Ads spending are **not automated**, because this repository has no authenticated KDP/Ads publishing connector.

## Architecture

```
Author-approved private ebook / print bundles
     |
     +--> local script: scripts/book_bundle_preflight.py
     |    verifies EPUB ZIP structure, OPF title/language, XML, file hashes,
     |    PDF headers/page sizes (with optional PyMuPDF), publisher copy
     |    => local private JSON QA report (not copied into public GitHub)
     |
     +--> Literary team / native language QA / canonical chronology approval
              |
              v
Public metadata-only catalogue publishing-engine/catalogue.json
              |
              v
GitHub Actions .github/workflows/dominus-publishing-engine.yml
              |  on change, manual dispatch, every Monday 07:25 UTC
              +--> validates 16 edition records (8 languages x 2 books)
              +--> enforces approval gates, ASIN and KDP state consistency
              +--> publishes artifact: generated-publishing/release-board.md
              +--> publishes artifact: generated-publishing/editions.csv
              |
              v
Human-approved KDP Bookshelf manuscript upload + final Publish
              |
              v
Verified KDP statuses manually entered into catalogue.json
              |
              v
Report and public site links updated only for grounded LIVE ASINs
```

## Starting / viewing a run

Visit [GitHub Actions — DOMINUS Publishing Engine](https://github.com/pavelvialiki84-afk/dominus-vatican-protocol/actions/workflows/dominus-publishing-engine.yml).

1. Choose **Run workflow** to regenerate an immediate report (or allow Monday schedule).
2. Open the completed run's **Artifacts** and download `dominus-publishing-readiness`.
3. Review `release-board.md` for holds and `editions.csv` for machine-readable KDP states. Each result is a **snapshot of manually verified metadata**; no live Amazon account API is called.
4. When a KDP book changes to LIVE, add the exact ASIN and evidence date after verifying the Bookshelf. This causes the public metadata validator to rerun.

## Private 14-bundle technical check

To inspect a bundle without transmitting the manuscript to public GitHub, run locally in a machine with the actual files:

```bash
python3 -m pip install pymupdf
python3 scripts/book_bundle_preflight.py --locale it --volume 1 \
  --epub "/private/italian-book1.epub" \
  --reading-pdf "/private/italian-book1-read.pdf" \
  --interior-pdf "/private/italian-book1-print-interior.pdf" \
  --cover-pdf "/private/italian-book1-full-cover.pdf" \
  --publisher-copy "/private/italian-book1-publisher-copy.txt" \
  --output "/private/audits/it-book1.json"
```

The PDF inputs are the **print interior** and **full wrap cover**, not the small promotional front-cover JPEG. If publisher copy is in Word or PDF, extract an approved plain-text copy for this preflight; keep the original. Files and output paths are illustrative and not known to exist. For all 14 editions, change language/volume and private paths.

**IMPORTANT:** a structural pass is **not** EPUBCheck certification, Kindle Previewer visual proof, source-to-translation equivalence, Latin philological verification, print trim/spine correctness or KDP release permission. Those stages remain separate.

## Critical release HOLD

Prior internal FR/IT quality audit located conflicting chapter 14–15 dates with published English Book I. Do **not** deploy IT/FR translation packages before the author approves the canonical chronology and updates any affected versions. The automated release-control registry applies `HOLD_CHRONOLOGY_RECONCILIATION` to FR/IT in both volumes. This gate must not be removed solely because metadata/ZIP/XML tests pass.

## Security and cost policy

- The GitHub repository is **public**. Do not commit manuscripts, EPUBs, PDFs, author contracts, sales data, access tokens, private contacts, or KDP report exports.
- The registry contains publication metadata only: titles, languages, status, ASINs, and approval flags. Public status not equal to verified current KDP status.
- No publishing, pricing, Amazon Ads or funds operation is triggered by either script. The author makes explicit decisions for releases and advertising.
- No claims of independent marketing team members, actual KDP sync, social media posting or recurring assistant work unless those integrations have independently confirmed execution.

## Next automation increments (dependent on access)

- Read-only royalty CSV import from a **private** KDP Reports export, aggregate locally and show per-market profitability without public storage.
- Book II funnel conversion and Amazon Author Central editorial plan once Book I/II metadata and actual ASINs exist.
- Social content drafting/scheduling through connected Metricool only with verified DOMINUS profile, approved creative, consent and permitted account actions.
- Czech/Swedish expansion treated as a separately budgeted translation undertaking.

Related documents: [expert board](../marketing/DOMINUS_EXPERT_PUBLISHING_BOARD.md), [language inventory](../marketing/DOMINUS_INTERNATIONAL_LANGUAGE_CATALOGUE.md), [KDP snapshot](../marketing/DOMINUS_KDP_PUBLISHING_REGISTER_2026-11-15.md).
