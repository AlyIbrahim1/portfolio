import { useCopy } from '../../hooks/useCopy'
import type { ContactRow } from '../../types/horizon'
import { SectionHead } from '../molecules/SectionHead'

interface ContactPanelProps {
  name: string
  city: string
  email: string
  rows: readonly ContactRow[]
}

export function ContactPanel({ name, city, email, rows }: ContactPanelProps) {
  const { status, copy } = useCopy(email)

  return (
    <section id="contact" className="wrap">
      <div className="ct">
        <SectionHead accent label="Contact" title={<>Open to <em>internships</em></>} intro={`Software engineering and AI internships, in backend or AI/ML engineering. Based in ${city}.`} />
        <ul className="rows">
          <li><button type="button" onClick={copy}><span>Email</span><b>{email}</b><em>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Select it' : 'Copy'}</em></button></li>
          {rows.map((row) => <li key={row.id}><a href={row.href} target="_blank" rel="noopener noreferrer"><span>{row.label}</span><b>{row.value}</b><em>Open ↗</em></a></li>)}
        </ul>
        <div className="ft">
          {/* The year comes from the build, so a visit after New Year must not fail hydration */}
          <span suppressHydrationWarning>{name}, {city}, {new Date().getFullYear()}</span>
          <a href="#top">Back to the top ↑</a>
        </div>
      </div>
    </section>
  )
}
