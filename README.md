# Sanjit Kulkarni — Portfolio

Live site: https://admiralxeon.github.io/SanjitK/

Software engineer building AI/LLM applications, with 4+ years shipping real-time 3D and games (Unity, Unreal).

## Stack

Static HTML/CSS/JS, no build step, no framework. Deployed via GitHub Pages directly from the `main` branch.

- `index.html` — the homepage (hero, about, skills, work, experience, contact)
- `assets/css/portfolio.css` — homepage styles
- `assets/js/portfolio.js` — homepage scripts (mobile nav, scroll-reveal, scrollspy)
- `assets/img/` — images
- `Sanjit Kulkarni Resume.pdf` — linked from the hero and footer

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
