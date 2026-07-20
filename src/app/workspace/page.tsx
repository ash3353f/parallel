"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { CanvasViewport } from "@/components/workspace/canvas-viewport";
import { InspectorPanel } from "@/components/workspace/inspector-panel";
import { TimelinePanel } from "@/components/workspace/timeline-panel";
import { WorkspaceStatusBar } from "@/components/workspace/workspace-status-bar";
import { ScenarioManager } from "@/components/workspace/scenario-manager";
import { ReplayControls } from "@/components/workspace/replay-controls";
import { WorkspaceScenarioComparison } from "@/components/workspace/workspace-scenario-comparison";
import { ExportModal } from "@/components/workspace/export-modal";
import { SimulationEngine } from "@/components/simulation/simulation-engine";
import { CopilotDrawer } from "@/components/simulation/copilot-drawer";
import { AnalyticsWorkspace } from "@/components/analytics/analytics-workspace";

export default function WorkspacePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light default
  const [activeScenarioId, setActiveScenarioId] = useState("sc-baseline");
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#050510] dark:text-slate-100">
      {/* Top Header */}
      <div className="relative z-20 flex-none shadow-sm dark:shadow-none">
        <WorkspaceHeader
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />
        <div className="absolute right-4 top-3 z-50 flex items-center gap-2">
          <button
            onClick={() => setSelectedSidebarItem("simulation")}
            className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-700 hover:bg-cyan-500/30 dark:text-cyan-300"
          >
            Run Engine
          </button>
          <button
            onClick={() => setIsExportOpen(true)}
            className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-800 hover:bg-slate-300 dark:bg-white/10 dark:text-white"
          >
            Export Spec
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-md bg-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-0 flex-1">
        {/* Sidebar */}
        <motion.div
          animate={{ width: sidebarCollapsed ? 64 : 240 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="flex-none border-r border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b0c16]"
        >
          <WorkspaceSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            selectedItem={selectedSidebarItem}
            onSelectItem={(id) => setSelectedSidebarItem(id === selectedSidebarItem ? null : id)}
          />
        </motion.div>

        {/* Canvas Area */}
        <div className="relative flex min-w-0 flex-1 flex-col bg-slate-100 dark:bg-[#050510]">
          <CanvasViewport
            selectedNode={selectedNode}
            onSelectNode={(id) => {
              setSelectedNode(id);
              if (id) setSelectedSidebarItem(null);
            }}
          />

          {/* Modal / Drawer Overlay when sidebar item selected */}
          <AnimatePresence>
            {selectedSidebarItem && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="absolute left-6 top-20 z-30 max-h-[82vh] w-[560px] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95"
              >
                <div className="flex items-center justify-end p-2">
                  <button
                    onClick={() => setSelectedSidebarItem(null)}
                    className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {selectedSidebarItem === "simulation" && <SimulationEngine />}

                {selectedSidebarItem === "analytics" && <AnalyticsWorkspace />}

                {selectedSidebarItem === "scenarios" && (
                  <ScenarioManager
                    activeScenarioId={activeScenarioId}
                    onSelectScenario={setActiveScenarioId}
                  />
                )}

                {selectedSidebarItem === "replay" && <ReplayControls />}

                {selectedSidebarItem === "comparison" && <WorkspaceScenarioComparison />}

                {["assets", "facilities", "departments", "supply-chain", "resources", "processes"].includes(
                  selectedSidebarItem
                ) && (
                  <div className="p-4 text-center">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                      {selectedSidebarItem.replace("-", " ")} Catalog
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Drag nodes onto the React Flow canvas to connect sub-systems.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Inspector Panel */}
        <AnimatePresence>
          {selectedNode !== null && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="flex-none overflow-hidden border-l border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b0c16]"
            >
              <div className="h-full w-[320px]">
                <InspectorPanel selectedNode={selectedNode} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Panel (Timeline) */}
      <motion.div
        animate={{ height: bottomPanelOpen ? 200 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="relative flex-none border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b0c16]"
      >
        <button
          onClick={() => setBottomPanelOpen(!bottomPanelOpen)}
          className="absolute -top-6 left-1/2 flex h-6 w-16 -translate-x-1/2 items-center justify-center rounded-t-md border-x border-t border-slate-200 bg-white text-slate-500 hover:text-slate-700 dark:border-white/10 dark:bg-[#0b0c16] dark:text-slate-400 dark:hover:text-slate-200"
        >
          <div className="h-1 w-8 rounded-full bg-slate-300 dark:bg-slate-600" />
        </button>
        <div className="h-full w-full overflow-hidden">
          {bottomPanelOpen && <TimelinePanel />}
        </div>
      </motion.div>

      {/* Status Bar */}
      <div className="flex-none border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-black">
        <WorkspaceStatusBar />
      </div>

      {/* Floating Executive Copilot Drawer */}
      <CopilotDrawer />

      {/* Export Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
