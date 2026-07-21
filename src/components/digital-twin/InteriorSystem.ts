import * as THREE from "three";
import { FloorDef, EmployeeInfo, MachineInfo, UpdatableFn, SimulationState } from "./digitalTwinTypes";
import { WorldEnvironment } from "./WorldEnvironment";
import { P } from "./BuildingSystem";

export const FLOOR_DATA: FloorDef[] = [
  { n: 1, label: "Operations", dept: "Operations", emp: 96, accent: 0x34e0d8 },
  { n: 2, label: "Finance", dept: "Finance & Control", emp: 58, accent: 0x4f9dff },
  { n: 3, label: "Human Resources", dept: "People & Culture", emp: 42, accent: 0x37d399 },
  { n: 4, label: "Executive Leadership", dept: "C-Suite", emp: 14, accent: 0x9b7bff },
  { n: 5, label: "AI Command Center", dept: "AI & Automation", emp: 30, accent: 0xff8a3c },
];

export const EMPLOYEES: EmployeeInfo[] = [
  { name: "Arjun Mehta", role: "Operations Analyst", status: "Active", productivity: 92, desk: "D1" },
  { name: "Lena Fischer", role: "Finance Controller", status: "Active", productivity: 88, desk: "D2" },
  { name: "Sofia Romano", role: "HR Business Partner", status: "In Meeting", productivity: 81, desk: "D3" },
  { name: "Kenji Watanabe", role: "AI Engineer", status: "Active", productivity: 95, desk: "D4" },
  { name: "Amara Okafor", role: "Supply-Chain Lead", status: "Active", productivity: 90, desk: "D5" },
];

export const MACHINES: MachineInfo[] = [
  { name: "Heavy Assembly Cell 01", id: "MAC-A01", status: "Running", temp: 64, power: 820, output: "3,900 u/d", eff: 93, risk: "Low" },
  { name: "Heavy Assembly Cell 02", id: "MAC-A02", status: "Running", temp: 71, power: 860, output: "4,050 u/d", eff: 91, risk: "Low" },
  { name: "Heavy Assembly Cell 03", id: "MAC-A03", status: "Running", temp: 68, power: 890, output: "4,200 u/d", eff: 94, risk: "Low" },
  { name: "Weld & Paint Booth 04", id: "MAC-B04", status: "Running", temp: 58, power: 540, output: "2,600 u/d", eff: 89, risk: "Med" },
];

export interface OfficeBuildResult {
  group: THREE.Group;
  updatables: UpdatableFn[];
  pick: THREE.Mesh[];
  accentMeshes: THREE.Mesh[];
  screenMeshes: THREE.Mesh[];
}

export interface FactoryBuildResult {
  group: THREE.Group;
  updatables: UpdatableFn[];
  pick: THREE.Mesh[];
}

export class InteriorSystem {
  public hqGroup!: THREE.Group;
  public facGroup!: THREE.Group;
  public hqPick: THREE.Mesh[] = [];
  public facPick: THREE.Mesh[] = [];

  private hqOffice!: OfficeBuildResult;
  private facFactory!: FactoryBuildResult;
  private matCache = new Map<string, THREE.MeshStandardMaterial>();
  private disposedGeometries: THREE.BufferGeometry[] = [];
  private disposedMaterials: THREE.Material[] = [];

  constructor(
    private scene: THREE.Scene,
    private updatables: UpdatableFn[],
    private env: WorldEnvironment
  ) {
    this.initInteriors();
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
    parent?: THREE.Group,
    castShadow = false,
    receiveShadow = false
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(w, h, d);
    this.disposedGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
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
    parent?: THREE.Group,
    castShadow = false
  ): THREE.Mesh {
    const geo = new THREE.CylinderGeometry(rt, rb, h, seg);
    this.disposedGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = castShadow;
    if (parent) parent.add(mesh);
    return mesh;
  }

