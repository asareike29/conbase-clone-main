// components/common/Card.jsx
export default function Card({ children, style = {}, hover = false, padding = "24px" }) {
  return (
    <div
      style={{
        background: "#111214",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding,
        transition: hover ? "all 0.2s ease" : "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {children}
    </div>
  );
}
