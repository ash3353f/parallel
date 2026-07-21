import * as THREE from "three";
import { BuildingSpec, BuildingRecord, FacilityId, UpdatableFn } from "./digitalTwinTypes";
import { WorldEnvironment } from "./WorldEnvironment";

export const PLOT: Record<FacilityId, [number, number, number, number]> = {
  hq: [-40, -25, 9, 13],
  factory: [0, -24, 12, 12],
  airport: [40, -26, 15, 12],
  warehouse: [-40, 22, 10, 8],
  energy: [0, 26, 12, 12],
  logistics: [30, 14, 6, 5],
  distribution: [30, 34, 6, 5],
  port: [50, 30, 7, 9],
};

export const P = {
  plot: PLOT,
  orange: 0xf59e0b,
  metal: 0x64748b,
  leaf: 0x22c55e,
  leafDk: 0x15803d,
};

export interface RoadPaths {
  ring: THREE.Vector3[];
  h1: THREE.Vector3[];
  v1: THREE.Vector3[];
  fw: THREE.Vector3[];
  logN: THREE.Vector3[];
  logA: THREE.Vector3[];
  dist: THREE.Vector3[];
  fork: THREE.Vector3[];
}

export const ROADS: RoadPaths = {
  ring: [
    new THREE.Vector3(-60, 0.44, -60),
    new THREE.Vector3(60, 0.44, -60),
    new THREE.Vector3(60, 0.44, 60),
    new THREE.Vector3(-60, 0.44, 60),
  ],
  h1: [
    new THREE.Vector3(-60, 0.44, 0),
    new THREE.Vector3(60, 0.44, 0),
  ],
  v1: [
    new THREE.Vector3(0, 0.44, -60),
    new THREE.Vector3(0, 0.44, 60),
  ],
  fw: [
    new THREE.Vector3(-40, 0.44, -24),
    new THREE.Vector3(-40, 0.44, 22),
  ],
  logN: [
    new THREE.Vector3(0, 0.44, -24),
    new THREE.Vector3(30, 0.44, 0),
    new THREE.Vector3(30, 0.44, 14),
  ],
  logA: [
    new THREE.Vector3(0, 0.44, -24),
    new THREE.Vector3(60, 0.44, -24),
    new THREE.Vector3(60, 0.44, 14),
    new THREE.Vector3(30, 0.44, 14),
  ],
  dist: [
    new THREE.Vector3(30, 0.44, 14),
    new THREE.Vector3(30, 0.44, 34),
  ],
  fork: [
    new THREE.Vector3(-36, 0.44, 18),
    new THREE.Vector3(-44, 0.44, 18),
    new THREE.Vector3(-44, 0.44, 26),
    new THREE.Vector3(-36, 0.44, 26),
  ],
};

