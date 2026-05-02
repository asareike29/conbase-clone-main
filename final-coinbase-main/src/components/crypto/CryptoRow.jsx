// components/crypto/CryptoRow.jsx
import { useNavigate } from "react-router-dom";
import Sparkline from "./Sparkline";
import { formatPrice, formatMarketCap, formatVolume } from "../../data/cryptoData";

export default function CryptoRow({ asset, rank, showVolume = true }) {
  const navigate = useNavigate();
  const isPositive = asset.change24h >= 0;

  return (
    <tr
      className="table-row-hover"
      onClick={() => navigate(`/asset/${asset.id}`)}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "16px 12px", color: "#8a919e", fontSize: "14px", width: "48px" }}>
        {rank}
      </td>
      <td style={{ padding: "16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: asset.color + "20",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 700,
              color: asset.color,
              flexShrink: 0,
              border: `1.5px solid ${asset.color}30`,
            }}
          >
            {asset.symbol.slice(0, 2)}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px", color: "#ffffff" }}>{asset.name}</div>
            <div style={{ fontSize: "13px", color: "#8a919e" }}>{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td style={{ padding: "16px 12px", textAlign: "right", fontWeight: 600, fontSize: "15px" }}>
        {formatPrice(asset.price)}
      </td>
      <td style={{ padding: "16px 12px", textAlign: "right" }}>
        <span
          style={{
            color: isPositive ? "#05b169" : "#f04124",
            fontWeight: 600,
            fontSize: "14px",
            background: isPositive ? "rgba(5,177,105,0.1)" : "rgba(240,65,36,0.1)",
            padding: "3px 8px",
            borderRadius: "6px",
          }}
        >
          {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
        </span>
      </td>
      {showVolume && (
        <td style={{ padding: "16px 12px", textAlign: "right", color: "#8a919e", fontSize: "14px" }}>
          {formatMarketCap(asset.marketCap)}
        </td>
      )}
      <td style={{ padding: "16px 12px", textAlign: "right" }}>
        <Sparkline data={asset.sparkline} positive={isPositive} />
      </td>
    </tr>
  );
}
