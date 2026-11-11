# Design

Aly Ibrahim's single-page developer portfolio. A black page, one violet accent, and one idea: you fall into a black hole and come out among the projects. The page is about Aly as a whole and the work to come, not any one project.

All styling is in `src/styles/horizon.css`. Its `:root` variables are the tokens below. Read this file before any UI or styling change, then the relevant section of `horizon.css`.

## Content

Write for Developers and technical recruiters. It is built to impress as well as show proof of technical ability.

**Source of truth.** Facts come from the Obsidian vault at `/mnt/d/Obsidian/Experience Inventory`. Read its `AGENTS.md` first. Only `visibility: public` repos get links. Skip anything marked `[Draft, unverified]`, `[Inferred]` or a warning/todo callout. Keep numbers exactly as recorded. If the page and the vault disagree, tell Aly and update the vault only after confirmation.

**Rules**

- No picture of Aly, no photo slot, no CV or resume link.
- The hero carries no numbers. Metrics belong in project cards and entries.
- A project is either a featured card or a "More work" note, never both.
- Private projects have no link and say so ("Private").

**Voice**

- First person where it is used, confident, not boastful. State what was done and let the work make the case. No hype words ("passionate", "rockstar", "cutting-edge") and no self-ratings.
- Outcome first, then how. One idea per sentence.
- Specific over general: concrete nouns, real numbers where recorded, named technologies. Leave a claim out rather than stretch it. No invented metrics.
- Show ownership: say what Aly built on their own and what was shared.
- Warm and open. Calls to action are invitations, never pressure.
- Short. Headlines are short claims, descriptions one or two sentences.

**Mechanics**

- Sentence case everywhere. UPPERCASE appears only in letter-spaced labels, set with CSS `text-transform`, never typed.
- Date ranges read "Aug to Sep 2026" and "Mar 2026 to now". Join short meta with a middle dot (·). No exclamation marks, no emoji.
- Section titles split into a claim and a dimmed qualifier ("Selected **projects**", "Experience *and study*").
- Explain jargon in passing or leave it out of headings.

## Visual foundations

