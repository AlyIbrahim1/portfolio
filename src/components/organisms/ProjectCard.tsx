import type { Project } from '../../types/portfolio'
import { Icon } from '../atoms/Icon'
import { Pill } from '../atoms/Pill'
import { Surface } from '../atoms/Surface'
import { ProjectWindow } from '../molecules/ProjectWindow'

interface ProjectCardProps { project: Project }

export function ProjectCard({ project }: ProjectCardProps) {
  const hasPreview = project.visual.type === 'preview'

  return (
    <a className="pcard" href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noopener noreferrer' : undefined}>
      <Surface className={hasPreview ? 'media has-preview' : 'media'}><div className={hasPreview ? 'shot has-preview' : 'shot'}><ProjectWindow visual={project.visual} label={project.artLabel} /></div></Surface>
      <div className="body">
        <div className="title-row"><h3 className="title">{project.title}</h3><span className="btn btn-icon btn-sm is-round" aria-hidden="true"><Icon name="arrow-up-right" /></span></div>
        <p className="desc">{project.description}</p>
        <div className="pills">{project.tags.map((tag, index) => <Pill key={tag} variant={index === 0 && project.lead ? 'solid' : 'outline'}>{tag}</Pill>)}</div>
      </div>
    </a>
  )
}
