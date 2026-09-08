import "./proto.css";

type Proj = {
  num: string;
  title: string;
  desc: string;
  stats: string;
  tech: string[];
  url?: string;
  urlLabel?: string;
  links?: { href: string; label: string }[];
};

const projects: Proj[] = [
  {
    num: "№ 01",
    title: "CBT Platform",
    desc: "300+ students practicing JAMB with verified past questions. Linked to School Pathfinder for course discovery.",
    stats: "300+ students",
    tech: ["Next.js", "Prisma", "tRPC"],
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform",
  },
  {
    num: "№ 02",
    title: "PAU Archive",
    desc: "Centralized resource hub for Pan-Atlantic University. Materials and past questions in one searchable index.",
    stats: "800+ MAU",
    tech: ["Astro", "TypeScript", "PostgreSQL"],
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
  },
  {
    num: "№ 03",
    title: "Codespark",
    desc: "Official site for the student tech event. 100+ members, 3 sponsorships, 5+ startups emerged.",
    stats: "100+ · 3 · 5+",
    tech: ["Next.js", "React", "TypeScript"],
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub",
  },
  {
    num: "№ 04",
    title: "Club builds",
    desc: "TIC website reached 10.5% CTR via SEO. Also built SST Makerspace and Living Green club sites.",
    stats: "10.5% CTR",
    tech: ["Next.js", "React", "Copilot Studio"],
    links: [
      { href: "https://techinnovationclub.com", label: "TIC" },
      { href: "https://sst-makerspace.vercel.app", label: "SST" },
      { href: "https://living-green-pau.netlify.app", label: "Living Green" },
    ],
  },
];

const certs = [
  { title: "Fundamentals of Deep Learning", source: "NVIDIA", rot: -2 },
  { title: "The Last Algorithms Course", source: "Frontend Masters", rot: 1 },
  { title: "API Design in Node.js", source: "Frontend Masters", rot: -1 },
  { title: "Blazingly Fast JavaScript", source: "Frontend Masters", rot: 2 },
  { title: "Practical Prompt Engineering", source: "Frontend Masters", rot: -1.5 },
  { title: "State Management in React", source: "Frontend Masters", rot: 1 },
];

export function Prototype() {
  return (
    <div className="riso-root">
      <div className="riso-wrap">
        <div className="riso-mast">
          <span className="riso-mast-l">Vol. I · Portfolio Edition</span>
          <span className="riso-mast-r">Lagos, NG · 2026</span>
        </div>

        <a className="riso-back" href="/1" style={{ marginTop: 14, display: "inline-flex" }}>← INDEX</a>

        <section className="riso-hero">
          <div className="riso-eyebrow">Risograph Print · Two-Color Run</div>
          <h1 className="riso-name" data-text="Abasiono Mbat">
            <span className="riso-name-real">Abasiono Mbat</span>
          </h1>
          <p className="riso-role">
            Software Engineer building <strong>web systems</strong> for students and clubs in Lagos.
          </p>
        </section>

        <div className="riso-section-label">
          <span>Selected Work</span>
          <span>Print run / 04</span>
        </div>

        <div className="riso-projects">
          {projects.map((p) => (
            <article className="riso-proj" key={p.num}>
              <div>
                <div className="riso-proj-num">{p.num}</div>
                <h3 className="riso-proj-title">{p.title}</h3>
                <p className="riso-proj-desc">{p.desc}</p>
                <div className="riso-tech-list">
                  {p.tech.map((t) => <span className="riso-tech" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="riso-proj-side">
                <div className="riso-stat"><b>{p.stats}</b></div>
                {p.url ? (
                  <a className="riso-proj-link" href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8 }}>
                    ↗ {p.urlLabel}
                  </a>
                ) : p.links ? (
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                    {p.links.map((l) => (
                      <a className="riso-proj-link" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        ↗ {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="riso-section-label">
          <span>Tooling</span>
          <span>Spec sheet</span>
        </div>
        <div className="riso-specs">
          <div className="riso-spec-cell">
            <div className="riso-spec-key">Languages</div>
            <div className="riso-spec-val">TypeScript · Go · SQL · Python</div>
          </div>
          <div className="riso-spec-cell">
            <div className="riso-spec-key">Frontend</div>
            <div className="riso-spec-val">React · Next.js · Tailwind CSS</div>
          </div>
          <div className="riso-spec-cell">
            <div className="riso-spec-key">Backend</div>
            <div className="riso-spec-val">Node.js · Express · PostgreSQL · Prisma · tRPC</div>
          </div>
          <div className="riso-spec-cell">
            <div className="riso-spec-key">Filed from</div>
            <div className="riso-spec-val">2nd yr CS, Pan-Atlantic University, Lagos · Software Lead, TIC</div>
          </div>
        </div>

        <div className="riso-section-label">
          <span>Certifications</span>
          <span>Stamp run / 06</span>
        </div>
        <div className="riso-certs">
          {certs.map((c) => (
            <div className="riso-cert" key={c.title} style={{ ["--rot" as string]: `${c.rot}deg` }}>
              {c.title} · {c.source}
            </div>
          ))}
        </div>

        <footer className="riso-foot">
          <div className="riso-foot-l">
            <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub</a> ·{" "}
            <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{" "}
            <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
          </div>
          <div className="riso-foot-r">© 2026 Abasiono Mbat · Lagos, Nigeria</div>
        </footer>
      </div>
    </div>
  );
}
