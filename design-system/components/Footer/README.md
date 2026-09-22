# Footer

The site footer: the name, section links, “elsewhere” links with arrows, a back-to-top button, then © and a live local clock.

You provide `name`, `links` and `elsewhere` as `[{label, icon, href}]`, plus optional `city`, `timeZone` (`Africa/Cairo` by default) and `offset`.

- A soft ember hairline glows along the top edge.
- Under 640px the labels collapse to round brand-icon buttons.
- The bottom row is mono `ink-tertiary`, and the clock dot is `success`.
