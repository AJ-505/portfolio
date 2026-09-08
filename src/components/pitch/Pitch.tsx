import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { EYMark } from "./EYMark";
import { SLIDES } from "./slides";

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
  );

export function Pitch() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const lock = useRef(false);

  // keep a ref in sync so wheel/key handlers read the latest index
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const go = useCallback(
    (target: number) => {
      setIndex(Math.max(0, Math.min(total - 1, target)));
    },
    [total],
  );

  const prev = useCallback(() => go(indexRef.current - 1), [go]);
  const next = useCallback(() => go(indexRef.current + 1), [go]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(total - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, total]);

  // Wheel / trackpad navigation (debounced)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 24 || lock.current) return;
      lock.current = true;
      delta > 0 ? next() : prev();
      window.setTimeout(() => (lock.current = false), 700);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  // Touch swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 50) {
      (Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0) ? next() : prev();
    }
    touch.current = null;
  };

  const current = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  // Clean export mode (?export) — hides deck chrome for PowerPoint capture
  const clean =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("export");

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden bg-[var(--color-bg-primary)] font-grotesk text-[var(--color-text-primary)]"
      style={
        {
          height: "100dvh",
          // Light theme — scoped to the deck only
          "--color-bg-primary": "#f6f5f1",
          "--color-bg-secondary": "#efeee8",
          "--color-bg-tertiary": "#ecebe4",
          "--color-bg-card": "#ffffff",
          "--color-border": "#e4e2da",
          "--color-border-subtle": "#edece6",
          "--color-text-primary": "#101012",
          "--color-text-secondary": "#52525b",
          "--color-text-tertiary": "#8a8a93",
          "--color-tag-text": "#3f3f46",
          "--color-ey": "#8a6d00",
          "--color-ey-vivid": "#ffe600",
          "--color-ink": "#0a0a0b",
        } as CSSProperties
      }
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Atmosphere ─────────────────────────────────────────── */}
      <div
        className="deck-glow pointer-events-none absolute -right-[15%] -top-[20%] h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,230,0,0.16), rgba(255,230,0,0.04) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />

      {/* ── Top bar ────────────────────────────────────────────── */}
      {!clean && (
      <header className="relative z-10 flex shrink-0 items-center justify-between px-[clamp(1.5rem,5vw,5rem)] pt-[clamp(1.2rem,3vh,2rem)]">
        <div className="flex items-center gap-3">
          <EYMark className="h-9 w-9" />
          <div className="hidden leading-tight sm:block">
            <div className="font-grotesk text-[0.8rem] font-bold text-[var(--color-text-primary)]">
              Abasiono Mbat
            </div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              EY Internship Pitch
            </div>
          </div>
        </div>
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-[clamp(1rem,1.6vw,1.4rem)] font-semibold text-[var(--color-ey)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.8rem] text-[var(--color-text-tertiary)]">
            / {String(total).padStart(2, "0")}
          </span>
        </div>
      </header>
      )}

      {/* ── Slide stage ────────────────────────────────────────── */}
      <main className="relative z-10 min-h-0 flex-1">
        <div key={index} className="deck-stage h-full w-full">
          {current.node}
        </div>
      </main>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      {!clean && (
      <footer className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-[clamp(1.5rem,5vw,5rem)] pb-[clamp(1.2rem,3vh,2rem)] pt-2">
        <div className="hidden font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-text-secondary)] sm:block">
          {current.label}
        </div>

        {/* segmented dot rail */}
        <div className="flex flex-1 items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-8 bg-[var(--color-ey)]"
                  : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-tertiary)]",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <NavButton
            dir="prev"
            disabled={index === 0}
            onClick={prev}
          />
          <NavButton
            dir="next"
            disabled={index === total - 1}
            onClick={next}
          />
        </div>
      </footer>
      )}

      {/* top progress hairline */}
      {!clean && (
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-[2px] w-full bg-[var(--color-border)]">
        <div
          className="h-full bg-[var(--color-ey)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      )}

      {/* hint on first slide */}
      {index === 0 && !clean && (
        <div className="pointer-events-none absolute bottom-[clamp(4rem,9vh,6rem)] left-1/2 z-10 -translate-x-1/2 animate-pulse font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]">
          Use ← → or scroll to navigate
        </div>
      )}
    </div>
  );
}

function NavButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border transition-all duration-200",
        disabled
          ? "cursor-not-allowed border-[var(--color-border-subtle)] text-[var(--color-border)]"
          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-ey)] hover:text-[var(--color-ey)]",
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={dir === "prev" ? "rotate-180" : ""}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
