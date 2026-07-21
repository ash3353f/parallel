"use client";

import React from "react";
import dynamic from "next/dynamic";

const DigitalTwinWorldDynamic = dynamic(
  () =>
    import("@/components/digital-twin/DigitalTwinWorld").then(
      (mod) => mod.DigitalTwinWorld
    ),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-[650px] lg:h-[750px] w-full items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-800 dark:border-white/10 dark:bg-slate-950 dark:text-cyan-300">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-cyan-500 border-t-transparent shadow-lg" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Initializing Parallel 3D Digital Twin Engine…
          </span>
        </div>
      </div>
    ),
  }
);

export interface CompanyWorldProps {
  onEnterBuilding?: (buildingId: string, buildingName: string) => void;
  className?: string;
}

export function CompanyWorld({ onEnterBuilding, className }: CompanyWorldProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <DigitalTwinWorldDynamic
        onEnterBuilding={onEnterBuilding}
        className={className}
      />
    </section>
  );
}
