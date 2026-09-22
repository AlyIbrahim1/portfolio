# React best practices for this portfolio

This document turns current React guidance into working rules for migrating the
static portfolio in `index.html`. It is intentionally scoped to this project: a
content-heavy, single-page site with a few interactive islands and no remote
application data.

## 1. Choose the smallest architecture that fits

Use React with TypeScript and a lightweight build tool. Vite's React TypeScript
template is a suitable baseline for this client-only page. Create React App is
deprecated, and this site does not currently need a framework's routing, server
rendering, or data-loading features.

Do not add a router for hash links, a global store for local UI state, a request
library when there are no requests, or a styling framework over the existing
design system. Revisit those choices only when the requirements change.

Recommended initial shape:

```text
src/
├── main.tsx
├── App.tsx
├── components/
│   ├── ui/          # reusable design-system components
│   └── sections/    # page-specific sections
├── data/
│   └── portfolio.ts # repeated portfolio content and its types
└── styles/
    └── app.css      # page composition; imports shared design CSS once
```

This is a starting point, not a mandate to create empty directories or one file
per tiny element.

## 2. Design components around responsibilities

React recommends first breaking a mockup into a component hierarchy, with each
component responsible for one concern. For this page, the existing design-system
names already establish useful boundaries.

Good component boundaries are:

- a page section with a distinct content/layout job, such as `HeroSection` or
  `WorkSection`;
- a repeated design pattern, such as `ProjectCard`, `Pill`, or `Button`;
- a self-contained behavior, such as `ContactForm`, `NavBar`, or
  `ProjectArchive`.

Do not extract every `<div>`, heading, or two-line fragment. A component is not
better merely because it is shorter. Extract when the unit has a name, a stable
contract, reuse, meaningful behavior, or enough independent complexity to make
the parent clearer.

Keep `App` declarative:

```tsx
export function App() {
  return (
    <>
      <NavBar />
      <main id="top">
        <HeroSection />
        <TechMarquee />
        <WorkSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

## 3. Make component APIs explicit and small

- Use named function components and a `type` or `interface` for non-trivial
  props.
- Pass the minimum information a component needs. Do not pass a large page data
  object when the child needs only a title and link.
- Use descriptive event props such as `onClose` and `onSubmit`.
- Use children for wrapper components like `Surface` and `TerminalWindow`.
- Use a small union for real visual variants, such as
  `variant: 'primary' | 'secondary' | 'ghost' | 'icon'`.
- Do not add speculative props or variants. Add one when a real call site needs
  it and the design-system rules define it.
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
not both an active ID and four `isActive` booleans. Store the contact form's
submission/error status, not a second copy of values that can be read from the
form on submit.

The expected owners on this page are:

| State | Owner |
| --- | --- |
| Mobile menu open/closed | `NavBar` |
| Active section | `NavBar` or a focused `useActiveSection` hook used by it |
| Project archive open/closed | `WorkSection` |
| Contact errors/status | `ContactForm` |
| Cairo time | `Footer` |
| Rotating trace lines | `RequestTrace` |

No current value requires application-wide Context. State should stay local
until actual cross-tree sharing makes Context simpler than props.

## 6. Treat Effects as synchronization

Effects are escape hatches for keeping React synchronized with something
outside React. This page has legitimate Effect use cases: scroll and resize
listeners, `matchMedia`, the Cairo clock interval, the trace log interval, and
possibly the native dialog's imperative methods.

An Effect is not needed to:

- transform project data for rendering;
- determine validation text after a submit event;
- respond to a click or form submission;
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
  function updateClock() {
    setTime(formatTime(new Date(), timeZone));
  }

  const timer = window.setInterval(updateClock, 30_000);
  updateClock();
  return () => window.clearInterval(timer);
}, [timeZone]);
```

If a browser synchronization becomes complex or is reused, extract a hook named
for the concrete behavior, such as `useReducedMotion` or `useActiveSection`.
Do not create vague lifecycle wrappers like `useMount`.

## 7. Prefer declarative UI; use refs narrowly

React should own the rendered DOM. Replace legacy `querySelector`, manual class
toggles, `hidden` assignments, and generated log nodes with JSX driven by state.

Refs are appropriate for values that do not affect rendering and for imperative
browser APIs:

- focusing the first invalid contact field;
- calling `showModal()`/`close()` on a native dialog;
- retaining the dialog opener for focus restoration;
- holding an interval ID when state is not needed.

Do not read or write refs during render except for predictable initialization.
Do not use a ref as hidden state when changing the value should update the UI.

