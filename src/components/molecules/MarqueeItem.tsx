import type { Technology } from '../../types/portfolio'
import { Icon } from '../atoms/Icon'

interface MarqueeItemProps {
  item: Technology
  hidden?: boolean
}

export function MarqueeItem({ item, hidden }: MarqueeItemProps) {
  return <span className="tm-item" aria-hidden={hidden || undefined}><Icon name={item.logo} size={22} className="tm-logo" />{item.label}</span>
}
