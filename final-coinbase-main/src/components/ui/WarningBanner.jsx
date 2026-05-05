export default function WarningBanner() {
  return (
    <div style={{
      backgroundColor: "#f59e0b",
      color: "#1a1a1a",
      textAlign: "center",
      padding: "10px 16px",
      fontSize: "14px",
      fontWeight: "500",
      width: "100%",
      zIndex: 9999,
    }}>
      ⚠️ <strong>Student Project:</strong> This is a demo app built for educational purposes only.
      It is <strong>not affiliated with, endorsed by, or associated with Coinbase Inc.</strong>
    </div>
  );
}