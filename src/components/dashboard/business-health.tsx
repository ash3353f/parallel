"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, ShieldCheck } from "lucide-react";

export const BusinessHealth: React.FC = () => {
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHealthScore(94.8);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const ringOffset = 452 - (452 * healthScore) / 100;

  return (
    <section className="section" id="section-pulse">
      <div className="wrap">
        <div className="stage-head">
          <div>
            <span className="eyebrow">Real-Time Enterprise Telemetry</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Health & Operational Pulse</h2>
          </div>
        </div>

        <div className="pulse mt-6">
          {/* Health Ring Gauge */}
          <div className="pulse-health">
            <div className="ring">
              <svg width="172" height="172" viewBox="0 0 172 172">
                <defs>
                  <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" />
                    <stop offset="100%" stopColor="var(--emerald)" />
                  </linearGradient>
                </defs>
                <circle className="track" cx="86" cy="86" r="72" strokeWidth="12" fill="none" />
                <circle
                  className="prog"
                  cx="86"
                  cy="86"
                  r="72"
                  strokeWidth="12"
                  fill="none"
                  style={{ strokeDashoffset: ringOffset }}
                />
              </svg>
              <div className="center">
                <span className="big num">{healthScore.toFixed(1)}</span>
                <span className="lab">HEALTH INDEX</span>
              </div>
            </div>

            <div className="health-tags">
              <span className="htag">
                <span className="dot bg-emerald-500" />
                <span>Supply Chain 98%</span>
              </span>
              <span className="htag">
                <span className="dot bg-cyan-500" />
                <span>Operations 92%</span>
              </span>
              <span className="htag">
                <span className="dot bg-purple-500" />
                <span>Energy 96%</span>
              </span>
            </div>
          </div>

          {/* Pulse Metric Grid */}
          <div className="pulse-metrics in">
            {/* Metric 1 */}
            <div className="pm">
              <div className="top">
                <span className="lab">Quarterly Revenue</span>
                <span className="delta up">+14.2% YoY</span>
              </div>
              <div className="val num">$48.2M</div>
              <svg className="spark" viewBox="0 0 200 40">
                <defs>
                  <linearGradient id="sp1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="area"
                  d="M0,35 Q30,28 60,30 T120,15 T180,8 L200,5 L200,40 L0,40 Z"
                  fill="url(#sp1)"
                />
                <path
                  className="line"
                  d="M0,35 Q30,28 60,30 T120,15 T180,8 L200,5"
                  stroke="var(--emerald)"
                />
              </svg>
            </div>

            {/* Metric 2 */}
            <div className="pm">
              <div className="top">
                <span className="lab">Net Profit Margin</span>
                <span className="delta up">+2.8% QoQ</span>
              </div>
              <div className="val num">$12.8M</div>
              <svg className="spark" viewBox="0 0 200 40">
                <defs>
                  <linearGradient id="sp2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="area"
                  d="M0,30 Q40,25 80,28 T140,12 L200,8 L200,40 L0,40 Z"
                  fill="url(#sp2)"
                />
                <path
                  className="line"
                  d="M0,30 Q40,25 80,28 T140,12 L200,8"
                  stroke="var(--cyan)"
                />
              </svg>
            </div>

            {/* Metric 3 */}
            <div className="pm">
              <div className="top">
                <span className="lab">Ecosystem Risk</span>
                <span className="delta down">-1.4% Low</span>
              </div>
              <div className="val num">3.2%</div>
              <svg className="spark" viewBox="0 0 200 40">
                <path
                  className="line"
                  d="M0,10 Q50,15 100,12 T170,28 L200,32"
                  stroke="var(--cyan)"
                />
              </svg>
            </div>

            {/* Metric 4 */}
            <div className="pm">
              <div className="top">
                <span className="lab">Active Workforce</span>
                <span className="delta up">99.4% On Shift</span>
              </div>
              <div className="val num">1,284</div>
              <svg className="spark" viewBox="0 0 200 40">
                <path
                  className="line"
                  d="M0,25 Q40,20 90,22 T160,10 L200,12"
                  stroke="var(--purple)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
