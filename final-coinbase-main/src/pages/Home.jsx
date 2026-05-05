// pages/Home.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCryptos } from "../api";
import Sparkline from "../components/crypto/Sparkline";

const formatPrice = (p) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

function PriceTicker({ assets }) {
  const items = [...assets, ...assets];
  if (items.length === 0) return null;
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
      padding: "10px 0",
    }}>
      <div className="animate-ticker">
        {items.map((asset, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "0 28px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}>
            <span style={{ fontWeight: 700, fontSize: "13px", color: asset.color }}>{asset.symbol}</span>
            <span style={{ fontSize: "13px", color: "#ffffff" }}>{formatPrice(asset.price)}</span>
            <span style={{ fontSize: "12px", color: asset.change24h >= 0 ? "#05b169" : "#f04124", fontWeight: 600 }}>
              {asset.change24h >= 0 ? "▲" : "▼"} {Math.abs(asset.change24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroChart() {
  const points = [40, 38, 42, 45, 43, 48, 52, 50, 55, 58, 54, 60, 63, 61, 67];
  const width = 500;
  const height = 120;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min;
  const svgPoints = points.map((val, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });
  const pathD = `M ${svgPoints.join(" L ")}`;
  const fillD = `M 0,${height} L ${svgPoints.join(" L ")} L ${width},${height} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0052ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0052ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#heroGrad)" />
      <path d={pathD} fill="none" stroke="#0052ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCryptos()
      .then(data => { if (Array.isArray(data)) setCryptoAssets(data); })
      .catch(console.error);
  }, []);

  const topAssets = cryptoAssets.slice(0, 4);

  const handleEmailSubmit = () => {
    if (email) navigate("/signup");
  };

  const features = [
    {
      icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0052ff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
      title: "Secure & trusted",
      desc: "Your crypto is protected by industry-leading security, giving you peace of mind."
    },
    {
      icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0052ff" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
      title: "Live prices",
      desc: "Track real-time prices for hundreds of cryptocurrencies in one place."
    },
    {
      icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0052ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
      title: "Easy to start",
      desc: "Create an account in minutes and buy your first crypto with just a credit card."
    },
    {
      icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0052ff" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>),
      title: "Earn rewards",
      desc: "Earn crypto rewards on your holdings and explore staking opportunities."
    },
  ];

  const stats = [
    { value: "100M+", label: "Verified users" },
    { value: "$130B+", label: "Quarterly volume" },
    { value: "100+", label: "Countries supported" },
    { value: "$0", label: "Trading fees on Coinbase One" },
  ];

  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh" }}>
      <PriceTicker assets={cryptoAssets} />

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="hero-grid">
        <div>
          <div className="animate-fade-in-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,82,255,0.12)", border: "1px solid rgba(0,82,255,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "32px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0052ff" }} />
            <span style={{ fontSize: "13px", color: "#0052ff", fontWeight: 600 }}>Trusted by 100M+ users worldwide</span>
          </div>

          <h1 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px 0", letterSpacing: "-0.02em", color: "#ffffff" }}>
            The easiest place to{" "}
            <span style={{ background: "linear-gradient(135deg, #0052ff 0%, #4da6ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              buy and sell
            </span>{" "}crypto.
          </h1>

          <p className="animate-fade-in-up delay-200" style={{ fontSize: "18px", color: "#8a919e", lineHeight: 1.7, marginBottom: "40px" }}>
            Join 100+ million people who trust Coinbase to buy, sell, and manage their crypto. Start with as little as $2.
          </p>

          <div className="animate-fade-in-up delay-300" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              style={{ flex: "1 1 240px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 18px", fontSize: "15px", color: "white", outline: "none", transition: "border-color 0.2s" }}
              onFocus={(e) => (e.target.style.borderColor = "#0052ff")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            />
            <button className="btn-primary" onClick={handleEmailSubmit} style={{ padding: "14px 28px", fontSize: "15px", flexShrink: 0 }}>
              Get started
            </button>
          </div>
          <p className="animate-fade-in-up delay-400" style={{ fontSize: "13px", color: "#8a919e", marginTop: "16px" }}>
            No minimum. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="animate-fade-in-up delay-200 hero-card-side" style={{ position: "relative" }}>
          <div style={{ background: "#111214", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% -20%, rgba(0,82,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div>
                <div style={{ fontSize: "13px", color: "#8a919e", marginBottom: "4px" }}>Bitcoin</div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>
                  {cryptoAssets[0] ? formatPrice(cryptoAssets[0].price) : "$--"}
                </div>
              </div>
              <span style={{ background: "rgba(5,177,105,0.12)", color: "#05b169", fontSize: "13px", fontWeight: 700, padding: "6px 12px", borderRadius: "8px" }}>
                {cryptoAssets[0] ? `${cryptoAssets[0].change24h >= 0 ? "+" : ""}${cryptoAssets[0].change24h?.toFixed(2)}%` : "--"}
              </span>
            </div>
            <div style={{ margin: "20px 0" }}><HeroChart /></div>
            {topAssets.map((asset, i) => (
              <div key={asset.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: (asset.color || "#0052ff") + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: asset.color || "#0052ff", marginRight: "12px", flexShrink: 0 }}>
                  {asset.symbol?.slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>{asset.name}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>{formatPrice(asset.price)}</div>
                  <div style={{ fontSize: "12px", color: asset.change24h >= 0 ? "#05b169" : "#f04124" }}>
                    {asset.change24h >= 0 ? "+" : ""}{asset.change24h?.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "rgba(0,82,255,0.05)", borderTop: "1px solid rgba(0,82,255,0.15)", borderBottom: "1px solid rgba(0,82,255,0.15)", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>{s.value}</div>
              <div style={{ fontSize: "15px", color: "#8a919e" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em" }}>Why choose Coinbase?</h2>
          <p style={{ fontSize: "18px", color: "#8a919e", maxWidth: "560px", margin: "0 auto" }}>
            We're building the cryptoeconomy – a more fair, accessible, efficient, and transparent financial system.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {features.map((f, i) => (
            <div key={f.title} className="animate-fade-in-up"
              style={{ background: "#111214", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "32px", animationDelay: `${i * 0.1}s`, transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,82,255,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,82,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ marginBottom: "20px", width: "52px", height: "52px", background: "rgba(0,82,255,0.1)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 12px" }}>{f.title}</h3>
              <p style={{ fontSize: "15px", color: "#8a919e", margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#0d0e10", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Top assets</h2>
              <p style={{ color: "#8a919e", margin: 0 }}>The most popular assets on Coinbase</p>
            </div>
            <Link to="/explore">
              <button className="btn-secondary" style={{ padding: "10px 20px", fontSize: "14px" }}>View all assets →</button>
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {cryptoAssets.slice(0, 6).map((asset) => (
              <Link key={asset.id} to={`/asset/${asset.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#111214", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", transition: "all 0.2s ease", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: (asset.color || "#0052ff") + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: asset.color || "#0052ff", border: `1.5px solid ${(asset.color || "#0052ff")}30` }}>
                        {asset.symbol?.slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "15px" }}>{asset.name}</div>
                        <div style={{ fontSize: "12px", color: "#8a919e" }}>{asset.symbol}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: asset.change24h >= 0 ? "#05b169" : "#f04124", background: asset.change24h >= 0 ? "rgba(5,177,105,0.1)" : "rgba(240,65,36,0.1)", padding: "3px 8px", borderRadius: "6px" }}>
                      {asset.change24h >= 0 ? "+" : ""}{asset.change24h?.toFixed(2)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700 }}>{formatPrice(asset.price)}</div>
                    <Sparkline data={asset.sparkline} positive={asset.change24h >= 0} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(0,82,255,0.15) 0%, rgba(0,82,255,0.05) 100%)", border: "1px solid rgba(0,82,255,0.25)", borderRadius: "32px", padding: "clamp(40px, 6vw, 80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(0,82,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
          <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em", position: "relative" }}>
            Start your crypto journey today
          </h2>
          <p style={{ fontSize: "18px", color: "#8a919e", margin: "0 0 40px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", position: "relative" }}>
            Join millions of people who trust Coinbase to buy, sell, and store crypto.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <Link to="/signup"><button className="btn-primary" style={{ padding: "16px 36px", fontSize: "16px" }}>Create free account</button></Link>
            <Link to="/explore"><button className="btn-secondary" style={{ padding: "16px 36px", fontSize: "16px" }}>Explore assets</button></Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-card-side { display: none !important; }
        }
      `}</style>
    </div>
  );
}