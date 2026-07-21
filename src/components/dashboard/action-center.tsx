"use client";

import React, { useState } from "react";
import { AlertTriangle, ChevronDown, Zap, CheckCircle2, ArrowRight } from "lucide-react";

export interface IncidentItem {
  id: string;
  title: string;
  sev: "critical" | "high" | "medium";
  cat: "alert" | "opp" | "ai" | "decision";
  time: string;
  stat1Label: string;
  stat1Val: string;
  stat2Label: string;
  stat2Val: string;
  actionText: string;
}

export const sampleIncidents: IncidentItem[] = [
  {
    id: "inc-1",
    title: "Maritime Seaport Terminal 4 Microchip Bottleneck",
    sev: "critical",
    cat: "alert",
    time: "2 mins ago",
    stat1Label: "Delay Risk",
    stat1Val: "+4.2 Hours",
    stat2Label: "Potential Revenue Loss",
    stat2Val: "-$1.8M",
    actionText: "Reroute Freight Corridor",
  },
  {
    id: "inc-2",
    title: "Apex Factory Line 2 Robotics Thermal Spike",
    sev: "high",
    cat: "alert",
    time: "14 mins ago",
    stat1Label: "Motor Temp",
    stat1Val: "84.2°C High",
    stat2Label: "Wear Index",
    stat2Val: "89% Critical",
    actionText: "Reduce Speed 15%",
  },
  {
    id: "inc-3",
    title: "Peak Utility Grid Tariff Window Starting",
    sev: "medium",
    cat: "opp",
    time: "28 mins ago",
    stat1Label: "Tariff Multiplier",
    stat1Val: "2.4x Standard",
    stat2Label: "BESS Storage",
    stat2Val: "94% Charged",
    actionText: "Switch to Battery Power",
  },
];

export const ActionCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "inc-1": true });

  const toggleIncident = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredIncidents = sampleIncidents.filter((inc) => {
    if (activeTab === "alerts") return inc.cat === "alert";
    if (activeTab === "opps") return inc.cat === "opp";
    if (activeTab === "ai") return inc.cat === "ai";
    return true;
  });

  return (
    <section className="section" id="section-incidents">
      <div className="wrap">
        <div className="rail-head">
          <div>
            <span className="eyebrow">Real-Time Event Stream</span>
            <h2>Operational Incident & Opportunity Rail</h2>
          </div>

          <div className="rail-tabs">
            <button
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "active" : ""}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className={activeTab === "alerts" ? "active" : ""}
            >
              Critical Alerts
            </button>
            <button
              onClick={() => setActiveTab("opps")}
              className={activeTab === "opps" ? "active" : ""}
            >
              Opportunities
            </button>
          </div>
        </div>

        <div className="rail">
          {filteredIncidents.map((inc) => {
            const isOpen = !!openIds[inc.id];
            return (
              <div
                key={inc.id}
                data-sev={inc.sev}
                className={`incident ${isOpen ? "open" : ""}`}
                onClick={() => toggleIncident(inc.id)}
              >
                <div className="inc-top">
                  <div className="inc-title">
                    <span className="sd" />
                    <span>{inc.title}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inc-sev">{inc.sev}</span>
                    <span className="text-xs text-slate-400 font-medium">{inc.time}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="inc-body">
                  <div>
                    <div className="inc-grid" onClick={(e) => e.stopPropagation()}>
                      <div className="inc-stat">
                        <span className="k">{inc.stat1Label}</span>
                        <span className="v bad">{inc.stat1Val}</span>
                      </div>
                      <div className="inc-stat">
                        <span className="k">{inc.stat2Label}</span>
                        <span className="v">{inc.stat2Val}</span>
                      </div>
                      <div className="inc-action">
                        <button className="btn btn-cyan text-xs py-2 px-4">
                          <span>{inc.actionText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
