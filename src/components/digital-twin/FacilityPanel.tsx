"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertTriangle, ShieldCheck, ArrowRight, Building2, Factory as FactoryIcon } from "lucide-react";
import { FacilityId } from "./digitalTwinTypes";
import { SPECS } from "./BuildingSystem";

export interface FacilityPanelProps {
  facilityId: FacilityId | null;
  onClose: () => void;
  onEnterHQ?: () => void;
  onEnterFactory?: () => void;
}

export const FacilityPanel: React.FC<FacilityPanelProps> = ({
  facilityId,
  onClose,
  onEnterHQ,
  onEnterFactory,
}) => {
  if (!facilityId) return null;

  const spec = SPECS.find((s) => s.id === facilityId);
  if (!spec) return null;

  const data = spec.data;

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
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="pointer-events-auto absolute right-4 top-16 bottom-4 z-20 w-80 sm:w-96 rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95 flex flex-col overflow-y-auto text-slate-900 dark:text-white"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
              {data.sub}
            </span>
            <h3 className="text-lg font-extrabold mt-0.5">{spec.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Risk Badge */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Security & Risk Status</span>
          {getRiskBadge(data.risk)}
        </div>

        {/* Primary KPIs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {data.kpis.map(([k, v], idx) => (
            <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/5">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block truncate">{k}</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">{v}</span>
            </div>
          ))}
        </div>

        {/* Additional Operational Metrics */}
        <div className="mt-5 space-y-2 border-t border-slate-200 dark:border-white/10 pt-4">
          <span className="text-xs font-extrabold tracking-tight text-slate-900 dark:text-white block">
            Operational Telemetry
          </span>
          {data.metrics.map(([mk, mv], idx) => (
            <div key={idx} className="flex justify-between items-center py-1 text-xs border-b border-slate-100 dark:border-white/5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{mk}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{mv}</span>
            </div>
          ))}
        </div>

        {/* AI Strategic Recommendation */}
        <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold mb-1">
            <Sparkles className="h-4 w-4" />
            <span>AI Strategic Verdict</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{data.rec}</p>
        </div>

        {/* Enter Interior Buttons */}
        {facilityId === "hq" && onEnterHQ && (
          <button
            onClick={onEnterHQ}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 py-3 text-xs font-extrabold text-white shadow-lg transition hover:from-cyan-500 hover:to-purple-500"
          >
            <Building2 className="h-4 w-4" />
            <span>Inspect HQ Office Interior (5 Floors)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}

        {facilityId === "factory" && onEnterFactory && (
          <button
            onClick={onEnterFactory}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 py-3 text-xs font-extrabold text-white shadow-lg transition hover:from-emerald-500 hover:to-cyan-500"
          >
            <FactoryIcon className="h-4 w-4" />
            <span>Inspect Apex Factory Interior</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
