"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export interface ScenarioData {
  id: string;
  name: string;
  timestamp: string;
  summary: string;
  metrics: {
    revenue: { current: string; simulated: string; delta: string; positive: boolean };
    profit: { current: string; simulated: string; delta: string; positive: boolean };
    risk: { current: string; simulated: string; delta: string; positive: boolean };
    factoryOutput: { current: string; simulated: string; delta: string; positive: boolean };
    operatingCost: { current: string; simulated: string; delta: string; positive: boolean };
    workforceUtilization: { current: string; simulated: string; delta: string; positive: boolean };
    supplyChainHealth: { current: string; simulated: string; delta: string; positive: boolean };
  };
  kpiChips: { label: string; value: string; positive: boolean }[];
}

export const sampleScenarios: ScenarioData[] = [
  {
    id: "sc-1",
    name: "Production Expansion & Logistics Reroute",
    timestamp: "Just now",
    summary:
      "Simulation predicts a 12% profit increase while reducing operational risk through optimized production scheduling and logistics balancing.",
    metrics: {
      revenue: { current: "$48.2M", simulated: "$51.6M", delta: "+7.0%", positive: true },
      profit: { current: "$12.8M", simulated: "$14.3M", delta: "+11.7%", positive: true },
      risk: { current: "Low (14%)", simulated: "Very Low (6%)", delta: "-57.1%", positive: true },
      factoryOutput: { current: "76%", simulated: "91%", delta: "+15.0%", positive: true },
      operatingCost: { current: "$35.4M", simulated: "$37.3M", delta: "+5.3%", positive: false },
      workforceUtilization: { current: "82%", simulated: "89%", delta: "+7.0%", positive: true },
      supplyChainHealth: { current: "92%", simulated: "98%", delta: "+6.0%", positive: true },
    },
    kpiChips: [
      { label: "Revenue", value: "+7.0%", positive: true },
      { label: "Profit", value: "+11.7%", positive: true },
      { label: "Risk", value: "-57.1%", positive: true },
      { label: "Efficiency", value: "+15.0%", positive: true },
      { label: "Supply Delay", value: "-22.0%", positive: true },
      { label: "Carbon Impact", value: "-5.4%", positive: true },
    ],
  },
  {
    id: "sc-2",
    name: "Solar Array B-4 Peak Battery Integration",
    timestamp: "12m ago",
    summary:
      "Integrating Solar Array B-4 reduces grid power reliance by 34% with zero downtime, cutting energy costs by $1.8M annually.",
    metrics: {
      revenue: { current: "$48.2M", simulated: "$48.9M", delta: "+1.5%", positive: true },
      profit: { current: "$12.8M", simulated: "$13.9M", delta: "+8.6%", positive: true },
      risk: { current: "Low (14%)", simulated: "Low (11%)", delta: "-21.4%", positive: true },
      factoryOutput: { current: "76%", simulated: "82%", delta: "+6.0%", positive: true },
      operatingCost: { current: "$35.4M", simulated: "$33.6M", delta: "-5.1%", positive: true },
      workforceUtilization: { current: "82%", simulated: "84%", delta: "+2.0%", positive: true },
      supplyChainHealth: { current: "92%", simulated: "95%", delta: "+3.0%", positive: true },
    },
    kpiChips: [
      { label: "Revenue", value: "+1.5%", positive: true },
      { label: "Profit", value: "+8.6%", positive: true },
      { label: "Risk", value: "-21.4%", positive: true },
      { label: "Efficiency", value: "+6.0%", positive: true },
      { label: "Energy Cost", value: "-14.2%", positive: true },
      { label: "Carbon Impact", value: "-18.5%", positive: true },
    ],
  },
  {
    id: "sc-3",
    name: "Warehouse Transatlantic Freight Re-Route",
    timestamp: "45m ago",
    summary:
      "Bypassing regional transit bottlenecks cuts shipment delays by 22% and reduces buffer inventory holding costs by $850k.",
    metrics: {
      revenue: { current: "$48.2M", simulated: "$49.8M", delta: "+3.3%", positive: true },
      profit: { current: "$12.8M", simulated: "$13.6M", delta: "+6.25%", positive: true },
      risk: { current: "Low (14%)", simulated: "Very Low (8%)", delta: "-42.8%", positive: true },
      factoryOutput: { current: "76%", simulated: "80%", delta: "+4.0%", positive: true },
      operatingCost: { current: "$35.4M", simulated: "$34.8M", delta: "-1.7%", positive: true },
      workforceUtilization: { current: "82%", simulated: "86%", delta: "+4.0%", positive: true },
      supplyChainHealth: { current: "92%", simulated: "99%", delta: "+7.0%", positive: true },
    },
    kpiChips: [
      { label: "Revenue", value: "+3.3%", positive: true },
      { label: "Profit", value: "+6.3%", positive: true },
      { label: "Risk", value: "-42.8%", positive: true },
      { label: "Efficiency", value: "+4.0%", positive: true },
      { label: "Supply Delay", value: "-22.0%", positive: true },
      { label: "Carbon Impact", value: "-3.1%", positive: true },
    ],
  },
];

