"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Command, Search } from "lucide-react";

export function Topbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-4 z-20 mx-auto flex w-full max-w-7xl items-center justify-between rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-3.5 shadow-lg shadow-slate-200/50 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/40"
    >
      <div className="flex items-center gap-6">
        <div>
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
            Parallel OS
          </p>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl tracking-tight">
            Executive Overview
          </h1>
        </div>
        <nav className="hidden items-center gap-5 md:flex ml-4">
          <Link
            href="/workspace"
            className="text-sm font-semibold text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
          >
            Digital Twin Workspace
          </Link>
        </nav>
      </div>

      <div className="hidden min-w-80 items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-100/70 px-3.5 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300 md:flex">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search metrics, teams, scenarios..."
          className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
        />
        <kbd className="ml-auto rounded-lg border border-slate-300 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-slate-500 shadow-xs dark:border-white/15 dark:bg-slate-800 dark:text-slate-400">
          <Command className="inline h-3 w-3 mr-0.5" />K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-700 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-400 transition-all shadow-xs">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </motion.header>
  );
}
