import type {
  CommonDisputeReason,
  DisputeRecord,
  MediationQueueItem,
  PriorityAlert,
} from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.types";

export const disputeRecords: DisputeRecord[] = [
  {
    id: "#DIS-2025-042",
    reason: "Quality Defect (Tomatoes)",
    contractRef: "#D-2025-1542",
    buyer: "Green Fields Trading Co.",
    farmer: "Abdullah Al Mutairi",
    lastUpdated: "Oct 24, 2025",
    deadline: "2 Days Left",
    deadlineState: "active",
    status: "in-investigation",
  },
  {
    id: "#DIS-2025-038",
    reason: "Short Shipment (Wheat)",
    contractRef: "#D-2025-1538",
    buyer: "Oasis Harvest",
    farmer: "Highland Plantation",
    lastUpdated: "Oct 22, 2025",
    deadline: "Expired",
    deadlineState: "expired",
    status: "escalated",
  },
  {
    id: "#DIS-2025-035",
    reason: "Payment Delay",
    contractRef: "#D-2025-1535",
    buyer: "Al Rawabi",
    farmer: "Green Roots",
    lastUpdated: "Oct 20, 2025",
    deadline: "-",
    deadlineState: "none",
    status: "resolved",
  },
];

export const priorityAlerts: PriorityAlert[] = [
  {
    id: "payment-escalation",
    label: "High Urgency",
    time: "2h ago",
    title: "Contract #D-1538 Payment Escaped",
    description: "Automatic escalation triggered after 48h non-response.",
  },
  {
    id: "evidence-needed",
    label: "Evidence Needed",
    time: "5h ago",
    title: "Inspection Photo Validation",
    description: "Reviewing #DIS-2025-042 tomato quality evidence.",
  },
];

export const commonDisputeReasons: CommonDisputeReason[] = [
  { id: "quality", label: "Quality Issues", percentage: 45 },
  { id: "quantity", label: "Quantity Discrepancy", percentage: 25 },
  { id: "logistics", label: "Logistics/Delays", percentage: 15 },
  { id: "payment", label: "Payment Disputes", percentage: 15 },
];

export const mediationQueue: MediationQueueItem[] = [
  {
    id: "quality-review-session",
    month: "OCT",
    day: "26",
    title: "Quality Review Session",
    time: "14:00 - 15:30 (GST)",
    icon: "video",
  },
  {
    id: "final-arbitration",
    month: "OCT",
    day: "27",
    title: "Final Arbitration: #DIS-038",
    time: "09:30 - 11:00 (GST)",
    icon: "calendar",
  },
];
