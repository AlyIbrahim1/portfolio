import type { ShowcaseProject } from '../../types/horizon'
import { ExternalLink } from '../atoms/ExternalLink'

export type FeaturedProject = ShowcaseProject & { href: string; preview: NonNullable<ShowcaseProject['preview']> }

export function ProjectTile({ project }: { project: FeaturedProject }) {
  return (
    <ExternalLink className="card" href={project.href}>
      <div className={`shot ${project.preview.tone}`}><img loading="lazy" width={1920} height={1080} src={project.preview.src} alt={project.preview.alt} /></div>
      <time>{project.period} · {project.context}</time>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p className="meta">{project.stack}</p>
      <span className="go">Read the code <i aria-hidden="true">↗</i></span>
    </ExternalLink>
  )
}
