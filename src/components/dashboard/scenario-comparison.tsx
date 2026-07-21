"use client";

import React, { useState } from "react";
import { Sparkles, Zap } from "lucide-react";

export interface ScenarioData {
  id: string;
  name: string;
  impacts: { label: string; kind: "up" | "down" }[];
  base: {
    revenue: string;
    margin: string;
    risk: string;
    throughput: string;
  };
  opt: {
    revenue: string;
    margin: string;
    risk: string;
    throughput: string;
    revOld?: string;
    marginOld?: string;
    riskOld?: string;
    tpOld?: string;
  };
  summary: string;
}

export const sampleScenarios: ScenarioData[] = [
  {
    id: "scen-1",
    name: "Production Expansion",
    impacts: [
      { label: "+$3.4M Rev Boost", kind: "up" },
      { label: "+20.8% Output Cadence", kind: "up" },
      { label: "CONFIDENCE 96%", kind: "up" },
    ],
    base: {
      revenue: "$48.2M",
      margin: "26.5%",
      risk: "8.4%",
      throughput: "1,200 units/day",
    },
    opt: {
      revenue: "$51.6M",
      margin: "29.8%",
      risk: "3.2%",
      throughput: "1,450 units/day",
      revOld: "$48.2M",
      marginOld: "26.5%",
      riskOld: "8.4%",
      tpOld: "1,200",
    },
    summary:
      "Expanding assembly Line 3 and optimizing cell load across Apex Factory increases daily output by +20.8%, boosting gross quarterly revenue by +$3.4M.",
  },
  {
    id: "scen-2",
    name: "Warehouse Transatlantic Freight Re-route",
    impacts: [
      { label: "-42% Port Transit Delay", kind: "down" },
      { label: "+$2.4M Margin Gain", kind: "up" },
      { label: "CONFIDENCE 98%", kind: "up" },
    ],
    base: {
      revenue: "$48.2M",
      margin: "26.5%",
      risk: "7.8%",
      throughput: "1,250 units/day",
    },
    opt: {
      revenue: "$50.6M",
      margin: "29.9%",
      risk: "2.1%",
      throughput: "1,480 units/day",
      revOld: "$48.2M",
      marginOld: "26.5%",
      riskOld: "7.8%",
      tpOld: "1,250",
    },
    summary:
      "Rerouting primary transatlantic shipments through Maritime Terminal 4 electric rail links bypasses highway port congestion, saving 3.2 days in dock dwell time.",
  },
  {
    id: "scen-3",
    name: "Energy Cost Optimization",
    impacts: [
      { label: "-$1.1M Energy Cost", kind: "down" },
      { label: "+4.2% Net Margin Boost", kind: "up" },
      { label: "CONFIDENCE 94%", kind: "up" },
    ],
    base: {
      revenue: "$48.2M",
      margin: "26.5%",
      risk: "6.1%",
      throughput: "1,350 units/day",
    },
    opt: {
      revenue: "$49.3M",
      margin: "30.7%",
      risk: "2.8%",
      throughput: "1,420 units/day",
      revOld: "$48.2M",
      marginOld: "26.5%",
      riskOld: "6.1%",
      tpOld: "1,350",
    },
    summary:
      "Discharging battery energy storage during peak utility tariff hours (14:00-18:00) lowers grid draw at Apex Factory, cutting overall operating overhead by $1.1M per quarter.",
  },
];

export const ScenarioComparison: React.FC = () => {
  const [selectedScen, setSelectedScen] = useState<ScenarioData>(sampleScenarios[0]);

  return (
    <section className="section" id="section-simulation">
      <div className="wrap">
        <div className="sim-head">
          <div>
            <span className="eyebrow">Predictive AI Twin Engine</span>
            <h2>Simulation & Optimization Transformation</h2>
          </div>

          <div className="scen-tabs">
            {sampleScenarios.map((scen, index) => (
              <button
                key={scen.id}
                onClick={() => setSelectedScen(scen)}
                className={selectedScen.id === scen.id ? "active" : ""}
              >
                {scen.name}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Pills */}
        <div className="impact-row">
          {selectedScen.impacts.map((imp, idx) => (
            <span key={idx} className={`impact ${imp.kind === "down" ? "down" : ""}`}>
              <Sparkles className="h-3.5 w-3.5" />
              <span>{imp.label}</span>
            </span>
          ))}
        </div>

        {/* Transformation Cards */}
        <div className="transform in">
          {/* Baseline State */}
          <div className="tstate base">
            <span className="tag">Current Baseline</span>
            <h3>Unoptimized Enterprise State</h3>
            <div className="trow">
              <span className="k">Quarterly Revenue</span>
              <span className="v num">{selectedScen.base.revenue}</span>
            </div>
            <div className="trow">
              <span className="k">Net Profit Margin</span>
              <span className="v num">{selectedScen.base.margin}</span>
            </div>
            <div className="trow">
              <span className="k">Supply Risk Exposure</span>
              <span className="v num">{selectedScen.base.risk}</span>
            </div>
            <div className="trow">
              <span className="k">Factory Throughput</span>
              <span className="v num">{selectedScen.base.throughput}</span>
            </div>
          </div>

          {/* Flow Connector Line SVG */}
          <div className="tconnector">
            <svg viewBox="0 0 100 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flowgrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--cyan)" />
                  <stop offset="100%" stopColor="var(--purple)" />
                </linearGradient>
              </defs>
              <path className="line" d="M10,60 H90" />
              <path className="flow" d="M10,60 H90" />
              <circle className="dot" cx="50" cy="60" r="5" />
            </svg>
          </div>

          {/* Simulated AI Optimized State */}
          <div className="tstate opt">
            <span className="tag text-cyan-600 dark:text-cyan-400">Simulated AI Target</span>
            <h3>Parallel Optimized State</h3>
            <div className="trow">
              <span className="k">Quarterly Revenue</span>
              <span className="v num">
                {selectedScen.opt.revOld && <span className="old">{selectedScen.opt.revOld}</span>}
                <span className="arrow">→</span>
                <span className="text-emerald-600 dark:text-emerald-400">{selectedScen.opt.revenue}</span>
              </span>
            </div>
            <div className="trow">
              <span className="k">Net Profit Margin</span>
              <span className="v num">
                {selectedScen.opt.marginOld && <span className="old">{selectedScen.opt.marginOld}</span>}
                <span className="arrow">→</span>
                <span className="text-emerald-600 dark:text-emerald-400">{selectedScen.opt.margin}</span>
              </span>
            </div>
            <div className="trow">
              <span className="k">Supply Risk Exposure</span>
              <span className="v num">
                {selectedScen.opt.riskOld && <span className="old">{selectedScen.opt.riskOld}</span>}
                <span className="arrow">→</span>
                <span className="text-cyan-600 dark:text-cyan-400">{selectedScen.opt.risk}</span>
              </span>
            </div>
            <div className="trow">
              <span className="k">Factory Throughput</span>
              <span className="v num">
                {selectedScen.opt.tpOld && <span className="old">{selectedScen.opt.tpOld}</span>}
                <span className="arrow">→</span>
                <span className="text-emerald-600 dark:text-emerald-400">{selectedScen.opt.throughput}</span>
              </span>
            </div>
          </div>
        </div>

        {/* AI Summary Note */}
        <div className="sim-summary">
          <div className="ic">
            <Zap className="h-4 w-4" />
          </div>
          <p>
            <strong>Executive AI Verdict:</strong> {selectedScen.summary}
          </p>
        </div>
      </div>
    </section>
  );
};
