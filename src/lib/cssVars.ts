// Data-driven CSS custom properties go through the CSSOM, which the CSP allows; a style attribute would be blocked.
export const cssVars = (vars: Record<string, string | number>) => (el: HTMLElement | SVGElement | null) => {
  if (!el) return
  for (const [name, value] of Object.entries(vars)) el.style.setProperty(name, String(value))
}
