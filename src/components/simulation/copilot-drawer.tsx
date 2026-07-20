"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, Trash2, X } from "lucide-react";

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  structuredExplanation?: {
    whatHappened: string;
    whyItHappened: string;
    businessImpact: string;
    recommendedActions: string[];
    estimatedSavings: string;
    riskLevel: string;
    confidence: number;
  };
}

const suggestedPrompts = [
  "Optimize factory throughput",
  "Reduce logistics cost",
  "Predict Q4 demand",
  "Lower emissions",
  "Improve inventory density",
];

const recommendationCards = [
  {
    id: "r1",
    title: "Shift 15% Factory Output to Assembly Cell B",
    priority: "High",
    estimatedROI: "280%",
    timeToImplement: "2 Days",
    risk: "Low",
    impact: "+$2.4M Revenue",
  },
  {
    id: "r2",
    title: "Defer Regional Warehouse Expansion to Q4",
    priority: "Medium",
    estimatedROI: "150%",
    timeToImplement: "1 Week",
    risk: "Very Low",
    impact: "Saves $4.2M CapEx",
  },
];

export function CopilotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Hello Executive. I am your Parallel AI Copilot. Ask me to simulate operational trade-offs, predict quarter revenue, or optimize logistics flow.",
      timestamp: "Just now",
    },
    {
      id: "m-2",
      sender: "ai",
      text: "Post-Simulation Executive Breakdown:",
      timestamp: "Just now",
      structuredExplanation: {
        whatHappened: "Factory output increased by 15% while reducing transatlantic transport delays by 22%.",
        whyItHappened: "Automated route balancing bypassed regional transit bottlenecks and optimized battery grid usage.",
        businessImpact: "+$3.4M projected quarterly revenue increase and $1.5M profit expansion.",
        recommendedActions: [
          "Activate weekend shift on Assembly Cell #3",
          "Reroute 15% freight via Transport Node B",
        ],
        estimatedSavings: "$1.8M / year",
        riskLevel: "Low (6%)",
        confidence: 96,
      },
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${crypto.randomUUID()}`,
      sender: "user",
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: `a-${crypto.randomUUID()}`,
        sender: "ai",
        text: `Analysis complete for "${query}". Projected ROI is 240% with high confidence across all active Digital Twin nodes.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        structuredExplanation: {
          whatHappened: `Simulated trade-off for "${query}". Operational bottlenecks were cleared across active facilities.`,
          whyItHappened: "Dynamic load re-balancing shifted secondary cell throughput to meet high-demand windows.",
          businessImpact: "+$2.8M operational efficiency gain and -18% risk exposure.",
          recommendedActions: [
            "Apply AI schedule optimization to workforce",
            "Maintain solar battery storage at 90% peak capacity",
          ],
          estimatedSavings: "$1.2M annually",
          riskLevel: "Very Low",
          confidence: 94,
        },
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl"
      >
        <Sparkles className="h-4 w-4" />
        <span>Executive AI Copilot</span>
      </motion.button>

      {/* Slide-in Copilot Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 340 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 340 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 p-4 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Executive Copilot
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Live AI Trade-off & Decision Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([])}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-white/10"
                  title="Clear Chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-5 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-cyan-500 font-medium text-slate-950"
                        : "border border-slate-200/80 bg-slate-100/90 text-slate-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Structured Post-Simulation Explanation */}
                    {msg.structuredExplanation && (
                      <div className="mt-3.5 space-y-2.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-3 text-[11px] text-slate-800 dark:text-slate-200">
                        <div>
                          <strong className="text-cyan-700 dark:text-cyan-300">What Happened:</strong>
                          <p className="mt-0.5">{msg.structuredExplanation.whatHappened}</p>
                        </div>
                        <div>
                          <strong className="text-purple-700 dark:text-purple-300">Why It Happened:</strong>
                          <p className="mt-0.5">{msg.structuredExplanation.whyItHappened}</p>
                        </div>
                        <div>
                          <strong className="text-emerald-700 dark:text-emerald-300">Business Impact:</strong>
                          <p className="mt-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                            {msg.structuredExplanation.businessImpact}
                          </p>
                        </div>

                        <div className="pt-1">
                          <strong className="text-slate-900 dark:text-white">Recommended Actions:</strong>
                          <ul className="mt-1 list-disc pl-4 space-y-0.5">
                            {msg.structuredExplanation.recommendedActions.map((act, i) => (
                              <li key={i}>{act}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-cyan-400/20 pt-2 text-[10px] font-semibold">
                          <span>Est. Savings: <strong className="text-cyan-600 dark:text-cyan-300">{msg.structuredExplanation.estimatedSavings}</strong></span>
                          <span>Confidence: <strong className="text-emerald-600 dark:text-emerald-400">{msg.structuredExplanation.confidence}%</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="mt-1 text-[10px] text-slate-400 font-mono px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-3 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">Parallel AI is modeling trade-offs...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Recommendation Cards Carousel */}
            <div className="border-t border-slate-200/80 p-3 dark:border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Executive Action Cards
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {recommendationCards.map((rc) => (
                  <div
                    key={rc.id}
                    className="min-w-[220px] rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 text-[11px] shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-bold text-cyan-700 dark:text-cyan-300">
                        {rc.priority} Priority
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">ROI {rc.estimatedROI}</span>
                    </div>
                    <p className="mt-1.5 font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {rc.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Prompts & Input Bar */}
            <div className="border-t border-slate-200/80 p-3 space-y-2 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700 transition hover:bg-cyan-500 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-white/10 dark:bg-slate-950">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Parallel AI..."
                  className="flex-1 bg-transparent px-2 text-xs text-slate-900 outline-none dark:text-white placeholder:text-slate-500"
                />
                <button
                  onClick={() => handleSend()}
                  className="rounded-xl bg-cyan-500 p-2 text-slate-950 transition hover:bg-cyan-400"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
