import type { ReactNode } from "react";

type BlurHighlightProps = {
  children: ReactNode;
  className?: string;
};

export function BlurHighlight({ children, className = "" }: BlurHighlightProps): ReactNode {
  return (
    <span className={`relative inline-block ${className}`}>
      <span aria-hidden="true" className="absolute -inset-x-2 inset-y-0 -z-10 rounded-full bg-foreground/10 blur-xl opacity-70" />
      {children}
    </span>
  );
}
