"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crosshair, 
  Activity, 
  Zap, 
  Shield, 
  Battery, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle
} from "lucide-react";

interface InspectorPanelProps {
  selectedNode: string | null;
}

type NodeStatus = "healthy" | "warning" | "critical";

interface NodeData {
  id: string;
  name: string;
  type: string;
  status: NodeStatus;
  metrics: {
    health: number;
    capacity: number;
    risk: number;
    load: string;
  };
  owner: string;
  lastUpdated: string;
  aiRecommendation: string;
}

const mockData: Record<string, NodeData> = {
  hq: {
    id: "hq",
    name: "Global Headquarters",
    type: "Control Center",
    status: "healthy",
    metrics: { health: 98, capacity: 45, risk: 2, load: "Low" },
    owner: "Executive Board",
    lastUpdated: "Just now",
    aiRecommendation: "System running optimally. No optimization required at this time."
  },
  factory: {
    id: "factory",
    name: "Primary Assembly Plant",
    type: "Manufacturing",
    status: "warning",
    metrics: { health: 76, capacity: 92, risk: 45, load: "Critical" },
    owner: "Operations Team",
    lastUpdated: "2 minutes ago",
    aiRecommendation: "High load detected on Assembly Line B. Re-route production to Line C to balance capacity."
  },
  warehouse: {
    id: "warehouse",
    name: "Central Warehouse",
    type: "Storage",
    status: "healthy",
    metrics: { health: 95, capacity: 60, risk: 10, load: "Medium" },
    owner: "Logistics Team",
    lastUpdated: "5 minutes ago",
    aiRecommendation: "Optimize storage layout based on recent demand spikes for Model X parts."
  },
  distribution: {
    id: "distribution",
    name: "Regional Hub",
    type: "Logistics",
    status: "healthy",
    metrics: { health: 88, capacity: 75, risk: 15, load: "Medium" },
    owner: "Supply Chain",
    lastUpdated: "1 minute ago",
    aiRecommendation: "Fleet utilization at 85%. Consider scheduling maintenance for vehicles 12 and 14."
  },
  power: {
    id: "power",
    name: "Main Substation",
    type: "Infrastructure",
    status: "critical",
    metrics: { health: 45, capacity: 98, risk: 85, load: "Overload" },
    owner: "Facilities",
    lastUpdated: "10 seconds ago",
    aiRecommendation: "Immediate action required. Transfer secondary grid load to backup generators to prevent failure."
  }
};

const statusColors = {
  healthy: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  critical: "text-red-500 bg-red-500/10 border-red-500/20"
};

const StatusIcon = ({ status }: { status: NodeStatus }) => {
  switch (status) {
    case "healthy": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "warning": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case "critical": return <AlertCircle className="w-4 h-4 text-red-500" />;
  }
};

export function InspectorPanel({ selectedNode }: InspectorPanelProps) {
  const node = selectedNode ? mockData[selectedNode] : null;

  return (
    <div className="w-80 h-full border-l border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl flex flex-col overflow-y-auto">
      <AnimatePresence mode="wait">
        {!node ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
              <Crosshair className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">No Selection</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Click a facility node on the canvas to inspect its properties, health metrics, and AI recommendations.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6 space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                  {node.name}
                </h2>
                <div className={`px-2 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 ${statusColors[node.status]}`}>
                  <StatusIcon status={node.status} />
                  <span className="capitalize">{node.status}</span>
                </div>
              </div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                {node.type}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                Performance Metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Health" value={node.metrics.health} suffix="%" icon={<Battery className="w-4 h-4 text-emerald-500" />} />
                <MetricCard title="Capacity" value={node.metrics.capacity} suffix="%" icon={<Zap className="w-4 h-4 text-amber-500" />} />
                <MetricCard title="Risk Level" value={node.metrics.risk} suffix="%" icon={<Shield className="w-4 h-4 text-rose-500" />} />
                
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Current Load</span>
                  </div>
                  <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {node.metrics.load}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Details */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Owner</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{node.owner}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 dark:text-neutral-400">Last Updated</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{node.lastUpdated}</span>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="mt-auto pt-6">
              <div className="relative rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-4">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  AI Recommendation
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                  {node.aiRecommendation}
                </p>
                <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900">
                  Apply Optimization
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ title, value, suffix, icon }: { title: string, value: number, suffix: string, icon: React.ReactNode }) {
  // Determine color based on value for progress bar
  let barColor = "bg-blue-500";
  if (title === "Health") {
    barColor = value > 80 ? "bg-emerald-500" : value > 50 ? "bg-amber-500" : "bg-red-500";
  } else if (title === "Capacity" || title === "Risk Level") {
    barColor = value > 80 ? "bg-red-500" : value > 50 ? "bg-amber-500" : "bg-emerald-500";
  }

  return (
    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{title}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{value}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{suffix}</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${barColor} rounded-full`}
        />
      </div>
    </div>
  );
}
