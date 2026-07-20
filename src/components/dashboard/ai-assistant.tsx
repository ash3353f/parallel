"use client";

import { motion } from "framer-motion";
import { Bot, Play } from "lucide-react";

export function AiAssistant() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-purple-500/10 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-400/20 p-3 text-cyan-200"><Bot className="h-5 w-5" /></span>
        <div>
          <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
          <p className="text-sm text-slate-400">Ask for executive simulations and tradeoffs.</p>
        </div>
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-3">
        <textarea
          className="min-h-28 w-full resize-none bg-transparent p-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder="What happens if we increase factory throughput by 12% next quarter?"
        />
        <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-purple-400 px-4 py-3 text-sm font-semibold text-black transition hover:brightness-110">
          <Play className="h-4 w-4 fill-current" />
          Run Simulation
        </button>
      </div>
      <div className="mt-5 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4 text-sm leading-6 text-cyan-50">
        <p className="font-medium text-white">Mock response</p>
        <p className="mt-2 text-slate-300">
          Increasing throughput by 12% is projected to lift revenue by $3.4M while raising warehouse utilization to 87%. Recommended action: add one weekend logistics shift before scaling further.
        </p>
      </div>
    </motion.section>
  );
}
