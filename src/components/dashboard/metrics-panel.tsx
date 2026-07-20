"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Banknote, TrendingUp, Users, ArrowUpRight, X } from "lucide-react";

interface MetricItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: typeof Banknote;
  color: string;
  accentBg: string;
  detailText: string;
}

const metrics: MetricItem[] = [
  {
    id: "revenue",
    label: "Quarterly Revenue",
    value: "$48.2M",
    delta: "+18.4%",
    icon: Banknote,
    color: "text-cyan-600 dark:text-cyan-400",
    accentBg: "bg-cyan-500/10 border-cyan-500/20",
    detailText: "Revenue trajectory projected to reach $52.4M with AI production optimization.",
  },
  {
    id: "profit",
    label: "Net Profit Margin",
    value: "$12.8M",
    delta: "+9.7%",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10 border-emerald-500/20",
    detailText: "Operating margin expanded 180 bps via logistics route optimization.",
  },
  {
    id: "risk",
    label: "Ecosystem Risk",
    value: "Low (3.2%)",
    delta: "-12 pts",
    icon: AlertTriangle,
    color: "text-purple-600 dark:text-purple-400",
    accentBg: "bg-purple-500/10 border-purple-500/20",
    detailText: "Supply chain congestion risk mitigated across all 14 active nodes.",
  },
  {
    id: "employees",
    label: "Active Workforce",
    value: "1,284",
    delta: "+42",
    icon: Users,
    color: "text-pink-600 dark:text-pink-400",
    accentBg: "bg-pink-500/10 border-pink-500/20",
    detailText: "Workforce efficiency standing at 98.4% across all facility floors.",
  },
];

export function MetricsPanel() {
  const [selectedMetric, setSelectedMetric] = useState<MetricItem | null>(null);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.article
            key={metric.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.5 }}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMetric(metric)}
            className="group cursor-pointer rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-200/50 backdrop-blur-2xl transition-all hover:border-cyan-400/50 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/40 dark:hover:border-cyan-400/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {metric.label}
              </span>
              <div className={`rounded-2xl border p-2.5 transition-transform group-hover:scale-110 ${metric.accentBg} ${metric.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <strong className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {metric.value}
                </strong>
              </div>
              <span className="flex items-center gap-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>{metric.delta}</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </motion.article>
        );
      })}

      {/* Metric Detail Modal Popover */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-2xl border p-2.5 ${selectedMetric.accentBg} ${selectedMetric.color}`}>
                    <selectedMetric.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedMetric.label}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-white/10 dark:bg-slate-900">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Current Value</span>
                  <strong className="text-lg font-extrabold text-slate-900 dark:text-white">{selectedMetric.value}</strong>
                </div>
                <div className="flex justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-white/10 dark:bg-slate-900">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Quarterly Change</span>
                  <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{selectedMetric.delta}</strong>
                </div>
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3.5 text-xs text-cyan-800 dark:text-cyan-200">
                  💡 <strong>AI Telemetry Note:</strong> {selectedMetric.detailText}
                </div>
              </div>

              <button
                onClick={() => setSelectedMetric(null)}
                className="mt-5 w-full rounded-2xl bg-cyan-600 py-3 text-xs font-bold text-white hover:bg-cyan-500 shadow-md transition"
              >
                Close Telemetry Overview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
