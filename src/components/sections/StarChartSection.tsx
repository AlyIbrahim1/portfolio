import type { Milestone, ShowcaseProject } from '../../types/horizon'
import { SectionHead } from '../molecules/SectionHead'
import { StarChart } from '../organisms/StarChart'

interface StarChartSectionProps {
  milestones: readonly Milestone[]
  projects: readonly ShowcaseProject[]
  paused: boolean
  reduced: boolean
}

export function StarChartSection(props: StarChartSectionProps) {
  return (
    <section id="experience" className="wrap">
      <SectionHead label="Background" title={<>Experience <span>and study</span></>} intro="An internship in Cairo and a degree in progress. Select a star to read its entry." />
      <StarChart {...props} />
    </section>
  )
}
