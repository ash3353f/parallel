import * as THREE from "three";
import gsap from "gsap";
import { DayNightMode } from "./digitalTwinTypes";

function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.3, "rgba(255,236,170,0.7)");
    grd.addColorStop(1, "rgba(255,200,90,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class WorldEnvironment {
  public skyMat!: THREE.ShaderMaterial;
  public stars!: THREE.Points;
  public sunGroup!: THREE.Group;
  public sunMesh!: THREE.Mesh;
  public moonMesh!: THREE.Mesh;
  public glow!: THREE.Sprite;
  public dir!: THREE.DirectionalLight;
  public amb!: THREE.AmbientLight;
  public hemi!: THREE.HemisphereLight;

  public matWindow!: THREE.MeshStandardMaterial;
  public matLamp!: THREE.MeshStandardMaterial;
  public matRunway!: THREE.MeshStandardMaterial;
  public matHead!: THREE.MeshStandardMaterial;
  public matSolar!: THREE.MeshStandardMaterial;

  private isInteriorBG = false;
  private glowTexture: THREE.CanvasTexture | null = null;
  public currentMode: DayNightMode = "day";

  constructor(
    private scene: THREE.Scene,
    private outerGroup: THREE.Group,
    private pickWorld: THREE.Object3D[],
    private isMobile: boolean
  ) {
    this.initMaterials();
    this.initLightingAndSky();
  }

  private initMaterials() {
    this.matWindow = new THREE.MeshStandardMaterial({
      color: 0x8fc7e8,
      roughness: 0.25,
      metalness: 0.1,
      emissive: 0xffd9a0,
      emissiveIntensity: 0,
    });
    this.matLamp = new THREE.MeshStandardMaterial({
      color: 0xfff2c8,
      emissive: 0xffd98a,
      emissiveIntensity: 0,
      roughness: 0.6,
    });
    this.matRunway = new THREE.MeshStandardMaterial({
      color: 0xffe9a8,
      emissive: 0xffd27a,
      emissiveIntensity: 0,
      roughness: 0.6,
    });
    this.matHead = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfff4d0,
      emissiveIntensity: 0,
      roughness: 0.4,
    });
    this.matSolar = new THREE.MeshStandardMaterial({
      color: 0x2b3a6b,
      emissive: 0x4f9dff,
      emissiveIntensity: 0.12,
      roughness: 0.3,
      metalness: 0.4,
    });
  }

  private initLightingAndSky() {
    this.skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uTop: { value: new THREE.Color(0x2f7fd6) },
        uBottom: { value: new THREE.Color(0x9fd0ff) },
      },
      vertexShader: `
        varying vec3 vW;
        void main(){
          vW = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vW;
        uniform vec3 uTop;
        uniform vec3 uBottom;
        void main(){
          float h = clamp(normalize(vW).y * 0.5 + 0.5, 0.0, 1.0);
          gl_FragColor = vec4(mix(uBottom, uTop, pow(h, 0.7)), 1.0);
        }
      `,
    });
    this.outerGroup.add(new THREE.Mesh(new THREE.SphereGeometry(900, 24, 16), this.skyMat));

    const N = 380;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 700;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 0.7 + 0.1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.stars = new THREE.Points(
      sg,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2.2,
        transparent: true,
        opacity: 0,
        fog: false,
        depthWrite: false,
      })
    );
    this.outerGroup.add(this.stars);

    this.sunGroup = new THREE.Group();
    this.sunGroup.position.set(120, 150, -90);

    this.sunMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(11, 1),
      new THREE.MeshBasicMaterial({ color: 0xffd24a })
    );
    this.sunMesh.userData = { isSun: true };
    this.sunMesh.name = "sun";

    this.moonMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(9, 1),
      new THREE.MeshBasicMaterial({ color: 0xe8eefc })
    );
    this.moonMesh.scale.setScalar(0.001);

    this.glowTexture = makeGlowTexture();
    this.glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTexture,
        color: 0xffd24a,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      })
    );
    this.glow.scale.set(60, 60, 1);

    this.sunGroup.add(this.sunMesh, this.moonMesh, this.glow);
    this.outerGroup.add(this.sunGroup);
    this.pickWorld.push(this.sunMesh);

    this.dir = new THREE.DirectionalLight(0xfff2d8, 1.6);
    this.dir.position.set(80, 130, 60);
    this.dir.castShadow = !this.isMobile;
    const mapSize = this.isMobile ? 1024 : 2048;
    this.dir.shadow.mapSize.set(mapSize, mapSize);
    const s = this.dir.shadow.camera;
    s.left = -110;
    s.right = 110;
    s.top = 90;
    s.bottom = -90;
    s.near = 10;
    s.far = 340;
    this.dir.shadow.bias = -0.0004;
    this.dir.shadow.normalBias = 0.6;
    this.scene.add(this.dir);
    this.scene.add(this.dir.target);

    this.amb = new THREE.AmbientLight(0xbfd4ff, 0.7);
    this.hemi = new THREE.HemisphereLight(0xbfe0ff, 0x4a6b3a, 0.5);
    this.scene.add(this.amb, this.hemi);
  }

  public setWorldMode(mode: DayNightMode, currentDayFactor: number, onUpdateFactor: (factor: number) => void) {
    this.currentMode = mode;
    const targetFactor = mode === "day" ? 1.0 : 0.0;
    const tweenObj = { f: currentDayFactor };

    gsap.to(tweenObj, {
      f: targetFactor,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        onUpdateFactor(tweenObj.f);
        this.apply(tweenObj.f);
      },
    });
  }

  public apply(f: number) {
    const factor = Math.max(0, Math.min(1, f));
    const lc = (a: number, b: number, t: number) =>
      new THREE.Color(a).lerp(new THREE.Color(b), t);

    this.skyMat.uniforms.uTop.value = lc(0x060a22, 0x2f7fd6, factor);
    this.skyMat.uniforms.uBottom.value = lc(0x14224d, 0x9fd0ff, factor);

    this.sunMesh.scale.setScalar(0.2 + factor * 0.9);
    (this.sunMesh.material as THREE.MeshBasicMaterial).color.copy(
      lc(0xff8a3c, 0xffd24a, factor)
    );
    this.moonMesh.scale.setScalar(0.2 + (1 - factor) * 0.9);
    this.glow.material.color.copy(lc(0x6f86c8, 0xffd24a, factor));
    this.glow.material.opacity = 0.35 + factor * 0.5;

    (this.stars.material as THREE.PointsMaterial).opacity = (1 - factor) * 0.9;

    this.dir.intensity = 0.15 + factor * 1.5;
    this.dir.color.copy(lc(0x6f86c8, 0xfff2d8, factor));

    this.amb.intensity = 0.16 + factor * 0.6;
    this.amb.color.copy(lc(0x22305f, 0xbfd4ff, factor));
    this.hemi.intensity = 0.12 + factor * 0.45;

    const horizon = lc(0x14224d, 0x9fd0ff, factor);
    if (!this.isInteriorBG) {
      this.scene.background = horizon.clone();
      if (this.scene.fog) {
        this.scene.fog.color.copy(horizon);
      }
    }

    this.matWindow.emissiveIntensity = (1 - factor) * 1.15;
    this.matLamp.emissiveIntensity = (1 - factor) * 1.6;
    this.matRunway.emissiveIntensity = (1 - factor) * 2.0;
    this.matHead.emissiveIntensity = (1 - factor) * 2.4;
    this.matSolar.emissiveIntensity = factor * 0.14;
  }

  public setInteriorBackground(on: boolean, dayFactor: number) {
    this.isInteriorBG = on;
    if (on) {
      this.scene.background = new THREE.Color(0xeef1f5);
      if (this.scene.fog) {
        this.scene.fog.color.set(0xeef1f5);
      }
    } else {
      this.apply(dayFactor);
    }
  }

  public dispose() {
    this.skyMat.dispose();
    this.stars.geometry.dispose();
    (this.stars.material as THREE.Material).dispose();
    this.sunMesh.geometry.dispose();
    (this.sunMesh.material as THREE.Material).dispose();
    this.moonMesh.geometry.dispose();
    (this.moonMesh.material as THREE.Material).dispose();
    this.glow.material.dispose();
    if (this.glowTexture) this.glowTexture.dispose();
    this.matWindow.dispose();
    this.matLamp.dispose();
    this.matRunway.dispose();
    this.matHead.dispose();
    this.matSolar.dispose();
  }
}
