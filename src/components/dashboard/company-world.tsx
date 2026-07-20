"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Factory,
  Radio,
  Sparkles,
  Truck,
  Warehouse,
  X,
  Zap,
} from "lucide-react";

export type FacilityId = "hq" | "factory" | "warehouse" | "distribution" | "power";

export interface FacilityNode {
  id: FacilityId;
  name: string;
  type: string;
  icon: typeof Building2;
  status: "Operational" | "Peak Load" | "Optimizing";
  accentColor: string;
  glowColor: string;
  borderColor: string;
  bgLight: string;
  xPercent: number; // grid position
  yPercent: number;
  capacity: number; // 0 - 100
  utilization: number; // 0 - 100
  health: number; // 0 - 100
  currentLoad: number; // MW or Units
  risk: number; // 0 - 100
  recommendation: string;
  pulseAnimation: string;
}

const initialFacilities: Record<FacilityId, FacilityNode> = {
  hq: {
    id: "hq",
    name: "Executive HQ",
    type: "Command & Control",
    icon: Building2,
    status: "Operational",
    accentColor: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.45)",
    borderColor: "border-cyan-400/60",
    bgLight: "bg-cyan-500/10 text-cyan-400",
    xPercent: 20,
    yPercent: 22,
    capacity: 94,
    utilization: 88,
    health: 99,
    currentLoad: 420,
    risk: 3,
    recommendation: "Executive decision latency down 14%. Strategy alignment optimal across all active sub-nodes.",
    pulseAnimation: "animate-pulse",
  },
  factory: {
    id: "factory",
    name: "Apex GigaFactory",
    type: "Industrial Manufacturing",
    icon: Factory,
    status: "Peak Load",
    accentColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.45)",
    borderColor: "border-orange-400/60",
    bgLight: "bg-orange-500/10 text-orange-400",
    xPercent: 74,
    yPercent: 26,
    capacity: 86,
    utilization: 94,
    health: 93,
    currentLoad: 890,
    risk: 14,
    recommendation: "Assembly line #3 thermal peak detected. Recommend shifting 8% production throughput to secondary cell.",
    pulseAnimation: "animate-ping",
  },
  warehouse: {
    id: "warehouse",
    name: "Central Logistics Hub",
    type: "Automated Storage",
    icon: Warehouse,
    status: "Operational",
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.45)",
    borderColor: "border-blue-400/60",
    bgLight: "bg-blue-500/10 text-blue-400",
    xPercent: 46,
    yPercent: 54,
    capacity: 80,
    utilization: 82,
    health: 97,
    currentLoad: 640,
    risk: 5,
    recommendation: "Buffer stock optimal. Automated sorting efficiency performing at 99.1% precision.",
    pulseAnimation: "animate-pulse",
  },
  distribution: {
    id: "distribution",
    name: "Global Transport Node",
    type: "Dispatch & Freight",
    icon: Truck,
    status: "Optimizing",
    accentColor: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.45)",
    borderColor: "border-purple-400/60",
    bgLight: "bg-purple-500/10 text-purple-400",
    xPercent: 78,
    yPercent: 72,
    capacity: 91,
    utilization: 87,
    health: 94,
    currentLoad: 530,
    risk: 8,
    recommendation: "Reroute transatlantic air freight via secondary transport hub to save $140,000/week.",
    pulseAnimation: "animate-pulse",
  },
  power: {
    id: "power",
    name: "Clean Energy Grid",
    type: "Power & Renewables",
    icon: Zap,
    status: "Operational",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.45)",
    borderColor: "border-emerald-400/60",
    bgLight: "bg-emerald-500/10 text-emerald-400",
    xPercent: 18,
    yPercent: 74,
    capacity: 100,
    utilization: 72,
    health: 99,
    currentLoad: 1250,
    risk: 2,
    recommendation: "Solar generation surplus stored in battery array B-4. Peak grid stability achieved.",
    pulseAnimation: "animate-pulse",
  },
};

