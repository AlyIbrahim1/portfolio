import type { Technology } from '../../types/portfolio'
import { TechMarquee } from '../organisms/TechMarquee'

interface StackSectionProps { technologies: readonly Technology[] }

export function StackSection({ technologies }: StackSectionProps) {
  return <div className="stack-strip" id="stack" aria-label="Technologies I work with"><TechMarquee items={technologies} label="Technologies I work with" /></div>
}
