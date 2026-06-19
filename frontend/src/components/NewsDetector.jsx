import React, { useState, useEffect } from "react";
import axios from "axios";
import { typeText } from "../utils/TypingEffect";

export default function NewsDetector({ addHistory, preloadText }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [animatedReasoning, setAnimatedReasoning] = useState("");

  useEffect(() => {
    if (preloadText) {
      setText(preloadText);
      setAnalysis(null);
      setAnimatedReasoning("");
    }
  }, [preloadText]);

  const analyze = async () => {
    if (!text.trim()) return alert("Enter text to analyze");
    setLoading(true);
    setAnimatedReasoning("");

    try {
      const res = await axios.post("http://localhost:8000/fake-news", { text });
      const raw = res.data.analysis || "";
      const verdictMatch = raw.match(/\[(.*?)\]/);
      const verdict = verdictMatch ? verdictMatch[1].trim() : "Unverified";
      const reasoning = raw.replace(/\[.*?\]/, "").trim();

      setAnalysis({ verdict, reasoning });
      addHistory("Fake News", text, `${verdict} - ${reasoning}`);
      typeText(reasoning, setAnimatedReasoning);
    } catch (e) {
      console.error(e);
      alert("Unable to contact backend. Make sure FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict) => {
    const v = verdict.toLowerCase();
    if (v.includes("false") || v.includes("fake")) return "#ff4d4d";
    if (v.includes("true")) return "#00ff99";
    if (v.includes("misleading")) return "#ffaa00";
    return "#00b3ff";
  };

  return (
    <div className="card fade-in">
      <h3>📜 Fake News Detection</h3>
      <p className="kv">Paste an article, headline, or claim to verify authenticity.</p>

      <textarea
        className="input"
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news text or claim..."
      />

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button className="btn" onClick={analyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze News"}
        </button>
        <button
          className="btn"
          onClick={() => {
            setText("");
            setAnalysis(null);
            setAnimatedReasoning("");
          }}
        >
          Clear
        </button>
      </div>

      {analysis && (
        <div style={{ marginTop: "25px" }}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderRadius: "14px",
              padding: "20px",
              textAlign: "center",
              fontSize: "26px",
              fontWeight: "800",
              color: getVerdictColor(analysis.verdict),
              border: `1px solid ${getVerdictColor(analysis.verdict)}`,
            }}
          >
            {analysis.verdict}
          </div>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "18px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h4 style={{ color: "#e0e0e0", marginBottom: "10px", fontSize: "17px" }}>
              Reasoning:
            </h4>
            <p
              style={{
                color: "#ccc",
                fontSize: "15px",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
              }}
            >
              {animatedReasoning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
