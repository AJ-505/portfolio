import { useEffect, useRef, useState, useCallback } from "react";
import "./proto.css";

type Channel = {
  num: string;
  name: string;
  tech: string[];
  desc: string;
  stat: { value: number; suffix?: string; decimals?: number; label: string }[];
  url?: string;
  urlLabel?: string;
  links?: { href: string; label: string }[];
};

const channels: Channel[] = [
  {
    num: "01",
    name: "CBT Platform",
    desc: "300+ students practicing JAMB with verified past questions, linked to course discovery.",
    tech: ["Next.js", "Prisma", "tRPC"],
    stat: [{ value: 300, suffix: "+", label: "students" }],
    url: "https://pau-cbt-platform.vercel.app",
    urlLabel: "pau-cbt-platform",
  },
  {
    num: "02",
    name: "PAU Archive",
    desc: "Centralized resource hub for Pan-Atlantic University materials and past questions.",
    tech: ["Astro", "TypeScript", "PostgreSQL"],
    stat: [{ value: 800, suffix: "+", label: "monthly users" }],
    url: "https://pauarchive.com",
    urlLabel: "pauarchive.com",
  },
  {
    num: "03",
    name: "Codespark",
    desc: "Official site for the student tech event. 100+ members, 3 sponsorships, 5+ startups.",
    tech: ["Next.js", "React", "TypeScript"],
    stat: [
      { value: 100, suffix: "+", label: "members" },
      { value: 3, label: "sponsors" },
      { value: 5, suffix: "+", label: "startups" },
    ],
    url: "https://codesparkhub.vercel.app",
    urlLabel: "codesparkhub",
  },
  {
    num: "04",
    name: "Club builds",
    desc: "TIC website at 10.5% CTR via SEO, plus SST Makerspace and Living Green sites.",
    tech: ["Next.js", "React", "Copilot Studio"],
    stat: [{ value: 10.5, suffix: "%", decimals: 1, label: "CTR" }],
    links: [
      { href: "https://techinnovationclub.com", label: "TIC" },
      { href: "https://sst-makerspace.vercel.app", label: "SST" },
      { href: "https://living-green-pau.netlify.app", label: "Living Green" },
    ],
  },
];

function Knob({ label }: { label: string }) {
  const [angle, setAngle] = useState(-135 + 70); // start mid
  const dragRef = useRef<{ startY: number; startAngle: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startY: e.clientY, startAngle: angle };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dy = dragRef.current.startY - e.clientY;
    const next = Math.max(-135, Math.min(135, dragRef.current.startAngle + dy));
    setAngle(next);
  };
  const onPointerUp = () => { dragRef.current = null; };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setAngle((a) => Math.max(-135, a - 15));
    if (e.key === "ArrowRight" || e.key === "ArrowUp") setAngle((a) => Math.min(135, a + 15));
  };

  const pct = Math.round(((angle + 135) / 270) * 100);

  return (
    <div className="mx-knob-wrap">
      <div
        className="mx-knob"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKey}
        onWheel={(e) => setAngle((a) => Math.max(-135, Math.min(135, a - Math.sign(e.deltaY) * 8)))}
      >
        <div className="mx-knob-indicator" style={{ transform: `rotate(${angle}deg)` }} />
      </div>
      <div className="mx-knob-label">{label} {pct}</div>
    </div>
  );
}

function Meter() {
  const [level, setLevel] = useState(40);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLevel(60); return; }
    let raf = 0;
    const tick = () => {
      setLevel(30 + Math.random() * 65);
      raf = window.setTimeout(() => requestAnimationFrame(tick), 120) as unknown as number;
    };
    tick();
    return () => clearTimeout(raf);
  }, []);
  return (
    <div className="mx-meter" aria-hidden="true">
      <div className="mx-meter-fill" style={{ height: `${level}%` }} />
    </div>
  );
}

