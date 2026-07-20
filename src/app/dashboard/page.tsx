"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
} from "lucide-react";
import { ActionCenter } from "@/components/dashboard/action-center";
import { AiCopilot } from "@/components/dashboard/ai-copilot";
import { BusinessHealth } from "@/components/dashboard/business-health";
import { CompanyWorld } from "@/components/dashboard/company-world";
import { ExecutiveAnalytics } from "@/components/dashboard/executive-analytics";
import { MetricsPanel } from "@/components/dashboard/metrics-panel";
import {
  sampleScenarios,
  ScenarioComparison,
  type ScenarioData,
} from "@/components/dashboard/scenario-comparison";
import { Timeline } from "@/components/dashboard/timeline";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardPage() {
  const [activeScenario, setActiveScenario] = useState<ScenarioData>(sampleScenarios[0]);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [presentationMode, setPresentationMode] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  const isLight = theme === "light";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen overflow-hidden transition-colors duration-300 antialiased ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#050510] text-white"
      } px-4 py-4 sm:px-6 lg:px-8`}
    >
      {/* Background Radial Gradients */}
      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-500 ${
          isLight
            ? "bg-[radial-gradient(circle_at_15%_10%,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.06),transparent_32%)]"
            : "bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#050510_0%,#090b18_45%,#050510_100%)]"
        }`}
      />

      <div className={`relative mx-auto space-y-6 transition-all duration-500 ${presentationMode ? "max-w-[1600px]" : "max-w-7xl"}`}>
        {/* Top Header Controls */}
        <AnimatePresence>
          {!presentationMode && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center justify-between gap-4 pt-2"
            >
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm transition hover:scale-[1.02] ${
                  isLight
                    ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/40 hover:text-white"
                }`}
              >
                <ArrowLeft size={14} />
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center gap-3">
                {/* Presentation Mode Toggle */}
                <button
                  onClick={() => setPresentationMode(true)}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition hover:scale-[1.03] ${
                    isLight
                      ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-100"
                      : "border-white/15 bg-white/10 text-white hover:bg-white/20"
                  }`}
                  aria-label="Enter Presentation Mode"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Present</span>
                </button>

                {/* Light/Dark Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition hover:scale-[1.03] ${
                    isLight
                      ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-100 shadow-slate-200/60"
                      : "border-white/15 bg-white/10 text-white hover:bg-white/20"
                  }`}
                  aria-label="Toggle theme"
                >
                  {isLight ? (
                    <>
                      <Moon className="h-3.5 w-3.5 text-sky-600" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-300" />
                      <span>Light</span>
                    </>
                  )}
                </button>

                <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Live Engine Online
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Presentation Mode Exit Bar */}
        <AnimatePresence>
          {presentationMode && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex items-center justify-between pt-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
                  Presentation Mode
                </span>
                <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <button
                onClick={() => setPresentationMode(false)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition hover:scale-[1.03] ${
                  isLight
                    ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-100"
                    : "border-white/15 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Exit Presentation</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!presentationMode && <Topbar />}

        {/* Dashboard Title Hero */}
        <motion.section
          layout
          className={`rounded-[2rem] border p-6 shadow-xl backdrop-blur-2xl transition-colors duration-300 sm:p-8 ${
            isLight
              ? "border-slate-200/80 bg-white/90 shadow-slate-200/50 text-slate-900"
              : "border-white/10 bg-white/[0.04] shadow-black/30 text-white"
          }`}
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-purple-200/80">
            Parallel OS · Executive Decision Suite
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className={`max-w-3xl font-semibold tracking-[-0.03em] ${presentationMode ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>
                Digital Twin Command Center
              </h2>
              <p className={`mt-4 max-w-2xl text-sm leading-6 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                Monitor financial health, risk, teams, operational nodes, and AI-generated scenarios from one responsive executive command surface.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-700 dark:text-cyan-100">
              Executive Analytics · Omniverse Engine
            </div>
          </div>
        </motion.section>

        {/* Business Health Score + Metrics Row */}
        <div className={`grid gap-6 ${presentationMode ? "lg:grid-cols-[1fr_2fr]" : "lg:grid-cols-[1fr_2fr]"}`}>
          <BusinessHealth />
          <MetricsPanel />
        </div>

        {/* Interactive Digital Twin Company World */}
        <CompanyWorld />

        {/* Scenario Comparison */}
        <ScenarioComparison activeScenario={activeScenario} />

        {/* Executive Action Center */}
        <ActionCenter />

        {/* Executive Analytics & Simulation History */}
        <ExecutiveAnalytics onSelectScenario={(sc) => setActiveScenario(sc)} />

        {/* Executive AI Copilot */}
        <AiCopilot />

        {!presentationMode && <Timeline />}
      </div>
    </motion.main>
  );
}
