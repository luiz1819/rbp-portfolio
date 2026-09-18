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
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uResolution)/uResolution.y;
  vec3 c=vec3(0.0);
  for(int i=0;i<4;i++){
    float fi=float(i);
    float y=sin(uv.x*(2.0+fi*.5)+uTime*(.7+fi*.18)+fi*1.7)*.12;
    y+=sin(uv.x*4.0-uTime*.4+fi)*.045;
    float d=abs(uv.y-y);
    float glow=.004/(d+.004); glow*=glow;
    vec3 strand=vec3(.18+.16*fi,.42+.12*fi,1.0);
    c+=strand*glow;
  }
  float fade=pow(max(cos(uv.x*PI*.85),0.0),1.7);
  c=1.0-exp(-c*.42)*fade;
  float a=clamp(max(max(c.r,c.g),c.b)*.72,0.0,.72);
  color=vec4(c*.7,a);
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
