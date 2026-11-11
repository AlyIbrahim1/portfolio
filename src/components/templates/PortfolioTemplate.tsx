import type { ReactNode, RefObject } from 'react'

interface PortfolioTemplateProps {
  nav: ReactNode
  hero: ReactNode
  children: ReactNode
  mainRef: RefObject<HTMLElement | null>
  overlap: boolean // The sections ride up over the hero's last frame, except under reduced motion
}

export function PortfolioTemplate({ nav, hero, children, mainRef, overlap }: PortfolioTemplateProps) {
  return (
    <>
      {nav}
      <main ref={mainRef}>
        {hero}
        <div className={overlap ? 'after ov' : 'after'}>{children}</div>
      </main>
    </>
  )
}
