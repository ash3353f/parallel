"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  Shield,
  Check,
} from "lucide-react";

type Priority = "Critical" | "High" | "Medium" | "Low";
type Tab = "Critical Alerts" | "Opportunities" | "AI Suggestions" | "Recent Decisions";

interface ActionItem {
  id: string;
  title: string;
  priority?: Priority;
  confidence?: number;
  impact?: string;
  roi?: string;
  actionText?: string;
  status?: "Completed" | "In Progress" | "Under Review";
}

const mockData: Record<Tab, ActionItem[]> = {
  "Critical Alerts": [
    {
      id: "ca-1",
      title: "Factory Assembly Line #3 thermal spike",
      priority: "Critical",
      confidence: 98,
      impact: "-$2.1M risk",
      actionText: "Reduce Load",
    },
    {
      id: "ca-2",
      title: "Supply chain bottleneck at Distribution Node",
      priority: "High",
      confidence: 94,
      impact: "-$850k impact",
      actionText: "Reroute Freight",
    },
    {
      id: "ca-3",
      title: "Power grid fluctuation detected",
      priority: "Medium",
      confidence: 87,
      impact: "-$320k impact",
      actionText: "Switch to Battery",
    },
  ],
  Opportunities: [
    {
      id: "op-1",
      title: "Solar Array B-4 integration window",
      priority: "High",
      confidence: 96,
      impact: "+$1.4M savings",
      roi: "340%",
      actionText: "Activate Integration",
    },
    {
      id: "op-2",
      title: "Warehouse AGV fleet route optimization",
      priority: "Medium",
      confidence: 91,
      impact: "+$620k efficiency",
      roi: "210%",
      actionText: "Deploy Route Update",
    },
  ],
  "AI Suggestions": [
    {
      id: "ai-1",
      title: "Shift 15% freight volume to Maritime Port Alpha",
      priority: "High",
      confidence: 95,
      impact: "+$2.4M profit",
      roi: "420%",
      actionText: "Apply Recommendation",
    },
    {
      id: "ai-2",
      title: "Pre-order raw aluminum for Q4 hedge",
      priority: "Medium",
      confidence: 89,
      impact: "+$940k savings",
      roi: "180%",
      actionText: "Execute Hedge",
    },
  ],
  "Recent Decisions": [
    {
      id: "rd-1",
      title: "Executed: Transatlantic Freight Shift",
      status: "Completed",
      impact: "+$3.4M actualized",
    },
    {
      id: "rd-2",
      title: "Approved: Battery storage activation",
      status: "In Progress",
      impact: "+$1.2M projected",
    },
    {
      id: "rd-3",
      title: "Deferred: Regional expansion Phase 2",
      status: "Under Review",
    },
  ],
};

const tabs: Tab[] = [
  "Critical Alerts",
  "Opportunities",
  "AI Suggestions",
  "Recent Decisions",
];

const getPriorityColor = (priority?: Priority) => {
  switch (priority) {
    case "Critical":
      return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30";
    case "High":
      return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30";
    case "Medium":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";
    case "Low":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30";
    default:
      return "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30";
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "Completed":
      return "text-emerald-600 dark:text-emerald-400";
    case "In Progress":
      return "text-cyan-600 dark:text-cyan-400";
    case "Under Review":
      return "text-amber-600 dark:text-amber-400";
    default:
      return "text-slate-500";
  }
};

const getTabIcon = (tab: Tab) => {
  switch (tab) {
    case "Critical Alerts":
      return <AlertTriangle className="w-4 h-4 mr-2" />;
    case "Opportunities":
      return <Lightbulb className="w-4 h-4 mr-2" />;
    case "AI Suggestions":
      return <Sparkles className="w-4 h-4 mr-2" />;
    case "Recent Decisions":
      return <CheckCircle2 className="w-4 h-4 mr-2" />;
  }
};

export function ActionCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("Critical Alerts");
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});

  const handleApplyAction = (id: string) => {
    setAppliedActions((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full flex flex-col rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Action Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time AI recommendations & executive mitigation actions
          </p>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/60 dark:border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-cyan-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-white/5 dark:hover:bg-white/10"
            }`}
          >
            {getTabIcon(tab)}
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3.5"
          >
            {mockData[activeTab].map((item) => {
              const isApplied = appliedActions[item.id];
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-slate-950/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          item.priority === "Critical"
                            ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"
                            : item.priority === "High"
                            ? "bg-orange-500"
                            : "bg-cyan-500"
                        }`}
                      />
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.title}
                      </h3>
                    </div>
                    {item.priority && (
                      <span
                        className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${getPriorityColor(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    )}
                    {item.status && (
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        {item.status === "Completed" && <CheckCircle2 className={`w-4 h-4 ${getStatusColor(item.status)}`} />}
                        {item.status === "In Progress" && <Clock className={`w-4 h-4 ${getStatusColor(item.status)}`} />}
                        {item.status === "Under Review" && <AlertTriangle className={`w-4 h-4 ${getStatusColor(item.status)}`} />}
                        <span className={getStatusColor(item.status)}>{item.status}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-2 text-xs">
                    {item.confidence && (
                      <div className="flex flex-col rounded-xl border border-slate-200/60 bg-slate-50 p-2 dark:border-white/5 dark:bg-slate-900/40">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          AI Confidence
                        </span>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.confidence}%
                        </strong>
                      </div>
                    )}
                    {item.impact && (
                      <div className="flex flex-col rounded-xl border border-slate-200/60 bg-slate-50 p-2 dark:border-white/5 dark:bg-slate-900/40">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center">
                          <DollarSign className="w-3 h-3 mr-0.5 text-slate-400" /> Projected Impact
                        </span>
                        <strong
                          className={`text-xs font-bold ${
                            item.impact.startsWith("+")
                              ? "text-emerald-600 dark:text-emerald-400"
                              : item.impact.startsWith("-")
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {item.impact}
                        </strong>
                      </div>
                    )}
                    {item.roi && (
                      <div className="flex flex-col rounded-xl border border-slate-200/60 bg-slate-50 p-2 dark:border-white/5 dark:bg-slate-900/40">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5 text-slate-400" /> ROI
                        </span>
                        <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {item.roi}
                        </strong>
                      </div>
                    )}
                  </div>

                  {item.actionText && (
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => handleApplyAction(item.id)}
                        disabled={isApplied}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-md ${
                          isApplied
                            ? "bg-emerald-600 text-white cursor-default"
                            : "bg-cyan-600 hover:bg-cyan-500 text-white"
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Applied to Digital Twin
                          </>
                        ) : (
                          item.actionText
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
