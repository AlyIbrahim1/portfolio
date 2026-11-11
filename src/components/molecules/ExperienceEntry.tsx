import type { Milestone, ShowcaseProject } from '../../types/horizon'

interface ExperienceEntryProps {
  milestone: Milestone
  index: number
  selected: boolean
  projects: readonly ShowcaseProject[]
}

export const GREEK = 'αβγδε'

export function ExperienceEntry({ milestone, index, selected, projects }: ExperienceEntryProps) {
  const { id, builds } = milestone
  return (
    <article className={selected ? 'xpi sel' : 'xpi'} id={`entry-${id}`} aria-labelledby={`entry-title-${id}`}>
      <div className="xph">
        <span className="bay" aria-hidden="true">{GREEK[index]}</span>
        <p className="cat">{milestone.when}</p>
        <h3 id={`entry-title-${id}`}>{milestone.title}</h3>
        <p className="wh">{milestone.place}</p>
      </div>
      <div className="xpb">
        <p>{milestone.description}</p>
        {builds && (
          <>
            <p className="lab">{builds.label}</p>
            <ul className="rows cmp">
              {builds.projects.map(({ id: projectId }) => {
                const project = projects.find((p) => p.id === projectId)
                if (!project) return null
                const row = (
                  <>
                    <span>{project.period}</span>
                    <b>{project.title}</b>
                    <em>{project.href ? 'Code ↗' : 'Private'}</em>
                  </>
                )
                return <li key={projectId}>{project.href ? <a href={project.href} target="_blank" rel="noopener noreferrer">{row}</a> : <div>{row}</div>}</li>
              })}
            </ul>
          </>
        )}
      </div>
    </article>
  )
}
