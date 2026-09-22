# Timeline

An experience timeline with done, current and upcoming steps. The current step's marker breathes an ember halo.

You provide `items` as `[{state, date, org, title, description, bullets}]`, where `state` is `done` | `current` | `upcoming`.

- Done steps have `ink-primary` rails and rings. The current step fades from `ember-400` and gets a Now pill. Upcoming steps have a dashed `border-strong` ring and dimmed text.
- The meta line is mono: “Aug 2026 — Sep 2026 · e& Egypt”, with an em dash for ranges and a middle dot before the organisation.
- Bullets start with a past-tense verb (“Built…”, “Shipped…”).
- Mark exactly one step as current.
