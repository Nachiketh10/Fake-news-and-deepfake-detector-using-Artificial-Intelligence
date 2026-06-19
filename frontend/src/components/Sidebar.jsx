import React from "react";
import { FaNewspaper, FaImage, FaRobot } from "react-icons/fa";

const MENU = [
  { id: "Fake News", label: "Fake News", icon: <FaNewspaper /> },
  { id: "Deepfake", label: "Deepfake Image", icon: <FaImage /> },
  { id: "Chatbot", label: "Chatbot", icon: <FaRobot /> },
];

export default function Sidebar({ selected, setSelected }) {
  return (
    <aside className="sidebar">
      {MENU.map((m) => (
        <div
          key={m.id}
          className={`menu-btn ${selected === m.id ? "active" : ""}`}
          onClick={() => setSelected(m.id)}
          role="button"
        >
          <div style={{width:28, textAlign:"center", fontSize:16}}>{m.icon}</div>
          <div style={{fontWeight:600}}>{m.label}</div>
        </div>
      ))}
    </aside>
  );
}
