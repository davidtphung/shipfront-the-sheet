import type { Shipment, ShipmentEvent } from "@/types/shipfront";

export const shipments: Shipment[] = [
  {
    id: "s-1187",
    reference: "SF-2408-1187",
    origin: "Long Beach",
    destination: "Chicago",
    mode: "Intermodal",
    status: "On track",
    eta: "Aug 28, 09:40",
    carrier: "Pacific + Rail",
    riskScore: 18,
    progress: 72,
    owner: "Maya Chen",
    risk: "Low",
  },
  {
    id: "s-1223",
    reference: "SF-2408-1223",
    origin: "Shanghai",
    destination: "Los Angeles",
    mode: "Ocean",
    status: "At risk",
    eta: "Aug 27, 21:15",
    carrier: "Evergreen",
    riskScore: 61,
    progress: 54,
    owner: "Daniel Park",
    risk: "Medium",
  },
  {
    id: "s-1231",
    reference: "SF-2408-1231",
    origin: "Rotterdam",
    destination: "Newark",
    mode: "Ocean",
    status: "Delayed",
    eta: "Aug 30, 14:30",
    carrier: "Maersk",
    riskScore: 84,
    progress: 41,
    owner: "Unassigned",
    risk: "High",
  },
  {
    id: "s-1249",
    reference: "SF-2408-1249",
    origin: "Dallas",
    destination: "Atlanta",
    mode: "Truck",
    status: "On track",
    eta: "Aug 26, 16:20",
    carrier: "Redwood Freight",
    riskScore: 12,
    progress: 88,
    owner: "Priya Shah",
    risk: "Low",
  },
];

export const heroShipment = shipments[0];

export const shipmentEvents: Record<string, ShipmentEvent[]> = {
  "s-1187": [
    { time: "08:12", title: "Gate out confirmed", location: "Long Beach T18", status: "complete" },
    { time: "14:40", title: "On rail to Chicago", location: "Colton Yard", status: "complete" },
    { time: "09:18", title: "Dwell watch cleared", location: "Kansas City", status: "current" },
    { time: "09:40", title: "Ramp arrival window", location: "Chicago 59th St", status: "upcoming" },
  ],
  "s-1223": [
    { time: "02:11", title: "Vessel departed", location: "Shanghai Yangshan", status: "complete" },
    { time: "19:04", title: "Port congestion flagged", location: "Los Angeles", status: "alert" },
    { time: "21:15", title: "Berth window at risk", location: "Los Angeles", status: "current" },
    { time: "06:00", title: "Rail cutoff", location: "ICTF", status: "upcoming" },
  ],
  "s-1231": [
    { time: "11:22", title: "Loaded at origin", location: "Rotterdam", status: "complete" },
    { time: "16:50", title: "Weather delay", location: "North Atlantic", status: "alert" },
    { time: "14:30", title: "Revised Newark ETA", location: "APM Terminal", status: "current" },
  ],
  "s-1249": [
    { time: "05:40", title: "Picked at Dallas DC", location: "Dallas", status: "complete" },
    { time: "12:08", title: "En route I-20", location: "Shreveport", status: "current" },
    { time: "16:20", title: "Atlanta appointment", location: "Atlanta", status: "upcoming" },
  ],
};
