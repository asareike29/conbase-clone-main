// pages/Learn.jsx
import { useState } from "react";
import { learnArticles } from "../data/cryptoData";
import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div
      style={{
        background: "#111214",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "28px",
        transition: "all 0.2s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <div style={{
        width: "52px", height: "52px",
        background: article.color + "15",
        borderRadius: "14px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px",
        border: `1.5px solid ${article.color}25`,
      }}>
        {article.icon}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "11px", fontWeight: 700,
          background: article.color + "15",
          color: article.color,
          padding: "3px 10px", borderRadius: "100px",
          textTransform: "uppercase", letterSpacing: "0.05em",
        }}>
          {article.category}
        </span>
        <span style={{
          fontSize: "11px", fontWeight: 600,
          background: "rgba(255,255,255,0.06)",
          color: "#8a919e",
          padding: "3px 10px", borderRadius: "100px",
        }}>
          {article.level}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>{article.title}</h3>
        <p style={{ fontSize: "14px", color: "#8a919e", margin: 0, lineHeight: 1.7 }}>{article.description}</p>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", color: "#8a919e" }}>{article.readTime}</span>
        <span style={{ fontSize: "13px", color: "#0052ff", fontWeight: 600 }}>
          Read more →
        </span>
      </div>
    </div>
  );
}

export default function Learn() {
  const [activeLevel, setActiveLevel] = useState("All");
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = activeLevel === "All"
    ? learnArticles
    : learnArticles.filter((a) => a.level === activeLevel);

  return (
    <div style={{ background: "#0a0b0d", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, rgba(0,82,255,0.08) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 24px 64px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,82,255,0.12)", border: "1px solid rgba(0,82,255,0.25)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0052ff">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span style={{ fontSize: "13px", color: "#0052ff", fontWeight: 600 }}>Coinbase Learn</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Learn crypto, earn crypto
          </h1>
          <p style={{ fontSize: "18px", color: "#8a919e", lineHeight: 1.7, margin: 0 }}>
            Build your knowledge from the basics to advanced concepts. Free guides written by crypto experts.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Level filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              style={{
                padding: "10px 20px",
                borderRadius: "100px",
                border: activeLevel === level ? "1.5px solid #0052ff" : "1.5px solid rgba(255,255,255,0.12)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                background: activeLevel === level ? "rgba(0,82,255,0.12)" : "transparent",
                color: activeLevel === level ? "#0052ff" : "#8a919e",
              }}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "80px",
        }}>
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: "#111214",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "48px",
          textAlign: "center",
        }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Ready to start investing?
          </h2>
          <p style={{ color: "#8a919e", fontSize: "16px", margin: "0 0 32px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Apply what you've learned. Create a free Coinbase account and start building your portfolio today.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup">
              <button className="btn-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
                Create account
              </button>
            </Link>
            <Link to="/explore">
              <button className="btn-secondary" style={{ padding: "14px 32px", fontSize: "15px" }}>
                Explore assets
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
