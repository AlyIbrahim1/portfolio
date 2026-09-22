import { useEffect, useState, type CSSProperties } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { TraceLog, TraceSpan, TraceStat } from '../../types/portfolio'
import { TerminalWindow } from '../molecules/TerminalWindow'

interface RequestTraceProps {
  title: string
  method: string
  path: string
  status: string
  spans: readonly TraceSpan[]
  logs: readonly TraceLog[]
  stats: readonly TraceStat[]
  label: string
}

type SpanStyle = CSSProperties & { '--l': string; '--w': string }

export function RequestTrace({ title, method, path, status, spans, logs, stats, label }: RequestTraceProps) {
  const [cursor, setCursor] = useState(4)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || logs.length <= 4) return
    const media = window.matchMedia('(min-width: 961px)') // Matches media breakpoint in `../styles/app.css`
    let timer = 0
    const update = () => {
      window.clearInterval(timer)
      timer = media.matches ? window.setInterval(() => setCursor((current) => current + 1), 1600) : 0
    }
    update()
    media.addEventListener('change', update)
    return () => {
      media.removeEventListener('change', update)
      window.clearInterval(timer)
    }
  }, [logs.length, reducedMotion])

  const logCount = Math.min(4, logs.length)
  const visibleCursor = reducedMotion ? logCount : cursor
  const visibleLogs = Array.from({ length: logCount }, (_, index) => logs[(visibleCursor - logCount + index) % logs.length])

  const footer = stats.map((stat) => <span key={stat.id}>{stat.label} <b>{stat.value}</b></span>)

  return (
    <div className="trace-shell" role="img" aria-label={label}>
      <TerminalWindow title={title} footer={footer}>
        <div className="trace-req"><span className="verb">{method}</span><span className="path">{path}</span><span className="ok">{status}</span></div>
        <div className="spans">
          {spans.map((span) => (
            <div className={['span', span.io ? 'io' : ''].filter(Boolean).join(' ')} key={span.id}>
              <span>{span.name}</span>
              <span className="track"><span className="bar" style={{ '--l': `${span.start}%`, '--w': `${span.width}%` } as SpanStyle} /></span>
              <span className="ms">{span.ms}ms</span>
            </div>
          ))}
        </div>
        <div className="logs" aria-hidden="true">
          {visibleLogs.map((log) => <div key={log.id}><span className={['lv', log.level === 'WARN' ? 'w' : '', log.level === 'DEBUG' ? 'd' : ''].filter(Boolean).join(' ')}>{log.level}</span>{log.message}</div>)}
        </div>
      </TerminalWindow>
    </div>
  )
}
