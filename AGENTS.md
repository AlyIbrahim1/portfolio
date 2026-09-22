# Project instructions

## Project

This repository is Aly Ibrahim's single-page developer portfolio. The current
visual and behavioral reference is `@./index.html`; the design system lives in
`@./design-system/`.

The active goal is to migrate the page to React with TypeScript while preserving
its design, content, accessibility, and behavior. Do not redesign or add product
scope unless the task explicitly asks for it.

## Progressive disclosure

Read only the context needed for the current task:

- **Any UI or styling change:** Read `@./design-system/README.md`, then
  `@./design-system/tokens.css` and only the README files for the components
  being changed under `@./design-system/components/`. Inspect only the relevant
  section of `@./index.html` for visual and behavioral parity.
- **React architecture or implementation:** Read
  `@./design-system/react-best-practices.md`. Use its relevant section as the implementation
  standard instead of restating those rules here.
- **Component API work:** Also inspect
  `@./design-system/components/index.d.ts` and the corresponding implementation
  in `@./design-system/components/bundle.js`.
- **Assets or icons:** Read only the README in the relevant
  `@./design-system/assets/` subdirectory.
- **Non-UI work:** Do not load the design-system or React guidance unless the
  task actually touches it.

If a task spans several areas, load each source when that area becomes relevant,
not preemptively.

## Project-specific constraints

- Design-system tokens and documented component patterns are authoritative. Do
  not invent alternatives before checking them.
- `design-system/components/bundle.css` is reusable styling.
- `design-system/components/bundle.js` is a browser-global prototype and
  migration reference, not an ES module for the React app to import.
- Use `index.html` as the parity reference until its corresponding React code is
  complete.
- If you want to modify a component, you must ask me for approval before implementing, or have me instruct you to do so directly.

## Working and verification

Make the smallest change that completes the task. Preserve unrelated work in
this dirty worktree. For React migration work, follow the workflow and definition
of done in `@./design-system/react-best-practices.md`.

Run the checks relevant to the files changed, using scripts defined in
`package.json`. Report checks that could not be run; never claim they passed.
