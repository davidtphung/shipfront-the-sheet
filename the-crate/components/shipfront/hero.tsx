"use client";

import { motion } from "framer-motion";
import { heroShipment, shipmentEvents } from "@/data/shipments";
import { easeOutExpo, usePrefersReducedMotion } from "@/lib/motion";

const lines = ["Every shipment.", "One operational", "view."];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const events = shipmentEvents[heroShipment.id];

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pt-40 lg:px-12" aria-labelledby="hero-title">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-[1520px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,640px)] lg:items-end">
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="label"
          >
            The Crate - Freight operating system
          </motion.p>
          <h1 id="hero-title" className="display mt-6 max-w-[16ch] text-[clamp(4rem,8vw,8.4rem)]">
            {lines.map((line, index) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={reduced ? false : { y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.12 * index, ease: easeOutExpo }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: easeOutExpo }}
            className="mt-8 max-w-[38em] text-lg text-sf-muted md:text-[1.15rem]"
          >
            Shipfront brings live carrier events, shipping documents, ownership, exceptions, and routing decisions into one command center for the teams moving physical goods.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.45, ease: easeOutExpo }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a className="inline-flex min-h-12 items-center bg-sf-blue px-5 text-[15px] font-medium text-white transition-transform hover:translate-x-0.5" href="#access">
              Request access →
            </a>
            <a className="inline-flex min-h-12 items-center border border-sf-ink px-5 text-[15px] font-medium" href="#crate">
              Explore The Crate ↓
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: easeOutExpo }}
          className="relative"
        >
          <span className="pointer-events-none absolute -right-4 -top-16 font-mono text-[120px] font-bold leading-none text-sf-ink/5 md:text-[180px]">
            01
          </span>
          <div className="relative overflow-hidden rounded-[12px] border border-sf-line bg-sf-paper p-4 shadow-[0_20px_60px_rgba(16,17,17,0.06)] md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="mono text-[11px] tracking-[0.14em] text-sf-muted">SF-2408-1187 / INTERMODAL</p>
              <span className="bg-sf-lime px-2 py-1 font-mono text-[11px] font-semibold text-sf-ink">ON TRACK</span>
            </div>
            <ShipmentMap />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="border border-sf-line p-3">
                <p className="label">Shipment health</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">72%</p>
                <p className="mono mt-1 text-[12px] text-sf-muted">ETA AUG 28 / 09:40</p>
                <div className="mt-3 h-1 bg-sf-soft">
                  <div className="h-full w-[72%] bg-sf-blue" />
                </div>
              </div>
              <div className="border border-sf-line p-3">
                <p className="label">Assigned owner</p>
                <p className="mt-2 font-semibold">Maya Chen</p>
                <p className="mt-1 text-sm text-sf-muted">Pacific + Rail</p>
                <p className="mono mt-3 text-[12px] text-sf-muted">RISK 18 / LOW</p>
              </div>
              <div className="border border-sf-line p-3 md:col-span-2">
                <p className="label">Recent activity</p>
                <ol className="mt-3 space-y-2">
                  {events.map((event) => (
                    <li key={event.title} className="flex items-start justify-between gap-3 text-sm">
                      <span>
                        <span className="font-medium">{event.title}</span>
                        <span className="block text-sf-muted">{event.location}</span>
                      </span>
                      <span className="mono text-[11px] text-sf-muted">{event.time}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShipmentMap() {
  return (
    <svg viewBox="0 0 560 220" className="h-auto w-full" role="img" aria-label="Route from Long Beach through Chicago to New York for shipment SF-2408-1187">
      <path className="route-dash" d="M48 168 C 140 40, 250 40, 300 110 S 430 190, 512 72" fill="none" stroke="#1E63FF" strokeWidth="2" />
      <circle cx="48" cy="168" r="6" fill="#101111" />
      <circle cx="300" cy="110" r="6" fill="#1E63FF" />
      <circle cx="512" cy="72" r="6" fill="#C7FF3D" stroke="#101111" strokeWidth="2" />
      <text x="48" y="196" className="fill-sf-muted" fontSize="11" fontFamily="var(--font-geist-mono)">
        LONG BEACH
      </text>
      <text x="268" y="138" className="fill-sf-muted" fontSize="11" fontFamily="var(--font-geist-mono)">
        CHICAGO
      </text>
      <text x="456" y="58" className="fill-sf-muted" fontSize="11" fontFamily="var(--font-geist-mono)">
        NEW YORK
      </text>
    </svg>
  );
}
