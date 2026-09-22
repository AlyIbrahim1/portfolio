import { useEffect, useState } from 'react'

type SectionId = 'stack' | 'work' | 'experience' | 'contact'

export function useActiveSection(navId = 'site-nav') {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)

  useEffect(() => {
    let frame = 0

    function calculateActiveSection(): SectionId | null {
      const nav = document.getElementById(navId)
      const stack = document.getElementById('stack')
      const work = document.getElementById('work')
      const experience = document.getElementById('experience')
      const contact = document.getElementById('contact')
      if (!nav || !stack || !work || !experience || !contact) return null

      const viewportHeight = window.innerHeight
      const probe = viewportHeight * 0.4
      const navBottom = nav.querySelector('.nav-inner')?.getBoundingClientRect().bottom ?? 0
      const atBottom = viewportHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom || contact.getBoundingClientRect().top <= probe) return 'contact'
      if (experience.getBoundingClientRect().top <= probe) return 'experience'

      const stackRect = stack.getBoundingClientRect()
      if (work.getBoundingClientRect().top <= probe && stackRect.bottom <= navBottom + 40) return 'work'
      if (stackRect.top <= viewportHeight * 0.6) return 'stack'
      return null
    }

    function update() {
      frame = 0
      setActiveSection(calculateActiveSection())
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    update()
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [navId])

  return activeSection
}
