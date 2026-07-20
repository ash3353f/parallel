"use client";

import React, { useEffect, useState } from "react";
import { Wifi, Database, Activity, Clock } from "lucide-react";

export function WorkspaceStatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 flex items-center justify-between px-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-500 dark:text-neutral-400 select-none z-50">
      
      {/* Left */}
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3" />
          Connected to Parallel Engine v2.4
        </span>
      </div>

      {/* Center */}
      <div className="flex items-center gap-4 hidden md:flex">
        <span className="flex items-center gap-1.5">
          <Database className="w-3 h-3" />
          5 Assets
        </span>
        <span className="text-neutral-300 dark:text-neutral-600">&middot;</span>
        <span className="flex items-center gap-1.5">
          <Activity className="w-3 h-3" />
          7 Connections
        </span>
        <span className="text-neutral-300 dark:text-neutral-600">&middot;</span>
        <span className="text-indigo-600 dark:text-indigo-400">
          3 Active Simulations
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span>Last saved 2m ago</span>
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-300">
          <Clock className="w-3 h-3" />
          <span>{time}</span>
        </div>
      </div>

    </div>
  );
}
