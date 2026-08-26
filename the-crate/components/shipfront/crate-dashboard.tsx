"use client";

import { useMemo, useState } from "react";
import { CardSurface } from "@/components/shipfront/dynamic-card";
import { shipmentEvents, shipments } from "@/data/shipments";
import type { Shipment } from "@/types/shipfront";
import { cx, statusTone } from "@/lib/utils";

export function CrateDashboard() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(shipments[1].id);
  const selected = shipments.find((row) => row.id === selectedId) ?? shipments[0];
  const events = shipmentEvents[selected.id] ?? [];

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shipments;
    return shipments.filter((row) =>
      [row.reference, row.origin, row.destination, row.carrier, row.owner, row.mode].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="crate" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-36" aria-labelledby="crate-heading">
      <div className="mx-auto max-w-[1520px]">
        <p className="label">03 - The Crate</p>
        <h2 id="crate-heading" className="display mt-5 max-w-[12ch] text-[clamp(3rem,5vw,6rem)]">
          One place to run the move.
        </h2>
        <p className="mt-6 max-w-[40em] text-lg text-sf-muted">
          The Crate brings every system signal into a shared workspace: carrier events, ETAs, documents, cost, risk, owners, communications, and next actions.
        </p>

        <CardSurface padded={false} className="mt-12 overflow-hidden rounded-[16px]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sf-line px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold tracking-[0.16em]">SHIPFRONT</span>
              <span className="mono text-[11px] text-sf-muted">North America Operations</span>
            </div>
            <label className="sr-only" htmlFor="crate-search">
              Search shipment, PO, container, BOL
            </label>
            <input
              id="crate-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search shipment, PO, container, BOL…"
              className="min-h-10 min-w-[220px] flex-1 border border-sf-line px-3 text-sm"
            />
            <span className="mono text-[11px] text-sf-muted">26 AUG / PDT</span>
          </div>

          <div className="grid lg:grid-cols-[180px_minmax(0,1fr)_300px]">
            <aside className="hidden border-r border-sf-line p-4 lg:block">
              <p className="label">Workspace</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Overview", "Shipments", "Exceptions", "Documents", "Carriers", "Analytics", "Settings"].map((item) => (
                  <li key={item}>
                    <span className={cx("block px-2 py-1", item === "Shipments" && "bg-sf-blue-pale text-sf-blue-dark")}>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <ShipmentTable rows={rows} selectedId={selected.id} onSelect={setSelectedId} />

            <aside className="border-t border-sf-line p-4 lg:border-l lg:border-t-0">
              <p className="label">Inspector</p>
              <h3 className="mt-3 text-xl font-semibold">{selected.reference}</h3>
              <p className="mt-1 text-sm text-sf-muted">
                {selected.origin} → {selected.destination}
              </p>
              <p className="mt-4 text-sm">
                Status <strong>{selected.status}</strong>
              </p>
              <p className="text-sm">Owner {selected.owner}</p>
              <p className="text-sm">Risk {selected.risk}</p>
              <ol className="mt-5 space-y-2">
                {events.map((event) => (
                  <li key={event.title} className="border-l-2 border-sf-line pl-3 text-sm">
                    <span className="mono text-[11px] text-sf-muted">{event.time}</span>
                    <span className="block font-medium">{event.title}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </CardSurface>
      </div>
    </section>
  );
}

function ShipmentTable({
  rows,
  selectedId,
  onSelect,
}: {
  rows: Shipment[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [tip, setTip] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-sf-line text-[11px] uppercase tracking-[0.12em] text-sf-muted">
          <tr>
            {["Shipment", "Route", "Mode", "Carrier", "Status", "ETA", "Risk", "Owner"].map((col) => (
              <th key={col} className="px-3 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={cx("row-live border-b border-sf-line", selectedId === row.id && "bg-sf-blue-pale")}
              onMouseEnter={() => setTip(row.id)}
              onMouseLeave={() => setTip((current) => (current === row.id ? null : current))}
            >
              <td className="relative px-3 py-3">
                <button type="button" className="text-left font-medium underline-offset-2 hover:underline" onClick={() => onSelect(row.id)}>
                  {row.reference}
                </button>
                {tip === row.id ? (
                  <div className="absolute left-3 top-full z-20 mt-1 w-64 rounded-[12px] border border-sf-line bg-white p-3 text-xs shadow-[0_12px_30px_rgba(16,17,17,0.1)]">
                    <p className="font-semibold">{row.reference}</p>
                    <p className="mt-1 text-sf-muted">
                      {row.origin} to {row.destination}. {row.status}. Owner {row.owner}.
                    </p>
                  </div>
                ) : null}
              </td>
              <td className="px-3 py-3 text-sf-muted">
                {row.origin} → {row.destination}
              </td>
              <td className="px-3 py-3">{row.mode}</td>
              <td className="px-3 py-3">{row.carrier}</td>
              <td className="px-3 py-3">
                <StatusChip status={row.status} />
              </td>
              <td className="mono px-3 py-3">{row.eta}</td>
              <td className="px-3 py-3">{row.risk}</td>
              <td className="px-3 py-3">{row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const tone = statusTone(status);
  const color =
    tone === "lime" ? "bg-sf-lime text-sf-ink" : tone === "orange" ? "bg-sf-orange text-sf-ink" : tone === "red" ? "bg-sf-red text-white" : "bg-sf-soft";
  return <span className={cx("px-2 py-1 text-[11px] font-semibold", color)}>{status}</span>;
}
