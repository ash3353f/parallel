"use client";

import React, { useState } from "react";
import { TrendingUp, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export interface RecCardData {
  id: string;
  tag: string;
  title: string;
  desc: string;
  impact: string;
}

export const sampleRecommendations: RecCardData[] = [
  {
    id: "rec-1",
    tag: "High Impact Strategic Action",
    title: "Shift Seaport Logistics to Direct Rail Dispatch",
    desc: "By bypassing highway port congestion and transferring freight containers directly onto electric rail links, delivery time to Warehouse Hub drops by 3.2 days.",
    impact: "+$2.4M Quarterly Margin",
  },
  {
    id: "rec-2",
    tag: "Energy Optimization",
    title: "Deploy Automated BESS Peak-Shaving Cycle",
    desc: "Pre-charging internal lithium battery banks during midnight off-peak hours and discharging during peak utility windows cuts overall factory kWh cost by 18.5%.",
    impact: "-$850K Utility Overhead",
  },
  {
    id: "rec-3",
    tag: "Autonomous Robotics",
    title: "Rebalance Apex Factory Conveyor Speeds",
    desc: "Adjusting robot arm assembly cadence on Line 2 reduces heat dissipation, extending actuator lifecycle by 24 months without dropping unit output.",
    impact: "-34% Mechanical Wear",
  },
];

export const ExecutiveAnalytics: React.FC = () => {
  const [activeRecIndex, setActiveRecIndex] = useState(0);

  const prevRec = () => {
    setActiveRecIndex((prev) => (prev > 0 ? prev - 1 : sampleRecommendations.length - 1));
  };

  const nextRec = () => {
    setActiveRecIndex((prev) => (prev < sampleRecommendations.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="section" id="section-analytics">
      <div className="wrap">
        <div className="analytics-head">
          <span className="eyebrow">Executive Intelligence</span>
          <h2>Cross-Department Performance & Velocity</h2>
        </div>

        {/* Stat Row */}
        <div className="stat-row in">
          <div className="stat">
            <div className="lab">
              <span>Gross Revenue</span>
              <span className="pill bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">+14.2%</span>
            </div>
            <div className="val num">$48.2M</div>
            <svg className="chart" viewBox="0 0 160 50">
              <path
                className="line"
                d="M0,45 Q40,35 80,38 T160,8"
                stroke="var(--emerald)"
              />
            </svg>
          </div>

          <div className="stat">
            <div className="lab">
              <span>Operating Profit</span>
              <span className="pill bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">+2.8%</span>
            </div>
            <div className="val num">$12.8M</div>
            <svg className="chart" viewBox="0 0 160 50">
              <path
                className="line"
                d="M0,38 Q40,30 80,32 T160,12"
                stroke="var(--cyan)"
              />
            </svg>
          </div>

          <div className="stat">
            <div className="lab">
              <span>Supply Risk Index</span>
              <span className="pill bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">Low</span>
            </div>
            <div className="val num">3.2%</div>
            <svg className="chart" viewBox="0 0 160 50">
              <path
                className="line"
                d="M0,15 Q40,18 80,22 T160,40"
                stroke="var(--purple)"
              />
            </svg>
          </div>

          <div className="stat">
            <div className="lab">
              <span>Factory Output</span>
              <span className="pill bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">1,450 u/d</span>
            </div>
            <div className="val num">94.2%</div>
            <div className="chart flex items-end gap-1.5 pt-2">
              {[40, 55, 70, 65, 85, 95, 90, 100].map((h, i) => (
                <div
                  key={i}
                  className="bar flex-1 rounded-t-xs bg-gradient-to-t from-cyan-500 to-emerald-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="analytics-grid">
          {/* Department Benchmark Progress Bars */}
          <div>
            <div className="block-title">
              <span>Department Benchmarks</span>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">TARGET 95%</span>
            </div>
            <p className="block-sub">Overall operational efficiency index across core enterprise divisions.</p>

            <div className="dept mt-4">
              <div className="d">
                <div className="top">
                  <span>Manufacturing</span>
                  <span className="v">91% <span>/ 95%</span></span>
                </div>
                <div className="track">
                  <div className="fill bg-gradient-to-r from-cyan-500 to-emerald-400" style={{ width: "91%" }} />
                  <div className="target" style={{ left: "95%" }} />
                </div>
              </div>

              <div className="d">
                <div className="top">
                  <span>Logistics & Freight</span>
                  <span className="v">87% <span>/ 90%</span></span>
                </div>
                <div className="track">
                  <div className="fill bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: "87%" }} />
                  <div className="target" style={{ left: "90%" }} />
                </div>
              </div>

              <div className="d">
                <div className="top">
                  <span>Energy & Microgrid</span>
                  <span className="v">96% <span>/ 92%</span></span>
                </div>
                <div className="track">
                  <div className="fill bg-gradient-to-r from-emerald-500 to-cyan-400" style={{ width: "96%" }} />
                  <div className="target" style={{ left: "92%" }} />
                </div>
              </div>

              <div className="d">
                <div className="top">
                  <span>Finance & Margins</span>
                  <span className="v">94% <span>/ 94%</span></span>
                </div>
                <div className="track">
                  <div className="fill bg-gradient-to-r from-purple-500 to-cyan-400" style={{ width: "94%" }} />
                  <div className="target" style={{ left: "94%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Supply-Chain Velocity Pipeline */}
          <div>
            <div className="block-title">
              <span>Supply-Chain Velocity</span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">OPTIMAL</span>
            </div>
            <p className="block-sub">Live status tracking across primary transport & fulfillment corridors.</p>

            <div className="chain mt-4">
              <div className="node">
                <div className="ic">🚢</div>
                <span className="nm">Maritime Port → Warehouse Hub</span>
                <span className="st optimal">Optimal</span>
                <span className="ar">→</span>
              </div>

              <div className="node">
                <div className="ic">🏭</div>
                <span className="nm">Apex Factory Line 1 Assembly</span>
                <span className="st peak">Peak Output</span>
                <span className="ar">→</span>
              </div>

              <div className="node">
                <div className="ic">🚛</div>
                <span className="nm">Corridor V2 Highway Logistics</span>
                <span className="st rerouted">Rerouted</span>
                <span className="ar">→</span>
              </div>

              <div className="node">
                <div className="ic">✈️</div>
                <span className="nm">Air Cargo Express Dispatch</span>
                <span className="st delivered">On Schedule</span>
                <span className="ar">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Recommendations */}
        <div className="recs">
          <div className="block-title">
            <span>Executive AI Recommendations</span>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">3 HIGH PRIORITY</span>
          </div>

          <div className="stack-wrap mt-6">
            {/* 3D Stack Stage */}
            <div className="stack-stage">
              {sampleRecommendations.map((rec, idx) => {
                const offset = idx - activeRecIndex;
                const isCurrent = idx === activeRecIndex;
                return (
                  <div
                    key={rec.id}
                    className="rcard"
                    style={{
                      transform: `translate3d(0, ${offset * 14}px, ${-offset * 40}px) scale(${1 - Math.abs(offset) * 0.04})`,
                      opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25,
                      zIndex: 10 - Math.abs(offset),
                      pointerEvents: isCurrent ? "auto" : "none",
                    }}
                  >
                    <span className="rc-tag text-cyan-600 dark:text-cyan-400">{rec.tag}</span>
                    <h4>{rec.title}</h4>
                    <p>{rec.desc}</p>
                    <div className="rc-foot">
                      <span className="rc-impact text-emerald-600 dark:text-emerald-400">{rec.impact}</span>
                      <button className="btn btn-cyan text-xs py-2 px-4">
                        <span>Execute Strategy</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stack Controls */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="stack-dots">
                {sampleRecommendations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveRecIndex(idx)}
                    className={`dd ${idx === activeRecIndex ? "active" : ""}`}
                  />
                ))}
              </div>

              <div className="stack-ctrl">
                <button onClick={prevRec} aria-label="Previous Recommendation">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={nextRec} aria-label="Next Recommendation">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
