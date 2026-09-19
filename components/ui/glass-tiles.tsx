type GlassTilesProps = { className?: string };

export function GlassTiles({ className = "" }: GlassTilesProps) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden opacity-40 ${className}`}><div className="glass-tiles__grid" /></div>;
}
