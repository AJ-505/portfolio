import { cn } from "@/utils/cn";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Tag({
  children,
  variant = "default",
  size = "sm",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full font-mono",
        // Size variants
        size === "sm" && "text-[11px] px-2.5 py-0.5",
        size === "md" && "text-xs px-3 py-1",
        // Style variants
        variant === "default" &&
          "bg-[var(--color-tag-bg)] text-[var(--color-tag-text)]",
        variant === "accent" &&
          "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]",
        variant === "outline" &&
          "border border-[var(--color-border)] text-[var(--color-text-secondary)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
