import type { ShowcaseProject } from '../../types/horizon'

export type FeaturedProject = ShowcaseProject & { href: string; preview: NonNullable<ShowcaseProject['preview']> }

export function ProjectTile({ project }: { project: FeaturedProject }) {
  return (
    <a className="card" href={project.href} target="_blank" rel="noopener noreferrer">
      <div className={`shot ${project.preview.tone}`}><img loading="lazy" width={1920} height={1080} src={project.preview.src} alt={project.preview.alt} /></div>
      <time>{project.period} · {project.context}</time>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p className="meta">{project.stack}</p>
      <span className="go">Read the code <i aria-hidden="true">↗</i></span>
    </a>
  )
}
