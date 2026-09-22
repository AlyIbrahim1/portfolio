A personal developer-portfolio system for showing work and starting conversations. It pairs warm near-black surfaces and off-white ink with polished chrome for actions and a single ember red as atmosphere. Every screen should feel like it was built with care, by someone you'd want on your team.

There is a full reference of how the page should look like as a template at @./template.html

## Content fundamentals

Write for two readers at once. Recruiters skim for fit and proof. Developers read for substance and taste. The copy should give both what they need in the first few seconds, then reward a closer look.

**Voice**

- **First person, confident, not boastful.** Say “I built”, “I designed”, “I shipped”. State what you did and let the work make the case. Avoid hype words (“passionate”, “rockstar”, “ninja”, “cutting-edge”) and self-ratings (“expert in…”).
- **Outcome first, then how.** Open with what the work does for someone or what changed because of it, then name the approach and the tools. One idea per sentence.
- **Specific over general.** Concrete nouns, real numbers where you have them, named technologies where they matter. Leave out a claim rather than stretch it: no invented metrics, no filler stats.
- **Show ownership and range.** Make clear what you personally owned and how far it went: from idea to production, from data to interface. Recruiters look for scope, and developers look for judgement.
- **Warm and open.** The tone is professional but human: curious, direct and easy to approach. Calls to action are invitations (“Let’s talk”, “Get in touch”), never pressure.
- **Keep it short.** Headlines are short claims. Descriptions are one or two sentences. Lists are scannable fragments that start with a verb in the past tense for finished work.

**Mechanics**

- **Casing.** Use sentence case everywhere. The only UPPERCASE text is the mono eyebrows and labels, set with CSS (`text-transform`), never typed.
- **Emphasis.** In display headlines, set the one or two words that carry the claim at 600 and the rest at 400. Section titles can split into a claim and a dimmed qualifier on a second line.
- **Punctuation.** Use curly apostrophes and quotes, an em dash with spaces for date ranges, and a middle dot (·) to join short lists and meta. No exclamation marks and no emoji.
- **Engineer's asides.** Small terminal idioms (a `//` comment, a `>` prompt, a `~/path` title, ✓ / ✗ status lines in lowercase) are welcome as flavour in technical components. Use them sparingly, and never where they'd get in the way of clarity for a non-technical reader.
- **Accessibility of language.** Explain jargon in passing or leave it out of headlines, so a recruiter can follow every heading without a glossary.

## Visual foundations

**Colour.** The system is dark only, with one theme.

- **Surfaces.** Put pages on `bg-canvas`, cards and panels on `bg-surface`, and elevated chrome (the scrolled nav, dialogs, terminal bars, toasts) on `bg-surface-raised`. Code and terminal bodies nest a shade darker on `bg-code`.
- **Text.** Set text in `ink-primary`, `ink-secondary` for descriptions, and `ink-tertiary` for meta only.
- **Chrome is the action colour.** Primary buttons, solid pills and the Now badge use `--gradient-chrome` (bundle.css) with `ink-inverse` text.
- **Ember is atmosphere, not a fill.**
  - `ember-500` lights `.surface-ember` panels and marks active states.
  - `ember-400` is for the caret, the current marker and bullet ticks.
  - `ember-300` is for ember text and error text.
  - Text on an ember fill is always `on-ember`.
- **Status.** Status colours are `success` and `warning`. `danger` aliases `ember-500`.
- **Syntax highlighting.** Use `code-keyword`, `code-string`, `code-function`, `code-comment` and `code-punctuation`.

**Type.**

- **Space Grotesk (`display` family)** is for headlines, mostly at 400 with tight negative tracking (`display-lg` −0.03em down to `heading-sm` 0).
- **IBM Plex Sans (`sans`)** is for all copy: `body-lg` for ledes, `body` by default, `body-sm` for cards.
- **IBM Plex Mono (`mono`)** is the engineering voice: `code-label` eyebrows (11px, 0.22em, uppercase), pills, meta lines and terminal copy (`code-block`).
- Large headlines and section titles run fluid with `clamp()`. The styles are the anchor sizes.
- The fonts are hosted on Google Fonts. `bundle.css` imports them.

