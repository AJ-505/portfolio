import { useEffect, useRef, useState } from "react";
import "./proto.css";

const masterBoard = [
  { route: "R1", destination: "CBT PLATFORM", status: "ON ROUTE" },
  { route: "R2", destination: "PAU ARCHIVE", status: "FULL" },
  { route: "R3", destination: "CODESPARK", status: "ARRIVED" },
  { route: "R4", destination: "CLUB BUILDS", status: "ON ROUTE" },
];

type RouteCount = { value: number; suffix?: string; decimals?: number; label: string };

type Route = {
  id: string;
  route: string;
  name: string;
  stops: string[];
  fare: string;
  passengers?: number;
  passengerLabel?: string;
  counts?: RouteCount[];
  liveUrl?: string;
  liveLabel?: string;
  links?: { href: string; label: string }[];
};

const routes: Route[] = [
  {
    id: "r1",
    route: "R1",
    name: "CBT Platform",
    stops: ["Verified JAMB past questions", "School Pathfinder course discovery"],
    passengers: 300,
    passengerLabel: "students practising",
    fare: "Next.js · Prisma · tRPC",
    liveUrl: "https://pau-cbt-platform.vercel.app",
    liveLabel: "pau-cbt-platform.vercel.app",
  },
  {
    id: "r2",
    route: "R2",
    name: "PAU Archive",
    stops: ["Past questions and materials in one place", "Built for Pan-Atlantic University"],
    passengers: 800,
    passengerLabel: "monthly active users",
    fare: "Astro · TypeScript · PostgreSQL",
    liveUrl: "https://pauarchive.com",
    liveLabel: "pauarchive.com",
  },
  {
    id: "r3",
    route: "R3",
    name: "Codespark",
    stops: ["Official site for the student tech event", "5+ startups emerged from the cohort"],
    counts: [
      { value: 100, suffix: "+", label: "members" },
      { value: 3, label: "sponsorships secured" },
      { value: 5, suffix: "+", label: "startups emerged" },
    ],
    fare: "Next.js · React · TypeScript",
    liveUrl: "https://codesparkhub.vercel.app",
    liveLabel: "codesparkhub.vercel.app",
  },
  {
    id: "r4",
    route: "R4",
    name: "Club builds",
    stops: ["TIC website, 10.5% CTR via SEO", "SST Makerspace and Living Green sites"],
    counts: [{ value: 10.5, suffix: "%", decimals: 1, label: "click-through rate, TIC website" }],
    fare: "Next.js · React · Copilot Studio",
    links: [
      { href: "https://techinnovationclub.com", label: "techinnovationclub.com" },
      { href: "https://sst-makerspace.vercel.app", label: "sst-makerspace.vercel.app" },
      { href: "https://living-green-pau.netlify.app", label: "living-green-pau.netlify.app" },
    ],
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, decimals]);
  return (
    <span className="pb2-count" ref={ref}>
      <span className="pb2-digit">{value.toLocaleString("en-US", { minimumFractionDigits: decimals })}</span>
      <span className="pb2-suffix">{suffix}</span>
    </span>
  );
}

