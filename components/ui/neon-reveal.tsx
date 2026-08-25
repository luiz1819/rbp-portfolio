type NeonRevealProps = { className?: string };

export function NeonReveal({ className = "" }: NeonRevealProps) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}><div className="neon-reveal__bar" /></div>;
}
