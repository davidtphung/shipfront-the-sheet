"use client";

import { useEffect, useRef, useState } from "react";
import { metrics } from "@/data/metrics";
import { usePrefersReducedMotion } from "@/lib/motion";

export function MetricsStrip() {
  return (
    <section className="bg-sf-night px-5 py-20 text-sf-night-text md:px-8 md:py-28" aria-labelledby="metrics-title">
      <div className="mx-auto max-w-[1520px]">
        <p className="label text-sf-night-muted">Live system sample</p>
        <h2 id="metrics-title" className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,4vw,4.6rem)]">
          Freight is moving. Your system should be too.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-sf-night-muted">Illustrative product-demo values. Not verified customer statistics.</p>
        <div className="mt-12 grid gap-px bg-sf-night-line sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="bg-sf-night p-6">
              <p className="mono text-[11px] tracking-[0.16em] text-sf-night-muted">{metric.label}</p>
              <p className="mt-5 font-mono text-[clamp(2.4rem,4vw,3.6rem)] leading-none tracking-tight">
                <CountUp value={metric.value} />
              </p>
              <div className="mt-6 h-1 w-10 bg-sf-blue" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ value }: { value: string }) {
  const reduced = usePrefersReducedMotion();
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  const prefix = value.startsWith("<") ? "< " : "";
  const suffix = value.includes("%") ? "%" : value.includes("min") ? " min" : value.includes(",") ? "" : "";
  const [shown, setShown] = useState(reduced || Number.isNaN(numeric) ? value : prefix + "0" + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || Number.isNaN(numeric) || started.current) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 900, 1);
          const current = Math.round(numeric * progress);
          setShown(`${prefix}${current.toLocaleString()}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
          else setShown(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [numeric, prefix, reduced, suffix, value]);

  return <span ref={ref}>{shown}</span>;
}
