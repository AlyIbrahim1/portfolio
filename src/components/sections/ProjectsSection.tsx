import type { ShowcaseProject } from '../../types/horizon'
import { ProjectNote } from '../molecules/ProjectNote'
import { type FeaturedProject, ProjectTile } from '../molecules/ProjectTile'
import { SectionHead } from '../molecules/SectionHead'

interface ProjectsSectionProps {
  projects: readonly ShowcaseProject[]
  intro: string
  showHead: boolean // The hero's last frame carries this heading, except under reduced motion
  rising: boolean // Projects fade in from the hero's scroll progress
}

const isFeatured = (project: ShowcaseProject): project is FeaturedProject => Boolean(project.preview && project.href)

export function ProjectsSection({ projects, intro, showHead, rising }: ProjectsSectionProps) {
  return (
    <section id="work" className={rising ? 'wrap em' : 'wrap'} aria-label="Selected projects">
      {showHead && <SectionHead label="Portfolio" title={<>Selected <span>projects</span></>} intro={intro} />}
      <div className="grid3">{projects.filter(isFeatured).map((project) => <ProjectTile key={project.id} project={project} />)}</div>
      <div className="more">
        <span className="lab">More work</span>
        <div className="grid2">{projects.filter((project) => !isFeatured(project)).map((project) => <ProjectNote key={project.id} project={project} />)}</div>
      </div>
    </section>
  )
}
