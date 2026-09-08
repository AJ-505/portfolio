import { useEffect, useRef, useState } from "react";
import "./proto.css";

type Stamp = {
  id: string;
  country: string;
  denomination: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  color: string;
  postmark: string;
  url?: string;
  urlLabel?: string;
};

const stamps: Stamp[] = [
  {
    id: "st1",
    country: "CBT",
    denomination: "300+",
    title: "CBT Platform",
    description: "Verified JAMB past questions, course discovery via School Pathfinder.",
    metric: "300+",
    metricLabel: "students practising",
    color: "#b8421c",
    postmark: "LAGOS · 2025",
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform.vercel.app",
  },
  {
    id: "st2",
    country: "PAU",
    denomination: "800+",
    title: "PAU Archive",
    description: "Centralised resource hub for Pan-Atlantic University.",
    metric: "800+",
    metricLabel: "monthly active users",
    color: "#1c5d9e",
    postmark: "LAGOS · 2024",
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
  },
  {
    id: "st3",
    country: "CSK",
    denomination: "100+",
    title: "Codespark",
    description: "Official site for a campus tech event. Grew a movement.",
    metric: "100+",
    metricLabel: "members · 5+ startups",
    color: "#2a7a3f",
    postmark: "PAU · 2024",
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub.vercel.app",
  },
  {
    id: "st4",
    country: "TIC",
    denomination: "10.5%",
    title: "TIC Website",
    description: "Club website tuned for search and measurable lift.",
    metric: "10.5%",
    metricLabel: "click-through rate",
    color: "#7c3aed",
    postmark: "LAGOS · 2025",
    url: "https://techinnovationclub.com",
    urlLabel: "techinnovationclub.com",
  },
];

const collection = [
  { section: "Languages", items: "TypeScript · Go · SQL · Python" },
  { section: "Frontend", items: "React · Next.js · Tailwind CSS" },
  { section: "Backend", items: "Node.js · Express · PostgreSQL · Prisma · tRPC" },
  { section: "Tools", items: "Git · GitHub · Vercel" },
];

const cancellations = [
  { code: "NVIDIA-DL", title: "Fundamentals of Deep Learning", place: "NVIDIA" },
  { code: "FM-ALG", title: "The Last Algorithms Course", place: "Frontend Masters" },
  { code: "FM-API", title: "API Design in Node.js", place: "Frontend Masters" },
  { code: "FM-PERF", title: "Blazingly Fast JavaScript", place: "Frontend Masters" },
  { code: "FM-PE", title: "Practical Prompt Engineering", place: "Frontend Masters" },
  { code: "FM-RS", title: "State Management in React", place: "Frontend Masters" },
];

