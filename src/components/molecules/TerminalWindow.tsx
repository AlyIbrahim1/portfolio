import type { FormEventHandler, ReactNode } from 'react'

interface TerminalWindowProps {
  title: ReactNode
  footer?: ReactNode
  as?: 'div' | 'form'
  className?: string
  children?: ReactNode
  onSubmit?: FormEventHandler<HTMLFormElement>
  noValidate?: boolean
}

export function TerminalWindow({ title, footer, as = 'div', className = '', children, onSubmit, noValidate }: TerminalWindowProps) {
  const body = (
    <>
      <div className="term-bar">
        <span className="dot dot-ember" /><span className="dot dot-warning" /><span className="dot dot-success" />
        <span className="term-title">{title}</span>
      </div>
      {children}
      {footer && <div className="term-foot">{footer}</div>}
    </>
  )

  if (as === 'form') {
    return <form className={['term', className].filter(Boolean).join(' ')} onSubmit={onSubmit} noValidate={noValidate}>{body}</form>
  }

  return <div className={['term', className].filter(Boolean).join(' ')}>{body}</div>
}
