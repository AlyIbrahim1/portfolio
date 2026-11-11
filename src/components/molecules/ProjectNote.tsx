import type { ShowcaseProject } from '../../types/horizon'

export function ProjectNote({ project }: { project: ShowcaseProject }) {
  return (
    <article className="card tx">
      <time>{project.period} · {project.context}</time>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p className="meta">{project.stack}</p>
    </article>
  )
}
