import React from "react";

export default function HistoryPanel({ items, onSelect }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: "12px",
        padding: "15px",
        border: "1px solid rgba(255,255,255,0.08)",
        maxHeight: "350px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ color: "#e0e0e0", marginBottom: "12px" }}>📜 History</h3>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect && onSelect(item)} // ✅ Click handler
            style={{
              backgroundColor: "rgba(0,0,0,0.25)",
              borderRadius: "10px",
              padding: "10px 14px",
              marginBottom: "10px",
              color: "#cccccc",
              fontSize: "14px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderLeft: "3px solid #00ced1",
              transition: "0.3s",
              cursor: "pointer",
            }}
            title={item.input}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(0,255,204,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.25)")
            }
          >
            {item.input.length > 60
              ? item.input.substring(0, 60) + "..."
              : item.input}
          </div>
        ))
      ) : (
        <p style={{ color: "#777", fontSize: "14px" }}>No history yet.</p>
      )}
    </div>
  );
}
