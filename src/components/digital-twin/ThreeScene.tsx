"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  DigitalTwinState,
  FacilityId,
  SimResultRow,
  WorldMode,
  UpdatableFn,
} from "./digitalTwinTypes";
import { WorldEnvironment } from "./WorldEnvironment";
import { BuildingSystem } from "./BuildingSystem";
import { VehicleSystem } from "./VehicleSystem";
import { InteriorSystem } from "./InteriorSystem";
import { CameraController } from "./CameraController";
import { InteractionSystem, InfoCardData } from "./InteractionSystem";
import { SimulationSystem } from "./SimulationSystem";

export interface ThreeSceneRef {
  toggleDayNight: () => void;
  runSim: () => void;
  resetCamera: () => void;
  navWorldOverview: () => void;
  navFocusBuilding: (id: FacilityId) => void;
  navEnterHQ: () => void;
  navEnterFactory: () => void;
  navExitInterior: () => void;
  setHQFloor: (n: number) => void;
}

interface ThreeSceneProps {
  onModeChange: (mode: WorldMode, facilityId: FacilityId | null) => void;
  onShowFacilityPanel: (id: FacilityId) => void;
  onHideFacilityPanel: () => void;
  onShowInfoCard: (info: InfoCardData) => void;
  onToast: (msg: string, kind?: "" | "warn" | "good") => void;
  onSetSimBusy: (busy: boolean) => void;
  onShowSimResults: (rows: SimResultRow[]) => void;
  onHideSimResults: () => void;
  onBumpKPIs: () => void;
  onDayNightChange: (isNight: boolean) => void;
  onSetTooltip: (text: string, x: number, y: number, show: boolean) => void;
  onInitComplete?: (api: ThreeSceneRef) => void;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  onModeChange,
  onShowFacilityPanel,
  onHideFacilityPanel,
  onShowInfoCard,
  onToast,
  onSetSimBusy,
  onShowSimResults,
  onHideSimResults,
  onBumpKPIs,
  onDayNightChange,
  onSetTooltip,
  onInitComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglError, setWebglError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      setTimeout(() => {
        setWebglError("WebGL is not supported or hardware acceleration is disabled in your browser.");
      }, 0);
      return;
    }

    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width:880px)").matches || "ontouchstart" in window);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9fd0ff);
    scene.fog = new THREE.Fog(0x9fd0ff, 220, 520);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.5,
      2000
    );
    camera.position.set(95, 82, 95);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 2, 0);
    controls.minDistance = 26;
    controls.maxDistance = 230;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minPolarAngle = Math.PI * 0.1;
    controls.panSpeed = 0.6;
    controls.rotateSpeed = 0.7;

    const outerGroup = new THREE.Group();
    scene.add(outerGroup);

    const pickWorld: THREE.Object3D[] = [];
    const updatables: UpdatableFn[] = [];

    const state: DigitalTwinState = {
      mode: "WORLD",
      dayFactor: 1,
      isNight: false,
      selectedId: null,
      hoveredId: null,
      hqFloor: 1,
      sim: {
        active: false,
        blocked: false,
        slow: 1,
        warehouseBoost: 1,
        factoryBoost: 1,
      },
      isMobile,
    };

    const env = new WorldEnvironment(scene, outerGroup, pickWorld, isMobile);
    env.applyDayFactor(state.dayFactor);

    const bSystem = new BuildingSystem(outerGroup, pickWorld, updatables, env, isMobile);
    const vSystem = new VehicleSystem(outerGroup, updatables, bSystem, env);
    const iSystem = new InteriorSystem(scene, updatables, env);

    const camController = new CameraController(
      camera,
      controls,
      outerGroup,
      bSystem,
      iSystem,
      env,
      state,
      (mode, facilityId) => {
        onModeChange(mode, facilityId);
        if (mode === "WORLD" && facilityId) {
          onShowFacilityPanel(facilityId);
        } else if (mode !== "WORLD") {
          onHideFacilityPanel();
        }
      }
    );

    const toggleDayNight = () => {
      state.isNight = !state.isNight;
      const targetFactor = state.isNight ? 0 : 1;
      const tweenObj = { f: state.dayFactor };

      import("gsap").then(({ default: gsap }) => {
        gsap.to(tweenObj, {
          f: targetFactor,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            state.dayFactor = tweenObj.f;
            env.applyDayFactor(state.dayFactor);
          },
        });
      }).catch(() => {
        state.dayFactor = targetFactor;
        env.applyDayFactor(targetFactor);
      });

      onDayNightChange(state.isNight);
    };

    const simSystem = new SimulationSystem(
      state,
      camController,
      bSystem,
      onToast,
      onSetSimBusy,
      onShowSimResults,
      onHideSimResults,
      onBumpKPIs
    );

    const interactionSystem = new InteractionSystem(
      canvas,
      camera,
      pickWorld,
      iSystem.hqPick,
      iSystem.facPick,
      bSystem,
      camController,
      state,
      toggleDayNight,
      onShowInfoCard,
      (id) => {
        state.hoveredId = id;
      },
      onSetTooltip
    );

    const apiRef: ThreeSceneRef = {
      toggleDayNight,
      runSim: () => simSystem.run(),
      resetCamera: () => camController.resetCamera(),
      navWorldOverview: () => camController.worldOverview(),
      navFocusBuilding: (id: FacilityId) => camController.focusBuilding(id),
      navEnterHQ: () => camController.enterHQ(),
      navEnterFactory: () => camController.enterFactory(),
      navExitInterior: () => camController.exitInterior(),
      setHQFloor: (n: number) => {
        state.hqFloor = n;
        iSystem.setHQFloor(n);
      },
    };

    onInitComplete?.(apiRef);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      vSystem.updateAll(dt, state.sim);
      for (let i = 0; i < updatables.length; i++) {
        updatables[i](dt, t);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      interactionSystem.dispose();
      env.dispose();
      bSystem.dispose();
      vSystem.dispose();
      iSystem.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (webglError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-slate-900 text-slate-300 rounded-2xl border border-white/10">
        <span className="text-3xl mb-3">⚠️</span>
        <h3 className="text-lg font-bold text-white mb-2">3D Acceleration Unavailable</h3>
        <p className="text-sm max-w-md">{webglError}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full cursor-grab touch-none" />
    </div>
  );
};
