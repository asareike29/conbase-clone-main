// components/layout/Navbar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: "Explore", path: "/explore" },
    { label: "Learn", path: "/learn" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileOpen(false);
  };

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
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0, color: "#ffffff", fontSize: "20px", fontWeight: "700", letterSpacing: "0.5px" }}>
            Con<span style={{ color: "#0052ff" }}>base</span>
          </Link>

          {/* Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden-mobile">
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
                onMouseEnter={(e) => { if (!isActive(link.path)) e.target.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { if (!isActive(link.path)) e.target.style.color = "#8a919e"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }} className="hidden-mobile">
            {user ? (
              <>
                <span style={{ color: "#8a919e", fontSize: "15px" }}>
                  Hi, <span style={{ color: "#ffffff", fontWeight: 600 }}>{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
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
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    Sign in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn-primary" style={{ padding: "10px 20px", fontSize: "15px", borderRadius: "8px" }}>
                    Get started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{ background: "none", border: "none", cursor: "pointer", color: "white", marginLeft: "auto", padding: "8px" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              ) : (
                <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="16" x2="21" y2="16"/></>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{ color: isActive(link.path) ? "#ffffff" : "#8a919e", textDecoration: "none", fontSize: "16px", fontWeight: 500, padding: "12px 8px", borderRadius: "8px", display: "block" }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginTop: "8px", display: "flex", gap: "12px" }}>
              {user ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span style={{ color: "#8a919e", fontSize: "15px", padding: "0 4px" }}>
                    Signed in as <span style={{ color: "#ffffff", fontWeight: 600 }}>{user.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary"
                    style={{ width: "100%", padding: "12px", fontSize: "15px" }}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setMobileOpen(false)} style={{ flex: 1 }}>
                    <button className="btn-secondary" style={{ width: "100%", padding: "12px", fontSize: "15px" }}>Sign in</button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} style={{ flex: 1 }}>
                    <button className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: "15px" }}>Get started</button>
                  </Link>
                </>
              )}
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