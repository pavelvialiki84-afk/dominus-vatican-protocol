# DOMINUS official HD art release — EN / DE / FR

## One-file publication

Download the prepared `DOMINUS_SITE_HD_RELEASE.zip` from the project conversation. Upload **that ZIP without renaming it** to this `assets/source/` folder using **Add file → Upload files → Commit changes** on `main`.

The GitHub Actions workflow `Install eight genuine HD illustrations and localized book covers` then automatically:

1. Validates **all eight original WebP files**, their dimensions and extensions.
2. Replaces the existing six 160–200px thumbnail assets with proper 900px portraits and 1400px cinematic scenes.
3. Adds official German and French **1000 × 1600px** book-cover WebP files derived from approved high-resolution cover images.
4. Switches the DE / FR book pages and author pages to their own high-resolution cover art.
5. Updates localized social preview images and republishes the website.
6. Triggers responsive and SEO tests for all language pages.

### Exact eight release files

- `portrait-salvatore-realistic.webp` — 900 × 1125
- `portrait-rafael-realistic.webp` — 900 × 1125
- `portrait-luiza-realistic.webp` — 900 × 1125
- `scene-corridor-realistic.webp` — 1400 × 788
- `scene-archive-realistic.webp` — 1400 × 788
- `scene-ai-realistic.webp` — 1400 × 788
- `dominus-cover-de-hd.webp` — 1000 × 1600
- `dominus-cover-fr-hd.webp` — 1000 × 1600

### Security and release notes

This is a public GitHub repository. The ZIP, its contents and its commit history are publicly accessible after upload. Upload only content approved for publication. This release includes **fictional AI-generated art** and **approved fictional book covers**, not a documentary claim about the Vatican.

Do not upload unreleased manuscripts, private author photos, rights contracts, KDP credentials or personal records. If the artwork ZIP should remain private, use a private repository or protected release source instead.

The workflow does **not** run the installation until the exact ZIP appears in this folder. A successful workflow run without this ZIP is a no-op, not evidence that HD images were published.
