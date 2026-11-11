# Project instructions

## Project

This repository is Aly Ibrahim's single-page developer portfolio, built with
React and TypeScript on Vite and deployed to Cloudflare Workers. The design is
described in `@./DESIGN.md`; `index.html` is the Vite entry (meta tags, fonts,
structured data) and holds no page markup.

Do not redesign or add product scope unless the task explicitly asks for it.

## Content

For the information about me that should be written in the project, including headline, timeline, projects, and socials, should all be extracted from the Obsidian vault at `/mnt/d/Obsidian/Experience Inventory` as the single source of truth about me. Read its `AGENTS.md` first (workflow 3 covers the portfolio): it has the map and trust rules (only `visibility: public` repos get links; skip `[Draft, unverified]`, `[Inferred]` and warning/todo callouts; keep numbers exactly as recorded). If the portfolio and the vault disagree, tell me and update the vault only after I confirm which is right.

## Progressive disclosure

Read only the context needed for the current task:

- **Any UI or styling change:** Read `@./DESIGN.md`, then only the relevant
  section of `@./src/styles/horizon.css` and the components being changed.
- **React architecture or implementation:** Read
  `@./docs/react-best-practices.md`. Use its relevant section as the
  implementation standard instead of restating those rules here.
- **Animation code** (`src/hooks/useBlackHole.ts`, `src/lib/`): read the
  Motion section of `DESIGN.md` first.
- **Assets or icons:** see "Icons and assets" in `DESIGN.md`.
- **Non-UI work:** Do not load the design or React guidance unless the task
  actually touches it.

If a task spans several areas, load each source when that area becomes relevant,
not preemptively.

## Project-specific constraints

- The tokens in `DESIGN.md` and `horizon.css` are authoritative. Do not invent
  alternatives before checking them.
- There is one stylesheet, `src/styles/horizon.css`. Do not add a styling
  framework or a second stylesheet for the page.
- If you want to modify an existing component, you must ask me for approval
  before implementing, or have me instruct you to do so directly. New
  components are fine when the task needs them.

## Working and verification

Make the smallest change that completes the task. Preserve unrelated work in
this dirty worktree. Follow the definition of done in
`@./docs/react-best-practices.md`.

Run the checks relevant to the files changed, using scripts defined in
`package.json`. Report checks that could not be run; never claim they passed.
