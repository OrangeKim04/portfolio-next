"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const auroraVert = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;
const auroraFrag = `
  precision mediump float;
  uniform float uTime;
  varying vec2 vUv;
  vec3 cG =vec3(1.,.882,.133);
  vec3 cY =vec3(1.,.941,.200);
  vec3 cT =vec3(1.,.549,.259);
  vec3 cL =vec3(.769,.714,.988);
  vec3 cBg=vec3(.039,.059,.118);
  float blob(vec2 u,vec2 c,float r){return 1.-smoothstep(0.,r,length(u-c));}
  void main(){
    float t=uTime*.13; vec2 u=vUv; vec3 col=cBg;
    col+=cG*blob(u,vec2(.80+cos(t*.43)*.12,.55+sin(t*.58)*.18),.70)*.32;
    col+=cY*blob(u,vec2(.42+sin(t*.30)*.20,.14+cos(t*.48)*.12),.68)*.26;
    col+=cT*blob(u,vec2(.08+sin(t*.50)*.13,.78+cos(t*.37)*.12),.72)*.22;
    col+=cG*blob(u,vec2(.22+cos(t*.65)*.14,.42+sin(t*.38)*.13),.54)*.20;
    col+=cY*blob(u,vec2(.70+sin(t*.44)*.10,.70+cos(t*.55)*.10),.46)*.16;
    col+=cL*blob(u,vec2(.55+cos(t*.38)*.14,.88+sin(t*.42)*.08),.44)*.10;
    gl_FragColor=vec4(col,1.);
  }
`;

