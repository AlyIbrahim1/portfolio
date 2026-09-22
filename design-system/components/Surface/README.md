# Surface

The ember-lit panel (`.surface-ember`): `bg-surface` lit from the top by a soft ember radial glow and sunk into the canvas by a bottom vignette. It's the brand's signature atmosphere.

You provide `children`, plus optional `as`, `style` and `radius` (`lg` by default, or `none` for full-bleed bands such as the hero).

- Use it for the hero, project media panels, and feature or CTA panels. Use at most one full-width surface per screen.
- Text on the glow: `ink-primary`, or `ink-secondary`, which holds 5:1 at the peak. Never put `ink-tertiary` on the glow.
- Don't nest surfaces or stack two glows on top of each other.
