"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Factory,
  Layers,
  Truck,
  Warehouse,
} from "lucide-react";
import { sampleScenarios, type ScenarioData } from "./scenario-comparison";

const departmentData = [
  { name: "Manufacturing", score: 91, benchmark: 82, color: "bg-cyan-500" },
  { name: "Logistics & Supply", score: 87, benchmark: 78, color: "bg-purple-500" },
  { name: "Operations", score: 94, benchmark: 85, color: "bg-emerald-500" },
  { name: "Finance & Strategy", score: 96, benchmark: 88, color: "bg-blue-500" },
  { name: "Sales & Distribution", score: 89, benchmark: 80, color: "bg-indigo-500" },
  { name: "Customer Support", score: 92, benchmark: 84, color: "bg-pink-500" },
];

const supplyChainNodes = [
  { name: "Global HQ", icon: Layers, status: "Optimal", color: "border-cyan-400 text-cyan-400" },
  { name: "Apex Factory", icon: Factory, status: "Thermal Peak", color: "border-amber-400 text-amber-400", bottleneck: true },
  { name: "Central Warehouse", icon: Warehouse, status: "Optimal", color: "border-blue-400 text-blue-400" },
  { name: "Global Transport", icon: Truck, status: "Rerouted", color: "border-purple-400 text-purple-400" },
  { name: "End Customer", icon: CheckCircle2, status: "Delivered", color: "border-emerald-400 text-emerald-400" },
];

const aiRecommendations = [
  {
    id: "rec-1",
    title: "Increase Apex Factory throughput by 12%",
    category: "Manufacturing",
    priority: "High",
    impact: "+$3.4M Revenue",
    confidence: 96,
    savings: "$1.2M / quarter",
    recommendedAction: "Apply shift balancing to Assembly Cell #3.",
  },
  {
    id: "rec-2",
    title: "Delay Regional Warehouse expansion to Q4",
    category: "CapEx & Finance",
    priority: "Medium",
    impact: "Saves $4.2M CapEx",
    confidence: 92,
    savings: "$4.2M deferred",
    recommendedAction: "Optimize existing automated storage density.",
  },
  {
    id: "rec-3",
    title: "Shift 15% freight volume to Transatlantic Node B",
    category: "Logistics",
    priority: "High",
    impact: "-22% Supply Delay",
    confidence: 94,
    savings: "$850k / year",
    recommendedAction: "Activate automated freight rerouting policy.",
  },
];

interface ExecutiveAnalyticsProps {
  onSelectScenario?: (scenario: ScenarioData) => void;
}

