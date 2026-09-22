import type { ReactNode } from 'react'

interface PillProps {
  variant?: 'outline' | 'solid' | 'status' | 'now'
  children?: ReactNode
  title?: string
  className?: string
}

export function Pill({ variant = 'outline', children, title, className = '' }: PillProps) {
  if (variant === 'status') {
    return <span className={['status-pill', className].filter(Boolean).join(' ')} title={title}><i aria-hidden="true" />{children}</span>
  }

  if (variant === 'now') {
    return <span className={['now', className].filter(Boolean).join(' ')} title={title}>{children ?? 'Now'}</span>
  }

  return <span className={['pill', variant === 'solid' ? 'pill-solid' : '', className].filter(Boolean).join(' ')} title={title}>{children}</span>
}
