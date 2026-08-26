"use client";

import { useState } from "react";
import { capabilities } from "@/data/industries";
import { DynamicCard } from "@/components/shipfront/dynamic-card";
import { cx } from "@/lib/utils";

export function CapabilitiesGrid() {
  return (
    <section id="operations" className="scroll-mt-24 bg-white px-5 py-24 md:px-8 md:py-36" aria-labelledby="cap-heading">
      <div className="mx-auto max-w-[1440px]">
        <p className="label">04 - Operate with context</p>
        <h2 id="cap-heading" className="display mt-5 max-w-[14ch] text-[clamp(3rem,5vw,5.6rem)]">
          The details that keep goods moving.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {capabilities.map((item, index) => (
            <DynamicCard
              key={item.id}
              delay={index * 0.06}
              className={cx(
                item.span === "wide" && "md:col-span-4",
                item.span === "tall" && "md:col-span-2 md:row-span-2",
                item.span === "base" && "md:col-span-2",
              )}
            >
              <p className="mono text-[11px] text-sf-blue">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sf-muted">{item.description}</p>
              <CapabilityVisual id={item.id} />
            </DynamicCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityVisual({ id }: { id: string }) {
  const [hot, setHot] = useState(0);

  if (id === "live") {
    return (
      <div className="mt-6 space-y-2" onMouseMove={(event) => setHot(Math.min(2, Math.floor((event.nativeEvent.offsetY || 0) / 28)))}>
        {["Long Beach", "Colton", "Chicago"].map((stop, index) => (
          <div
            key={stop}
            className={cx("row-live flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm", hot === index && "bg-sf-blue-pale")}
          >
            <span className={cx("live-dot h-2 w-2 rounded-full", index < 2 ? "bg-sf-blue" : "bg-sf-green")} />
            {stop}
            <span className="ml-auto mono text-[11px] text-sf-muted">{index < 2 ? "CLEAR" : "NEXT"}</span>
          </div>
        ))}
      </div>
    );
  }
  if (id === "exceptions") {
    return (
      <div className="mt-6 space-y-2 text-sm">
        <p className="row-live rounded-[10px] bg-sf-red/10 px-3 py-2">Critical · SF-2408-1223 · +18h</p>
        <p className="row-live rounded-[10px] bg-sf-orange/15 px-3 py-2">Watch · SF-2408-1187 · +4h</p>
      </div>
    );
  }
  if (id === "documents") {
    return (
      <div className="mt-6 grid gap-2 text-sm">
        {["BOL · Verified", "Packing list · Verified", "POD · Pending"].map((row) => (
          <p key={row} className="row-live rounded-[10px] border border-sf-line px-3 py-2">
            {row}
          </p>
        ))}
      </div>
    );
  }
  if (id === "routes") {
    return (
      <div className="mt-6 space-y-2 text-sm">
        <p className="row-live flex justify-between rounded-[10px] border border-sf-blue bg-sf-blue-pale px-3 py-2">
          Rail + dray <span className="mono">4d / $1,840</span>
        </p>
        <p className="row-live flex justify-between rounded-[10px] border border-sf-line px-3 py-2">
          Truck direct <span className="mono">2d / $2,610</span>
        </p>
      </div>
    );
  }
  if (id === "network") {
    return (
      <svg viewBox="0 0 260 80" className="mt-6 w-full" aria-hidden="true">
        <polyline className="route-dash" fill="none" stroke="#1E63FF" strokeWidth="2" points="0,60 40,48 80,52 120,28 160,34 200,16 260,22" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 90" className="mt-6 w-full" aria-hidden="true">
      <circle cx="110" cy="45" r="14" fill="#1E63FF" />
      <circle cx="30" cy="20" r="8" stroke="#101111" />
      <circle cx="190" cy="24" r="8" stroke="#101111" />
      <circle cx="36" cy="72" r="8" stroke="#101111" />
      <circle cx="184" cy="70" r="8" stroke="#101111" />
      <path d="M44 24 L96 40 M176 28 L124 40 M48 68 L98 52 M172 68 L124 52" stroke="#101111" strokeWidth="1" />
    </svg>
  );
}
