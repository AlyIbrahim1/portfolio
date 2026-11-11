import { rng } from './math'

export const STAR_COLORS = ['155,176,255', '202,215,255', '248,247,255', '255,244,234', '255,218,180', '255,196,150']
const CUMULATIVE = [0.08, 0.28, 0.6, 0.8, 0.93, 1]

export function colorIndex(r: number) {
  let i = 0
  while (CUMULATIVE[i] < r) i++
  return i
}

function sprite(color: string, spikes: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const x = canvas.getContext('2d')!
  const glow = x.createRadialGradient(32, 32, 0, 32, 32, 32)
  for (const [at, c, a] of [[0, '255,255,255', 1], [0.1, color, 0.85], [0.25, color, 0.32], [0.5, color, 0.07], [1, color, 0]] as const) glow.addColorStop(at, `rgba(${c},${a})`)
  x.fillStyle = glow
  x.fillRect(0, 0, 64, 64)
  if (spikes) {
    x.globalCompositeOperation = 'lighter'
    const across = x.createLinearGradient(0, 0, 64, 0)
    const down = x.createLinearGradient(0, 0, 0, 64)
    for (const g of [across, down]) {
      g.addColorStop(0, `rgba(${color},0)`)
      g.addColorStop(0.5, `rgba(${color},.6)`)
      g.addColorStop(1, `rgba(${color},0)`)
    }
    x.fillStyle = across
    x.fillRect(0, 31.5, 64, 1)
    x.fillStyle = down
    x.fillRect(31.5, 0, 1, 64)
  }
  return canvas
}

let cache: { plain: HTMLCanvasElement[]; spiked: HTMLCanvasElement[] } | undefined
export function getSprites() {
  cache ??= { plain: STAR_COLORS.map((c) => sprite(c, false)), spiked: STAR_COLORS.map((c) => sprite(c, true)) }
  return cache
}

interface SkyStar { c: number; m: number; a: number; r: number; ph: number; tf: number }

// The experience chart's sky: twinkling stars that turn slowly about the canvas centre.
export function createSky(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const fx = ctx
  let stars: SkyStar[] = []
  let w = 0
  let h = 0
  let lastMs = 0

  function draw(ms: number) {
    lastMs = ms
    const { plain, spiked } = getSprites()
    const T = ms / 1000
    fx.clearRect(0, 0, w, h)
    for (const s of stars) {
      const a = s.a + T * 0.012
      const sz = (0.5 + 1.4 * s.m) * 3
      const X = w / 2 + Math.cos(a) * s.r
      const Y = h / 2 + Math.sin(a) * s.r
      if (X < -sz || X > w + sz || Y < -sz || Y > h + sz) continue
      fx.globalAlpha = (0.2 + 0.6 * Math.sqrt(s.m)) * (1 - 0.55 * (1 - s.m) * (0.5 + 0.5 * Math.sin(T * s.tf + s.ph)))
      fx.drawImage((s.m > 0.9 ? spiked : plain)[s.c], X - sz, Y - sz, sz * 2, sz * 2)
    }
  }

  function resize() {
    const box = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rand = rng(7)
    const R = Math.hypot(box.width, box.height) / 2
    w = box.width
    h = box.height
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    fx.setTransform(dpr, 0, 0, dpr, 0, 0)
    fx.globalCompositeOperation = 'lighter'
    // Stars fill the circle the box turns inside, so the corners never empty out
    stars = []
    for (let i = 0, n = (Math.PI * R * R) / 1600; i < n; i++) {
      stars.push({ c: colorIndex(rand()), m: Math.pow(rand(), 5), a: rand() * 6.2832, r: R * Math.sqrt(rand()), ph: rand() * 6.2832, tf: 0.5 + rand() * 1.5 })
    }
    draw(lastMs)
  }

  resize()
  return { resize, draw }
}
