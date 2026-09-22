import type { TimelineItem } from '../../types/portfolio'
import { Timeline } from '../organisms/Timeline'

interface ExperienceSectionProps { items: readonly TimelineItem[] }

export function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container exp-grid">
        <div className="intro">
          <div className="eyebrow">Experience</div>
          <h2 className="sec-title" id="experience-title">Where I’ve built<br /><span className="dim">& what comes next</span></h2>
          <p>Roles, study and builds in order, ending with the step I’m working toward.</p>
        </div>
        <Timeline items={items} />
      </div>
    </section>
  )
}
