import type { CSSProperties, ElementType, ReactNode } from 'react'

interface SurfaceProps {
  as?: ElementType
  radius?: 'lg' | 'none'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export function Surface({ as: Component = 'div', radius = 'lg', className = '', style, children }: SurfaceProps) {
  return (
    <Component
      className={['surface-ember', `radius-${radius}`, className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </Component>
  )
}
