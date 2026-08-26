"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { BeforeAfterWorkflow } from "@/components/shipfront/before-after-workflow";

const pains = [
  {
    index: "01",
    title: "Updates arrive after the decision window.",
    copy: "When status is scattered, teams see exceptions after customers already feel them.",
    visual: "late",
  },
  {
    index: "02",
    title: "Ownership disappears between handoffs.",
    copy: "A shipment can move through five partners while nobody knows who is responsible for the next action.",
    visual: "owner",
  },
  {
    index: "03",
    title: "Visibility alone does not resolve risk.",
    copy: "A dot on a map is not a plan. The Crate turns shipment events into owned work.",
    visual: "action",
  },
] as const;

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-36" aria-labelledby="why-heading">
      <div className="mx-auto max-w-[1520px]">
        <p className="label">02 - Why Shipfront</p>
        <h2 id="why-heading" className="display mt-5 max-w-[14ch] text-[clamp(3rem,5vw,6.2rem)]">
          Shipping should not require detective work.
        </h2>
        <p className="mt-6 max-w-[40em] text-lg text-sf-muted">
          A shipment changes hands, crosses systems, and generates data everywhere. But when operations depend on portals, spreadsheets, inboxes, PDFs, and status calls, no one has the complete picture when it matters.
        </p>
        <BeforeAfterWorkflow />
        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {pains.map((pain) => (
            <PainCard key={pain.index} {...pain} />
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
}: {
  index: string;
  title: string;
  copy: string;
  visual: "late" | "owner" | "action";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <article ref={ref} className="border border-sf-line bg-sf-paper p-6">
      <p className="mono text-[12px] text-sf-blue">{index}</p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sf-muted">{copy}</p>
      <div className="mt-6 min-h-[148px] border border-sf-line bg-sf-soft/60 p-4">
        {visual === "late" ? <LateTimeline active={inView} /> : null}
        {visual === "owner" ? <OwnerShift active={inView} /> : null}
        {visual === "action" ? <ActionList active={inView} /> : null}
      </div>
    </article>
  );
}

function LateTimeline({ active }: { active: boolean }) {
  return (
    <div className="space-y-3">
      <p className="label">Inbound event</p>
      <div className="flex items-center justify-between text-sm">
        <span>Customer asked first</span>
        <span className="mono text-sf-muted">09:12</span>
      </div>
      <motion.div
        initial={{ opacity: 0.35, x: 0 }}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0.35 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="flex items-center justify-between border-l-2 border-sf-orange bg-sf-paper px-3 py-2 text-sm"
      >
        <span>Carrier delay posted</span>
        <span className="mono text-sf-orange">11:48</span>
      </motion.div>
    </div>
  );
}

function OwnerShift({ active }: { active: boolean }) {
  return (
    <div>
      <p className="label">Handoff</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="border border-sf-line bg-sf-paper px-2 py-1 text-sm text-sf-muted">Unassigned</span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="bg-sf-blue px-2 py-1 text-sm text-white"
        >
          Maya Chen / Operations
        </motion.span>
      </div>
    </div>
  );
}

function ActionList({ active }: { active: boolean }) {
  const items = ["Notify consignee", "Reserve alternative route", "Update delivery promise"];
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 text-sf-blue" />
        Map pin becomes work
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.2 * index, duration: 0.3 }}
            className="flex items-center gap-2 text-sm"
          >
            <Check className="h-4 w-4 text-sf-green" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