## 8. Render repeated content from typed data

Projects, technologies, archive entries, trace spans, navigation links, social
links, and timeline items should be typed arrays outside component bodies.
This keeps content separate from presentation and prevents re-creating static
objects on every render.

Give every repeated item a stable semantic ID in the data:

```tsx
const projects = [
  {
    id: 'rag-customer-service-agent',
    title: 'RAG customer-service agent',
    // ...
  },
];

{projects.map((project) => (
  <ProjectCard key={project.id} project={project} />
))}
```

Keys must be stable among siblings. Do not use array indexes for content that
may be reordered or edited, and never use `Math.random()` or a new UUID during
render.

## 9. Keep interactions native and accessible

React does not replace HTML semantics. Preserve the strong foundation already
present in `index.html`:

- Use links for navigation and buttons for actions.
- Keep one `h1`, logical heading order, `main`, `header`, `footer`, `nav`, and
  labelled sections.
- Keep the native `<dialog>` if it can meet the interaction requirements. On
  close, restore focus to the opener; support Escape and backdrop dismissal.
- Give icon-only buttons an accessible name. Hide decorative icons with
  `aria-hidden`.
- Keep form labels associated with controls. Set `aria-invalid` only when
  validation has run, place correctable errors near their field, focus the first
  invalid control, and announce status through a polite live region.
- Preserve `target="_blank"` only where opening a new tab is intentional and
  pair it with safe `rel` values.
- Preserve visible focus and minimum touch targets.
- Respect `prefers-reduced-motion` in both CSS and JS. A visitor requesting less
  motion should receive a static marquee/trace rather than merely shorter loops.

Prefer native field semantics such as `type="email"` and `required` where they
fit the validation flow, and prefer the dialog element before recreating its
behavior in JavaScript. Layer custom messaging on top when the design requires
it.

## 10. Handle forms in the event that caused the work

The contact form has no server mutation. Validate and build the `mailto:` URL in
its submit handler. Use `FormData` or the form's named controls if live,
character-by-character UI does not require controlled inputs.

Keep only rendering-relevant results in state, such as field errors and the
status message. Do not use an Effect to watch fields and then submit or redirect.
Encode the subject and body, preserve the visitor's reply email, and focus the
first invalid field.

If a real API replaces `mailto:` later, add explicit pending, success, and error
states; prevent duplicate submissions and handle failure without losing typed
content.

## 11. Preserve the design system instead of restyling

Import `design-system/tokens.css` and
`design-system/components/bundle.css` once. Move only page-specific legacy CSS
into the React app's stylesheet. Reuse the existing class contracts while
porting components so visual parity is easy to assess.

Do not:

- duplicate token values in TSX or new CSS;
- encode layout in large inline style objects when a class fits;
- introduce a second styling system;
- replace the local icon set with a package;
- change breakpoints, motion, colors, or component variants during a structural
  migration.

Inline styles remain reasonable for truly data-driven CSS custom properties,
such as trace span offsets and widths.

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

High-value tests for this migration are:

- mobile navigation opens, closes on selection/Escape/outside interaction, and
  exposes the correct expanded state;
- the active navigation link updates and has `aria-current`;
- the project archive opens, closes, and restores focus;
- invalid contact submissions show the right message and focus the right field;
- a valid submission builds an encoded mail handoff;
- timers/listeners are cleaned up when clock and trace components unmount;
- reduced-motion mode disables the live trace/marquee behavior;
- mapped projects, technologies, and timeline entries render from data.

Static copy does not need a unit test per line. Cover important landmarks with a
small render smoke test, then rely on type checking, linting, interaction tests,
and visual comparison at the design-system breakpoints.

## 15. Migration definition of done

A section is migrated when:

- its React component uses the design-system contract and typed content;
- its desktop and mobile layout match the current reference;
- keyboard, focus, assistive text, and reduced-motion behavior are preserved;
- it contains no imperative DOM updates that React can express declaratively;
- all listeners, observers, and timers have cleanup;
- relevant tests and repository checks pass;
- the equivalent legacy markup/script can be removed without losing behavior.

The whole migration is complete when React is the only page implementation,
the production build succeeds, there are no console errors or hook-lint errors,
and all parity checks in `AGENTS.md` have been exercised.

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
- [Using TypeScript](https://react.dev/learn/typescript)
- [`memo`](https://react.dev/reference/react/memo)
- [Build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)
- [Vite: Getting started](https://vite.dev/guide/)
- [Vite: TypeScript behavior](https://vite.dev/guide/features#typescript)
