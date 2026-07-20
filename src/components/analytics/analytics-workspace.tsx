"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Download,
  FileText,
  Image as ImageIcon,
  Table,
  TrendingUp,
  Zap,
  Leaf,
  Warehouse,
  Factory,
  Truck,
  Boxes,
  DollarSign,
} from "lucide-react";

export type TimeFilter = "Today" | "7 Days" | "30 Days" | "Quarter" | "Year";

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: typeof DollarSign;
  chartData: number[];
}

export function AnalyticsWorkspace() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Quarter");
  const [activeMetricId, setActiveMetricId] = useState<string>("revenue");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const timeMultiplier =
    timeFilter === "Today"
      ? 0.7
      : timeFilter === "7 Days"
        ? 0.85
        : timeFilter === "30 Days"
          ? 0.95
          : timeFilter === "Quarter"
            ? 1.0
            : 1.15;

  const metrics: AnalyticsMetric[] = [
    {
      id: "revenue",
      name: "Quarterly Revenue",
      value: `$${(51.6 * timeMultiplier).toFixed(1)}M`,
      delta: "+7.0%",
      positive: true,
      icon: DollarSign,
      chartData: [38, 42, 45, 48, 51.6].map((v) => v * timeMultiplier),
    },
    {
      id: "production",
      name: "Production Output",
      value: `${Math.round(91 * timeMultiplier)}%`,
      delta: "+15.0%",
      positive: true,
      icon: Factory,
      chartData: [65, 72, 80, 85, 91].map((v) => v * timeMultiplier),
    },
    {
      id: "warehouse",
      name: "Warehouse Utilization",
      value: `${Math.round(84 * timeMultiplier)}%`,
      delta: "+4.0%",
      positive: true,
      icon: Warehouse,
      chartData: [70, 75, 78, 82, 84].map((v) => v * timeMultiplier),
    },
    {
      id: "efficiency",
      name: "Factory Efficiency",
      value: `${Math.round(93 * timeMultiplier)}%`,
      delta: "+6.0%",
      positive: true,
      icon: Zap,
      chartData: [80, 84, 88, 90, 93].map((v) => v * timeMultiplier),
    },
    {
      id: "carbon",
      name: "Carbon Emissions",
      value: `${(5.4 * timeMultiplier).toFixed(1)} MT`,
      delta: "-5.4%",
      positive: true,
      icon: Leaf,
      chartData: [8.2, 7.5, 6.8, 6.0, 5.4].map((v) => v * timeMultiplier),
    },
    {
      id: "energy",
      name: "Energy Usage",
      value: `${Math.round(1250 * timeMultiplier)} MW`,
      delta: "-14.2%",
      positive: true,
      icon: Zap,
      chartData: [1500, 1420, 1360, 1300, 1250].map((v) => v * timeMultiplier),
    },
    {
      id: "transport",
      name: "Transport Cost",
      value: `$${(1.4 * timeMultiplier).toFixed(1)}M`,
      delta: "-22.0%",
      positive: true,
      icon: Truck,
      chartData: [2.1, 1.9, 1.7, 1.5, 1.4].map((v) => v * timeMultiplier),
    },
    {
      id: "inventory",
      name: "Inventory Level",
      value: `${Math.round(82 * timeMultiplier)}%`,
      delta: "+2.0%",
      positive: true,
      icon: Boxes,
      chartData: [72, 75, 78, 80, 82].map((v) => v * timeMultiplier),
    },
  ];

  const activeMetric = metrics.find((m) => m.id === activeMetricId) || metrics[0];

  const handleExport = (format: string) => {
    setExportNotice(`Exported ${activeMetric.name} report as ${format}`);
    setIsExportOpen(false);
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90 sm:p-8">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-500" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
              Analytics Workspace
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Executive Analytics & Trends
          </h2>
        </div>

        {/* Filters & Export Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Filter Buttons */}
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-white/5">
            {(["Today", "7 Days", "30 Days", "Quarter", "Year"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFilter(tf)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                  timeFilter === tf
                    ? "bg-slate-950 text-white shadow dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Export Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </button>

            {/* Export Dropdown Menu */}
            <AnimatePresence>
              {isExportOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-11 z-30 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-slate-950"
                >
                  <button
                    onClick={() => handleExport("CSV")}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                  >
                    <Table className="h-4 w-4 text-emerald-500" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => handleExport("PDF")}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                  >
                    <FileText className="h-4 w-4 text-red-500" />
                    <span>Export PDF Report</span>
                  </button>
                  <button
                    onClick={() => handleExport("Image")}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                  >
                    <ImageIcon className="h-4 w-4 text-blue-500" />
                    <span>Export Chart Image</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Export Notification Toast */}
      {exportNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
        >
          ✓ {exportNotice}
        </motion.div>
      )}

      {/* Executive KPI Cards Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isSelected = m.id === activeMetricId;

          return (
            <motion.div
              key={m.id}
              whileHover={{ y: -3 }}
              onClick={() => setActiveMetricId(m.id)}
              className={`cursor-pointer rounded-2xl border p-4 shadow-sm backdrop-blur-xl transition-all ${
                isSelected
                  ? "border-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-400 dark:bg-cyan-950/40"
                  : "border-slate-200/80 bg-slate-50/70 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-300">
                  <TrendingUp className="h-3 w-3" />
                  {m.delta}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{m.name}</p>
              <h4 className="mt-1 text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {m.value}
              </h4>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Main Chart View */}
      <div className="mt-7 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
              Interactive Telemetry Chart
            </span>
            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {activeMetric.name} Trend ({timeFilter})
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
            Current: {activeMetric.value}
          </span>
        </div>

        {/* Animated Line & Area SVG Chart */}
        <div className="mt-6 h-64 w-full">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 500 150">
            <defs>
              <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

            {/* Area Path */}
            <motion.path
              initial={{ d: "M0 150 L0 150 L500 150 Z" }}
              animate={{
                d: `M 0 ${150 - activeMetric.chartData[0] * 1.2} Q 125 ${150 - activeMetric.chartData[1] * 1.2}, 250 ${150 - activeMetric.chartData[2] * 1.2} T 500 ${150 - activeMetric.chartData[4] * 1.2} L 500 150 L 0 150 Z`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              fill="url(#analyticsGrad)"
            />

            {/* Line Path */}
            <motion.path
              initial={{ opacity: 0 }}
              animate={{
                d: `M 0 ${150 - activeMetric.chartData[0] * 1.2} Q 125 ${150 - activeMetric.chartData[1] * 1.2}, 250 ${150 - activeMetric.chartData[2] * 1.2} T 500 ${150 - activeMetric.chartData[4] * 1.2}`,
                opacity: 1,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
