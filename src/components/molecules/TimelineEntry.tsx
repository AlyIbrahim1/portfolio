import type { TimelineItem } from '../../types/portfolio'
import { Pill } from '../atoms/Pill'

interface TimelineEntryProps { item: TimelineItem; variant: 'default' | 'highlighted' | 'next'; showNow?: boolean }

export function TimelineEntry({ item, variant, showNow = false }: TimelineEntryProps) {
  return (
    <li className={variant === 'default' ? 'step' : `step is-${variant}`} aria-current={showNow ? 'step' : undefined}>
      <span className="marker" aria-hidden="true" />
      <div className="meta">
        {item.date}
        {item.org && <><span className="sep">·</span>{item.org}</>}
        {showNow && <Pill variant="now" />}
      </div>
      <h3 className="title">{item.title}</h3>
      <p className="desc">{item.description}</p>
      {item.bullets && <ul className="list">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    </li>
  )
}
