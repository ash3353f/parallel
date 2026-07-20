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
      impact: "+$1.8M savings",
      roi: "340%",
      actionText: "Execute Integration",
    },
    {
      id: "op-2",
      title: "Weekend logistics shift optimization",
      priority: "Medium",
      confidence: 91,
      impact: "+$420k revenue",
      roi: "180%",
      actionText: "Apply Optimization",
    },
    {
      id: "op-3",
      title: "Cross-sell to existing enterprise clients",
      priority: "High",
      confidence: 89,
      impact: "+$3.2M revenue",
      roi: "520%",
      actionText: "Launch Campaign",
    },
  ],
  "AI Suggestions": [
    {
      id: "ai-1",
      title: "Shift 15% production to Plant B",
      confidence: 96,
      impact: "+$2.4M",
      roi: "280%",
      actionText: "Approve Shift",
    },
    {
      id: "ai-2",
      title: "Delay warehouse expansion to Q4",
      confidence: 92,
      impact: "saves $4.2M CapEx",
      roi: "150%",
      actionText: "Delay Expansion",
    },
    {
      id: "ai-3",
      title: "Optimize staffing with AI scheduling",
      confidence: 88,
      impact: "+$890k savings",
      roi: "210%",
      actionText: "Implement Schedule",
    },
  ],
  "Recent Decisions": [
    {
      id: "rd-1",
      title: "Approved: Transatlantic freight reroute",
      status: "Completed",
      impact: "+$850k saved",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const getPriorityColor = (priority?: Priority) => {
  switch (priority) {
    case "Critical":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "High":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    case "Medium":
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    case "Low":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "Completed":
      return "text-green-500";
    case "In Progress":
      return "text-blue-500";
    case "Under Review":
      return "text-orange-500";
    default:
      return "text-gray-500";
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

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Action Center
          </h2>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {getTabIcon(tab)}
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-4"
          >
            {mockData[activeTab].map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-2.5 h-2.5 rounded-full animate-ping ${
                          item.priority === "Critical"
                            ? "bg-red-500"
                            : item.priority === "High"
                            ? "bg-orange-500"
                            : "bg-indigo-500"
                        }`}
                      ></span>
                      <span
                        className={`relative w-2.5 h-2.5 rounded-full ${
                          item.priority === "Critical"
                            ? "bg-red-500"
                            : item.priority === "High"
                            ? "bg-orange-500"
                            : "bg-indigo-500"
                        }`}
                      ></span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                  {item.priority && (
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  )}
                  {item.status && (
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      {item.status === "Completed" && <CheckCircle2 className={`w-4 h-4 ${getStatusColor(item.status)}`} />}
                      {item.status === "In Progress" && <Clock className={`w-4 h-4 ${getStatusColor(item.status)}`} />}
                      {item.status === "Under Review" && <AlertTriangle className={`w-4 h-4 ${getStatusColor(item.status)}`} />}
                      <span className={getStatusColor(item.status)}>{item.status}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {item.confidence && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Confidence
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.confidence}%
                      </span>
                    </div>
                  )}
                  {item.impact && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <DollarSign className="w-3 h-3 mr-0.5" /> Impact
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          item.impact.startsWith("+")
                            ? "text-green-600 dark:text-green-400"
                            : item.impact.startsWith("-")
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {item.impact}
                      </span>
                    </div>
                  )}
                  {item.roi && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> Expected ROI
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {item.roi}
                      </span>
                    </div>
                  )}
                </div>

                {item.actionText && (
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                      {item.actionText}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
