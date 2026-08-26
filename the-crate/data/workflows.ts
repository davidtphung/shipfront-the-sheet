import type { WorkflowStep } from "@/types/shipfront";

export const workflowSteps: WorkflowStep[] = [
  {
    index: "01",
    title: "Plan",
    headline: "Compare routes before the commitment.",
    copy: "Balance cost, transit time, cutoff windows, service reliability, and operational risk.",
  },
  {
    index: "02",
    title: "Book",
    headline: "Start every move with shared context.",
    copy: "Create a shipment with owners, documents, requirements, and a clear delivery promise.",
  },
  {
    index: "03",
    title: "Track",
    headline: "See every event as it happens.",
    copy: "Follow milestones, update ETAs, and connect carrier signals to the shipment record.",
  },
  {
    index: "04",
    title: "Resolve",
    headline: "Turn exceptions into owned work.",
    copy: "Assign actions, coordinate alternatives, and keep customers informed before they have to ask.",
  },
  {
    index: "05",
    title: "Learn",
    headline: "Make the next move smarter.",
    copy: "Use network performance to improve carrier strategy, forecast risk, and reduce operational drag.",
  },
];
