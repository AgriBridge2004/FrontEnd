import type {
  CriticalFlag,
  InspectionTrendPoint,
  QualityOfficerInspection,
} from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.types";

export const qualityOfficerInspectionStats = [
  {
    accent: "green",
    badge: "+12%",
    icon: "total",
    id: "total-inspections",
    label: "Total Inspections",
    value: "1,284",
  },
  {
    accent: "green",
    badge: "Today",
    icon: "active",
    id: "active-today",
    label: "Active Today",
    value: "42",
  },
  {
    accent: "orange",
    badge: "8 High Priority",
    icon: "pending",
    id: "pending-reports",
    label: "Pending Reports",
    value: "18",
  },
  {
    accent: "green",
    badge: "Target: 9.8",
    icon: "quality",
    id: "quality-score",
    label: "Quality Score",
    value: "9.6/10",
  },
] as const;

export const qualityOfficerInspections: QualityOfficerInspection[] = [
  {
    date: "Oct 24, 2025",
    farmName: "Al Sa'adah Farm",
    id: "#INS-2025-001",
    inspectorAvatar: "/images/farmer/profile/farmer-avatar.jpg",
    inspectorName: "Dr. Sarah Chen",
    location: "Region 4, Sector B",
    productImage: "/images/farmer/listings/tomatoes-listing.jpg",
    productName: "Vine-Ripened Tomatoes",
    schedule: "09:00 AM - 11:30 AM",
    status: "in-progress",
  },
  {
    date: "Oct 25, 2025",
    farmName: "Oasis Plains Estate",
    id: "#INS-2025-004",
    inspectorAvatar: "/images/farmer/profile/farmer-avatar.jpg",
    inspectorName: "Mark Thompson",
    location: "North Basin, Plot 12",
    productImage: "/images/farmer/listings/wheat-listing.jpg",
    productName: "Hard Red Winter Wheat",
    schedule: "14:00 PM - 16:00 PM",
    status: "scheduled",
  },
  {
    date: "Oct 23, 2025",
    farmName: "Green Valley Farms",
    id: "#INS-2025-002",
    inspectorAvatar: "/images/farmer/profile/farmer-avatar.jpg",
    inspectorName: "Alex Rivera",
    location: "Central Hub, Greenhouse 2",
    productImage: "/images/farmer/create-listing/placeholders/listing-photo-placeholder-3.jpg",
    productName: "Organic Bell Peppers",
    schedule: "Failed: Moisture Levels",
    status: "flagged",
  },
  {
    date: "Oct 22, 2025",
    farmName: "Highland Plantation",
    id: "#INS-2025-008",
    inspectorAvatar: "/images/farmer/profile/farmer-avatar.jpg",
    inspectorName: "Dr. Sarah Chen",
    location: "Logistics Dock A",
    productImage: "/images/farmer/create-listing/placeholders/listing-photo-placeholder-8.jpg",
    productName: "Arabica Coffee Beans",
    schedule: "Completed at 11:15 AM",
    status: "completed",
  },
];

export const criticalFlags: CriticalFlag[] = [
  {
    description: "Inspection #INS-2025-002 detected higher than permitted...",
    id: "pesticide-residue",
    meta: "2 hours ago • Green Valley Farms",
    title: "Pesticide Residue Alert",
  },
  {
    description: "Sensor breach in Transport Container #TC-99: Temperature...",
    id: "cold-chain",
    meta: "5 hours ago • Logistics Sector A",
    title: "Cold Chain Violation",
  },
];

export const inspectionTrendData: InspectionTrendPoint[] = [
  { inspections: 42, quality: 78, week: "WEEK 1" },
  { inspections: 56, quality: 88, week: "WEEK 2" },
  { inspections: 38, quality: 72, week: "WEEK 3" },
  { inspections: 50, quality: 80, week: "WEEK 4" },
];
