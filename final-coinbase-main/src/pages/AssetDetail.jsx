// pages/AssetDetail.jsx
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { cryptoAssets, formatPrice, formatMarketCap, formatVolume } from "../data/cryptoData";

function DetailChart({ data, color }) {
  const extended = [...data, ...data.map(v => v * (1 + (Math.random() - 0.48) * 0.02))];
  const width = 800;
  const height = 200;
  const min = Math.min(...extended) * 0.995;
  const max = Math.max(...extended) * 1.005;
  const range = max - min;

  const points = extended.map((val, i) => {
    const x = (i / (extended.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 16) - 8;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const fillD = `M 0,${height} L ${points.join(" L ")} L ${width},${height} Z`;
  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = isPositive ? "#05b169" : "#f04124";

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#detailGrad)" />
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buyAmount, setBuyAmount] = useState("");
  const [tab, setTab] = useState("1W");
  const [tradeTab, setTradeTab] = useState("buy");

  const asset = cryptoAssets.find((a) => a.id === id);

  if (!asset) {
    return (
      <div style={{ background: "#0a0b0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <h2 style={{ color: "white" }}>Asset not found</h2>
        <button className="btn-primary" onClick={() => navigate("/explore")} style={{ padding: "12px 24px" }}>
          Back to Explore
        </button>
      </div>
    );
  }

  const isPositive = asset.change24h >= 0;
  const estimatedCrypto = buyAmount ? (parseFloat(buyAmount) / asset.price).toFixed(6) : "0";

  const relatedAssets = cryptoAssets.filter((a) => a.id !== asset.id).slice(0, 4);

  const stats = [
    { label: "Market Cap", value: formatMarketCap(asset.marketCap) },
    { label: "24h Volume", value: formatVolume(asset.volume24h) },
    { label: "Circulating Supply", value: `${(asset.circulatingSupply / 1e6).toFixed(2)}M ${asset.symbol}` },
    { label: "7D Change", value: `${asset.change7d >= 0 ? "+" : ""}${asset.change7d.toFixed(2)}%`, positive: asset.change7d >= 0 },
    { label: "24h Change", value: `${isPositive ? "+" : ""}${asset.change24h.toFixed(2)}%`, positive: isPositive },
    { label: "All-time high est.", value: formatPrice(asset.price * 1.4) },
  ];

  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "14px" }}>
          <Link to="/" style={{ color: "#8a919e", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#8a919e"}>Home</Link>
          <span style={{ color: "#8a919e" }}>›</span>
          <Link to="/explore" style={{ color: "#8a919e", textDecoration: "none" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#8a919e"}>Assets</Link>
          <span style={{ color: "#8a919e" }}>›</span>
          <span style={{ color: "#ffffff" }}>{asset.name}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }} className="detail-grid">
          {/* LEFT */}
          <div>
            {/* Asset Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: asset.color + "20",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", fontWeight: 700, color: asset.color,
                border: `2px solid ${asset.color}40`, flexShrink: 0,
              }}>
                {asset.symbol.slice(0, 2)}
              </div>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                  {asset.name} <span style={{ color: "#8a919e", fontSize: "20px", fontWeight: 400 }}>({asset.symbol})</span>
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "32px", fontWeight: 800 }}>{formatPrice(asset.price)}</span>
                  <span style={{
                    fontSize: "15px", fontWeight: 700,
                    color: isPositive ? "#05b169" : "#f04124",
                    background: isPositive ? "rgba(5,177,105,0.1)" : "rgba(240,65,36,0.1)",
                    padding: "4px 12px", borderRadius: "8px",
                  }}>
                    {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Chart tabs */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    background: tab === t ? "#1c1d20" : "transparent",
                    color: tab === t ? "white" : "#8a919e",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div style={{
              background: "#111214",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
            }}>
              <DetailChart data={asset.sparkline} color={asset.color} />
            </div>

            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#111214",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#8a919e", marginBottom: "6px" }}>{stat.label}</div>
                  <div style={{
                    fontSize: "16px", fontWeight: 700,
                    color: stat.positive === undefined ? "white" : stat.positive ? "#05b169" : "#f04124",
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* About */}
            <div style={{
              background: "#111214",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "32px",
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 16px" }}>About {asset.name}</h3>
              <p style={{ color: "#8a919e", lineHeight: 1.8, margin: 0, fontSize: "15px" }}>{asset.description}</p>
            </div>

            {/* Related assets */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 20px" }}>Related assets</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {relatedAssets.map((a) => (
                  <Link key={a.id} to={`/asset/${a.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: "#111214",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        background: a.color + "20",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: 700, color: a.color,
                        flexShrink: 0,
                      }}>
                        {a.symbol.slice(0, 2)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                        <div style={{ fontSize: "12px", color: "#8a919e" }}>{formatPrice(a.price)}</div>
                      </div>
                      <span style={{
                        fontSize: "12px", fontWeight: 600,
                        color: a.change24h >= 0 ? "#05b169" : "#f04124",
                        flexShrink: 0,
                      }}>
                        {a.change24h >= 0 ? "+" : ""}{a.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Trade Panel */}
          <div style={{ position: "sticky", top: "80px" }}>
            <div style={{
              background: "#111214",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              overflow: "hidden",
            }}>
              {/* Tab selector */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["buy", "sell"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTradeTab(t)}
                    style={{
                      padding: "16px",
                      border: "none",
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      textTransform: "capitalize",
                      background: tradeTab === t ? "rgba(0,82,255,0.1)" : "transparent",
                      color: tradeTab === t ? "#0052ff" : "#8a919e",
                      borderBottom: tradeTab === t ? "2px solid #0052ff" : "2px solid transparent",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", color: "#8a919e", display: "block", marginBottom: "8px" }}>
                    {tradeTab === "buy" ? "Amount in USD" : "Amount in " + asset.symbol}
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                      fontSize: "16px", color: "#8a919e",
                    }}>
                      {tradeTab === "buy" ? "$" : asset.symbol.slice(0, 1)}
                    </span>
                    <input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                      style={{
                        width: "100%",
                        background: "#1c1d20",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        padding: "14px 16px 14px 36px",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "white",
                        outline: "none",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#0052ff"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>

                {/* Quick amounts */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setBuyAmount(String(amt))}
                      style={{
                        padding: "8px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        color: "#8a919e",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => { e.target.style.background = "rgba(0,82,255,0.1)"; e.target.style.color = "#0052ff"; e.target.style.borderColor = "rgba(0,82,255,0.3)"; }}
                      onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "#8a919e"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                {/* Estimate */}
                {buyAmount && (
                  <div style={{
                    background: "rgba(0,82,255,0.08)",
                    border: "1px solid rgba(0,82,255,0.2)",
                    borderRadius: "10px",
                    padding: "14px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ color: "#8a919e" }}>You receive</span>
                      <span style={{ fontWeight: 700 }}>{estimatedCrypto} {asset.symbol}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#8a919e" }}>Network fee</span>
                      <span style={{ color: "#8a919e" }}>~$1.99</span>
                    </div>
                  </div>
                )}

                <button
                  className="btn-primary"
                  style={{ width: "100%", padding: "16px", fontSize: "16px", borderRadius: "12px" }}
                  onClick={() => navigate("/signup")}
                >
                  {tradeTab === "buy" ? `Buy ${asset.symbol}` : `Sell ${asset.symbol}`}
                </button>

                <p style={{ fontSize: "12px", color: "#8a919e", textAlign: "center", margin: "16px 0 0" }}>
                  Sign in or create an account to trade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
