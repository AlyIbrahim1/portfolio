import { useRef, useState } from 'react'
import { ContactPanel } from '../components/organisms/ContactPanel'
import { CoursesSection } from '../components/organisms/CoursesSection'
import { HeroStage } from '../components/organisms/HeroStage'
import { HorizonNav } from '../components/organisms/HorizonNav'
import { ProjectsSection } from '../components/organisms/ProjectsSection'
import { SkillsSection } from '../components/organisms/SkillsSection'
import { StarChartSection } from '../components/organisms/StarChartSection'
import { PortfolioTemplate } from '../components/templates/PortfolioTemplate'
import { contactRows, courses, heroCopy, horizonNav, milestones, showcase, skillGroups, workIntro } from '../data/horizon'
import { profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function PortfolioPage() {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  return (
    <PortfolioTemplate
      mainRef={mainRef}
      overlap={!reduced}
      nav={<HorizonNav name={profile.name} email={profile.email} links={horizonNav} reduced={reduced} />}
      hero={<HeroStage {...heroCopy} workIntro={workIntro} scopeRef={mainRef} paused={paused} reduced={reduced} onTogglePause={() => setPaused((value) => !value)} />}
    >
      <ProjectsSection projects={showcase} intro={workIntro} showHead={reduced} rising={!reduced} />
      <StarChartSection milestones={milestones} projects={showcase} paused={paused} reduced={reduced} />
      <SkillsSection groups={skillGroups} />
      <CoursesSection courses={courses} />
      <ContactPanel name={profile.name} city={profile.city} email={profile.email} rows={contactRows} />
    </PortfolioTemplate>
  )
}
