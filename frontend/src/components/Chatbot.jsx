import React, { useState, useEffect } from "react";
import axios from "axios";
import { typeText } from "../utils/TypingEffect";

export default function Chatbot({ addHistory, preloadText }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (preloadText) {
      setQuery(preloadText);
      setResponse("");
    }
  }, [preloadText]);

  const handleAsk = async () => {
    if (!query.trim()) return alert("Please enter a question.");
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const res = await axios.post("http://localhost:8000/chatbot", {
        query: `Today's date is ${today}. ${query}`,
      });

      let data = res.data.reply || res.data.response || JSON.stringify(res.data);
      addHistory("Chatbot", query, data);

      // 🎬 Apply typing animation
      typeText(data, setResponse);
    } catch (err) {
      console.error(err);
      alert("Error contacting backend.");
    }

    setLoading(false);
  };

  const renderSources = (text) => {
    if (!text.includes("Sources:")) return <p>{text}</p>;
    const [reply, sourcesPart] = text.split("Sources:");
    const links = sourcesPart
      .split("\n")
      .filter((l) => l.includes("http"))
      .map((line) => {
        const match = line.match(/\[(.*?)\]\((.*?)\)/);
        if (!match) return null;
        const [, name, url] = match;
        return { name, url };
      })
      .filter(Boolean);

    return (
      <div>
        <p style={{ marginBottom: "12px" }}>{reply.trim()}</p>
        {links.length > 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "10px",
              padding: "12px 16px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 15px rgba(0,255,204,0.1)",
            }}
          >
            <h4
              style={{
                color: "#00ffcc",
                marginBottom: "8px",
                fontSize: "15px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Sources
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {links.map((link, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#aadfff",
                      textDecoration: "none",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#00ffcc")}
                    onMouseLeave={(e) => (e.target.style.color = "#aadfff")}
                  >
                    🔗 {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card fade-in">
      <h3>💬 Misinformation Chatbot</h3>
      <p className="kv">Ask about viral claims, events, or fact-checkable news.</p>

      <textarea
        className="input"
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
      />

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button className="btn" onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        <button
          className="btn"
          onClick={() => {
            setQuery("");
            setResponse("");
          }}
        >
          Clear
        </button>
      </div>

      {response && (
        <div
          style={{
            marginTop: "22px",
            backgroundColor: "rgba(255,255,255,0.03)",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h4
            style={{
              color: "#e0e0e0",
              marginBottom: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            AI Reply
          </h4>
          <div style={{ color: "#ccc", fontSize: "15px", lineHeight: 1.6 }}>
            {renderSources(response)}
          </div>
        </div>
      )}
    </div>
  );
}
