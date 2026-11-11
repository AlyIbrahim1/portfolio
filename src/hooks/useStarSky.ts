import { type RefObject, useEffect } from 'react'
import { createSky } from '../lib/starfield'

// Animates the chart's sky while it is on screen. Pausing freezes the clock, like the hero's.
export function useStarSky(canvasRef: RefObject<HTMLCanvasElement | null>, paused: RefObject<boolean>, reduced: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const created = createSky(canvas)
    if (!created) return
    const sky = created
    let visible = false
    let frame = 0
    let clock = performance.now()
    let last = clock

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
    })
    observer.observe(canvas)
    window.addEventListener('resize', sky.resize)

    function tick(now: number) {
      if (!paused.current) clock += now - last
      last = now
      if (visible) sky.draw(clock)
      frame = requestAnimationFrame(tick)
    }
    if (!reduced) frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', sky.resize)
    }
  }, [canvasRef, paused, reduced])
}
