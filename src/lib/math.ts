export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
export const mix = (a: number, b: number, t: number) => a + (b - a) * t
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
export const easeOut3 = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3)

// Seeded generator so the sky is the same on every visit
export function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}
