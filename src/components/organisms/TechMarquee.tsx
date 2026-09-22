import type { CSSProperties } from 'react'
import type { Technology } from '../../types/portfolio'
import { MarqueeItem } from '../molecules/MarqueeItem'

interface TechMarqueeProps {
  items: readonly Technology[]
  duration?: number
  label?: string
}

type MarqueeStyle = CSSProperties & { '--duration': string }

export function TechMarquee({ items, duration = 32, label = 'Technologies' }: TechMarqueeProps) {
  return (
    <div className="marquee" data-pause-on-hover style={{ '--duration': `${duration}s` } as MarqueeStyle} aria-label={label}>
      <div className="marquee-track">
        {items.map((item) => <MarqueeItem key={item.id} item={item} />)}
        {items.map((item) => <MarqueeItem key={`duplicate-${item.id}`} item={item} hidden />)}
      </div>
    </div>
  )
}
