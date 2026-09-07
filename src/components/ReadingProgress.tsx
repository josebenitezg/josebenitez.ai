"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ReadingProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLSpanElement>(null);
  const reading = pathname.startsWith("/blog/");
  useEffect(() => {
    if (!reading) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.querySelector(".reading-body");
      if (!article || !bar.current) return;
      const rect = article.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight + 100);
      const progress = Math.min(1, Math.max(0, (100 - rect.top) / range));
      bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, reading]);
  return (
    <div className="reading-progress" aria-hidden="true" hidden={!reading}>
      <span ref={bar} />
    </div>
  );
}
