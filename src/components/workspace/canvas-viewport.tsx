"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Edge,
  type OnConnect,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
} from "@xyflow/react";
import { nodeTypes, type CustomNodeType, type DigitalTwinNodeData } from "./custom-nodes";
import {
  Maximize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const initialNodes: CustomNodeType[] = [
  {
    id: "hq",
    type: "hq",
    position: { x: 380, y: 40 },
    data: {
      label: "Executive HQ",
      type: "Command Node",
      nodeType: "hq",
      health: 99,
      capacity: 95,
      utilization: 88,
      risk: 3,
      status: "Operational",
      accentColor: "#22d3ee",
    },
  },
  {
    id: "power",
    type: "power",
    position: { x: 60, y: 180 },
    data: {
      label: "Clean Energy Grid",
      type: "Power Node",
      nodeType: "power",
      health: 98,
      capacity: 100,
      utilization: 74,
      risk: 2,
      status: "Operational",
      accentColor: "#10b981",
    },
  },
  {
    id: "factory",
    type: "factory",
    position: { x: 380, y: 180 },
    data: {
      label: "Apex GigaFactory",
      type: "Manufacturing Node",
      nodeType: "factory",
      health: 92,
      capacity: 88,
      utilization: 94,
      risk: 14,
      status: "Warning",
      accentColor: "#f97316",
    },
  },
  {
    id: "supplier",
    type: "supplier",
    position: { x: 60, y: 340 },
    data: {
      label: "Tier-1 Raw Supplier",
      type: "Supplier Node",
      nodeType: "supplier",
      health: 91,
      capacity: 80,
      utilization: 85,
      risk: 12,
      status: "Operational",
      accentColor: "#eab308",
    },
  },
  {
    id: "warehouse",
    type: "warehouse",
    position: { x: 380, y: 340 },
    data: {
      label: "Central Logistics Hub",
      type: "Storage Node",
      nodeType: "warehouse",
      health: 96,
      capacity: 82,
      utilization: 84,
      risk: 5,
      status: "Operational",
      accentColor: "#3b82f6",
    },
  },
  {
    id: "logistics",
    type: "logistics",
    position: { x: 60, y: 500 },
    data: {
      label: "Intermodal Transport",
      type: "Transit Node",
      nodeType: "logistics",
      health: 94,
      capacity: 88,
      utilization: 86,
      risk: 7,
      status: "Operational",
      accentColor: "#8b5cf6",
    },
  },
  {
    id: "distribution",
    type: "distribution",
    position: { x: 380, y: 500 },
    data: {
      label: "Global Freight Dispatch",
      type: "Distribution Node",
      nodeType: "distribution",
      health: 93,
      capacity: 90,
      utilization: 89,
      risk: 8,
      status: "Optimizing",
      accentColor: "#c084fc",
    },
  },
  {
    id: "retail",
    type: "retail",
    position: { x: 380, y: 660 },
    data: {
      label: "Omnichannel Stores",
      type: "Retail Outlet Node",
      nodeType: "retail",
      health: 97,
      capacity: 92,
      utilization: 91,
      risk: 4,
      status: "Operational",
      accentColor: "#ec4899",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-hq-factory",
    source: "hq",
    target: "factory",
    animated: true,
    style: { stroke: "#38bdf8", strokeWidth: 3 },
  },
  {
    id: "e-power-factory",
    source: "power",
    target: "factory",
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
  },
  {
    id: "e-factory-warehouse",
    source: "factory",
    target: "warehouse",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 3 },
  },
  {
    id: "e-supplier-warehouse",
    source: "supplier",
    target: "warehouse",
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: { stroke: "#eab308", strokeWidth: 2.5 },
  },
  {
    id: "e-warehouse-distribution",
    source: "warehouse",
    target: "distribution",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 3 },
  },
  {
    id: "e-logistics-distribution",
    source: "logistics",
    target: "distribution",
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2.5 },
  },
  {
    id: "e-distribution-retail",
    source: "distribution",
    target: "retail",
    animated: true,
    style: { stroke: "#c084fc", strokeWidth: 3 },
  },
];

interface CanvasViewportProps {
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
}

function CanvasInner({ onSelectNode }: CanvasViewportProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="relative h-full w-full bg-slate-950">
      {/* Custom Floating Canvas Controls Bar */}
      <div className="absolute left-6 top-6 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/90 p-1.5 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => zoomIn()}
          className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => zoomOut()}
          className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <div className="h-4 w-px bg-white/10" />
        <button
          onClick={() => fitView({ padding: 0.2, duration: 600 })}
          className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          title="Fit View"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => fitView({ duration: 600 })}
          className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* React Flow Core Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => onSelectNode(node.id)}
        onPaneClick={() => onSelectNode(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        colorMode="dark"
        className="h-full w-full"
      >
        <Background variant={BackgroundVariant.Dots} gap={28} size={1.5} color="rgba(255,255,255,0.15)" />
        <Controls showInteractive={false} className="!bottom-6 !left-6 !border-white/10 !bg-slate-900/90 !text-white" />
        <MiniMap
          nodeColor={(n) => {
            const data = n.data as DigitalTwinNodeData;
            return data?.accentColor || "#38bdf8";
          }}
          maskColor="rgba(0,0,0,0.6)"
          className="!bottom-6 !right-6 !rounded-2xl !border !border-white/10 !bg-slate-900/90"
        />
      </ReactFlow>
    </div>
  );
}

export function CanvasViewport(props: CanvasViewportProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  );
}
