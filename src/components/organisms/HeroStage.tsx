import { Fragment, type RefObject, useRef } from 'react'
import { useBlackHole } from '../../hooks/useBlackHole'
import { useLatest } from '../../hooks/useLatest'

interface HeroStageProps {
  greeting: string
  headline: string
  sub: string
  workIntro: string
  scopeRef: RefObject<HTMLElement | null>
  paused: boolean
  reduced: boolean
  onTogglePause: () => void
}

// Each word is its own span so it can dissolve into grains on its own
function Words({ text }: { text: string }) {
  return text.split(' ').map((word, i) => <Fragment key={i}>{i > 0 && ' '}<span className="sw">{word}</span></Fragment>)
}

export function HeroStage({ greeting, headline, sub, workIntro, scopeRef, paused, reduced, onTogglePause }: HeroStageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const pausedRef = useLatest(paused)
  useBlackHole(stageRef, sectionRef, scopeRef, pausedRef, reduced)

  return (
    <section className="bh" id="top" aria-label="Introduction" ref={sectionRef}>
      <div className="st" ref={stageRef}>
        <canvas className="c1" aria-hidden="true" />
        <canvas className="c2" aria-hidden="true" />
        <div className="hero">
          <p className="hi rv sw">{greeting}</p>
          <h1 className="rv rv1"><Words text={headline} /></h1>
          <p className="sub rv rv2"><Words text={sub} /></p>
          <div className="cue rv rv3 sw" aria-hidden="true">SCROLL TO ENTER<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6l5 5 5-5" /></svg></div>
        </div>
        <div className="two" aria-hidden="true">
          <p className="lab ac">Open to internships</p>
          <h2>Selected <em>projects</em></h2>
          <p>{workIntro}</p>
        </div>
        {!reduced && (
          <button type="button" className="pz" aria-label={paused ? 'Play animation' : 'Pause animation'} aria-pressed={paused} onClick={onTogglePause}>
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="M5 3l8 5-8 5z" /> : <><rect x="4" y="3" width="3" height="10" rx="1" /><rect x="9" y="3" width="3" height="10" rx="1" /></>}</svg>
          </button>
        )}
      </div>
    </section>
  )
}

