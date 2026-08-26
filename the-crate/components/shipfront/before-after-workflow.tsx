"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const fragments = [
  { title: "Master Shipment Tracker v18 FINAL.xlsx", body: "ETA pasted twice. Column G conflicts with column R.", rot: -3, x: -18, y: 8 },
  { title: "Carrier portal", body: "Last refresh 11 hours ago. ETA still reads on time.", rot: 2, x: 10, y: -6 },
  { title: "RE: Urgent update needed", body: "Can someone confirm if SF-2408-1187 cleared Colton?", rot: -1.5, x: -8, y: 18 },
  { title: "BOL-1187.pdf", body: "Scanned. Sitting in a shared drive named Finance2.", rot: 3, x: 16, y: 12 },
  { title: "Who owns SF-2408-1187?", body: "Slack thread. 14 replies. No assignee.", rot: -2, x: 4, y: -10 },
  { title: "Call carrier", body: "Sticky note on the monitor. Number is a hunt group.", rot: 1, x: -12, y: 22 },
];

export function BeforeAfterWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const unify = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const crateOpacity = useTransform(unify, (value) => Math.max(0.25, value));

  return (
    <div ref={ref} className="mt-16 grid gap-6 lg:grid-cols-2">
      <div>
        <p className="label">Before Shipfront</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">The fragmented workflow</h3>
        <div className="relative mt-6 min-h-[520px] overflow-hidden border border-sf-line bg-[#f3efe6] p-4">
          {fragments.map((item, index) => (
            <FragmentCard key={item.title} item={item} index={index} unify={unify} reduced={reduced} />
          ))}
          <motion.div
            className="absolute inset-x-6 bottom-6 border border-sf-orange bg-[#fff6ed] p-3 text-sm"
            style={{ opacity: reduced ? 1 : unify }}
          >
            Data conflict detected
          </motion.div>
        </div>
      </div>

      <div>
        <p className="label">With The Crate</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">One live operational thread</h3>
        <motion.div
          className="mt-6 border border-sf-line bg-sf-paper p-5"
          style={{ opacity: reduced ? 1 : crateOpacity }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="mono text-[12px]">SF-2408-1187</p>
            <span className="bg-sf-orange px-2 py-1 font-mono text-[11px] font-semibold">AT RISK</span>
          </div>
          <p className="mt-5 text-2xl font-semibold tracking-tight">Reserve alternate rail capacity before 14:00 PDT</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <Item label="Owner" value="Maya Chen" />
            <Item label="ETA variance" value="+18h" />
            <Item label="Documents" value="Complete" />
            <Item label="Customer update" value="Draft ready" />
          </dl>
          <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            {["Current location", "Route timeline", "Carrier events", "Delay risk", "Documents", "Next action"].map((item) => (
              <li key={item} className="border border-sf-line px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function FragmentCard({
  item,
  index,
  unify,
  reduced,
}: {
  item: (typeof fragments)[number];
  index: number;
  unify: ReturnType<typeof useTransform<number, number>>;
  reduced: boolean;
}) {
  const x = useTransform(unify, [0, 1], [item.x * 3, 0]);
  const y = useTransform(unify, [0, 1], [item.y * 2, index * 4]);
  const rotate = useTransform(unify, [0, 1], [item.rot, 0]);

  return (
    <motion.article
      className="absolute w-[min(280px,70%)] border border-black/15 bg-white/90 p-3 shadow-sm"
      style={{
        left: `${10 + (index % 2) * 36}%`,
        top: `${8 + index * 11}%`,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        rotate: reduced ? 0 : rotate,
        zIndex: fragments.length - index,
      }}
    >
      <p className="font-medium">{item.title}</p>
      <p className="mt-1 text-sm text-sf-muted">{item.body}</p>
    </motion.article>
  );
}
