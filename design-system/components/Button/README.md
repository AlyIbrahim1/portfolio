# Button

Four variants, and the primary one is chrome, not red. Ember is atmosphere and is never used as a button fill.

You provide `variant` (`primary` | `secondary` | `ghost` | `icon`), `size` (`md` 40px | `sm` 32px), the `children` label, an optional trailing `icon`, `round` (icon buttons only), `shine` (a hover sweep on primary) and `href` (which renders an `<a>`). Any other props pass through.

- **primary** uses `--gradient-chrome` with `ink-inverse` text and gets `shadow-glow-chrome` on hover. Use one per view, for the thing the page is for: “View the work”, “Let’s talk”, “Send”.
- **secondary** is a frosted outline with a `border-outline` edge. Use it beside a primary, or for “All Projects”.
- **ghost** is quiet text for low-priority actions.
- **icon** is a 36px square (32px at `sm`), or round with `round`. Always give it an `aria-label`.
- Write labels in sentence case, starting with a verb or noun. Leave out exclamation marks. A trailing arrow icon means the button goes somewhere.