interface ScenarioComparisonProps {
  activeScenario?: ScenarioData;
  onSelectScenario?: (scenario: ScenarioData) => void;
}

export function ScenarioComparison({
  activeScenario = sampleScenarios[0],
}: ScenarioComparisonProps) {
  const [scenario] = useState<ScenarioData>(activeScenario);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/90 sm:p-8">
      {/* Glow Backdrop */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

      {/* Header & Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
              AI Twin Simulation Results
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {scenario.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm" />
          <span>Completed · {scenario.timestamp}</span>
        </div>
      </div>

      {/* Delta KPI Chips */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Impact Overview:
        </span>
        {scenario.kpiChips.map((chip) => (
          <motion.span
            key={chip.label}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-sm backdrop-blur ${
              chip.positive
                ? "border-emerald-300/60 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "border-amber-300/60 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
            }`}
          >
            {chip.positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {chip.label} {chip.value}
          </motion.span>
        ))}
      </div>

      {/* Comparison Cards Grid */}
      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: Current State */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200/90 bg-slate-100/70 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/60"
        >
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Baseline
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Current Operational State
              </h3>
            </div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-300">
              Live Baseline
            </span>
          </div>

          <div className="mt-5 space-y-3.5 text-sm">
            <div className="flex justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Revenue</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.revenue.current}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Profit</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.profit.current}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Risk Exposure</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.risk.current}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Factory Output</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.factoryOutput.current}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Operating Cost</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.operatingCost.current}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Workforce Utilization</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.workforceUtilization.current}
              </span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-600 dark:text-slate-400">Supply Chain Health</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {scenario.metrics.supplyChainHealth.current}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: AI Optimized State */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 via-slate-100/90 to-purple-500/10 p-6 shadow-xl backdrop-blur-xl dark:from-cyan-950/40 dark:via-slate-900/90 dark:to-purple-950/40"
        >
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                Simulated AI Twin
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Optimized State
              </h3>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Simulated Outcome
            </span>
          </div>

          <div className="mt-5 space-y-3.5 text-sm">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Revenue</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.revenue.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scenario.metrics.revenue.simulated}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Profit</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.profit.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scenario.metrics.profit.simulated}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Risk Exposure</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.risk.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scenario.metrics.risk.simulated}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Factory Output</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.factoryOutput.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scenario.metrics.factoryOutput.simulated}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Operating Cost</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.operatingCost.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  {scenario.metrics.operatingCost.simulated}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-400">Workforce Utilization</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.workforceUtilization.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scenario.metrics.workforceUtilization.simulated}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-1">
              <span className="text-slate-600 dark:text-slate-400">Supply Chain Health</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {scenario.metrics.supplyChainHealth.current}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scenario.metrics.supplyChainHealth.simulated}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Executive Summary */}
      <div className="mt-6 rounded-2xl border border-cyan-300/40 bg-cyan-500/10 p-5 backdrop-blur-xl dark:border-cyan-400/20 dark:bg-cyan-500/10">
        <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
            AI Executive Summary
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-200 font-medium">
          &ldquo;{scenario.summary}&rdquo;
        </p>
      </div>
    </section>
  );
}
