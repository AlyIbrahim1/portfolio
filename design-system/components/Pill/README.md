# Pill

Small rounded labels: tech tags, role tags, the availability status and the Now badge.

You provide `variant` and `children`:

- `outline` is the default. It's a mono 11.5px tag for a tech stack, with items joined by ` · `, for example “FastAPI · React · Supabase”.
- `solid` is a chrome pill in sans 500. Use it for the role or context of a project (“Individual project · e&”, “Capstone”), and put it first in a pill row.
- `status` is the `success`-green mono pill with a dot. Use it for availability (“Open to internships”), once, in the hero.
- `now` is the tiny chrome “Now” badge that follows the current timeline step.

Pills are labels, never buttons.
