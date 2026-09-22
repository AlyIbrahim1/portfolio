interface ChatArtworkProps { label: string }

export function ChatArtwork({ label }: ChatArtworkProps) {
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMinYMin slice" role="img" aria-label={label}>
      <rect width="400" height="250" className="art-bg" /><rect width="400" height="34" className="art-bar" />
      <circle cx="18" cy="17" r="4" className="art-ember" /><circle cx="32" cy="17" r="4" className="art-warn" /><circle cx="46" cy="17" r="4" className="art-ok" />
      <rect x="190" y="54" width="186" height="30" rx="8" className="art-row-hi" /><rect x="204" y="66" width="120" height="6" rx="3" className="art-ink" />
      <rect x="24" y="98" width="260" height="92" rx="8" className="art-row" /><rect x="38" y="114" width="210" height="6" rx="3" className="art-ink-2" />
      <rect x="38" y="128" width="226" height="6" rx="3" className="art-ink-2" /><rect x="38" y="142" width="150" height="6" rx="3" className="art-ink-2" />
      <rect x="38" y="164" width="54" height="14" rx="7" className="art-ember" opacity=".55" /><rect x="98" y="164" width="62" height="14" rx="7" className="art-ember" opacity=".35" />
      <rect x="166" y="164" width="48" height="14" rx="7" className="art-ember" opacity=".25" /><rect x="24" y="206" width="352" height="30" rx="6" className="art-row" />
      <rect x="38" y="218" width="90" height="6" rx="3" className="art-ink-2" />
    </svg>
  )
}
