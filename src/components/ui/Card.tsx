import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article";
}

export function Card({
  children,
  className,
  hover = false,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-5",
        hover &&
          "transition-all duration-300 ease-[var(--ease-out-expo)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
