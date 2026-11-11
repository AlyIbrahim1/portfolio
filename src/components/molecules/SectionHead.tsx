import type { ReactNode } from 'react'

interface SectionHeadProps {
  label: string
  title: ReactNode
  intro?: string
  accent?: boolean
}

export function SectionHead({ label, title, intro, accent }: SectionHeadProps) {
  return (
    <div className="hd">
      <p className={accent ? 'lab ac' : 'lab'}>{label}</p>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}
