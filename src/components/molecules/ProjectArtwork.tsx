import type { ProjectArtworkKind } from '../../types/portfolio'
import { ChartArtwork } from '../artwork/ChartArtwork'
import { ChatArtwork } from '../artwork/ChatArtwork'
import { CodeArtwork } from '../artwork/CodeArtwork'
import { TableArtwork } from '../artwork/TableArtwork'

interface ProjectArtworkProps {
  kind: ProjectArtworkKind
}

export function ProjectArtwork({ kind }: ProjectArtworkProps) {
  switch (kind) {
    case 'chat': return <ChatArtwork />
    case 'chart': return <ChartArtwork />
    case 'table': return <TableArtwork />
    case 'code': return <CodeArtwork />
  }
}
