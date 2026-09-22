import type { ElementType, ReactNode } from 'react'

interface SectionLabelProps {
  eyebrow: string
  title: ReactNode
  dim?: ReactNode
  note?: string
  action?: ReactNode
  id?: string
  level?: 1 | 2 | 3
}

export function SectionLabel({ eyebrow, title, dim, note, action, id, level = 2 }: SectionLabelProps) {
  const Heading = `h${level}` as ElementType

  return (
    <div className="sec-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <Heading className="sec-title" id={id}>{title}{dim && <><br /><span className="dim">{dim}</span></>}</Heading>
      </div>
      {action ?? (note ? <p className="sec-note">{note}</p> : null)}
    </div>
  )
}
