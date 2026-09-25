import type { TimelineItem } from '../../types/portfolio'
import { TimelineEntry } from '../molecules/TimelineEntry'

interface TimelineProps { items: readonly TimelineItem[]; nextItem: TimelineItem; nowItemId?: string }

export function Timeline({ items, nextItem, nowItemId }: TimelineProps) {
  const currentItemId = nowItemId ?? items[items.length - 1]?.id

  return (
    <ol className="timeline">
      {items.map((item, index) => <TimelineEntry key={item.id} item={item} variant={index === items.length - 1 ? 'highlighted' : 'default'} showNow={item.id === currentItemId} />)}
      <TimelineEntry key={nextItem.id} item={nextItem} variant="next" />
    </ol>
  )
}
