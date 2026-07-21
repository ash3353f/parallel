"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Search, Maximize2, Minimize2, Lock } from "lucide-react";

interface TopbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  presentationMode: boolean;
  onTogglePresentation: () => void;
  onLockDemo?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  theme,
  onToggleTheme,
  presentationMode,
  onTogglePresentation,
  onLockDemo,
  onNavigateSection,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tabId: string, sectionId: string) => {
    setActiveTab(tabId);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <div className="mark" />
        <span>PARALLEL</span>
      </Link>

      <div className="nav-tabs">
        <button
          onClick={() => handleTabClick("overview", "section-pulse")}
          className={activeTab === "overview" ? "active" : ""}
        >
          Overview
        </button>

        <button
          onClick={() => handleTabClick("twin", "section-world")}
          className={activeTab === "twin" ? "active" : ""}
        >
          Digital Twin
        </button>

        <button
          onClick={() => handleTabClick("simulation", "section-simulation")}
          className={activeTab === "simulation" ? "active" : ""}
        >
          Simulation
        </button>

        <button
          onClick={() => handleTabClick("analytics", "section-analytics")}
          className={activeTab === "analytics" ? "active" : ""}
        >
          Analytics
        </button>

        <button
          onClick={() => handleTabClick("copilot", "section-copilot")}
          className={activeTab === "copilot" ? "active" : ""}
        >
          Copilot
        </button>
      </div>

      <div className="nav-right">
        {/* Search */}
        <div className="search">
          <Search className="h-3.5 w-3.5 opacity-60" />
          <input type="text" placeholder="Search facilities, nodes, KPIs…" />
          <kbd>⌘K</kbd>
        </div>

        {/* Live Engine Badge */}
        <div className="live">
          <span className="d" />
          <span className="t">LIVE ENGINE</span>
        </div>

        {/* Dev Reset / Lock Demo Gate Button */}
        {onLockDemo && (
          <button
            onClick={onLockDemo}
            className="iconbtn"
            title="Lock Demo & Show Lamp Intro"
            aria-label="Lock Demo"
          >
            <Lock className="h-4 w-4 text-amber-500" />
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="iconbtn"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

        {/* Present Mode */}
        <button onClick={onTogglePresentation} className="present-btn">
          {presentationMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          <span>{presentationMode ? "Exit Present" : "Present"}</span>
        </button>
      </div>
    </nav>
  );
};
