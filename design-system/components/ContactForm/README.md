# ContactForm

The contact form as a terminal: `> name`, `> email`, `> message` prompts, a chrome Send button, a live status line and a direct-email fallback.

You provide `email` (shown as the fallback link), plus optional `title` (`~/contact` by default) and `onSubmit({name, email, message})`.

- It validates on submit. Errors appear in `ember-300` with a ✗ (“email looks invalid”, “message is empty”), and success appears in `success` with a ✓.
- Key labels are `code-function`, the prompt caret is `ember-400`, and fields use a `border-strong` edge that brightens on focus.
