---
name: Sanjit Kulkarni Portfolio
description: A portfolio built as a transformer you can read, where every section is a layer and every color is a weight.
colors:
  # viridis: dark default for visitors in dark mode
  viridis-night-ink: "#0a0f1a"
  viridis-slate-panel: "#111827"
  viridis-raised-slate: "#172034"
  viridis-hairline: "#233049"
  viridis-moon-white: "#eef2f8"
  viridis-fog: "#94a3b8"
  viridis-dusk: "#8494ac"
  viridis-deep-harbor-blue: "#31688e"
  viridis-lagoon-teal: "#21918c"
  viridis-chlorophyll-green: "#5ec962"
  viridis-pollen-yellow: "#fde725"
  viridis-on-hot: "#08131a"
  # cobalt: light default for visitors in light mode
  cobalt-cool-paper: "#f3f4f7"
  cobalt-sheet-white: "#ffffff"
  cobalt-mist: "#eaecf2"
  cobalt-hairline: "#d6dae3"
  cobalt-ink: "#10131b"
  cobalt-graphite: "#525a6b"
  cobalt-pencil: "#646b7d"
  cobalt-paper-lavender: "#b4bffc"
  cobalt-periwinkle: "#6577ff"
  cobalt-cobalt-ink: "#2340ff"
  cobalt-signal-vermilion: "#ff4d2e"
  cobalt-on-hot: "#ffffff"
  # ember: alternate dark, diverging cold-to-hot
  ember-coal: "#0c0e12"
  ember-forge-panel: "#14171d"
  ember-raised-forge: "#1b1f27"
  ember-hairline: "#272c36"
  ember-bone: "#f2efe8"
  ember-ash: "#9ea3ad"
  ember-smoke: "#8b909d"
  ember-night-steel: "#1f4e79"
  ember-glacier-blue: "#3a8fc7"
  ember-ember-orange: "#f08a3c"
  ember-lamp-gold: "#ffd27a"
  ember-on-hot: "#170d04"
  # fixed frame: behind video and posters, in every colormap (see The Fixed Frame Rule)
  frame-black: "#000000"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(38px, min(6.2vw, 9.5vh), 92px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(32px, 4.8vw, 58px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
  lede:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.8vw, 21px)"
    fontWeight: 400
    lineHeight: 1.65
  body-lg:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.06em"
rounded:
  token: "0.12em"
  mark: "4px"
  inset: "6px"
  chip: "7px"
  media: "10px"
  field: "12px"
  card: "14px"
  panel: "18px"
  panel-lg: "20px"
  pill: "999px"
spacing:
  hair: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "40px"
  gutter: "20px"
  rail: "72px"
  rail-narrow: "28px"
  section: "clamp(72px, 10vw, 130px)"
  container: "1240px"
components:
  button:
    backgroundColor: "{colors.viridis-slate-panel}"
    textColor: "{colors.viridis-moon-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 16px"
  button-primary:
    backgroundColor: "{colors.viridis-chlorophyll-green}"
    textColor: "{colors.viridis-on-hot}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 16px"
  head-toggle:
    backgroundColor: "{colors.viridis-slate-panel}"
    textColor: "{colors.viridis-fog}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 13px"
  head-toggle-pressed:
    backgroundColor: "{colors.viridis-chlorophyll-green}"
    textColor: "{colors.viridis-on-hot}"
  tag:
    backgroundColor: "{colors.viridis-raised-slate}"
    textColor: "{colors.viridis-moon-white}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "3px 8px"
  card:
    backgroundColor: "{colors.viridis-slate-panel}"
    textColor: "{colors.viridis-moon-white}"
    rounded: "{rounded.card}"
    padding: "18px"
  panel:
    backgroundColor: "{colors.viridis-slate-panel}"
    rounded: "{rounded.panel}"
    padding: "22px"
  input:
    backgroundColor: "{colors.viridis-night-ink}"
    textColor: "{colors.viridis-moon-white}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  nav-link:
    textColor: "{colors.viridis-fog}"
    typography: "{typography.label}"
---

# Design System: Sanjit Kulkarni Portfolio

## Overview

**Creative North Star: "The Readable Model"**

The site is a transformer whose internals you are allowed to read. Every section is a layer hung off a glowing residual stream running down the left edge, labelled the way a model labels its layers (`L00 · attention`, `L01 · embedding`, `L04 – L08 · forward pass`, `L10 · attention matrix`, `L12 · unembed`). Every color is a weight drawn from a scientific colormap. Every interaction exposes how something thinks: hover a word and it becomes the query, hover a project and pulses fire through the skills it used. Nothing is decoration for its own sake; the metaphor *is* the information architecture.

The mood is **precise, playful, humane**. Precision comes from instrument-grade details: tabular weights, mono labels that read like logits, one easing curve, one hairline weight. Playfulness comes from letting visitors poke the machine (temperature sliders, attention heads, a next-token roulette) without ever hiding the plain information behind the toy. Humanity comes from legibility first: Atkinson Hyperlegible for every running word, AA contrast in every colormap, motion that pauses on request.

Density is moderate: large Bricolage headings and generous section rhythm, with compact mono annotations clustered around the data they describe. The world is dark by default and light when the visitor's system asks for it, never by fashion.

**Key Characteristics:**
- A layered, left-rail architecture: content hangs off a residual stream; each section opens with a layer tag sitting on that stream.
- Color as data: three swappable scientific colormaps, every hue sourced from a four-stop ramp.
- Flat, tonal depth: panels and hairlines, no drop shadows.
- Two voices of type: an expressive grotesque for headings, a hyperlegible humanist for everything you read.
- Interactive internals with a plain fallback: every playful piece has a static, keyboard-reachable equivalent.

## Colors

Color is a colormap, not a brand palette. Each theme is a four-stop ramp from low to high weight plus a tonal neutral set, and the visitor can switch ramps live from the header.

### Primary
The ramp. Low weights take the first stop, peak weights the last. Only these four stops ever carry emphasis.
- **viridis:** **Deep Harbor Blue** → **Lagoon Teal** → **Chlorophyll Green** → **Pollen Yellow**. The dark default: the classic perceptually uniform scientific colormap, readable by colorblind visitors.
- **cobalt:** **Paper Lavender** → **Periwinkle** → **Cobalt Ink** → **Signal Vermilion**. The light default: ink on paper, with a single hot signal color for the peak.
- **ember:** **Night Steel** → **Glacier Blue** → **Ember Orange** → **Lamp Gold**. The alternate dark: a diverging cold-to-hot ramp.

The two upper stops do most of the work: the second-highest stop for links, active states and layer tags; the peak stop for the attention query, the current focus and the gradient ends of primary buttons.

### Neutral
Each colormap pairs its ramp with a matched neutral set of the same temperature:
- **Ground** (Night Ink / Cool Paper / Coal): the page background.
- **Panel** (Slate Panel / Sheet White / Forge Panel): cards, panels, header controls.
- **Raised** (Raised Slate / Mist / Raised Forge): tags, chat bubbles, nested surfaces.
- **Hairline**: every 1px border and divider.
- **Primary text** (Moon White / Ink / Bone), **secondary text** (Fog / Graphite / Ash) and **faint text** (Dusk / Pencil / Smoke). Faint text is tuned to stay at or above 4.5:1 on every surface in its theme.
- **On-hot**: text that sits on the ramp's upper stops (dark on viridis and ember, white on cobalt).

### Named Rules
**The Colormap Rule.** Every color on the page, canvas drawings included, comes from the active colormap's tokens. A hard-coded hex in a component is a bug; swapping the colormap must restyle everything.

**The Weight Means Something Rule.** Brighter means more weight. Use the high end of the ramp only for what genuinely carries the most attention right now: the query word, the active head, the primary action.

**The Fixed Frame Rule.** Media and its overlays are the one exception to the Colormap Rule: video and poster frames sit on Frame Black, and play buttons and duration badges use fixed white on translucent black, because they belong to the media, not the theme.

## Typography

**Display Font:** Bricolage Grotesque (with Helvetica Neue, Arial)
**Body Font:** Atkinson Hyperlegible Next (with system-ui)
**Label/Mono Font:** Atkinson Hyperlegible Mono (with ui-monospace, Menlo)

**Character:** A quirky, optically-sized grotesque that carries the voice in every heading, paired with a humanist family designed for low-vision readers. The serifed capital I means "AI" can never be misread as "Al", which matters on a page about AI.

### Hierarchy
- **Display** (700, fluid up to 92px, 1.08, −0.035em): the attention headline only. Split into word tokens that the attention arcs connect.
- **Headline** (700, fluid 32–58px, 1.02, −0.03em): one per layer section, balanced wrap, max 18ch.
- **Title** (700, 20px, 1.2): card and project names.
- **Lede** (400, fluid 18–21px, 1.65): the About paragraph and case-study intros, in secondary text.
- **Body large** (17px) for the hero's supporting line; **Body** (16px, 1.6) as the default and the floor for form inputs; **Body small** (15px) for card text, chat bubbles and role bullets; **Meta** (14px) for dates, row names and footnotes.
- **Label** (500, 12px, mono, 0.06em, uppercase for layer tags and eyebrow-style meta): layer tags, attention weights, tool calls, chips, nav, buttons. The mono face reads as model output: weights, logits, code.

### Named Rules
**The Two Voices Rule.** Bricolage speaks, Atkinson explains. Never set running text in Bricolage, and never set a headline in Atkinson.

**The Mono Is Data Rule.** The mono label face is for things a model or a system would emit: weights, layer names, tool calls, durations, tags, and short control labels. Never set a sentence of prose in mono.

**The 12px Floor Rule.** No text renders below 12px. Labels sit at exactly 12px; anything smaller is a defect.

## Layout

The page is a single column of layers, left-aligned against a vertical residual stream: a fixed 72px rail (28px under 760px) carrying an animated gradient line. Each section's layer tag places a ringed node exactly on that line, so the eye reads the page top to bottom like a forward pass.

Content sits in a 1240px container with a 20px gutter that respects safe-area insets. Sections breathe on a fluid rhythm (72–130px). Inside sections, related items cluster on a tight 6–16px gap scale and separate groups at 40px.

The project grid is a six-track grid: the featured project spans the full width with media and text side by side, the remaining AI projects take two per row, and earlier work takes three per row. Everything collapses to one column at 900px.

The header is a fixed 60px bar with a blurred translucent ground. Below 980px the navigation drops to its own scrollable row (100px total), so navigation never disappears. Below 600px, dense visualisations that cannot stay legible (the forward-pass network) step aside, and the text and cards beneath carry the same facts.

### Named Rules
**The Stream Rule.** Every top-level section starts with a layer tag whose node sits on the residual stream. A section without a tag is not part of the model.

## Elevation & Depth

This system is flat. There are no drop shadows. Depth comes from tonal layering (ground → panel → raised) and 1px hairline borders. The only glow is the soft ring around a layer node on the stream, a halo of the second-highest ramp stop at 18% opacity.

Translucency is used in exactly two places, both functional: the blurred header ground (so content scrolling beneath stays legible) and the dimmed, blurred backdrop behind the demo-video dialog.

### Named Rules
**The No-Shadow Rule.** Nothing casts a shadow. If an element needs to stand forward, give it a raised tone or a ramp-colored border, never a shadow.

## Shapes

Soft, consistent geometry that scales with the size of the object:
- **Mark** (4px): data marks and slivers such as heatmap cells, swatch bars, timeline tracks and the tightened bubble corner.
- **Inset** (6px): media and tracks nested inside a larger container, such as compact demo thumbnails, memory-bar tracks and highlighted logit rows.
- **Pill** (999px): every button, toggle, chip, the skip link and the colormap switcher.
- **Chip** (7px): tags and tech pills.
- **Media** (10px): video thumbnails and compact demo buttons.
- **Field** (12px): text inputs.
- **Card** (14px): project cards and role rows.
- **Panel** (18–20px): large containers like the network, the heatmap, the vector card, the logits, the video dialog, the Ask panel and the contact card.
- **Token** (0.12em): the highlight behind an attention-weighted word, scaling with the type.
- **Circle**: layer nodes, the Ask orb and status dots.

Chat bubbles keep one tightened corner (4px) on the speaker's side. Borders are always 1px hairlines; a 1.5–2.5px stroke appears only on diagram edges and the layer-node ring.

## Components

### Buttons
Calm, pill-shaped, mono-labelled controls that lift slightly when touched.
- **Shape:** fully rounded pill.
- **Default:** panel ground, hairline border, primary text, label typography, 11px × 16px padding.
- **Primary ("hot"):** a left-to-right gradient from the second-highest ramp stop to the peak, with on-hot text and no border. Used once per region for the main action ("Watch 3 demos", "Sample next token", "Ask").
- **Hover:** border shifts to the second-highest ramp stop and the button rises 2px. **Focus:** a 2px peak-stop outline at 3px offset.

### Head toggles and the colormap switcher
- **Style:** pill toggles in label type on a panel ground, set as a group with `aria-pressed`.
- **Pressed:** the hot gradient with on-hot text.
- **Colormap switcher:** one pill group holding three swatch pills, each showing its own ramp as a tiny gradient bar; the active one is raised.

### Tags
- **Style:** raised ground, hairline border, chip radius, 12px label type. Static: they describe, never act.

### Cards / Containers
- **Corner Style:** card radius (14px); large panels 18–20px.
- **Background:** panel tone; the featured card adds a faint wash of the low ramp stop.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline; hover or focus turns it to the second-highest ramp stop.
- **Internal Padding:** 18px for cards, 20–26px for panels.

### Inputs / Fields
- **Style:** ground-colored fill inside a panel, hairline border, field radius, 16px body type (16px prevents mobile zoom on focus).
- **Focus:** the border shifts to the second-highest ramp stop; no glow.

### Navigation
- **Style:** label-type links in secondary text; the active section's link turns primary text as you scroll.
- **Mobile:** below 980px it becomes a horizontally scrollable second header row.
- The header also carries the colormap switcher and a "pause motion" toggle.

### Layer Tag (signature)
A mono, uppercase, letter-spaced label in the second-highest ramp stop (`L04 – L08 · FORWARD PASS`), followed by a muted lowercase description. A ringed node is pinned to the residual stream at the tag's height.

### Attention Headline (signature)
The display headline split into word tokens. One token is the query (peak-stop fill, on-hot text, a "query" caption). The other tokens carry a tinted wash proportional to their weight (solid fill with on-hot text from weight 0.30 up), a mono weight caption beneath, and arcs with flowing particles drawn to the query. Hovering any word makes it the query.

### Demo Media
- **Featured thumbnail:** a 16:9 poster with a centred translucent play disc and a duration badge, opening a modal video player.
- **Compact demo button:** a 96px poster thumbnail plus "▶ Watch demo · 0:27" in a raised, media-radius row, so regular cards stay level with their neighbours.

### Ask Panel
A chat surface: a spinning colormap orb, a scrolling thread with speaker-cornered bubbles (the visitor's in the hot gradient, the system's raised), tool-call chips with a pulsing then settled status dot, and newly streamed words that glow briefly in the peak stop.

## Do's and Don'ts

### Do:
- **Do** source every color, canvas included, from the active colormap tokens, and check new work in all three colormaps (viridis, cobalt, ember).
- **Do** open every new top-level section with a layer tag on the residual stream.
- **Do** keep faint text at or above 4.5:1 on every surface it sits on, in every colormap.
- **Do** give every interactive visualisation a plain, keyboard-reachable equivalent in the page text.
- **Do** use the single easing curve `cubic-bezier(.2, .8, .2, 1)` for state transitions, and honour both reduced-motion and the pause-motion toggle.
- **Do** keep body text in Atkinson at 15px or more, and form inputs at 16px.

### Don't:
- **Don't** add drop shadows. Use tone and hairlines.
- **Don't** hard-code a hex color in a component (the Fixed Frame exception for media overlays aside).
- **Don't** set prose in the mono face or headlines in the body face.
- **Don't** render any text below 12px.
- **Don't** use gradient-filled text; emphasis comes from weight, size or a ramp-colored fill behind the word.
- **Don't** let a pausable animation strand content invisible. Paused animations finish at their end state.
