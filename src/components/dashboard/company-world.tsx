"use client";

import React, { useRef, useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import {
  Anchor,
  ArrowLeft,
  Bookmark,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  Plane,
  Play,
  Radio,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Truck,
  User,
  Volume2,
  VolumeX,
  Warehouse,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

// ==========================================
// 1. TYPES & DATA DEFINITIONS
// ==========================================

export type BuildingId =
  | "hq"
  | "factory"
  | "warehouse"
  | "port"
  | "airport"
  | "solar"
  | "wind"
  | "distribution"
  | "power";

export type ViewLevel = "global" | "building" | "floor" | "machine" | "maintenance";

export interface EmployeeData {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  currentTask: string;
  efficiency: number;
}

export interface MachineData {
  id: string;
  name: string;
  type: string;
  health: number; // 0 - 100
  temperature: number; // °C
  powerDraw: number; // kW
  vibration: number; // g
  maintenanceDueDays: number;
  failureProbability: number; // %
  aiRecommendation: string;
}

export interface FloorData {
  floorNumber: number;
  floorName: string;
  deptName: string;
  healthState: "healthy" | "warning" | "critical";
  healthScore: number;
  metrics: { label: string; value: string }[];
  employees: EmployeeData[];
  machines: MachineData[];
  aiAgentsCount: number;
  maintenanceStatus: string;
}

export interface Building3DDef {
  id: BuildingId;
  name: string;
  type: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roofColor: string;
  windowColor: string;
  accentColor: string;
  icon: typeof Building2;
  healthState: "healthy" | "warning" | "critical";
  healthScore: number;
  floors: FloorData[];
}

const BUILDINGS_DATA: Record<BuildingId, Building3DDef> = {
  hq: {
    id: "hq",
    name: "Executive HQ",
    type: "Global Command Center",
    position: [-4, 0, -2],
    size: [2.2, 5.0, 2.2],
    color: "#eef1f5",
    roofColor: "#cbd5e1",
    windowColor: "#3aa0ff",
    accentColor: "#22d3ee",
    icon: Building2,
    healthState: "healthy",
    healthScore: 99,
    floors: [
      {
        floorNumber: 3,
        floorName: "Executive Suite & C-Level Operations",
        deptName: "Executive Strategy & Governance",
        healthState: "healthy",
        healthScore: 99,
        metrics: [
          { label: "Quarterly Revenue", value: "$52.4M Projected" },
          { label: "Strategy Latency", value: "14ms Sync Time" },
          { label: "Governance Score", value: "98.4% Optimal" },
        ],
        employees: [
          { id: "e1", name: "Sarah Chen", role: "Chief Executive Officer", dept: "Executive", status: "Reviewing AI Scenarios", currentTask: "Q4 Scenario Trade-Off Approval", efficiency: 99 },
          { id: "e2", name: "David Kim", role: "AI Operations Director", dept: "Command Ops", status: "Twin Model Validation", currentTask: "99.8% Digital Twin Sync Verification", efficiency: 97 },
        ],
        machines: [
          { id: "m1", name: "Executive AI Decision Engine", type: "Quantum Compute Rack", health: 99, temperature: 34, powerDraw: 120, vibration: 0.01, maintenanceDueDays: 45, failureProbability: 0.1, aiRecommendation: "Quantum compute cluster operating at optimal 99.9% uptime." },
        ],
        aiAgentsCount: 5,
        maintenanceStatus: "All Core Systems Nominal",
      },
      {
        floorNumber: 2,
        floorName: "AI Command Center & Data Mesh",
        deptName: "Digital Twin Engineering",
        healthState: "healthy",
        healthScore: 98,
        metrics: [
          { label: "Model Latency", value: "4ms Real-Time" },
          { label: "Data Throughput", value: "1.4 TB/sec" },
          { label: "Agent Precision", value: "99.9%" },
        ],
        employees: [
          { id: "e3", name: "Elena Rostova", role: "VP Supply Chain Architecture", dept: "Operations", status: "In Executive Briefing", currentTask: "Transatlantic freight route alignment", efficiency: 96 },
        ],
        machines: [
          { id: "m2", name: "Real-Time Telemetry Gateway", type: "High-Speed Switch Array", health: 98, temperature: 41, powerDraw: 85, vibration: 0.02, maintenanceDueDays: 30, failureProbability: 0.2, aiRecommendation: "Packet buffer headroom optimal." },
        ],
        aiAgentsCount: 8,
        maintenanceStatus: "Data Mesh Server Cluster Healthy",
      },
    ],
  },
  factory: {
    id: "factory",
    name: "Apex GigaFactory",
    type: "Automated Manufacturing Plant",
    position: [4, 0, -3],
    size: [2.8, 3.8, 2.8],
    color: "#fff3e0",
    roofColor: "#ffe0b2",
    windowColor: "#ff9800",
    accentColor: "#f97316",
    icon: Factory,
    healthState: "warning",
    healthScore: 88,
    floors: [
      {
        floorNumber: 2,
        floorName: "Heavy Assembly & GigaPress Cell #3",
        deptName: "Robotic Welding & Heavy Staging",
        healthState: "warning",
        healthScore: 82,
        metrics: [
          { label: "Production Rate", value: "4,200 Units/Day" },
          { label: "Thermal Load", value: "68°C (Peak Warning)" },
          { label: "Power Draw", value: "890 MW" },
        ],
        employees: [
          { id: "e8", name: "Marcus Vance", role: "Lead Production Engineer", dept: "Robotics", status: "Monitoring GigaPress #4", currentTask: "Thermal dissipation check on GigaPress #4", efficiency: 93 },
          { id: "e9", name: "Hiroshi Tanaka", role: "Robotics Technician", dept: "Assembly", status: "Replacing Welding Tip", currentTask: "Cell #3 welding arm tip swap", efficiency: 92 },
        ],
        machines: [
          { id: "m3", name: "GigaPress Assembly Cell #3", type: "High-Pressure Die Casting", health: 82, temperature: 68, powerDraw: 420, vibration: 0.24, maintenanceDueDays: 4, failureProbability: 2.8, aiRecommendation: "Thermal peak detected. Shift 8% throughput to secondary cell to avoid premature seal wear." },
          { id: "m4", name: "Robotic Welding Arm #4", type: "6-Axis Precision Welder", health: 91, temperature: 52, powerDraw: 180, vibration: 0.08, maintenanceDueDays: 14, failureProbability: 1.1, aiRecommendation: "Welding tip wear normal. Scheduled replacement in 14 days." },
        ],
        aiAgentsCount: 14,
        maintenanceStatus: "Assembly Cell #3 Maintenance Due in 4 Days",
      },
      {
        floorNumber: 1,
        floorName: "Conveyor Lines & Raw Material Staging",
        deptName: "Material Supply & Inbound Freight",
        healthState: "healthy",
        healthScore: 94,
        metrics: [
          { label: "Conveyor Velocity", value: "4.2 m/s" },
          { label: "Raw Stock Level", value: "94% Buffer" },
          { label: "Staging Throughput", value: "1,200 Tons/day" },
        ],
        employees: [
          { id: "e10", name: "Carlos Gomez", role: "Material Staging Lead", dept: "Inbound Supply", status: "Inspecting Pallets", currentTask: "Raw aluminum coil intake check", efficiency: 95 },
        ],
        machines: [
          { id: "m5", name: "High-Speed Conveyor Belt A-1", type: "Automated Roller Conveyor", health: 96, temperature: 38, powerDraw: 110, vibration: 0.04, maintenanceDueDays: 28, failureProbability: 0.4, aiRecommendation: "Roller lubrication optimal." },
        ],
        aiAgentsCount: 8,
        maintenanceStatus: "Conveyor Belt Tension Normal",
      },
    ],
  },
  warehouse: {
    id: "warehouse",
    name: "Central Automated Logistics",
    type: "High-Bay AGV Storage",
    position: [0, 0, 0],
    size: [3.0, 3.0, 3.0],
    color: "#e3f2fd",
    roofColor: "#bbdefb",
    windowColor: "#2196f3",
    accentColor: "#3b82f6",
    icon: Warehouse,
    healthState: "healthy",
    healthScore: 97,
    floors: [
      {
        floorNumber: 2,
        floorName: "High-Bay AGV Racks & Automated Stacking",
        deptName: "AGV Fleet & High-Density Storage",
        healthState: "healthy",
        healthScore: 98,
        metrics: [
          { label: "SKUs Managed", value: "128,000 SKUs" },
          { label: "Sorting Precision", value: "99.1%" },
          { label: "AGV Fleet Health", value: "98.4% Active" },
        ],
        employees: [
          { id: "e11", name: "Devon Reed", role: "Warehouse Automation Manager", dept: "Logistics Ops", status: "AGV Dispatch Oversight", currentTask: "Optimizing high-bay rack dispatch paths", efficiency: 97 },
        ],
        machines: [
          { id: "m6", name: "AGV Stacker Robot Fleet #22", type: "Autonomous Stacker AGV", health: 98, temperature: 36, powerDraw: 45, vibration: 0.02, maintenanceDueDays: 35, failureProbability: 0.3, aiRecommendation: "AGV battery swap cycle scheduled in 3 hours." },
        ],
        aiAgentsCount: 12,
        maintenanceStatus: "AGV Fleet Serviced 2 Hours Ago",
      },
    ],
  },
  port: {
    id: "port",
    name: "Deepwater Cargo Port",
    type: "Maritime Container Terminal",
    position: [-5, 0, 3],
    size: [2.4, 3.2, 2.4],
    color: "#e0f7fa",
    roofColor: "#b2edd4",
    windowColor: "#00bcd4",
    accentColor: "#0284c7",
    icon: Anchor,
    healthState: "healthy",
    healthScore: 96,
    floors: [
      {
        floorNumber: 2,
        floorName: "Port Control & Crane Command Tower",
        deptName: "Maritime Dispatch & Gantry Scheduling",
        healthState: "healthy",
        healthScore: 97,
        metrics: [
          { label: "Cargo Ships Serviced", value: "18 Vessels / Wk" },
          { label: "Gantry Lift Speed", value: "45 Lifts / hr" },
          { label: "Turnaround Time", value: "24m Avg" },
        ],
        employees: [
          { id: "e14", name: "Captain Luis Mendez", role: "Harbor Operations Master", dept: "Maritime", status: "Berth Management", currentTask: "Docking berth assignment for Cargo Ship Alpha-7", efficiency: 96 },
        ],
        machines: [
          { id: "m7", name: "Automated Gantry Crane #2", type: "Post-Panamax Container Crane", health: 96, temperature: 44, powerDraw: 310, vibration: 0.06, maintenanceDueDays: 20, failureProbability: 0.5, aiRecommendation: "Gantry winch cable tension verified nominal." },
        ],
        aiAgentsCount: 9,
        maintenanceStatus: "Gantry Crane #2 Inspection Complete",
      },
    ],
  },
  airport: {
    id: "airport",
    name: "Global Cargo Air Hub",
    type: "International Freight Runway",
    position: [5, 0, 3],
    size: [2.6, 2.8, 3.5],
    color: "#e1f5fe",
    roofColor: "#b3e5fc",
    windowColor: "#0288d1",
    accentColor: "#38bdf8",
    icon: Plane,
    healthState: "healthy",
    healthScore: 98,
    floors: [
      {
        floorNumber: 2,
        floorName: "Air Traffic Control Tower",
        deptName: "Aviation Dispatch & Flight Radar",
        healthState: "healthy",
        healthScore: 99,
        metrics: [
          { label: "Daily Air Freight", value: "340 Tons / Day" },
          { label: "On-Time Flights", value: "99.8%" },
        ],
        employees: [
          { id: "e17", name: "Kaitlyn Ross", role: "Air Freight Chief Controller", dept: "Aviation Ops", status: "Dispatching Flight C-809", currentTask: "High-priority pharmaceutical cargo flight clearance", efficiency: 99 },
        ],
        machines: [
          { id: "m8", name: "Primary Radar Transceiver", type: "Phased Array Avionics Radar", health: 99, temperature: 32, powerDraw: 90, vibration: 0.01, maintenanceDueDays: 60, failureProbability: 0.1, aiRecommendation: "Radar signal beamforming at 100% gain." },
        ],
        aiAgentsCount: 7,
        maintenanceStatus: "Avionics Radar Array Calibrated",
      },
    ],
  },
  solar: {
    id: "solar",
    name: "Solar Array B-4",
    type: "Photovoltaic Solar Farm",
    position: [-2, 0, 5],
    size: [2.4, 2.0, 2.4],
    color: "#fffde7",
    roofColor: "#fff9c4",
    windowColor: "#fbc02d",
    accentColor: "#eab308",
    icon: Sun,
    healthState: "healthy",
    healthScore: 98,
    floors: [
      {
        floorNumber: 1,
        floorName: "Sun-Tracking Inverter Control Substation",
        deptName: "Photovoltaic Inverter & Battery Storage",
        healthState: "healthy",
        healthScore: 98,
        metrics: [
          { label: "Power Generation", value: "480 MW Peak" },
          { label: "Inverter Efficiency", value: "98.7%" },
        ],
        employees: [
          { id: "e19", name: "Chen Wei", role: "Solar Array Specialist", dept: "Renewables", status: "Calibrating Actuators", currentTask: "Sun-tracking motor pitch adjustment", efficiency: 98 },
        ],
        machines: [
          { id: "m9", name: "PV Central Inverter Array", type: "3-Phase Power Inverter", health: 98, temperature: 42, powerDraw: 480, vibration: 0.02, maintenanceDueDays: 40, failureProbability: 0.2, aiRecommendation: "Solar harvest efficiency peak." },
        ],
        aiAgentsCount: 4,
        maintenanceStatus: "Panel Auto-Cleaning Cycle Complete",
      },
    ],
  },
  wind: {
    id: "wind",
    name: "Offshore Wind Farm",
    type: "Renewable Wind Turbines",
    position: [-6, 0, -4],
    size: [2.2, 4.2, 2.2],
    color: "#e0f7fa",
    roofColor: "#b2ebf2",
    windowColor: "#00acc1",
    accentColor: "#06b6d4",
    icon: Wind,
    healthState: "healthy",
    healthScore: 98,
    floors: [
      {
        floorNumber: 1,
        floorName: "Turbine Pitch & Yaw Telemetry",
        deptName: "Offshore Wind Power Control",
        healthState: "healthy",
        healthScore: 98,
        metrics: [
          { label: "Offshore Power", value: "620 MW Baseline" },
          { label: "Wind Speed", value: "28 knots" },
        ],
        employees: [
          { id: "e21", name: "Lars Lindqvist", role: "Wind Field Lead", dept: "Offshore Energy", status: "Remote Yaw Tuning", currentTask: "Turbine #12 pitch alignment", efficiency: 97 },
        ],
        machines: [
          { id: "m10", name: "Offshore Wind Turbine #12", type: "12 MW Direct-Drive Turbine", health: 98, temperature: 35, powerDraw: 620, vibration: 0.05, maintenanceDueDays: 50, failureProbability: 0.3, aiRecommendation: "Rotor yaw angle perfectly aligned with wind vector." },
        ],
        aiAgentsCount: 5,
        maintenanceStatus: "Rotor Blade Inspection Clear",
      },
    ],
  },
  distribution: {
    id: "distribution",
    name: "Global Transport Hub",
    type: "Express Freight Dispatch",
    position: [4, 0, 4],
    size: [2.4, 3.0, 2.4],
    color: "#f3e5f5",
    roofColor: "#e1bee7",
    windowColor: "#ab47bc",
    accentColor: "#a855f7",
    icon: Truck,
    healthState: "healthy",
    healthScore: 94,
    floors: [
      {
        floorNumber: 1,
        floorName: "EV Dispatch & Route Control",
        deptName: "Fleet Telematics & Route AI",
        healthState: "healthy",
        healthScore: 95,
        metrics: [
          { label: "Dispatched Trucks", value: "2,400 Active" },
          { label: "EV Fleet Charging", value: "100% Online" },
        ],
        employees: [
          { id: "e23", name: "Sofia Rossi", role: "Fleet Route Strategist", dept: "Logistics Ops", status: "AI Route Optimization", currentTask: "Rerouting 40 trucks around highway maintenance", efficiency: 96 },
        ],
        machines: [
          { id: "m11", name: "Fleet Route Optimizer AI", type: "Edge GPS Telematics Processor", health: 96, temperature: 37, powerDraw: 65, vibration: 0.01, maintenanceDueDays: 90, failureProbability: 0.1, aiRecommendation: "Route optimization saving $140k/week." },
        ],
        aiAgentsCount: 11,
        maintenanceStatus: "GPS Telematics Link Online",
      },
    ],
  },
  power: {
    id: "power",
    name: "Clean Energy Power Grid",
    type: "Power Generation Mainstation",
    position: [-4, 0, -6],
    size: [2.2, 3.5, 2.2],
    color: "#e8f5e9",
    roofColor: "#c8e6c9",
    windowColor: "#4caf50",
    accentColor: "#10b981",
    icon: Zap,
    healthState: "healthy",
    healthScore: 99,
    floors: [
      {
        floorNumber: 1,
        floorName: "Master Grid Load Balancing Operations",
        deptName: "High-Voltage Microgrid Dispatch",
        healthState: "healthy",
        healthScore: 99,
        metrics: [
          { label: "Clean Power Output", value: "1.25 GW Capacity" },
          { label: "Grid Uptime", value: "99.99%" },
        ],
        employees: [
          { id: "e25", name: "Elena Rostova", role: "Chief Energy Architect", dept: "Renewables", status: "Grid Load Balancing", currentTask: "Discharging battery array B-4 to balance factory load", efficiency: 99 },
        ],
        machines: [
          { id: "m12", name: "Master High-Voltage Transformer B", type: "Oil-Immersed Step-Down Transformer", health: 99, temperature: 48, powerDraw: 1250, vibration: 0.03, maintenanceDueDays: 120, failureProbability: 0.05, aiRecommendation: "Transformer oil temperature normal." },
        ],
        aiAgentsCount: 10,
        maintenanceStatus: "Master Grid Switchgear Nominal",
      },
    ],
  },
};

// ==========================================
// 2. LOW-POLY R3F 3D DIORAMA COMPONENTS
// ==========================================

// Low-poly Building Mesh Component
function Building3D({
  def,
  isSelected,
  onSelect,
}: {
  def: Building3DDef;
  isSelected: boolean;
  onSelect: (def: Building3DDef, worldPos: THREE.Vector3) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [w, h, d] = def.size;

  return (
    <group position={def.position}>
      {/* Building Base Body */}
      <mesh
        ref={meshRef}
        position={[0, h / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          const worldPos = new THREE.Vector3();
          meshRef.current?.getWorldPosition(worldPos);
          onSelect(def, worldPos);
        }}
      >
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={hovered || isSelected ? def.accentColor : def.color}
          flatShading
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Flat Window Strips */}
      {Array.from({ length: Math.floor(h) }).map((_, row) => (
        <mesh key={row} position={[0, 0.6 + row * 0.9, d / 2 + 0.02]}>
          <planeGeometry args={[w * 0.72, 0.38]} />
          <meshBasicMaterial color={def.windowColor} />
        </mesh>
      ))}

      {/* Roof Cap */}
      <mesh position={[0, h + 0.06, 0]}>
        <boxGeometry args={[w * 1.04, 0.12, d * 1.04]} />
        <meshStandardMaterial color={def.roofColor} flatShading />
      </mesh>

      {/* Factory Animated Chimneys & Smoke Puffs */}
      {def.id === "factory" && (
        <group position={[0.6, h + 0.5, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.25, 0.9, 8]} />
            <meshStandardMaterial color="#64748b" flatShading />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial color="#f1f5f9" opacity={0.6} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Low-poly Tree Component
function Tree3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 6]} />
        <meshStandardMaterial color="#8a5a34" flatShading />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <icosahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color="#4fbf6a" flatShading />
      </mesh>
    </group>
  );
}

// Low-poly Spinning Wind Turbine
function WindTurbine3D({ position }: { position: [number, number, number] }) {
  const bladesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z += delta * 2.8;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.14, 3.0, 8]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
      <mesh position={[0, 3.0, 0.1]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#06b6d4" flatShading />
      </mesh>
      <group ref={bladesRef} position={[0, 3.0, 0.2]}>
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
          <mesh key={idx} rotation={[0, 0, angle]} position={[0, 0.6, 0]}>
            <boxGeometry args={[0.08, 1.2, 0.02]} />
            <meshStandardMaterial color="#ffffff" flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Low-poly Solar Panel Array
function SolarPanel3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.6]} />
        <meshStandardMaterial color="#1e3a8a" flatShading />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 6]} />
        <meshStandardMaterial color="#64748b" flatShading />
      </mesh>
    </group>
  );
}

