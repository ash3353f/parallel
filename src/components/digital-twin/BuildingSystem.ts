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
  coral: 0xef7e72,
  mint: 0x9fe0b8,
  cream: 0xf0dfa8,
  sky: 0x9fd0e6,
  yellow: 0xf4e285,
  lavender: 0xc3b1e8,
  roof: 0xf4f1ea,
  trim: 0x6b7280,
  base: 0x8a909c,
  grass: 0x6fcf57,
  grassDk: 0x57b843,
  road: 0x6e7480,
  roadLine: 0xeef2f7,
  table: 0xe9edf2,
  sand: 0xe8c766,
  water: 0x2f86c4,
  trunk: 0x8a5a3b,
  leaf: 0x3fb84f,
  leafDk: 0x2e9e40,
  metal: 0xb9c2cc,
  orange: 0xff8a3c,
  white: 0xffffff,
  plot: PLOT,
};

const Y_ROAD = 0.55;

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
    new THREE.Vector3(-61, Y_ROAD, -47),
    new THREE.Vector3(61, Y_ROAD, -47),
    new THREE.Vector3(61, Y_ROAD, 47),
    new THREE.Vector3(-61, Y_ROAD, 47),
  ],
  h1: [
    new THREE.Vector3(-61, Y_ROAD, 0),
    new THREE.Vector3(61, Y_ROAD, 0),
  ],
  v1: [
    new THREE.Vector3(-18, Y_ROAD, -47),
    new THREE.Vector3(-18, Y_ROAD, 47),
  ],
  fw: [
    new THREE.Vector3(0, Y_ROAD, 0),
    new THREE.Vector3(-40, Y_ROAD, 0),
  ],
  logN: [
    new THREE.Vector3(30, Y_ROAD, 0),
    new THREE.Vector3(0, Y_ROAD, 0),
  ],
  logA: [
    new THREE.Vector3(30, Y_ROAD, 0),
    new THREE.Vector3(30, Y_ROAD, 20),
    new THREE.Vector3(18, Y_ROAD, 20),
    new THREE.Vector3(18, Y_ROAD, 0),
    new THREE.Vector3(0, Y_ROAD, 0),
  ],
  dist: [
    new THREE.Vector3(18, Y_ROAD, 0),
    new THREE.Vector3(18, Y_ROAD, 34),
  ],
  fork: [
    new THREE.Vector3(-28, Y_ROAD, 12),
    new THREE.Vector3(-28, Y_ROAD, 30),
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
    name: "Apex Factory",
    color: 0xc9cdd4,
    floors: 2,
    cols: 6,
    industrial: true,
    data: {
      sub: "Primary Production Site",
      kpis: [
        ["Daily Output", "4,200 u"],
        ["Efficiency", "94%"],
        ["Workers", "186"],
        ["Energy Use", "8.9 MW"],
      ],
      metrics: [
        ["OEE", "88%"],
        ["Scrap Rate", "1.4%"],
        ["Active Lines", "4"],
      ],
      risk: "med",
      rec: "Predictive model flags Cell-03 bearing wear — schedule maintenance in 72h.",
    },
  },
  {
    id: "warehouse",
    name: "Central Warehouse",
    color: 0xf0dfa8,
    floors: 1,
    cols: 5,
    docks: 4,
    data: {
      sub: "Inventory & Fulfilment",
      kpis: [
        ["SKUs", "18,420"],
        ["Fill Rate", "99.2%"],
        ["Workers", "94"],
        ["Energy Use", "1.1 MW"],
      ],
      metrics: [
        ["Capacity", "76%"],
        ["Inbound/hr", "320"],
        ["Outbound/hr", "410"],
      ],
      risk: "low",
      rec: "Slot fast-movers nearer to dock B to shave 9% off pick travel.",
    },
  },
  {
    id: "logistics",
    name: "Logistics Hub",
    color: 0x9fe0b8,
    floors: 2,
    cols: 3,
    win: true,
    docks: 2,
    data: {
      sub: "Routing & Dispatch",
      kpis: [
        ["On-Time", "93%"],
        ["Routes", "48"],
        ["Workers", "61"],
        ["Energy Use", "0.8 MW"],
      ],
      metrics: [
        ["Avg Delay", "14 min"],
        ["Fleet", "36"],
        ["Cost/km", "$1.18"],
      ],
      risk: "med",
      rec: "Divert 6 shipments via corridor-2 to relieve the H1 bottleneck.",
    },
  },
  {
    id: "distribution",
    name: "Distribution Center",
    color: 0xc3b1e8,
    floors: 2,
    cols: 3,
    win: true,
    docks: 2,
    data: {
      sub: "Regional Distribution",
      kpis: [
        ["Throughput", "5,800/d"],
        ["Accuracy", "99.6%"],
        ["Workers", "73"],
        ["Energy Use", "0.9 MW"],
      ],
      metrics: [
        ["Dock Utilisation", "82%"],
        ["Returns", "0.7%"],
        ["Carriers", "5"],
      ],
      risk: "low",
      rec: "Stagger carrier arrivals 11:00–13:00 to flatten dock queueing.",
    },
  },
  {
    id: "port",
    name: "Maritime Port",
    color: 0xef7e72,
    zone: true,
    data: {
      sub: "Sea Freight Terminal",
      kpis: [
        ["TEU/day", "1,240"],
        ["Berths", "3"],
        ["Workers", "52"],
        ["Energy Use", "1.6 MW"],
      ],
      metrics: [
        ["Crane Moves/hr", "28"],
        ["Vessel Queue", "1"],
        ["Dwell", "2.1 d"],
      ],
      risk: "med",
      rec: "Pre-stage export containers to cut vessel turnaround by ~18%.",
    },
  },
  {
    id: "airport",
    name: "Air Cargo Terminal",
    color: 0xf4e285,
    zone: true,
    data: {
      sub: "Air Freight & Express",
      kpis: [
        ["Tonnes/day", "310"],
        ["Flights", "9"],
        ["Workers", "44"],
        ["Energy Use", "1.3 MW"],
      ],
      metrics: [
        ["SLA", "98.4%"],
        ["Customs", "12 min"],
        ["Sort Rate", "2,100/h"],
      ],
      risk: "low",
      rec: "Open express lane 04:00–06:00 to absorb the morning peak.",
    },
  },
  {
    id: "energy",
    name: "Renewable Energy Park",
    color: 0x9fe0b8,
    zone: true,
    data: {
      sub: "Solar + Wind Generation",
      kpis: [
        ["Output", "6.2 MW"],
        ["Solar", "3.8 MW"],
        ["Wind", "2.4 MW"],
        ["CO₂ Saved", "41 t/d"],
      ],
      metrics: [
        ["Storage", "82%"],
        ["Grid Load", "Self + 1.4 MW export"],
        ["Uptime", "99.9%"],
      ],
      risk: "low",
      rec: "Shift battery discharge to 18:00–20:00 tariff window (+$4.2k/day).",
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

  private mat(
    color: number,
    opts: { rough?: number; metal?: number; flat?: boolean; em?: number; emI?: number } = {}
  ) {
    const key = `${color}_${opts.rough ?? 0.85}_${opts.metal ?? 0}_${opts.flat ? 1 : 0}_${opts.em ?? 0}_${opts.emI ?? 0}`;
    if (!this.matCache.has(key)) {
      const m = new THREE.MeshStandardMaterial({
        color,
        roughness: opts.rough ?? 0.85,
        metalness: opts.metal ?? 0,
        flatShading: !!opts.flat,
        emissive: opts.em ?? 0,
        emissiveIntensity: opts.emI ?? 0,
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
    castShadow = false,
    receiveShadow = false
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(w, h, d);
    this.disposedGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = castShadow && !this.isMobile;
    mesh.receiveShadow = receiveShadow && !this.isMobile;
    if (parent) parent.add(mesh);
    return mesh;
  }

  private cyl(
    rt: number,
    rb: number,
    h: number,
    seg: number,
    material: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
    parent: THREE.Object3D = this.outerGroup,
    castShadow = false
  ): THREE.Mesh {
    const geo = new THREE.CylinderGeometry(rt, rb, h, seg);
    this.disposedGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = castShadow && !this.isMobile;
    if (parent) parent.add(mesh);
    return mesh;
  }

  private initBaseIsland() {
    this.box(640, 2, 640, this.mat(P.table, { rough: 0.6, metal: 0.05 }), 0, -2.2, 0, this.outerGroup, false, true);
    this.box(132, 0.8, 104, this.mat(P.sand, { rough: 0.9 }), 0, -0.9, 0, this.outerGroup, false, true);
    this.box(128, 0.8, 100, this.mat(P.grass, { rough: 0.95 }), 0, -0.1, 0, this.outerGroup, false, true);

    for (let i = 0; i < 26; i++) {
      const w = 8 + Math.random() * 16;
      const d = 8 + Math.random() * 16;
      const x = (Math.random() - 0.5) * 116;
      const z = (Math.random() - 0.5) * 90;
      this.box(
        w,
        0.05,
        d,
        this.mat(i % 2 ? P.grassDk : P.grass, { rough: 1 }),
        x,
        0.32,
        z,
        this.outerGroup,
        false,
        true
      );
    }
  }

  private roadStrip(x1: number, z1: number, x2: number, z2: number, w = 6) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    const m = this.box(
      len,
      0.12,
      w,
      this.mat(P.road, { rough: 0.95 }),
      (x1 + x2) / 2,
      0.36,
      (z1 + z2) / 2,
      this.outerGroup,
      false,
      true
    );
    m.rotation.y = -Math.atan2(dz, dx);

    const dashes = Math.max(1, Math.floor(len / 4));
    for (let i = 0; i < dashes; i++) {
      const t = (i + 0.5) / dashes;
      const lx = x1 + dx * t;
      const lz = z1 + dz * t;
      const d = this.box(
        1.4,
        0.04,
        0.4,
        this.mat(P.roadLine, { rough: 0.7 }),
        lx,
        0.43,
        lz,
        this.outerGroup
      );
      d.rotation.y = -Math.atan2(dz, dx);
    }
    return m;
  }

  private initRoadNetwork() {
    const r = (a: number, b: number, c: number, d: number, w = 6) =>
      this.roadStrip(a, b, c, d, w);

    r(-61, -47, 61, -47);
    r(61, -47, 61, 47);
    r(61, 47, -61, 47);
    r(-61, 47, -61, -47);
    r(-18, -47, -18, 47);
    r(18, -47, 18, 47);
    r(-61, 0, 61, 0);
  }

  private onRoadOrPlot(x: number, z: number): boolean {
    if (Math.abs(z) < 4) return true;
    if (Math.abs(x + 18) < 4 || Math.abs(x - 18) < 4) return true;
    if (Math.abs(x) > 58 || Math.abs(z) > 44) return true;

    for (const k in PLOT) {
      const p = PLOT[k as FacilityId];
      if (Math.abs(x - p[0]) < p[2] + 2 && Math.abs(z - p[1]) < p[3] + 2) return true;
    }
    return false;
  }

  private initInstancedElements() {
    const COUNT = this.isMobile ? 50 : 70;
    const tg = new THREE.CylinderGeometry(0.35, 0.5, 2.2, 6);
    const lg = new THREE.ConeGeometry(1.9, 4.2, 7);
    const lg2 = new THREE.IcosahedronGeometry(2.0, 0);
    this.disposedGeometries.push(tg, lg, lg2);

    const tm = this.mat(P.trunk, { rough: 0.9, flat: true });
    const lm = this.mat(P.leaf, { rough: 0.9, flat: true });
    const lm2 = this.mat(P.leafDk, { rough: 0.9, flat: true });

    const trunks = new THREE.InstancedMesh(tg, tm, COUNT);
    const leaves = new THREE.InstancedMesh(lg, lm, COUNT);
    const leaves2 = new THREE.InstancedMesh(lg2, lm2, COUNT);
    trunks.castShadow = leaves.castShadow = !this.isMobile;
    trunks.receiveShadow = !this.isMobile;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();

    let placed = 0;
    let guard = 0;

    while (placed < COUNT && guard < COUNT * 30) {
      guard++;
      const x = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 0.5) * 92;
      if (this.onRoadOrPlot(x, z)) continue;

      const sc = 0.7 + Math.random() * 0.7;
      const round = Math.random() > 0.5;

      m.compose(new THREE.Vector3(x, 1.1 * sc, z), q, s.set(sc, sc, sc));
      trunks.setMatrixAt(placed, m);

      m.compose(new THREE.Vector3(x, (2.2 + 2.1) * sc, z), q, s.set(sc, sc, sc));
      (round ? leaves2 : leaves).setMatrixAt(placed, m);

      m.compose(new THREE.Vector3(x, -10, z), q, s.set(0, 0, 0));
      (round ? leaves : leaves2).setMatrixAt(placed, m);

      placed++;
    }

    trunks.count = leaves.count = leaves2.count = placed;
    trunks.instanceMatrix.needsUpdate = true;
    leaves.instanceMatrix.needsUpdate = true;
    leaves2.instanceMatrix.needsUpdate = true;

    this.outerGroup.add(trunks, leaves, leaves2);

    // Streetlights
    const spots: [number, number][] = [];
    for (let x = -58; x <= 58; x += 29) {
      spots.push([x, -44]);
      spots.push([x, 44]);
    }
    for (let z = -30; z <= 30; z += 20) {
      spots.push([-58, z]);
      spots.push([58, z]);
    }

    const pg = new THREE.CylinderGeometry(0.18, 0.22, 5, 6);
    const lSphereGeo = new THREE.SphereGeometry(0.55, 8, 6);
    this.disposedGeometries.push(pg, lSphereGeo);

    const poles = new THREE.InstancedMesh(pg, this.mat(P.metal, { rough: 0.5, metal: 0.5 }), spots.length);
    const lamps = new THREE.InstancedMesh(lSphereGeo, this.env.matLamp, spots.length);
    poles.castShadow = !this.isMobile;

    const sOne = new THREE.Vector3(1, 1, 1);
    spots.forEach((pSpot, i) => {
      m.compose(new THREE.Vector3(pSpot[0], 2.5, pSpot[1]), q, sOne);
      poles.setMatrixAt(i, m);
      m.compose(new THREE.Vector3(pSpot[0], 5.1, pSpot[1]), q, sOne);
      lamps.setMatrixAt(i, m);
    });

    poles.instanceMatrix.needsUpdate = true;
    lamps.instanceMatrix.needsUpdate = true;
    this.outerGroup.add(poles, lamps);

    [[-18, 0], [18, 0], [0, -30], [0, 30]].forEach((pSpot) => {
      const pl = new THREE.PointLight(0xffd9a0, 0, 26, 2);
      pl.position.set(pSpot[0], 5, pSpot[1]);
      this.outerGroup.add(pl);
      this.updatables.push(() => {
        pl.intensity = (1 - this.env.matWindow.emissiveIntensity) * 0.9;
      });
    });
  }

  private initSpecialSites() {
    // Maritime Seaport
    const portGroup = new THREE.Group();
    portGroup.position.set(50, 0, 30);
    this.outerGroup.add(portGroup);

    const waterMat = new THREE.MeshStandardMaterial({
      color: P.water,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.92,
    });
    this.disposedMaterials.push(waterMat);
    this.box(13, 0.3, 17, waterMat, 0, -0.05, 0, portGroup, false, true);
    this.box(14, 0.6, 18, this.mat(P.sand, { rough: 0.9 }), 0, -0.4, 0, portGroup);
    this.box(3, 0.5, 17, this.mat(0xc9cdd4, { rough: 0.8 }), -7.5, 0.2, 0, portGroup, false, true);

    const cc = [0xd9534f, 0x4f9dff, 0x37d399, 0xffb454, 0x9b7bff];
    for (let i = 0; i < 10; i++) {
      const cz = -7 + i * 1.6;
      this.box(
        2.2,
        1.4,
        1.4,
        this.mat(cc[i % 5], { rough: 0.6 }),
        -7.5 + (Math.random() - 0.5) * 1.5,
        1.0 + (i % 2) * 1.4,
        cz,
        portGroup,
        true
      );
    }

    const crane = new THREE.Group();
    crane.position.set(-3, 0, 0);
    portGroup.add(crane);

    this.box(0.6, 9, 0.6, this.mat(P.orange, { rough: 0.5 }), -2, 4.5, -7, crane, true);
    this.box(0.6, 9, 0.6, this.mat(P.orange, { rough: 0.5 }), -2, 4.5, 7, crane, true);
    this.box(0.6, 9, 0.6, this.mat(P.orange, { rough: 0.5 }), 3, 4.5, -7, crane, true);
    this.box(0.6, 9, 0.6, this.mat(P.orange, { rough: 0.5 }), 3, 4.5, 7, crane, true);
    this.box(6, 0.7, 15, this.mat(P.orange, { rough: 0.5 }), 0.5, 9, 0, crane, true);

    const trolley = this.box(1.6, 0.6, 1.6, this.mat(0x333842, { rough: 0.5 }), 0.5, 8.4, 0, crane, true);
    const cable = this.box(0.12, 3, 0.12, this.mat(0x222222, { rough: 0.6 }), 0.5, 6.6, 0, crane);
    const hook = this.box(1.4, 1, 1.4, this.mat(0xd9534f, { rough: 0.6 }), 0.5, 4.8, 0, crane, true);

    this.updatables.push((_dt, t) => {
      const z = Math.sin(t * 0.5) * 6;
      trolley.position.z = z;
      cable.position.z = z;
      hook.position.z = z;
      cable.scale.y = 0.7 + Math.sin(t * 0.9) * 0.3 + 0.3;
      cable.position.y = 8.4 - cable.scale.y * 1.5;
      hook.position.y = cable.position.y - 1.6;
    });

    const portLight = new THREE.PointLight(0xffd9a0, 0, 30, 2);
    portLight.position.set(-3, 7, 0);
    portGroup.add(portLight);
    this.updatables.push(() => {
      portLight.intensity = (1 - this.env.matWindow.emissiveIntensity) * 1.2;
    });

    const ship = this.makeShip();
    ship.position.set(2, 0.2, -7);
    portGroup.add(ship);
    let shipDir = 1;

    this.updatables.push((dt) => {
      ship.position.z += shipDir * dt * 1.6;
      if (ship.position.z > 7) {
        ship.position.z = 7;
        shipDir = -1;
        ship.rotation.y = Math.PI;
      }
      if (ship.position.z < -7) {
        ship.position.z = -7;
        shipDir = 1;
        ship.rotation.y = 0;
      }
      ship.position.y = 0.2 + Math.sin(performance.now() * 0.001) * 0.08;
    });

    // Air Cargo Terminal
    const airGroup = new THREE.Group();
    airGroup.position.set(40, 0, -26);
    this.outerGroup.add(airGroup);

    this.box(26, 0.1, 5, this.mat(0x3a3f49, { rough: 0.9 }), 0, 0.34, 0, airGroup, false, true);
    for (let i = -12; i <= 12; i += 2) {
      this.box(1.2, 0.04, 0.3, this.mat(P.roadLine, { rough: 0.7 }), i, 0.4, 0, airGroup);
    }
    for (let i = -12; i <= 12; i += 3) {
      this.box(0.4, 0.3, 0.4, this.env.matRunway, i, 0.5, 2.7, airGroup);
      this.box(0.4, 0.3, 0.4, this.env.matRunway, i, 0.5, -2.7, airGroup);
    }

    const gv = this.makeCar(0xffb454);
    gv.scale.setScalar(0.8);
    gv.position.set(-6, 0.5, 5);
    airGroup.add(gv);
    let gvDir = 1;

    this.updatables.push((dt) => {
      gv.position.x += gvDir * dt * 3;
      gv.rotation.y = gvDir > 0 ? Math.PI / 2 : -Math.PI / 2;
      if (gv.position.x > 4) gvDir = -1;
      if (gv.position.x < -8) gvDir = 1;
    });

    const plane = this.makePlane();
    airGroup.add(plane);

    const loopPath: [number, number, number][] = [
      [-12, 0, -9],
      [12, 0, -9],
      [12, 0, 9],
      [-12, 0, 9],
    ];
    let planeSeg = 0;
    let planeProg = 0;

    this.updatables.push((dt) => {
      planeProg += dt * 0.18;
      if (planeProg >= 1) {
        planeProg -= 1;
        planeSeg = (planeSeg + 1) % loopPath.length;
      }
      const a = loopPath[planeSeg];
      const b = loopPath[(planeSeg + 1) % loopPath.length];
      const x = a[0] + (b[0] - a[0]) * planeProg;
      const z = a[2] + (b[2] - a[2]) * planeProg;
      const y = planeSeg === 0 ? Math.sin(planeProg * Math.PI) * 7 : 0.6;

      plane.position.set(x, y + 0.6, z);
      plane.rotation.y = -Math.atan2(b[2] - a[2], b[0] - a[0]);
      plane.rotation.z = planeSeg === 0 ? -0.18 * Math.sin(planeProg * Math.PI) : 0;
    });

    // Renewable Energy Park
    const energyGroup = new THREE.Group();
    energyGroup.position.set(0, 0, 26);
    this.outerGroup.add(energyGroup);

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const panel = this.box(
          3.2,
          0.18,
          2.0,
          this.env.matSolar,
          -7 + c * 3.6,
          1.1,
          -6 + r * 3.0,
          energyGroup,
          true
        );
        panel.rotation.x = -0.5;
        this.box(0.2, 1.0, 0.2, this.mat(P.metal, { rough: 0.5 }), -7 + c * 3.6, 0.5, -6 + r * 3.0, energyGroup);
      }
    }

    const turbines: THREE.Group[] = [];
    [
      [7, -6],
      [9, 0],
      [7, 6],
    ].forEach((pSpot) => {
      const t = new THREE.Group();
      t.position.set(pSpot[0], 0, pSpot[1]);
      energyGroup.add(t);

      this.box(0.5, 9, 0.5, this.mat(P.white, { rough: 0.5 }), 0, 4.5, 0, t, true);
      this.box(0.8, 0.8, 0.8, this.mat(P.metal, { rough: 0.4 }), 0, 9, 0.4, t);

      const rotor = new THREE.Group();
      rotor.position.set(0, 9, 0.7);
      t.add(rotor);

      for (let i = 0; i < 3; i++) {
        const blade = this.box(0.4, 4.4, 0.12, this.mat(P.white, { rough: 0.5 }), 0, 2.2, 0, rotor);
        blade.rotation.z = (i * Math.PI * 2) / 3;
      }
      turbines.push(rotor);
    });

    this.updatables.push((dt) => {
      for (const rRotor of turbines) rRotor.rotation.z += dt * 1.4;
    });

    this.box(5, 3.5, 4, this.mat(0xb9c2cc, { rough: 0.5 }), -8, 1.75, 7, energyGroup, true, true);
    this.box(5.4, 0.4, 4.4, this.mat(P.roof, { rough: 0.7 }), -8, 3.7, 7, energyGroup, true);

    const indMat = new THREE.MeshStandardMaterial({
      color: 0x37d399,
      emissive: 0x37d399,
      emissiveIntensity: 1,
      roughness: 0.4,
    });
    this.disposedMaterials.push(indMat);
    this.box(0.5, 0.5, 0.5, indMat, -6, 3.0, 5.0, energyGroup);

    this.updatables.push((_dt, t) => {
      indMat.emissiveIntensity = 0.4 + (Math.sin(t * 4) > 0 ? 0.8 : 0);
    });

    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-8, 2, 7),
        new THREE.Vector3(-8, 2, 18),
        new THREE.Vector3(-18, 2, 18),
        new THREE.Vector3(-18, 2, 0),
      ].map((v) => v.clone().add(energyGroup.position))
    );

    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x34e0d8,
      emissive: 0x34e0d8,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.5,
    });
    this.disposedMaterials.push(tubeMat);

    const tubeGeo = new THREE.TubeGeometry(curve, 30, 0.12, 6, false);
    this.disposedGeometries.push(tubeGeo);
    this.outerGroup.add(new THREE.Mesh(tubeGeo, tubeMat));

    const pulseGeo = new THREE.SphereGeometry(0.4, 8, 6);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x9bfff8 });
    this.disposedGeometries.push(pulseGeo);
    this.disposedMaterials.push(pulseMat);

    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    this.outerGroup.add(pulse);

    this.updatables.push((_dt, t) => {
      pulse.position.copy(curve.getPoint((t * 0.18) % 1));
    });
  }

  private makeShip(): THREE.Group {
    const g = new THREE.Group();
    this.box(3.4, 1.4, 8, this.mat(0x2b3340, { rough: 0.5 }), 0, 0.5, 0, g, true);
    this.box(3.0, 0.3, 7.4, this.mat(0xd9534f, { rough: 0.6 }), 0, 1.25, 0, g);
    this.box(2.2, 1.6, 1.8, this.mat(P.white, { rough: 0.6 }), 0, 2.0, -3, g, true);

    const cc = [0x4f9dff, 0x37d399, 0xffb454];
    for (let i = 0; i < 3; i++) {
      this.box(2.4, 1.0, 1.4, this.mat(cc[i], { rough: 0.6 }), 0, 1.7, -0.5 + i * 1.6, g, true);
    }
    return g;
  }

  private makePlane(): THREE.Group {
    const g = new THREE.Group();
    this.box(1.4, 1.4, 7, this.mat(P.white, { rough: 0.4 }), 0, 0.7, 0, g, true);
    this.box(8, 0.25, 2.0, this.mat(0xdfe6ee, { rough: 0.4 }), 0, 0.7, 0.4, g, true);
    this.box(0.3, 1.6, 1.4, this.mat(0x4f9dff, { rough: 0.4 }), 0, 1.3, -3.2, g, true);
    this.box(2.4, 0.2, 0.9, this.mat(0xdfe6ee, { rough: 0.4 }), 0, 1.2, -3.0, g, true);
    this.box(1.2, 1.0, 1.0, this.mat(0x8fc7e8, { rough: 0.2 }), 0, 0.9, 3.0, g);
    return g;
  }

  private makeCar(color: number): THREE.Group {
    const g = new THREE.Group();
    this.box(1.7, 0.7, 3.2, this.mat(color, { rough: 0.35, metal: 0.25 }), 0, 0.6, 0, g, true);
    this.box(1.4, 0.65, 1.6, this.mat(0x8fc7e8, { rough: 0.2 }), 0, 1.1, -0.2, g);

    const wg = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 10);
    this.disposedGeometries.push(wg);
    const wm = this.mat(0x1d1d22, { rough: 0.7 });

    [
      [-0.85, 1.2],
      [0.85, 1.2],
      [-0.85, -1.2],
      [0.85, -1.2],
    ].forEach((pSpot) => {
      const wMesh = new THREE.Mesh(wg, wm);
      wMesh.rotation.z = Math.PI / 2;
      wMesh.position.set(pSpot[0], 0.4, pSpot[1]);
      g.add(wMesh);
    });

    this.box(0.35, 0.28, 0.12, this.env.matHead, -0.6, 0.65, 1.6, g);
    this.box(0.35, 0.28, 0.12, this.env.matHead, 0.6, 0.65, 1.6, g);
    return g;
  }

  private initBuildings() {
    SPECS.forEach((s) => {
      if (s.zone) this.registerZone(s);
      else this.build(s);
    });
  }

  private registerZone(s: BuildingSpec) {
    const p = PLOT[s.id];
    const height = 6;

    const pickMat = new THREE.MeshBasicMaterial({ visible: false });
    this.disposedMaterials.push(pickMat);
    const pick = this.box(p[2] * 2, height, p[3] * 2, pickMat, p[0], height / 2, p[1], this.outerGroup);
    pick.userData = { buildingId: s.id };
    this.pickWorld.push(pick);

    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x34e0d8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.disposedMaterials.push(haloMat);
    const halo = this.box(
      p[2] * 2 + 1.2,
      height + 1,
      p[3] * 2 + 1.2,
      haloMat,
      p[0],
      height / 2,
      p[1],
      this.outerGroup
    );

    this.buildings[s.id] = {
      group: null,
      pick,
      halo,
      center: [p[0], p[1]],
      height,
      data: s.data,
      name: s.name,
      selected: false,
    };
  }

  private build(s: BuildingSpec) {
    const p = PLOT[s.id];
    const w = p[2] * 2;
    const d = p[3] * 2;
    const floorH = s.industrial ? 4.2 : 3.4;
    const floors = s.floors ?? 2;
    const height = Math.max(4, floors * floorH);

    const g = new THREE.Group();
    g.position.set(p[0], 0, p[1]);
    this.outerGroup.add(g);

    const bodyMat = this.mat(s.color, { rough: 0.7 });
    this.box(w, height, d, bodyMat, 0, height / 2, 0, g, true, true);
    this.box(w + 0.6, 1.0, d + 0.6, this.mat(P.base, { rough: 0.8 }), 0, 0.5, 0, g, true, true);
    this.box(w + 0.5, 0.6, d + 0.5, this.mat(P.roof, { rough: 0.7 }), 0, height + 0.3, 0, g, true);

    if (s.id === "hq") {
      this.box(w * 0.4, 2.2, d * 0.4, this.mat(P.roof, { rough: 0.6 }), 0, height + 1.4, 0, g, true);
      this.box(0.3, 3, 0.3, this.mat(P.metal, { rough: 0.4 }), 0, height + 3.0, 0, g);
    }

    if (s.industrial) {
      for (let i = 0; i < 3; i++) {
        this.cyl(
          0.7,
          0.7,
          1.2,
          8,
          this.mat(P.metal, { rough: 0.5 }),
          -w * 0.3 + i * w * 0.3,
          height + 0.9,
          0,
          g,
          true
        );
      }
      const indMat = new THREE.MeshStandardMaterial({
        color: 0x37d399,
        emissive: 0x37d399,
        emissiveIntensity: 1,
        roughness: 0.4,
      });
      this.disposedMaterials.push(indMat);
      const ind = this.box(0.6, 0.6, 0.6, indMat, w / 2 + 0.1, height * 0.6, 0, g);
      this.updatables.push((_dt, t) => {
        indMat.emissiveIntensity = 0.4 + (Math.sin(t * 3 + p[0]) > 0 ? 0.8 : 0);
      });
    }

    if (s.win || floors > 1) {
      const paneW = 1.3;
      const paneH = 1.4;
      const cols = s.cols || 3;
      const paneGeo = new THREE.BoxGeometry(paneW, paneH, 0.18);
      this.disposedGeometries.push(paneGeo);
      const rows = floors;

      const place = (side: "N" | "S" | "E" | "W") => {
        for (let rIndex = 0; rIndex < rows; rIndex++) {
          const y = 2.0 + rIndex * floorH;
          if (y > height - 1) continue;

          for (let cIndex = 0; cIndex < cols; cIndex++) {
            const off =
              (cIndex - (cols - 1) / 2) *
              ((side === "N" || side === "S" ? w - 2 : d - 2) / cols);
            const mMesh = new THREE.Mesh(paneGeo, this.env.matWindow);

            if (side === "N") mMesh.position.set(off, y, -d / 2 - 0.05);
            else if (side === "S") mMesh.position.set(off, y, d / 2 + 0.05);
            else if (side === "E") {
              mMesh.position.set(w / 2 + 0.05, y, off);
              mMesh.rotation.y = Math.PI / 2;
            } else {
              mMesh.position.set(-w / 2 - 0.05, y, off);
              mMesh.rotation.y = Math.PI / 2;
            }
            g.add(mMesh);
          }
        }
      };
      ["N", "S", "E", "W"].forEach((side) => place(side as "N" | "S" | "E" | "W"));
    } else {
      this.box(w - 1, 0.9, 0.2, this.env.matWindow, 0, height - 1.2, -d / 2 - 0.05, g);
      this.box(w - 1, 0.9, 0.2, this.env.matWindow, 0, height - 1.2, d / 2 + 0.05, g);
    }

    if (s.docks) {
      const face =
        s.id === "warehouse" || s.id === "logistics"
          ? "N"
          : s.id === "distribution"
          ? "W"
          : "S";
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

    this.updatables.push((dt, t) => {
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
