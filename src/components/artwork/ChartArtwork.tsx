import { useId } from 'react'

interface ChartArtworkProps { label: string }

export function ChartArtwork({ label }: ChartArtworkProps) {
  const gradientId = useId().replaceAll(':', '')

  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMinYMin slice" role="img" aria-label={label}>
      <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e0392f" stopOpacity=".35" /><stop offset="1" stopColor="#e0392f" stopOpacity="0" /></linearGradient></defs>
      <rect width="400" height="250" className="art-bg" /><rect width="400" height="34" className="art-bar" />
      <circle cx="18" cy="17" r="4" className="art-ember" /><circle cx="32" cy="17" r="4" className="art-warn" /><circle cx="46" cy="17" r="4" className="art-ok" />
      <rect x="24" y="58" width="110" height="7" rx="3" className="art-ink" /><rect x="24" y="76" width="160" height="16" rx="4" className="art-ink-2" />
      <path d="M24 176 L66 168 L108 172 L150 150 L192 156 L234 124 L276 132" className="art-line" />
      <path d="M24 176 L66 168 L108 172 L150 150 L192 156 L234 124 L276 132 L276 200 L24 200 Z" fill={`url(#${gradientId})`} />
      <circle cx="334" cy="98" r="28" className="art-track" /><circle cx="334" cy="98" r="28" className="art-ring" strokeDasharray="176" strokeDashoffset="48" transform="rotate(-90 334 98)" />
      <rect x="24" y="212" width="352" height="12" rx="3" className="art-row" /><rect x="24" y="230" width="240" height="12" rx="3" className="art-row" />
    </svg>
  )
}
