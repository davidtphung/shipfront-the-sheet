"use client";

import { useState } from "react";
import { CardSurface } from "@/components/shipfront/dynamic-card";
import { workflowSteps } from "@/data/workflows";
import { cx } from "@/lib/utils";

export function WorkflowStory() {
  const [active, setActive] = useState(0);
  const step = workflowSteps[active];

  return (
    <section className="px-5 py-24 md:px-8 md:py-36" aria-labelledby="how-heading">
      <div className="mx-auto max-w-[1520px]">
        <p className="label">06 - How it works</p>
        <h2 id="how-heading" className="display mt-5 max-w-[14ch] text-[clamp(3rem,5vw,5.8rem)]">
          From booking to delivery, one thread.
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="space-y-3">
            {workflowSteps.map((item, index) => (
              <li key={item.index}>
                <CardSurface
                  as="button"
                  type="button"
                  padded={false}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cx("w-full rounded-[14px] px-4 py-4 text-left", active === index && "border-sf-ink")}
                >
                  <span className="mono text-[11px] text-sf-blue">
                    {item.index} - {item.title}
                  </span>
                  <span className="mt-2 block text-xl font-semibold tracking-tight">{item.headline}</span>
                  <span className="mt-2 block text-sf-muted">{item.copy}</span>
                </CardSurface>
              </li>
            ))}
          </ol>
          <CardSurface className="sticky top-28 h-fit rounded-[16px]">
            <p className="label">Operational thread</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{step.title}</p>
            <svg viewBox="0 0 480 220" className="mt-8 w-full" role="img" aria-label="Abstract route from warehouse to destination">
              <path className="route-dash" d="M20 170 C 80 170, 90 50, 170 50 S 250 170, 320 120 420 40, 460 40" fill="none" stroke="#1E63FF" strokeWidth="2" />
              {["WH", "PORT", "CORRIDOR", "DC", "DOOR"].map((label, index) => {
                const x = 20 + index * 110;
                const y = [170, 50, 150, 90, 40][index];
                return (
                  <g key={label}>
                    <rect x={x - 16} y={y - 16} width="32" height="20" fill={index === active ? "#1E63FF" : "#FFFFFF"} stroke="#101111" />
                    <text x={x} y={y - 2} textAnchor="middle" fontSize="8" fill={index === active ? "#FFFFFF" : "#101111"} fontFamily="var(--font-geist-mono)">
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="mono mt-4 text-[12px] text-sf-muted">SF-01 / {step.index} / {step.title.toUpperCase()}</p>
          </CardSurface>
        </div>
      </div>
    </section>
  );
}
