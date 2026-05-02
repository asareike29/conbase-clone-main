// components/common/Button.jsx
export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  style = {},
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "14px" },
    md: { padding: "12px 24px", fontSize: "15px" },
    lg: { padding: "16px 32px", fontSize: "16px" },
  };

  const variants = {
    primary: {
      background: "#0052ff",
      color: "white",
      border: "none",
    },
    secondary: {
      background: "transparent",
      color: "white",
      border: "1.5px solid rgba(255,255,255,0.2)",
    },
    ghost: {
      background: "transparent",
      color: "#8a919e",
      border: "none",
    },
    danger: {
      background: "#f04124",
      color: "white",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: "8px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : "auto",
        transition: "all 0.2s ease",
        fontFamily: "inherit",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === "primary") {
            e.currentTarget.style.background = "#1a66ff";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,82,255,0.35)";
          } else if (variant === "secondary") {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === "primary") {
            e.currentTarget.style.background = "#0052ff";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          } else if (variant === "secondary") {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.background = "transparent";
          }
        }
      }}
    >
      {children}
    </button>
  );
}
