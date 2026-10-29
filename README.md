# Sanjit Kulkarni — Portfolio

Live site: https://admiralxeon.github.io/SanjitK/

Software engineer building AI/LLM applications, with 4+ years shipping real-time 3D and games (Unity, Unreal).

## Stack

Static HTML/CSS/JS, no build step, no framework. Deployed via GitHub Pages directly from the `main` branch.

- `index.html` — the homepage, designed as a transformer reading the résumé: attention hero,
  embedding (about), forward pass (work), attention matrix (experience), next token (contact)
- `assets/css/portfolio.css` — homepage styles. Colours come from three colormaps (`viridis`,
  `cobalt`, `ember`) selected with `data-cmap` on `<html>`; editing a colormap block restyles
  the whole page, canvases included
- `assets/js/portfolio.js` — homepage scripts: Canvas 2D attention arcs, residual stream,
  forward-pass network, experience heatmap, next-token sampler, and the "Ask sanjit-1" panel
  (a local keyword router over résumé content, no API; see `ASK` / `answerFor()`). No libraries.
  A header toggle pauses all motion; the choice is stored in localStorage (`motion`)
- `projects/companionx.html` — CompanionX case study in the same design, with an interactive
  architecture diagram; its script is `assets/js/case-study.js`. The other `projects/*.html`
  pages are older and still use the previous template
- `assets/demos/` — web-compressed demo videos and poster frames (`companionx-demo.mp4`, 720p, ~5 MB).
  Full-resolution masters (`*_16x9.mp4`) stay local and are git-ignored; re-encode with
  `ffmpeg -i master.mp4 -vf scale=1280:-2 -c:v libx264 -preset slow -crf 26 -c:a aac -b:a 96k -movflags +faststart out.mp4`
- `assets/img/` — images. `og-card.png` is the 1200×630 social share image
- `Sanjit_Kulkarni_Resume.pdf` — linked from the hero, contact card and footer

`assets/css/style.css`, `assets/js/main.js`, and the rest of `assets/vendor/` belong to the older
template and are still used by the standalone case-study pages under `projects/*.html`. Don't
remove them without checking those pages first.

## Deploying

Push to `main`. GitHub Pages serves the repository root directly — no build step, nothing to
trigger manually. Changes are live within a minute or two of the push.

```
git add -A
git commit -m "Update portfolio"
git push origin main
```
