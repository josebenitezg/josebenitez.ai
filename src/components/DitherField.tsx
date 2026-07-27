"use client";

import { useEffect, useRef } from "react";

const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function DitherField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !context) {
      return;
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrame = 0;
    let previousFrame = 0;
    let visible = !document.hidden;

    const draw = (timestamp: number) => {
      const bounds = canvas.getBoundingClientRect();
      const pixelSize = bounds.width < 640 ? 5 : 4;
      const width = Math.max(1, Math.floor(bounds.width / pixelSize));
      const height = Math.max(1, Math.floor(bounds.height / pixelSize));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = false;
      }

      const pixels = context.createImageData(width, height);
      const time = timestamp * 0.00018;

      for (let y = 0; y < height; y += 1) {
        const normalizedY = y / height;

        for (let x = 0; x < width; x += 1) {
          const normalizedX = x / width;
          const offsetX =
            normalizedX - 0.61 + Math.sin(time * 0.8) * 0.025;
          const offsetY =
            normalizedY - 0.45 + Math.cos(time * 0.62) * 0.02;
          const distance = Math.sqrt(
            offsetX * offsetX * 0.72 + offsetY * offsetY * 1.34,
          );
          const falloff = 1 - clamp((distance - 0.04) / 0.62);
          const wave =
            Math.sin((normalizedX * 1.12 + normalizedY * 0.74) * 13 - time) *
            0.12;
          const contour =
            Math.cos(distance * 34 - time * 1.6) *
            Math.max(0, 0.12 - distance * 0.08);
          const light = clamp(falloff * 0.92 + wave + contour - 0.31);
          const threshold =
            (BAYER_4X4[(x % 4) + (y % 4) * 4] + 0.5) / 16;
          const pixelIndex = (y * width + x) * 4;

          if (light > threshold) {
            pixels.data[pixelIndex] = 231;
            pixels.data[pixelIndex + 1] = 229;
            pixels.data[pixelIndex + 2] = 228;
            pixels.data[pixelIndex + 3] = Math.round(72 + light * 92);
          }
        }
      }

      context.putImageData(pixels, 0, 0);
    };

    const animate = (timestamp: number) => {
      if (timestamp - previousFrame > 48) {
        draw(timestamp);
        previousFrame = timestamp;
      }

      if (!motionPreference.matches && visible) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const render = () => {
      window.cancelAnimationFrame(animationFrame);

      if (motionPreference.matches || !visible) {
        draw(0);
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      render();
    };

    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(canvas);
    motionPreference.addEventListener("change", render);
    document.addEventListener("visibilitychange", handleVisibility);
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      motionPreference.removeEventListener("change", render);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="hero-dither" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
