"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const MODES = [
  { name: "Perception", note: "From a cloud of signals, a shape emerges." },
  { name: "Connection", note: "Separate points. A shared structure." },
  { name: "Possibility", note: "The same pieces, another way of seeing." },
] as const;

// Parametric points stay on the GPU; only a few uniforms change per frame.
const VERTEX = `
attribute vec2 aAngle;
uniform float uTime;
uniform float uMode;
uniform float uAspect;
uniform float uPixelRatio;
uniform vec2 uPointer;
varying float vLight;
varying float vAccent;
mat2 rotate(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
  float u = aAngle.x;
  float v = aAngle.y;
  float ripple = sin(u * 3.0 + uTime * 0.3) * 0.08;
  float tube = 0.37 + ripple;
  vec3 torus = vec3((0.94 + tube * cos(v)) * cos(u), (0.94 + tube * cos(v)) * sin(u), tube * sin(v));
  vec3 sphere = vec3(sin(v) * cos(u), sin(v) * sin(u), cos(v)) * 1.17;
  vec3 wave = vec3(cos(u) * (0.8 + 0.3 * cos(v)), sin(u) * (0.8 + 0.3 * cos(v)), sin(v + u * 3.0) * 0.52);
  vec3 p = mix(torus, sphere, clamp(uMode, 0.0, 1.0));
  p = mix(p, wave, clamp(uMode - 1.0, 0.0, 1.0));
  p.yz = rotate(0.68 + uPointer.y * 0.2) * p.yz;
  p.xz = rotate(uTime * 0.085 + uPointer.x * 0.25) * p.xz;
  p.xy = rotate(-0.38) * p.xy;
  float perspective = 3.5 / (3.5 - p.z);
  gl_Position = vec4(p.x * perspective * 0.61 / uAspect, p.y * perspective * 0.61, 0.0, 1.0);
  gl_PointSize = clamp((1.35 + (p.z + 1.3) * 0.55) * uPixelRatio, 1.0, 5.0);
  vLight = 0.22 + (p.z + 1.4) * 0.25;
  vAccent = 0.5 + 0.5 * sin(u + v * 0.3);
}`;
const FRAGMENT = `
precision mediump float;
varying float vLight;
varying float vAccent;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float alpha = (1.0 - smoothstep(0.12, 0.5, d)) * vLight;
  vec3 color = mix(vec3(0.53, 0.31, 0.17), vec3(0.91, 0.75, 0.51), vAccent);
  gl_FragColor = vec4(color, alpha);
}`;

