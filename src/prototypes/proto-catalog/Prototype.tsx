import { useState } from "react";
import "./proto.css";

type Card = {
  id: string;
  call: string;
  title: string;
  desc: string;
  back: string;
  meta: string[];
  stamp?: string;
  url?: string;
  urlLabel?: string;
  links?: { href: string; label: string }[];
};

const cards: Card[] = [
  {
    id: "c1",
    call: "QA 76.76 · A1",
    title: "CBT Platform",
    desc: "300+ students practicing JAMB with verified past questions. Integrated with School Pathfinder for course discovery.",
    back: "Shipped to production. The integration with School Pathfinder meant a student could fail a mock, find a better-fit course, and re-register in one flow.",
    meta: ["Next.js", "Prisma", "tRPC"],
    stamp: "LIVE",
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform.vercel.app",
  },
  {
    id: "c2",
    call: "QA 76.76 · A2",
    title: "PAU Archive",
    desc: "800+ monthly active users. Centralized resource hub for Pan-Atlantic University student materials and past questions.",
    back: "Built on Astro for speed. The real win was the taxonomy — cataloguing years of scattered PDFs into one searchable index.",
    meta: ["Astro", "TypeScript", "PostgreSQL"],
    stamp: "LIVE",
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
  },
  {
    id: "c3",
    call: "LB 2395 · A3",
    title: "Codespark",
    desc: "Official site for the student tech event. 100+ members, 3 sponsorships secured, 5+ startups emerged from the cohort.",
    back: "The event outgrew the site. Three sponsorships and five startups trace back to a single landing page and a sign-up form.",
    meta: ["Next.js", "React", "TypeScript"],
    stamp: "LIVE",
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub.vercel.app",
  },
  {
    id: "c4",
    call: "LB 2395 · A4",
    title: "Club builds",
    desc: "TIC website reached 10.5% CTR through SEO. Also built the SST Makerspace and Living Green club websites.",
    back: "The 10.5% click-through rate came from restructuring metadata and content hierarchy, not paid traffic.",
    meta: ["Next.js", "React", "Copilot Studio"],
    links: [
      { href: "https://techinnovationclub.com", label: "techinnovationclub.com" },
      { href: "https://sst-makerspace.vercel.app", label: "sst-makerspace" },
      { href: "https://living-green-pau.netlify.app", label: "living-green" },
    ],
  },
];

export function Prototype() {
  const [open, setOpen] = useState(true);
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <div className="cat-root">
      <div className="cat-wrap">
        <header className="cat-head">
          <div className="cat-eyebrow">Card Catalog · Author File</div>
          <h1 className="cat-name">Abasiono Mbat</h1>
          <p className="cat-role">Software Engineer — Web Technologies</p>
          <div className="cat-stamp">FOR REFERENCE ONLY</div>
        </header>

        <a className="cat-back" href="/1" style={{ marginBottom: 16, display: "inline-flex" }}>← INDEX</a>

        <div className="cat-drawer-frame">
          <div className="cat-drawer-handle">
            <div className="cat-pull" />
          </div>

          <button
            className={"cat-drawer-toggle" + (open ? " open" : "")}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? "CLOSE DRAWER" : "OPEN DRAWER"} <span className="cat-arrow">▾</span>
          </button>

          <div className={"cat-drawer" + (open ? " open" : "")}>
            <div className="cat-subject">Subject: Shipped Work</div>
            <div className="cat-cards">
              {cards.map((c) => (
                <div
                  className={"cat-card" + (flipped === c.id ? " flipped" : "")}
                  key={c.id}
                  onClick={() => setFlipped((f) => (f === c.id ? null : c.id))}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => (f === c.id ? null : c.id)); } }}
                  aria-label={`${c.title} card — click to flip`}
                >
                  <div className="cat-card-hole" />
                  <div className="cat-card-body">
                    <div className="cat-card-front">
                      <div className="cat-card-cat">{c.call}</div>
                      <h3 className="cat-card-title">{c.title}</h3>
                      <p className="cat-card-desc">{c.desc}</p>
                      <div className="cat-card-meta">
                        {c.meta.map((m) => <span key={m}>{m}</span>)}
                      </div>
                    </div>
                    <div className="cat-card-back">
                      <div className="cat-card-cat">REVERSE · NOTES</div>
                      <p className="cat-card-desc">{c.back}</p>
                      {c.url && (
                        <a className="cat-card-meta" href={c.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: "inline-block", marginTop: 8 }}>
                          <span style={{ color: "var(--cat-stamp)" }}>↗ {c.urlLabel}</span>
                        </a>
                      )}
                      {c.links && (
                        <div className="cat-card-meta" style={{ marginTop: 8 }}>
                          {c.links.map((l) => (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <span style={{ color: "var(--cat-stamp)" }}>↗ {l.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {c.stamp && <div className="cat-card-stamp">{c.stamp}</div>}
                </div>
              ))}
            </div>

            <div className="cat-subject" style={{ marginTop: 24 }}>Subject: Reference</div>
            <div className="cat-specs">
              <h3>Cataloguing data</h3>
              <div className="cat-spec-row"><span className="cat-spec-key">Languages</span><span className="cat-spec-val">TypeScript · Go · SQL · Python</span></div>
              <div className="cat-spec-row"><span className="cat-spec-key">Frontend</span><span className="cat-spec-val">React · Next.js · Tailwind CSS</span></div>
              <div className="cat-spec-row"><span className="cat-spec-key">Backend</span><span className="cat-spec-val">Node.js · Express · PostgreSQL · Prisma · tRPC</span></div>
              <div className="cat-spec-row"><span className="cat-spec-key">Certified</span><span className="cat-spec-val">NVIDIA Deep Learning · 5× Frontend Masters (algorithms, API design, JS performance, prompt engineering, React state)</span></div>
              <div className="cat-spec-row"><span className="cat-spec-key">Filed under</span><span className="cat-spec-val">2nd year CS, Pan-Atlantic University, Lagos · Software Lead, Tech Innovation Club</span></div>
            </div>

            <div className="cat-subject" style={{ marginTop: 24 }}>Subject: Certifications</div>
            <div className="cat-cards">
              {[
                { call: "CER · 001", title: "Fundamentals of Deep Learning", meta: ["NVIDIA", "AI"] },
                { call: "CER · 002", title: "The Last Algorithms Course", meta: ["Frontend Masters", "DSA"] },
                { call: "CER · 003", title: "API Design in Node.js", meta: ["Frontend Masters", "Backend"] },
                { call: "CER · 004", title: "Blazingly Fast JavaScript", meta: ["Frontend Masters", "Performance"] },
                { call: "CER · 005", title: "Practical Prompt Engineering", meta: ["Frontend Masters", "AI"] },
                { call: "CER · 006", title: "State Management in React", meta: ["Frontend Masters", "React"] },
              ].map((c) => (
                <div className="cat-card" key={c.call}>
                  <div className="cat-card-hole" />
                  <div className="cat-card-body">
                    <div className="cat-card-cat">{c.call}</div>
                    <h3 className="cat-card-title" style={{ fontSize: 17 }}>{c.title}</h3>
                    <div className="cat-card-meta">{c.meta.map((m) => <span key={m}>{m}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="cat-foot">
              <p>© 2026 Abasiono Mbat · Lagos, Nigeria</p>
              <p>
                <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub</a> ·{" "}
                <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{" "}
                <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