// Animated Moving Vehicle
function Vehicle3D({
  path,
  color = "#ff5a5a",
  speed = 0.15,
}: {
  path: THREE.Vector3[];
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(path, true), [path]);

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1;
    const point = curve.getPointAt(t.current);
    const tangent = curve.getTangentAt(t.current);
    if (ref.current) {
      ref.current.position.copy(point);
      ref.current.position.y = 0.18;
      ref.current.lookAt(point.clone().add(tangent));
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.4, 0.22, 0.2]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.22, 0.14, 0.18]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
    </group>
  );
}

// Cargo Ship
function CargoShip3D({
  path,
  speed = 0.08,
}: {
  path: THREE.Vector3[];
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(path, true), [path]);

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1;
    const point = curve.getPointAt(t.current);
    const tangent = curve.getTangentAt(t.current);
    if (ref.current) {
      ref.current.position.copy(point);
      ref.current.position.y = 0.08;
      ref.current.lookAt(point.clone().add(tangent));
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.2, 0.35, 0.5]} />
        <meshStandardMaterial color="#0284c7" flatShading />
      </mesh>
      <mesh position={[-0.1, 0.3, 0]}>
        <boxGeometry args={[0.7, 0.28, 0.4]} />
        <meshStandardMaterial color="#f97316" flatShading />
      </mesh>
    </group>
  );
}

