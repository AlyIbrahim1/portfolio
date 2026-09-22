# TerminalWindow

A terminal window frame: a `bg-surface-raised` title bar with three dots (ember, warning, success) and a centred mono path title, a `bg-code` body, and an optional stat footer.

You provide `title` (a path-like string, e.g. `~/contact`), `children` for the body, an optional `footer` (label/value spans with the value in `<b>`), and `as` (`div` or `form`).

- It frames anything technical: code, traces, and the contact form.
- The body copy is `code-block` and uses the `code-*` syntax tokens.
- It isn't a card for general content.
