import type { TimelineItem } from '../../types/portfolio'
import { TimelineEntry } from '../molecules/TimelineEntry'

interface TimelineProps { items: readonly TimelineItem[] }

export function Timeline({ items }: TimelineProps) {
  return <ol className="timeline">{items.map((item) => <TimelineEntry key={item.id} item={item} />)}</ol>
}
