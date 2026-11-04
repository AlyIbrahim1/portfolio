import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false) // The prerendered HTML has no window; the effect reads the real value

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}
