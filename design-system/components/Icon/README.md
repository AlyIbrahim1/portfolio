# Icon

Renders one glyph from the site's sprite: UI strokes, social marks and stack logos. The icon takes its colour from the parent's CSS `color`.

Pass `name`, which must be one of `Aly.iconNames`, and optionally `size` in px (16 for strokes, 18 for marks by default) and `label`. With `label` set, the icon is announced as an image. Without it, the icon is decorative (`aria-hidden`).

- UI strokes (`arrow-up-right`, `arrow-right`, `arrow-up`, `close`, `send`) are drawn on a 24-unit grid with a 1.6 stroke and round caps and joins (`.i`). Use `arrow-up-right` for anything that leaves the page and `arrow-right` for in-page movement.
- Marks and logos are filled. Keep them monochrome: `ink-tertiary` at rest, `ink-primary` on hover. Never use their brand colours.
- Don't use emoji in place of an icon.
