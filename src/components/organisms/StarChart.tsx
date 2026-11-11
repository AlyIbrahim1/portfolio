import { useEffect, useReducer, useRef } from 'react'
import { useLatest } from '../../hooks/useLatest'
import { useStarSky } from '../../hooks/useStarSky'
import { cssVars } from '../../lib/cssVars'
import type { Milestone, ShowcaseProject } from '../../types/horizon'
import { ExperienceEntry, GREEK } from '../molecules/ExperienceEntry'

interface StarChartProps {
  milestones: readonly Milestone[]
  projects: readonly ShowcaseProject[]
  paused: boolean
  reduced: boolean
}

// The chart is drawn in once when it scrolls into view; the prerendered page shows it already drawn
interface ChartState {
  selected: number
  phase: 'idle' | 'armed' | 'on'
}
type ChartAction = { type: 'select'; index: number } | { type: 'arm' } | { type: 'reveal' }

function chartReducer(state: ChartState, action: ChartAction): ChartState {
  switch (action.type) {
    case 'select': return { ...state, selected: action.index }
    case 'arm': return { ...state, phase: 'armed' }
    case 'reveal': return { ...state, phase: 'on' }
  }
}

// Experience as a star chart: the sky, and under it the selected star's entry. Each star's projects hang off it as companion stars.
export function StarChart({ milestones, projects, paused, reduced }: StarChartProps) {
  const latest = Math.max(0, milestones.findIndex((m) => m.status === 'latest'))
  const [{ selected, phase }, dispatch] = useReducer(chartReducer, { selected: latest, phase: 'idle' })
  const chartRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pausedRef = useLatest(paused)
  useStarSky(canvasRef, pausedRef, reduced)

  useEffect(() => {
    const chart = chartRef.current
    if (reduced || !chart) return
    dispatch({ type: 'arm' })
    const observer = new IntersectionObserver(([entry], o) => {
      if (entry.isIntersecting) {
        dispatch({ type: 'reveal' })
        o.disconnect()
      }
    }, { threshold: 0.35 })
    observer.observe(chart)
    return () => observer.disconnect()
  }, [reduced])

  const t0 = milestones[0].year
  const t1 = milestones[milestones.length - 1].year
  const xOf = (year: number) => 6 + (88 * (year - t0)) / (t1 - t0)
  const points = (list: readonly Milestone[]) => (list.length > 1 ? list.map((m) => `${xOf(m.year).toFixed(2)},${m.y}`).join(' ') : '')
  const past = milestones.filter((m) => m.status !== 'future')
  const future = [milestones[latest], ...milestones.filter((m) => m.status === 'future')]
  const companions = milestones.flatMap((m, i) => (m.builds?.projects ?? []).map((c) => ({ ...c, from: i, title: projects.find((p) => p.id === c.id)?.title ?? c.id })))
  const className = ['cst', !reduced && phase !== 'idle' ? 'pre' : '', phase === 'on' ? 'on' : ''].filter(Boolean).join(' ')

  return (
    <div className={className} ref={chartRef}>
      <div className="sky">
        <canvas ref={canvasRef} aria-hidden="true" />
        <svg className="br" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {companions.map((c) => <line key={c.id} className={c.from === selected ? 'hi' : undefined} x1={xOf(milestones[c.from].year).toFixed(2)} y1={milestones[c.from].y} x2={c.x} y2={c.y} />)}
        </svg>
        <svg className="ln" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={points(past)} />
          <polyline className="fu" points={points(future)} />
        </svg>
        <span className="now" ref={cssVars({ '--x': xOf(milestones[latest].year).toFixed(2), '--y': milestones[latest].y })} aria-hidden="true" />
        <ul className="cp" aria-hidden="true">
          {companions.map((c) => <li key={c.id} className={c.from === selected ? 'hi' : undefined} ref={cssVars({ '--x': c.x, '--y': c.y })}><i /><span>{c.title}</span></li>)}
        </ul>
        <ol>
          {milestones.map((m, i) => {
            const x = xOf(m.year)
            const className = [m.status === 'latest' ? 'a' : '', m.status === 'future' ? 'f' : '', milestones[i + 1]?.status === 'future' ? 'tf' : ''].filter(Boolean).join(' ')
            return (
              <li key={m.id} className={className || undefined} ref={cssVars({ '--x': x.toFixed(2), '--y': m.y, '--i': i })}>
                <button type="button" className="pt" aria-pressed={selected === i} aria-controls={`entry-${m.id}`} onClick={() => dispatch({ type: 'select', index: i })}>
                  <span className="sd" aria-hidden="true" />
                  <span className={x > 70 ? 'lb r' : 'lb'}>
                    <span className="cat"><span aria-hidden="true">{GREEK[i]}</span>{m.when}</span>
                    <span className="nm">{m.title}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
      <div className="xp">
        {milestones.map((m, i) => <ExperienceEntry key={m.id} milestone={m} index={i} selected={selected === i} projects={projects} />)}
      </div>
    </div>
  )
}
