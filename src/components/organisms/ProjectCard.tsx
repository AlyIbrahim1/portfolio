import type { Project } from '../../types/portfolio'
import { Icon } from '../atoms/Icon'
import { Pill } from '../atoms/Pill'
import { Surface } from '../atoms/Surface'
import { ProjectArtwork } from '../molecules/ProjectArtwork'

interface ProjectCardProps { project: Project }

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a className="pcard" href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noopener noreferrer' : undefined}>
      <Surface className="media"><div className="shot"><ProjectArtwork kind={project.art} label={project.artLabel} /></div></Surface>
      <div className="body">
        <div className="title-row"><h3 className="title">{project.title}</h3><span className="btn btn-icon btn-sm is-round" aria-hidden="true"><Icon name="arrow-up-right" /></span></div>
        <p className="desc">{project.description}</p>
        <div className="pills">{project.tags.map((tag, index) => <Pill key={tag} variant={index === 0 && project.lead ? 'solid' : 'outline'}>{tag}</Pill>)}</div>
      </div>
    </a>
  )
}
