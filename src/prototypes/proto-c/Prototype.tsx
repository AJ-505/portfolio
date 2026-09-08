import { useEffect, useRef, useState } from "react";
import "./proto.css";

type Detail = {
  no: string;
  title: string;
  spec: string;
  dims: { value: string; label: string }[];
  material: string;
  url?: string;
  urlLabel?: string;
};

const details: Detail[] = [
  {
    no: "01",
    title: "CBT Platform",
    spec: "Verified JAMB past questions with course discovery via School Pathfinder.",
    dims: [{ value: "300+", label: "students practising" }],
    material: "Next.js · Prisma · tRPC",
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform.vercel.app",
  },
  {
    no: "02",
    title: "PAU Archive",
    spec: "Centralised resource hub for Pan-Atlantic University student materials.",
    dims: [{ value: "800+", label: "monthly active users" }],
    material: "Astro · TypeScript · PostgreSQL",
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
  },
  {
    no: "03",
    title: "Codespark",
    spec: "Official site for a campus tech event and the movement behind it.",
    dims: [
      { value: "100+", label: "members" },
      { value: "3", label: "sponsorships" },
      { value: "5+", label: "startups" },
    ],
    material: "Next.js · React · TypeScript",
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub.vercel.app",
  },
  {
    no: "04",
    title: "TIC Website",
    spec: "Official club website. SEO work that produced measurable lift.",
    dims: [{ value: "10.5%", label: "click-through rate" }],
    material: "Next.js · React · TypeScript",
    url: "https://techinnovationclub.com",
    urlLabel: "techinnovationclub.com",
  },
];

const bom = [
  { ref: "LANG", items: "TypeScript · Go · SQL · Python" },
  { ref: "FRONT", items: "React · Next.js · Tailwind CSS" },
  { ref: "BACK", items: "Node.js · Express · PostgreSQL · Prisma · tRPC" },
  { ref: "TOOL", items: "Git · GitHub · Vercel" },
];

const standards = [
  { code: "NVIDIA-DL", title: "Fundamentals of Deep Learning" },
  { code: "FM-ALG", title: "The Last Algorithms Course" },
  { code: "FM-API", title: "API Design in Node.js" },
  { code: "FM-PERF", title: "Blazingly Fast JavaScript" },
  { code: "FM-PE", title: "Practical Prompt Engineering" },
  { code: "FM-RS", title: "State Management in React" },
];

function useDraw() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, drawn };
}

