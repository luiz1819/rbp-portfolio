"use client";

import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";

type StrandsProps = { className?: string };

const vertex = `#version 300 es\nin vec2 position;\nvoid main(){gl_Position=vec4(position,0.0,1.0);}`;
const fragment = `#version 300 es
precision highp float;
uniform float uTime; uniform vec2 uResolution;
out vec4 color;
const float PI=3.14159265;
vec3 palette(float t){ return 0.5 + 0.5*cos(2.0*PI*(t+vec3(0.0,0.33,0.67))); }
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uResolution)/uResolution.y;
  float envelope=pow(max(cos(uv.x*PI*1.3),0.0),3.0);
  vec3 c=vec3(0.0);
  for(int i=0;i<3;i++){
    float fi=float(i);
    float phase=fi*1.7;
    float wave=sin(uv.x*(2.0+fi*.35)+uTime*(1.4+fi*1.2)+phase)*.60;
    wave+=sin(uv.x*(2.2+fi*.38)-uTime*(1.0+fi*.8)+phase*1.7)*.40;
    float d=abs(uv.y-wave*(.1+.02*envelope));
    float thickness=(.001+.05*.66)*(.35+envelope)*.7;
    float glow=thickness/(d+thickness*.45); glow*=glow;
    c+=palette(fi/3.0+uv.x*.3+uTime*.04)*glow*envelope;
  }
  c=1.0-exp(-c*2.6);
  float lum=max(max(c.r,c.g),c.b);
  color=vec4(c,clamp(lum,0.0,1.0));
}`;

export default function Strands({ className = "" }: StrandsProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const program = new Program(gl, { vertex, fragment, uniforms: { uTime: { value: 0 }, uResolution: { value: [1, 1] } } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => { const w = container.clientWidth; const h = container.clientHeight; renderer.setSize(w, h); program.uniforms.uResolution.value = [w * renderer.dpr, h * renderer.dpr]; };
    const observer = new ResizeObserver(resize);
    observer.observe(container); container.appendChild(gl.canvas); resize();
    let frame = 0;
    const render = (time: number) => { program.uniforms.uTime.value = time * .001; renderer.render({ scene: mesh }); frame = requestAnimationFrame(render); };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); gl.canvas.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, []);
  return <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} />;
}

/* The canvas is sized by the parent container. */
