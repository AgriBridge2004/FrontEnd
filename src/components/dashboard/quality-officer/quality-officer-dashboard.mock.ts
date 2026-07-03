import type {
  QualityAssignmentRequest,
  QualityOfficerStat,
  QualityReport,
  QualityScheduleItem,
} from "@/components/dashboard/quality-officer/quality-officer-dashboard.types";

export const qualityOfficerStats: QualityOfficerStat[] = [
  {
    accent: "green",
    footer: "Requires action ↗",
    icon: "assignments",
    id: "pending-assignments",
    label: "Pending Assignments",
    value: 12,
  },
  {
    accent: "orange",
    footer: "This week ↗",
    icon: "inspections",
    id: "weekly-inspections",
    label: "Weekly Inspections",
    value: 8,
  },
  {
    accent: "lime",
    footer: "This month ↗",
    icon: "reports",
    id: "reports-submitted",
    label: "Reports Submitted",
    value: 45,
  },
  {
    accent: "green",
    footer: "Update in 3 days",
    footerTone: "orange",
    icon: "compensation",
    id: "pending-compensation",
    label: "Pending Compensation",
    value: "$2,450",
  },
];

export const qualityAssignmentRequests: QualityAssignmentRequest[] = [
  {
    accent: "red",
    city: "Riyadh, SA",
    date: "May 16, 2025",
    dealId: "#DEAL-2045",
    id: "assignment-2045",
    location: "Al Sa'adah Farm",
    product: "Fresh Tomatoes",
  },
  {
    accent: "orange",
    city: "Qassim, SA",
    date: "May 18, 2025",
    dealId: "#DEAL-2188",
    id: "assignment-2188",
    location: "Al Noor Farm",
    product: "Medjool Dates",
  },
  {
    accent: "green",
    city: "Tabuk, SA",
    date: "May 20, 2025",
    dealId: "#DEAL-2341",
    id: "assignment-2341",
    location: "Al Waha Farm",
    product: "Fresh Lettuce",
  },
];

export const qualitySchedule: QualityScheduleItem[] = [
  {
    active: true,
    id: "audit-saadah",
    meta: "Riyadh • May 16, 2025 • 09:00 AM",
    title: "Quality Audit - Al Sa'adah Farm",
  },
  {
    id: "inspection-noor",
    meta: "Qassim • May 18, 2025 • 02:30 PM",
    title: "Product Inspection - Al Noor Farm",
  },
  {
    id: "verification-waha",
    meta: "Tabuk • May 21, 2025 • 11:00 AM",
    title: "Final Verification - Al Waha Farm",
  },
];

export const qualityReports: QualityReport[] = [
  {
    dealId: "#DEAL-1980",
    grade: "A",
    id: "report-1980",
    inspectionDate: "May 12, 2025",
    product: "Red Onions",
    status: "verified",
  },
  {
    dealId: "#DEAL-2001",
    grade: "B",
    id: "report-2001",
    inspectionDate: "May 10, 2025",
    product: "Green Bell Peppers",
    status: "pending-review",
  },
  {
    dealId: "#DEAL-1855",
    grade: "FAIL",
    id: "report-1855",
    inspectionDate: "May 08, 2025",
    product: "Cucumber Extra",
    status: "flagged",
  },
];