export const SPECS: BuildingSpec[] = [
  {
    id: "hq",
    name: "Executive Headquarters",
    color: 0x9fd0e6,
    floors: 6,
    cols: 4,
    win: true,
    data: {
      sub: "Global Command Tower",
      kpis: [
        ["Operational Health", "96%"],
        ["Headcount", "420"],
        ["Energy Use", "2.4 MW"],
        ["AI Uptime", "99.98%"],
      ],
      metrics: [
        ["AI Status", "Online"],
        ["Open Roles", "12"],
        ["Floor Area", "38,400 m²"],
      ],
      risk: "low",
      rec: "Re-balance HVAC load across floors 3–5 to cut peak energy by ~6%.",
    },
  },
  {
    id: "factory",
    name: "Apex Factory Compound",
    color: 0xe6a875,
    cols: 4,
    industrial: true,
    data: {
      sub: "Smart Manufacturing Hub",
      kpis: [
        ["Line Output", "1,450 u/d"],
        ["Robotics Load", "82%"],
        ["Defect Rate", "0.04%"],
        ["OEE Index", "91.2%"],
      ],
      metrics: [
        ["Conveyor Velocity", "1.4 m/s"],
        ["Active Workers", "148"],
        ["BESS Link", "Active"],
      ],
      risk: "med",
      rec: "Corridor V2 truck bottleneck is slowing dispatch; consider rerouting via North Express.",
    },
  },
  {
    id: "warehouse",
    name: "Central Logistics Hub",
    color: 0x95cfad,
    cols: 3,
    docks: 4,
    data: {
      sub: "Automated Storage & Fulfillment",
      kpis: [
        ["Storage Utilization", "78%"],
        ["Dock Velocity", "14.2 min"],
        ["AGV Fleet", "24/24 Active"],
        ["Dispatch Rate", "98.6%"],
      ],
      metrics: [
        ["Daily Throughput", "2,400 T"],
        ["Inventory Value", "$18.4M"],
        ["Climate Control", "Nominal"],
      ],
      risk: "low",
      rec: "Storage headroom is optimal; maintain current AGV battery cycling schedule.",
    },
  },
  {
    id: "logistics",
    name: "Express Delivery Hub",
    color: 0xc4b5fd,
    cols: 2,
    docks: 3,
    data: {
      sub: "Last-Mile Distribution Node",
      kpis: [
        ["Fleet Readiness", "94%"],
        ["Avg Route Time", "24 min"],
        ["On-Time Rate", "97.8%"],
        ["Fuel Savings", "-14%"],
      ],
      metrics: [
        ["Active Vans", "38"],
        ["Packages / Hr", "1,850"],
        ["EV Chargers", "12/12"],
      ],
      risk: "low",
      rec: "EV fleet charging balanced; peak delivery window fully covered.",
    },
  },
  {
    id: "distribution",
    name: "Regional Sorting Center",
    color: 0xfbcfe8,
    cols: 2,
    docks: 3,
    data: {
      sub: "Cross-Dock Operations",
      kpis: [
        ["Sort Speed", "4,200/hr"],
        ["Error Rate", "0.01%"],
        ["Uptime", "99.9%"],
        ["Backlog", "0"],
      ],
      metrics: [
        ["Conveyor Length", "640 m"],
        ["Shift Size", "42"],
        ["Power", "380 kW"],
      ],
      risk: "low",
      rec: "Sort belts operating at 74% capacity; ready for high-volume intake.",
    },
  },
  {
    id: "port",
    name: "Maritime Seaport Terminal",
    color: 0x7dd3fc,
    cols: 3,
    data: {
      sub: "Ocean Freight Compound",
      kpis: [
        ["Container Flow", "850 TEU/d"],
        ["Berth Occupancy", "66%"],
        ["Crane Velocity", "28/hr"],
        ["Customs Clear", "1.2 hrs"],
      ],
      metrics: [
        ["Vessels Docked", "2"],
        ["Reefer Plugged", "84"],
        ["Rail Link", "Active"],
      ],
      risk: "low",
      rec: "Ship 'Sea Voyager' discharging cargo; rail transfer proceeding on schedule.",
    },
  },
  {
    id: "airport",
    name: "Global Cargo Helipad",
    color: 0x93c5fd,
    cols: 3,
    data: {
      sub: "Priority Aviation Hub",
      kpis: [
        ["Air Velocity", "1.4 hrs"],
        ["Sort Time", "8 min"],
        ["Fleet Uptime", "100%"],
        ["Priority Rate", "99.4%"],
      ],
      metrics: [
        ["Active Aircraft", "1 Cargo Plane"],
        ["Runway Status", "Clear"],
        ["Wind Conditions", "8 kts NW"],
      ],
      risk: "low",
      rec: "Priority flight inbound at 14:30; clearance protocols pre-approved.",
    },
  },
  {
    id: "energy",
    name: "Renewable Energy Park",
    color: 0xfde047,
    cols: 3,
    data: {
      sub: "Clean Power Microgrid",
      kpis: [
        ["Solar Output", "3.8 MW"],
        ["Wind Generation", "2.4 MW"],
        ["BESS Charge", "94%"],
        ["Carbon Saved", "18.4 T/d"],
      ],
      metrics: [
        ["Solar Arrays", "12 Active"],
        ["Turbines", "3 Rotating"],
        ["Grid Import", "0.0 kW"],
      ],
      risk: "low",
      rec: "Solar array efficiency at 96%. Storage capacity adequate for evening peak.",
    },
  },
];

