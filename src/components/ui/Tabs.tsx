import { useId, useRef } from "react";
import { cn } from "@/utils/cn";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  label: string;
  tabs: readonly TabItem[];
  value: string;
  onChange: (id: string) => void;
  children: (id: string) => React.ReactNode;
  className?: string;
}

export function Tabs({
  label,
  tabs,
  value,
  onChange,
  children,
  className,
}: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const found = tabs.findIndex((tab) => tab.id === value);
  const selectedIndex = found === -1 ? 0 : found;

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowRight: () => focusTab(selectedIndex + 1),
      ArrowLeft: () => focusTab(selectedIndex - 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    };

    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  const columns = `repeat(${tabs.length}, minmax(0, 1fr))`;
  const indicatorWidth = `calc((100% - 0.5rem) / ${tabs.length})`;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className="relative grid rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-1"
        style={{ gridTemplateColumns: columns }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-transform duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none"
          style={{
            width: indicatorWidth,
            transform: `translateX(${selectedIndex * 100}%)`,
          }}
        />

        {tabs.map((tab, index) => {
          const selected = tab.id === value;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId(tab.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(tab.id)}
              aria-label={
                tab.count === undefined
                  ? undefined
                  : `${tab.label}, ${tab.count} ${tab.count === 1 ? "project" : "projects"}`
              }
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative z-10 flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-[13px] font-semibold transition-colors duration-200 sm:text-sm",
                selected
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]",
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-[10px] leading-none tabular-nums transition-colors duration-200",
                    selected
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-tertiary)]",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={panelId(tab.id)}
          aria-labelledby={tabId(tab.id)}
          tabIndex={0}
          hidden={tab.id !== value}
          className="mt-5"
        >
          {children(tab.id)}
        </div>
      ))}
    </div>
  );
}