function useInView<T extends HTMLElement>(threshold = 0.3) {
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Prototype() {
  return (
    <div className="pg7-root">
      <div className="pg7-paper" aria-hidden="true" />

      <div className="pg7-album">
        <header className="pg7-head">
          <div className="pg7-head-brand">
            <span className="pg7-head-mono">PHILATELIC COLLECTION</span>
            <h1 className="pg7-head-name">Abasiono Mbat</h1>
            <p className="pg7-head-role">Software Engineer · Web Technologies</p>
          </div>
          <a
            className="pg7-head-cv"
            href="/abasiono-mbat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV.PDF
          </a>
        </header>

        <section className="pg7-intro">
          <div className="pg7-intro-rule" />
          <p className="pg7-intro-text">
            A catalogue of shipped work. Each stamp records a real product, its
            denomination a measurable result, its postmark the place and year it
            was issued. Currently Software Lead, Tech Innovation Club.
          </p>
          <div className="pg7-intro-rule" />
        </section>

        <div className="pg7-page-label">
          <span className="pg7-hinge pg7-hinge--l" />
          <span className="pg7-page-text">PAGE 01 — FEATURED ISSUES</span>
          <span className="pg7-hinge pg7-hinge--r" />
        </div>

        <section className="pg7-stamps">
          {stamps.map((s, i) => (
            <StampFrame key={s.id} stamp={s} index={i} />
          ))}
        </section>

        <div className="pg7-page-label">
          <span className="pg7-hinge pg7-hinge--l" />
          <span className="pg7-page-text">PAGE 02 — COLLECTION INDEX</span>
          <span className="pg7-hinge pg7-hinge--r" />
        </div>

        <section className="pg7-collection">
          {collection.map((c) => (
            <div className="pg7-col-row" key={c.section}>
              <span className="pg7-col-section">{c.section}</span>
              <span className="pg7-col-items">{c.items}</span>
            </div>
          ))}
        </section>

        <div className="pg7-page-label">
          <span className="pg7-hinge pg7-hinge--l" />
          <span className="pg7-page-text">PAGE 03 — CANCELLATION MARKS</span>
          <span className="pg7-hinge pg7-hinge--r" />
        </div>

        <section className="pg7-cancellations">
          {cancellations.map((c) => (
            <div className="pg7-cancel" key={c.code}>
              <div className="pg7-cancel-mark" aria-hidden="true">
                <svg viewBox="0 0 64 64" className="pg7-cancel-svg">
                  <circle cx="32" cy="32" r="30" className="pg7-cancel-ring" />
                  <circle cx="32" cy="32" r="24" className="pg7-cancel-ring" />
                  <line x1="6" y1="32" x2="58" y2="32" className="pg7-cancel-bar" />
                  <line x1="32" y1="6" x2="32" y2="58" className="pg7-cancel-bar" />
                </svg>
              </div>
              <div className="pg7-cancel-body">
                <span className="pg7-cancel-code">{c.code}</span>
                <span className="pg7-cancel-title">{c.title}</span>
                <span className="pg7-cancel-place">{c.place}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="pg7-foot" id="contact">
          <div className="pg7-foot-rule" />
          <p className="pg7-foot-cta">Post your enquiry to the curator.</p>
          <a className="pg7-foot-email" href="mailto:abasiono.mbat@gmail.com">
            abasiono.mbat@gmail.com
          </a>
          <nav className="pg7-foot-socials" aria-label="Social links">
            <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X ↗</a>
          </nav>
          <p className="pg7-foot-meta">
            © 2026 Abasiono Mbat · Lagos, Nigeria · 2nd Year CS, Pan-Atlantic University
          </p>
        </footer>
      </div>
    </div>
  );
}

function StampFrame({ stamp, index }: { stamp: Stamp; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <article
      className={`pg7-stamp ${inView ? "pg7-stamp--in" : ""}`}
      style={{
        "--pg7-stamp-color": stamp.color,
        "--pg7-delay": `${index * 0.12}s`,
      } as React.CSSProperties}
      ref={ref}
    >
      <div className="pg7-stamp-paper">
        {/* perforated border via radial gradient notches */}
        <div className="pg7-perf pg7-perf--top" aria-hidden="true" />
        <div className="pg7-perf pg7-perf--bottom" aria-hidden="true" />
        <div className="pg7-perf pg7-perf--left" aria-hidden="true" />
        <div className="pg7-perf pg7-perf--right" aria-hidden="true" />

        <div className="pg7-stamp-inner">
          <header className="pg7-stamp-head">
            <span className="pg7-stamp-country">{stamp.country}</span>
            <span className="pg7-stamp-denom">{stamp.denomination}</span>
          </header>

          <div className="pg7-stamp-vignette" aria-hidden="true">
            <span className="pg7-stamp-fig">
              {["✦", "✺", "✸", "◆"][index % 4]}
            </span>
          </div>

          <div className="pg7-stamp-body">
            <h2 className="pg7-stamp-title">{stamp.title}</h2>
            <p className="pg7-stamp-desc">{stamp.description}</p>
          </div>

          <footer className="pg7-stamp-foot">
            <span className="pg7-stamp-postmark">{stamp.postmark}</span>
            {stamp.url && (
              <a
                className="pg7-stamp-url"
                href={stamp.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stamp.urlLabel} ↗
              </a>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
