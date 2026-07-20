"use client";

import { ArrowRight, Sparkles, TrendingDown, TrendingUp } from "lucide-react";

interface WorkspaceScenarioComparisonProps {
  scenarioA?: string;
  scenarioB?: string;
}

export function WorkspaceScenarioComparison({
  scenarioA = "Baseline Operational Model v2.4",
  scenarioB = "Apex Factory Output +15% Plan",
}: WorkspaceScenarioComparisonProps) {
  const comparisonMetrics = [
    { label: "Quarterly Revenue", valA: "$48.2M", valB: "$51.6M", delta: "+$3.4M (+7.0%)", positive: true },
    { label: "Operating Profit", valA: "$12.8M", valB: "$14.3M", delta: "+$1.5M (+11.7%)", positive: true },
    { label: "Operational Risk Exposure", valA: "14%", valB: "6%", delta: "-8.0% (-57.1%)", positive: true },
    { label: "Factory Output Throughput", valA: "76%", valB: "91%", delta: "+15.0%", positive: true },
    { label: "Supply Chain Health Score", valA: "92%", valB: "98%", delta: "+6.0%", positive: true },
    { label: "Operating Cost", valA: "$35.4M", valB: "$37.3M", delta: "+$1.9M (+5.3%)", positive: false },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
              Scenario Comparison Matrix
            </span>
          </div>
          <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {scenarioA} <span className="text-slate-400 font-normal">vs</span> {scenarioB}
          </h3>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
          Side-by-Side Tradeoff Delta
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {comparisonMetrics.map((item) => (
          <div
            key={item.label}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {item.label}
            </span>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Scenario A</span>
                <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.valA}
                </span>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400" />

              <div className="text-left">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">Scenario B</span>
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  {item.valB}
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  item.positive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                {item.positive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {item.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