**Spacing and layout.**

- Use a 4px base with the steps `space-1` through `space-24`. Sections are padded `space-24` on desktop and `space-16` on phones. A label sits `space-12` above its content, and cards sit `space-8` apart.
- Content lives in `.container`: `content-max` (1600px) plus a fluid `gutter`.
- Card grids are two columns, with even cards dropped by `space-24` for a staggered rhythm.
- Breakpoints are 960, 820, 767, 720 and 640px.

**Radii.** Controls use `radius-sm` (4px) and cards, panels, terminals and the floating nav use `radius-lg` (14px). Pills, markers and dots use `radius-full`, and code panes stay square (`radius-none`).

**Depth.**

- Shadows are stacked, never a single blur. Use `shadow-md` at rest and `shadow-lg` for floating layers.
- On hover, swap in a glow instead of adding one: `shadow-glow-ember` on card media, `shadow-glow-chrome` on chrome.
- Metal and chrome always pair with `shadow-bevel` or the inset highlight.
- Frosted layers (the nav, secondary buttons, inputs) use `backdrop-filter: blur(6–14px)` over translucent canvas.

**Texture.** A fixed fractal-noise grain (Textures/grain.svg) sits over everything at 3.5% overlay. Brushed-metal gradients (`--gradient-metal-ember`, `-steel`, `-ember-display`) are for large, non-text slabs only.

**Borders.** `border-hairline` is decorative only. Use `border-strong` for functional edges and `border-outline` (7:1) for outline buttons and inputs. Many dividers are ink at 7–16% alpha (`rgba(244,239,233,.08)`).

**Motion.**

- Most transitions are 150ms ease-out: colour, border and shadow. Menus and dialogs enter over 200ms with a 4–8px rise.
- Card media lifts 6px over 300ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Ambient loops are limited to the 32s marquee, the 3.2s breathing current-step marker and live terminal output.
- Every loop and transition respects `prefers-reduced-motion`.
- The shine sweep is pointer-driven only and never autoplays.

**States and focus.**

- Hover brightens text to `ink-primary` or adds a 6% ink wash.
- Active states press down 1px, and disabled controls drop to 40% opacity.
- Keyboard focus uses `shadow-focus-ring`. This is ember-400 at 55%, which composites to about 2:1 on the canvas, below the 3:1 floor. It's kept exact from the source, and inputs also brighten their edge to `ink-primary` so focus is still visible.
- Also note that `ember-400` text holds 4.5:1 only on `bg-canvas`. On `bg-surface`, use it at 24px or larger, or switch to `ember-300`.

## Iconography

Icons come from one inline sprite, available as `Aly.Icon`:

- **UI strokes.** Five custom strokes on a 24 grid at 1.6 weight with round joins: arrow-up-right, arrow-right, arrow-up, close and send. They sit at 16px next to labels.
- **Social marks.** Filled GitHub and LinkedIn marks and an outlined mail mark, at 18px.
- **Stack logos.** Monochrome technology logos for the TechMarquee, at 22px.

All icons inherit `currentColor` and never carry brand colours. The asset files are single-ink `ink-tertiary` copies for reference. There is no logo: the identity is the name “Aly Ibrahim” set in Space Grotesk 400–500. Never draw a monogram or mark in its place.

## Composition

- Build pages from full-width bands, each with one clear job and one SectionLabel. Keep the order easy to scan: who you are and what you do, proof of work, background, then a way to get in touch.
- Put one ember light source in each band, and never more. Chrome marks the single most important action in view.
- Use the NavBar and Footer on every page. Keep the navigation to a few single-noun section links.
