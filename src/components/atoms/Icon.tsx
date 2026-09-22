import type { CSSProperties } from 'react'
import type { IconName } from '../../types/portfolio'

const iconIds: Record<IconName, string> = {
  python: 'lg-python',
  fastapi: 'lg-fastapi',
  postgresql: 'lg-postgresql',
  sqlalchemy: 'lg-sqlalchemy',
  langgraph: 'lg-langgraph',
  'scikit-learn': 'lg-scikitlearn',
  typescript: 'lg-typescript',
  react: 'lg-react',
  'tailwind-css': 'lg-tailwindcss',
  supabase: 'lg-supabase',
  'github-actions': 'lg-githubactions',
  github: 'br-github',
  linkedin: 'br-linkedin',
  mail: 'br-mail',
  'arrow-up-right': 'i-arrow-ur',
  'arrow-right': 'i-arrow-r',
  'arrow-up': 'i-arrow-up',
  close: 'i-x',
  send: 'i-send',
}

const strokeIcons = new Set<IconName>(['arrow-up-right', 'arrow-right', 'arrow-up', 'close', 'send'])

interface IconProps {
  name: IconName
  size?: number
  label?: string
  className?: string
  style?: CSSProperties
}

export function Icon({ name, size, label, className = '', style }: IconProps) {
  const resolvedSize = size ?? (strokeIcons.has(name) ? 16 : 18)
  const classes = [strokeIcons.has(name) ? 'i' : '', className].filter(Boolean).join(' ')

  return (
    <svg
      className={classes || undefined}
      width={resolvedSize}
      height={resolvedSize}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
    >
      <use href={`#${iconIds[name]}`} />
    </svg>
  )
}
