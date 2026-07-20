"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Plus,
  Trash2,
  Edit3,
  Layers,
  X,
} from "lucide-react";

export interface ScenarioItem {
  id: string;
  name: string;
  createdTime: string;
  lastSimulation: string;
  status: "Active" | "Simulated" | "Draft";
  simulationCount: number;
}

export const initialScenarios: ScenarioItem[] = [
  {
    id: "sc-baseline",
    name: "Baseline Operational Model v2.4",
    createdTime: "Today 08:00 AM",
    lastSimulation: "12m ago",
    status: "Active",
    simulationCount: 18,
  },
  {
    id: "sc-expansion",
    name: "Apex Factory Output +15% Plan",
    createdTime: "Yesterday 04:30 PM",
    lastSimulation: "2h ago",
    status: "Simulated",
    simulationCount: 7,
  },
  {
    id: "sc-energy",
    name: "Clean Energy Grid Shift - Q3",
    createdTime: "Jul 18, 2026",
    lastSimulation: "1d ago",
    status: "Simulated",
    simulationCount: 12,
  },
  {
    id: "sc-freight",
    name: "Transatlantic Logistics Reroute",
    createdTime: "Jul 15, 2026",
    lastSimulation: "3d ago",
    status: "Draft",
    simulationCount: 4,
  },
];

interface ScenarioManagerProps {
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
}

export function ScenarioManager({
  activeScenarioId,
  onSelectScenario,
}: ScenarioManagerProps) {
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(initialScenarios);
  const [isCreating, setIsCreating] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = () => {
    if (!newScenarioName.trim()) return;
    const newItem: ScenarioItem = {
      id: `sc-${Date.now()}`,
      name: newScenarioName.trim(),
      createdTime: "Just now",
      lastSimulation: "Not run yet",
      status: "Draft",
      simulationCount: 0,
    };
    setScenarios([newItem, ...scenarios]);
    setNewScenarioName("");
    setIsCreating(false);
  };

  const handleDuplicate = (id: string) => {
    const item = scenarios.find((s) => s.id === id);
    if (!item) return;
    const dup: ScenarioItem = {
      ...item,
      id: `sc-dup-${Date.now()}`,
      name: `${item.name} (Copy)`,
      createdTime: "Just now",
      status: "Draft",
    };
    setScenarios([dup, ...scenarios]);
  };

  const handleDelete = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios(scenarios.filter((s) => s.id !== id));
    if (activeScenarioId === id) {
      const remaining = scenarios.filter((s) => s.id !== id);
      if (remaining.length > 0) onSelectScenario(remaining[0].id);
    }
  };

  const handleRename = (id: string) => {
    if (!editName.trim()) return;
    setScenarios(
      scenarios.map((s) => (s.id === id ? { ...s, name: editName.trim() } : s))
    );
    setEditingId(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-cyan-500" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Scenario Manager
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage, compare & fork Digital Twin operational models
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md transition hover:bg-cyan-400"
        >
          <Plus className="h-4 w-4" />
          <span>New Scenario</span>
        </button>
      </div>

      {/* Create Modal Input */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                Create New Scenario Fork
              </span>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2.5 flex gap-2">
              <input
                type="text"
                value={newScenarioName}
                onChange={(e) => setNewScenarioName(e.target.value)}
                placeholder="e.g. Q4 Regional Warehouse Expansion"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
              <button
                onClick={handleCreate}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
              >
                Create
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenario List */}
      <div className="mt-4 space-y-2.5">
        {scenarios.map((sc) => {
          const isActive = sc.id === activeScenarioId;

          return (
            <div
              key={sc.id}
              onClick={() => onSelectScenario(sc.id)}
              className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all cursor-pointer ${
                isActive
                  ? "border-cyan-400/60 bg-cyan-500/10 shadow-lg dark:bg-cyan-950/40 ring-1 ring-cyan-400"
                  : "border-slate-200/80 bg-slate-50/70 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-3 w-3 rounded-full ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                />
                <div>
                  {editingId === sc.id ? (
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="rounded border border-slate-300 px-2 py-0.5 text-xs text-slate-900 dark:bg-slate-950 dark:text-white"
                      />
                      <button
                        onClick={() => handleRename(sc.id)}
                        className="text-xs font-bold text-cyan-500"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {sc.name}
                    </h4>
                  )}
                  <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                    <span>Created: {sc.createdTime}</span>
                    <span>•</span>
                    <span>Runs: {sc.simulationCount}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => {
                    setEditingId(sc.id);
                    setEditName(sc.name);
                  }}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  title="Rename"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDuplicate(sc.id)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  title="Duplicate"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(sc.id)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
