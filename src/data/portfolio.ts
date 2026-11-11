import type { SocialLink } from '../types/portfolio'

export const profile = {
  name: 'Aly Ibrahim',
  email: 'aly.ibrahim.w@icloud.com',
  city: 'Cairo',
} as const

export const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/AlyIbrahim1' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/alyibrahim1' },
] as const satisfies readonly SocialLink[]
