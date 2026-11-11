import type { MouseEvent } from 'react'
import { useCopy } from '../../hooks/useCopy'
import type { NavLink } from '../../types/portfolio'

interface HorizonNavProps {
  name: string
  email: string
  links: readonly NavLink[]
  reduced: boolean
}

export function HorizonNav({ name, email, links, reduced }: HorizonNavProps) {
  const { status, copy } = useCopy(email)

  // The projects rise out of the black hole, so go to the end of that dive instead of the section's own top
  function toProjects(event: MouseEvent) {
    const hero = document.getElementById('top')
    if (reduced || !hero) return
    event.preventDefault()
    window.scrollTo({ top: hero.offsetTop + hero.offsetHeight - window.innerHeight, behavior: 'smooth' })
  }

  return (
    <header className="nav">
      <a className="brand" href="#top"><i aria-hidden="true">A</i>{name}</a>
      <nav aria-label="Sections">
        {links.map((link) => <a key={link.id} href={link.href} onClick={link.id === 'work' ? toProjects : undefined}>{link.label}</a>)}
      </nav>
      <button type="button" className="btn" onClick={copy}>{status === 'copied' ? 'Copied' : status === 'failed' ? email : 'Copy email'}</button>
    </header>
  )
}
