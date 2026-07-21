import * as THREE from "three";
import { SimulationState, UpdatableFn } from "./digitalTwinTypes";
import { BuildingSystem, P } from "./BuildingSystem";
import { WorldEnvironment } from "./WorldEnvironment";

export class PathFollower {
  public pts: THREE.Vector3[];
  public alt: THREE.Vector3[] | null;
  public speed: number;
  public baseSpeed: number;
  public loop: boolean;
  public stop: number;
  public seg = 0;
  public prog = 0;
  public dir = 1;
  public wait = 0;
  public useAlt = false;

  constructor(
    points: THREE.Vector3[],
    options: { speed?: number; loop?: boolean; stop?: number; alt?: THREE.Vector3[] | null } = {}
  ) {
    this.pts = points;
    this.alt = options.alt ?? null;
    this.speed = options.speed ?? 6;
    this.baseSpeed = this.speed;
    this.loop = !!options.loop;
    this.stop = options.stop ?? 0;
  }

  public active(): THREE.Vector3[] {
    return this.useAlt && this.alt ? this.alt : this.pts;
  }

  public update(dt: number, obj: THREE.Object3D) {
    if (this.pts.length < 2) return;
    if (this.wait > 0) {
      this.wait -= dt;
      return;
    }
    const pts = this.active();
    const a = pts[this.seg];
    const b = pts[(this.seg + this.dir + pts.length) % pts.length];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz) || 0.0001;
    this.prog += (this.speed * dt) / len;

    const yaw = Math.atan2(dx, dz);
    obj.rotation.y += (yaw - obj.rotation.y) * Math.min(1, dt * 8);

    if (this.prog >= 1) {
      this.prog = 0;
      if (this.loop) {
        this.seg = (this.seg + 1) % pts.length;
      } else {
        let next = this.seg + this.dir;
        if (next >= pts.length - 1) {
          next = pts.length - 1;
          this.dir = -1;
          this.wait = this.stop;
        } else if (next <= 0) {
          next = 0;
          this.dir = 1;
          this.wait = this.stop;
        }
        this.seg = next;
      }
    }

    const ca = pts[this.seg];
    const cb = pts[(this.seg + this.dir + pts.length) % pts.length];
    obj.position.set(
      ca.x + (cb.x - ca.x) * this.prog,
      obj.position.y,
      ca.z + (cb.z - ca.z) * this.prog
    );
  }
}

export interface VehicleRecord {
  obj: THREE.Group;
  f: PathFollower;
  kind: "car" | "truck" | "logistics" | "forklift";
}

export class VehicleSystem {
  public fleet: VehicleRecord[] = [];
  public blockedMat!: THREE.MeshStandardMaterial;
  public altMat!: THREE.MeshStandardMaterial;
  private lastBlocked = false;
  private disposedGeometries: THREE.BufferGeometry[] = [];
  private disposedMaterials: THREE.Material[] = [];

  constructor(
    private outerGroup: THREE.Group,
    private updatables: UpdatableFn[],
    private bSystem: BuildingSystem,
    private env: WorldEnvironment
  ) {
    this.initFleet();
    this.buildSimRoads();
  }

