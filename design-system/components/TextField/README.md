# TextField

A labelled input on a dark, frosted well with an optional hint or error. It's the general form field. For the terminal-styled contact form, use ContactForm.

You provide `label` (rendered as a mono uppercase `code-label`), plus optional `name`, `type`, `placeholder`, `value`/`defaultValue`/`onChange`, `hint`, `error` and `multiline` with `rows`.

- On focus, the edge brightens to `ink-primary` and the field adds `shadow-focus-ring`.
- An error swaps the edge to `ember-400` and shows the message in `ember-300` at caption size. Write errors in lowercase and plain language (“email looks invalid”).
