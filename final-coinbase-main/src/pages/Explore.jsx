// pages/Explore.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cryptoAssets, formatPrice, formatMarketCap, formatVolume } from "../data/cryptoData";
import Sparkline from "../components/crypto/Sparkline";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");
  const [sortDir, setSortDir] = useState("desc");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let assets = [...cryptoAssets];
    if (search) {
      assets = assets.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter === "gainers") assets = assets.filter((a) => a.change24h > 0);
    if (filter === "losers") assets = assets.filter((a) => a.change24h < 0);

    assets.sort((a, b) => {
      const mult = sortDir === "desc" ? -1 : 1;
      return (a[sortBy] - b[sortBy]) * mult;
    });
    return assets;
  }, [search, sortBy, sortDir, filter]);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortBy(col); setSortDir("desc"); }
  };

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: "4px", opacity: sortBy === col ? 1 : 0.3, fontSize: "10px" }}>
      {sortBy === col ? (sortDir === "desc" ? "▼" : "▲") : "⇅"}
    </span>
  );

  const totalMarketCap = cryptoAssets.reduce((sum, a) => sum + a.marketCap, 0);
  const totalVolume = cryptoAssets.reduce((sum, a) => sum + a.volume24h, 0);
  const gainers = cryptoAssets.filter((a) => a.change24h > 0).length;

  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Explore assets
          </h1>
          <p style={{ color: "#8a919e", fontSize: "16px", margin: 0 }}>
            Discover and track the top cryptocurrencies by market cap
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "Total Market Cap", value: formatMarketCap(totalMarketCap) },
            { label: "24h Volume", value: formatMarketCap(totalVolume) },
            { label: "Assets Tracked", value: cryptoAssets.length },
            { label: "Gaining Today", value: `${gainers}/${cryptoAssets.length}` },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#111214",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div style={{ fontSize: "13px", color: "#8a919e", marginBottom: "8px" }}>{stat.label}</div>
              <div style={{ fontSize: "20px", fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8a919e"
              strokeWidth="2"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
              style={{
                width: "100%",
                background: "#111214",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "12px 16px 12px 42px",
                fontSize: "14px",
                color: "white",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0052ff")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "4px", background: "#111214", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "4px" }}>
            {["all", "gainers", "losers"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "7px",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: filter === f ? "#0052ff" : "transparent",
                  color: filter === f ? "white" : "#8a919e",
                  textTransform: "capitalize",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: "#111214",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          overflow: "hidden",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th style={{ padding: "16px 12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#8a919e", width: "48px" }}>#</th>
                  <th style={{ padding: "16px 12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#8a919e" }}>Asset</th>
                  <th
                    onClick={() => handleSort("price")}
                    style={{ padding: "16px 12px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#8a919e", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Price <SortIcon col="price" />
                  </th>
                  <th
                    onClick={() => handleSort("change24h")}
                    style={{ padding: "16px 12px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#8a919e", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    24h % <SortIcon col="change24h" />
                  </th>
                  <th
                    onClick={() => handleSort("marketCap")}
                    style={{ padding: "16px 12px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#8a919e", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Market Cap <SortIcon col="marketCap" />
                  </th>
                  <th
                    onClick={() => handleSort("volume24h")}
                    style={{ padding: "16px 12px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#8a919e", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Volume (24h) <SortIcon col="volume24h" />
                  </th>
                  <th style={{ padding: "16px 12px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#8a919e" }}>
                    7D Chart
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#8a919e" }}>
                      No assets found for "{search}"
                    </td>
                  </tr>
                )}
                {filtered.map((asset, i) => (
                  <tr
                    key={asset.id}
                    className="table-row-hover"
                    onClick={() => navigate(`/asset/${asset.id}`)}
                    style={{
                      borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                  >
                    <td style={{ padding: "16px 12px", color: "#8a919e", fontSize: "14px" }}>
                      {cryptoAssets.indexOf(asset) + 1}
                    </td>
                    <td style={{ padding: "16px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "38px", height: "38px", borderRadius: "50%",
                          background: asset.color + "20",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: 700, color: asset.color,
                          border: `1.5px solid ${asset.color}30`, flexShrink: 0,
                        }}>
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "15px" }}>{asset.name}</div>
                          <div style={{ fontSize: "12px", color: "#8a919e" }}>{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "right", fontWeight: 600, fontSize: "15px" }}>
                      {formatPrice(asset.price)}
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "right" }}>
                      <span style={{
                        color: asset.change24h >= 0 ? "#05b169" : "#f04124",
                        fontWeight: 600, fontSize: "14px",
                        background: asset.change24h >= 0 ? "rgba(5,177,105,0.1)" : "rgba(240,65,36,0.1)",
                        padding: "3px 8px", borderRadius: "6px",
                      }}>
                        {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "right", color: "#8a919e", fontSize: "14px" }}>
                      {formatMarketCap(asset.marketCap)}
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "right", color: "#8a919e", fontSize: "14px" }}>
                      {formatVolume(asset.volume24h)}
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Sparkline data={asset.sparkline} positive={asset.change24h >= 0} width={80} height={32} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#8a919e", fontSize: "13px", marginTop: "24px" }}>
          Prices update every 30 seconds. Data for informational purposes only.
        </p>
      </div>
    </div>
  );
}
