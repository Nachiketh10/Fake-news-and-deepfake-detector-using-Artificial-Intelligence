import React from "react";

export default function Navbar() {
  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 0",
        background: "rgba(20, 20, 30, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* 🧠 Replaces Globe Icon */}
        <img
          src="/logo.png" // <- place your image in "frontend/public/logo.png"
          alt="AI Logo"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            boxShadow: "0 0 15px rgba(0,255,204,0.5)",
          }}
        />

        {/* 🌐 Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.5px",
            color: "var(--accent)",
            textShadow: "0 0 12px rgba(0, 255, 204, 0.5)",
            textAlign: "center",
          }}
        >
          AI Fake News & Deepfake Detector
        </div>
      </div>
    </nav>
  );
}
