"use client";

import React from "react";

export const Timeline: React.FC = () => {
  return (
    <section className="section" id="section-timeline">
      <div className="wrap">
        <div className="timeline-head">
          <span className="eyebrow">Executive Decision Log</span>
          <h2>Autonomous Strategy Timeline</h2>
        </div>

        <div className="tl in">
          <div className="trackline">
            <div className="fill" style={{ width: "66%" }} />
          </div>

          {/* Node 1 - Past */}
          <div className="tl-node past">
            <div className="pt">✓</div>
            <div className="when">Q1 2026 • EXECUTED</div>
            <h4>Autonomous BESS Deployment</h4>
            <p>Integrated 5MWh lithium battery storage microgrid at Apex Factory, reducing utility peak tariff draw by 18.5%.</p>
          </div>

          {/* Node 2 - Present */}
          <div className="tl-node present">
            <div className="pt">2</div>
            <div className="when">Q2 2026 • IN PROGRESS</div>
            <h4>Seaport Terminal 4 Freight Reroute</h4>
            <p>Currently routing primary microchip shipments through electric rail links to eliminate H1 bottleneck delays.</p>
          </div>

          {/* Node 3 - Future */}
          <div className="tl-node future">
            <div className="pt">3</div>
            <div className="when">Q3 2026 • SIMULATED TARGET</div>
            <h4>Full Autonomous Logistics Fleet</h4>
            <p>Deploying AI-driven autonomous trucks across highway Corridor V2 to achieve 99.8% on-time warehouse fulfillment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
