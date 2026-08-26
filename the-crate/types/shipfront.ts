export type ShipmentStatus = "On track" | "At risk" | "Delayed" | "Delivered";

export interface Shipment {
  id: string;
  reference: string;
  origin: string;
  destination: string;
  mode: "Ocean" | "Air" | "Rail" | "Truck" | "Intermodal";
  status: ShipmentStatus;
  eta: string;
  carrier: string;
  riskScore: number;
  progress: number;
  owner: string;
  risk: "Low" | "Medium" | "High";
}

export interface ShipmentEvent {
  time: string;
  title: string;
  location: string;
  status: "complete" | "current" | "upcoming" | "alert";
}

export interface Exception {
  id: string;
  severity: "critical" | "watch" | "resolved";
  title: string;
  shipmentId: string;
  impact: string;
  recommendedAction: string;
  owner: string;
  etaImpact: string;
  timeRemaining: string;
}

export interface Metric {
  label: string;
  value: string;
  delta?: string;
  tone?: "positive" | "neutral" | "warning";
  sample?: string;
}

export interface WorkflowStep {
  index: string;
  title: string;
  headline: string;
  copy: string;
}

export interface Industry {
  index: string;
  name: string;
  problem: string;
  benefit: string;
  detail: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  span: "wide" | "tall" | "base";
}

export interface IntegrationNode {
  id: string;
  label: string;
  copy: string;
}
