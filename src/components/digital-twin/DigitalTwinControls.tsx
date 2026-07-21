"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Zap,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  Layers,
  Building2,
  Factory as FactoryIcon,
  Warehouse as WarehouseIcon,
  Anchor,
  Compass,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { WorldMode, DayNightMode, SimResultRow, FloorDef } from "./digitalTwinTypes";
import { FLOOR_DATA } from "./InteriorSystem";

interface DigitalTwinControlsProps {
  mode: WorldMode;
  worldMode: DayNightMode;
  explore: boolean;
  isImmersive: boolean;
  simBusy: boolean;
  activeNav: string;
  hqFloor: number;
  simResults: SimResultRow[] | null;
  onNavClick: (nav: string) => void;
  onToggleDayNight: () => void;
  onToggleExplore: () => void;
  onToggleImmersive: () => void;
  onRunSim: () => void;
  onResetCamera: () => void;
  onExitInterior: () => void;
  onSetHQFloor: (n: number) => void;
}

export const DigitalTwinControls: React.FC<DigitalTwinControlsProps> = ({
  mode,
  worldMode,
  explore,
  isImmersive,
  simBusy,
  activeNav,
  hqFloor,
  simResults,
  onNavClick,
  onToggleDayNight,
  onToggleExplore,
  onToggleImmersive,
  onRunSim,
  onResetCamera,
  onExitInterior,
  onSetHQFloor,
}) => {
  const [clockStr, setClockStr] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      setClockStr(new Date().toLocaleTimeString());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "world", label: "World", icon: <Layers className="h-3.5 w-3.5" /> },
    { id: "hq", label: "HQ", icon: <Building2 className="h-3.5 w-3.5" /> },
    { id: "factory", label: "Factory", icon: <FactoryIcon className="h-3.5 w-3.5" /> },
    { id: "warehouse", label: "Warehouse", icon: <WarehouseIcon className="h-3.5 w-3.5" /> },
    { id: "port", label: "Port", icon: <Anchor className="h-3.5 w-3.5" /> },
    { id: "energy", label: "Energy", icon: <Zap className="h-3.5 w-3.5" /> },
  ];

  const getFacilityTitle = () => {
    if (mode === "HQ") return "Executive HQ • Interior";
    if (mode === "FAC") return "Apex Factory • Interior";
    switch (activeNav) {
      case "hq":
        return "Executive Headquarters";
      case "factory":
        return "Apex Factory";
      case "warehouse":
        return "Central Warehouse";
      case "port":
        return "Maritime Port";
      case "energy":
        return "Renewable Energy Park";
      default:
        return "Enterprise Digital Twin Campus";
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-3 sm:p-4">
      {/* Top Floating Toolbar */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Nav Tabs */}
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 p-1.5 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                activeNav === item.id
                  ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day / Night Toggle — Fixed Action Labels */}
          <button
            onClick={onToggleDayNight}
            className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-xl transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {worldMode === "night" ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span>Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-sky-500" />
                <span>Night Mode</span>
              </>
            )}
          </button>

          {/* Run AI Simulation Button */}
          <button
            onClick={onRunSim}
            disabled={simBusy}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition shadow-md ${
              simBusy
                ? "border-purple-400 bg-purple-600 text-white shadow-purple-500/40 animate-pulse"
                : "border-purple-400/50 bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500"
            }`}
          >
            <Zap className={`h-3.5 w-3.5 ${simBusy ? "animate-spin" : ""}`} />
            <span>{simBusy ? "Simulating..." : "⚡ Run AI Simulation"}</span>
          </button>

          {/* Explore Mode Button */}
          <button
            onClick={onToggleExplore}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition shadow-md ${
              explore
                ? "border-cyan-400 bg-cyan-600 text-white"
                : "border-slate-200/80 bg-white/90 text-slate-800 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>{explore ? "Exit Explore" : "Explore"}</span>
          </button>

          {/* Immersive Fullscreen Toggle */}
          <button
            onClick={onToggleImmersive}
            className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-xl transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isImmersive ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isImmersive ? "Exit Immersive" : "Immersive"}</span>
          </button>

          {/* Reset Camera Button */}
          <button
            onClick={onResetCamera}
            title="Reset Camera"
            className="flex items-center justify-center rounded-full border border-slate-200/80 bg-white/90 p-2 text-xs font-bold text-slate-800 shadow-md backdrop-blur-xl transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Interior Floor Switcher HUD (Active inside HQ) */}
      <AnimatePresence>
        {mode === "HQ" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto absolute left-1/2 top-18 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-1.5 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                Floor {hqFloor} • {FLOOR_DATA[hqFloor - 1]?.label}
              </span>
              <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {FLOOR_DATA[hqFloor - 1]?.dept} • {FLOOR_DATA[hqFloor - 1]?.emp} Personnel
              </span>
            </div>

            <div className="flex gap-1.5 rounded-full border border-slate-200/80 bg-white/95 p-1 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95">
              {FLOOR_DATA.map((f: FloorDef) => (
                <button
                  key={f.n}
                  onClick={() => onSetHQFloor(f.n)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    hqFloor === f.n
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
                  }`}
                >
                  F{f.n}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Left Status Drawer */}
      <div className="pointer-events-auto absolute bottom-4 left-4 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 min-w-56 text-slate-900 dark:text-white">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Selected Facility Node
        </span>
        <strong className="text-sm font-extrabold block mt-0.5">{getFacilityTitle()}</strong>
        <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span>All systems nominal • {clockStr}</span>
        </div>
        <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
          Mode: {worldMode === "night" ? "Night" : "Day"} • {mode === "WORLD" ? "Overview" : mode} • {explore ? "Camera free" : "Camera locked"}
        </span>
      </div>

      {/* Bottom Center "Back to Company World" Button */}
      <AnimatePresence>
        {mode !== "WORLD" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto absolute bottom-5 left-1/2 -translate-x-1/2"
          >
            <button
              onClick={onExitInterior}
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs font-extrabold text-slate-900 shadow-2xl backdrop-blur-2xl hover:bg-slate-100 dark:border-cyan-400/40 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>← Back to Company World</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Simulation Results Panel */}
      <AnimatePresence>
        {simResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto absolute bottom-4 right-4 z-20 w-72 rounded-3xl border border-cyan-400/40 bg-white/95 p-4 shadow-2xl backdrop-blur-2xl dark:border-cyan-400/30 dark:bg-slate-900/95 text-slate-900 dark:text-white"
          >
            <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-white/10 pb-2">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                AI Optimization Result
              </h4>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              {simResults.map((r, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{r.label}</span>
                  <span
                    className={`font-bold font-mono ${
                      r.trend === "up"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-cyan-600 dark:text-cyan-400"
                    }`}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