function makeGlow(r: number, g: number, b: number, size: number): THREE.Sprite {
  const cv = document.createElement("canvas");
  cv.width = 128; cv.height = 128;
  const ctx = cv.getContext("2d")!;
  const gr = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0,    `rgba(${r},${g},${b},1)`);
  gr.addColorStop(0.28, `rgba(${r},${g},${b},0.45)`);
  gr.addColorStop(0.62, `rgba(${r},${g},${b},0.10)`);
  gr.addColorStop(1,    `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, 128, 128);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(cv),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  sp.scale.set(size, size, 1);
  return sp;
}

const phong = (color: number, emissive: number, spec: number, shin: number) =>
  new THREE.MeshPhongMaterial({
    color, shininess: shin,
    specular: new THREE.Color(spec),
    emissive: new THREE.Color(emissive),
    emissiveIntensity: 0.20,
  });

interface FObj {
  mesh: THREE.Mesh;
  glow: THREE.Sprite;
  glowBase: number;
  base: THREE.Vector3;
  phase: { x: number; y: number; z: number };
  freq:  { x: number; y: number; z: number };
  amp:   { x: number; y: number };
  rot:   { x: number; y: number; z: number };
  push:  { x: number; y: number };
  vel:   { x: number; y: number };
}

interface GObj {
  group: THREE.Group;
  glow: THREE.Sprite;
  glowBase: number;
  base: THREE.Vector3;
  phase: { x: number; y: number; z: number };
  freq:  { x: number; y: number; z: number };
  amp:   { x: number; y: number };
  rot:   { x: number; y: number; z: number };
  push:  { x: number; y: number };
  vel:   { x: number; y: number };
}

export default function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const w = el.offsetWidth  || window.innerWidth;
    const h = el.offsetHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.autoClear = false;
    el.appendChild(renderer.domElement);

    const bgScene = new THREE.Scene();
    const bgCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const auroraUni = { uTime: { value: 0 } };
    bgScene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: auroraVert, fragmentShader: auroraFrag, uniforms: auroraUni })
    ));

    const fScene = new THREE.Scene();
    const fCam   = new THREE.PerspectiveCamera(54, w / h, 0.1, 100);
    fCam.position.z = 11;

    fScene.add(new THREE.AmbientLight(0xFFF0E0, 0.65));
    const sun = new THREE.DirectionalLight(0xFFE4B5, 2.4);
    sun.position.set(5, 8, 7);
    fScene.add(sun);
    const rim = new THREE.DirectionalLight(0xCCC0FF, 0.55);
    rim.position.set(-5, -3, -5);
    fScene.add(rim);
    const fillLight = new THREE.PointLight(0xFF9966, 0.6, 22);
    fillLight.position.set(0, 0, 9);
    fScene.add(fillLight);

    const cursorLight = new THREE.PointLight(0xFFCCCC, 0, 9);
    fScene.add(cursorLight);

    const rnd = () => Math.random();

    const bgRingDefs = [
      { r: 5.0, tube: 0.06, color: 0xFF8C42, op: 0.07, x: -1.5, y:  1.0, z: -8, rx: 0.9, ry: 0.3 },
      { r: 3.8, tube: 0.05, color: 0xFFD166, op: 0.08, x:  3.0, y: -2.0, z: -7, rx: 0.4, ry: 1.1 },
      { r: 6.2, tube: 0.07, color: 0xC4B5FD, op: 0.06, x: -3.0, y: -0.5, z: -9, rx: 1.5, ry: 0.7 },
      { r: 4.5, tube: 0.055, color: 0xFF9DB5, op: 0.07, x:  1.0, y:  2.5, z: -8, rx: 0.6, ry: 1.8 },
    ];
    const bgRings = bgRingDefs.map(({ r, tube, color, op, x, y, z, rx, ry }) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 8, 120),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op })
      );
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rnd() * Math.PI);
      fScene.add(mesh);
      return { mesh, rotX: 0.0008 + rnd() * 0.001, rotY: 0.001 + rnd() * 0.0015 };
    });

    const spreadPos = (minR: number, maxR: number, maxZ: number) => {
      const angle = rnd() * Math.PI * 2;
      const radius = minR + rnd() * (maxR - minR);
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.62,
        (rnd() - 0.5) * maxZ * 2,
      );
    };

    type Def = [THREE.BufferGeometry, THREE.MeshPhongMaterial, [number,number,number], number, THREE.Vector3];

    const defs: Def[] = [
      [new THREE.SphereGeometry(0.34, 32, 32), phong(0xFFE033,0xCCA000,0xFFFFAA,155), [255,224,51],  1.35, spreadPos(5,10,5)],
      [new THREE.SphereGeometry(0.28, 32, 32), phong(0xFFD166,0xCC7700,0xFFFFCC,140), [255,210,80],  1.15, spreadPos(5,10,5)],
      [new THREE.SphereGeometry(0.30, 32, 32), phong(0xFFE033,0xBB9900,0xFFFFAA,155), [255,224,51],  1.20, spreadPos(5,10,5)],
      [new THREE.SphereGeometry(0.24, 32, 32), phong(0xFF8C42,0xFF4400,0xFFDDB0,120), [255,140,66],  1.00, spreadPos(5,10,5)],
      [new THREE.SphereGeometry(0.36, 32, 32), phong(0xFFD166,0xAA6600,0xFFFFCC,140), [255,210,80],  1.42, spreadPos(6,12,4)],
      [new THREE.SphereGeometry(0.22, 32, 32), phong(0xFFBF33,0xAA6600,0xFFEEAA,145), [255,190,60],  0.95, spreadPos(6,12,4)],
      [new THREE.SphereGeometry(0.16, 28, 28), phong(0xFFE033,0xCCA000,0xFFFFAA,155), [255,224,51],  0.72, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.12, 24, 24), phong(0xFFE033,0xBB9900,0xFFFFAA,150), [255,224,51],  0.58, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.10, 24, 24), phong(0xFFD166,0xCC7700,0xFFFFCC,140), [255,210,80],  0.50, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.14, 28, 28), phong(0xFFD166,0xCC7700,0xFFFFCC,140), [255,210,80],  0.65, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.13, 28, 28), phong(0xFF8C42,0xFF4400,0xFFDDB0,120), [255,140,66],  0.62, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.09, 20, 20), phong(0xFF8C42,0xFF4400,0xFFDDB0,120), [255,140,66],  0.46, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.11, 24, 24), phong(0xFFBF33,0xAA6600,0xFFEEAA,145), [255,190,60],  0.54, spreadPos(2,9,6)],
      [new THREE.SphereGeometry(0.08, 20, 20), phong(0xC4B5FD,0x8B5FFF,0xEEE8FF,130), [196,181,253], 0.42, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.58, 0.10, 20, 65), phong(0xFFE033,0xCCA000,0xFFFFAA,155), [255,224,51],  1.70, spreadPos(4,11,4)],
      [new THREE.TorusGeometry(0.50, 0.09, 18, 60), phong(0xFFD166,0xCC7700,0xFFFFCC,140), [255,210,80],  1.50, spreadPos(4,11,4)],
      [new THREE.TorusGeometry(0.64, 0.10, 20, 70), phong(0xFFE033,0xBB9900,0xFFFFAA,150), [255,224,51],  1.80, spreadPos(5,12,3)],
      [new THREE.TorusGeometry(0.44, 0.085, 18, 60), phong(0xFF8C42,0xFF4400,0xFFDDB0,120), [255,140,66],  1.35, spreadPos(4,11,4)],
      [new THREE.TorusGeometry(0.32, 0.068, 18, 55), phong(0xFFE033,0xCCA000,0xFFFFAA,155), [255,224,51],  1.00, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.26, 0.058, 16, 50), phong(0xFFE033,0xBB9900,0xFFFFAA,150), [255,224,51],  0.86, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.36, 0.065, 18, 55), phong(0xFFD166,0xCC7700,0xFFFFCC,140), [255,210,80],  1.08, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.23, 0.052, 16, 48), phong(0xFFD166,0xBB6600,0xFFEEAA,135), [255,210,80],  0.80, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.29, 0.060, 18, 55), phong(0xFF8C42,0xFF4400,0xFFDDB0,120), [255,140,66],  0.92, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.20, 0.048, 16, 44), phong(0xFFBF33,0xAA6600,0xFFEEAA,145), [255,190,60],  0.74, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.34, 0.062, 18, 55), phong(0xC4B5FD,0x8B5FFF,0xEEE8FF,130), [196,181,253], 1.00, spreadPos(2,9,6)],
      [new THREE.TorusGeometry(0.18, 0.042, 14, 44), phong(0xFFD166,0xCC7700,0xFFFFCC,140), [255,210,80],  0.68, spreadPos(2,9,6)],
      [new THREE.IcosahedronGeometry(0.22, 0), phong(0xFFE033,0xCCA000,0xFFFFAA,165), [255,224,51],  0.90, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.17, 0), phong(0xFFD166,0xCC7700,0xFFFFCC,160), [255,210,80],  0.74, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.19, 0), phong(0xFFE033,0xBB9900,0xFFFFAA,160), [255,224,51],  0.80, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.14, 0), phong(0xFFD166,0xCC7700,0xFFFFCC,160), [255,210,80],  0.64, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.13, 0), phong(0xFF8C42,0xFF4400,0xFFDDB0,140), [255,140,66],  0.60, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.10, 0), phong(0xFFBF33,0xAA6600,0xFFEEAA,145), [255,190,60],  0.50, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.16, 0), phong(0xC4B5FD,0x8B5FFF,0xEEE8FF,150), [196,181,253], 0.70, spreadPos(2,10,6)],
      [new THREE.IcosahedronGeometry(0.23, 0), phong(0xFFE033,0xCCA000,0xFFFFAA,165), [255,224,51],  0.92, spreadPos(3,11,5)],
    ];

    const objs: FObj[] = defs.map(([geo, mat, [gr, gg, gb], glowSz, base]) => {
      const mesh = new THREE.Mesh(geo, mat);
      const glow = makeGlow(gr, gg, gb, glowSz);
      mesh.position.copy(base);
      mesh.rotation.set(rnd() * Math.PI * 2, rnd() * Math.PI * 2, rnd() * Math.PI * 2);
      glow.position.copy(base);
      fScene.add(mesh);
      fScene.add(glow);
      return {
        mesh, glow, glowBase: glowSz, base,
        phase: { x: rnd()*Math.PI*2, y: rnd()*Math.PI*2, z: rnd()*Math.PI*2 },
        freq:  { x: 0.06+rnd()*0.09, y: 0.05+rnd()*0.08, z: 0.04+rnd()*0.07 },
        amp:   { x: 0.30+rnd()*0.45, y: 0.24+rnd()*0.38 },
        rot:   { x: (rnd()-0.5)*0.006, y: (rnd()-0.5)*0.008, z: (rnd()-0.5)*0.005 },
        push:  { x: 0, y: 0 }, vel: { x: 0, y: 0 },
      };
    });

    const makeTangerine = (): { group: THREE.Group; glow: THREE.Sprite } => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 24, 24),
        new THREE.MeshPhongMaterial({ color: 0xFF8C42, shininess: 100,
          specular: new THREE.Color(0xFFCC88),
          emissive: new THREE.Color(0xFF4400), emissiveIntensity: 0.22 })
      );
      body.scale.set(1, 0.84, 1);
      g.add(body);
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2;
        const pts: THREE.Vector3[] = [];
        for (let j = 0; j <= 12; j++) {
          const a = (j / 12) * Math.PI;
          pts.push(new THREE.Vector3(
            0.181 * Math.sin(a) * Math.cos(angle),
            0.181 * 0.84 * Math.cos(a),
            0.181 * Math.sin(a) * Math.sin(angle)
          ));
        }
        g.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xBB4400, transparent: true, opacity: 0.18 })
        ));
      }
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.010, 0.016, 0.07, 6),
        new THREE.MeshPhongMaterial({ color: 0x2D6B1A })
      );
      stem.position.set(0, 0.155, 0);
      g.add(stem);
      const ls = new THREE.Shape();
      ls.moveTo(0,0); ls.bezierCurveTo(0.06,0.05,0.14,0.11,0.18,0.04);
      ls.bezierCurveTo(0.12,-0.02,0.04,-0.02,0,0);
      const leaf = new THREE.Mesh(new THREE.ShapeGeometry(ls),
        new THREE.MeshPhongMaterial({ color: 0x4CAF50, side: THREE.DoubleSide, shininess: 30 }));
      leaf.position.set(0.02, 0.20, 0.01);
      leaf.rotation.set(-0.2, 0.15, 0.35);
      g.add(leaf);
      const glow = makeGlow(255, 140, 66, 0.85);
      g.add(glow);
      return { group: g, glow };
    };

    const tangerines: GObj[] = Array.from({ length: 6 }, () => {
      const { group, glow } = makeTangerine();
      const base = spreadPos(2, 11, 6);
      group.position.copy(base);
      group.rotation.set(rnd() * Math.PI * 2, rnd() * Math.PI * 2, rnd() * Math.PI * 2);
      fScene.add(group);
      return {
        group, glow, glowBase: 0.85, base,
        phase: { x: rnd()*Math.PI*2, y: rnd()*Math.PI*2, z: rnd()*Math.PI*2 },
        freq:  { x: 0.07+rnd()*0.08, y: 0.06+rnd()*0.07, z: 0.05+rnd()*0.06 },
        amp:   { x: 0.28+rnd()*0.40, y: 0.22+rnd()*0.35 },
        rot:   { x: (rnd()-0.5)*0.007, y: (rnd()-0.5)*0.009, z: (rnd()-0.5)*0.006 },
        push: { x: 0, y: 0 }, vel: { x: 0, y: 0 },
      };
    });

    const mouse = { nx: 0, ny: 0, active: false };
    const onMouse = (e: MouseEvent) => {
      const rc = el.getBoundingClientRect();
      mouse.nx = ((e.clientX - rc.left) / rc.width)  * 2 - 1;
      mouse.ny = -((e.clientY - rc.top) / rc.height) * 2 + 1;
      mouse.active = true;
    };
    window.addEventListener("mousemove", onMouse);

    const raycaster   = new THREE.Raycaster();
    const worldPlane  = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld3 = new THREE.Vector3();
    const mouseVec2   = new THREE.Vector2();
    const camDrift    = new THREE.Vector2(0, 0);

    const REPEL_R = 2.6, REPEL_F = 0.09, SPRING = 0.038, DAMP = 0.88;
    const t0 = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - t0) / 1000;
      auroraUni.uTime.value = t;

      camDrift.x += (mouse.nx * 0.55 - camDrift.x) * 0.022;
      camDrift.y += (mouse.ny * 0.32 - camDrift.y) * 0.022;
      fCam.position.x = camDrift.x;
      fCam.position.y = camDrift.y;
      fCam.lookAt(0, 0, 0);

      fCam.updateMatrixWorld();
      mouseVec2.set(mouse.nx, mouse.ny);
      raycaster.setFromCamera(mouseVec2, fCam);
      const hit = raycaster.ray.intersectPlane(worldPlane, mouseWorld3);
      const mwx = hit ? mouseWorld3.x : 0;
      const mwy = hit ? mouseWorld3.y : 0;

      cursorLight.position.set(mwx, mwy, 4);
      cursorLight.intensity = mouse.active ? 2.8 : 0;

      for (const br of bgRings) {
        br.mesh.rotation.x += br.rotX;
        br.mesh.rotation.y += br.rotY;
      }

      for (const o of tangerines) {
        const px = o.base.x + Math.sin(t * o.freq.x + o.phase.x) * o.amp.x;
        const py = o.base.y + Math.sin(t * o.freq.y + o.phase.y) * o.amp.y;
        const pz = o.base.z + Math.sin(t * o.freq.z + o.phase.z) * 0.35;
        if (mouse.active) {
          const dx = (px + o.push.x) - mwx, dy = (py + o.push.y) - mwy;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < REPEL_R && d > 0.01) { const f = (1 - d/REPEL_R)**2*REPEL_F; o.vel.x += (dx/d)*f; o.vel.y += (dy/d)*f; }
        }
        o.vel.x += -SPRING*o.push.x; o.vel.y += -SPRING*o.push.y;
        o.vel.x *= DAMP; o.vel.y *= DAMP;
        o.push.x += o.vel.x; o.push.y += o.vel.y;
        const prox = mouse.active ? Math.max(0, 1 - Math.sqrt((px-mwx)**2+(py-mwy)**2)/REPEL_R) : 0;
        const spin = 1 + prox * 4.5;
        o.group.position.set(px+o.push.x, py+o.push.y, pz);
        o.group.rotation.x += o.rot.x*spin; o.group.rotation.y += o.rot.y*spin; o.group.rotation.z += o.rot.z*spin;
        const s = o.glowBase * (1 + Math.sin(t*1.4+o.phase.x)*0.14) * (1+prox*0.9);
        o.glow.scale.set(s, s, 1);
      }

      for (const o of objs) {
        const px = o.base.x + Math.sin(t * o.freq.x + o.phase.x) * o.amp.x;
        const py = o.base.y + Math.sin(t * o.freq.y + o.phase.y) * o.amp.y;
        const pz = o.base.z + Math.sin(t * o.freq.z + o.phase.z) * 0.35;
        if (mouse.active) {
          const dx = (px+o.push.x)-mwx, dy = (py+o.push.y)-mwy, d = Math.sqrt(dx*dx+dy*dy);
          if (d < REPEL_R && d > 0.01) { const f=(1-d/REPEL_R)**2*REPEL_F; o.vel.x+=(dx/d)*f; o.vel.y+=(dy/d)*f; }
        }
        o.vel.x += -SPRING*o.push.x; o.vel.y += -SPRING*o.push.y;
        o.vel.x *= DAMP; o.vel.y *= DAMP;
        o.push.x += o.vel.x; o.push.y += o.vel.y;
        const prox = mouse.active ? Math.max(0, 1 - Math.sqrt((px-mwx)**2+(py-mwy)**2)/REPEL_R) : 0;
        const spin = 1 + prox * 4.5;
        o.mesh.position.set(px+o.push.x, py+o.push.y, pz);
        o.glow.position.set(px+o.push.x, py+o.push.y, pz);
        o.mesh.rotation.x += o.rot.x*spin; o.mesh.rotation.y += o.rot.y*spin; o.mesh.rotation.z += o.rot.z*spin;
        const s = o.glowBase * (1+Math.sin(t*1.4+o.phase.x)*0.14) * (1+prox*0.9);
        o.glow.scale.set(s, s, 1);
      }

      renderer.clear();
      renderer.render(bgScene, bgCam);
      renderer.clearDepth();
      renderer.render(fScene, fCam);
    };

    animate();

    const onResize = () => {
      const nw = el.offsetWidth || window.innerWidth;
      const nh = el.offsetHeight || window.innerHeight;
      fCam.aspect = nw / nh;
      fCam.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}
