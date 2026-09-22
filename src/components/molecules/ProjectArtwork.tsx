import type { ProjectArtworkKind } from '../../types/portfolio'
import { ChartArtwork } from '../artwork/ChartArtwork'
import { ChatArtwork } from '../artwork/ChatArtwork'
import { CodeArtwork } from '../artwork/CodeArtwork'
import { TableArtwork } from '../artwork/TableArtwork'

interface ProjectArtworkProps {
  kind: ProjectArtworkKind
  label: string
}

export function ProjectArtwork({ kind, label }: ProjectArtworkProps) {
  switch (kind) {
    case 'chat': return <ChatArtwork label={label} />
    case 'chart': return <ChartArtwork label={label} />
    case 'table': return <TableArtwork label={label} />
    case 'code': return <CodeArtwork label={label} />
  }
}
