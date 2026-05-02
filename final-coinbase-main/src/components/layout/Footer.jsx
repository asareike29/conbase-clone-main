// components/layout/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  const links = {
    Products: [
      { label: "Buy & Sell Crypto", path: "/" },
      { label: "Advanced Trade", path: "/" },
      { label: "Coinbase One", path: "/" },
      { label: "Wallet", path: "/" },
    ],
    Learn: [
      { label: "What is Bitcoin?", path: "/learn" },
      { label: "What is Ethereum?", path: "/learn" },
      { label: "What is DeFi?", path: "/learn" },
      { label: "Crypto Basics", path: "/learn" },
    ],
    Company: [
      { label: "About", path: "/" },
      { label: "Careers", path: "/" },
      { label: "Press", path: "/" },
      { label: "Blog", path: "/" },
    ],
    Legal: [
      { label: "Privacy Policy", path: "/" },
      { label: "Terms of Service", path: "/" },
      { label: "Cookie Policy", path: "/" },
    ],
  };

  return (
    <footer
      style={{
        background: "#0a0b0d",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "64px 24px 40px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Logo + description */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" fill="#0052ff"/>
              </svg>
              <span style={{ color: "white", fontWeight: 700, fontSize: "18px" }}>Coinbase</span>
            </div>
            <p style={{ color: "#8a919e", fontSize: "14px", lineHeight: 1.6, maxWidth: "220px" }}>
              The most trusted platform for trading cryptocurrencies.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
              {["twitter", "facebook", "instagram", "linkedin"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    color: "#8a919e",
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8a919e")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    {s === "twitter" && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>}
                    {s === "facebook" && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                    {s === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>}
                    {s === "linkedin" && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                style={{
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "16px",
                  marginTop: 0,
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      style={{
                        color: "#8a919e",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                      onMouseLeave={(e) => (e.target.style.color = "#8a919e")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ color: "#8a919e", fontSize: "13px", margin: 0 }}>
            © 2026 ConBase, Inc. Disclaimer: School project
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a
                key={t}
                href="#"
                style={{ color: "#8a919e", fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "#8a919e")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