  private makePerson(shirtColor: number, hardhat = false): THREE.Group {
    const g = new THREE.Group();
    this.box(0.7, 1.1, 0.45, this.mat(shirtColor, { rough: 0.6 }), 0, 1.3, 0, g, true);
    this.box(0.5, 0.5, 0.5, this.mat(0xe8b48c, { rough: 0.6 }), 0, 2.1, 0, g, true);

    if (hardhat) {
      this.box(0.6, 0.2, 0.6, this.mat(0xffd24a, { rough: 0.5 }), 0, 2.4, 0, g);
    }
    this.box(0.25, 0.9, 0.25, this.mat(0x2b3340, { rough: 0.6 }), -0.22, 0.5, 0, g);
    this.box(0.25, 0.9, 0.25, this.mat(0x2b3340, { rough: 0.6 }), 0.22, 0.5, 0, g);
    return g;
  }

  private makePlant(): THREE.Group {
    const g = new THREE.Group();
    this.cyl(0.5, 0.4, 0.8, 8, this.mat(0xb07a3c, { rough: 0.7 }), 0, 0.4, 0, g);
    this.box(0.1, 1.4, 0.1, this.mat(P.leafDk, { rough: 0.7, flat: true }), 0, 1.4, 0, g);

    const icoGeo = new THREE.IcosahedronGeometry(0.9, 0);
    this.disposedGeometries.push(icoGeo);
    const leafMat = this.mat(P.leaf, { rough: 0.8, flat: true });
    const leaf = new THREE.Mesh(icoGeo, leafMat);
    leaf.position.y = 2.0;
    leaf.castShadow = true;
    g.add(leaf);
    return g;
  }

  private initInteriors() {
    this.hqOffice = this.buildOffice();
    this.hqGroup = this.hqOffice.group;
    this.hqGroup.visible = false;
    this.scene.add(this.hqGroup);
    this.hqPick = this.hqOffice.pick;
    this.hqOffice.updatables.forEach((fn) => this.updatables.push(fn));

    this.facFactory = this.buildFactory();
    this.facGroup = this.facFactory.group;
    this.facGroup.visible = false;
    this.scene.add(this.facGroup);
    this.facPick = this.facFactory.pick;
    this.facFactory.updatables.forEach((fn) => this.updatables.push(fn));
  }

  public setHQFloor(n: number) {
    const fd = FLOOR_DATA[n - 1] || FLOOR_DATA[0];
    const col = new THREE.Color(fd.accent);

    this.hqOffice.accentMeshes.forEach((m) =>
      (m.material as THREE.MeshStandardMaterial).color.copy(col)
    );
    this.hqOffice.screenMeshes.forEach((m) =>
      (m.material as THREE.MeshStandardMaterial).emissive.copy(col)
    );
  }

