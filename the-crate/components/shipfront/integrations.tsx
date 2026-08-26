"use client";

import { useState } from "react";
import { CardSurface } from "@/components/shipfront/dynamic-card";
import { integrationNodes } from "@/data/industries";

export function Integrations() {
  const [active, setActive] = useState(integrationNodes[0].id);
  const selected = integrationNodes.find((node) => node.id === active) ?? integrationNodes[0];

  return (
    <section id="integrations" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-36" aria-labelledby="int-heading">
      <div className="mx-auto max-w-[1520px]">
        <h2 id="int-heading" className="display max-w-[16ch] text-[clamp(3rem,5vw,5.4rem)]">
          Fits the systems that move your business.
        </h2>
        <p className="mt-6 max-w-[38em] text-lg text-sf-muted">
          Shipfront connects the signals your operation already depends on, then turns them into a shared source of truth.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrationNodes.map((node) => (
            <CardSurface
              key={node.id}
              as="button"
              type="button"
              padded={false}
              onClick={() => setActive(node.id)}
              className={`w-full rounded-[14px] px-4 py-4 text-left ${active === node.id ? "border-sf-ink" : ""}`}
            >
              <span className="block font-semibold">{node.label}</span>
            </CardSurface>
          ))}
        </div>
        <CardSurface className="mt-6 rounded-[16px]">
          <p className="label">Selected category</p>
          <p className="mt-3 text-2xl font-semibold">{selected.label}</p>
          <p className="mt-2 max-w-2xl text-sf-muted">{selected.copy}</p>
          <a className="mt-6 inline-flex min-h-11 items-center text-sf-blue" href="#access">
            Build on Shipfront →
          </a>
          <p className="mt-2 max-w-xl text-sm text-sf-muted">
            Use APIs, webhooks, and structured shipment events to bring operational context into the tools your team already uses.
          </p>
        </CardSurface>
      </div>
    </section>
  );
}