export default function Observatory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const input = useRef({ mode: 0, paused: false });
  const invalidate = useRef<() => void>(() => {});
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(motion.matches);
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let frame = 0;
    let lost = false;
    let inView = true;
    let last = 0;
    let time = 0;
    let currentMode = input.current.mode;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const dispose = () => {
      cancelAnimationFrame(frame);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
    try {
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) throw new Error("Shader unavailable");
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
          throw new Error("Shader compilation failed");
        return shader;
      };
      program = gl.createProgram();
      if (!program) throw new Error("Program unavailable");
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error("Shader linking failed");
      gl.useProgram(program);
      const count = 144 * 88;
      const angles = new Float32Array(count * 2);
      for (let i = 0; i < count; i++) {
        angles[i * 2] = ((i % 144) / 144) * Math.PI * 2;
        angles[i * 2 + 1] = (Math.floor(i / 144) / 88) * Math.PI * 2;
      }
      buffer = gl.createBuffer();
      if (!buffer) throw new Error("Buffer unavailable");
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, angles, gl.STATIC_DRAW);
      const attribute = gl.getAttribLocation(program, "aAngle");
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
      const uniforms = {
        time: gl.getUniformLocation(program, "uTime"),
        mode: gl.getUniformLocation(program, "uMode"),
        aspect: gl.getUniformLocation(program, "uAspect"),
        ratio: gl.getUniformLocation(program, "uPixelRatio"),
        pointer: gl.getUniformLocation(program, "uPointer"),
      };
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.clearColor(0, 0, 0, 0);
      let aspect = 1;
      let ratio = 1;
      const canAnimate = () =>
        !input.current.paused &&
        !motion.matches &&
        !document.hidden &&
        inView &&
        !lost;
      const draw = () => {
        if (lost) return;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uniforms.time, time);
        gl.uniform1f(uniforms.mode, currentMode);
        gl.uniform1f(uniforms.aspect, aspect);
        gl.uniform1f(uniforms.ratio, ratio);
        gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
        gl.drawArrays(gl.POINTS, 0, count);
      };
      const animate = (now: number) => {
        if (!canAnimate()) return;
        if (!last || now - last >= 1000 / 30) {
          const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
          last = now;
          time += delta;
          const ease = 1 - Math.exp(-delta * 5);
          currentMode += (input.current.mode - currentMode) * ease;
          pointer.x += (pointer.targetX - pointer.x) * ease;
          pointer.y += (pointer.targetY - pointer.y) * ease;
          draw();
        }
        frame = requestAnimationFrame(animate);
      };
      const render = () => {
        cancelAnimationFrame(frame);
        last = 0;
        if (motion.matches || input.current.paused) {
          currentMode = input.current.mode;
          pointer.x = pointer.y = 0;
        }
        draw();
        if (canAnimate()) frame = requestAnimationFrame(animate);
      };
      invalidate.current = render;
      const resize = () => {
        const bounds = stage.getBoundingClientRect();
        ratio = Math.min(window.devicePixelRatio || 1, 1.75);
        canvas.width = Math.max(1, Math.round(bounds.width * ratio));
        canvas.height = Math.max(1, Math.round(bounds.height * ratio));
        aspect = canvas.width / canvas.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
        render();
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !canAnimate()) return;
        const bounds = stage.getBoundingClientRect();
        pointer.targetX =
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.targetY =
          ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      };
      const leave = () => {
        pointer.targetX = pointer.targetY = 0;
      };
      const preference = () => {
        setReduced(motion.matches);
        render();
      };
      const contextLost = (event: Event) => {
        event.preventDefault();
        lost = true;
        cancelAnimationFrame(frame);
        setReady(false);
      };
      const contextRestored = () => setGeneration((value) => value + 1);
      const resizeObserver = new ResizeObserver(resize);
      const intersection = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        render();
      });
      resizeObserver.observe(stage);
      intersection.observe(stage);
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);
      motion.addEventListener("change", preference);
      document.addEventListener("visibilitychange", render);
      canvas.addEventListener("webglcontextlost", contextLost);
      canvas.addEventListener("webglcontextrestored", contextRestored);
      resize();
      setReady(true);
      return () => {
        invalidate.current = () => {};
        resizeObserver.disconnect();
        intersection.disconnect();
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerleave", leave);
        motion.removeEventListener("change", preference);
        document.removeEventListener("visibilitychange", render);
        canvas.removeEventListener("webglcontextlost", contextLost);
        canvas.removeEventListener("webglcontextrestored", contextRestored);
        dispose();
      };
    } catch {
      dispose();
      setReady(false);
    }
  }, [generation]);

  const selectMode = (value: number) => {
    input.current.mode = value;
    setMode(value);
    invalidate.current();
  };
  const togglePause = () => {
    input.current.paused = !input.current.paused;
    setPaused(input.current.paused);
    invalidate.current();
  };

  return (
    <figure
      className="observatory-object"
      aria-label="An interactive study of signals and form"
    >
      <div className="object-topline">
        <span>Study 001 — Signals into form</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div
        className="object-stage"
        ref={stageRef}
        data-renderer={ready ? "webgl" : "still"}
      >
        <div
          className={`object-fallback object-fallback-${mode}`}
          aria-hidden="true"
          hidden={ready}
        >
          <svg viewBox="0 0 500 500" fill="none">
            <g transform="translate(250 250) rotate(-28)" stroke="currentColor">
              {Array.from({ length: 28 }, (_, i) => (
                <ellipse
                  key={i}
                  rx={
                    mode === 1
                      ? 155
                      : 115 + 42 * Math.cos((i / 28) * Math.PI * 2)
                  }
                  ry={
                    mode === 1
                      ? Math.max(
                          8,
                          155 * Math.abs(Math.cos((i / 28) * Math.PI)),
                        )
                      : 78 + 30 * Math.cos((i / 28) * Math.PI * 2)
                  }
                  transform={`rotate(${mode === 2 ? i * 6 : 0}) translate(0 ${mode === 1 ? 0 : 62 * Math.sin((i / 28) * Math.PI * 2)})`}
                  opacity=".45"
                />
              ))}
            </g>
          </svg>
        </div>
        <canvas ref={canvasRef} aria-hidden="true" />
        <span className="object-axis axis-top" aria-hidden="true">
          +
        </span>
        <span className="object-axis axis-bottom" aria-hidden="true">
          +
        </span>
      </div>
      <figcaption>
        <div
          className="object-controls"
          role="group"
          aria-label="Sculpture form"
        >
          {MODES.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={mode === index}
              onClick={() => selectMode(index)}
            >
              {item.name}
            </button>
          ))}
          <button
            className="motion-toggle"
            type="button"
            onClick={togglePause}
            disabled={reduced || !ready}
            aria-label={
              reduced
                ? "Motion reduced by system preference"
                : !ready
                  ? "Still illustration"
                  : paused
                    ? "Resume sculpture motion"
                    : "Pause sculpture motion"
            }
            aria-pressed={paused || reduced || !ready}
          >
            {paused || reduced || !ready ? (
              <Play size={13} aria-hidden="true" />
            ) : (
              <Pause size={13} aria-hidden="true" />
            )}
          </button>
        </div>
        <p className="object-note" aria-live="polite">
          {MODES[mode].note}
        </p>
      </figcaption>
    </figure>
  );
}
