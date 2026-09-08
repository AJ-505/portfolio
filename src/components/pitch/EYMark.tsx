import { cn } from "@/utils/cn";

/**
 * A tasteful homage to the EY beam logomark: a dark tile, the bold "EY"
 * wordmark in EY yellow, and the signature diagonal beams sweeping behind.
 */
export function EYMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "ey-beam relative grid h-11 w-11 place-items-center overflow-hidden rounded-[10px] border border-white/10 bg-[var(--color-ink)]",
        className,
      )}
    >
      {/* signature beams */}
      <span className="absolute right-[6px] top-[7px] h-[2px] w-7 rotate-[-34deg] rounded-full bg-[var(--color-ey-vivid)]/90" />
      <span className="absolute right-[6px] top-[13px] h-[2px] w-5 rotate-[-34deg] rounded-full bg-[var(--color-ey-vivid)]/60" />
      <span className="absolute right-[6px] top-[19px] h-[2px] w-3 rotate-[-34deg] rounded-full bg-[var(--color-ey-vivid)]/35" />
      <span className="relative font-grotesk text-lg font-black italic leading-none tracking-tight text-[var(--color-ey-vivid)]">
        EY
      </span>
    </div>
  );
}
