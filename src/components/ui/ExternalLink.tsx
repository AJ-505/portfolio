import { cn } from "@/utils/cn";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function ExternalLink({
  href,
  children,
  className,
  showArrow = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors duration-200",
        className,
      )}
    >
      {children}
      {showArrow && (
        <svg
          className="w-3.5 h-3.5 opacity-70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7v10"
          />
        </svg>
      )}
    </a>
  );
}
