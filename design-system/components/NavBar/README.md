# NavBar

A floating, frosted navigation bar with four forms: **wide** or **narrow**, each **at the top** of the page or **scrolled**. The narrow form also opens into a menu.

You provide `name`, `links` as `[{href, label}]`, `active` (the href of the current section) and an optional `cta` `{href, label}`. Optional props:

- `layout`: `auto` by default, which switches to narrow below 768px. `wide` or `narrow` forces one form, for example in a preview or a fixed-width frame.
- `scrolled`: leave it out and the bar tracks `window.scrollY > 8` itself. Pass `true` or `false` to force a form.
- `defaultOpen`: starts the narrow menu open.
- `position`: `fixed` by default.

**The forms**

- **Wide, at the top.** The 60px bar shows the name on the left, the section links in the centre (13px `ink-secondary`, with the active one in `ink-primary`) and the chrome CTA on the right. It's nearly clear, with `bg-surface` at 28% under a 14px blur and a 10% ink edge, so the hero's ember glow shows through.
- **Wide, scrolled.** It's the same layout, but denser and lifted: `bg-surface-raised` at 78% with a 12% edge and `shadow-lg`, so it holds up over busy content.
- **Narrow.** It's 56px tall with `space-4` side insets. The centre links are hidden, and the CTA sits beside a round-cornered 32px icon button with two bars. It's clear at the top and dense when scrolled, like the wide form.
- **Narrow, open.** The bars cross into an ×, and the bar deepens to `bg-surface-raised` at 94% with `shadow-lg`. A hairline-topped list of 44px rows drops in over 200ms. Each row has a `border-strong` dot, which glows `ember-400` on the active section, and an arrow that slides in on hover. Pressing Escape, choosing a link or clicking outside the bar closes it.

**Guidelines**

- Use four links at most, each a single noun naming a section: Stack, Work, Experience, Contact.
- There's one CTA, and it's always the chrome primary at `sm`.
- Colour changes take 150ms ease-out, and the menu's entry animation stops under `prefers-reduced-motion`.
