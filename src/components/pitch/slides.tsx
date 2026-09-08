import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { EYMark } from "./EYMark";

/* ----------------------------------------------------------------
   Shared primitives
-----------------------------------------------------------------*/

function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[0.68rem] font-medium uppercase tracking-[0.34em] text-[var(--color-ey)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Eyebrow({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4" data-rise data-d="1">
      <span className="font-mono text-[0.72rem] font-semibold text-[var(--color-ey)]">
        {index}
      </span>
      <span className="h-px w-10 bg-[var(--color-ey)]/50" />
      <Kicker className="text-[var(--color-text-tertiary)]">{title}</Kicker>
    </div>
  );
}

function Ghost({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="deck-ghost pointer-events-none absolute -right-2 bottom-[-3vh] -z-10 select-none font-serif font-semibold leading-none text-[var(--color-text-primary)]/[0.045]"
      style={{ fontSize: "clamp(14rem, 34vw, 30rem)" }}
    >
      {children}
    </span>
  );
}

function Slide({
  children,
  ghost,
  className,
}: {
  children: ReactNode;
  ghost?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-[clamp(1.5rem,5vw,5rem)]",
        className,
      )}
    >
      {ghost != null && <Ghost>{ghost}</Ghost>}
      {children}
    </div>
  );
}

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="border-l border-[var(--color-border)] pl-4">
      <div
        className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[0.95] text-[var(--color-text-primary)]"
        style={{ fontVariationSettings: "'opsz' 144" }}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
        {label}
      </div>
      {sub && (
        <div className="mt-1 text-[0.78rem] leading-snug text-[var(--color-text-tertiary)]">
          {sub}
        </div>
      )}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-3 py-1.5 font-mono text-[0.72rem] tracking-wide text-[var(--color-tag-text)]">
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   01 — Cover
-----------------------------------------------------------------*/

function Cover() {
  return (
    <Slide ghost="EY">
      <div className="flex items-center gap-3" data-rise data-d="1">
        <EYMark />
        <div className="leading-tight">
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]">
            Internship Pitch
          </div>
          <div className="font-grotesk text-sm font-semibold text-[var(--color-text-primary)]">
            Ernst &amp; Young — EY Nigeria
          </div>
        </div>
      </div>

      <h1
        className="mt-[clamp(1.5rem,4vh,3rem)] font-serif font-light leading-[0.92] text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(3rem,8.5vw,7rem)" }}
        data-rise
        data-d="2"
      >
        Abasiono
        <br />
        <span className="font-semibold italic text-[var(--color-ey)]">
          Mbat
        </span>
      </h1>

      <p
        className="mt-[clamp(1rem,3vh,2rem)] max-w-2xl text-[clamp(1rem,1.5vw,1.35rem)] leading-relaxed text-[var(--color-text-secondary)]"
        data-rise
        data-d="3"
      >
        Software engineer and second-year Computer Science student who ships
        products with measurable impact — and an argument for why I belong at
        EY.
      </p>

      <div
        className="mt-[clamp(1.5rem,5vh,3.5rem)] flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]"
        data-rise
        data-d="4"
      >
        <span>
          <span className="text-[var(--color-ey)]">●</span> Interview · Tue 9
          June 2026
        </span>
        <span>Pan-Atlantic University</span>
        <span>Lagos, Nigeria</span>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   02 — Profile
-----------------------------------------------------------------*/

function Profile() {
  return (
    <Slide ghost="01">
      <Eyebrow index="01" title="Who I am" />

      <div className="mt-[clamp(1.5rem,4vh,3rem)] grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2
            className="font-serif font-light leading-[1.02] text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(1.8rem,3.8vw,3.1rem)" }}
            data-rise
            data-d="2"
          >
            I build software that{" "}
            <span className="italic text-[var(--color-ey)]">people actually use</span> —
            and I lead the teams that build it.
          </h2>

          <p
            className="mt-6 max-w-xl text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-[var(--color-text-secondary)]"
            data-rise
            data-d="3"
          >
            I&apos;m a Computer Science undergraduate at Pan-Atlantic
            University, Lagos, on a{" "}
            <span className="text-[var(--color-text-primary)]">First Class</span> standing. As
            Software Lead of my campus&apos; Tech Innovation Club, I take
            products from idea to live deployment — most recently AI-driven
            tools and platforms serving hundreds of students.
          </p>

          <p
            className="mt-4 max-w-xl text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-[var(--color-text-secondary)]"
            data-rise
            data-d="4"
          >
            My focus sits exactly where EY is investing: applied{" "}
            <span className="text-[var(--color-text-primary)]">artificial intelligence</span>,
            reliable engineering, and technology that builds trust.
          </p>
        </div>

        <div
          className="flex flex-col justify-center gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_3px_rgba(16,16,18,0.04)] p-7 backdrop-blur-sm"
          data-rise
          data-d="5"
        >
          <div>
            <div className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
              Degree
            </div>
            <div className="mt-1 font-grotesk text-lg font-semibold text-[var(--color-text-primary)]">
              B.Sc. Computer Science
            </div>
            <div className="text-sm text-[var(--color-text-secondary)]">
              Pan-Atlantic University · Expected 2028
            </div>
          </div>
          <div className="h-px w-full bg-[var(--color-border)]" />
          <div>
            <div className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
              Standing
            </div>
            <div className="mt-1 font-grotesk text-lg font-semibold text-[var(--color-text-primary)]">
              4.67 / 5.00 CGPA{" "}
              <span className="text-[var(--color-ey)]">· First Class</span>
            </div>
          </div>
          <div className="h-px w-full bg-[var(--color-border)]" />
          <div>
            <div className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
              Role
            </div>
            <div className="mt-1 font-grotesk text-lg font-semibold text-[var(--color-text-primary)]">
              Software Lead
            </div>
            <div className="text-sm text-[var(--color-text-secondary)]">
              Tech Innovation Club
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   03 — Achievements
-----------------------------------------------------------------*/

