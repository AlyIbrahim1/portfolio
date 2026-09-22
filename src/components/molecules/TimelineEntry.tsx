import type { TimelineItem } from '../../types/portfolio'
import { Pill } from '../atoms/Pill'

interface TimelineEntryProps { item: TimelineItem }

export function TimelineEntry({ item }: TimelineEntryProps) {
  return (
    <li className={`step is-${item.state}`} aria-current={item.state === 'current' ? 'step' : undefined}>
      <span className="marker" aria-hidden="true" />
      <div className="meta">
        {item.date}
        {item.org && <><span className="sep">·</span>{item.org}</>}
        {item.state === 'current' && <Pill variant="now" />}
      </div>
      <h3 className="title">{item.title}</h3>
      <p className="desc">{item.description}</p>
      {item.bullets && <ul className="list">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    </li>
  )
}
