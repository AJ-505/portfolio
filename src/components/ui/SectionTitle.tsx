import { cn } from "@/utils/cn";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] mb-5",
        className,
      )}
    >
      {children}
    </h2>
  );
}
