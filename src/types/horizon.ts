export type PreviewTone = 'violet' | 'rose' | 'blue'

export interface ShowcaseProject {
  id: string
  title: string
  description: string
  stack: string
  period: string
  context: string
  href?: string // Only public repositories get a link
  preview?: { src: string; alt: string; tone: PreviewTone } // Featured projects have one; the rest are listed as text cards
}

export type MilestoneStatus = 'past' | 'latest' | 'future'

export interface Milestone {
  id: string
  when: string
  year: number // Position on the chart's time axis
  y: number // Vertical position on the chart, 0 to 100
  title: string
  place: string
  description: string
  status: MilestoneStatus
  builds?: { label: string; projects: readonly { id: string; x: number; y: number }[] }
}

export interface SkillGroup { id: string; title: string; tools: string }
export interface ContactRow { id: string; label: string; value: string; href: string }
