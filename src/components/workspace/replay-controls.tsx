"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle2,
} from "lucide-react";

export interface TimelineEvent {
  id: string;
  time: string;
  label: string;
  detail: string;
  type: "success" | "info" | "warning";
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "e1",
    time: "08:30",
    label: "Factory Output Increased",
    detail: "Assembly line throughput increased +15%",
    type: "success",
  },
  {
    id: "e2",
    time: "08:31",
    label: "Warehouse Capacity Updated",
    detail: "Buffer inventory adjusted to 82%",
    type: "info",
  },
  {
    id: "e3",
    time: "08:32",
    label: "Logistics Optimized",
    detail: "Transatlantic freight rerouted via Node B",
    type: "success",
  },
  {
    id: "e4",
    time: "08:33",
    label: "Revenue Projected +$3.4M",
    detail: "Quarterly revenue forecast adjusted upwards",
    type: "success",
  },
  {
    id: "e5",
    time: "08:34",
    label: "Risk Level Reduced",
    detail: "Thermal peak mitigated on Factory Cell #3",
    type: "info",
  },
];

export function ReplayControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 3000 / speed;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= mockTimelineEvents.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const progressPercent = ((currentIndex + 1) / mockTimelineEvents.length) * 100;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-cyan-500" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Simulation Replay Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Animate timeline progression, node highlights & KPI updates
            </p>
          </div>
        </div>

        {/* Replay Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-md hover:bg-cyan-400"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isPlaying ? "Pause" : "Play Replay"}</span>
          </button>
          <button
            onClick={handleRestart}
            className="rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            title="Restart"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-white/5">
            {([1, 2, 4] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${
                  speed === s
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Replay Step {currentIndex + 1} of {mockTimelineEvents.length}</span>
          <span>{Math.round(progressPercent)}% Complete</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Live Event Ticker */}
      <div className="mt-5 space-y-2.5">
        {mockTimelineEvents.map((evt, idx) => {
          const isActive = idx === currentIndex;
          const isPassed = idx <= currentIndex;

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isPassed ? 1 : 0.4, x: 0 }}
              className={`flex items-start gap-3 rounded-2xl border p-3 transition-all ${
                isActive
                  ? "border-cyan-400/60 bg-cyan-500/10 shadow-md ring-1 ring-cyan-400 dark:bg-cyan-950/40"
                  : "border-slate-200/80 bg-slate-50/70 dark:border-white/10 dark:bg-white/[0.02]"
              }`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {evt.label}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                    {evt.time}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  {evt.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
