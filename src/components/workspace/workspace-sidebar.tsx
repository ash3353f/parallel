"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Box, Building2, Users, Truck, Database, GitBranch, Layers, ChevronLeft, ChevronRight } from "lucide-react";

interface WorkspaceSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  selectedItem: string | null;
  onSelectItem: (id: string) => void;
}

const SIDEBAR_ITEMS = [
  { id: "assets", icon: Box, label: "Assets" },
  { id: "facilities", icon: Building2, label: "Facilities" },
  { id: "departments", icon: Users, label: "Departments" },
  { id: "supply-chain", icon: Truck, label: "Supply Chain" },
  { id: "resources", icon: Database, label: "Resources" },
  { id: "processes", icon: GitBranch, label: "Processes" },
  { id: "scenarios", icon: Layers, label: "Scenarios" },
];

export function WorkspaceSidebar({ collapsed, onToggle, selectedItem, onSelectItem }: WorkspaceSidebarProps) {
  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      className="flex flex-col h-full bg-white/90 dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 backdrop-blur-xl shrink-0 overflow-hidden"
    >
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedItem === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isSelected 
                  ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-center min-w-[32px]">
                <Icon className={`w-5 h-5 ${isSelected ? "text-cyan-500" : ""}`} />
              </div>
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </motion.button>
      </div>
    </motion.div>
  );
}