// Ground Platform Base
function GroundPlatform3D() {
  return (
    <group>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[10.5, 10.5, 0.6, 64]} />
        <meshStandardMaterial color="#e7e9ec" flatShading />
      </mesh>
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[10.58, 10.58, 0.18, 64]} />
        <meshStandardMaterial color="#f2c14e" flatShading />
      </mesh>
      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 2.4]} />
        <meshStandardMaterial color="#c9cdd3" flatShading />
      </mesh>
      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 18]} />
        <meshStandardMaterial color="#c9cdd3" flatShading />
      </mesh>
      <mesh position={[-7.2, -0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 4.5]} />
        <meshStandardMaterial color="#38bdf8" opacity={0.9} transparent />
      </mesh>
      <mesh position={[5.2, 0, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 4.5]} />
        <meshStandardMaterial color="#7ed08a" flatShading />
      </mesh>
    </group>
  );
}

// Camera Rig Smooth Lerp
function CameraRig3D({ target }: { target: THREE.Vector3 | null }) {
  const { camera } = useThree();
  const startPos = useRef(new THREE.Vector3());
  const progress = useRef(0);
  const active = useRef(false);
  const goalPos = useRef(new THREE.Vector3());
  const prevTargetRef = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (target) {
      active.current = true;
      progress.current = 0;
      startPos.current.copy(camera.position);
      goalPos.current.copy(target).add(new THREE.Vector3(1.6, 1.4, 1.6));
    } else if (prevTargetRef.current !== null) {
      active.current = true;
      progress.current = 0;
      startPos.current.copy(camera.position);
      goalPos.current.set(10, 8, 10);
    }
    prevTargetRef.current = target;
  }, [target, camera]);

  useFrame((_, delta) => {
    if (!active.current) return;
    progress.current = Math.min(1, progress.current + delta * 1.2);
    const eased = 1 - Math.pow(1 - progress.current, 3);
    camera.position.lerpVectors(startPos.current, goalPos.current, eased);
    if (target) {
      camera.lookAt(target);
    } else {
      camera.lookAt(0, 0, 0);
    }
    if (progress.current >= 1) active.current = false;
  });

  return null;
}