const networkConnections: [FacilityId, FacilityId][] = [
  ["hq", "factory"],
  ["hq", "warehouse"],
  ["factory", "warehouse"],
  ["warehouse", "distribution"],
  ["power", "hq"],
  ["power", "factory"],
  ["power", "warehouse"],
];

export function CompanyWorld() {
  const [facilities, setFacilities] = useState<Record<FacilityId, FacilityNode>>(initialFacilities);
  const [selectedId, setSelectedId] = useState<FacilityId | null>("hq");
  const [lastSimulationTick, setLastSimulationTick] = useState<Date>(new Date());
  const [isSimulating, setIsSimulating] = useState(false);

  // Live Simulation Engine (updates metrics every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSimulating(true);
      setFacilities((prev) => {
        const next = { ...prev };
        const keys: FacilityId[] = ["hq", "factory", "warehouse", "distribution", "power"];
        
        // Pick 2 random facilities to update
        const count = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < count; i++) {
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const node = { ...next[randomKey] };
          
          const capDelta = Math.floor(Math.random() * 5) - 2;
          const utilDelta = Math.floor(Math.random() * 7) - 3;
          const healthDelta = Math.floor(Math.random() * 3) - 1;
          const riskDelta = Math.floor(Math.random() * 3) - 1;

          node.capacity = Math.min(100, Math.max(60, node.capacity + capDelta));
          node.utilization = Math.min(100, Math.max(50, node.utilization + utilDelta));
          node.health = Math.min(100, Math.max(80, node.health + healthDelta));
          node.risk = Math.min(30, Math.max(1, node.risk + riskDelta));
          node.currentLoad = Math.round(node.currentLoad * (1 + utilDelta * 0.005));

          next[randomKey] = node;
        }
        return next;
      });

      setLastSimulationTick(new Date());
      setTimeout(() => setIsSimulating(false), 1200);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const selectedFacility = selectedId ? facilities[selectedId] : null;

  return (
    <section className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07090e]/90 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
      {/* Background Decorative Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-300/40 shadow-[0_0_12px_rgba(34,211,238,0.6)] [animation:particle-float_8s_ease-in-out_infinite]"
            style={{
              left: `${(i * 17 + 8) % 90}%`,
              top: `${(i * 23 + 12) % 85}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Component Title & Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
              Interactive Digital Twin
            </p>
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">Company World</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Live telemetry & automated AI twin scenarios across active facilities
          </p>
        </div>

        {/* Live Simulation Indicator */}
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Radio
              className={`h-4 w-4 ${isSimulating ? "animate-spin text-cyan-300" : "text-emerald-400"}`}
            />
            <span className="text-xs font-medium text-slate-300">
              {isSimulating ? "Live Sync..." : "Telemetry Active"}
            </span>
          </div>
          <div className="h-3 w-px bg-white/15" />
          <span className="text-[11px] font-mono text-slate-400">
            {lastSimulationTick.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage & Inspector Split */}
      <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Isometric Canvas Area */}
        <div
          className={`relative min-h-[460px] rounded-3xl border border-white/10 bg-black/40 p-4 transition-all duration-500 ${
            selectedFacility ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-12"
          }`}
        >
          {/* SVG Animated Connections Layer */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="cyan-purple-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {networkConnections.map(([sourceId, targetId]) => {
              const source = facilities[sourceId];
              const target = facilities[targetId];

              const isConnectedToSelected =
                selectedId === sourceId || selectedId === targetId;

              return (
                <g key={`${sourceId}-${targetId}`}>
                  {/* Outer Glow Line */}
                  <line
                    x1={`${source.xPercent}%`}
                    y1={`${source.yPercent}%`}
                    x2={`${target.xPercent}%`}
                    y2={`${target.yPercent}%`}
                    stroke={isConnectedToSelected ? source.accentColor : "rgba(255,255,255,0.12)"}
                    strokeWidth={isConnectedToSelected ? "3" : "1.5"}
                    strokeDasharray="6 8"
                    filter="url(#glow-line)"
                    className="transition-all duration-300"
                  />
                  {/* Moving Flow Pulse Line */}
                  <line
                    x1={`${source.xPercent}%`}
                    y1={`${source.yPercent}%`}
                    x2={`${target.xPercent}%`}
                    y2={`${target.yPercent}%`}
                    stroke="url(#cyan-purple-flow)"
                    strokeWidth={isConnectedToSelected ? "3" : "2"}
                    strokeDasharray="8 12"
                    strokeDashoffset="0"
                    className="[animation:line-flow_3s_linear_infinite]"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Facility Nodes */}
          {Object.values(facilities).map((node) => {
            const Icon = node.icon;
            const isSelected = selectedId === node.id;

            return (
              <motion.div
                key={node.id}
                style={{
                  left: `${node.xPercent}%`,
                  top: `${node.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                whileHover={{ scale: 1.08 }}
                onClick={() => setSelectedId(node.id)}
              >
                {/* Active Pulsing Halo */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-current"
                    style={{ color: node.accentColor }}
                  />
                )}

                {/* Node Box */}
                <div
                  className={`group relative flex items-center gap-3 rounded-2xl border px-3.5 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                    isSelected
                      ? `bg-black/90 ${node.borderColor} ring-2 ring-current shadow-[0_0_35px_rgba(34,211,238,0.35)] scale-105`
                      : "border-white/15 bg-slate-900/80 hover:border-white/40 hover:bg-slate-900/95"
                  }`}
                  style={{ borderColor: isSelected ? node.accentColor : undefined }}
                >
                  {/* Icon Badge */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                      isSelected
                        ? "border-current shadow-lg"
                        : "border-white/10 bg-white/5 text-slate-300 group-hover:border-white/30"
                    }`}
                    style={{
                      borderColor: isSelected ? node.accentColor : undefined,
                      backgroundColor: isSelected ? node.glowColor : undefined,
                      color: node.accentColor,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Node Label & Metrics Preview */}
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-white">{node.name}</span>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: node.accentColor }}
                      />
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                      <span>Cap: <strong className="text-slate-200">{node.capacity}%</strong></span>
                      <span>•</span>
                      <span>Health: <strong className="text-emerald-400">{node.health}%</strong></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right-Side Interactive Inspector Panel */}
        <AnimatePresence mode="wait">
          {selectedFacility && (
            <motion.aside
              key={selectedFacility.id}
              initial={{ opacity: 0, x: 28, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 28, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex flex-col justify-between rounded-3xl border border-white/15 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-2xl lg:col-span-5 xl:col-span-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full shadow-md"
                        style={{ backgroundColor: selectedFacility.accentColor }}
                      />
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                        {selectedFacility.type}
                      </span>
                    </div>
                    <h3 className="mt-1 text-2xl font-bold text-white">
                      {selectedFacility.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="rounded-full border border-white/10 bg-white/5 p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <span className="text-xs text-slate-400">Operating State</span>
                  <span
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${selectedFacility.accentColor}20`,
                      color: selectedFacility.accentColor,
                    }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {selectedFacility.status}
                  </span>
                </div>

                {/* Animated Telemetry Metrics */}
                <div className="mt-5 space-y-4">
                  {/* Capacity Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Capacity Utilization</span>
                      <span className="font-mono">{selectedFacility.capacity}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedFacility.accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedFacility.capacity}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Utilization Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Current Output Load</span>
                      <span className="font-mono">{selectedFacility.currentLoad} Units</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedFacility.utilization}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Facility Health Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Node Health Score</span>
                      <span className="font-mono text-emerald-400">{selectedFacility.health}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedFacility.health}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Risk Score Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Risk Exposure</span>
                      <span className="font-mono text-amber-400">{selectedFacility.risk}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-amber-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedFacility.risk * 3}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Box */}
                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      AI Twin Recommendation
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-300">
                    {selectedFacility.recommendation}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  className="flex-1 rounded-full bg-white py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-200"
                  onClick={() => alert(`Optimizing ${selectedFacility.name} via AI Twin Engine...`)}
                >
                  Apply AI Optimization
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