  private buildOffice(): OfficeBuildResult {
    const group = new THREE.Group();
    const W = 30;
    const D = 24;
    const H = 9;
    const updatables: UpdatableFn[] = [];
    const pick: THREE.Mesh[] = [];
    const accentMeshes: THREE.Mesh[] = [];
    const screenMeshes: THREE.Mesh[] = [];

    this.box(W, 0.4, D, this.mat(0x243246, { rough: 0.6 }), 0, 0, 0, group, false, true);
    this.box(W, H, 0.4, this.mat(0xdfe4ec, { rough: 0.7 }), 0, H / 2, -D / 2, group, false, true);
    this.box(0.4, H, D, this.mat(0xdfe4ec, { rough: 0.7 }), -W / 2, H / 2, 0, group, false, true);

    for (let i = 0; i < 4; i++) {
      this.box(5, 3.4, 0.2, this.env.matWindow, -9 + i * 6, 4.6, -D / 2 + 0.1, group);
    }

    const stripeMat = new THREE.MeshStandardMaterial({
      color: FLOOR_DATA[0].accent,
      roughness: 0.4,
      emissive: FLOOR_DATA[0].accent,
      emissiveIntensity: 0.5,
    });
    this.disposedMaterials.push(stripeMat);
    const stripe = this.box(W, 0.5, 0.1, stripeMat, 0, H - 1.2, -D / 2 + 0.25, group);
    accentMeshes.push(stripe);

    const deskMat = this.mat(0xeef2f7, { rough: 0.5 });
    const monMat = this.mat(0x11151c, { rough: 0.3 });
    let ei = 0;

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const x = -8 + c * 7;
        const z = -3 + r * 7;

        this.box(3.4, 0.18, 1.6, deskMat, x, 1.5, z, group, true, true);
        this.box(0.2, 1.5, 1.4, this.mat(0xb9c2cc, { rough: 0.5 }), x - 1.5, 0.75, z, group);
        this.box(0.2, 1.5, 1.4, this.mat(0xb9c2cc, { rough: 0.5 }), x + 1.5, 0.75, z, group);

        this.box(1.6, 1.0, 0.12, monMat, x, 2.4, z - 0.4, group, true);

        const scrMat = new THREE.MeshStandardMaterial({
          color: 0x0a0f17,
          emissive: FLOOR_DATA[0].accent,
          emissiveIntensity: 0.8,
          roughness: 0.3,
        });
        this.disposedMaterials.push(scrMat);
        const scr = this.box(1.4, 0.8, 0.05, scrMat, x, 2.4, z - 0.34, group);
        screenMeshes.push(scr);

        this.box(1.0, 0.2, 1.0, this.mat(0x333842, { rough: 0.5 }), x, 1.0, z + 1.3, group);
        this.box(1.0, 1.2, 0.2, this.mat(0x333842, { rough: 0.5 }), x, 1.6, z + 1.8, group);

        const shirtCols = [0x4f9dff, 0x37d399, 0xff8a3c, 0x9b7bff, 0xef7e72];
        const emp = this.makePerson(shirtCols[ei % 5]);
        emp.position.set(x, 0, z + 1.1);
        group.add(emp);

        const info = EMPLOYEES[ei % EMPLOYEES.length];
        const pickMat = new THREE.MeshBasicMaterial({ visible: false });
        this.disposedMaterials.push(pickMat);

        const pb = this.box(2.4, 3, 2.4, pickMat, x, 1.5, z + 0.6, group);
        pb.userData = {
          empInfo: {
            name: info.name,
            role: info.role,
            status: info.status,
            productivity: info.productivity,
            desk: `D${r * 3 + c + 1}`,
          },
        };
        pick.push(pb);

        const phase = ei * 1.3;
        updatables.push((_dt, t) => {
          emp.position.y = Math.sin(t * 1.5 + phase) * 0.05;
        });
        ei++;
      }
    }

    // Executive Table
    this.box(5, 0.2, 2.4, this.mat(0xb07a3c, { rough: 0.5 }), 9, 1.4, -7, group, true, true);
    for (let i = 0; i < 4; i++) {
      this.box(0.9, 0.2, 0.9, this.mat(0x333842, { rough: 0.5 }), 7 + i * 1.4, 0.9, -5.4, group);
    }
    for (let i = 0; i < 2; i++) {
      const pPerson = this.makePerson(0x9b7bff);
      pPerson.position.set(8 + i * 2, 0, -8.4);
      group.add(pPerson);
    }

    // Storage Shelves
    for (let s = 0; s < 3; s++) {
      this.box(0.6, 4, 2.4, this.mat(0xeef2f7, { rough: 0.5 }), -W / 2 + 0.6, 2, -6 + s * 5, group, true);
      for (let b = 0; b < 4; b++) {
        const fileCols = [0xef7e72, 0x4f9dff, 0x37d399, 0xffb454];
        this.box(0.5, 0.5, 2.2, this.mat(fileCols[b], { rough: 0.6 }), -W / 2 + 0.7, 0.8 + b * 1.0, -6 + s * 5, group);
      }
    }

    // AI Command Wall
    const aiWall = this.box(8, 3.4, 0.3, this.mat(0x11151c, { rough: 0.3 }), W / 2 - 1.5, 3.2, 4, group, true);
    aiWall.rotation.y = -Math.PI / 2;

    for (let i = 0; i < 3; i++) {
      const scMat = new THREE.MeshStandardMaterial({
        color: 0x061018,
        emissive: FLOOR_DATA[0].accent,
        emissiveIntensity: 0.9,
        roughness: 0.3,
      });
      this.disposedMaterials.push(scMat);
      const sc = this.box(2.2, 2.4, 0.1, scMat, W / 2 - 1.7, 3.2, 1.4 + i * 2.6, group);
      sc.rotation.y = -Math.PI / 2;
      screenMeshes.push(sc);
    }

    const aiStripeMat = new THREE.MeshStandardMaterial({
      color: FLOOR_DATA[0].accent,
      roughness: 0.4,
      emissive: FLOOR_DATA[0].accent,
      emissiveIntensity: 0.6,
    });
    this.disposedMaterials.push(aiStripeMat);
    const aiStripe = this.box(0.2, 0.4, 8, aiStripeMat, W / 2 - 1.4, 5.2, 4, group);
    accentMeshes.push(aiStripe);

    // Plants
    [
      [-12, 8],
      [12, 8],
      [-12, -9],
    ].forEach((pSpot) => {
      const pl = this.makePlant();
      pl.position.set(pSpot[0], 0, pSpot[1]);
      group.add(pl);
    });

    // Walkers
    const walkers: { obj: THREE.Group; path: [number, number][]; seg: number; prog: number }[] = [];
    for (let i = 0; i < 2; i++) {
      const p = this.makePerson(i ? 0x37d399 : 0x4f9dff);
      group.add(p);
      walkers.push({
        obj: p,
        path: [
          [-10, 6],
          [10, 6],
          [10, -2],
          [-10, -2],
        ],
        seg: i * 2,
        prog: 0,
      });
    }

    updatables.push((dt) => {
      for (const w of walkers) {
        w.prog += dt * 0.25;
        const a = w.path[w.seg];
        const b = w.path[(w.seg + 1) % w.path.length];
        if (w.prog >= 1) {
          w.prog = 0;
          w.seg = (w.seg + 1) % w.path.length;
        }
        w.obj.position.set(a[0] + (b[0] - a[0]) * w.prog, 0, a[1] + (b[1] - a[1]) * w.prog);
        w.obj.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]);
      }
    });

    const fill = new THREE.PointLight(0xffffff, 0.6, 60, 2);
    fill.position.set(0, 8, 0);
    group.add(fill);
    updatables.push(() => {
      fill.intensity = 0.5 + (1 - this.env.matWindow.emissiveIntensity) * 0.6;
    });

    return { group, updatables, pick, accentMeshes, screenMeshes };
  }

  private buildFactory(): FactoryBuildResult {
    const group = new THREE.Group();
    const W = 34;
    const D = 26;
    const updatables: UpdatableFn[] = [];
    const pick: THREE.Mesh[] = [];

    this.box(W, 0.4, D, this.mat(0x9aa3ad, { rough: 0.7 }), 0, 0, 0, group, false, true);

    for (let i = 0; i < 6; i++) {
      this.box(W, 0.05, 0.4, this.mat(0xffd24a, { rough: 0.6 }), 0, 0.22, -10 + i * 4, group);
    }
    this.box(W, 8, 0.4, this.mat(0xc9cdd4, { rough: 0.7 }), 0, 4, -D / 2, group, false, true);
    this.box(0.4, 8, D, this.mat(0xc9cdd4, { rough: 0.7 }), -W / 2, 4, 0, group, false, true);

    for (let i = 0; i < 4; i++) {
      this.box(5, 2.4, 0.2, this.env.matWindow, -9 + i * 7, 5.4, -D / 2 + 0.1, group);
    }

    // Conveyor Lines
    for (let line = 0; line < 2; line++) {
      const z = -5 + line * 9;
      this.box(26, 0.5, 1.4, this.mat(0x3a3f49, { rough: 0.5 }), 0, 1.0, z, group, true, true);
      this.box(25, 0.12, 1.1, this.mat(0x1d1d22, { rough: 0.6 }), 0, 1.3, z, group);

      const stripes: THREE.Mesh[] = [];
      for (let i = 0; i < 14; i++) {
        const s = this.box(0.3, 0.05, 1.0, this.mat(0x444a55, { rough: 0.6 }), -12 + i * 1.9, 1.37, z, group);
        stripes.push(s);
      }

      updatables.push((_dt, t) => {
        const off = (t * 3) % 1.9;
        stripes.forEach((s, i) => {
          let x = -12 + i * 1.9 + off;
          if (x > 13) x -= 26.6;
          s.position.x = x;
        });
      });

      for (let b = 0; b < 5; b++) {
        const boxCols = [0xb07a3c, 0xd9534f, 0x4f9dff];
        const bx = this.box(1.0, 1.0, 1.0, this.mat(boxCols[b % 3], { rough: 0.6 }), 0, 1.9, z, group, true);
        const phase = b / 5;
        updatables.push((_dt, t) => {
          bx.position.x = ((t * 0.18 + phase) % 1) * 26 - 13;
        });
      }

      const arm = this.makeRobotArm();
      arm.position.set(-4 + line * 8, 1.3, z - 2.2);
      group.add(arm);
      const pivot = arm.userData.pivot as THREE.Group;
      const fore = arm.userData.fore as THREE.Group;

      updatables.push((_dt, t) => {
        pivot.rotation.z = Math.sin(t * 1.6 + line) * 0.7;
        fore.rotation.z = -Math.abs(Math.sin(t * 1.6 + line)) * 0.8 - 0.2;
      });
    }

    // Machine Cells
    MACHINES.forEach((md, i) => {
      const x = -12 + (i % 2) * 24;
      const z = i < 2 ? -10 : 8;
      const mg = new THREE.Group();
      mg.position.set(x, 0, z);
      group.add(mg);

      this.box(3.4, 3.4, 3.0, this.mat(0x6b7280, { rough: 0.5, metal: 0.3 }), 0, 1.7, 0, mg, true, true);
      this.box(2.4, 1.4, 0.2, this.mat(0x11151c, { rough: 0.3 }), 0, 2.4, 1.55, mg);

      const rot = this.cyl(0.7, 0.7, 0.4, 12, this.mat(P.orange, { rough: 0.4 }), 0, 3.5, 0, mg, true);
      updatables.push((dt) => {
        rot.rotation.y += dt * 3;
      });

      const warnMat = new THREE.MeshStandardMaterial({
        color: 0x37d399,
        emissive: 0x37d399,
        emissiveIntensity: 1,
        roughness: 0.4,
      });
      this.disposedMaterials.push(warnMat);

      const warn = this.box(0.4, 0.4, 0.4, warnMat, 1.4, 3.2, 1.2, mg);
      updatables.push((_dt, t) => {
        const blink = Math.sin(t * 3 + i) > 0;
        warnMat.emissiveIntensity = blink ? 1 : 0.25;
        warnMat.color.set(md.risk === "Med" ? 0xffb454 : 0x37d399);
        warnMat.emissive.copy(warnMat.color);
      });

      const pickMat = new THREE.MeshBasicMaterial({ visible: false });
      this.disposedMaterials.push(pickMat);
      const pb = this.box(3.6, 3.6, 3.2, pickMat, 0, 1.8, 0, mg);
      pb.userData = {
        machInfo: {
          name: md.name,
          id: md.id,
          status: md.status,
          temp: md.temp,
          power: md.power,
          output: md.output,
          eff: md.eff,
          risk: md.risk,
        },
      };
      pick.push(pb);
    });

    // Pallets
    for (let i = 0; i < 4; i++) {
      const sx = 12 + (i % 2) * 2.4;
      const sz = 8 + Math.floor(i / 2) * 2.4;
      this.box(1.8, 0.3, 1.8, this.mat(0xb07a3c, { rough: 0.7 }), sx, 0.35, sz, group, true);
      const pCols = [0xd9534f, 0x4f9dff, 0x37d399, 0xffb454];
      this.box(1.6, 1.2, 1.6, this.mat(pCols[i], { rough: 0.6 }), sx, 1.1, sz, group, true);
    }

    // Workers
    const workers: { obj: THREE.Group; path: [number, number][]; seg: number; prog: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const p = this.makePerson(0xff8a3c, true);
      group.add(p);
      workers.push({
        obj: p,
        path: [
          [-12, -2],
          [12, -2],
          [12, 4],
          [-12, 4],
        ],
        seg: i,
        prog: i * 0.3,
      });
    }

    updatables.push((dt) => {
      for (const w of workers) {
        w.prog += dt * 0.22;
        const a = w.path[w.seg];
        const b = w.path[(w.seg + 1) % w.path.length];
        if (w.prog >= 1) {
          w.prog = 0;
          w.seg = (w.seg + 1) % w.path.length;
        }
        w.obj.position.set(a[0] + (b[0] - a[0]) * w.prog, 0, a[1] + (b[1] - a[1]) * w.prog);
        w.obj.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]);
      }
    });

    // Forklift
    const fk = this.makeForklift();
    group.add(fk);
    let fdir = 1;

    updatables.push((dt) => {
      fk.position.x += fdir * dt * 3;
      fk.rotation.y = fdir > 0 ? Math.PI / 2 : -Math.PI / 2;
      if (fk.position.x > 10) fdir = -1;
      if (fk.position.x < -10) fdir = 1;
      fk.position.z = 0;
    });

    const il = new THREE.PointLight(0xffffff, 0.5, 50, 2);
    il.position.set(0, 7, 0);
    group.add(il);
    updatables.push(() => {
      il.intensity = 0.5 + (1 - this.env.matWindow.emissiveIntensity) * 0.6;
    });

    return { group, updatables, pick };
  }

  private makeRobotArm(): THREE.Group {
    const g = new THREE.Group();
    this.box(1.2, 0.6, 1.2, this.mat(0x333842, { rough: 0.5 }), 0, 0.3, 0, g, true);

    const pivot = new THREE.Group();
    pivot.position.set(0, 0.6, 0);
    g.add(pivot);
    this.box(0.6, 2.4, 0.6, this.mat(P.orange, { rough: 0.4 }), 0, 1.2, 0, pivot, true);

    const fore = new THREE.Group();
    fore.position.set(0, 2.4, 0);
    pivot.add(fore);
    this.box(0.4, 1.8, 0.4, this.mat(P.orange, { rough: 0.4 }), 0, 0.9, 0, fore, true);
    this.box(0.5, 0.3, 0.5, this.mat(0x333842, { rough: 0.5 }), 0, 1.8, 0, fore, true);

    g.userData = { pivot, fore };
    return g;
  }

  private makeForklift(): THREE.Group {
    const g = new THREE.Group();
    this.box(1.3, 1.0, 2.0, this.mat(P.orange, { rough: 0.4 }), 0, 0.7, 0, g, true);
    this.box(1.0, 0.9, 0.9, this.mat(0x8fc7e8, { rough: 0.2 }), 0, 1.3, -0.3, g);
    this.box(0.2, 2.2, 0.2, this.mat(P.metal, { rough: 0.4 }), 0.5, 1.1, 1.2, g);
    this.box(0.2, 2.2, 0.2, this.mat(P.metal, { rough: 0.4 }), -0.5, 1.1, 1.2, g);
    this.box(1.2, 0.15, 0.9, this.mat(P.metal, { rough: 0.4 }), 0, 0.9, 1.5, g);
    this.box(1.0, 0.9, 1.0, this.mat(0x4f9dff, { rough: 0.6 }), 0, 1.5, 1.6, g, true);
    return g;
  }

  public dispose() {
    this.disposedGeometries.forEach((g) => g.dispose());
    this.disposedMaterials.forEach((m) => m.dispose());
    this.matCache.clear();
  }
}
