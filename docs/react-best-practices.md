# React best practices for this portfolio

This document turns current React guidance into working rules for this
portfolio's React code. It is intentionally scoped to this project: a
content-heavy, single-page site with a few interactive islands and no remote
application data. Visual rules live in `DESIGN.md`.

## 1. Choose the smallest architecture that fits

Use React with TypeScript and a lightweight build tool. Vite's React TypeScript
template is a suitable baseline for this page. The build renders the page to
static HTML once, and the browser hydrates that HTML (see section 16). Create
React App is deprecated, and this site does not currently need a framework's
routing, per-request server rendering, or data-loading features.

Do not add a router for hash links, a global store for local UI state, a request
library when there are no requests, or a styling framework over the stylesheet
described in `DESIGN.md`. Revisit those choices only when the requirements change.

Current shape:

```text
src/
├── main.tsx
├── App.tsx
├── components/
│   ├── atoms/       # smallest repeated elements: ExternalLink
│   ├── molecules/   # small repeated patterns: SectionHead, ProjectTile
│   ├── organisms/   # self-contained regions: HorizonNav, StarChart, HeroStage, ProjectsSection, ...
│   └── templates/   # page layout with slots: PortfolioTemplate
├── pages/           # state and data wired into a template: PortfolioPage
├── data/            # typed portfolio content
├── hooks/           # browser synchronization: useBlackHole, useReducedMotion
├── lib/             # pure helpers and canvas/WebGL code with no React
└── styles/
    └── horizon.css  # the whole design, see DESIGN.md
```

This is a starting point, not a mandate to create empty directories or one file
per tiny element.

## 2. Design components around responsibilities

React recommends first breaking a mockup into a component hierarchy, with each
component responsible for one concern. For this page, the sections in
`DESIGN.md` already establish useful boundaries.

Good component boundaries are:

- a page section with a distinct content/layout job, such as `HeroStage` or
  `ProjectsSection`;
- a repeated design pattern, such as `ProjectTile` or `SectionHead`;
- a self-contained behavior, such as `HorizonNav` or `StarChart`.

Do not extract every `<div>`, heading, or two-line fragment. A component is not
better merely because it is shorter. Extract when the unit has a name, a stable
contract, reuse, meaningful behavior, or enough independent complexity to make
the parent clearer.

Keep the page component declarative (props omitted here):

```tsx
export function PortfolioPage() {
  return (
    <>
      <HorizonNav />
      <main>
        <HeroStage />
        <div className="after">
          <ProjectsSection />
          <StarChartSection />
          <SkillsSection />
          <ContactPanel />
        </div>
      </main>
    </>
  )
}
```

## 3. Make component APIs explicit and small

- Use named function components and a `type` or `interface` for non-trivial
  props.
- Pass the minimum information a component needs. Do not pass a large page data
  object when the child needs only a title and link.
- Use descriptive event props such as `onClose` and `onSubmit`.
- Use children for wrapper components.
- Use a small union for real visual variants, such as
  `phase: 'idle' | 'armed' | 'on'`.
- Do not add speculative props or variants. Add one when a real call site needs
  it and `DESIGN.md` defines it.
- Do not copy a prop into state unless the component intentionally owns an
  editable snapshot. Prefer deriving from the prop.
- Forward native element props when building a true primitive, so semantics,
  `aria-*`, and event props remain available.

Keep types close to their component or data. Avoid `any`; use `unknown` at a
trust boundary and narrow it. Every file containing JSX uses `.tsx`.

## 4. Keep rendering pure

A component must calculate JSX from props, state, and context without changing
anything that existed before render.

During render, do not:

- mutate arrays, objects, props, or imported portfolio data;
- change the DOM, call `showModal`, focus an element, scroll the page, or assign
  `window.location`;
- start intervals, subscribe to events, or write storage;
- generate persistent IDs or list keys with randomness;
- depend on another component rendering first.

Put user-caused side effects in event handlers. Put synchronization caused by a
component being present in an Effect. Pure components remain correct when React
renders them more than once in development or abandons an in-progress render.

## 5. Model the minimum state

State is only for information that changes over time and must trigger a render.
For every candidate value, ask:

1. Is it constant portfolio content? Put it in data, not state.
2. Can it be calculated from props or existing state? Calculate it during
   render.
3. Does only one component use it? Keep it in that component.
4. Must siblings coordinate? Lift it to their closest common parent.

Avoid redundant and contradictory state. For example, store `activeSectionId`,
not both an active ID and four `isActive` booleans. Store the copy button's
status (`idle`, `copied`, `failed`), not a separate flag for each.

The expected owners on this page are:

| State | Owner |
| --- | --- |
| Animation paused | `PortfolioPage`, shared by the hero and the star chart |
| Selected star | `StarChart` |
| Chart reveal phase | `StarChart` |
| Copy button status | `useCopy`, one per button |
| Reduced motion | `useReducedMotion`, read once in `PortfolioPage` |

