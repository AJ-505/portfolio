import { useEffect, useRef, useState } from "react";
import "./proto.css";

type Star = {
  id: string;
  name: string;
  desc: string;
  tech: string[];
  stats: string;
  url?: string;
  urlLabel?: string;
  links?: { href: string; label: string }[];
  // percentage positions on the sky chart
  x: number;
  y: number;
  mag: number; // brightness 1-3
};

const stars: Star[] = [
  {
    id: "s1",
    name: "CBT Platform",
    desc: "300+ students practicing JAMB with verified past questions, integrated with School Pathfinder for course discovery.",
    tech: ["Next.js", "Prisma", "tRPC"],
    stats: "RA 05h · Dec +12° · Mag 1.0",
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform.vercel.app",
    x: 22, y: 30, mag: 3,
  },
  {
    id: "s2",
    name: "PAU Archive",
    desc: "800+ monthly active users. Centralized resource hub for Pan-Atlantic University student materials.",
    tech: ["Astro", "TypeScript", "PostgreSQL"],
    stats: "RA 07h · Dec −03° · Mag 0.8",
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
    x: 50, y: 20, mag: 3,
  },
  {
    id: "s3",
    name: "Codespark",
    desc: "Official site for the student tech event. 100+ members, 3 sponsorships, 5+ startups emerged.",
    tech: ["Next.js", "React", "TypeScript"],
    stats: "RA 09h · Dec +18° · Mag 1.2",
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub.vercel.app",
    x: 72, y: 38, mag: 2,
  },
  {
    id: "s4",
    name: "Club builds",
    desc: "TIC website at 10.5% CTR via SEO. Also built SST Makerspace and Living Green club sites.",
    tech: ["Next.js", "React", "Copilot Studio"],
    stats: "RA 11h · Dec −08° · Mag 1.5",
    links: [
      { href: "https://techinnovationclub.com", label: "techinnovationclub.com" },
      { href: "https://sst-makerspace.vercel.app", label: "sst-makerspace" },
      { href: "https://living-green-pau.netlify.app", label: "living-green" },
    ],
    x: 38, y: 62, mag: 2,
  },
  {
    id: "s5",
    name: "AI Campus Chatbot",
    desc: "Handles student queries about school policies, staff, and lecturers — built on Microsoft Copilot Studio.",
    tech: ["Copilot Studio"],
    stats: "RA 03h · Dec +22° · Mag 2.0",
    x: 85, y: 68, mag: 1,
  },
];

// constellation lines connect stars by id
const lines: [string, string][] = [
  ["s1", "s2"],
  ["s2", "s3"],
  ["s2", "s4"],
  ["s3", "s5"],
];

const bgStars = Array.from({ length: 60 }).map((_, i) => ({
  id: `bg${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 0.5,
  dur: Math.random() * 4 + 2,
  delay: Math.random() * 4,
}));

export function Prototype() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const skyRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = skyRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: cx * 16, y: cy * 16 });
    };
    const el = skyRef.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, []);

  const star = stars.find((s) => s.id === selected);

  const starPos = (id: string) => {
    const s = stars.find((x) => x.id === id);
    return s ? { x: s.x, y: s.y } : { x: 0, y: 0 };
  };

  return (
    <div className="con-root">
      <div className="con-stars-bg" aria-hidden="true">
        {bgStars.map((s) => (
          <div
            className="con-bgstar"
            key={s.id}
            style={{
              left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
              ["--dur" as string]: `${s.dur}s`, ["--delay" as string]: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="con-wrap">
        <a className="con-back" href="/1">← INDEX</a>

        <header className="con-hero">
          <div className="con-eyebrow">Star Chart · Portfolio</div>
          <h1 className="con-name">Abasiono <em>Mbat</em></h1>
          <p className="con-role">Software Engineer — charting the web, one system at a time.</p>
        </header>

        <div
          className={"con-sky-frame" + (revealed ? " revealed" : "")}
          ref={skyRef}
          role="group"
          aria-label="Interactive star chart of projects"
        >
          <svg className="con-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {lines.map(([a, b]) => {
              const pa = starPos(a);
              const pb = starPos(b);
              return (
                <line key={`${a}-${b}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} />
              );
            })}
          </svg>

          {stars.map((s) => (
            <button
              key={s.id}
              className={"con-star" + (selected === s.id ? " active" : "")}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.mag * 6 + 8,
                height: s.mag * 6 + 8,
                transform: `translate(${parallax.x * (s.mag / 3)}px, ${parallax.y * (s.mag / 3)}px)`,
              }}
              onClick={() => setSelected(s.id)}
              aria-label={`${s.name} — click to read details`}
            >
              <span className="con-star-label" style={{ left: "100%", top: "50%" }}>{s.name}</span>
            </button>
          ))}

          <div className="con-sky-legend">
            <span>●</span> {stars.length} catalogued bodies · hover &amp; click to chart
          </div>
        </div>

        <div className="con-detail">
          {star ? (
            <>
              <div className="con-detail-coord">{star.stats}</div>
              <h2 className="con-detail-title">{star.name}</h2>
              <p className="con-detail-desc">{star.desc}</p>
              <div className="con-detail-meta">
                {star.tech.map((t) => <span className="con-tech-pill" key={t}>{t}</span>)}
              </div>
              {star.url && (
                <a className="con-detail-link" href={star.url} target="_blank" rel="noopener noreferrer">
                  ↗ {star.urlLabel}
                </a>
              )}
              {star.links && (
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {star.links.map((l) => (
                    <a key={l.href} className="con-detail-link" href={l.href} target="_blank" rel="noopener noreferrer" style={{ marginTop: 0 }}>
                      ↗ {l.label}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="con-detail-empty">Click a star to read its catalogue entry.</p>
          )}
        </div>

        <section className="con-atlas">
          <h3 className="con-atlas-title">Reference atlas <span>instrumentation &amp; credentials</span></h3>
          <div className="con-atlas-grid">
            <div className="con-atlas-card">
              <div className="con-atlas-cat">Languages</div>
              <div className="con-atlas-items">TypeScript · Go · SQL · Python</div>
            </div>
            <div className="con-atlas-card">
              <div className="con-atlas-cat">Frontend</div>
              <div className="con-atlas-items">React · Next.js · Tailwind</div>
            </div>
            <div className="con-atlas-card">
              <div className="con-atlas-cat">Backend</div>
              <div className="con-atlas-items">Node · Express · PostgreSQL · Prisma · tRPC</div>
            </div>
            <div className="con-atlas-card">
              <div className="con-atlas-cat">Certified</div>
              <div className="con-atlas-items">NVIDIA DL · 5× Frontend Masters</div>
            </div>
            <div className="con-atlas-card">
              <div className="con-atlas-cat">Observatory</div>
              <div className="con-atlas-items">2nd yr CS, Pan-Atlantic Univ · Lagos, NG · Software Lead, TIC</div>
            </div>
          </div>
        </section>

        <footer className="con-foot">
          <p>© 2026 Abasiono Mbat · Lagos, Nigeria</p>
          <p>
            <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub</a> ·{" "}
            <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{" "}
            <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
