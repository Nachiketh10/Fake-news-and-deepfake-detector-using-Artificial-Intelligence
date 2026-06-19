import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NewsDetector from "./components/NewsDetector";
import DeepfakeDetector from "./components/DeepfakeDetector";
import Chatbot from "./components/Chatbot";
import HistoryPanel from "./components/HistoryPanel";

/**
 * Glassmorphism One Page App
 */
export default function App() {
  const [selected, setSelected] = useState("Fake News");
  const [history, setHistory] = useState([]);
  const [preloadText, setPreloadText] = useState(""); // ✅ added for reloading text

  const addHistory = (task, input, result) => {
    setHistory((prev) => [{ task, input, result, ts: Date.now() }, ...prev].slice(0, 200));
  };

  return (
    <div className="app-root">
      <Navbar />
      <div className="layout">
        <Sidebar selected={selected} setSelected={setSelected} />
        <main className="main-area">
          <div className="hero-card card">
            <div className="hero-left">
              <h1>AI Fake News & Deepfake Detector</h1>
            </div>
          </div>

          <section className="content-wrap">
            {selected === "Fake News" && (
              <NewsDetector addHistory={addHistory} preloadText={preloadText} />
            )}
            {selected === "Deepfake" && (
              <DeepfakeDetector addHistory={addHistory} preloadText={preloadText} />
            )}
            {selected === "Chatbot" && (
              <Chatbot addHistory={addHistory} preloadText={preloadText} /> // ✅ added preloadText
            )}
          </section>
        </main>

        <aside className="right-col">
          <div className="sticky-col">
            <HistoryPanel
              items={history}
              onSelect={(item) => {
                if (item.task === "Fake News") {
                  setSelected("Fake News");
                  setPreloadText(item.input); // ✅ reloads Fake News text
                } else if (item.task === "Deepfake") {
                  setSelected("Deepfake");
                  setPreloadText(item.input); // ✅ preload file/image name if needed
                  alert(`Previously analyzed image: ${item.input}`);
                } else if (item.task === "Chatbot") {
                  setSelected("Chatbot");
                  setPreloadText(item.input); // ✅ reloads chatbot question
                }
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
