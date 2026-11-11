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
      <a className="brand" href="#top">
        {/* Same monogram as public/favicon.svg */}
        <svg viewBox="0 0 1254 1254" aria-hidden="true"><rect width="1254" height="1254" rx="188" fill="#131312" /><path fill="#f4f1ec" fillRule="evenodd" d="M679 292h339v671H790V847H496l-89 116H169zm111 175v242H603z" /></svg>
        {name}
      </a>
      <nav aria-label="Sections">
        {links.map((link) => <a key={link.id} href={link.href} onClick={link.id === 'work' ? toProjects : undefined}>{link.label}</a>)}
      </nav>
      <button type="button" className="btn" onClick={copy}>{status === 'copied' ? 'Copied' : status === 'failed' ? email : 'Copy email'}</button>
    </header>
  )
}
