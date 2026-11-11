import { type RefObject, useEffect } from 'react'
import { createHole, distFor } from '../lib/blackHole'
import { clamp, easeOut3, mix, rng, smoothstep } from '../lib/math'
import { colorIndex, getSprites, STAR_COLORS } from '../lib/starfield'

interface Grain { x: number; y: number; d: number; j: number }
interface WordGrains { g: Grain[]; s: number; b: number }
interface Star { c: number; a: number; b: number; m: number; ph: number; tf: number; x: number; y: number }

// Where a grain is part-way (k, 0 to 1) through its fall into the hole at (hx, hy)
function spiral(x: number, y: number, hx: number, hy: number, k: number, turn: number, j: number) {
  const dx = x - hx
  const dy = y - hy
  const r2 = Math.hypot(dx, dy) * Math.pow(1 - k, 1.5)
  const a2 = Math.atan2(dy, dx) + k * k * turn * (1 + 160 / (r2 + 60)) + j * k
  return { x: hx + Math.cos(a2) * r2, y: hy + Math.sin(a2) * r2 }
}

// A word becomes grains: its glyphs drawn offscreen with the same font and sampled on a grid. Grains facing the hole (the bottom) leave first.
function grains(w: HTMLElement): WordGrains {
  const cs = getComputedStyle(w)
  const fs = parseFloat(cs.fontSize)
  const step = Math.max(2, fs / 22)
  const pw = Math.ceil(w.offsetWidth + fs)
  const ph = Math.ceil(w.offsetHeight + fs * 0.4)
  const o = document.createElement('canvas')
  o.width = pw
  o.height = ph
  const x = o.getContext('2d', { willReadFrequently: true })!
  x.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`
  if ('letterSpacing' in x) x.letterSpacing = cs.letterSpacing
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.fillStyle = '#fff'
  x.fillText(w.textContent?.trim() ?? '', pw / 2, ph / 2)
  const px = x.getImageData(0, 0, pw, ph).data
  const rand = rng(pw * 31 + ph)
  const out: Grain[] = []
  for (let y = 0; y < ph; y += step) {
    for (let X = 0; X < pw; X += step) {
      if (px[((y | 0) * pw + (X | 0)) * 4 + 3] > 110) {
        out.push({ x: X - pw / 2, y: y - ph / 2, d: Math.min(0.6, 0.12 + 0.38 * (0.5 - (y - ph / 2) / ph) + 0.1 * rand()), j: (rand() - 0.5) * 0.9 })
      }
    }
  }
  return { g: out, s: step * 0.5, b: w.closest('h1') ? 1 : 0.65 }
}

const BANDS = [['255,255,255', 0.8, 1.4], ['232,222,255', 0.6, 1.2], ['200,170,255', 0.42, 1.05], ['168,120,255', 0.25, 0.9]] as const

/**
 * Drives the hero: scrolling lifts a lensed black hole out of the page, and the headline dissolves into grains that
 * fall into it. Scroll progress also sets --q (projects rise in) on `scope` and --fo (fade to page black) on the stage.
 * Reduced motion draws one still frame instead of a loop.
 */
export function useBlackHole(
  stageRef: RefObject<HTMLElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
  paused: RefObject<boolean>,
  reduced: boolean,
) {
  useEffect(() => {
    const stage = stageRef.current
    const wrap = sectionRef.current
    const scope = scopeRef.current
    const c1 = stage?.querySelector<HTMLCanvasElement>('.c1')
    const cv = stage?.querySelector<HTMLCanvasElement>('.c2')
    const two = stage?.querySelector<HTMLElement>('.two')
    const g = cv?.getContext('2d')
    if (!stage || !wrap || !scope || !c1 || !cv || !two || !g) return

    const words = Array.from(stage.querySelectorAll<HTMLElement>('.hero .sw'))
    const hole = createHole(c1)
    const sprites = getSprites()
    const rand = rng(23)
    const stars: Star[] = []
    for (let i = 0; i < 10000; i++) stars.push({ c: colorIndex(rand()), a: rand() * 6.2832, b: Math.sqrt(rand()), m: Math.pow(rand(), 5), ph: rand() * 6.2832, tf: 0.5 + rand() * 1.5, x: NaN, y: NaN })

    let rest: { x: number; y: number }[] = []
    let wordGrains: WordGrains[] = []
    const rank: number[] = []
    let restKey = ''
    let lastP = -1
    let frameId = 0
    const t0 = performance.now()
    const pointer = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }

    function measure() {
      for (const w of words) {
        w.style.transform = ''
        w.style.opacity = ''
      }
      lastP = -1
      rest = words.map((w) => {
        let x = w.offsetWidth / 2
        let y = w.offsetHeight / 2
        for (let el: HTMLElement | null = w; el && el !== stage; el = el.offsetParent as HTMLElement | null) {
          x += el.offsetLeft
          y += el.offsetTop
        }
        return { x, y }
      })
      if (reduced) return
      wordGrains = words.map(grains)
      // The lowest words go first, since the hole rises from below
      rest.map((_, i) => i).sort((a, b) => rest[b].y - rest[a].y || rest[a].x - rest[b].x).forEach((w, r) => { rank[w] = r })
    }

    function frame(n: number) {
      const box = stage!.getBoundingClientRect()
      const W = box.width
      const H = box.height
      const d = Math.min(window.devicePixelRatio || 1, 2)
      const wide = W > 720
      if (cv!.width !== Math.round(W * d) || cv!.height !== Math.round(H * d)) {
        cv!.width = Math.round(W * d)
        cv!.height = Math.round(H * d)
      }
      const T = reduced ? 30 : n / 1000
      const rw = wrap!.getBoundingClientRect()
      const p = reduced ? 0 : clamp(-rw.top / Math.max(1, rw.height - H), 0, 1)
      const intro = reduced ? 1 : easeOut3((n - t0) / 2200)
      eased.x += (pointer.x - eased.x) * 0.04
      eased.y += (pointer.y - eased.y) * 0.04
      // The hole starts half below the fold, rises and grows until only the bottom of its ring arcs across the screen
      const R0 = Math.min(H * 0.095, W * 0.2) * mix(0.75, 1, intro)
      const Rend = wide ? H * 1.12 : H * 0.62
      const yEnd = H * (wide ? 0.56 : 0.5)
      const e = smoothstep(0, 0.86, p)
      const Rpx = Math.exp(mix(Math.log(R0), Math.log(Rend), e))
      const cx = W / 2 + (reduced ? 0 : eased.x * 18) * (1 - e)
      const cy = mix(H * 0.97, yEnd - Rend, e)
      const dist = distFor(Rpx, H)
      const inc = 0.07 + (reduced ? 0 : eased.y * 0.05) * (1 - e) + smoothstep(0, 0.5, p) * 0.38
      hole?.draw(n, W, H, cx, cy, T, dist, inc, 1 - smoothstep(0.12, 0.5, p), Rpx / H, smoothstep(0.3, 0.75, p))

      // The words stay put and crossfade into their own grains, which then stream off
      const key = `${W}x${H}`
      if (key !== restKey) {
        measure()
        restKey = key
      }
      const wk = (i: number) => clamp((p - 0.02 - rank[i] * 0.009) / 0.2, 0, 1)
      if (!reduced && Math.abs(p - lastP) > 0.0004 && rest.length) {
        words.forEach((w, i) => {
          const k = wk(i)
          w.style.opacity = k > 0 ? (1 - smoothstep(0, 0.12, k)).toFixed(3) : ''
        })
        const t2 = smoothstep(0.72, 0.95, p)
        two!.style.opacity = t2.toFixed(3)
        two!.style.transform = `translateY(${((1 - t2) * 30).toFixed(1)}px) scale(${(0.94 + 0.06 * t2).toFixed(3)})`
        two!.setAttribute('aria-hidden', String(t2 < 0.5))
        scope!.style.setProperty('--q', easeOut3((p - 0.86) / 0.14).toFixed(3))
        stage!.style.setProperty('--fo', smoothstep(0.6, 1, p).toFixed(3))
        lastP = p
      }

      // The sky: the Einstein radius is about sqrt(2D)/2.6 shadow radii, so far away the lens reaches well past the shadow and up close it hugs it
      g!.setTransform(d, 0, 0, d, 0, 0)
      g!.globalAlpha = 1
      g!.clearRect(0, 0, W, H)
      g!.globalCompositeOperation = 'lighter'
      g!.lineCap = 'round'
      const FR = Math.hypot(W, H) * 1.05
      const thE = Rpx * clamp(Math.sqrt(2 * dist) / 2.6, 1.05, 4.5)
      const pull = smoothstep(0.05, 0.75, p)
      const sky = intro * (1 - 0.4 * smoothstep(0.8, 1, p))
      const count = Math.min(stars.length, Math.round((Math.PI * FR * FR) / 1300))
      for (let j = 0; j < count; j++) {
        const s = stars[j]
        const beta = s.b * FR + 0.01
        const ang = s.a + T * 0.01 + pull * (0.5 + (2.4 * thE) / (beta + thE))
        const uu = beta / thE
        const rt = Math.sqrt(uu * uu + 4)
        const co = Math.cos(ang)
        const si = Math.sin(ang)
        const sz = (0.55 + 1.5 * s.m) * 3.2
        const base = sky * (0.3 + 0.7 * Math.sqrt(s.m)) * (1 - 0.25 * (1 - s.m) * (0.5 + 0.5 * Math.sin(T * s.tf + s.ph)))
        const sp = (s.m > 0.96 ? sprites.spiked : sprites.plain)[s.c]
        for (let k = 1; k > -2; k -= 2) {
          const th = (thE * (uu + k * rt)) / 2
          const X = cx + co * th
          const Y = cy + si * th
          if (Math.abs(th) < Rpx * 1.015 || X < -24 || X > W + 24 || Y < -24 || Y > H + 24) {
            if (k > 0) s.x = NaN
            continue
          }
          const rd = 0.5 * (1 + (k * uu) / rt)
          const sx = Math.min(Math.abs(th) / beta, 7)
          const sy = Math.max(rd, 0.3)
          const A = base * (k > 0 ? 1 : 0.8) * Math.min(1, rd / 0.3)
          if (k > 0) {
            const dx = X - s.x
            const dy = Y - s.y
            const dl = Math.hypot(dx, dy)
            if (dl > 1.5) {
              const cl = Math.min(dl, 140) / dl
              g!.globalAlpha = 1
              g!.strokeStyle = `rgba(${STAR_COLORS[s.c]},${(A * Math.min(1, 2 / Math.sqrt(dl))).toFixed(3)})`
              g!.lineWidth = Math.max(0.7, sz * 0.35)
              g!.beginPath()
              g!.moveTo(X - dx * cl, Y - dy * cl)
              g!.lineTo(X, Y)
              g!.stroke()
            }
            s.x = X
            s.y = Y
          }
          g!.globalAlpha = A
          if (sx < 1.15 && sy > 0.87) g!.drawImage(sp, X - sz, Y - sz, sz * 2, sz * 2)
          else {
            g!.setTransform(-d * si * sx, d * co * sx, d * co * sy, d * si * sy, d * X, d * Y)
            g!.drawImage(sp, -sz, -sz, sz * 2, sz * 2)
            g!.setTransform(d, 0, 0, d, 0, 0)
          }
          if (s.m > 0.6) {
            g!.globalAlpha = A * 0.14
            g!.drawImage(sprites.plain[s.c], X - sz * 3, Y - sz * 3, sz * 6, sz * 6)
          }
        }
      }

      // Still grains sit in the letter shapes; moving ones spiral down, cooling from white to violet, and vanish at the horizon.
      // Each is a short stroke from slightly back along its own path, so the stream reads as motion even when the scroll stops
      if (!reduced && wordGrains.length) {
        const bands: number[][] = [[], [], [], []]
        for (let wi = 0; wi < wordGrains.length; wi++) {
          const kw = wk(wi)
          const G = wordGrains[wi]
          const at = rest[wi]
          if (kw <= 0 || kw >= 1) continue
          g!.beginPath()
          for (const q of G.g) {
            const x0 = at.x + q.x
            const y0 = at.y + q.y
            const t = clamp((kw - q.d) / 0.4, 0, 1)
            if (t <= 0) {
              g!.rect(x0 - G.s / 2, y0 - G.s / 2, G.s, G.s)
              continue
            }
            const qa = spiral(x0, y0, cx, cy, t, 1.6, q.j)
            const qb = spiral(x0, y0, cx, cy, Math.max(0, t - 0.018), 1.6, q.j)
            if (Math.hypot(qa.x - cx, qa.y - cy) < Rpx) continue
            bands[Math.min(3, (t * 4) | 0)].push(qb.x, qb.y, qa.x, qa.y)
          }
          g!.globalAlpha = smoothstep(0, 0.12, kw) * G.b
          g!.fillStyle = '#fff'
          g!.fill()
        }
        g!.globalAlpha = 1
        BANDS.forEach(([color, alpha, width], bi) => {
          const L = bands[bi]
          if (!L.length) return
          g!.beginPath()
          for (let li = 0; li < L.length; li += 4) {
            g!.moveTo(L[li], L[li + 1])
            g!.lineTo(L[li + 2], L[li + 3])
          }
          g!.strokeStyle = `rgba(${color},${alpha})`
          g!.lineWidth = width
          g!.stroke()
        })
      }
      g!.globalAlpha = 1
    }

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
    }
    const stillFrame = () => frame(performance.now())
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (cancelled) return
      restKey = ''
      if (reduced) stillFrame()
    })

    // Pausing freezes the clock; scrolling still drives the dive
    let clock = performance.now()
    let last = clock
    function tick(n: number) {
      if (!paused.current) clock += n - last
      last = n
      frame(clock)
      frameId = requestAnimationFrame(tick)
    }
    if (reduced) {
      stillFrame()
      window.addEventListener('resize', stillFrame)
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true })
      frameId = requestAnimationFrame(tick)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', stillFrame)
      for (const w of words) w.style.opacity = ''
      two.style.opacity = ''
      two.style.transform = ''
      two.setAttribute('aria-hidden', 'true')
      scope.style.removeProperty('--q')
      stage.style.removeProperty('--fo')
    }
  }, [stageRef, sectionRef, scopeRef, paused, reduced])
}
