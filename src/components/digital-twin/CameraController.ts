import * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { WorldMode, FacilityId, DigitalTwinState } from "./digitalTwinTypes";
import { BuildingSystem } from "./BuildingSystem";
import { InteriorSystem } from "./InteriorSystem";
import { WorldEnvironment } from "./WorldEnvironment";

export class CameraController {
  constructor(
    private camera: THREE.PerspectiveCamera,
    private controls: OrbitControls,
    private outerGroup: THREE.Group,
    private bSystem: BuildingSystem,
    private iSystem: InteriorSystem,
    private env: WorldEnvironment,
    private state: DigitalTwinState,
    private onModeChange: (mode: WorldMode, facilityId: FacilityId | null) => void
  ) {}

  public cameraTo(
    pos: THREE.Vector3,
    target: THREE.Vector3,
    dur = 1.2,
    onDone?: () => void
  ) {
    if (!gsap) {
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      onDone?.();
      return;
    }
    this.controls.enabled = false;
    const o = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      tx: this.controls.target.x,
      ty: this.controls.target.y,
      tz: this.controls.target.z,
    };
    gsap.to(o, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      tx: target.x,
      ty: target.y,
      tz: target.z,
      duration: dur,
      ease: "power3.inOut",
      onUpdate: () => {
        this.camera.position.set(o.x, o.y, o.z);
        this.controls.target.set(o.tx, o.ty, o.tz);
      },
      onComplete: () => {
        this.controls.enabled = true;
        onDone?.();
      },
    });
  }

  public exitInteriorSilent() {
    if (this.iSystem.hqGroup) this.iSystem.hqGroup.visible = false;
    if (this.iSystem.facGroup) this.iSystem.facGroup.visible = false;
    this.outerGroup.visible = true;
    this.env.setInteriorBackground(false, this.state.dayFactor);
  }

  public worldOverview() {
    this.exitInteriorSilent();
    this.state.mode = "WORLD";
    this.state.selectedId = null;
    this.cameraTo(new THREE.Vector3(95, 82, 95), new THREE.Vector3(0, 2, 0), 1.3);
    this.onModeChange("WORLD", null);
  }

  public focusBuilding(id: FacilityId) {
    const b = this.bSystem.buildings[id];
    if (!b) return;
    this.exitInteriorSilent();
    this.state.mode = "WORLD";
    this.state.selectedId = id;
    const c = b.center;
    this.cameraTo(
      new THREE.Vector3(c[0] + 30, 24, c[1] + 30),
      new THREE.Vector3(c[0], b.height * 0.45, c[1]),
      1.2,
      () => {
        this.onModeChange("WORLD", id);
      }
    );
  }

  public enterHQ() {
    this.state.selectedId = "hq";
    const c = this.bSystem.buildings.hq.center;
    this.cameraTo(
      new THREE.Vector3(c[0] + 22, 18, c[1] + 22),
      new THREE.Vector3(c[0], 8, c[1]),
      1.0,
      () => {
        this.outerGroup.visible = false;
        this.iSystem.hqGroup.visible = true;
        this.env.setInteriorBackground(true, this.state.dayFactor);
        this.state.mode = "HQ_INTERIOR";
        this.cameraTo(
          new THREE.Vector3(46, 40, 46),
          new THREE.Vector3(0, 5, 0),
          1.0,
          () => {
            this.onModeChange("HQ_INTERIOR", "hq");
          }
        );
      }
    );
  }

  public enterFactory() {
    this.state.selectedId = "factory";
    const c = this.bSystem.buildings.factory.center;
    this.cameraTo(
      new THREE.Vector3(c[0] + 24, 18, c[1] + 24),
      new THREE.Vector3(c[0], 7, c[1]),
      1.0,
      () => {
        this.outerGroup.visible = false;
        this.iSystem.facGroup.visible = true;
        this.env.setInteriorBackground(true, this.state.dayFactor);
        this.state.mode = "FACTORY_INTERIOR";
        this.cameraTo(
          new THREE.Vector3(52, 42, 52),
          new THREE.Vector3(0, 4, 0),
          1.0,
          () => {
            this.onModeChange("FACTORY_INTERIOR", "factory");
          }
        );
      }
    );
  }

  public exitInterior() {
    this.exitInteriorSilent();
    this.state.mode = "WORLD";
    this.state.selectedId = null;
    this.cameraTo(new THREE.Vector3(95, 82, 95), new THREE.Vector3(0, 2, 0), 1.2);
    this.onModeChange("WORLD", null);
  }

  public resetCamera() {
    if (this.state.mode !== "WORLD") {
      this.exitInterior();
    } else {
      this.worldOverview();
    }
  }
}
