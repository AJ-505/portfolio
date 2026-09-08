import { useState } from "react";
import "./proto.css";

type Rarity = "legendary" | "epic" | "rare" | "uncommon";

type CardData = {
  id: string;
  name: string;
  rarity: Rarity;
  type: string;
  cost: number;
  ability: string;
  flavor: string;
  stats: { power: string; toughness: string };
  metric: { value: string; label: string };
  stack: string;
  url?: string;
};

const cards: CardData[] = [
  {
    id: "c1",
    name: "CBT Platform",
    rarity: "legendary",
    type: "Web Platform",
    cost: 4,
    ability: "Verified JAMB past questions reach 300+ students. Course discovery through School Pathfinder.",
    flavor: "“The exam hall, but it fits in your pocket.”",
    stats: { power: "300", toughness: "JAMB" },
    metric: { value: "300+", label: "students practising" },
    stack: "Next.js · Prisma · tRPC",
    url: "https://pau-cbt-platform.vercel.app",
  },
  {
    id: "c2",
    name: "PAU Archive",
    rarity: "legendary",
    type: "Resource Hub",
    cost: 3,
    ability: "Centralised material hub serving Pan-Atlantic University. A reliable single source.",
    flavor: "“Everything in its right place.”",
    stats: { power: "800", toughness: "MAU" },
    metric: { value: "800+", label: "monthly active users" },
    stack: "Astro · TypeScript · PostgreSQL",
    url: "https://pauarchive.com",
  },
  {
    id: "c3",
    name: "Codespark",
    rarity: "epic",
    type: "Community",
    cost: 3,
    ability: "Official site for a campus tech event. Grew a movement and five startups.",
    flavor: "“One spark lit the whole lab.”",
    stats: { power: "100", toughness: "MEM" },
    metric: { value: "100+", label: "members · 5+ startups" },
    stack: "Next.js · React · TypeScript",
    url: "https://codesparkhub.vercel.app",
  },
  {
    id: "c4",
    name: "TIC Website",
    rarity: "rare",
    type: "Marketing Site",
    cost: 2,
    ability: "Club website tuned for search. Measurable lift through SEO work.",
    flavor: "“Discovery made obvious.”",
    stats: { power: "10.5", toughness: "CTR" },
    metric: { value: "10.5%", label: "click-through rate" },
    stack: "Next.js · React · TypeScript",
    url: "https://techinnovationclub.com",
  },
];

const sideboard = [
  { type: "Languages", items: "TypeScript · Go · SQL · Python" },
  { type: "Frontend", items: "React · Next.js · Tailwind CSS" },
  { type: "Backend", items: "Node · Express · PostgreSQL · Prisma · tRPC" },
  { type: "Tools", items: "Git · GitHub · Vercel" },
];

const achievements = [
  { name: "Fundamentals of Deep Learning", rarity: "epic", source: "NVIDIA" },
  { name: "The Last Algorithms Course", rarity: "rare", source: "Frontend Masters" },
  { name: "API Design in Node.js", rarity: "rare", source: "Frontend Masters" },
  { name: "Blazingly Fast JavaScript", rarity: "rare", source: "Frontend Masters" },
  { name: "Practical Prompt Engineering", rarity: "uncommon", source: "Frontend Masters" },
  { name: "State Management in React", rarity: "rare", source: "Frontend Masters" },
];

const rarityLabel: Record<Rarity, string> = {
  legendary: "★ LEGENDARY",
  epic: "◆ EPIC",
  rare: "◇ RARE",
  uncommon: "● UNCOMMON",
};

