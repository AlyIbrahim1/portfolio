import { useEffect, useState } from 'react'
import type { NavLink, SocialLink } from '../../types/portfolio'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

interface FooterProps {
  name: string
  links: readonly NavLink[]
  elsewhere: readonly SocialLink[]
  city: string
  timeZone: string
}

function getClock(timeZone: string) {
  try {
    const now = new Date()
    const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(now)
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' }).formatToParts(now)
    const offset = parts.find((part) => part.type === 'timeZoneName')?.value.replace('GMT', 'UTC') ?? 'UTC+3'
    return { time, offset }
  } catch {
    return { time: '--:--', offset: 'UTC+3' }
  }
}

export function Footer({ name, links, elsewhere, city, timeZone }: FooterProps) {
  const [clock, setClock] = useState(() => getClock(timeZone))

  useEffect(() => {
    const update = () => setClock(getClock(timeZone))
    update()
    const timer = window.setInterval(update, 30_000)
    return () => window.clearInterval(timer)
  }, [timeZone])

  return (
    <footer className="site-footer">
      <div className="container footer">
        <div className="top">
          <div className="id">
            <a className="fname" href="#top">{name}</a><span className="fsep" aria-hidden="true" />
            <nav className="site-links" aria-label="Footer">{links.filter((link) => link.id !== 'contact').map((link) => <a className="flink" href={link.href} key={link.id}>{link.label}</a>)}</nav>
          </div>
          <div className="elsewhere">
            {elsewhere.map((link) => (
              <a className="ext" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} aria-label={link.label} key={link.id}>
                <Icon name={link.icon} className="brand" /><span className="lbl">{link.label}</span><Icon name="arrow-up-right" />
              </a>
            ))}
            <Button variant="icon" size="sm" round id="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrow-up" /></Button>
          </div>
        </div>
        <div className="bottom">
          <span>© {new Date().getFullYear()} {name}</span>
          <span className="clock"><i className="d" />{city} <span className="time">{clock.time}</span> · {clock.offset}</span>
        </div>
      </div>
    </footer>
  )
}
