import * as THREE from "three";
import { DigitalTwinState, SimResultRow } from "./digitalTwinTypes";
import { CameraController } from "./CameraController";
import { BuildingSystem } from "./BuildingSystem";
import gsap from "gsap";

const SIM_RESULT: SimResultRow[] = [
  { label: "Revenue", value: "+3.1%", trend: "up" },
  { label: "Profit", value: "+6.3%", trend: "up" },
  { label: "Risk", value: "-42.8%", trend: "down" },
  { label: "Efficiency", value: "+4.0%", trend: "up" },
  { label: "Supply Delay", value: "-22%", trend: "down" },
  { label: "Carbon Impact", value: "-3.1%", trend: "down" },
];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tweenProp(obj: Record<string, number>, key: string, to: number, dur: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && gsap) {
      gsap.to(obj, {
        [key]: to,
        duration: dur,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    } else {
      obj[key] = to;
      resolve();
    }
  });
}

export class SimulationSystem {
  private running = false;

  constructor(
    private state: DigitalTwinState,
    private camController: CameraController,
    private bSystem: BuildingSystem,
    private onToast: (msg: string, kind?: "" | "warn" | "good") => void,
    private onSetSimBusy: (busy: boolean) => void,
    private onShowSimResults: (rows: SimResultRow[]) => void,
    private onHideSimResults: () => void,
    private onBumpKPIs: () => void
  ) {}

  public async run() {
    if (this.running) return;
    this.running = true;
    const sim = this.state.sim;
    this.onSetSimBusy(true);
    this.onHideSimResults();

    if (this.state.mode !== "WORLD") {
      this.camController.exitInterior();
      await wait(900);
    }

    this.camController.focusBuilding("logistics");
    await wait(1100);

    this.onToast("AI scanning supply-chain graph…", "");
    await wait(1300);

    this.onToast("Bottleneck detected on corridor H1 (Logistics → Factory)", "warn");
    sim.active = true;
    sim.blocked = true;
    sim.slow = 0.35;
    this.flashFactory(true);
    await wait(1600);

    this.onToast("Re-routing 6 shipments via corridor V2…", "");
    await wait(1400);

    this.onToast("Increasing warehouse throughput & factory cadence…", "");
    await tweenProp(sim as unknown as Record<string, number>, "warehouseBoost", 1.7, 1.2);
    await tweenProp(sim as unknown as Record<string, number>, "factoryBoost", 1.4, 1.0);
    await wait(1200);

    this.onToast("Optimisation converged — applying new plan", "good");
    sim.slow = 1.0;
    await wait(1200);

    this.onBumpKPIs();
    this.flashFactory(false);
    this.onShowSimResults(SIM_RESULT);
    this.onToast("Plan deployed. Monitoring live impact.", "good");
    await wait(2500);

    await tweenProp(sim as unknown as Record<string, number>, "warehouseBoost", 1.0, 1.5);
    await tweenProp(sim as unknown as Record<string, number>, "factoryBoost", 1.0, 1.5);
    sim.blocked = false;
    await wait(1500);
    sim.active = false;

    this.onSetSimBusy(false);
    this.running = false;
  }

  private flashFactory(on: boolean) {
    const b = this.bSystem.buildings.factory;
    if (!b || !b.halo) return;
    (b.halo.material as THREE.MeshBasicMaterial).color.set(on ? 0xff8a3c : 0x34e0d8);
    if (on) {
      b.selected = true;
      setTimeout(() => {
        b.selected = this.state.selectedId === "factory";
      }, 4000);
    }
  }
}
