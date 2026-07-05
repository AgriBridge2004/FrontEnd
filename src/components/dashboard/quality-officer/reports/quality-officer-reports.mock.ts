import type {
  CommodityQualityMetric,
  QualityReportRow,
  QualityTrendPoint,
} from "@/components/dashboard/quality-officer/reports/quality-officer-reports.types";

// TODO: Connect yield/quality trend to API.
export const qualityTrendData: QualityTrendPoint[] = [
  { month: "JUL", yield: 38, quality: 82 },
  { month: "AUG", yield: 45, quality: 80 },
  { month: "SEP", yield: 40, quality: 83 },
  { month: "OCT", yield: 50, quality: 88 },
  { month: "NOV", yield: 68, quality: 90 },
  { month: "DEC", yield: 48, quality: 86 },
];

// TODO: Connect commodity rejection metrics to API.
export const commodityQualityMetrics: CommodityQualityMetric[] = [
  {
    id: "tomatoes",
    name: "Tomatoes",
    subtitle: "Fresh Produce",
    rejectionRate: 4.2,
    priceStability: "High",
    rejectionColor: "red",
    priceStabilityProgress: 90,
  },
  {
    id: "wheat",
    name: "Wheat",
    subtitle: "Grains & Silos",
    rejectionRate: 0.8,
    priceStability: "Med",
    rejectionColor: "green",
    priceStabilityProgress: 65,
  },
  {
    id: "olives",
    name: "Olives",
    subtitle: "Preserved",
    rejectionRate: 2.1,
    priceStability: "Very High",
    rejectionColor: "gray",
    priceStabilityProgress: 96,
  },
];

// TODO: Connect recent quality reports to API.
export const recentQualityReports: QualityReportRow[] = [
  {
    id: "report-1",
    date: "Oct 12, 2024",
    product: "Premium Tomatoes",
    supplier: "Green Fields Trading Co.",
    inspector: "Faisal Al-Otaibi",
    grade: "Grade A",
    productColor: "red",
  },
  {
    id: "report-2",
    date: "Oct 11, 2024",
    product: "Hard Red Wheat",
    supplier: "Al Sa'adah Farm",
    inspector: "Sarah Johnson",
    grade: "Grade B+",
    productColor: "orange",
  },
  {
    id: "report-3",
    date: "Oct 11, 2024",
    product: "Medjool Dates",
    supplier: "Oasis Harvest Group",
    inspector: "Mohammed Khan",
    grade: "Grade A+",
    productColor: "green",
  },
  {
    id: "report-4",
    date: "Oct 10, 2024",
    product: "Persian Olives",
    supplier: "Al Rawabi Estates",
    inspector: "Faisal Al-Otaibi",
    grade: "Grade C",
    productColor: "red",
  },
];
