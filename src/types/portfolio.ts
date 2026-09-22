export type IconName =
  | 'python'
  | 'fastapi'
  | 'postgresql'
  | 'sqlalchemy'
  | 'langgraph'
  | 'scikit-learn'
  | 'typescript'
  | 'react'
  | 'tailwind-css'
  | 'supabase'
  | 'github-actions'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'arrow-up-right'
  | 'arrow-right'
  | 'arrow-up'
  | 'close'
  | 'send'

export interface NavLink {
  id: string
  href: `#${string}`
  label: string
}

export interface SocialLink {
  id: string
  label: string
  icon: IconName
  href: string
  external?: boolean
}

export interface Technology {
  id: string
  logo: IconName
  label: string
}

export type ProjectArtworkKind = 'chat' | 'chart' | 'table' | 'code'

export interface Project {
  id: string
  title: string
  description: string
  href: string
  art: ProjectArtworkKind
  artLabel: string
  tags: readonly string[]
  lead?: boolean
  external?: boolean
}

export interface ArchiveProject {
  id: string
  title: string
  description: string
  stack: string
  href: string
}

export interface TimelineItem {
  id: string
  state: 'done' | 'current' | 'upcoming'
  date: string
  org?: string
  title: string
  description: string
  bullets?: readonly string[]
}

export interface TraceSpan {
  id: string
  name: string
  start: number
  width: number
  ms: number
  io?: boolean
}

export interface TraceLog {
  id: string
  level: 'INFO' | 'WARN' | 'DEBUG'
  message: string
}

export interface TraceStat {
  id: string
  label: string
  value: string
}
