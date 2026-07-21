"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  FacilityId,
  WorldMode,
  SimResultRow,
  ToastItem,
  BuildingSpec,
} from "./digitalTwinTypes";
import { SPECS } from "./BuildingSystem";
import { ThreeScene, ThreeSceneRef } from "./ThreeScene";
import { FacilityPanel } from "./FacilityPanel";
import { DigitalTwinControls } from "./DigitalTwinControls";
import { InfoCardData } from "./InteractionSystem";

interface DigitalTwinWorldProps {
  className?: string;
  height?: string;
  onEnterBuilding?: (buildingId: string, buildingName: string) => void;
}

export const DigitalTwinWorld: React.FC<DigitalTwinWorldProps> = ({
  className = "",
  height = "h-[650px] lg:h-[750px]",
  onEnterBuilding,
}) => {
  const [mode, setMode] = useState<WorldMode>("WORLD");
  const [selectedId, setSelectedId] = useState<FacilityId | null>(null);
  const [activeNav, setActiveNav] = useState<string>("world");
  const [isNight, setIsNight] = useState<boolean>(false);
  const [simBusy, setSimBusy] = useState<boolean>(false);
  const [hqFloor, setHqFloor] = useState<number>(1);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [simResults, setSimResults] = useState<SimResultRow[] | null>(null);
  const [facilityPanelOpen, setFacilityPanelOpen] = useState<boolean>(false);
  const [infoCardData, setInfoCardData] = useState<InfoCardData | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; show: boolean }>({
    text: "",
    x: 0,
    y: 0,
    show: false,
  });

  const sceneApiRef = useRef<ThreeSceneRef | null>(null);

  const addToast = useCallback((msg: string, kind?: "" | "warn" | "good") => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, msg, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const handleModeChange = useCallback(
    (newMode: WorldMode, facilityId: FacilityId | null) => {
      setMode(newMode);
      setSelectedId(facilityId);
      if (facilityId) {
        setActiveNav(facilityId);
        const spec = SPECS.find((s: BuildingSpec) => s.id === facilityId);
        if (spec) {
          onEnterBuilding?.(facilityId, spec.name);
        }
      } else {
        setActiveNav("world");
      }
    },
    [onEnterBuilding]
  );

  const handleShowFacilityPanel = useCallback((id: FacilityId) => {
    setSelectedId(id);
    setFacilityPanelOpen(true);
  }, []);

  const handleHideFacilityPanel = useCallback(() => {
    setFacilityPanelOpen(false);
  }, []);

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (!sceneApiRef.current) return;
    if (navId === "world") {
      sceneApiRef.current.navWorldOverview();
    } else if (navId === "hq") {
      sceneApiRef.current.navEnterHQ();
    } else if (navId === "factory") {
      sceneApiRef.current.navEnterFactory();
    } else {
      sceneApiRef.current.navFocusBuilding(navId as FacilityId);
    }
  };

  const selectedSpec = selectedId ? SPECS.find((s: BuildingSpec) => s.id === selectedId) : null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-900 p-0 shadow-2xl backdrop-blur-2xl dark:border-white/10 ${height} ${className}`}
    >
      {/* WebGL 3D Canvas */}
      <ThreeScene
        onModeChange={handleModeChange}
        onShowFacilityPanel={handleShowFacilityPanel}
        onHideFacilityPanel={handleHideFacilityPanel}
        onShowInfoCard={setInfoCardData}
        onToast={addToast}
        onSetSimBusy={setSimBusy}
        onShowSimResults={setSimResults}
        onHideSimResults={() => setSimResults(null)}
        onBumpKPIs={() => {}}
        onDayNightChange={setIsNight}
        onSetTooltip={(text, x, y, show) => setTooltip({ text, x, y, show })}
        onInitComplete={(api) => {
          sceneApiRef.current = api;
        }}
      />

      {/* UI Controls & Overlays */}
      <DigitalTwinControls
        mode={mode}
        selectedId={selectedId}
        isNight={isNight}
        simBusy={simBusy}
        activeNav={activeNav}
        hqFloor={hqFloor}
        simResults={simResults}
        onNavClick={handleNavClick}
        onToggleDayNight={() => sceneApiRef.current?.toggleDayNight()}
        onRunSim={() => sceneApiRef.current?.runSim()}
        onResetCamera={() => sceneApiRef.current?.resetCamera()}
        onExitInterior={() => sceneApiRef.current?.navExitInterior()}
        onSetHQFloor={(n) => {
          setHqFloor(n);
          sceneApiRef.current?.setHQFloor(n);
        }}
      />

      {/* Slide-out Facility Panel */}
      <FacilityPanel
        isOpen={facilityPanelOpen}
        name={selectedSpec?.name || "Facility"}
        data={selectedSpec?.data || null}
        onClose={handleHideFacilityPanel}
      />

      {/* Hover Tooltip */}
      {tooltip.show && tooltip.text && (
        <div
          style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
          className="pointer-events-none fixed z-50 rounded-xl border border-slate-200/80 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md dark:border-white/15"
        >
          {tooltip.text}
        </div>
      )}

      {/* Element Detail Info Card Modal */}
      <AnimatePresence>
        {infoCardData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-1/2 bottom-20 z-30 min-w-64 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95 text-slate-900 dark:text-white"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
              <h4 className="text-sm font-bold">{infoCardData.title}</h4>
              <button
                onClick={() => setInfoCardData(null)}
                className="rounded-full p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 space-y-1.5 text-xs">
              {infoCardData.rows.map(([k, v], idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{k}</span>
                  <strong className="font-bold text-slate-900 dark:text-white">{v}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts Stack */}
      <div className="pointer-events-none absolute left-1/2 top-20 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-xs font-bold shadow-xl backdrop-blur-xl ${
                t.kind === "warn"
                  ? "border-amber-400/50 bg-amber-500/20 text-amber-800 dark:text-amber-300"
                  : t.kind === "good"
                  ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                  : "border-slate-200/80 bg-white/95 text-slate-900 dark:border-white/10 dark:bg-slate-900/95 dark:text-white"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  t.kind === "warn"
                    ? "bg-amber-500"
                    : t.kind === "good"
                    ? "bg-emerald-500"
                    : "bg-cyan-500"
                }`}
              />
              <span>{t.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
