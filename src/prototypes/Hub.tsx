import "@/index.css";

const designs = [
  {
    route: "/2",
    title: "Mixing Console",
    tag: "Hardware / Audio",
    desc: "Portfolio as a live mixing desk — drag faders, twist knobs, watch VU meters bounce. Solo a channel to read its story.",
    accent: "#ffb547",
    bg: "#0f1014",
  },
  {
    route: "/3",
    title: "Card Catalog",
    tag: "Print / Library",
    desc: "A library index-card drawer. Pull the handle, flip typewritten cards front-to-back for the notes on the reverse.",
    accent: "#b8860b",
    bg: "#c9b793",
  },
  {
    route: "/4",
    title: "Star Chart",
    tag: "Celestial / Interactive",
    desc: "Projects plotted as a constellation. Parallax sky, constellation lines that draw themselves in, click a star to chart it.",
    accent: "#8b9dff",
    bg: "#0d1028",
  },
  {
    route: "/5",
    title: "Risograph",
    tag: "Print / Overprint",
    desc: "A two-color riso print run — fluorescent pink and cobalt, misregistered on purpose, with halftone grain and overprint tags.",
    accent: "#ff4d8d",
    bg: "#f4efe4",
  },
];

export function Hub() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0b", color: "#fafafa", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "64px 22px 80px" }}>
        <div style={{ marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#71717a" }}>
          Portfolio · Four concepts
        </div>
        <h1 style={{ fontSize: "clamp(40px, 8vw, 76px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
          Abasiono Mbat
        </h1>
        <p style={{ fontSize: 19, color: "#a1a1aa", maxWidth: "52ch", lineHeight: 1.5 }}>
          Software Engineer · Web Technologies. Four redesigns of this portfolio, each built around a single interactive idea. Pick one to enter.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginTop: 44 }}>
          {designs.map((d) => (
            <a
              key={d.route}
              href={d.route}
              style={{
                display: "block",
                textDecoration: "none",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #2a2a2e",
                background: "#111113",
                transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = d.accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2e";
              }}
            >
              <div style={{
                height: 120,
                background: `linear-gradient(135deg, ${d.bg}, ${d.bg}cc)`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
                <div style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: d.accent,
                  opacity: 0.18,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "-0.04em",
                }}>
                  {d.route.replace("/", "")}
                </div>
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: d.accent,
                  boxShadow: `0 0 12px ${d.accent}`,
                }} />
              </div>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "#fafafa" }}>{d.title}</h2>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: d.accent, letterSpacing: "0.1em" }}>
                    {d.route}
                  </span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#71717a", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>
                  {d.tag}
                </div>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.55, margin: 0 }}>{d.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <p style={{ marginTop: 40, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#52525b", letterSpacing: "0.1em" }}>
          Or view the <a href="/" style={{ color: "#f59e0b", textDecoration: "none", borderBottom: "1px solid currentColor" }}>original portfolio</a>.
        </p>
      </div>
    </div>
  );
}
