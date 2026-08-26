"use client";

import { useState } from "react";
import { DynamicCard } from "@/components/shipfront/dynamic-card";
import { exceptions } from "@/data/exceptions";
import { cx } from "@/lib/utils";

export function ExceptionIntelligence() {
  const [selectedId, setSelectedId] = useState(exceptions[0].id);
  const [owned, setOwned] = useState(false);
  const selected = exceptions.find((item) => item.id === selectedId) ?? exceptions[0];

  return (
    <section className="night-grid bg-sf-night px-5 py-24 text-sf-night-text md:px-8 md:py-36" aria-labelledby="intel-heading">
      <div className="mx-auto max-w-[1520px]">
        <p className="label text-sf-night-muted">05 - Intelligence</p>
        <h2 id="intel-heading" className="display mt-5 max-w-[12ch] text-[clamp(3rem,5vw,5.8rem)]">
          See the risk. Make the move.
        </h2>
        <p className="mt-6 max-w-[38em] text-lg text-sf-night-muted">
          The Crate converts shipment events into operational priorities so your team knows what needs action, who owns it, and how much time remains.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <DynamicCard tone="night" as="div">
            <p className="-mx-6 -mt-6 border-b border-sf-night-line px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-sf-night-muted">
              Exception queue
            </p>
            <ul>
              {exceptions.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={cx(
                      "flex w-full items-start gap-3 border-b border-sf-night-line px-4 py-3 text-left",
                      selectedId === item.id && "bg-white/5",
                    )}
                  >
                    <span
                      className={cx(
                        "mt-1 h-2 w-2 rounded-full",
                        item.severity === "critical" && "bg-sf-red",
                        item.severity === "watch" && "bg-sf-orange",
                        item.severity === "resolved" && "bg-sf-green",
                      )}
                    />
                    <span>
                      <span className="mono block text-[11px] text-sf-night-muted">{item.shipmentId}</span>
                      <span className="block text-sm">{item.title}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </DynamicCard>

          <DynamicCard tone="night" as="div">
            <p className="label text-sf-night-muted">Route</p>
            <svg viewBox="0 0 360 220" className="mt-4 w-full" role="img" aria-label="Original and contingency path for the selected exception">
              <path d="M30 160 C 90 40, 180 40, 220 110 S 300 190, 340 70" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <path className="route-dash" d="M30 160 C 110 120, 170 150, 240 80 S 300 60, 340 70" fill="none" stroke="#1E63FF" strokeWidth="2" />
              <circle cx="30" cy="160" r="5" fill="#C7FF3D" />
              <circle cx="220" cy="110" r="6" fill="#ED4B4B" />
              <circle cx="340" cy="70" r="5" fill="#F4F7F3" />
            </svg>
            <p className="mt-4 text-sm text-sf-night-muted">Blue path is the contingency. Red mark is the congestion zone.</p>
          </DynamicCard>

          <DynamicCard tone="night" as="div">
            <p className="label text-sf-night-muted">Recommendation</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{selected.recommendedAction}</h3>
            <p className="mt-3 text-sf-night-muted">{selected.impact}</p>
            <p className="mt-2 text-sm">Confidence: High</p>
            <p className="mono mt-4 text-[12px]">Decision window: {selected.timeRemaining}</p>
            <p className="mt-2 text-sm">Owner: {owned ? "Maya Chen" : selected.owner}</p>
            <div className="mt-6 flex flex-col gap-2">
              <button type="button" className="min-h-11 bg-sf-blue text-white" onClick={() => setOwned(true)}>
                Assign owner
              </button>
              <button type="button" className="min-h-11 border border-sf-night-line">
                Notify customer
              </button>
              <button type="button" className="min-h-11 border border-sf-night-line">
                Create contingency
              </button>
            </div>
          </DynamicCard>
        </div>
      </div>
    </section>
  );
}
