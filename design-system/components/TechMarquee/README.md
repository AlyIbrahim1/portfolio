# TechMarquee

An edge-faded, endlessly scrolling row of monochrome logo lockups for the stack.

You provide `items` as `[{logo, label}]`, where `logo` is an Icon name, plus optional `duration` in seconds (32 by default) and `label`.

- Items render twice for a seamless loop, and the duplicate is `aria-hidden`.
- Logos rest in `ink-tertiary` and turn `ink-primary` on hover, and the row pauses on hover.
- Motion stops under `prefers-reduced-motion`.
- List only tools you actually use.
