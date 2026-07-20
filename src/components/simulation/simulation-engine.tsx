"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Cpu,
  Activity,
} from "lucide-react";

export type SimulationStage =
  | "idle"
  | "Initializing"
  | "Loading Company Data"
  | "Building Digital Twin"
  | "Running AI Models"
  | "Predicting Outcomes"
  | "Optimizing Decisions"
  | "Complete";

const simulationStages: SimulationStage[] = [
  "Initializing",
  "Loading Company Data",
  "Building Digital Twin",
  "Running AI Models",
  "Predicting Outcomes",
  "Optimizing Decisions",
  "Complete",
];

const mockLiveFeedEvents = [
  "Factory output increased +8%",
  "Warehouse delay detected at Hub B",
  "Port congestion predicted in Rotterdam",
  "Alternative supplier found: Tier-2 Battery Cell",
  "Fuel cost reduced -12% via route optimization",
  "AI Simulation Confidence reached 96%",
  "Thermal load peak averted on Cell #3",
  "Carbon footprint reduced -5.4% MT",
];

interface SimulationEngineProps {
  onSimulationComplete?: (results: {
    revenueDelta: string;
    profitDelta: string;
    confidence: number;
  }) => void;
}

export function SimulationEngine({ onSimulationComplete }: SimulationEngineProps) {
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liveFeed, setLiveFeed] = useState<string[]>([]);
  const confidence = 96;

  // Simulation timer & stage progression (lasts ~18 seconds total)
  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsRunning(false);
          setIsPaused(false);
          if (onSimulationComplete) {
            onSimulationComplete({
              revenueDelta: "+$3.4M",
              profitDelta: "+$1.5M",
              confidence: 96,
            });
          }
          return 100;
        }

        const nextProgress = prevProgress + 1;
        const currentStageIdx = Math.min(
          simulationStages.length - 1,
          Math.floor((nextProgress / 100) * (simulationStages.length - 1))
        );
        setStageIndex(currentStageIdx);

        // Add a live event feed entry every ~12% progress
        if (nextProgress % 12 === 0 && liveFeed.length < mockLiveFeedEvents.length) {
          const newEvent = mockLiveFeedEvents[Math.floor(nextProgress / 12) - 1];
          if (newEvent) {
            setLiveFeed((prev) => [newEvent, ...prev]);
          }
        }

        return nextProgress;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, liveFeed.length, onSimulationComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    setProgress(0);
    setStageIndex(0);
    setLiveFeed([]);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setProgress(0);
    setStageIndex(0);
    setLiveFeed([]);
  };

  const currentStageName = isRunning
    ? simulationStages[stageIndex]
    : progress === 100
      ? "Complete"
      : "Ready";

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90 sm:p-7">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-500" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-300">
              AI Simulation Engine
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Real-Time Digital Twin Simulator
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {!isRunning && progress === 0 && (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition hover:brightness-110"
            >
              <Play className="h-4 w-4 fill-current" />
              Run Simulation
            </button>
          )}

          {isRunning && (
            <>
              <button
                onClick={handlePauseResume}
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-full border border-red-300/60 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-500/20 dark:border-red-500/30 dark:text-red-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </>
          )}

          {!isRunning && progress === 100 && (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-cyan-400"
            >
              <RotateCcw className="h-4 w-4" />
              Run Again
            </button>
          )}
        </div>
      </div>

      {/* Progress & Stage Timeline */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Stage: <strong className="text-slate-900 dark:text-white font-mono">{currentStageName}</strong>
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-md"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Stage Steps Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {simulationStages.map((stg, idx) => {
            const isCompleted = stageIndex > idx || progress === 100;
            const isCurrent = isRunning && stageIndex === idx;

            return (
              <span
                key={stg}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isCompleted
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : isCurrent
                      ? "bg-cyan-500/20 text-cyan-700 ring-1 ring-cyan-400 dark:text-cyan-300"
                      : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500"
                }`}
              >
                {isCompleted && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                {isCurrent && <Activity className="h-3 w-3 animate-spin text-cyan-400" />}
                {stg}
              </span>
            );
          })}
        </div>
      </div>

      {/* Live Event Feed & Confidence Meter */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Live Feed Column */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03] md:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Live Simulation Event Feed
            </span>
            <span className="text-[11px] font-mono text-slate-400">Updating 1s</span>
          </div>

          <div className="mt-3 min-h-[130px] space-y-2">
            <AnimatePresence>
              {liveFeed.length === 0 ? (
                <div className="flex h-28 items-center justify-center text-xs text-slate-400">
                  Click &ldquo;Run Simulation&rdquo; to launch live Digital Twin telemetry.
                </div>
              ) : (
                liveFeed.map((evt, idx) => (
                  <motion.div
                    key={`${evt}-${idx}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white p-2.5 shadow-sm text-xs font-medium text-slate-800 dark:border-white/5 dark:bg-slate-950 dark:text-slate-200"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-500" />
                    <span>{evt}</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Confidence Box */}
        <div className="flex flex-col justify-between rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4 backdrop-blur-xl dark:border-cyan-400/20 dark:bg-cyan-500/10 md:col-span-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              Model Confidence
            </span>
            <div className="mt-3 text-4xl font-bold font-mono text-cyan-600 dark:text-cyan-300">
              {confidence}%
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              Derived from 4.8M historical data points & real-time telemetry inputs.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-cyan-400/20 pt-3 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            <span>Accuracy Horizon</span>
            <span>90 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