export class BuildingSystem {
  public buildings: Partial<Record<FacilityId, BuildingRecord>> = {};
  public roads: RoadPaths = ROADS;
  private matCache = new Map<string, THREE.MeshStandardMaterial>();
  private disposedGeometries: THREE.BufferGeometry[] = [];
  private disposedMaterials: THREE.Material[] = [];

  constructor(
    private outerGroup: THREE.Group,
    private pickWorld: THREE.Object3D[],
    private updatables: UpdatableFn[],
    private env: WorldEnvironment,
    private isMobile: boolean
  ) {
    this.initBaseIsland();
    this.initRoadNetwork();
    this.initInstancedElements();
    this.initSpecialSites();
    this.initBuildings();
  }

  private mat(color: number, opts: { rough?: number; metal?: number } = {}) {
    const key = `${color}_${opts.rough ?? 0.5}_${opts.metal ?? 0.1}`;
    if (!this.matCache.has(key)) {
      const m = new THREE.MeshStandardMaterial({
        color,
        roughness: opts.rough ?? 0.5,
        metalness: opts.metal ?? 0.1,
      });
      this.matCache.set(key, m);
      this.disposedMaterials.push(m);
    }
    return this.matCache.get(key)!;
  }

  private box(
    w: number,
    h: number,
    d: number,
    material: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
    parent: THREE.Object3D = this.outerGroup,
    castShadow = true
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(w, h, d);
    this.disposedGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = castShadow && !this.isMobile;
    mesh.receiveShadow = !this.isMobile;
    parent.add(mesh);
    return mesh;
  }

  private initBaseIsland() {
    this.box(160, 4, 160, this.mat(0xd5dbd6, { rough: 0.9 }), 0, -2, 0);
    this.box(152, 0.4, 152, this.mat(0x94b88f, { rough: 0.85 }), 0, 0.2, 0);
  }

  private initRoadNetwork() {
    const roadMat = this.mat(0x323842, { rough: 0.7 });
    const markMat = this.mat(0xffffff, { rough: 0.4 });
    const paveMat = this.mat(0xb8c0b5, { rough: 0.8 });

    this.box(128, 0.08, 14, roadMat, 0, 0.44, 0);
    this.box(14, 0.08, 128, roadMat, 0, 0.44, 0);

    this.box(128, 0.09, 0.35, markMat, 0, 0.45, 0);
    this.box(0.35, 0.09, 128, markMat, 0, 0.45, 0);

    const PLOTS = Object.values(PLOT);
    PLOTS.forEach(([px, pz, pw, pd]) => {
      this.box(pw * 3.6 + 1.2, 0.12, pd * 3.6 + 1.2, paveMat, px, 0.3, pz);
    });
  }

  private initInstancedElements() {
    const treeCount = this.isMobile ? 35 : 75;
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 2.2, 5);
    const crownGeo = new THREE.ConeGeometry(1.6, 3.8, 5);
    this.disposedGeometries.push(trunkGeo, crownGeo);

    const trunkMat = this.mat(0x5a4332, { rough: 0.9 });
    const crownMat = this.mat(0x3e7a44, { rough: 0.8 });

