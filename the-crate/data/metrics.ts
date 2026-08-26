import type { Metric } from "@/types/shipfront";

// Illustrative product-demo values. Not customer-verified statistics.
export const metrics: Metric[] = [
  { label: "Active shipments", value: "1,284", delta: "+42", tone: "positive", sample: "LIVE SYSTEM SAMPLE" },
  { label: "Milestones ingested", value: "38,491", delta: "+1.2k", tone: "positive", sample: "LIVE SYSTEM SAMPLE" },
  { label: "Exceptions owned", value: "96%", delta: "+3pts", tone: "positive", sample: "LIVE SYSTEM SAMPLE" },
  { label: "Average status latency", value: "< 5 min", tone: "neutral", sample: "LIVE SYSTEM SAMPLE" },
];