Manage component state with `useReducer` and typed actions, with the reducer
as a pure function next to its component or hook. `useReducedMotion` is the
exception: it only mirrors a media query, so it keeps `useState`.

No current value requires application-wide Context. State should stay local
until actual cross-tree sharing makes Context simpler than props.

## 6. Treat Effects as synchronization

Effects are escape hatches for keeping React synchronized with something
outside React. This page has legitimate Effect use cases: scroll and resize
listeners, `matchMedia`, `IntersectionObserver`, the animation frame loops of
the hero and the star chart sky, and the copy button's reset timer.

An Effect is not needed to:

- transform project data for rendering;
- respond to a click;
- copy props into state;
- keep one state variable derived from another.

Rules for every Effect:

- include every reactive value used by the Effect in its dependency list;
- return cleanup for listeners, subscriptions, observers, and timers;
- keep one synchronization concern per Effect;
- make setup/cleanup safe under React Strict Mode's development remount cycle;
- move objects/functions inside the Effect when that produces simpler,
  truthful dependencies;
- do not suppress the hooks linter to force a dependency list.

Example:

```tsx
useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => setReduced(media.matches);
  update();
  media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
}, []);
```

If a browser synchronization becomes complex or is reused, extract a hook named
for the concrete behavior, such as `useReducedMotion` or `useBlackHole`.
Do not create vague lifecycle wrappers like `useMount`.

## 7. Prefer declarative UI; use refs narrowly

React should own the rendered DOM. Replace legacy `querySelector`, manual class
toggles, `hidden` assignments, and generated log nodes with JSX driven by state.

Refs are appropriate for values that do not affect rendering and for imperative
browser APIs:

- canvases that an animation loop draws into;
- holding a timer or animation frame ID when state is not needed;
- the latest value of a prop that a long-running loop reads (`useLatest`);
- setting data-driven CSS custom properties from a ref callback (section 11).

Do not read or write refs during render except for predictable initialization.
Do not use a ref as hidden state when changing the value should update the UI.

## 8. Render repeated content from typed data

Projects, milestones, skills, navigation links and contact rows should be typed arrays outside component bodies.
This keeps content separate from presentation and prevents re-creating static
objects on every render.

Give every repeated item a stable semantic ID in the data:

```tsx
const projects = [
  {
    id: 'customer-service-assistant',
    title: 'Customer-service assistant',
    // ...
  },
];

{projects.map((project) => (
  <ProjectTile key={project.id} project={project} />
))}
```

Keys must be stable among siblings. Do not use array indexes for content that
may be reordered or edited, and never use `Math.random()` or a new UUID during
render.

## 9. Keep interactions native and accessible

React does not replace HTML semantics. Preserve the strong foundation already
present in the page:

- Use links for navigation and buttons for actions.
- Keep one `h1`, logical heading order, `main`, `header`, `nav`, and labelled
  sections.
- Anything that is selected or toggled is a `button` with `aria-pressed` or
  `aria-expanded`, not a styled `div`.
- Give icon-only buttons an accessible name. Hide decorative icons with
  `aria-hidden`.
- Preserve `target="_blank"` only where opening a new tab is intentional and
  pair it with safe `rel` values.
- Preserve visible focus and minimum touch targets.
- Respect `prefers-reduced-motion` in both CSS and JS. A visitor requesting less
  motion should receive a still hero, a pre-drawn star chart and no pause
button, rather than merely shorter loops.

## 10. Handle interactions in the event that caused the work

The page has no form and no server mutation. The copy buttons write to the
clipboard in their click handler (`useCopy`), keep only the result in state
(`idle`, `copied`, `failed`), and fall back to showing the address when the
clipboard is blocked. Do not use an Effect to watch state and then act on it.

If a real API is added later, add explicit pending, success, and error states;
prevent duplicate submissions and handle failure without losing typed content.

## 11. Keep one stylesheet and one set of tokens

All styling is in `src/styles/horizon.css`, imported once from `main.tsx`; its
`:root` variables are the tokens, described in `DESIGN.md`. Reuse its class
contracts when adding components so the page stays consistent.

Do not:

- duplicate token values in TSX or new CSS;
- encode layout in large inline style objects when a class fits;
- introduce a second styling system;
- add an icon package; the few icons are inline SVG;
- change breakpoints, motion, colors, or component variants as a side effect of
  a refactor.

Do not use the `style` prop. The prerendered HTML would carry it as a `style`
attribute, which the site's CSP blocks, and hydration does not add it back.
Static styles belong in a class. Truly data-driven CSS custom properties, such
as a star's position on the chart, are set from a ref callback through the
CSSOM, which the CSP allows:

```tsx
<li ref={cssVars({ '--x': x, '--y': y })} />
```

## 12. Avoid unsafe markup

