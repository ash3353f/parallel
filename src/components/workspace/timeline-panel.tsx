"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Info, 
  AlertTriangle, 
  XCircle, 
  Activity, 
  Bell, 
  FileText, 
  History,
  CheckCircle2,
  Settings
} from "lucide-react";

type TabType = "timeline" | "logs" | "events" | "notifications" | "simulation";

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "timeline", label: "Timeline", icon: <Clock className="w-4 h-4" /> },
  { id: "logs", label: "Logs", icon: <FileText className="w-4 h-4" /> },
  { id: "events", label: "Events", icon: <Activity className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { id: "simulation", label: "Simulation History", icon: <History className="w-4 h-4" /> },
];

export function TimelinePanel() {
  const [activeTab, setActiveTab] = useState<TabType>("timeline");

  return (
    <div className="w-full h-52 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 flex flex-col">
      {/* Tab Header */}
      <div className="flex items-center px-4 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap
              ${activeTab === tab.id 
                ? "text-indigo-600 dark:text-indigo-400" 
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }
            `}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-neutral-50/50 dark:bg-neutral-950/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            {activeTab === "timeline" && <TimelineContent />}
            {activeTab === "logs" && <LogsContent />}
            {activeTab === "events" && <EventsContent />}
            {activeTab === "notifications" && <NotificationsContent />}
            {activeTab === "simulation" && <SimulationContent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Sub-components for each tab content

function TimelineContent() {
  const items = [
    { time: "10:45 AM", event: "Factory throughput optimized by Engine", type: "success" },
    { time: "10:30 AM", event: "Risk assessment completed across all nodes", type: "info" },
    { time: "09:15 AM", event: "Manual override triggered on Primary Assembly", type: "warning" }
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="text-xs text-neutral-400 w-16 shrink-0 pt-0.5">{item.time}</div>
          <div className="relative flex-1 pb-4 border-l border-neutral-200 dark:border-neutral-800 pl-4 last:border-0 last:pb-0">
            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-neutral-900
              ${item.type === "success" ? "bg-emerald-500" : item.type === "warning" ? "bg-amber-500" : "bg-blue-500"}
            `} />
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{item.event}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LogsContent() {
  const logs = [
    { time: "10:45:12.304", level: "INFO", msg: "Process finished with exit code 0" },
    { time: "10:42:05.112", level: "WARN", msg: "High latency detected in telemetry pipeline" },
    { time: "10:39:55.901", level: "ERROR", msg: "Failed to sync with edge device 0x4A2" },
    { time: "10:38:10.005", level: "INFO", msg: "Establishing secure connection to regional hub" }
  ];

  return (
    <div className="font-mono text-xs space-y-1.5 bg-neutral-900 p-3 rounded-md text-neutral-300 h-full overflow-y-auto">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-neutral-500">{log.time}</span>
          <span className={`w-10 shrink-0 font-semibold
            ${log.level === "INFO" ? "text-blue-400" : log.level === "WARN" ? "text-amber-400" : "text-red-400"}
          `}>
            [{log.level}]
          </span>
          <span>{log.msg}</span>
        </div>
      ))}
    </div>
  );
}

function EventsContent() {
  const events = [
    { title: "Supply Chain Disruption", desc: "Route A4 blocked due to weather", icon: <AlertTriangle className="w-5 h-5 text-amber-500" /> },
    { title: "System Maintenance", desc: "Scheduled update completed successfully", icon: <Settings className="w-5 h-5 text-blue-500" /> },
    { title: "Capacity Reached", desc: "Warehouse B at 98% utilization", icon: <Activity className="w-5 h-5 text-indigo-500" /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, i) => (
        <div key={i} className="p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex gap-3 shadow-sm">
          <div className="mt-0.5">{event.icon}</div>
          <div>
            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{event.title}</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{event.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationsContent() {
  const alerts = [
    { title: "Critical Temperature", time: "5m ago", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { title: "Optimization Applied", time: "1h ago", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
    { title: "New AI Insights Available", time: "3h ago", icon: <Info className="w-5 h-5 text-blue-500" /> }
  ];

  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => (
        <div key={i} className="flex items-center justify-between p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            {alert.icon}
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{alert.title}</span>
          </div>
          <span className="text-xs text-neutral-400">{alert.time}</span>
        </div>
      ))}
    </div>
  );
}

function SimulationContent() {
  const history = [
    { time: "10:00 AM", scenario: "Peak Demand Stress Test", revenue: "+$12.5M", status: "Completed" },
    { time: "08:30 AM", scenario: "Route Optimization Q3", revenue: "+$4.2M", status: "Completed" },
    { time: "Yesterday", scenario: "Supplier Outage Fallback", revenue: "-$1.1M", status: "Failed" }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
            <th className="pb-2 font-medium">Time</th>
            <th className="pb-2 font-medium">Scenario</th>
            <th className="pb-2 font-medium">Est. Revenue Delta</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800/50 last:border-0">
              <td className="py-2.5 text-neutral-600 dark:text-neutral-300">{row.time}</td>
              <td className="py-2.5 text-neutral-800 dark:text-neutral-200 font-medium">{row.scenario}</td>
              <td className={`py-2.5 ${row.revenue.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                {row.revenue}
              </td>
              <td className="py-2.5">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${row.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}
                `}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
