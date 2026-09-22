interface CodeArtworkProps { label: string }

export function CodeArtwork({ label }: CodeArtworkProps) {
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMinYMin slice" role="img" aria-label={label}>
      <rect width="400" height="250" className="art-bg" /><rect width="400" height="34" className="art-bar" />
      <circle cx="18" cy="17" r="4" className="art-ember" /><circle cx="32" cy="17" r="4" className="art-warn" /><circle cx="46" cy="17" r="4" className="art-ok" />
      <rect x="24" y="56" width="10" height="6" rx="2" className="art-ink-2" /><rect x="44" y="56" width="120" height="6" rx="3" className="art-ink" />
      <rect x="24" y="76" width="10" height="6" rx="2" className="art-ink-2" /><rect x="44" y="76" width="64" height="6" rx="3" className="art-key" /><rect x="114" y="76" width="70" height="6" rx="3" className="art-str" />
      <rect x="24" y="96" width="10" height="6" rx="2" className="art-ink-2" /><rect x="44" y="96" width="26" height="6" rx="3" className="art-key" /><rect x="76" y="96" width="62" height="6" rx="3" className="art-fn" /><rect x="144" y="96" width="90" height="6" rx="3" className="art-ink-2" />
      <rect x="24" y="116" width="10" height="6" rx="2" className="art-ink-2" /><rect x="72" y="116" width="150" height="6" rx="3" className="art-ink-2" />
      <rect x="24" y="136" width="10" height="6" rx="2" className="art-ink-2" /><rect x="72" y="136" width="44" height="6" rx="3" className="art-key" /><rect x="122" y="136" width="46" height="6" rx="3" className="art-str" /><rect x="174" y="136" width="110" height="6" rx="3" className="art-fn" />
      <rect x="24" y="170" width="352" height="44" rx="6" className="art-row" /><rect x="40" y="188" width="140" height="7" rx="3" className="art-ink-2" />
      <rect x="276" y="184" width="84" height="16" rx="4" className="art-ember" opacity=".7" />
    </svg>
  )
}
