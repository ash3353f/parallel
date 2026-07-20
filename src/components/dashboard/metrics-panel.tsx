"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Banknote, TrendingUp, Users } from "lucide-react";

const metrics = [
  { label: "Revenue", value: "$48.2M", delta: "+18.4%", icon: Banknote, glow: "shadow-cyan-500/20" },
  { label: "Profit", value: "$12.8M", delta: "+9.7%", icon: TrendingUp, glow: "shadow-emerald-500/20" },
  { label: "Risk", value: "Low", delta: "-12 pts", icon: AlertTriangle, glow: "shadow-purple-500/20" },
  { label: "Employees", value: "1,284", delta: "+42", icon: Users, glow: "shadow-pink-500/20" },
];

export function MetricsPanel() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.article
            key={metric.label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.55 }}
            className={`rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl ${metric.glow} backdrop-blur-2xl`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{metric.label}</span>
              <span className="rounded-2xl bg-white/[0.07] p-2 text-cyan-200"><Icon className="h-5 w-5" /></span>
            </div>
            <div className="mt-7 flex items-end justify-between">
              <strong className="text-3xl font-semibold tracking-tight text-white">{metric.value}</strong>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-200">{metric.delta}</span>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
