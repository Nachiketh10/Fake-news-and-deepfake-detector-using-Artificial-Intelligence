import React, { useState } from "react";
import { typeText } from "../utils/TypingEffect";

export default function DeepfakeDetector({ addHistory }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [typedConfidence, setTypedConfidence] = useState("");

  // 📁 Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setTypedConfidence("");
    }
  };

  // 🧠 Deepfake analysis
  const handleAnalyze = async () => {
    if (!selectedFile) return alert("Please upload an image first");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://127.0.0.1:8000/deepfake", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);

      const confidenceMsg = `Confidence Score: ${(data.confidence * 100).toFixed(
        1
      )} / 100`;
      addHistory("Deepfake", selectedFile.name, confidenceMsg);

      // 🎬 Animate confidence typing only
      typeText(confidenceMsg, setTypedConfidence);
    } catch (err) {
      console.error(err);
      alert("Error analyzing image");
    }

    setLoading(false);
  };

  // 🎨 Styling helpers
  const getVerdictColor = (verdict) =>
    verdict?.toLowerCase() === "fake"
      ? "rgba(255, 77, 77, 0.15)"
      : "rgba(0, 255, 153, 0.15)";

  const getVerdictTextColor = (verdict) =>
    verdict?.toLowerCase() === "fake" ? "#ff4d4d" : "#00ff99";

  return (
    <div className="card fade-in">
      <h2 className="card-title">🖼️ Deepfake Image Detection</h2>

      {/* Upload button */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <label htmlFor="file-upload" className="btn" style={{ cursor: "pointer" }}>
          {selectedFile ? "Change Image" : "Choose Image"}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Preview */}
      {preview && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "320px",
              borderRadius: "16px",
              boxShadow: "0 0 25px rgba(0,255,204,0.3)",
            }}
          />
        </div>
      )}

      {/* Analyze button */}
      <div style={{ marginTop: "25px", textAlign: "center" }}>
        <button className="btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </div>

      {/* Result with old-style animated verdict */}
      {result && (
        <div
          style={{
            marginTop: "30px",
            background: getVerdictColor(result.verdict),
            border: `1px solid ${getVerdictTextColor(result.verdict)}`,
            borderRadius: "16px",
            padding: "25px",
            textAlign: "center",
            boxShadow: `0 0 25px ${getVerdictTextColor(result.verdict)}55`,
            animation: "fadeIn 0.6s ease-in",
          }}
        >
          <h3
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: getVerdictTextColor(result.verdict),
              textShadow: `0 0 10px ${getVerdictTextColor(result.verdict)}88`,
              marginBottom: "8px",
              transition: "0.3s",
            }}
          >
            {result.verdict === "Fake" ? "🚫 Fake" : "✅ Real"}
          </h3>

          {/* Typing animated confidence line */}
          <p
            style={{
              fontSize: "18px",
              color: "#e0e0e0",
              marginBottom: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {typedConfidence}
          </p>
        </div>
      )}
    </div>
  );
}
