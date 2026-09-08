import { useEffect, useRef, useState } from "react";
import "./proto.css";

type Panel = {
  id: string;
  fig: string;
  projectName: string;
  title: string;
  detail: string;
  metric: string;
  metricLabel: string;
  stack: string;
  url?: string;
};

const panels: Panel[] = [
  {
    id: "p1",
    fig: "✦",
    projectName: "CBT Platform",
    title: "PRACTISE WITH REAL QUESTIONS",
    detail: "JAMB past questions verified and served to 300+ students.",
    metric: "300+",
    metricLabel: "students practising",
    stack: "Next.js · Prisma · tRPC",
    url: "https://pau-cbt-platform.vercel.app",
  },
  {
    id: "p2",
    fig: "❖",
    projectName: "PAU Archive",
    title: "FIND THE MATERIAL YOU NEED",
    detail: "A centralised hub for Pan-Atlantic University student resources.",
    metric: "800+",
    metricLabel: "monthly active users",
    stack: "Astro · TypeScript · PostgreSQL",
    url: "https://pauarchive.com",
  },
  {
    id: "p3",
    fig: "✸",
    projectName: "Codespark",
    title: "SPARK A TECH MOVEMENT",
    detail: "Official site for a campus event that grew a real community.",
    metric: "100+",
    metricLabel: "members · 5+ startups",
    stack: "Next.js · React · TypeScript",
    url: "https://codesparkhub.vercel.app",
  },
  {
    id: "p4",
    fig: "◆",
    projectName: "TIC Website",
    title: "MAKE DISCOVERY OBVIOUS",
    detail: "Club website optimised for search and measurable lift.",
    metric: "10.5%",
    metricLabel: "click-through rate",
    stack: "Next.js · React · TypeScript",
    url: "https://techinnovationclub.com",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function Prototype() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div className="pd4-root">
      {/* safety-orange edge stripe, runs down the page */}
      <div className="pd4-stripe" aria-hidden="true" />

      <div className="pd4-card">
        <header className="pd4-header">
          <div className="pd4-brand">
            <span className="pd4-brand-mark">AM</span>
            <span className="pd4-brand-name">SAFETY INSTRUCTION CARD</span>
          </div>
          <a
            className="pd4-cv"
            href="/abasiono-mbat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV.PDF
          </a>
        </header>

        <section className="pd4-hero" ref={ref}>
          <div className="pd4-hero-fig">
            <span className="pd4-hero-figmark">✺</span>
          </div>
          <div className="pd4-hero-body">
            <p className="pd4-hero-kicker">OPERATED BY</p>
            <h1 className="pd4-hero-name">Abasiono Mbat</h1>
            <p className="pd4-hero-role">Software Engineer · Web Technologies</p>
            <p className="pd4-hero-note">
              Builds web products that meet people where they are, then make the
              next step feel obvious.
            </p>
          </div>
          <div className="pd4-hero-stamp">
            <span className="pd4-stamp-circle">
              <span className="pd4-stamp-top">FOR YOUR</span>
              <span className="pd4-stamp-mid">REVIEW</span>
              <span className="pd4-stamp-bot">2026</span>
            </span>
          </div>
        </section>

        <div className="pd4-divider">
          <span className="pd4-divider-label">INSTRUCTION SEQUENCE</span>
        </div>

        <div className="pd4-panels">
          {panels.map((p, i) => (
            <PanelCard key={p.id} panel={p} index={i} />
          ))}
        </div>

        <div className="pd4-divider">
          <span className="pd4-divider-label">TOOLKIT &amp; STANDARDS</span>
        </div>

        <section className="pd4-toolkit">
          <div className="pd4-toolkit-block">
            <h3 className="pd4-block-label">LANGUAGES</h3>
            <p className="pd4-block-items">TypeScript · Go · SQL · Python</p>
          </div>
          <div className="pd4-toolkit-block">
            <h3 className="pd4-block-label">FRONTEND</h3>
            <p className="pd4-block-items">React · Next.js · Tailwind CSS</p>
          </div>
          <div className="pd4-toolkit-block">
            <h3 className="pd4-block-label">BACKEND</h3>
            <p className="pd4-block-items">Node.js · Express · PostgreSQL · Prisma · tRPC</p>
          </div>
          <div className="pd4-toolkit-block">
            <h3 className="pd4-block-label">TOOLS</h3>
            <p className="pd4-block-items">Git · GitHub · Vercel</p>
          </div>
        </section>

        <section className="pd4-certgrid">
          {[
            ["NVIDIA", "Fundamentals of Deep Learning"],
            ["Frontend Masters", "The Last Algorithms Course"],
            ["Frontend Masters", "API Design in Node.js"],
            ["Frontend Masters", "Blazingly Fast JavaScript"],
            ["Frontend Masters", "Practical Prompt Engineering"],
            ["Frontend Masters", "State Management in React"],
          ].map(([src, title]) => (
            <div className="pd4-cert" key={title}>
              <span className="pd4-cert-src">{src}</span>
              <span className="pd4-cert-title">{title}</span>
            </div>
          ))}
        </section>

        <footer className="pd4-foot" id="contact">
          <div className="pd4-foot-cta">
            <p className="pd4-foot-line">FOR INQUIRIES, CONTACT OPERATOR:</p>
            <a className="pd4-foot-email" href="mailto:abasiono.mbat@gmail.com">
              abasiono.mbat@gmail.com
            </a>
          </div>
          <nav className="pd4-foot-socials" aria-label="Social links">
            <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X ↗</a>
          </nav>
          <p className="pd4-foot-meta">
            2nd Year CS · Pan-Atlantic University · Lagos, Nigeria · © 2026
          </p>
        </footer>
      </div>
    </div>
  );
}

function PanelCard({ panel, index }: { panel: Panel; index: number }) {
  return (
    <article className="pd4-panel" style={{ "--pd4-step": index + 1 } as React.CSSProperties}>
      <div className="pd4-panel-step">
        <span className="pd4-step-num">{index + 1}</span>
      </div>
      <div className="pd4-panel-fig">
        <span className="pd4-figmark">{panel.fig}</span>
      </div>
      <div className="pd4-panel-body">
        <h2 className="pd4-panel-title">{panel.title}</h2>
        <p className="pd4-panel-project">{panel.projectName}</p>
        <p className="pd4-panel-detail">{panel.detail}</p>
      </div>
      <div className="pd4-panel-metric">
        <span className="pd4-metric-value">{panel.metric}</span>
        <span className="pd4-metric-label">{panel.metricLabel}</span>
      </div>
      <div className="pd4-panel-foot">
        <span className="pd4-panel-stack">{panel.stack}</span>
        {panel.url && (
          <a className="pd4-panel-url" href={panel.url} target="_blank" rel="noopener noreferrer">
            Visit ↗
          </a>
        )}
      </div>
    </article>
  );
}
