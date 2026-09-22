import { useEffect, useRef, useState } from 'react'
import type { NavLink } from '../../types/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

interface NavBarProps {
  name: string
  links: readonly NavLink[]
  cta: NavLink
}

export function NavBar({ name, links, cta }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const navRef = useRef<HTMLElement>(null)
  const activeSection = useActiveSection()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!open) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('menu-button')?.focus()
      }
    }
    const closeOutside = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnDesktop = () => {
      if (window.innerWidth > 767) setOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('click', closeOutside)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('click', closeOutside)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [open])

  const navClassName = ['nav', scrolled ? 'is-scrolled' : '', open ? 'is-open' : ''].filter(Boolean).join(' ')

  return (
    <header ref={navRef} className={navClassName} id="site-nav">
      <div className="nav-inner">
        <a className="name" href="#top">{name}</a>
        <nav className="links" aria-label="Sections">
          {links.map((link) => <a key={link.id} className={['link', activeSection === link.id ? 'is-active' : ''].filter(Boolean).join(' ')} href={link.href} aria-current={activeSection === link.id ? 'true' : undefined}>{link.label}</a>)}
        </nav>
        <div className="end">
          <Button href={cta.href} size="sm">{cta.label}</Button>
          <Button id="menu-button" variant="icon" size="sm" className="menu-btn" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
            <span className="bars" aria-hidden="true"><i /><i /></span>
          </Button>
        </div>
        <nav className="mnav" id="mobile-navigation" aria-label="Sections" hidden={!open}>
          {links.map((link) => <a key={link.id} className={['mlink', activeSection === link.id ? 'is-active' : ''].filter(Boolean).join(' ')} href={link.href} aria-current={activeSection === link.id ? 'true' : undefined} onClick={() => setOpen(false)}>{link.label}<Icon name="arrow-right" /></a>)}
        </nav>
      </div>
    </header>
  )
}
