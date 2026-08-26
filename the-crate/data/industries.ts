import type { Capability, Industry, IntegrationNode } from "@/types/shipfront";

export const capabilities: Capability[] = [
  {
    id: "live",
    title: "Live shipment command",
    description: "Track every leg, event, document, and owner in a single operational timeline.",
    span: "wide",
  },
  {
    id: "exceptions",
    title: "Exception intelligence",
    description: "Prioritize risk by impact, assign an owner, and act before a missed promise becomes a customer problem.",
    span: "base",
  },
  {
    id: "documents",
    title: "Documents that stay attached",
    description: "Bills of lading, packing lists, customs records, proofs of delivery, and notes stay with the shipment.",
    span: "base",
  },
  {
    id: "routes",
    title: "Route and carrier decisions",
    description: "Compare transit, reliability, cost, cutoff windows, and capacity before you commit.",
    span: "tall",
  },
  {
    id: "network",
    title: "Network performance",
    description: "Find dwell time, delay patterns, cost drift, and carrier performance across the network.",
    span: "base",
  },
  {
    id: "stack",
    title: "Built for your stack",
    description: "Connect carrier, warehouse, ERP, and customer systems without adding another layer of manual work.",
    span: "base",
  },
];

export const industries: Industry[] = [
  {
    index: "01",
    name: "Freight forwarders",
    problem: "Commitments span carriers, modes, and inboxes.",
    benefit: "Manage customer commitments across carriers, modes, documents, and exceptions.",
    detail: "One thread per house bill.",
  },
  {
    index: "02",
    name: "Retailers",
    problem: "Inbound noise hides the late container.",
    benefit: "Protect inventory availability and delivery promises across a changing inbound network.",
    detail: "Promise vs actual, per PO.",
  },
  {
    index: "03",
    name: "Manufacturers",
    problem: "Components and finished goods live in different tools.",
    benefit: "Coordinate inbound components and outbound finished goods from one operational timeline.",
    detail: "Line-down risk, owned.",
  },
  {
    index: "04",
    name: "3PLs",
    problem: "Customers ask for status you already answered.",
    benefit: "Give teams and customers a trusted live view without a trail of status emails.",
    detail: "Shared workspace, not a PDF.",
  },
  {
    index: "05",
    name: "E-commerce operations",
    problem: "The store moves faster than the floor report.",
    benefit: "Keep pickup, pack, and last-mile exceptions inside the same operational view.",
    detail: "Cutoff clocks stay visible.",
  },
  {
    index: "06",
    name: "Industrial supply chains",
    problem: "Multimodal moves lose an owner between legs.",
    benefit: "Keep the next action attached as freight changes hands.",
    detail: "Handoff is a record, not a rumor.",
  },
];

export const integrationNodes: IntegrationNode[] = [
  { id: "carrier", label: "Carrier and tracking feeds", copy: "Ingest milestone events and ETAs without opening another portal." },
  { id: "tms", label: "TMS", copy: "Keep planning and execution on the same shipment object." },
  { id: "wms", label: "WMS", copy: "Dock events land on the move they belong to." },
  { id: "erp", label: "ERP", copy: "Orders, costs, and owners stay aligned with the live shipment." },
  { id: "commerce", label: "Commerce", copy: "Store promises read from the same operational thread." },
  { id: "edi", label: "EDI", copy: "Structured partner messages become events, not attachments." },
  { id: "support", label: "Customer support", copy: "Give the desk a current status and a named owner." },
  { id: "warehouse", label: "Data warehouse", copy: "Export clean shipment history for the models you already run." },
  { id: "api", label: "Webhooks and API", copy: "Push shipment events into the tools your team already uses." },
];
