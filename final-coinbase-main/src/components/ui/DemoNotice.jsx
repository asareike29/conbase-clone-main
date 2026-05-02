// components/ui/DemoNotice.jsx
export default function DemoNotice() {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        border: "1px solid #f59e0b",
        borderRadius: "8px",
        padding: "10px 14px",
        marginBottom: "20px",
        fontSize: "13px",
        color: "#fbbf24",
        textAlign: "center",
      }}
    >
      🔒 <strong>Demo app</strong> — Do not use your real password or personal details.
    </div>
  );
}