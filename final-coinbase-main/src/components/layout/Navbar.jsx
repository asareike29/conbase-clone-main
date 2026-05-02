// components/layout/Navbar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CoinbaseLogo = () => (
  <svg width="116" height="24" viewBox="0 0 116 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" fill="#0052ff"/>
    <path d="M33.5 17.25V6.75h2.5v10.5h-2.5zM38.5 17.25V9h2.375v1.125C41.375 9.375 42.25 9 43.375 9c2.25 0 3.625 1.5 3.625 3.875v4.375h-2.375v-4.125c0-1.25-.625-1.875-1.75-1.875-1.125 0-2 .75-2 2V17.25H38.5zM52.5 17.5c-2.625 0-4.5-1.75-4.5-4.375S49.875 8.75 52.5 8.75s4.5 1.75 4.5 4.375S55.125 17.5 52.5 17.5zm0-2c1.25 0 2.125-.875 2.125-2.375S53.75 10.75 52.5 10.75s-2.125.875-2.125 2.375S51.25 15.5 52.5 15.5zM62.375 17.5c-1.625 0-2.875-.625-3.5-1.625l1.625-1.25c.5.625 1.125.875 1.875.875.75 0 1.125-.25 1.125-.75 0-.375-.25-.625-1.25-.875-2-.5-3-1.25-3-2.875 0-1.625 1.375-2.75 3.375-2.75 1.5 0 2.625.5 3.375 1.5l-1.5 1.25c-.5-.625-1-.875-1.875-.875-.625 0-1 .25-1 .625 0 .375.25.625 1.375.875 1.875.5 2.875 1.25 2.875 2.875 0 1.75-1.375 3-3.5 3zM67.75 17.25V6.75h2.375v3.625C70.625 9.5 71.5 9 72.5 9c2.125 0 3.5 1.5 3.5 3.875v4.375h-2.375v-4.125c0-1.25-.625-1.875-1.625-1.875-1.125 0-1.875.75-1.875 2V17.25H67.75zM83 17.5c-2.625 0-4.5-1.875-4.5-4.375S80.375 8.75 83 8.75c1.375 0 2.5.5 3.25 1.375V9h2.25v8.25H86.25v-1.125C85.5 17 84.375 17.5 83 17.5zm.375-2c1.25 0 2.125-1 2.125-2.375S84.625 10.75 83.375 10.75s-2.125 1-2.125 2.375S82.125 15.5 83.375 15.5zM90.375 17.25V9h2.375v1.25C93.25 9.375 94.125 9 95.125 9c.5 0 .875.125 1.125.25l-.5 2.25c-.25-.125-.625-.25-1.125-.25-.875 0-1.875.5-1.875 2V17.25H90.375zM97.25 7.625c0-.875.625-1.375 1.375-1.375.75 0 1.375.5 1.375 1.375s-.625 1.375-1.375 1.375c-.75 0-1.375-.5-1.375-1.375zM97.375 17.25V9H99.75v8.25h-2.375zM106.375 17.5c-2.625 0-4.625-1.75-4.625-4.375s2-4.375 4.625-4.375c1.25 0 2.25.375 3.125 1.125l-1.25 1.625c-.5-.5-1.125-.75-1.875-.75-1.25 0-2.25.875-2.25 2.375s1 2.375 2.25 2.375c.75 0 1.375-.25 1.875-.75l1.25 1.625c-.875.75-1.875 1.125-3.125 1.125z" fill="white"/>
  </svg>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Explore", path: "/explore" },
    { label: "Learn", path: "/learn" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: "rgba(10,11,13,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: "64px", gap: "32px" }}>
         {/* Logo */}
<Link
  to="/"
  style={{
    textDecoration: "none",
    flexShrink: 0,
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  }}
>
  TedOfori
</Link>

          {/* Nav Links - desktop */}
          <div style={{ display: "flex", gap: "8px", flex: 1 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive(link.path) ? "#ffffff" : "#8a919e",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: "8px",
                  transition: "all 0.15s ease",
                  background: isActive(link.path) ? "rgba(255,255,255,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) e.target.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) e.target.style.color = "#8a919e";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }} className="hidden-mobile">
            <Link to="/signin">
              <button
                style={{
                  background: "transparent",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={(e) => e.target.style.background = "transparent"}
              >
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button
                className="btn-primary"
                style={{ padding: "10px 20px", fontSize: "15px", borderRadius: "8px" }}
              >
                Get started
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "white", marginLeft: "auto", padding: "8px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="16" x2="21" y2="16"/>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: isActive(link.path) ? "#ffffff" : "#8a919e",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  padding: "12px 8px",
                  borderRadius: "8px",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginTop: "8px", display: "flex", gap: "12px" }}>
              <Link to="/signin" onClick={() => setMobileOpen(false)} style={{ flex: 1 }}>
                <button className="btn-secondary" style={{ width: "100%", padding: "12px", fontSize: "15px" }}>
                  Sign in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} style={{ flex: 1 }}>
                <button className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: "15px" }}>
                  Get started
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