**Colour.** One dark theme, pure black page.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#000` | Page |
| `--card` | `#121212` | Cards, entry panel, contact panel |
| `--line` | `#1f1f1f` | Card borders |
| `--fg` | `#f5f5f5` | Headings and primary text, primary button fill |
| `--mut` | `#a3a3a3` | Descriptions |
| `--dim` | `#737373` | Meta, dimmed title qualifier, labels |
| `--ac` | `#a855f7` | Accent: focus ring, emphasised words, active marks |
| `--ac2` | `#c084fc` | Accent text and icons on dark, categories, the Now marker |
| `--deep` | `#140d24` | Dark violet button fill (the 404 page's button) |

The stage behind the hero is `#05030c`. Row dividers use `#262626`. Everything else violet is a translucent `--ac` (7–35% alpha) for washes and borders. Never use another hue for UI; the three project previews carry their own tone (`.shot.violet`, `.rose`, `.blue`) as a gradient behind the screenshot only.

**Type.**

- **Bricolage Grotesque** (`--dsp`) for headlines and big numerals: weight 500, tight tracking (−0.035em to −0.04em), fluid with `clamp()`. Hero headline up to 76px, section titles up to 56px.
- **Inter** (`--body`) for everything else: 16px/1.55 body, 600 for card titles and names, 12–13px for meta.
- Labels (`.lab`, `.cat`): 12px, weight 500, letter-spacing 0.14–0.22em, uppercase.
- Both fonts load from Google Fonts in `index.html` and `public/404.html`; the CSP already allows that host.

**Layout.**

- Content lives in `.wrap`: `min(1120px, 100% - 32px)`, centred. Sections sit `clamp(110px, 16vh, 170px)` apart inside `.after`.
- Card grids: `.grid3` (three columns, two under 900px, one under 620px) and `.grid2`. Courses use an auto-fit grid.
- Breakpoints: 900px (grids, and the star chart becomes a vertical list under 899px), 720px (nav links hide), 620px (single column, rows stack).
- Section heads (`.hd`) are centred: a label, a title, an optional intro of at most 52 characters wide.

**Shape.** Cards 24px, the contact panel 28px, the nav 22px, previews 16px, buttons and the pause button fully round.

**Depth.** Almost flat. Cards are a fill plus a hairline border. The nav is translucent with a 14px backdrop blur. Glow is reserved for violet: the star glows, the contact panel's radial wash, the 404 button's hover shadow.

**Focus.** `:focus-visible` is a 2px `--ac` outline with 3px offset. Stars are 44px buttons.

## Motion

The page is mostly motion by scroll, with small interface transitions.

- **Easing.** `--eo: cubic-bezier(.23, 1, .32, 1)` for entrances and hover lifts; `ease` for colour. Hover effects are inside `@media (hover: hover) and (pointer: fine)`. Buttons press to `scale(.97)`.
- **More work.** The disclosure opens and closes its height over 250ms `--eo` while the list fades (200ms `ease`); reduced motion keeps only the fade.
- **Intro.** Hero copy rises in with `.rv` (900ms, staggered 80ms through `--i`), starting after the black hole has settled (`--d: 1300ms`).
- **The dive** (`useBlackHole`). Scroll progress through the 300svh hero section (`p`, 0 to 1) drives everything, as in the order below. The hole starts half below the fold, rises and grows, the camera tilts to see the disk from above, the headline words crossfade into grains that spiral into the hole (lowest words first, cooling from white to violet), a closing title ("Selected projects") fades in, a black scrim rises over the ring, and the projects section rises into place (`--q`).
- **Lensed starfield.** 10,000 stars bent by the hole as a point lens, with motion streaks. The WebGL render drops resolution if frames run long.
- **Star chart sky.** A second, quieter sky that twinkles and turns slowly. It draws only while on screen.
- **Chart reveal.** The line draws left to right and the stars fade in once, when the chart is 35% visible. The selected entry swaps with a short fade and 6px rise; all entries share one grid cell so the panel never changes height.
- **Pause button.** Freezes the animation clock for the hero and the chart. Scrolling still drives the dive.
- **Reduced motion.** The hero is a single still frame (no scroll dive, no grains, no pointer parallax), the pause button is absent, the section heading appears in the page instead of in the hero, the chart is drawn already, loops and transitions are off, and anchor jumps are instant. Never ship a loop without this fallback.

## Components

| Component | Notes |
| --- | --- |
| `HorizonNav` | Fixed floating pill: the favicon's "A" monogram with the name, section links (hidden under 720px), and a "Copy email" button that reads "Copied" for 1.6s. The Projects link jumps to the end of the dive, not the section top. |
| `HeroStage` | 300svh scroll track with a sticky 100svh stage: two canvases (WebGL hole, 2D sky and grains), the centred copy, the closing title, the pause button. |
| `ProjectsSection` | Three featured `ProjectTile` cards (screenshot on a tone gradient, period · context, title, description, stack, "Read the code ↗"), then a collapsed "More work +" disclosure (`<details>`) that opens to a divided list of `ProjectNote` rows. |
| `StarChartSection` / `StarChart` | Experience as a night sky. x is time, each entry a star with a Greek letter; the line is solid up to the latest star (marked "Now", pulsing) and dashed to the future one (a hollow star). Each entry's projects hang off it as faint companion stars that brighten when it is selected. The selected entry shows in a card below (`ExperienceEntry`). Under 900px the chart becomes a vertical list with the line running down the left. |
| `SkillsSection` | Nine small `.card` tiles, grouped by the work each does. |
| `CoursesSection` | Cards whose top is a gradient tile with the issuer's name; no logos. |
| `ContactPanel` | One rounded panel with a violet wash at the bottom: an email row that copies, GitHub and LinkedIn rows that open in a new tab, and a footer line with a back-to-top link. This is also the page's end; there is no separate footer. |

New components follow the existing ones: small, typed props, classes from `horizon.css`, no `style` prop (see `docs/react-best-practices.md`).

## Icons and assets

- There is no icon set. The few icons (the scroll chevron, pause and play, the 404 arrow) are inline SVG that inherit `currentColor` and use a 1.6 stroke where stroked. Do not add an icon package.
- The 'A' monogram from `public/favicon.svg` is the only logo, inlined in the navbar. No textures.
- Project screenshots are WebP files in `src/assets/project-previews/` and are imported, not referenced by URL (so the prerender gets the hashed names). Give each real dimensions (1920×1080) and descriptive alt text.
- Favicons, the web manifest and `og.jpg` are in `public/`.

## Accessibility

- One `h1`, logical headings, `main`, `header`, `nav` and labelled sections. The closing hero title is `aria-hidden` until it is visible.
- Links navigate, buttons act. Selected stars use `aria-pressed` and `aria-controls`.
- Decorative canvases and SVG are `aria-hidden`. Icon-only buttons have a name.
- Text contrast: `--mut` and `--fg` pass on black and on `--card`. `--dim` is for meta only.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.
- Touch targets are at least 44px for stars and 40px for buttons.
