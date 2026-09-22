import { useRef, useState } from 'react'
import type { ArchiveProject, Project } from '../../types/portfolio'
import { Button } from '../atoms/Button'
import { SectionLabel } from '../molecules/SectionLabel'
import { ProjectArchive } from '../organisms/ProjectArchive'
import { ProjectCard } from '../organisms/ProjectCard'

interface WorkSectionProps {
  projects: readonly Project[]
  archiveProjects: readonly ArchiveProject[]
}

export function WorkSection({ projects, archiveProjects }: WorkSectionProps) {
  const [archiveOpen, setArchiveOpen] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionLabel eyebrow="Work" title="Featured projects" dim="& shipped systems" id="work-title" action={<Button ref={openerRef} variant="secondary" aria-haspopup="dialog" aria-controls="projects-dialog" onClick={() => setArchiveOpen(true)} icon="arrow-up-right">All Projects</Button>} />
        <div className="projects">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </div>
      <ProjectArchive items={archiveProjects} open={archiveOpen} onClose={() => setArchiveOpen(false)} openerRef={openerRef} />
    </section>
  )
}
