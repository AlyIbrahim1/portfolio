# ProjectArchive

The “All projects” list: an eyebrow and title, a close button, and ruled rows of name, one-line description and stack. It's for smaller builds that don't earn a ProjectCard.

You provide `items` as `[{title, description, stack, href}]`, plus optional `eyebrow`, `title`, `open` and `onClose`, or `inline` to render it as a static panel.

- Open it from the “All Projects” secondary button. It sits on `bg-surface-raised` with `shadow-lg`, and the backdrop blurs the canvas at 72%.
- Keep each description to one sentence.
