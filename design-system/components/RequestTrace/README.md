# RequestTrace

The hero's traced API request, rendered in a TerminalWindow: a request line, spans as a timing waterfall, a log tail and p95/error/uptime stats. It shows backend work instead of describing it.

You provide `title`, `method`, `path`, `status`, and `spans` as `[{name, start, width, ms, io?}]` (start and width are percentages of the request). Optionally add `logs` as `[[level, text]]` with a level of `INFO` | `WARN` | `DEBUG`, `stats` as `[[label, value]]`, and a `label` for assistive tech.

- Compute spans are ember gradients (`ember-600` → `ember-400`). I/O spans (`io: true`: auth, db, cache) are steel (`border-strong` → `border-outline`).
- Keep the data realistic and internally consistent: the spans should add up to the request's total ms.
- It's hidden under 960px in the hero.
