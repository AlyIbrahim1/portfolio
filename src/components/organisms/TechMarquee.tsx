import type { Technology } from '../../types/portfolio'
import { MarqueeItem } from '../molecules/MarqueeItem'

interface TechMarqueeProps {
  items: readonly Technology[]
  duration?: number
  label?: string
}

export function TechMarquee({ items, duration = 32, label = 'Technologies' }: TechMarqueeProps) {
  return (
    // Set through the CSSOM, not a style attribute, which the CSP blocks in the prerendered HTML
    <div className="marquee" data-pause-on-hover ref={(marquee) => marquee?.style.setProperty('--duration', `${duration}s`)} aria-label={label}>
      <div className="marquee-track">
        {items.map((item) => <MarqueeItem key={item.id} item={item} />)}
        {items.map((item) => <MarqueeItem key={`duplicate-${item.id}`} item={item} hidden />)}
      </div>
    </div>
  )
}
