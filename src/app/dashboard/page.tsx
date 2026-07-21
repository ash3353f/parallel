"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Topbar } from "@/components/dashboard/topbar";
import { BusinessHealth } from "@/components/dashboard/business-health";
import { CompanyWorld } from "@/components/dashboard/company-world";
import { ScenarioComparison } from "@/components/dashboard/scenario-comparison";
import { ActionCenter } from "@/components/dashboard/action-center";
import { ExecutiveAnalytics } from "@/components/dashboard/executive-analytics";
import { AiCopilot } from "@/components/dashboard/ai-copilot";
import { Timeline } from "@/components/dashboard/timeline";
import { LampAccessExperience, AccessState } from "@/components/dashboard/lamp-access-experience";

const emptySubscribe = () => () => {};

export default function DashboardPage() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [presentationMode, setPresentationMode] = useState(false);
  const [accessState, setAccessState] = useState<AccessState>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("parallel_accessed") === "1" ? "unlocked" : "locked";
    }
    return "locked";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLockDemo = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("parallel_accessed");
    }
    setAccessState("locked");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (isServer) {
    return <div className="fixed inset-0 z-50 bg-[#07090d]" />;
  }

  return (
    <>
      {/* Lamp Access Experience Intro Gate (Always shown first unless unlocked) */}
      {accessState !== "unlocked" && (
        <LampAccessExperience
          accessState={accessState}
          onStateChange={(st) => setAccessState(st)}
          onAccessGranted={() => setAccessState("unlocked")}
        />
      )}

      {/* Main Parallel Dashboard App */}
      {accessState === "unlocked" && (
        <div
          className={`app revealed ${
            presentationMode ? "present" : ""
          }`}
        >
          {/* Navigation */}
          <Topbar
            theme={theme}
            onToggleTheme={toggleTheme}
            presentationMode={presentationMode}
            onTogglePresentation={() => setPresentationMode(!presentationMode)}
            onLockDemo={handleLockDemo}
            onNavigateSection={scrollToSection}
          />

          {/* Hero Section */}
          <header className="hero section">
            <div className="wrap">
              <span className="eyebrow">Enterprise Operational Twin</span>
              <h1>
                The Enterprise,
                <span className="l2">Understood in Motion</span>
              </h1>
              <p className="lede">
                Parallel bridges real-time telemetry, 3D spatial simulation, and predictive AI decision models into a single living enterprise operating canvas.
              </p>

              <div className="hero-actions">
                <button
                  onClick={() => scrollToSection("section-world")}
                  className="btn btn-primary"
                >
                  <span>Enter the Twin</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => scrollToSection("section-simulation")}
                  className="btn btn-cyan"
                >
                  <Zap className="h-4 w-4" />
                  <span>Run a Simulation</span>
                </button>
              </div>

              <div className="hero-meta">
                <div className="m">
                  <span className="k">ACTIVE FACILITY NODES</span>
                  <span className="v">8 Primary Compounds</span>
                </div>
                <div className="m">
                  <span className="k">AI PREDICTIVE HORIZON</span>
                  <span className="v">90 Days Continuous</span>
                </div>
                <div className="m">
                  <span className="k">SYSTEM ACCURACY</span>
                  <span className="v">96.8% Confidence</span>
                </div>
              </div>
            </div>

            {/* Floating Health Card */}
            <div className="hero-float">
              <div className="hf-top">
                <span>GLOBAL TWIN PULSE</span>
                <span className="text-emerald-500 font-bold">● ONLINE</span>
              </div>
              <div className="hf-score num text-slate-900 dark:text-white">94.8</div>
              <div className="text-xs text-slate-500 font-medium">Optimal Enterprise Health</div>
              <div className="hf-bar">
                <i style={{ width: "94.8%" }} />
              </div>
            </div>
          </header>

          {/* Business Pulse Section */}
          <BusinessHealth />

          {/* Company World 3D Stage Section */}
          <section className="section" id="section-world">
            <div className="wrap">
              <CompanyWorld />
            </div>
          </section>

          {/* AI Twin Simulation Transformation Section */}
          <ScenarioComparison />

          {/* Incident Rail Section */}
          <ActionCenter />

          {/* Executive Analytics Section */}
          <ExecutiveAnalytics />

          {/* Executive Copilot Section */}
          <AiCopilot />

          {/* Decision Timeline Section */}
          <Timeline />

          {/* Footer */}
          <footer className="foot wrap">
            <div>© 2026 Parallel Spatial Intelligence Inc. All rights reserved.</div>
            <div>Enterprise Operating System v4.8 • Built with Next.js & Three.js</div>
          </footer>
        </div>
      )}
    </>
  );
}
