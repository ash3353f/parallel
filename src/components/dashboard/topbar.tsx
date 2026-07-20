"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Command, Search } from "lucide-react";

export function Topbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-4 z-20 mx-auto flex w-full max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">Parallel</p>
          <h1 className="text-lg font-semibold text-white sm:text-xl">Executive Overview</h1>
        </div>
        <nav className="hidden items-center gap-4 md:flex ml-2">
          <Link href="/workspace" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Workspace
          </Link>
        </nav>
      </div>
      <div className="hidden min-w-72 items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-400 md:flex">
        <Search className="h-4 w-4" />
        Search metrics, teams, scenarios
        <Command className="ml-auto h-4 w-4 text-slate-500" />
      </div>
      <button className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">
        <Bell className="h-5 w-5" />
      </button>
    </motion.header>
  );
}

