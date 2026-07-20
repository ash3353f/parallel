"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, TrendingUp, Shield, Activity } from "lucide-react";

type ActionChip = {
  id: string;
  label: string;
};

type Metric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
};

type AIResponseData = {
  title: string;
  metrics: Metric[];
  confidence: number;
  actions: ActionChip[];
};

type Message = {
  id: string;
  role: "user" | "ai";
  text?: string;
  data?: AIResponseData;
};

// Mock data generator based on input
function getMockResponse(input: string): AIResponseData {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("production")) {
    return {
      title: "Impact Analysis: +20% Production",
      metrics: [
        { label: "Revenue Delta", value: "+$4.2M", delta: "+12.5%", trend: "up" },
        { label: "Factory Throughput", value: "124 units/hr", delta: "+18%", trend: "up" },
        { label: "Energy Cost", value: "$42K/mo", delta: "+8%", trend: "down" }
      ],
      confidence: 92,
      actions: [
        { id: "a1", label: "Approve Schedule Change" },
        { id: "a2", label: "View Factory Layout" }
      ]
    };
  } else if (lowerInput.includes("risk")) {
    return {
      title: "Risk Reduction Analysis",
      metrics: [
        { label: "Overall Risk Score", value: "Low", delta: "-15%", trend: "down" },
        { label: "Supply Chain", value: "Stable", delta: "0%", trend: "neutral" },
        { label: "Equipment Failure", value: "1.2%", delta: "-0.5%", trend: "down" }
      ],
      confidence: 88,
      actions: [
        { id: "b1", label: "Implement Mitigation" },
        { id: "b2", label: "View Risk Matrix" }
      ]
    };
  } else if (lowerInput.includes("logistics")) {
    return {
      title: "Supply Chain Optimization",
      metrics: [
        { label: "Shipping Costs", value: "$12.4K", delta: "-14%", trend: "down" },
        { label: "Delivery Time", value: "2.4 Days", delta: "-12%", trend: "down" },
        { label: "Inventory Levels", value: "Optimal", delta: "+5%", trend: "up" }
      ],
      confidence: 95,
      actions: [
        { id: "c1", label: "Update Routing" },
        { id: "c2", label: "Notify Vendors" }
      ]
    };
  } else if (lowerInput.includes("revenue")) {
    return {
      title: "Quarterly Revenue Forecast",
      metrics: [
        { label: "Q3 Projection", value: "$24.5M", delta: "+8.2%", trend: "up" },
        { label: "Operating Margin", value: "22%", delta: "+1.5%", trend: "up" },
        { label: "Customer Churn", value: "2.1%", delta: "-0.4%", trend: "down" }
      ],
      confidence: 85,
      actions: [
        { id: "d1", label: "View Financials" },
        { id: "d2", label: "Export Report" }
      ]
    };
  } else {
    return {
      title: "Executive Summary",
      metrics: [
        { label: "Platform Health", value: "99.9%", delta: "0%", trend: "neutral" },
        { label: "Active Twins", value: "42", delta: "+3", trend: "up" },
        { label: "System Load", value: "45%", delta: "-5%", trend: "down" }
      ],
      confidence: 90,
      actions: [
        { id: "e1", label: "System Diagnostics" },
        { id: "e2", label: "View KPI Dashboard" }
      ]
    };
  }
}

export function AiCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      role: "user",
      text: "Increase production by 20%"
    },
    {
      id: "msg-2",
      role: "ai",
      data: getMockResponse("production")
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: inputValue
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const newAiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "ai",
        data: getMockResponse(newUserMsg.text || "")
      };
      setMessages((prev) => [...prev, newAiMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleActionClick = (actionLabel: string) => {
    setInputValue(actionLabel);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 mr-3">
          <Bot size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Executive Copilot</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">AI-powered insights</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Sparkles size={14} className="text-white" />
                </div>
              )}
              
              <div className={`max-w-[85%] ${msg.role === "user" ? "" : "w-full max-w-[80%]"}`}>
                {msg.role === "user" ? (
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm">
                    {msg.text}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {msg.data && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            {msg.data.title.includes("Revenue") ? <TrendingUp size={14} className="text-green-500" /> : 
                             msg.data.title.includes("Risk") ? <Shield size={14} className="text-blue-500" /> : 
                             <Activity size={14} className="text-cyan-500" />}
                            {msg.data.title}
                          </h3>
                          <div className="flex items-center gap-1 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-1 rounded-md">
                            <span className="text-[10px] font-medium text-cyan-700 dark:text-cyan-400">
                              {msg.data.confidence}% Conf.
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          {msg.data.metrics.map((metric, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">{metric.value}</span>
                                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                                  metric.trend === 'up' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                  metric.trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                  {metric.delta}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {msg.data?.actions && (
                      <div className="flex flex-wrap gap-2">
                        {msg.data.actions.map(action => (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action.label)}
                            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 w-fit">
                <motion.div
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Copilot for analysis..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-full text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-1.5 rounded-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