  private box(w: number, h: number, d: number, m: THREE.Material, parent: THREE.Group): THREE.Mesh {
    const geo = new THREE.BoxGeometry(w, h, d);
    this.disposedGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, m);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }

  private mat(
    color: number,
    o: { rough?: number; metal?: number } = {}
  ): THREE.MeshStandardMaterial {
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: o.rough ?? 0.85,
      metalness: o.metal ?? 0,
    });
    this.disposedMaterials.push(m);
    return m;
  }

  private wheels(g: THREE.Group, r: number, pos: [number, number][]) {
    const geo = new THREE.CylinderGeometry(r, r, 0.3, 10);
    this.disposedGeometries.push(geo);
    const m = this.mat(0x1d1d22, { rough: 0.7 });
    pos.forEach((p) => {
      const w = new THREE.Mesh(geo, m);
      w.rotation.z = Math.PI / 2;
      w.position.set(p[0], r, p[1]);
      w.castShadow = true;
      g.add(w);
    });
  }

  private makeCar(color: number): THREE.Group {
    const g = new THREE.Group();
    this.box(1.7, 0.7, 3.2, this.mat(color, { rough: 0.35, metal: 0.25 }), g).position.set(0, 0.6, 0);
    this.box(1.4, 0.65, 1.6, this.mat(0x8fc7e8, { rough: 0.2 }), g).position.set(0, 1.1, -0.2);
    this.wheels(g, 0.42, [
      [-0.85, 1.2],
      [0.85, 1.2],
      [-0.85, -1.2],
      [0.85, -1.2],
    ]);
    this.box(0.35, 0.28, 0.12, this.env.matHead, g).position.set(-0.6, 0.65, 1.6);
    this.box(0.35, 0.28, 0.12, this.env.matHead, g).position.set(0.6, 0.65, 1.6);
    return g;
  }

  private makeTruck(color: number): THREE.Group {
    const g = new THREE.Group();
    this.box(2.0, 1.4, 2.2, this.mat(color, { rough: 0.4, metal: 0.2 }), g).position.set(0, 1.0, 1.4);
    this.box(1.7, 1.0, 1.0, this.mat(0x8fc7e8, { rough: 0.2 }), g).position.set(0, 1.5, 1.7);
    this.box(2.2, 1.8, 3.4, this.mat(0xeef2f7, { rough: 0.6 }), g).position.set(0, 1.2, -1.4);
    this.wheels(g, 0.5, [
      [-1.0, 1.6],
      [1.0, 1.6],
      [-1.0, -1.6],
      [1.0, -1.6],
      [-1.0, -2.6],
      [1.0, -2.6],
    ]);
    this.box(0.4, 0.3, 0.12, this.env.matHead, g).position.set(-0.7, 0.8, 2.5);
    this.box(0.4, 0.3, 0.12, this.env.matHead, g).position.set(0.7, 0.8, 2.5);
    return g;
  }

  private makeForklift(): THREE.Group {
    const g = new THREE.Group();
    this.box(1.3, 1.0, 2.0, this.mat(P.orange, { rough: 0.4 }), g).position.set(0, 0.7, 0);
    this.box(1.0, 0.9, 0.9, this.mat(0x8fc7e8, { rough: 0.2 }), g).position.set(0, 1.3, -0.3);
    this.box(0.2, 2.2, 0.2, this.mat(P.metal, { rough: 0.4 }), g).position.set(0.5, 1.1, 1.2);
    this.box(0.2, 2.2, 0.2, this.mat(P.metal, { rough: 0.4 }), g).position.set(-0.5, 1.1, 1.2);
    this.box(1.2, 0.15, 0.9, this.mat(P.metal, { rough: 0.4 }), g).position.set(0, 0.5, 1.5);
    this.box(1.0, 0.9, 1.0, this.mat(0xb07a3c, { rough: 0.7 }), g).position.set(0, 1.0, 1.6);
    this.wheels(g, 0.35, [
      [-0.6, 0.8],
      [0.6, 0.8],
      [-0.6, -0.8],
      [0.6, -0.8],
    ]);
    return g;
  }

  private initFleet() {
    const R = this.bSystem.roads;
    const carCols = [0xef7e72, 0xf4e285, 0x9fd0e6, 0xc3b1e8, 0x9fe0b8];

    for (let i = 0; i < 5; i++) {
      const car = this.makeCar(carCols[i % 5]);
      this.outerGroup.add(car);
      const f = new PathFollower(R.ring, { speed: 7 + i * 1.3, loop: true });
      f.seg = i % 4;
      f.prog = (i * 0.23) % 1;
      this.fleet.push({ obj: car, f, kind: "car" });
    }

    const cH = this.makeCar(0x4f9dff);
    this.outerGroup.add(cH);
    this.fleet.push({ obj: cH, f: new PathFollower(R.h1, { speed: 8, stop: 0.6 }), kind: "car" });

    const cV = this.makeCar(0x37d399);
    this.outerGroup.add(cV);
    this.fleet.push({ obj: cV, f: new PathFollower(R.v1, { speed: 7, stop: 0.6 }), kind: "car" });

    const t1 = this.makeTruck(0x4f9dff);
    this.outerGroup.add(t1);
    this.fleet.push({ obj: t1, f: new PathFollower(R.fw, { speed: 6, stop: 1.4 }), kind: "truck" });

    const t2 = this.makeTruck(0x37d399);
    this.outerGroup.add(t2);
    this.fleet.push({
      obj: t2,
      f: new PathFollower(R.logN, { speed: 6, stop: 1.2, alt: R.logA }),
      kind: "logistics",
    });

    const t3 = this.makeTruck(0xffb454);
    this.outerGroup.add(t3);
    this.fleet.push({ obj: t3, f: new PathFollower(R.dist, { speed: 5.5, stop: 1.2 }), kind: "truck" });

    const fk = this.makeForklift();
    this.outerGroup.add(fk);
    this.fleet.push({ obj: fk, f: new PathFollower(R.fork, { speed: 3, stop: 0.8 }), kind: "forklift" });
  }

  public updateAll(dt: number, sim: SimulationState) {
    if (sim.blocked !== this.lastBlocked) {
      this.lastBlocked = sim.blocked;
      for (const v of this.fleet) {
        if (v.kind === "logistics") {
          v.f.seg = 0;
          v.f.prog = 0;
          v.f.dir = 1;
          v.f.wait = 0;
        }
      }
    }
    for (const v of this.fleet) {
      let s = v.f.baseSpeed;
      if (sim.active && v.kind === "logistics") s *= sim.slow;
      if (v.kind === "forklift") s = v.f.baseSpeed * sim.warehouseBoost;
      v.f.speed = s;
      if (v.kind === "logistics") v.f.useAlt = sim.blocked;
      v.f.update(dt, v.obj);
    }
  }

  private buildSimRoads() {
    this.blockedMat = new THREE.MeshStandardMaterial({
      color: 0xff5252,
      emissive: 0xff5252,
      emissiveIntensity: 0,
      transparent: true,
      opacity: 0,
      roughness: 0.6,
    });
    this.disposedMaterials.push(this.blockedMat);

    const bGeo = new THREE.BoxGeometry(12, 0.16, 6.4);
    this.disposedGeometries.push(bGeo);
    const bMesh = new THREE.Mesh(bGeo, this.blockedMat);
    bMesh.position.set(24, 0.45, 0);
    this.outerGroup.add(bMesh);

    this.altMat = new THREE.MeshStandardMaterial({
      color: 0x34e0d8,
      emissive: 0x34e0d8,
      emissiveIntensity: 0,
      transparent: true,
      opacity: 0,
      roughness: 0.5,
    });
    this.disposedMaterials.push(this.altMat);

    const aGeo1 = new THREE.BoxGeometry(2.2, 0.16, 20);
    const aGeo2 = new THREE.BoxGeometry(12, 0.16, 2.2);
    this.disposedGeometries.push(aGeo1, aGeo2);

    const m1 = new THREE.Mesh(aGeo1, this.altMat);
    m1.position.set(30, 0.46, 10);
    const m2 = new THREE.Mesh(aGeo2, this.altMat);
    m2.position.set(24, 0.46, 20);
    const m3 = new THREE.Mesh(aGeo1, this.altMat);
    m3.position.set(18, 0.46, 10);
    this.outerGroup.add(m1, m2, m3);

    this.updatables.push((dt, t, simState?: SimulationState) => {
      const isBlocked = simState ? simState.blocked : false;
      this.blockedMat.opacity += ((isBlocked ? 0.7 : 0) - this.blockedMat.opacity) * Math.min(1, dt * 6);
      this.blockedMat.emissiveIntensity = isBlocked ? 0.6 + Math.sin(t * 6) * 0.4 : 0;
      const aT = isBlocked ? 0.5 + Math.sin(t * 4) * 0.2 : 0;
      this.altMat.opacity += (aT - this.altMat.opacity) * Math.min(1, dt * 6);
      this.altMat.emissiveIntensity = isBlocked ? 1.0 : 0;
    });
  }

  public dispose() {
    this.disposedGeometries.forEach((g) => g.dispose());
    this.disposedMaterials.forEach((m) => m.dispose());
  }
}