export function Prototype() {
  return (
    <div className="pb2-root">
      <header className="pb2-livery">
        <div className="pb2-folio pb2-toprow">
          <div>
            <span className="pb2-operator">OPERATOR</span>
            <h1 className="pb2-name">Abasiono Mbat</h1>
            <p className="pb2-role">Software Engineer · Web Technologies</p>
          </div>
          <a
            className="pb2-ticket"
            href="/abasiono-mbat-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </div>
      </header>

      <main className="pb2-folio">
        <section className="pb2-masterboard" aria-label="Route board">
          <div className="pb2-boardhead">
            <span>ROUTE</span>
            <span>DESTINATION</span>
            <span>STATUS</span>
          </div>
          {masterBoard.map((r) => (
            <a key={r.route} href={`#${r.route.toLowerCase()}`} className="pb2-boardrow">
              <span className="pb2-boardroute">{r.route}</span>
              <span className="pb2-boarddest">{r.destination}</span>
              <span className={"pb2-chip" + (r.status === "FULL" ? " pb2-chip-full" : "")}>
                {r.status}
              </span>
            </a>
          ))}
          <p className="pb2-boardnote">
            Every route below carries real passengers. Fares paid in shipped code.
          </p>
        </section>

        {routes.map((r) => (
          <section className="pb2-panel" id={r.id} key={r.route}>
            <div className="pb2-panel-head">
              <span className="pb2-routeplate">{r.route}</span>
              <h2 className="pb2-route-name">{r.name}</h2>
            </div>

            <ul className="pb2-stops">
              {r.stops.map((s) => (
                <li className="pb2-stop" key={s}>{s}</li>
              ))}
            </ul>

            <div className="pb2-counterbox">
              <div className="pb2-counter-main">
                {r.passengers !== undefined ? (
                  <>
                    <CountUp target={r.passengers} suffix="+" />
                    <span className="pb2-counter-label">{r.passengerLabel}</span>
                  </>
                ) : r.counts?.[0] ? (
                  <>
                    <CountUp target={r.counts[0].value} suffix={r.counts[0].suffix ?? ""} decimals={r.counts[0].decimals ?? 0} />
                    <span className="pb2-counter-label">{r.counts[0].label}</span>
                  </>
                ) : null}
              </div>
              {r.counts && r.counts.length > 1 && (
                <div className="pb2-counter-side">
                  {r.counts.slice(1).map((c) => (
                    <div className="pb2-counter-mini" key={c.label}>
                      <CountUp target={c.value} suffix={c.suffix ?? ""} decimals={c.decimals ?? 0} />
                      <span className="pb2-counter-label">{c.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pb2-panel-foot">
              <span className="pb2-fare">FARE: {r.fare}</span>
              {r.liveUrl ? (
                <a
                  className="pb2-boardhere"
                  href={r.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Board here: {r.liveLabel ?? ""}
                </a>
              ) : (
                <div className="pb2-links">
                  {(r.links ?? []).map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="pb2-link">
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        <section className="pb2-panel pb2-specs" id="specs">
          <h2 className="pb2-specs-head">Vehicle specifications</h2>
          <dl className="pb2-speclist">
            <div className="pb2-spec">
              <dt>Languages</dt>
              <dd>TypeScript · Go · SQL · Python</dd>
            </div>
            <div className="pb2-spec">
              <dt>Frontend</dt>
              <dd>React · Next.js · Tailwind CSS</dd>
            </div>
            <div className="pb2-spec">
              <dt>Backend</dt>
              <dd>Node.js · Express.js · PostgreSQL · Prisma · tRPC</dd>
            </div>
            <div className="pb2-spec">
              <dt>Papers in order</dt>
              <dd>
                NVIDIA Deep Learning · Frontend Masters: algorithms, API design,
                JavaScript performance, prompt engineering, React state
              </dd>
            </div>
            <div className="pb2-spec">
              <dt>Depot</dt>
              <dd>2nd year CS, Pan-Atlantic University, Lagos · Software Lead, Tech Innovation Club</dd>
            </div>
          </dl>
        </section>

        <footer className="pb2-foot" id="contact">
          <p className="pb2-conductor">Conductor is listening.</p>
          <a className="pb2-email" href="mailto:abasiono.mbat@gmail.com">
            abasiono.mbat@gmail.com
          </a>
          <nav className="pb2-socials" aria-label="Social links">
            <a href="https://github.com/AJ-505" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/abasionombat/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/Abasiono_Mbat" target="_blank" rel="noopener noreferrer">X</a>
          </nav>
          <p className="pb2-footmeta">© 2026 Abasiono Mbat · Lagos, Nigeria</p>
        </footer>
      </main>
    </div>
  );
}
