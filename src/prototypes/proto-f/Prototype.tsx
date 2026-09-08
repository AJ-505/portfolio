import { useEffect, useRef, useState } from "react";
import "./proto.css";

type Serving = {
  id: string;
  name: string;
  qty: string;
  unit: string;
  dv: string;
  detail: string;
  url?: string;
  urlLabel?: string;
};

const servings: Serving[] = [
  {
    id: "s1",
    name: "CBT Platform",
    qty: "300+",
    unit: "students",
    dv: "Verified JAMB practice",
    detail: "Past-questions platform integrated with School Pathfinder for course discovery.",
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform.vercel.app",
  },
  {
    id: "s2",
    name: "PAU Archive",
    qty: "800+",
    unit: "monthly users",
    dv: "Centralised resources",
    detail: "A single hub for Pan-Atlantic University student materials and past questions.",
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
  },
  {
    id: "s3",
    name: "Codespark",
    qty: "100+",
    unit: "members",
    dv: "5+ startups emerged",
    detail: "Official site for the student tech event that sparked a movement.",
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub.vercel.app",
  },
  {
    id: "s4",
    name: "TIC Website",
    qty: "10.5%",
    unit: "click-through",
    dv: "SEO-driven lift",
    detail: "Club website tuned for search and measurable discovery.",
    url: "https://techinnovationclub.com",
    urlLabel: "techinnovationclub.com",
  },
];

const ingredients = [
  { name: "TypeScript", pct: "100%" },
  { name: "React", pct: "90%" },
  { name: "Next.js", pct: "85%" },
  { name: "Node.js / Express", pct: "70%" },
  { name: "PostgreSQL / Prisma", pct: "65%" },
  { name: "Go", pct: "30%" },
  { name: "Python", pct: "25%" },
  { name: "Tailwind CSS", pct: "80%" },
];

const directions = [
  "Read the project descriptions above.",
  "Click a live link to inspect the work.",
  "Reach out via email for collaborations.",
  "Store at room temperature. Keep shipping.",
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
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function Prototype() {
  return (
    <div className="pf6-root">
      <div className="pf6-label">
        <header className="pf6-top">
          <div className="pf6-brandbar">
            <span className="pf6-brand">AM//</span>
            <span className="pf6-brand-sub">ENGINEERED WEB PRODUCTS</span>
          </div>
          <a
            className="pf6-top-cv"
            href="/abasiono-mbat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV.PDF
          </a>
        </header>

        <section className="pf6-hero">
          <div className="pf6-hero-product">
            <div className="pf6-hero-burst">
              <span>SOFTWARE</span>
              <span>ENGINEER</span>
              <span>2ND EDITION</span>
            </div>
            <h1 className="pf6-hero-name">Abasiono Mbat</h1>
            <p className="pf6-hero-tagline">Web Technologies · Lagos, Nigeria</p>
          </div>
          <div className="pf6-hero-net">
            <div className="pf6-net-label">NET WT.</div>
            <div className="pf6-net-value">2 YRS</div>
            <div className="pf6-net-unit">CS @ PAN-ATLANTIC UNIV.</div>
          </div>
        </section>

        <div className="pf6-divider">
          <span className="pf6-divider-label">PORTFOLIO FACTS</span>
        </div>

        <section className="pf6-facts">
          <div className="pf6-facts-head">
            <span>Amount Per Project</span>
            <span>Servings 04</span>
          </div>
          {servings.map((s) => (
            <FactRow key={s.id} serving={s} />
          ))}
        </section>

        <div className="pf6-divider">
          <span className="pf6-divider-label">TECH STACK / INGREDIENTS</span>
        </div>

        <section className="pf6-ingredients">
          <div className="pf6-ing-head">
            <span>INGREDIENT</span>
            <span>% OF DAILY WORK</span>
          </div>
          {ingredients.map((ing) => (
            <div className="pf6-ing-row" key={ing.name}>
              <span className="pf6-ing-name">{ing.name}</span>
              <BarFill pct={parseInt(ing.pct)} />
              <span className="pf6-ing-pct">{ing.pct}</span>
            </div>
          ))}
        </section>

        <div className="pf6-divider">
          <span className="pf6-divider-label">DIRECTIONS FOR USE</span>
        </div>

        <section className="pf6-directions">
          <ol className="pf6-dir-list">
            {directions.map((d, i) => (
              <li className="pf6-dir-item" key={i}>
                <span className="pf6-dir-num">{i + 1}</span>
                <span className="pf6-dir-text">{d}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="pf6-divider">
          <span className="pf6-divider-label">CERTIFICATIONS &amp; STANDARDS</span>
        </div>

        <section className="pf6-certgrid">
          {[
            ["NVIDIA", "Fundamentals of Deep Learning"],
            ["Frontend Masters", "The Last Algorithms Course"],
            ["Frontend Masters", "API Design in Node.js"],
            ["Frontend Masters", "Blazingly Fast JavaScript"],
            ["Frontend Masters", "Practical Prompt Engineering"],
            ["Frontend Masters", "State Management in React"],
          ].map(([src, title]) => (
            <div className="pf6-cert" key={title}>
              <span className="pf6-cert-src">{src}</span>
              <span className="pf6-cert-title">{title}</span>
            </div>
          ))}
        </section>

        <footer className="pf6-foot" id="contact">
          <div className="pf6-barcode" aria-hidden="true">
            <Barcode />
          </div>
          <div className="pf6-foot-body">
            <p className="pf6-foot-label">DISTRIBUTED BY</p>
            <a className="pf6-foot-email" href="mailto:abasiono.mbat@gmail.com">
              abasiono.mbat@gmail.com
            </a>
            <nav className="pf6-foot-socials" aria-label="Social links">
              <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
            </nav>
            <p className="pf6-foot-meta">© 2026 ABASIONO MBAT · LAGOS, NIGERIA · SOFTWARE LEAD, TIC</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FactRow({ serving }: { serving: Serving }) {
  return (
    <div className="pf6-fact" id={serving.id}>
      <div className="pf6-fact-main">
        <span className="pf6-fact-name">{serving.name}</span>
        <span className="pf6-fact-detail">{serving.detail}</span>
      </div>
      <div className="pf6-fact-data">
        <span className="pf6-fact-qty">{serving.qty}</span>
        <span className="pf6-fact-unit">{serving.unit}</span>
        <span className="pf6-fact-dv">{serving.dv}</span>
        {serving.url && (
          <a className="pf6-fact-url" href={serving.url} target="_blank" rel="noopener noreferrer">
            {serving.urlLabel} ↗
          </a>
        )}
      </div>
    </div>
  );
}

function BarFill({ pct }: { pct: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div className="pf6-bar-track" ref={ref}>
      <div className="pf6-bar-fill" style={{ width: inView ? `${pct}%` : "0%" }} />
    </div>
  );
}

function Barcode() {
  const widths = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 3, 1];
  return (
    <div className="pf6-barcode-svg">
      {widths.map((w, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? "pf6-bar-bar" : "pf6-bar-space"}
          style={{ width: `${w * 3}px` }}
        />
      ))}
    </div>
  );
}
