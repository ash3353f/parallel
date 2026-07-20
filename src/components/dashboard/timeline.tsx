"use client";

import { motion } from "framer-motion";

const moments = [
  { label: "Past", text: "Q2 revenue beat plan by 8%; hiring remained efficient." },
  { label: "Present", text: "Operations stable with low risk and elevated demand." },
  { label: "Future", text: "Scenario planning targets margin expansion and capacity growth." },
];

export function Timeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-purple-500/10 backdrop-blur-2xl"
    >
      <h2 className="text-xl font-semibold text-white">Timeline</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {moments.map((moment, index) => (
          <div key={moment.label} className="relative rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-purple-400 text-sm font-bold text-black">{index + 1}</span>
              <span className="font-semibold text-white">{moment.label}</span>
            </div>
            <p className="text-sm leading-6 text-slate-400">{moment.text}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
