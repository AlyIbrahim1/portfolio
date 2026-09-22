import type { SocialLink } from '../../types/portfolio'
import type { TraceLog, TraceSpan, TraceStat } from '../../types/portfolio'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import { Pill } from '../atoms/Pill'
import { RequestTrace } from '../organisms/RequestTrace'

interface HeroSectionProps {
  socials: readonly SocialLink[]
  spans: readonly TraceSpan[]
  logs: readonly TraceLog[]
  stats: readonly TraceStat[]
  location: string
  education: string
}

export function HeroSection({ socials, spans, logs, stats, location, education }: HeroSectionProps) {
  return (
    <section className="hero surface-ember" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div>
          <Pill variant="status">Open to internships</Pill>
          <h1 id="hero-title">Engineering <strong>backend systems</strong> for <strong>AI products</strong>.</h1>
          <p className="lede">I’m a CS student at Goldsmiths building with Python, FastAPI and LLMs — from REST APIs to RAG agents that answer real customer questions.</p>
          <div className="actions"><Button href="#work" icon="arrow-right">View the work</Button><Button href="#contact" variant="secondary">Contact me</Button></div>
          <div className="hero-social" aria-label="Profiles">
            {socials.map((link) => <a className="soc" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} aria-label={link.label} key={link.id}><Icon name={link.icon} /></a>)}
          </div>
          <ul className="facts">
            <li><span className="k">Based in</span><span className="v">{location}</span></li>
            <li><span className="k">Studying</span><span className="v">{education}</span></li>
          </ul>
        </div>
        <RequestTrace
          title="~/trace · request 7f3a…c1"
          method="POST"
          path="/v1/churn/predict"
          status="200 OK"
          spans={spans}
          logs={logs}
          stats={stats}
          label="Terminal showing a traced API request through gateway, auth, FastAPI route, Postgres query and model prediction"
        />
      </div>
    </section>
  )
}
