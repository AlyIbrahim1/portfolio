# Toast

A short mono status line that rises from the bottom centre: `bg-surface-raised`, a `border-strong` edge and `shadow-lg`.

You provide `children` (one line, lowercase, led by ✓ or ✗) and `show`.

- Use it for confirmations that need no action, such as “✓ email copied to clipboard”.
- Hide it after a few seconds.
- Never use it for errors that need fixing. Show those next to the field instead.