Prefer JSX SVG elements or trusted local assets. Avoid
`dangerouslySetInnerHTML`. If it is temporarily used for the existing static,
repository-owned SVG placeholder strings, keep the input closed and local;
never pass user, CMS, URL, or form content through it.

React escapes interpolated text by default. Preserve that protection.

## 13. Optimize only measured problems

This portfolio has coarse interactions and small data sets. Normal React renders
are cheap. Do not wrap everything in `memo`, `useMemo`, or `useCallback`.
Memoization is a performance tool, not a correctness mechanism, and unstable
object/function props can make it ineffective.

First keep state local, renders pure, Effects minimal, and props small. If an
interaction is measurably slow, profile a production build with React DevTools,
identify the expensive subtree, and optimize that path only.

More relevant performance work for this site is likely to be:

- shipping optimized project images with dimensions and useful alt text;
- keeping dependencies and client JavaScript small;
- avoiding layout shift from fonts and media;
- pausing offscreen or reduced-motion animation work;
- checking the production build rather than judging development Strict Mode.

The current single page does not need route-level code splitting. Add lazy
loading only when a real heavy feature creates a meaningful initial-load cost.

## 14. Test behavior at the user-visible boundary

Prefer tests that interact through roles, names, labels, and visible output.
Avoid asserting component internals, hook call counts, or private state.

High-value tests are:

- each star on the chart is a button; selecting one marks it `aria-pressed` and
  shows its entry, and the page starts on the latest star;
- the copy buttons show their result and recover;
- timers, observers and frame loops are cleaned up when their component unmounts;
- reduced-motion mode renders a still hero and no pause button;
- mapped projects, milestones and skills render from data.

jsdom has no `IntersectionObserver` and no canvas context, so `src/test/setup.ts`
stubs them and the drawing code is not covered by unit tests. Check it in a
browser.

Static copy does not need a unit test per line. Cover important landmarks with a
small render smoke test, then rely on type checking, linting, interaction tests,
and visual comparison at the breakpoints in `DESIGN.md`.

## 15. Definition of done

A change is done when:

- its React component uses the tokens and classes in `DESIGN.md` and typed content;
- its desktop and mobile layout hold, and match `DESIGN.md`;
- keyboard, focus, assistive text, and reduced-motion behavior work;
- it contains no imperative DOM updates that React can express declaratively;
- all listeners, observers, and timers have cleanup;
- the prerendered page hydrates with no console errors under `npm run preview`;
- relevant tests and repository checks pass.

## 16. Keep the prerendered page working

`npm run build` renders `<App />` with `react-dom/server` from
`src/entry-server.tsx`, and `scripts/prerender.js` writes the result into
`dist/index.html`. Search engines and the first paint get the full content
without running JavaScript. `main.tsx` then calls `hydrateRoot`, which attaches
React to that HTML instead of rendering it again. The dev server has no
prerendered HTML, so `main.tsx` falls back to `createRoot` there.

Hydration only works when the browser's first render produces exactly the HTML
the build produced. Every component must follow these rules:

- **No browser APIs during render.** Do not read `window`, `document`,
  `matchMedia`, `localStorage` or layout during render, including in a
  `useState(() => ...)` initializer. Start from a fixed default and read the
  real value in an Effect. The build runs in Node, where these do not exist, so
  breaking this rule fails the build.
- **No values that differ between build and visit.** The current time, random
  values, and the visitor's locale or time zone must not appear in the first
  render. Show a placeholder and fill it in from an Effect. Where a build-time value is acceptable, such as the year in the contact panel, put
  `suppressHydrationWarning` on that element. Breaking this rule logs a
  hydration error and makes React discard the prerendered HTML. If only an
  attribute differs, React keeps the wrong value, and a production build logs
  nothing.
- **No `style` attributes.** See section 11.
- **Import assets.** Use `import preview from './preview.webp'`, not
  `new URL('./preview.webp', import.meta.url)`. The server build does not
  rewrite `new URL` to the hashed file name, so the prerendered HTML would point
  at a file that does not exist.

Tests run in jsdom, which has `window`, so they do not catch these mistakes.
After changing a component, run `npm run preview` and check the browser console
for hydration or CSP errors.

## Sources

These rules were checked against the official React and Vite documentation:

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Rules of React](https://react.dev/reference/rules)
- [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)
- [Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Reusing logic with custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Referencing values with refs](https://react.dev/learn/referencing-values-with-refs)
- [Rendering lists](https://react.dev/learn/rendering-lists)
- [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Vite server-side rendering](https://vite.dev/guide/ssr)
- [Using TypeScript](https://react.dev/learn/typescript)
- [`memo`](https://react.dev/reference/react/memo)
- [Build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)
- [Vite: Getting started](https://vite.dev/guide/)
- [Vite: TypeScript behavior](https://vite.dev/guide/features#typescript)