export function Prototype() {
  const { ref: heroRef, drawn: heroDrawn } = useDraw();

  return (
    <div className="pc3-root">
      <div className="pc3-grid" aria-hidden="true" />

      <div className="pc3-sheet">
        <header className="pc3-drawing-head">
          <div className="pc3-dwg-no">
            <span className="pc3-mono-sm">DRAWING NO.</span>
            <span className="pc3-mono-val">SE—2026—001</span>
          </div>
          <a
            className="pc3-ref-link"
            href="/abasiono-mbat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            REF: CV.PDF ↗
          </a>
        </header>

        <section className="pc3-hero" ref={heroRef}>
          <div className="pc3-hero-grid">
            <div className="pc3-hero-label">
              <span className="pc3-mono-sm">PROJECT</span>
            </div>
            <div className="pc3-hero-body">
              <h1 className="pc3-title">ABASIONO MBAT</h1>
              <p className="pc3-subtitle">Software Engineer · Web Technologies</p>
            </div>
          </div>

          <div className={`pc3-hero-dim ${heroDrawn ? "pc3-drawn" : ""}`}>
            <svg viewBox="0 0 600 56" preserveAspectRatio="none" className="pc3-dim-svg">
              <line className="pc3-dim-ext" x1="60" y1="6" x2="60" y2="24" />
              <line className="pc3-dim-ext" x1="540" y1="6" x2="540" y2="24" />
              <line className="pc3-dim-line" x1="60" y1="36" x2="540" y2="36" />
              <polygon className="pc3-dim-arrow" points="60,36 70,31 70,41" />
              <polygon className="pc3-dim-arrow" points="540,36 530,31 530,41" />
            </svg>
            <span className="pc3-dim-text pc3-mono-sm">2ND YEAR CS · PAN-ATLANTIC UNIVERSITY · LAGOS</span>
          </div>

          <p className="pc3-hero-note">
            Builds web products that meet people where they are, then make the
            next step feel obvious. Currently Software Lead, Tech Innovation Club.
          </p>
        </section>

        <div className="pc3-section-label">
          <span className="pc3-rule" />
          <span className="pc3-mono-label">DETAIL VIEWS</span>
          <span className="pc3-rule" />
        </div>

        {details.map((d) => (
          <DetailPanel key={d.no} detail={d} />
        ))}

        <div className="pc3-section-label">
          <span className="pc3-rule" />
          <span className="pc3-mono-label">BILL OF MATERIALS</span>
          <span className="pc3-rule" />
        </div>

        <section className="pc3-bom">
          {bom.map((b) => (
            <div className="pc3-bom-row" key={b.ref}>
              <span className="pc3-bom-ref pc3-mono-sm">{b.ref}</span>
              <span className="pc3-bom-items">{b.items}</span>
            </div>
          ))}
        </section>

        <div className="pc3-section-label">
          <span className="pc3-rule" />
          <span className="pc3-mono-label">STANDARDS COMPLIANCE</span>
          <span className="pc3-rule" />
        </div>

        <section className="pc3-standards">
          {standards.map((s) => (
            <div className="pc3-std" key={s.code}>
              <span className="pc3-std-code pc3-mono-sm">{s.code}</span>
              <span className="pc3-std-title">{s.title}</span>
            </div>
          ))}
        </section>

        <footer className="pc3-titleblock">
          <div className="pc3-tb-cell pc3-tb-cell--lg">
            <span className="pc3-tb-label">DRAWN BY</span>
            <span className="pc3-tb-value">Abasiono Mbat</span>
          </div>
          <div className="pc3-tb-cell">
            <span className="pc3-tb-label">DATE</span>
            <span className="pc3-tb-value">2026</span>
          </div>
          <div className="pc3-tb-cell">
            <span className="pc3-tb-label">SCALE</span>
            <span className="pc3-tb-value">1:1</span>
          </div>
          <div className="pc3-tb-cell">
            <span className="pc3-tb-label">SHEET</span>
            <span className="pc3-tb-value">1 / 1</span>
          </div>
          <div className="pc3-tb-cell pc3-tb-contact">
            <a href="mailto:abasiono.mbat@gmail.com" className="pc3-tb-value pc3-tb-email">
              abasiono.mbat@gmail.com
            </a>
            <nav className="pc3-tb-socials">
              <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GH</a>
              <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LI</a>
              <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DetailPanel({ detail }: { detail: Detail }) {
  const { ref, drawn } = useDraw();

  return (
    <section className="pc3-detail" id={`d${detail.no}`} ref={ref}>
      <div className="pc3-detail-head">
        <span className="pc3-detail-no pc3-mono-sm">D{detail.no}</span>
        <h2 className="pc3-detail-title">{detail.title}</h2>
      </div>

      <p className="pc3-detail-spec">{detail.spec}</p>

      <div className={`pc3-detail-dims ${drawn ? "pc3-drawn" : ""}`}>
        {detail.dims.map((dim, i) => (
          <div className="pc3-dim-block" key={i}>
            <svg viewBox="0 0 200 48" preserveAspectRatio="none" className="pc3-dim-svg pc3-dim-svg--sm">
              <line className="pc3-dim-ext" x1="16" y1="6" x2="16" y2="20" />
              <line className="pc3-dim-ext" x1="184" y1="6" x2="184" y2="20" />
              <line className="pc3-dim-line" x1="16" y1="30" x2="184" y2="30" />
              <polygon className="pc3-dim-arrow" points="16,30 26,25 26,35" />
              <polygon className="pc3-dim-arrow" points="184,30 174,25 174,35" />
            </svg>
            <span className="pc3-dim-value">{dim.value}</span>
            <span className="pc3-dim-label pc3-mono-sm">{dim.label}</span>
          </div>
        ))}
      </div>

      <div className="pc3-detail-foot">
        <span className="pc3-detail-mat pc3-mono-sm">MATERIAL: {detail.material}</span>
        {detail.url && (
          <a
            className="pc3-detail-url"
            href={detail.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {detail.urlLabel} ↗
          </a>
        )}
      </div>
    </section>
  );
}
