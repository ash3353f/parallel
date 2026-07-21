import * as THREE from "three";

export type WorldMode = "WORLD" | "HQ_INTERIOR" | "FACTORY_INTERIOR";

export type DayNightMode = "day" | "night";

export type FacilityId =
  | "hq"
  | "factory"
  | "warehouse"
  | "logistics"
  | "distribution"
  | "port"
  | "airport"
  | "energy";

export interface KPIPair {
  label: string;
  value: string;
}

export interface MetricPair {
  label: string;
  value: string;
}

export interface FacilityData {
  sub: string;
  kpis: [string, string][];
  metrics: [string, string][];
  risk: "low" | "med" | "high";
  rec: string;
}

export interface BuildingSpec {
  id: FacilityId;
  name: string;
  color: number;
  floors?: number;
  cols?: number;
  win?: boolean;
  industrial?: boolean;
  docks?: number;
  zone?: boolean;
  data: FacilityData;
}

export interface BuildingRecord {
  group: THREE.Group | null;
  pick: THREE.Mesh;
  halo: THREE.Mesh;
  center: [number, number];
  height: number;
  data: FacilityData;
  name: string;
  selected: boolean;
}

export interface FloorDef {
  n: number;
  label: string;
  dept: string;
  emp: number;
  accent: number;
}

export interface EmployeeInfo {
  name: string;
  role: string;
  status: string;
  productivity: number;
  desk?: string;
}

export interface MachineInfo {
  name: string;
  id: string;
  status: string;
  temp: number;
  power: number;
  output: string;
  eff: number;
  risk: "Low" | "Med" | "High";
}

export interface ToastItem {
  id: string;
  msg: string;
  kind?: "" | "warn" | "good";
}

export interface SimResultRow {
  label: string;
  value: string;
  trend: "up" | "down";
}

export interface SimulationState {
  active: boolean;
  blocked: boolean;
  slow: number;
  warehouseBoost: number;
  factoryBoost: number;
}

export interface DigitalTwinState {
  mode: WorldMode;
  worldMode: DayNightMode;
  dayFactor: number;
  isNight: boolean;
  explore: boolean;
  selectedId: FacilityId | null;
  hoveredId: FacilityId | null;
  hqFloor: number;
  sim: SimulationState;
  isMobile: boolean;
}

export type UpdatableFn = (dt: number, elapsedTime: number) => void;
