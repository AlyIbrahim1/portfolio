import type { ProjectVisual } from '../../types/portfolio'
import { ProjectArtwork } from './ProjectArtwork'

interface ProjectWindowProps {
  visual: ProjectVisual
  label: string
}

export function ProjectWindow({ visual, label }: ProjectWindowProps) {
  const hasPreview = visual.type === 'preview'
  const barHeight = hasPreview ? 25.5 : 34
  const frameHeight = hasPreview ? 250.5 : 250

  return (
    <svg viewBox={`0 0 400 ${frameHeight}`} preserveAspectRatio={hasPreview ? undefined : 'xMinYMin slice'} role="img" aria-label={label}>
      <rect width="400" height={frameHeight} className="art-bg" />
      {hasPreview && <image href={visual.src} x="0" y={barHeight} width="400" height="225" />}
      <rect width="400" height={barHeight} className="art-bar" />
      <circle cx="18" cy={barHeight / 2} r="4" className="art-ember" /><circle cx="32" cy={barHeight / 2} r="4" className="art-warn" /><circle cx="46" cy={barHeight / 2} r="4" className="art-ok" />
      {!hasPreview && <ProjectArtwork kind={visual.artwork} />}
    </svg>
  )
}
