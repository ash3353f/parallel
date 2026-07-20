"use client";

import { motion } from "framer-motion";
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Expand, Play, Save, Share2 } from "lucide-react";

interface WorkspaceHeaderProps {
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export function WorkspaceHeader({ onToggleFullscreen, isFullscreen }: WorkspaceHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">Parallel Workspace</span>
        </div>
        <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
        <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
          Baseline Scenario v2.4
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </motion.button>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 w-10 text-center">100%</span>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </motion.button>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Expand className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Save className="w-4 h-4" />
            Save
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-400 hover:to-blue-400 shadow-sm shadow-cyan-500/20 transition-all">
            <Play className="w-4 h-4 fill-current" />
            Run Simulation
          </motion.button>
        </div>

        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onToggleFullscreen} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </motion.button>
      </div>
    </div>
  );
}
