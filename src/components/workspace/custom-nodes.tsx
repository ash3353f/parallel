"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import {
  Building2,
  Factory,
  Warehouse,
  Truck,
  Zap,
  ShoppingBag,
  Boxes,
  Layers,
} from "lucide-react";

export interface DigitalTwinNodeData extends Record<string, unknown> {
  label: string;
  type: string;
  nodeType: "hq" | "factory" | "warehouse" | "distribution" | "supplier" | "power" | "retail" | "logistics";
  health: number;
  capacity: number;
  utilization: number;
  risk: number;
  status: "Operational" | "Warning" | "Critical" | "Optimizing";
  accentColor: string;
}

export type CustomNodeType = Node<DigitalTwinNodeData>;

const iconMap = {
  hq: Layers,
  factory: Factory,
  warehouse: Warehouse,
  distribution: Truck,
  supplier: Boxes,
  power: Zap,
  retail: ShoppingBag,
  logistics: Building2,
};

function CustomNodeComponent({ data, selected }: NodeProps<CustomNodeType>) {
  const Icon = iconMap[data.nodeType] || Building2;

  const statusColor =
    data.status === "Operational"
      ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
      : data.status === "Warning"
        ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
        : data.status === "Critical"
          ? "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"
          : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]";

  return (
    <div
      className={`relative min-w-[210px] rounded-2xl border p-4 shadow-xl backdrop-blur-xl transition-all duration-300 ${
        selected
          ? "border-cyan-400 bg-slate-900/95 ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.35)] dark:bg-slate-900/95"
          : "border-slate-200/80 bg-white/90 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/90 dark:hover:border-white/30"
      }`}
    >
      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!h-3 !w-3 !bg-cyan-400 !border-2 !border-slate-900" />
      <Handle type="source" position={Position.Bottom} className="!h-3 !w-3 !bg-purple-400 !border-2 !border-slate-900" />
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !bg-blue-400 !border-2 !border-slate-900" id="left" />
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !bg-emerald-400 !border-2 !border-slate-900" id="right" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white shadow-md"
          style={{ backgroundColor: `${data.accentColor}25`, color: data.accentColor }}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${statusColor}`} />
            <h4 className="truncate text-xs font-bold text-slate-900 dark:text-white">
              {data.label}
            </h4>
          </div>
          <p className="truncate text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">
            {data.type}
          </p>
        </div>
      </div>

      {/* Metrics Mini Grid */}
      <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px] font-medium border-t border-slate-200/80 pt-2.5 dark:border-white/10">
        <div>
          <span className="text-slate-500 dark:text-slate-400">Health:</span>
          <span className="ml-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {data.health}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400">Cap:</span>
          <span className="ml-1 font-mono font-bold text-cyan-600 dark:text-cyan-400">
            {data.capacity}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400">Util:</span>
          <span className="ml-1 font-mono font-bold text-purple-600 dark:text-purple-400">
            {data.utilization}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400">Risk:</span>
          <span className="ml-1 font-mono font-bold text-amber-600 dark:text-amber-400">
            {data.risk}%
          </span>
        </div>
      </div>
    </div>
  );
}

export const CustomNode = memo(CustomNodeComponent);

export const nodeTypes = {
  hq: CustomNode,
  factory: CustomNode,
  warehouse: CustomNode,
  distribution: CustomNode,
  supplier: CustomNode,
  power: CustomNode,
  retail: CustomNode,
  logistics: CustomNode,
};
