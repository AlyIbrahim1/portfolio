import type { ReactNode } from 'react'

// Every off-site link opens in a new tab without handing the new page a reference to this one
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}
