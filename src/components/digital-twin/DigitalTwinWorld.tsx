"use client";

import React, { useState, useRef } from "react";
import { ThreeScene, ThreeSceneRef } from "./ThreeScene";
import { DigitalTwinControls } from "./DigitalTwinControls";
import { FacilityPanel } from "./FacilityPanel";
import {
  FacilityId,
  WorldMode,
  DayNightMode,
  SimResultRow,
  ToastItem,
} from "./digitalTwinTypes";
import { InfoCardData } from "./InteractionSystem";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

export const DigitalTwinWorld: React.FC = () => {
  const [mode, setMode] = useState<WorldMode>("WORLD");
  const [worldMode, setWorldMode] = useState<DayNightMode>("day");
  const [explore, setExplore] = useState<boolean>(false);
  const [isImmersive, setIsImmersive] = useState<boolean>(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<FacilityId | null>(null);
  const [activeNav, setActiveNav] = useState<string>("world");
  const [hqFloor, setHqFloor] = useState<number>(1);
  const [simBusy, setSimBusy] = useState<boolean>(false);
  const [simResults, setSimResults] = useState<SimResultRow[] | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [infoCard, setInfoCard] = useState<InfoCardData | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; show: boolean }>({
    text: "",
    x: 0,
    y: 0,
    show: false,
  });

  const apiRef = useRef<ThreeSceneRef | null>(null);

  const handleToast = (msg: string, kind: "" | "warn" | "good" = "") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, msg, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (!apiRef.current) return;
    if (nav === "world") {
      apiRef.current.navWorldOverview();
      setSelectedFacilityId(null);
    } else if (nav === "hq") {
      apiRef.current.navFocusBuilding("hq");
      setSelectedFacilityId("hq");
    } else if (nav === "factory") {
      apiRef.current.navFocusBuilding("factory");
      setSelectedFacilityId("factory");
    } else if (nav === "warehouse") {
      apiRef.current.navFocusBuilding("warehouse");
      setSelectedFacilityId("warehouse");
    } else if (nav === "port") {
      apiRef.current.navFocusBuilding("port");
      setSelectedFacilityId("port");
    } else if (nav === "energy") {
      apiRef.current.navFocusBuilding("energy");
      setSelectedFacilityId("energy");
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Header Info */}
      <div className="stage-head">
        <div>
          <span className="eyebrow">Interactive Campus Stage</span>
          <h2>Digital Twin Operational Canvas</h2>
        </div>
      </div>

      {/* Stage Container */}
      <div
        className={`stage ${isImmersive ? "immersive" : ""}`}
        id="digital-twin-stage"
      >
        <ThreeScene
          onModeChange={(newMode, facId) => {
            setMode(newMode);
            if (facId) setSelectedFacilityId(facId);
          }}
          onWorldModeChange={(wm) => setWorldMode(wm)}
          onExploreChange={(exp) => setExplore(exp)}
          onShowFacilityPanel={(id) => setSelectedFacilityId(id)}
          onHideFacilityPanel={() => setSelectedFacilityId(null)}
          onShowInfoCard={(info) => setInfoCard(info)}
          onToast={handleToast}
          onSetSimBusy={(busy) => setSimBusy(busy)}
          onShowSimResults={(results) => setSimResults(results)}
          onHideSimResults={() => setSimResults(null)}
          onBumpKPIs={() => {
            // Optional callback when KPIs update
          }}
          onSetTooltip={(text, x, y, show) => setTooltip({ text, x, y, show })}
          onInitComplete={(api) => {
            apiRef.current = api;
          }}
        />

        {/* HUD Controls */}
        <DigitalTwinControls
          mode={mode}
          worldMode={worldMode}
          explore={explore}
          isImmersive={isImmersive}
          simBusy={simBusy}
          activeNav={activeNav}
          hqFloor={hqFloor}
          simResults={simResults}
          onNavClick={handleNavClick}
          onToggleDayNight={() => apiRef.current?.toggleDayNight()}
          onToggleExplore={() => apiRef.current?.setExplore(!explore)}
          onToggleImmersive={() => setIsImmersive(!isImmersive)}
          onRunSim={() => apiRef.current?.runSim()}
          onResetCamera={() => apiRef.current?.resetCamera()}
          onExitInterior={() => apiRef.current?.navExitInterior()}
          onSetHQFloor={(n) => {
            setHqFloor(n);
            apiRef.current?.setHQFloor(n);
          }}
        />

        {/* Hover Tooltip */}
        <div
          className={`world-tooltip ${tooltip.show ? "show" : ""}`}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          {tooltip.text}
        </div>

        {/* Facility Slide-Out Drawer Panel */}
        <FacilityPanel
          facilityId={selectedFacilityId}
          onClose={() => setSelectedFacilityId(null)}
          onEnterHQ={() => apiRef.current?.navEnterHQ()}
          onEnterFactory={() => apiRef.current?.navEnterFactory()}
        />

        {/* Inspector Modal (Info Card) */}
        <AnimatePresence>
          {infoCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-1/2 top-1/2 z-30 w-80 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95 text-slate-900 dark:text-white"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-500" />
                  <h3 className="text-sm font-extrabold">{infoCard.title}</h3>
                </div>
                <button
                  onClick={() => setInfoCard(null)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                {infoCard.fields.map((f, i) => (
                  <div key={i} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{f.label}</span>
                    <span className="font-bold">{f.val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setInfoCard(null)}
                  className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toasts System */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 flex-col gap-2">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`pointer-events-auto flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-bold shadow-xl backdrop-blur-xl ${
                  t.kind === "warn"
                    ? "border-amber-400/40 bg-amber-500/90 text-white"
                    : t.kind === "good"
                    ? "border-emerald-400/40 bg-emerald-600/90 text-white"
                    : "border-cyan-400/40 bg-slate-900/90 text-white dark:bg-slate-800/90"
                }`}
              >
                {t.kind === "warn" ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : t.kind === "good" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                )}
                <span>{t.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
