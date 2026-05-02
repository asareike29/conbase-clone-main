export default function FooterDisclaimer() {
  return (
    <footer style={{
      backgroundColor: "#0a0b0d",
      color: "#8a919e",
      textAlign: "center",
      padding: "24px 16px",
      fontSize: "13px",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      marginTop: "auto",
      lineHeight: "1.8",
    }}>
      <p>
        🎓 <strong style={{ color: "#c0c6cf" }}>Demo Project</strong> — This site is a
        student-built clone created for educational purposes only.
      </p>
      <p style={{ marginTop: "6px" }}>
        ⚠️ <strong style={{ color: "#f87171" }}>Do not enter real personal information</strong>,
        real payment details, or real passwords on this site.
      </p>
      <p style={{ marginTop: "6px", color: "#555" }}>
        Not affiliated with Coinbase, Inc. All trademarks belong to their respective owners.
      </p>
    </footer>
  );
}