// ==========================================
// 3. MAIN CONTAINER & MULTI-LEVEL DRILL DOWN
// ==========================================

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

export function CompanyWorld({
  onEnterBuilding,
}: {
  onEnterBuilding?: (buildingId: string, buildingName: string) => void;
}) {
  const isMounted = useIsMounted();
  const [selectedBuildingId, setSelectedBuildingId] = useState<BuildingId | null>(null);
  const [viewLevel, setViewLevel] = useState<ViewLevel>("global");
  const [selectedMachine, setSelectedMachine] = useState<MachineData | null>(null);
  const [zoomTarget, setZoomTarget] = useState<THREE.Vector3 | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStepText, setDemoStepText] = useState<string>("");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);

  // Web Audio Synthesizer Click Feedback (Optional Sound)
  const playClickSound = () => {
    if (!audioEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  };

  // Handle Building Selection & Camera Zoom Handoff
  const handleSelectBuilding = (def: Building3DDef, worldPos: THREE.Vector3) => {
    playClickSound();
    setZoomTarget(worldPos);
    setViewLevel("building");

    setTimeout(() => {
      setSelectedBuildingId(def.id);
      setViewLevel("floor");
      onEnterBuilding?.(def.id, def.name);
    }, 850);
  };

  // Return to World Action
  const handleReturnToWorld = () => {
    playClickSound();
    setSelectedBuildingId(null);
    setZoomTarget(null);
    setViewLevel("global");
    setSelectedMachine(null);
  };

  // Run Automated Judge Demo Sequence
  const runJudgeDemo = () => {
    playClickSound();
    setIsDemoRunning(true);
    setViewLevel("global");
    setSelectedBuildingId(null);
    setZoomTarget(null);

    const steps = [
      { text: "1. Global Digital Twin Ecosystem Overview", delay: 2500, action: () => setZoomTarget(null) },
      { text: "2. Flying Camera to Executive HQ...", delay: 3000, action: () => {
          const hq = BUILDINGS_DATA.hq;
          setZoomTarget(new THREE.Vector3(...hq.position));
        }
      },
      { text: "3. Zooming into Apex GigaFactory Production Line...", delay: 3500, action: () => {
          const factory = BUILDINGS_DATA.factory;
          setZoomTarget(new THREE.Vector3(...factory.position));
          setSelectedBuildingId("factory");
          setViewLevel("floor");
        }
      },
      { text: "4. Executing AI Live Simulation: Spawning Logistics & Rerouting Routes...", delay: 4000, action: () => {
          setIsSimulating(true);
        }
      },
      { text: "5. Judge Presentation Complete — All Digital Twin Nodes Synchronized!", delay: 3000, action: () => {
          setIsDemoRunning(false);
          setIsSimulating(false);
        }
      },
    ];

    let current = 0;
    const executeStep = () => {
      if (current < steps.length) {
        const step = steps[current];
        setDemoStepText(step.text);
        step.action();
        current++;
        setTimeout(executeStep, step.delay);
      }
    };
    executeStep();
  };

  // Road paths for trucks & ships
  const truckPath = useMemo(
    () => [
      new THREE.Vector3(-7, 0, 0),
      new THREE.Vector3(0, 0, -7),
      new THREE.Vector3(7, 0, 0),
      new THREE.Vector3(0, 0, 7),
    ],
    []
  );

  const shipPath = useMemo(
    () => [
      new THREE.Vector3(-8, 0, 1),
      new THREE.Vector3(-6, 0, 5),
      new THREE.Vector3(-8, 0, 4),
    ],
    []
  );

  const selectedDef = selectedBuildingId ? BUILDINGS_DATA[selectedBuildingId] : null;

  if (!isMounted) {
    return (
      <div className="relative flex h-[640px] w-full items-center justify-center rounded-[2rem] border border-cyan-500/20 bg-slate-950 p-6 text-cyan-300">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            Loading 3D Digital Twin Engine...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-[680px] overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
      {/* Top Main Navigation Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              3D Digital Twin Ecosystem 2.0 • Parallel OS
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
            Company World
          </h2>
        </div>

        {/* Action Controls & Bookmarks */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Judge Demo Button */}
          <button
            onClick={runJudgeDemo}
            disabled={isDemoRunning}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition shadow-lg ${
              isDemoRunning
                ? "border-purple-400 bg-purple-500/30 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-pulse"
                : "border-purple-400/50 bg-purple-500/20 text-purple-300 hover:border-purple-400 hover:bg-purple-500/30"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>{isDemoRunning ? "Demo Sequence Running..." : "Run Demo"}</span>
          </button>

          {/* AI Simulation Button */}
          <button
            onClick={() => {
              playClickSound();
              setIsSimulating(!isSimulating);
            }}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition shadow-lg ${
              isSimulating
                ? "border-amber-400 bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse"
                : "border-cyan-400/40 bg-cyan-500/20 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-500/30"
            }`}
          >
            <Play className={`h-3.5 w-3.5 ${isSimulating ? "animate-spin" : "fill-current"}`} />
            <span>{isSimulating ? "Simulating Ecosystem..." : "Run AI Simulation"}</span>
          </button>

          {/* Audio Synthesizer Sound Toggle */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`rounded-full border p-2 text-slate-300 transition ${
              audioEnabled
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                : "border-white/15 bg-black/40 text-slate-400 hover:bg-white/10"
            }`}
            title="Toggle Synthesizer Sound"
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Demo Running Banner */}
      <AnimatePresence>
        {isDemoRunning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative z-20 mt-3 flex items-center justify-between rounded-2xl border border-purple-400/60 bg-purple-950/70 p-3 text-xs font-mono font-bold text-purple-200 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 animate-spin text-purple-400" />
              <span>JUDGE DEMO MODE: {demoStepText}</span>
            </div>
            <span className="rounded-full bg-purple-500/30 px-3 py-1 text-[10px] text-purple-300">
              Automated Walkthrough
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Toy Diorama Scene Stage */}
      {!selectedBuildingId ? (
        <div className="relative mt-4 h-[580px] w-full overflow-hidden rounded-3xl border border-sky-300/40 bg-[#bfe3ff] shadow-inner">
          {/* Quick Search & Bookmark Toolbar */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-3 right-4 justify-between">
            {/* Quick Building Search */}
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search building node..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 rounded-xl border border-white/80 bg-white/90 py-1.5 pl-9 pr-3 text-xs font-semibold text-slate-800 placeholder-slate-500 shadow-md backdrop-blur-md focus:border-sky-500 focus:outline-none"
              />
              {searchQuery && (
                <div className="absolute top-9 left-0 right-0 z-30 max-h-40 overflow-y-auto rounded-xl border border-white/80 bg-white/95 p-1.5 shadow-xl text-xs">
                  {Object.values(BUILDINGS_DATA)
                    .filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setSearchQuery("");
                          handleSelectBuilding(b, new THREE.Vector3(...b.position));
                        }}
                        className="cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-sky-100 text-slate-800 font-semibold flex justify-between items-center"
                      >
                        <span>{b.name}</span>
                        <span className="text-[10px] font-mono text-sky-600">{b.type}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Quick Bookmarks */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 p-1 shadow-md backdrop-blur-md">
              <Bookmark className="h-3.5 w-3.5 text-slate-500 ml-2" />
              {(["hq", "factory", "warehouse", "port", "power"] as const).map((bId) => (
                <button
                  key={bId}
                  onClick={() => {
                    const b = BUILDINGS_DATA[bId];
                    handleSelectBuilding(b, new THREE.Vector3(...b.position));
                  }}
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 hover:bg-sky-100 hover:text-sky-900 transition"
                >
                  {bId}
                </button>
              ))}
            </div>

            {/* Reset Camera Button */}
            <button
              onClick={handleReturnToWorld}
              className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-900 hover:bg-white shadow-md"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Camera</span>
            </button>
          </div>

          {/* R3F 3D Diorama Canvas */}
          <Canvas
            shadows={false}
            camera={{ position: [10, 8, 10], fov: 45 }}
            onCreated={({ scene }) => {
              scene.background = new THREE.Color("#bfe3ff"); // Light sky background
            }}
          >
            <ambientLight intensity={0.95} />
            <directionalLight position={[10, 12, 8]} intensity={0.85} />

            <GroundPlatform3D />

            {Object.values(BUILDINGS_DATA).map((b) => (
              <Building3D
                key={b.id}
                def={b}
                isSelected={selectedBuildingId === b.id}
                onSelect={handleSelectBuilding}
              />
            ))}

            {[-3, -1.5, 0, 1.5, 3].map((i) => (
              <Tree3D key={i} position={[5.2 + i * 0.5, 0, 5.2]} />
            ))}

            <WindTurbine3D position={[-6, 0, -4]} />
            <WindTurbine3D position={[-7.5, 0, -5.5]} />

            <SolarPanel3D position={[-2, 0, 5]} />
            <SolarPanel3D position={[-1.2, 0, 5.2]} />

            <Vehicle3D path={truckPath} color="#ff5a5a" speed={isSimulating ? 0.38 : 0.16} />
            <Vehicle3D path={truckPath.slice().reverse()} color="#3b82f6" speed={isSimulating ? 0.48 : 0.22} />
            <CargoShip3D path={shipPath} speed={0.06} />

            <CameraRig3D target={zoomTarget} />
            <OrbitControls
              enablePan={false}
              maxPolarAngle={Math.PI / 2.3}
              minDistance={6}
              maxDistance={22}
            />
          </Canvas>
        </div>
      ) : (
        /* Multi-Level Building Floor & Machine Maintenance View */
        selectedDef && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="relative mt-4 flex flex-col rounded-3xl border border-cyan-500/30 bg-slate-950 p-5 shadow-2xl text-slate-100 min-h-[580px]"
          >
            {/* Top Handoff & Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReturnToWorld}
                  className="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-3.5 py-2 text-xs font-bold text-cyan-200 transition hover:border-cyan-400 hover:bg-cyan-500/30 hover:text-white shadow-md"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to 3D Company World</span>
                </button>

                <div className="h-6 w-[1px] bg-white/10" />

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">3D World</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                  <span className="text-cyan-400 font-bold">{selectedDef.name}</span>
                  {viewLevel === "machine" && selectedMachine && (
                    <>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                      <span className="text-amber-400 font-bold">{selectedMachine.name}</span>
                    </>
                  )}
                </div>
              </div>

              {/* View Level Tabs */}
              <div className="flex rounded-xl border border-white/15 bg-black/40 p-1 text-xs font-semibold">
                <button
                  onClick={() => {
                    setViewLevel("floor");
                    setSelectedMachine(null);
                  }}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    viewLevel === "floor" ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Floor Interior
                </button>
                {selectedMachine && (
                  <button
                    onClick={() => setViewLevel("machine")}
                    className={`rounded-lg px-3 py-1.5 transition ${
                      viewLevel === "machine" ? "bg-amber-500/20 text-amber-300" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Machine Telemetry
                  </button>
                )}
              </div>
            </div>

            {/* View Level 1: Building Floors & Interior */}
            {viewLevel === "floor" && (
              <div className="mt-5 grid grid-cols-1 gap-6 overflow-y-auto max-h-[480px] pr-2">
                {selectedDef.floors.map((floor) => (
                  <div
                    key={floor.floorNumber}
                    className="rounded-2xl border border-cyan-500/20 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md"
                  >
                    {/* Floor Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-extrabold border border-cyan-400/40">
                          F{floor.floorNumber}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{floor.floorName}</h4>
                          <p className="text-xs text-slate-400 font-mono">{floor.deptName}</p>
                        </div>
                      </div>

                      <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Floor Health: {floor.healthScore}%
                      </span>
                    </div>

                    {/* Floor Live Metrics */}
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {floor.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <span className="text-[11px] text-slate-400 block">{m.label}</span>
                          <strong className="mt-1 text-sm font-bold text-cyan-300 block">{m.value}</strong>
                        </div>
                      ))}
                    </div>

                    {/* Machines / Production Equipment List */}
                    {floor.machines.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Floor Production Equipment & Telemetry ({floor.machines.length} Active Machines)
                        </span>
                        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                          {floor.machines.map((mac) => (
                            <div
                              key={mac.id}
                              onClick={() => {
                                playClickSound();
                                setSelectedMachine(mac);
                                setViewLevel("machine");
                              }}
                              className="flex items-center justify-between cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-amber-400/50 hover:bg-white/10"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/40">
                                  <Wrench className="h-4 w-4" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-white block">{mac.name}</span>
                                  <span className="text-[11px] text-slate-400 block">{mac.type}</span>
                                </div>
                              </div>

                              <div className="text-right">
                                <span className={`text-[11px] font-mono font-bold ${mac.health < 85 ? "text-amber-400" : "text-emerald-400"}`}>
                                  Health {mac.health}%
                                </span>
                                <span className="text-[10px] text-slate-400 block">Temp: {mac.temperature}°C</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Employees Roster */}
                    <div className="mt-4 space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Floor Staff ({floor.employees.length} Personnel)
                      </span>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {floor.employees.map((emp) => (
                          <div key={emp.id} className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-cyan-400" />
                              <span className="font-bold text-white">{emp.name}</span>
                            </div>
                            <span className="text-slate-400 text-[11px]">{emp.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View Level 2: Machine Deep Telemetry & Maintenance Inspection */}
            {viewLevel === "machine" && selectedMachine && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 space-y-4 overflow-y-auto max-h-[480px] pr-2"
              >
                <div className="rounded-2xl border border-amber-400/40 bg-amber-950/20 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{selectedMachine.name}</h4>
                        <p className="text-xs font-mono text-amber-300">{selectedMachine.type}</p>
                      </div>
                    </div>

                    <span className="rounded-full border border-amber-400/50 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
                      Failure Probability: {selectedMachine.failureProbability}%
                    </span>
                  </div>

                  {/* Telemetry Gauge Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                      <span className="text-slate-400">Health Score</span>
                      <strong className="mt-1 text-sm font-bold text-emerald-400 block">{selectedMachine.health}%</strong>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                      <span className="text-slate-400">Temperature</span>
                      <strong className="mt-1 text-sm font-bold text-amber-400 block">{selectedMachine.temperature}°C</strong>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                      <span className="text-slate-400">Power Draw</span>
                      <strong className="mt-1 text-sm font-bold text-cyan-300 block">{selectedMachine.powerDraw} kW</strong>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                      <span className="text-slate-400">Vibration Level</span>
                      <strong className="mt-1 text-sm font-bold text-purple-300 block">{selectedMachine.vibration} g</strong>
                    </div>
                  </div>

                  {/* AI Predictive Maintenance Box */}
                  <div className="mt-4 rounded-xl border border-amber-400/30 bg-black/40 p-4">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                      <Sparkles className="h-4 w-4" /> AI Predictive Maintenance Recommendation
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-200">
                      {selectedMachine.aiRecommendation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )
      )}
    </section>
  );
}
