import * as THREE from "three";
import { DigitalTwinState, FacilityId } from "./digitalTwinTypes";
import { BuildingSystem } from "./BuildingSystem";
import { CameraController } from "./CameraController";

export interface InfoCardData {
  title: string;
  rows: [string, string][];
}

export class InteractionSystem {
  private raycaster = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private pointerDownState: { x: number; y: number; t: number } | null = null;
  private cleanups: (() => void)[] = [];

  constructor(
    private domElement: HTMLCanvasElement,
    private camera: THREE.PerspectiveCamera,
    private pickWorld: THREE.Object3D[],
    private hqPick: THREE.Object3D[],
    private facPick: THREE.Object3D[],
    private bSystem: BuildingSystem,
    private camController: CameraController,
    private state: DigitalTwinState,
    private onToggleDayNight: () => void,
    private onShowInfoCard: (info: InfoCardData) => void,
    private onSetHovered: (id: FacilityId | null) => void,
    private onSetTooltip: (text: string, x: number, y: number, show: boolean) => void
  ) {
    this.initEvents();
  }

  private initEvents() {
    const onPointerMove = (e: PointerEvent) => this.onMove(e);
    const onPointerDown = (e: PointerEvent) => {
      this.pointerDownState = { x: e.clientX, y: e.clientY, t: performance.now() };
    };
    const onPointerUp = (e: PointerEvent) => this.onUp(e);
    const onPointerLeave = () => this.clearHover();

    this.domElement.addEventListener("pointermove", onPointerMove);
    this.domElement.addEventListener("pointerdown", onPointerDown);
    this.domElement.addEventListener("pointerup", onPointerUp);
    this.domElement.addEventListener("pointerleave", onPointerLeave);

    this.cleanups.push(() => {
      this.domElement.removeEventListener("pointermove", onPointerMove);
      this.domElement.removeEventListener("pointerdown", onPointerDown);
      this.domElement.removeEventListener("pointerup", onPointerUp);
      this.domElement.removeEventListener("pointerleave", onPointerLeave);
    });
  }

  private getPickList(): THREE.Object3D[] {
    const m = this.state.mode;
    if (m === "WORLD") return this.pickWorld;
    if (m === "HQ_INTERIOR") return this.hqPick;
    if (m === "FACTORY_INTERIOR") return this.facPick;
    return [];
  }

  private pick(e: PointerEvent): THREE.Object3D | null {
    const r = this.domElement.getBoundingClientRect();
    this.ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    this.ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    this.raycaster.setFromCamera(this.ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.getPickList(), false);
    return hits.length ? hits[0].object : null;
  }

  private onMove(e: PointerEvent) {
    if (this.state.isMobile) return;
    const obj = this.pick(e);
    if (!obj) {
      this.clearHover();
      return;
    }

    this.onSetTooltip("", e.clientX, e.clientY, true);
    this.domElement.style.cursor = "pointer";

    if (obj.userData.isSun) {
      this.onSetTooltip(
        this.state.isNight ? "Moon — click for Day" : "Sun — click for Night",
        e.clientX,
        e.clientY,
        true
      );
      this.setHover(null);
      return;
    }

    if (obj.userData.buildingId) {
      const b = this.bSystem.buildings[obj.userData.buildingId as FacilityId];
      if (b) {
        this.onSetTooltip(b.name, e.clientX, e.clientY, true);
        this.setHover(obj.userData.buildingId as FacilityId);
      }
      return;
    }

    if (obj.userData.info) {
      const title = obj.userData.info.Employee || obj.userData.info.Machine || "Element";
      this.onSetTooltip(title, e.clientX, e.clientY, true);
      this.setHover(null);
      return;
    }

    this.setHover(null);
  }

  private setHover(id: FacilityId | null) {
    if (this.state.hoveredId === id) return;
    this.state.hoveredId = id;
    this.onSetHovered(id);
  }

  private clearHover() {
    this.onSetTooltip("", 0, 0, false);
    this.domElement.style.cursor = "grab";
    this.setHover(null);
  }

  private onUp(e: PointerEvent) {
    if (!this.pointerDownState) return;
    const moved = Math.hypot(e.clientX - this.pointerDownState.x, e.clientY - this.pointerDownState.y);
    const dt = performance.now() - this.pointerDownState.t;
    this.pointerDownState = null;
    if (moved > 6 || dt > 350) return;

    const obj = this.pick(e);
    if (!obj) return;

    if (obj.userData.isSun) {
      this.onToggleDayNight();
      return;
    }

    if (obj.userData.buildingId) {
      const id = obj.userData.buildingId as FacilityId;
      if (id === "hq") this.camController.enterHQ();
      else if (id === "factory") this.camController.enterFactory();
      else this.camController.focusBuilding(id);
      return;
    }

    if (obj.userData.info) {
      const infoObj = obj.userData.info as Record<string, string | number>;
      const title = String(infoObj.Employee || infoObj.Machine || "Detail");
      const rows: [string, string][] = [];
      for (const k in infoObj) {
        if (k === "Employee" || k === "Machine") continue;
        rows.push([k, String(infoObj[k])]);
      }
      this.onShowInfoCard({ title, rows });
      return;
    }
  }

  public dispose() {
    this.cleanups.forEach((fn) => fn());
  }
}