function Fader({ id }: { id: string }) {
  const [pct, setPct] = useState(72);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<boolean>(false);

  const setFromY = useCallback((clientY: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rel = 1 - (clientY - rect.top) / rect.height;
    setPct(Math.round(Math.max(0, Math.min(100, rel)) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = true;
    setFromY(e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => { if (dragRef.current) setFromY(e.clientY); };
  const onPointerUp = () => { dragRef.current = false; };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") setPct((p) => Math.min(100, p + 5));
    if (e.key === "ArrowDown") setPct((p) => Math.max(0, p - 5));
  };

  const db = Math.round((pct / 100) * 48 - 48);

  return (
    <div className="mx-fader-col">
      <div className="mx-fader-value">{db > 0 ? `+${db}` : db}dB</div>
      <div className="mx-fader" ref={trackRef}>
        <div className="mx-fader-track" />
        <div className="mx-fader-ticks">
          {Array.from({ length: 7 }).map((_, i) => <div className="mx-fader-tick" key={i} />)}
        </div>
        <div
          className="mx-fader-cap"
          role="slider"
          tabIndex={0}
          aria-label={`Channel ${id} level`}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ top: `calc(${100 - pct}% - 8px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKey}
        />
      </div>
    </div>
  );
}

export function Prototype() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const [solo, setSolo] = useState<string | null>(null);
  const [power, setPower] = useState(true);

  const ch = channels[active];

  return (
    <div className="mx-root">
      <div className="mx-wrap">
        <header className="mx-topbar">
          <div className="mx-brand">
            <div className="mx-led-row">
              <span className="mx-led" />
              <span className="mx-led g" />
              <span className="mx-title">MIXING CONSOLE · PORTFOLIO</span>
            </div>
            <h1 className="mx-name">Abasiono Mbat</h1>
            <p className="mx-role">Software Engineer · Web Technologies</p>
          </div>
          <div className="mx-power">
            <span>{power ? "ON AIR" : "STANDBY"}</span>
            <button
              className={"mx-pwr-btn" + (power ? " on" : "")}
              aria-label={power ? "Power off" : "Power on"}
              aria-pressed={power}
              onClick={() => setPower((p) => !p)}
            >
              ⏻
            </button>
          </div>
        </header>

        <div className="mx-rail-label">Channel strips <span style={{ color: "var(--mx-amber)" }}>— drag faders & knobs, click a name to solo</span></div>

        <div className="mx-deck">
          {channels.map((c, i) => {
            const isSolo = solo === c.num;
            const isMuted = muted[c.num];
            const dimmed = !power || (solo ? !isSolo : isMuted);
            return (
              <div className="mx-channel" key={c.num} style={{ opacity: dimmed ? 0.4 : 1 }}>
                <span className="mx-ch-num">CH {c.num}</span>
                <button
                  className="mx-ch-name"
                  onClick={() => setActive(i)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
                    color: active === i ? "var(--mx-amber)" : "var(--mx-text)",
                    textShadow: active === i ? "0 0 8px rgba(255,181,71,0.5)" : "none",
                  }}
                >
                  {c.name}
                </button>
                <Knob label="GAIN" />
                <Meter />
                <Fader id={c.num} />
                <div className="mx-ch-foot">
                  <button
                    className={"mx-btn-mini" + (isMuted ? " active amber" : "")}
                    onClick={() => setMuted((m) => ({ ...m, [c.num]: !m[c.num] }))}
                  >
                    MUTE
                  </button>
                  <button
                    className={"mx-btn-mini" + (isSolo ? " active green" : "")}
                    onClick={() => setSolo((s) => (s === c.num ? null : c.num))}
                  >
                    SOLO
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-rail-label">Master readout</div>
        <div className="mx-readout">
          <div className="mx-screen" aria-live="polite">
            <div>CH {ch.num} · {ch.name.toUpperCase()}</div>
            <div style={{ marginTop: 6 }}>
              <b>{ch.stat[0].value}{ch.stat[0].suffix ?? ""}</b> {ch.stat[0].label}
              {ch.stat.slice(1).map((s) => (
                <span key={s.label}> · <b>{s.value}{s.suffix ?? ""}</b> {s.label}</span>
              ))}
            </div>
            <div style={{ marginTop: 8, color: "var(--mx-muted)" }}>
              {ch.desc}
            </div>
            <div style={{ marginTop: 10 }}>
              {ch.tech.map((t) => <span key={t} style={{ color: "var(--mx-amber)", marginRight: 8 }}>{t}</span>)}
              <span className="mx-cursor" />
            </div>
          </div>
          <div className="mx-specs">
            <div className="mx-spec-row"><span className="mx-spec-key">Languages</span><span className="mx-spec-val">TypeScript · Go · SQL · Python</span></div>
            <div className="mx-spec-row"><span className="mx-spec-key">Frontend</span><span className="mx-spec-val">React · Next.js · Tailwind</span></div>
            <div className="mx-spec-row"><span className="mx-spec-key">Backend</span><span className="mx-spec-val">Node · Express · PostgreSQL · Prisma · tRPC</span></div>
            <div className="mx-spec-row"><span className="mx-spec-key">Certified</span><span className="mx-spec-val">NVIDIA DL · 5× Frontend Masters</span></div>
            <div className="mx-spec-row"><span className="mx-spec-key">Depot</span><span className="mx-spec-val">2nd yr CS, Pan-Atlantic Univ · Lagos, NG</span></div>
          </div>
        </div>

        {ch.url ? (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <a className="mx-ch-link" style={{ fontSize: 12 }} href={ch.url} target="_blank" rel="noopener noreferrer">
              ▶ BOARD HERE: {ch.urlLabel}
            </a>
          </div>
        ) : ch.links ? (
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            {ch.links.map((l) => (
              <a key={l.href} className="mx-ch-link" style={{ fontSize: 12 }} href={l.href} target="_blank" rel="noopener noreferrer">
                ▶ {l.label}
              </a>
            ))}
          </div>
        ) : null}

        <footer className="mx-foot">
          <span>© 2026 Abasiono Mbat · Lagos, Nigeria</span>
          <span>
            <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GH</a> ·{" "}
            <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LI</a> ·{" "}
            <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
          </span>
          <a className="mx-back" href="/1">← INDEX</a>
        </footer>
      </div>
    </div>
  );
}