export function ExecutiveAnalytics({ onSelectScenario }: ExecutiveAnalyticsProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("sc-1");
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "recommendations">("overview");

  const handleSelectScenario = (sc: ScenarioData) => {
    setSelectedScenarioId(sc.id);
    if (onSelectScenario) {
      onSelectScenario(sc);
    }
  };

  return (
    <section className="space-y-6">
      {/* Top Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
              activeTab === "overview"
                ? "bg-slate-950 text-white shadow-md dark:bg-white dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            Executive Analytics & Trends
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
              activeTab === "history"
                ? "bg-slate-950 text-white shadow-md dark:bg-white dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            Simulation History
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition ${
              activeTab === "recommendations"
                ? "bg-slate-950 text-white shadow-md dark:bg-white dark:text-slate-950"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            AI Strategic Recommendations
          </button>
        </div>

        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Executive Data Suite · Bloomberg + Omniverse Engine
        </span>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Revenue Trend Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Revenue Trend
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                  +18.4% YoY
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$51.6M</p>

              {/* Line Chart SVG */}
              <div className="mt-4 h-24 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 30 Q 25 25, 50 15 T 100 5 L 100 40 L 0 40 Z"
                    fill="url(#revGrad)"
                  />
                  <path
                    d="M0 30 Q 25 25, 50 15 T 100 5"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Profit Trend Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Profit Margin
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                  +11.7% Delta
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$14.3M</p>

              {/* Line Chart SVG */}
              <div className="mt-4 h-24 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 35 Q 25 28, 50 18 T 100 8 L 100 40 L 0 40 Z"
                    fill="url(#profitGrad)"
                  />
                  <path
                    d="M0 35 Q 25 28, 50 18 T 100 8"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Risk Trend Area Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Risk Exposure Area
                </span>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-300">
                  -57% Reduction
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">6% Risk</p>

              {/* Area Chart SVG */}
              <div className="mt-4 h-24 w-full">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 10 Q 30 15, 60 28 T 100 35 L 100 40 L 0 40 Z"
                    fill="url(#riskGrad)"
                  />
                  <path
                    d="M0 10 Q 30 15, 60 28 T 100 35"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Production Efficiency Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Factory Throughput
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                  91% Capacity
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">91% Output</p>

              {/* Bar Chart Svg */}
              <div className="mt-4 flex h-24 items-end justify-between gap-1.5 pt-2">
                {[62, 74, 80, 85, 91].map((val, idx) => (
                  <div key={idx} className="flex h-full w-full flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-sky-500 to-cyan-300 shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Department Performance & Supply Chain Flow */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Department Performance */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Department Performance Metrics
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Operational scores vs industry benchmark targets
                  </p>
                </div>
                <BarChart3 className="h-5 w-5 text-cyan-500" />
              </div>

              <div className="mt-5 space-y-4">
                {departmentData.map((dept) => (
                  <div key={dept.name}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                      <span>{dept.name}</span>
                      <span>
                        <strong>{dept.score}%</strong> (Target: {dept.benchmark}%)
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dept.score}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-full rounded-full ${dept.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supply Chain Timeline Flow */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Supply Chain Velocity & Bottlenecks
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live end-to-end operational pipeline status
                  </p>
                </div>
                <Truck className="h-5 w-5 text-cyan-500" />
              </div>

              <div className="mt-6 space-y-4">
                {supplyChainNodes.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <div key={node.name} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border bg-slate-100 font-bold dark:bg-white/5 ${node.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.04]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {node.name}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              node.bottleneck
                                ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                                : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {node.status}
                          </span>
                        </div>
                      </div>

                      {index < supplyChainNodes.length - 1 && (
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Simulation History Log
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select a previous simulation run to load full comparison metrics
              </p>
            </div>
            <Clock className="h-5 w-5 text-cyan-500" />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 text-xs font-bold uppercase text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <th className="pb-3 pl-3">Time</th>
                  <th className="pb-3">Scenario Name</th>
                  <th className="pb-3">Revenue Delta</th>
                  <th className="pb-3">Risk Exposure</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-white/5">
                {sampleScenarios.map((sc) => {
                  const isSelected = sc.id === selectedScenarioId;
                  return (
                    <tr
                      key={sc.id}
                      onClick={() => handleSelectScenario(sc)}
                      className={`cursor-pointer transition hover:bg-slate-100/80 dark:hover:bg-white/5 ${
                        isSelected ? "bg-cyan-50/80 dark:bg-cyan-950/40" : ""
                      }`}
                    >
                      <td className="py-4 pl-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                        {sc.timestamp}
                      </td>
                      <td className="py-4 font-semibold text-slate-900 dark:text-white">
                        {sc.name}
                      </td>
                      <td className="py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {sc.metrics.revenue.delta}
                      </td>
                      <td className="py-4 font-mono text-slate-700 dark:text-slate-300">
                        {sc.metrics.risk.simulated}
                      </td>
                      <td className="py-4">
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                          Applied
                        </span>
                      </td>
                      <td className="py-4 pr-3 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-300">
                          {isSelected ? "Active" : "Load Run"}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {aiRecommendations.map((rec) => (
            <motion.div
              key={rec.id}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                  {rec.category}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {rec.confidence}% Confidence
                </span>
              </div>

              <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                {rec.title}
              </h4>
              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                {rec.recommendedAction}
              </p>

              <div className="mt-6 border-t border-slate-200/80 pt-4 dark:border-white/10">
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                  <span>Impact:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{rec.impact}</strong>
                </div>
                <div className="mt-1 flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                  <span>Est. Savings:</span>
                  <strong className="text-cyan-600 dark:text-cyan-400">{rec.savings}</strong>
                </div>
              </div>

              <button className="mt-5 w-full rounded-full bg-slate-950 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100">
                Execute Recommendation
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
