const leftCopy = [
  "LIVE SHIPMENT VISIBILITY",
  "SF-2408-1187",
  "SHANGHAI → LONG BEACH",
  "TRACK. DECIDE. DELIVER.",
];

const rightCopy = [
  "ONE SYSTEM FOR EVERY MOVE",
  "06:43 UTC",
  "LONG BEACH → CHICAGO",
  "LIVE SHIPMENT VISIBILITY",
];

function Row({
  items,
  direction,
  className,
}: {
  items: string[];
  direction: "left" | "right";
  className: string;
}) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`} aria-hidden="true">
      <div className={`marquee-track flex w-max gap-10 whitespace-nowrap py-3 ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10 text-[13px] font-bold tracking-[0.18em] md:text-[18px]">
            <span className="inline-block h-2 w-2 rounded-full bg-current" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section aria-label="Live network ticker" className="relative z-20">
      <p className="sr-only">Live shipment visibility. One system for every move. Track. Decide. Deliver.</p>
      <Row items={leftCopy} direction="left" className="bg-sf-lime text-sf-ink" />
      <Row items={rightCopy} direction="right" className="bg-sf-ink text-sf-lime" />
    </section>
  );
}