function Achievements() {
  return (
    <Slide ghost="02">
      <Eyebrow index="02" title="Academic & career achievements" />

      <h2
        className="mt-[clamp(1rem,3vh,2rem)] font-serif font-light leading-tight text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(1.6rem,3.4vw,2.7rem)" }}
        data-rise
        data-d="2"
      >
        Numbers, not adjectives.
      </h2>

      <div
        className="mt-[clamp(1.5rem,4vh,2.5rem)] grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-4"
        data-rise
        data-d="3"
      >
        <Stat value="4.67" label="CGPA · First Class" sub="Out of 5.00" />
        <Stat value="800+" label="Monthly active users" sub="PAU Archive" />
        <Stat value="300+" label="Students served" sub="CBT exam platform" />
        <Stat value="10.5%" label="Click-through rate" sub="via SEO" />
      </div>

      <div
        className="mt-[clamp(1.5rem,4vh,2.5rem)] grid gap-4 md:grid-cols-3"
        data-rise
        data-d="4"
      >
        {[
          {
            t: "PAU Archive",
            d: "Centralised resource hub for university materials & past questions — now 800+ monthly active users.",
            tech: "Astro · TypeScript · PostgreSQL",
          },
          {
            t: "CBT Exam Platform",
            d: "JAMB practice with verified past questions, plus a Pathfinder for course discovery. 300+ active students.",
            tech: "Next.js · Prisma · tRPC",
          },
          {
            t: "Codespark & AI Chatbot",
            d: "Led the student tech event (3 sponsorships, 5+ startups) and shipped a Copilot Studio campus assistant.",
            tech: "React · Copilot Studio",
          },
        ].map((p) => (
          <div
            key={p.t}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_3px_rgba(16,16,18,0.04)] p-5 transition-colors hover:border-[var(--color-ey)]/40"
          >
            <div className="font-grotesk text-base font-semibold text-[var(--color-text-primary)]">
              {p.t}
            </div>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-[var(--color-text-secondary)]">
              {p.d}
            </p>
            <div className="mt-3 font-mono text-[0.66rem] tracking-wide text-[var(--color-text-tertiary)]">
              {p.tech}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   04 — Technical skills
-----------------------------------------------------------------*/

function Skills() {
  const groups = [
    { c: "Languages", items: ["TypeScript", "Go", "Python", "SQL"] },
    { c: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Astro"] },
    {
      c: "Backend & Data",
      items: ["Node.js", "Express", "PostgreSQL", "Prisma", "tRPC"],
    },
    { c: "Tooling", items: ["Git & GitHub", "Vercel", "Copilot Studio"] },
  ];
  const certs = [
    "Fundamentals of Deep Learning — NVIDIA",
    "Practical Prompt Engineering",
    "The Last Algorithms Course",
    "API Design in Node.js",
    "State Management in React",
  ];
  return (
    <Slide ghost="03">
      <Eyebrow index="03" title="Technical skills" />

      <div className="mt-[clamp(1.5rem,4vh,2.5rem)] grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.5fr_1fr]">
        <div
          className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2"
          data-rise
          data-d="2"
        >
          {groups.map((g) => (
            <div key={g.c}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-ey)]">
                  {g.c}
                </span>
                <span className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <Pill key={i}>{i}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_3px_rgba(16,16,18,0.04)] p-6"
          data-rise
          data-d="3"
        >
          <Kicker>Certified & studied</Kicker>
          <ul className="mt-4 space-y-3">
            {certs.map((c) => (
              <li key={c} className="flex gap-3 text-[0.86rem] leading-snug">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-ey)]" />
                <span className="text-[var(--color-text-secondary)]">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-[0.8rem] leading-relaxed text-[var(--color-text-tertiary)]">
            Comfortable across the stack, with a deliberate lean into{" "}
            <span className="text-[var(--color-text-primary)]">AI &amp; machine learning</span>.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   05 — Why EY should hire me
-----------------------------------------------------------------*/

function WhyEY() {
  const reasons = [
    {
      n: "01",
      t: "I ship, and it gets used",
      d: "Every project I list is live and measured — 800+ users here, 300+ there. I turn briefs into deployed products, not slideware.",
    },
    {
      n: "02",
      t: "AI-native, by training",
      d: "NVIDIA deep-learning fundamentals, prompt engineering, and a shipped AI assistant. I can help EY teams put EY.ai to work for clients.",
    },
    {
      n: "03",
      t: "I lead teams",
      d: "As Software Lead I coordinate developers, timelines and stakeholders across concurrent builds — the consulting muscle, already in motion.",
    },
    {
      n: "04",
      t: "Rooted in Nigeria, built for scale",
      d: "I understand the Lagos market and its fintech energy first-hand, and I pair it with global engineering standards.",
    },
  ];
  return (
    <Slide ghost="04">
      <Eyebrow index="04" title="Why EY should hire me" />

      <h2
        className="mt-[clamp(1rem,3vh,2rem)] max-w-3xl font-serif font-light leading-tight text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(1.6rem,3.4vw,2.7rem)" }}
        data-rise
        data-d="2"
      >
        EY builds a better working world. I bring the{" "}
        <span className="italic text-[var(--color-ey)]">builder&apos;s edge</span>{" "}
        to that mission.
      </h2>

      <div
        className="mt-[clamp(1.5rem,4vh,2.5rem)] grid gap-4 sm:grid-cols-2"
        data-rise
        data-d="3"
      >
        {reasons.map((r) => (
          <div
            key={r.n}
            className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_3px_rgba(16,16,18,0.04)] p-5 transition-colors hover:border-[var(--color-ey)]/45"
          >
            <span className="font-serif text-2xl font-semibold leading-none text-[var(--color-ey)]">
              {r.n}
            </span>
            <div>
              <div className="font-grotesk text-base font-semibold text-[var(--color-text-primary)]">
                {r.t}
              </div>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-[var(--color-text-secondary)]">
                {r.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   06 — Emerging technology trends
-----------------------------------------------------------------*/

function Trends() {
  const trends = [
    {
      t: "Agentic & Generative AI",
      d: "Over 70% of banking firms now use agentic AI; ~half of consumers already lean on AI for savings and investment decisions.",
      impact: "Automated audits, advisory copilots, AI-run service.",
    },
    {
      t: "Open Banking & APIs",
      d: "Nigeria's CBN open-banking framework opens secure data sharing across the financial system.",
      impact: "New revenue rails, embedded finance, deeper engagement.",
    },
    {
      t: "Stablecoins & Digital Assets",
      d: "Nigerian firms increasingly use dollar stablecoins to hedge currency risk and settle cross-border trade.",
      impact: "Faster settlement — and fresh compliance & tax questions.",
    },
    {
      t: "Cybersecurity & RegTech",
      d: "As AI adoption outpaces oversight, trust, model risk and regulation become board-level priorities.",
      impact: "Demand for assurance over AI, data and controls.",
    },
  ];
  return (
    <Slide ghost="05">
      <Eyebrow index="05" title="Emerging technology trends" />

      <h2
        className="mt-[clamp(0.8rem,2.5vh,1.6rem)] max-w-3xl font-serif font-light leading-tight text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(1.5rem,3.2vw,2.5rem)" }}
        data-rise
        data-d="2"
      >
        The forces reshaping{" "}
        <span className="italic text-[var(--color-ey)]">financial services</span>.
      </h2>

      <div
        className="mt-[clamp(1.2rem,3.5vh,2rem)] grid gap-4 sm:grid-cols-2"
        data-rise
        data-d="3"
      >
        {trends.map((t) => (
          <div
            key={t.t}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_3px_rgba(16,16,18,0.04)] p-5"
          >
            <div className="font-grotesk text-base font-semibold text-[var(--color-text-primary)]">
              {t.t}
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-[var(--color-text-secondary)]">
              {t.d}
            </p>
            <div className="mt-3 flex items-start gap-2 border-t border-[var(--color-border)] pt-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-ey)]">
                Impact
              </span>
              <span className="text-[0.8rem] leading-snug text-[var(--color-text-tertiary)]">
                {t.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   07 — Opportunities for EY Nigeria
-----------------------------------------------------------------*/

function Opportunities() {
  const rows = [
    {
      line: "Assurance",
      o: "AI-assisted continuous audit and assurance over the AI models themselves — building trust where adoption outpaces oversight.",
    },
    {
      line: "Consulting · EY.ai",
      o: "GenAI transformation for Nigerian banks, open-banking API platforms, cybersecurity and Chief-AI-Officer enablement.",
    },
    {
      line: "Tax",
      o: "Compliance for stablecoins and digital assets, plus automated cross-border reporting as transactions go on-chain.",
    },
    {
      line: "Strategy & Transactions",
      o: "EY-Parthenon advising on fintech M&A and capital allocation in a market with 430+ fintechs and $2bn+ raised in 2024.",
    },
  ];
  return (
    <Slide ghost="06">
      <Eyebrow index="06" title="Opportunities for EY Nigeria" />

      <div className="mt-[clamp(1rem,3vh,2rem)] grid gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[1fr_1.55fr]">
        <div data-rise data-d="2">
          <h2
            className="font-serif font-light leading-tight text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(1.5rem,3.2vw,2.4rem)" }}
          >
            Every trend maps to a{" "}
            <span className="italic text-[var(--color-ey)]">service line</span>.
          </h2>
          <div className="mt-6 space-y-4">
            <Stat value="430+" label="Fintech startups in Nigeria" />
            <Stat value="$1.4B" label="EY's investment in EY.ai" sub="EYQ LLM across all service lines" />
          </div>
          <p className="mt-6 max-w-sm text-[0.84rem] leading-relaxed text-[var(--color-text-tertiary)]">
            EY Nigeria is already co-developing the country&apos;s next-gen open
            banking API standard. I want to help build it.
          </p>
        </div>

        <div className="space-y-3" data-rise data-d="3">
          {rows.map((r) => (
            <div
              key={r.line}
              className="flex flex-col gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_1px_3px_rgba(16,16,18,0.04)] p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
            >
              <div className="w-full shrink-0 font-grotesk text-sm font-bold text-[var(--color-ey)] sm:w-44">
                {r.line}
              </div>
              <p className="text-[0.84rem] leading-snug text-[var(--color-text-secondary)]">
                {r.o}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   08 — Close
-----------------------------------------------------------------*/

function Closing() {
  return (
    <Slide ghost="EY">
      <div data-rise data-d="1">
        <Kicker>Thank you</Kicker>
      </div>

      <h2
        className="mt-5 max-w-4xl font-serif font-light leading-[1.02] text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(2.2rem,6vw,5rem)" }}
        data-rise
        data-d="2"
      >
        Let&apos;s build a{" "}
        <span className="font-semibold italic text-[var(--color-ey)]">
          better working world
        </span>{" "}
        — together.
      </h2>

      <p
        className="mt-6 max-w-xl text-[clamp(0.95rem,1.4vw,1.2rem)] leading-relaxed text-[var(--color-text-secondary)]"
        data-rise
        data-d="3"
      >
        I&apos;d be proud to bring my engineering, AI fluency and drive to EY
        Nigeria. I&apos;m ready to start.
      </p>

      <div
        className="mt-[clamp(2rem,6vh,3.5rem)] flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.78rem] tracking-wide text-[var(--color-text-secondary)]"
        data-rise
        data-d="4"
      >
        <span>
          <span className="text-[var(--color-ey)]">✉</span>{" "}
          abasiono.mbat@gmail.com
        </span>
        <span>
          <span className="text-[var(--color-ey)]">↗</span>{" "}
          linkedin.com/in/abasionombat
        </span>
        <span>
          <span className="text-[var(--color-ey)]">↗</span> github.com/AJ-505
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3" data-rise data-d="5">
        <EYMark className="h-9 w-9" />
        <span className="font-grotesk text-sm font-semibold text-[var(--color-text-primary)]">
          Abasiono Mbat × EY
        </span>
      </div>
    </Slide>
  );
}

/* ----------------------------------------------------------------
   Deck manifest
-----------------------------------------------------------------*/

export interface SlideDef {
  id: string;
  label: string;
  node: ReactNode;
}

export const SLIDES: SlideDef[] = [
  { id: "cover", label: "Cover", node: <Cover /> },
  { id: "profile", label: "Who I am", node: <Profile /> },
  { id: "achievements", label: "Achievements", node: <Achievements /> },
  { id: "skills", label: "Technical skills", node: <Skills /> },
  { id: "why", label: "Why EY", node: <WhyEY /> },
  { id: "trends", label: "Tech trends", node: <Trends /> },
  { id: "opportunities", label: "Opportunities", node: <Opportunities /> },
  { id: "close", label: "Close", node: <Closing /> },
];
