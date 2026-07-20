"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Code, Check, X } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setDownloadedFormat(format);
    setTimeout(() => {
      setDownloadedFormat(null);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-cyan-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Export Digital Twin Data
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
            Select an executive export format for reports, compliance, or integration.
          </p>

          <div className="mt-5 space-y-3">
            {/* Export Executive PDF */}
            <button
              onClick={() => handleExport("PDF")}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-left transition hover:border-cyan-400/50 hover:bg-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Executive Briefing (PDF)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    High-res PDF report with charts, tradeoffs, and AI notes
                  </p>
                </div>
              </div>
              {downloadedFormat === "PDF" ? (
                <Check className="h-5 w-5 text-emerald-500" />
              ) : (
                <Download className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {/* Export JSON Spec */}
            <button
              onClick={() => handleExport("JSON")}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-left transition hover:border-cyan-400/50 hover:bg-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Digital Twin Spec (JSON)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Full node topology, node metrics & React Flow graph state
                  </p>
                </div>
              </div>
              {downloadedFormat === "JSON" ? (
                <Check className="h-5 w-5 text-emerald-500" />
              ) : (
                <Download className="h-4 w-4 text-slate-400" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
