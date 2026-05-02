// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const AUTH_ROUTES = ["/signin", "/signup"];

function Layout() {
  const location = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/asset/:id" element={<AssetDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={
            <div style={{
              background: "#0a0b0d", minHeight: "60vh",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: "16px", padding: "48px", textAlign: "center",
            }}>
              <h1 style={{ fontSize: "80px", fontWeight: 800, margin: 0, color: "rgba(255,255,255,0.1)" }}>404</h1>
              <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Page not found</h2>
              <p style={{ color: "#8a919e", margin: 0 }}>The page you're looking for doesn't exist.</p>
              <a href="/"><button className="btn-primary" style={{ padding: "12px 24px", marginTop: "8px" }}>Go home</button></a>
            </div>
          } />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
