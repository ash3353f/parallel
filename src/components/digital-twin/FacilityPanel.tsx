"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";
import { FacilityData } from "./digitalTwinTypes";

interface FacilityPanelProps {
  isOpen: boolean;
  name: string;
  data: FacilityData | null;
  onClose: () => void;
}

export const FacilityPanel: React.FC<FacilityPanelProps> = ({
  isOpen,
  name,
  data,
  onClose,
}) => {
  if (!isOpen || !data) return null;

  const getRiskBadge = (risk: "low" | "med" | "high") => {
    switch (risk) {
      case "low":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Low Risk
          </span>
        );
      case "med":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Medium Risk
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-600 dark:text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" /> High Risk
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="absolute right-4 top-20 z-20 w-80 max-h-[calc(100%-6rem)] overflow-y-auto rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95 text-slate-900 dark:text-white"
      >
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold tracking-tight">{name}</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{data.sub}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* KPIs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {data.kpis.map(([k, v], idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-slate-50 p-2.5 dark:border-white/5 dark:bg-white/[0.03]"
            >
              <div className="text-base font-bold text-cyan-600 dark:text-cyan-400">{v}</div>
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{k}</div>
            </div>
          ))}
        </div>

        {/* Metrics List */}
        <div className="mt-4 space-y-2 border-t border-b border-slate-200 dark:border-white/10 py-3 text-xs">
          {data.metrics.map(([k, v], idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{k}</span>
              <strong className="font-bold text-slate-900 dark:text-white">{v}</strong>
            </div>
          ))}
          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Risk Status</span>
            {getRiskBadge(data.risk)}
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mt-4 rounded-2xl border border-purple-400/40 bg-purple-500/10 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5" /> AI Recommendation
          </div>
          <p className="mt-1.5 leading-relaxed text-slate-700 dark:text-slate-200">
            {data.rec}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
