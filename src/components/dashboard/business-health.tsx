"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

export function BusinessHealth() {
  const [score, setScore] = useState(94);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        let newScore = prev + change;
        if (newScore > 100) newScore = 100;
        if (newScore < 0) newScore = 0;
        return newScore;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (val: number) => {
    if (val >= 90) {
      return {
        text: "text-emerald-500 dark:text-emerald-400",
        stroke: "stroke-emerald-500 dark:stroke-emerald-400",
        bg: "bg-emerald-500 dark:bg-emerald-400",
        border: "border-emerald-500/20",
        shadow: "shadow-emerald-500/20",
        hex: "#10b981", // For drop shadow
      };
    }
    if (val >= 70) {
      return {
        text: "text-cyan-500 dark:text-cyan-400",
        stroke: "stroke-cyan-500 dark:stroke-cyan-400",
        bg: "bg-cyan-500 dark:bg-cyan-400",
        border: "border-cyan-500/20",
        shadow: "shadow-cyan-500/20",
        hex: "#06b6d4",
      };
    }
    if (val >= 50) {
      return {
        text: "text-amber-500 dark:text-amber-400",
        stroke: "stroke-amber-500 dark:stroke-amber-400",
        bg: "bg-amber-500 dark:bg-amber-400",
        border: "border-amber-500/20",
        shadow: "shadow-amber-500/20",
        hex: "#f59e0b",
      };
    }
    return {
      text: "text-red-500 dark:text-red-400",
      stroke: "stroke-red-500 dark:stroke-red-400",
      bg: "bg-red-500 dark:bg-red-400",
      border: "border-red-500/20",
      shadow: "shadow-red-500/20",
      hex: "#ef4444",
    };
  };

  const colors = getScoreColor(score);

  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full max-w-2xl p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div 
        className={`absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 dark:opacity-10 transition-colors duration-1000 bg-current ${colors.text}`}
      />

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border ${colors.border} transition-colors duration-500`}>
          <Activity className={`w-5 h-5 ${colors.text} transition-colors duration-500`} />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Business Health</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Gauge Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg
              width={size}
              height={size}
              className="transform -rotate-90 drop-shadow-xl"
            >
              {/* Background Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth={strokeWidth}
              />
              {/* Animated Progress Circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                className={`${colors.stroke} transition-colors duration-500`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  filter: `drop-shadow(0px 0px 10px ${colors.hex}66)`
                }}
              />
            </svg>
            
            <div className="absolute flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={score}
                  initial={{ y: -10, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 10, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`text-5xl font-bold ${colors.text} tracking-tighter`}
                >
                  {score}
                </motion.div>
              </AnimatePresence>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                Overall Score
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            {/* Trend */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Trend</span>
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Upward</span>
            </div>

            {/* Risk Level */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Risk Level</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                Low
              </span>
            </div>

            {/* Growth Outlook */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                  <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Growth Outlook</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                Strong
              </span>
            </div>

            {/* Operational Stability */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Operational Stability</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">97%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "97%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
