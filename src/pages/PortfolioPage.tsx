import { useRef, useState } from 'react'
import { ContactPanel } from '../components/sections/ContactPanel'
import { CoursesSection } from '../components/sections/CoursesSection'
import { HeroStage } from '../components/sections/HeroStage'
import { HorizonNav } from '../components/organisms/HorizonNav'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import { StarChartSection } from '../components/sections/StarChartSection'
import { contactRows, courses, heroCopy, horizonNav, milestones, showcase, skillGroups, workIntro } from '../data/horizon'
import { profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function PortfolioPage() {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  return (
    <>
      <HorizonNav name={profile.name} email={profile.email} links={horizonNav} reduced={reduced} />
      <main ref={mainRef}>
        <HeroStage {...heroCopy} workIntro={workIntro} scopeRef={mainRef} paused={paused} reduced={reduced} onTogglePause={() => setPaused((value) => !value)} />
        <div className={reduced ? 'after' : 'after ov'}>
          <ProjectsSection projects={showcase} intro={workIntro} showHead={reduced} rising={!reduced} />
          <StarChartSection milestones={milestones} projects={showcase} paused={paused} reduced={reduced} />
          <SkillsSection groups={skillGroups} />
          <CoursesSection courses={courses} />
          <ContactPanel name={profile.name} city={profile.city} email={profile.email} rows={contactRows} />
        </div>
      </main>
    </>
  )
}
