import type { ArchiveProject } from '../../types/portfolio'
import { Icon } from '../atoms/Icon'

interface ArchiveItemProps { item: ArchiveProject }

export function ArchiveItem({ item }: ArchiveItemProps) {
  return (
    <li>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        <span className="t">{item.title}</span>
        <span className="d">{item.description}</span>
        <span className="s">{item.stack}<Icon name="arrow-up-right" /></span>
      </a>
    </li>
  )
}