    const trunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, treeCount);
    const crownMesh = new THREE.InstancedMesh(crownGeo, crownMat, treeCount);
    const mat4 = new THREE.Matrix4();

    let placed = 0;
    while (placed < treeCount) {
      const rx = (Math.random() - 0.5) * 140;
      const rz = (Math.random() - 0.5) * 140;
      if (Math.abs(rx) < 12 || Math.abs(rz) < 12) continue;

      mat4.makeTranslation(rx, 1.3, rz);
      trunkMesh.setMatrixAt(placed, mat4);

      mat4.makeTranslation(rx, 3.8, rz);
      crownMesh.setMatrixAt(placed, mat4);
      placed++;
    }

    trunkMesh.instanceMatrix.needsUpdate = true;
    crownMesh.instanceMatrix.needsUpdate = true;
    this.outerGroup.add(trunkMesh, crownMesh);

    const lampCount = this.isMobile ? 12 : 24;
    const lampPoleGeo = new THREE.CylinderGeometry(0.1, 0.12, 4.5, 6);
    this.disposedGeometries.push(lampPoleGeo);
    const poleMat = this.mat(0x4a525d, { rough: 0.5 });
    const lampMesh = new THREE.InstancedMesh(lampPoleGeo, poleMat, lampCount);

    let lPlaced = 0;
    for (let i = -55; i <= 55; i += 20) {
      if (Math.abs(i) < 10) continue;
      mat4.makeTranslation(i, 2.45, 8.5);
      lampMesh.setMatrixAt(lPlaced++, mat4);
      mat4.makeTranslation(8.5, 2.45, i);
      lampMesh.setMatrixAt(lPlaced++, mat4);
      if (lPlaced >= lampCount) break;
    }
    lampMesh.instanceMatrix.needsUpdate = true;
    this.outerGroup.add(lampMesh);
  }

  private initSpecialSites() {
    const portGroup = new THREE.Group();
    portGroup.position.set(50, 0.4, 30);
    this.box(28, 0.2, 22, this.mat(0x7a8494, { rough: 0.6 }), 0, 0.1, 0, portGroup);
    this.box(32, 0.1, 8, this.mat(0x2f689e, { rough: 0.2 }), 0, -0.05, 12, portGroup);

    for (let i = 0; i < 2; i++) {
      const cg = new THREE.Group();
      cg.position.set(-8 + i * 16, 0, 0);
      this.box(1.2, 10, 1.2, this.mat(0xd64536), -3, 5, 0, cg);
      this.box(1.2, 10, 1.2, this.mat(0xd64536), 3, 5, 0, cg);
      this.box(10, 1.2, 1.2, this.mat(0xd64536), 0, 9.5, 0, cg);
      this.box(1.2, 3, 1.2, this.mat(0xf0c83c), 0, 7.5, 3, cg);
      portGroup.add(cg);
    }
    this.outerGroup.add(portGroup);

    const airGroup = new THREE.Group();
    airGroup.position.set(40, 0.4, -26);
    this.box(40, 0.1, 14, this.mat(0x2d323b, { rough: 0.7 }), 0, 0.05, 0, airGroup);

    for (let x = -16; x <= 16; x += 4) {
      this.box(0.4, 0.15, 0.4, this.env.matRunway, x, 0.1, -6.5, airGroup);
      this.box(0.4, 0.15, 0.4, this.env.matRunway, x, 0.1, 6.5, airGroup);
    }
    this.outerGroup.add(airGroup);

    const energyGroup = new THREE.Group();
    energyGroup.position.set(0, 0.4, 26);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const pan = this.box(2.4, 0.1, 1.6, this.env.matSolar, 0, 0, 0, energyGroup);
        pan.position.set(-6 + c * 4, 0.6, -3 + r * 6);
        pan.rotation.x = -0.3;
      }
    }

    const blades: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const tg = new THREE.Group();
      tg.position.set(-8 + i * 8, 0, 6);
      this.box(0.5, 12, 0.5, this.mat(0xe0e6ed, { rough: 0.4 }), 0, 6, 0, tg);
      const hub = this.box(0.9, 0.9, 1.1, this.mat(0xd0d7de), 0, 11.8, 0.5, tg);
      const bladeGrp = new THREE.Group();
      bladeGrp.position.set(0, 11.8, 1.1);

      for (let b = 0; b < 3; b++) {
        const blade = this.box(0.3, 4.5, 0.08, this.mat(0xffffff), 0, 2.25, 0, bladeGrp);
        blade.rotation.z = (b * Math.PI * 2) / 3;
      }
      tg.add(bladeGrp);
      blades.push(bladeGrp);
      energyGroup.add(tg);
    }

    this.updatables.push((dt) => {
      blades.forEach((b) => (b.rotation.z += dt * 1.8));
    });

    this.outerGroup.add(energyGroup);
  }

  private initBuildings() {
    SPECS.forEach((s) => this.buildCompound(s));
  }

  private buildCompound(s: BuildingSpec) {
    const p = PLOT[s.id];
    if (!p) return;

    const g = new THREE.Group();
    g.position.set(p[0], 0.4, p[1]);
    this.outerGroup.add(g);

    const w = p[2] * 2.2;
    const d = p[3] * 2.2;
    const floors = s.floors ?? 3;
    const height = floors * 2.4 + 1.2;

    this.box(w, height, d, this.mat(s.color, { rough: 0.4, metal: 0.1 }), 0, height / 2, 0, g);
    this.box(w + 0.4, 0.5, d + 0.4, this.mat(0x2d323b, { rough: 0.8 }), 0, height + 0.25, 0, g);

    if (s.win) {
      const cols = s.cols ?? 4;
      const place = (side: "N" | "S" | "E" | "W") => {
        for (let f = 0; f < floors; f++) {
          for (let c = 0; c < cols; c++) {
            const y = 1.6 + f * 2.4;
            const off = (c - (cols - 1) / 2) * (w / (cols + 0.5));
            const m = this.box(1.2, 1.3, 0.15, this.env.matWindow);
            if (side === "S") m.position.set(off, y, d / 2 + 0.05);
            else if (side === "N") m.position.set(off, y, -d / 2 - 0.05);
            else if (side === "E") {
              m.position.set(w / 2 + 0.05, y, off);
              m.rotation.y = Math.PI / 2;
            } else {
              m.position.set(-w / 2 - 0.05, y, off);
              m.rotation.y = Math.PI / 2;
            }
            g.add(m);
          }
        }
      };
      ["N", "S", "E", "W"].forEach((side) => place(side as "N" | "S" | "E" | "W"));
    } else {
      this.box(w - 1, 0.9, 0.2, this.env.matWindow, 0, height - 1.2, -d / 2 - 0.05, g);
      this.box(w - 1, 0.9, 0.2, this.env.matWindow, 0, height - 1.2, d / 2 + 0.05, g);
    }

    if (s.docks) {
      const face = s.id === "warehouse" || s.id === "logistics" ? "N" : s.id === "distribution" ? "W" : "S";
      for (let i = 0; i < s.docks; i++) {
        const off = (i - (s.docks - 1) / 2) * 2.6;
        const dock = this.box(2.0, 1.6, 0.6, this.mat(0x444a55, { rough: 0.6 }));
        if (face === "S") dock.position.set(off, 0.8, d / 2 + 0.3);
        else if (face === "N") dock.position.set(off, 0.8, -d / 2 - 0.3);
        else {
          dock.position.set(-w / 2 - 0.3, 0.8, off);
          dock.rotation.y = Math.PI / 2;
        }
        g.add(dock);
      }
    }

    if (s.id === "hq") {
      this.box(4, 2.4, 1.2, this.mat(0x8fc7e8, { rough: 0.2, metal: 0.2 }), 0, 1.2, d / 2 + 0.6, g, true);
      const hqSignMat = new THREE.MeshStandardMaterial({
        color: 0x34e0d8,
        emissive: 0x34e0d8,
        emissiveIntensity: 0.6,
        roughness: 0.4,
      });
      this.disposedMaterials.push(hqSignMat);
      this.box(2.4, 0.7, 0.1, hqSignMat, 0, height - 1.4, d / 2 + 0.12, g);
    }

    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x34e0d8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.disposedMaterials.push(haloMat);
    const halo = this.box(w + 1.4, height + 1.2, d + 1.4, haloMat, 0, height / 2, 0, g);

    const pickMat = new THREE.MeshBasicMaterial({ visible: false });
    this.disposedMaterials.push(pickMat);
    const pick = this.box(w, height, d, pickMat, 0, height / 2, 0, g);
    pick.userData = { buildingId: s.id };
    this.pickWorld.push(pick);

    const rec: BuildingRecord = {
      group: g,
      pick,
      halo,
      center: [p[0], p[1]],
      height,
      data: s.data,
      name: s.name,
      selected: false,
    };
    this.buildings[s.id] = rec;

    this.updatables.push((dt) => {
      const target = rec.selected ? 0.22 : 0;
      haloMat.opacity += (target - haloMat.opacity) * Math.min(1, dt * 10);
    });
  }

  public setHover(id: FacilityId | null) {
    Object.keys(this.buildings).forEach((k) => {
      const rec = this.buildings[k as FacilityId];
      if (rec) {
        rec.selected = rec.pick.userData.buildingId === id;
      }
    });
  }

  public dispose() {
    this.disposedGeometries.forEach((g) => g.dispose());
    this.disposedMaterials.forEach((m) => m.dispose());
    this.matCache.clear();
  }
}
