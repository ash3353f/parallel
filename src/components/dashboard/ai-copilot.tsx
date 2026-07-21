"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, User, Table } from "lucide-react";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  conf?: string;
  impacts?: { k: string; v: string }[];
}

export const AiCopilot: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "user",
      text: "How does switching Maritime Terminal 4 to Electric Rail dispatch affect Q3 gross margin?",
    },
    {
      id: "msg-2",
      sender: "ai",
      text: "Analyzing supply-chain telemetry... Redirecting freight containers via electric rail bypassing highway congestion increases net Q3 gross margin by +3.3%, yielding $2.4M in additional profit while reducing port transit delay by 42%.",
      conf: "96.4% CONFIDENCE INDEX",
      impacts: [
        { k: "Revenue Boost", v: "+$3.4M" },
        { k: "Net Margin Gain", v: "+3.3%" },
        { k: "Transit Time Saved", v: "3.2 Days" },
      ],
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: `Parallel Spatial Engine analyzed "${text}". Recommended decision: Activate automated corridor dispatch to optimize energy efficiency and increase throughput by +12.4%.`,
        conf: "98.1% CONFIDENCE INDEX",
        impacts: [
          { k: "Operational Gain", v: "+12.4%" },
          { k: "Cost Overhead", v: "-$420K" },
          { k: "Risk Exposure", v: "1.2% Low" },
        ],
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <section className="section" id="section-copilot">
      <div className="wrap">
        <div className="copilot">
          {/* Header */}
          <div className="copilot-head">
            <div className="av">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3>Executive AI Strategic Copilot</h3>
              <span className="s">Autonomous Neural Supply-Chain Assistant</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat">
            {messages.map((m) => (
              <div key={m.id} className={`msg ${m.sender}`}>
                {m.conf && <div className="conf">{m.conf}</div>}
                <p>{m.text}</p>

                {m.impacts && (
                  <div className="mt-3 border-t border-slate-200/60 dark:border-white/10 pt-2">
                    {m.impacts.map((imp, idx) => (
                      <div key={idx} className="arow">
                        <span className="k">{imp.k}</span>
                        <span className="font-bold text-cyan-600 dark:text-cyan-400">{imp.v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="msg ai">
                <div className="typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="chips">
            <button
              onClick={() => handleSend("What is the impact of shutting down Factory Line 2 for maintenance?")}
              className="chip"
            >
              Analyze Line 2 maintenance downtime →
            </button>
            <button
              onClick={() => handleSend("Simulate 20% increase in battery storage capacity.")}
              className="chip"
            >
              Simulate 20% BESS expansion →
            </button>
            <button
              onClick={() => handleSend("Predict supply risk for next quarter.")}
              className="chip"
            >
              Predict Q4 supply risk →
            </button>
          </div>

          {/* Input Box */}
          <div className="copilot-input">
            <input
              type="text"
              placeholder="Ask Executive AI Copilot anything about your enterprise digital twin…"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button onClick={() => handleSend()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
