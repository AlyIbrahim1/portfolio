# ProjectCard

A project tile: an ember-lit media panel with an inset screenshot rising from its lower right, then a title row with a round arrow button, a description and pills.

You provide `title`, `description`, `href` (with `external`), `art` (a node, e.g. a real screenshot, or a placeholder kind: `chat` | `chart` | `table` | `code`), `tags` (strings) and `lead` (which makes the first tag a solid pill).

- On hover, the media swaps `shadow-md` for `shadow-glow-ember` and the shot lifts 6px.
- The description is one or two sentences: what it does for someone, then how it's built.
- In a `.projects` grid, even cards drop by `space-24` on desktop.
- Replace the placeholder art with real screenshots as soon as they exist.