export function Prototype() {
  const [active, setActive] = useState(0);
  const activeCard = cards[active];

  return (
    <div className="pe5-root">
      <div className="pe5-felt" aria-hidden="true" />

      <div className="pe5-board">
        <header className="pe5-head">
          <div className="pe5-head-brand">
            <span className="pe5-mono">DECK MASTER</span>
            <h1 className="pe5-head-name">Abasiono Mbat</h1>
            <p className="pe5-head-role">Software Engineer · Web Technologies</p>
          </div>
          <a
            className="pe5-head-cv"
            href="/abasiono-mbat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW CV ↗
          </a>
        </header>

        <section className="pe5-stage" aria-label="Featured card">
          <div className={`pe5-card pe5-card--${activeCard.rarity} pe5-card--active`} key={activeCard.id}>
            <CardFace card={activeCard} active />
          </div>
          <div className="pe5-stage-meta">
            <p className="pe5-stage-label pe5-mono">NOW SHOWING</p>
            <h2 className="pe5-stage-name">{activeCard.name}</h2>
            <p className="pe5-stage-detail">{activeCard.ability}</p>
            <a
              className="pe5-stage-url"
              href={activeCard.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeCard.url?.replace("https://", "")} ↗
            </a>
          </div>
        </section>

        <div className="pe5-section-label pe5-mono">YOUR DECK</div>

        <section className="pe5-deck">
          {cards.map((c, i) => (
            <button
              key={c.id}
              className={`pe5-deck-slot ${i === active ? "pe5-deck-slot--active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <div className={`pe5-card pe5-card--${c.rarity} pe5-card--mini`}>
                <CardFace card={c} mini />
              </div>
              <span className="pe5-deck-rarity pe5-mono">{rarityLabel[c.rarity]}</span>
            </button>
          ))}
        </section>

        <div className="pe5-section-label pe5-mono">SIDEBOARD</div>

        <section className="pe5-sideboard">
          {sideboard.map((s) => (
            <div className="pe5-side-row" key={s.type}>
              <span className="pe5-side-type pe5-mono">{s.type}</span>
              <span className="pe5-side-items">{s.items}</span>
            </div>
          ))}
        </section>

        <div className="pe5-section-label pe5-mono">ACHIEVEMENTS</div>

        <section className="pe5-achv">
          {achievements.map((a) => (
            <div className={`pe5-achv-badge pe5-achv-badge--${a.rarity}`} key={a.name}>
              <span className="pe5-achv-gem">{a.rarity === "epic" ? "◆" : a.rarity === "rare" ? "◇" : "●"}</span>
              <div className="pe5-achv-body">
                <span className="pe5-achv-name">{a.name}</span>
                <span className="pe5-achv-src pe5-mono">{a.source}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="pe5-foot" id="contact">
          <div className="pe5-foot-card">
            <div className="pe5-foot-gem">✦</div>
            <div className="pe5-foot-body">
              <p className="pe5-foot-label pe5-mono">SUMMON THE DECK MASTER</p>
              <a className="pe5-foot-email" href="mailto:abasiono.mbat@gmail.com">
                abasiono.mbat@gmail.com
              </a>
              <nav className="pe5-foot-socials" aria-label="Social links">
                <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
              </nav>
            </div>
          </div>
          <p className="pe5-foot-meta pe5-mono">© 2026 · LAGOS, NIGERIA · 2ND YEAR CS, PAN-ATLANTIC UNIVERSITY</p>
        </footer>
      </div>
    </div>
  );
}

function CardFace({ card, mini = false, active = false }: { card: CardData; mini?: boolean; active?: boolean }) {
  return (
    <div className="pe5-card-inner">
      <div className="pe5-card-head">
        <span className="pe5-card-cost">{card.cost}</span>
        <span className="pe5-card-name">{card.name}</span>
      </div>
      <div className="pe5-card-art" aria-hidden="true">
        <span className="pe5-card-artmark">{card.rarity === "legendary" ? "✺" : card.rarity === "epic" ? "✸" : card.rarity === "rare" ? "✦" : "◆"}</span>
      </div>
      <div className="pe5-card-type">{card.type}</div>
      {!mini && (
        <p className="pe5-card-ability">{card.ability}</p>
      )}
      {!mini && active && (
        <div className="pe5-card-metric">
          <span className="pe5-card-metric-value">{card.metric.value}</span>
          <span className="pe5-card-metric-label">{card.metric.label}</span>
        </div>
      )}
      {!mini && active && (
        <p className="pe5-card-flavor">{card.flavor}</p>
      )}
      <div className="pe5-card-foot">
        <span className="pe5-card-stat pe5-card-power">{card.stats.power}</span>
        <span className="pe5-card-stat-divider">/</span>
        <span className="pe5-card-stat pe5-card-tough">{card.stats.toughness}</span>
      </div>
    </div>
  );
}
