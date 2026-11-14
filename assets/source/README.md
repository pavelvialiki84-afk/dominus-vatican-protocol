# DOMINUS — source artwork release

The public website has EN/DE/FR and uses six identical filenames in `assets/illustrations/`. The current files are Canva preview thumbnails (160×200 portraits / 200×112 scenes).

## Recommended quick upgrade: upload just 1.3 MB

1. Download `DOMINUS_HD_web_optimized.zip` (prepared from the six original PNG images, not upscaled previews).
2. Open this folder on GitHub and select **Add file → Upload files**.
3. Upload the ZIP with its **exact** name to `assets/source/DOMINUS_HD_web_optimized.zip`.
4. Commit to the `main` branch.

GitHub Actions runs **Publish DOMINUS genuine HD web artwork**, verifies the six contents, installs 900-pixel-wide original portraits and 1400-pixel-wide scene images, then starts GitHub Pages deployment and visual quality checks. The site automatically switches from preview sizing to large artwork when those images load.

### Alternative original-source release

To keep the source conversion on GitHub, upload the full `DOMINUS_six_realistic_original_artworks.zip` (16.6 MB) to this same folder. The distinct workflow **Upgrade DOMINUS six illustrations to true HD** will validate and generate HD web formats automatically.

### Expected web files

- `portrait-salvatore-realistic.webp`
- `portrait-rafael-realistic.webp`
- `portrait-luiza-realistic.webp`
- `scene-corridor-realistic.webp`
- `scene-archive-realistic.webp`
- `scene-ai-realistic.webp`

**Public-art notice:** this GitHub repository is public. Uploading either ZIP makes that ZIP and its history publicly accessible. Only upload if these original fictional AI-generated visuals may be redistributed publicly. Do not confuse imagined Vatican scenes with documentary photography or institutional endorsement.
