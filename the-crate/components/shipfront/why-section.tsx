"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, MapPin } from "lucide-react";
import { BeforeAfterWorkflow } from "@/components/shipfront/before-after-workflow";
import { DynamicCard } from "@/components/shipfront/dynamic-card";
import { easeOutExpo, usePrefersReducedMotion } from "@/lib/motion";

const pains = [
  {
    index: "01",
    title: "Too many systems",
    copy: "Carrier portals, spreadsheets, document folders, and inboxes create a fragmented view of the same shipment.",
    visual: "systems" as const,
  },
  {
    index: "02",
    title: "Exceptions arrive late",
    copy: "By the time a delay reaches your team, the customer promise may already be broken.",
    visual: "late" as const,
  },
  {
    index: "03",
    title: "Visibility is not control",
    copy: "A tracking page tells you where something is. An operating system tells you what to do next.",
    visual: "control" as const,
  },
];

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-24 bg-white px-5 py-24 md:px-8 md:py-36" aria-labelledby="why-heading">
      <div className="mx-auto max-w-[1440px]">
        <p className="label">02 - Why Shipfront</p>
        <h2 id="why-heading" className="display mt-5 max-w-[14ch] text-[clamp(3rem,5vw,6.2rem)]">
          Shipping should not require detective work.
        </h2>
        <p className="mt-6 max-w-[40em] text-lg text-sf-muted">
          Operations teams still chase updates across portals, inboxes, spreadsheets, PDFs, carrier sites, and calls. The Crate pulls the signal into one continuously updated operational view.
        </p>
        <BeforeAfterWorkflow />
        <div className="mt-20 grid gap-4 lg:grid-cols-3">
          {pains.map((pain, index) => (
            <PainCard key={pain.index} delay={index * 0.08} {...pain} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainCard({
  index,
  title,
  copy,
  visual,
  delay,
}: {
  index: string;
  title: string;
  copy: string;
  visual: "systems" | "late" | "control";
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [hover, setHover] = useState(false);
  const active = inView || hover;

  return (
    <DynamicCard delay={delay}>
      <div ref={ref} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex h-full flex-col">
        <p className="mono text-[12px] text-sf-blue">{index}</p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-sf-muted">{copy}</p>
        <div className="mt-6 min-h-[188px] overflow-hidden rounded-[12px] border border-sf-line bg-[#fafafa] p-4">
          {visual === "systems" ? <SystemsDemo active={active} /> : null}
          {visual === "late" ? <LateDemo active={active} /> : null}
          {visual === "control" ? <ControlDemo active={active} /> : null}
        </div>
      </div>
    </DynamicCard>
  );
}

function SystemsDemo({ active }: { active: boolean }) {
  const tiles = ["Portal", "Sheet", "Inbox", "PDF"];
  return (
    <div className="relative h-[156px]">
      {tiles.map((tile, index) => (
        <motion.div
          key={tile}
          className="absolute left-1/2 top-1/2 w-[46%] rounded-[10px] border border-sf-line bg-white px-3 py-2 text-sm shadow-sm"
          animate={
            active
              ? { x: "-50%", y: "-50%", rotate: 0, opacity: index === 0 ? 1 : 0.18, scale: 1 }
              : { x: `${-70 + index * 18}%`, y: `${-40 + index * 14}%`, rotate: -8 + index * 4, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.55, ease: easeOutExpo, delay: index * 0.04 }}
        >
          {tile}
        </motion.div>
      ))}
      <motion.p
        className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] text-sf-blue"
        animate={{ opacity: active ? 1 : 0 }}
      >
        One panel. SF-2408-1187
      </motion.p>
    </div>
  );
}

function LateDemo({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timers = [
      window.setTimeout(() => setPhase(0), 0),
      window.setTimeout(() => setPhase(1), 450),
      window.setTimeout(() => setPhase(2), 1200),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active]);
  const shown = active ? phase : 0;

  return (
    <div className="space-y-3">
      <p className="label">Timeline</p>
      <div className="flex items-center justify-between text-sm">
        <span>Customer asked first</span>
        <span className="mono text-sf-muted">09:12</span>
      </div>
      <AnimatePresence>
        {shown >= 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-[10px] border-l-2 border-sf-orange bg-white px-3 py-2 text-sm"
          >
            <span>Delay detected</span>
            <span className="mono text-sf-orange">+18h</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {shown >= 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-[10px] bg-sf-blue px-3 py-2 text-sm text-white"
          >
            <span>Task owned by Maya</span>
            <span className="mono">NOW</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ControlDemo({ active }: { active: boolean }) {
  const items = ["Notify customer", "Rebook", "Upload document", "Assign owner"];
  const reduced = usePrefersReducedMotion();
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 text-sf-blue" />
        {active ? "Recommendation" : "Map pin"}
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={false}
            animate={active || reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            transition={{ delay: 0.08 * index, duration: 0.28, ease: easeOutExpo }}
            className="flex items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-sm"
          >
            <Check className="h-4 w-4 text-sf-green" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
