import type { RevenueTransaction, RevenueTrendPoint } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.types";

export const revenueSummary = {
  commissionsCollected: 73612.45,
  grossTransactionVolume: 2458760.5,
  inspectionFeesCollected: 28945.8,
};

export const dailyRevenueTrend: RevenueTrendPoint[] = [
  { commissionsCollected: 90000, grossTransactionVolume: 230000, inspectionFeesCollected: 195000, label: "May 1" },
  { commissionsCollected: 110000, grossTransactionVolume: 325000, inspectionFeesCollected: 240000, label: "May 3" },
  { commissionsCollected: 130000, grossTransactionVolume: 420000, inspectionFeesCollected: 305000, label: "May 5" },
  { commissionsCollected: 70000, grossTransactionVolume: 275000, inspectionFeesCollected: 190000, label: "May 9" },
  { commissionsCollected: 55000, grossTransactionVolume: 250000, inspectionFeesCollected: 130000, label: "May 11" },
  { commissionsCollected: 62000, grossTransactionVolume: 350000, inspectionFeesCollected: 150000, label: "May 13" },
  { commissionsCollected: 70000, grossTransactionVolume: 325000, inspectionFeesCollected: 170000, label: "May 15" },
  { commissionsCollected: 95000, grossTransactionVolume: 375000, inspectionFeesCollected: 205000, label: "May 17" },
  { commissionsCollected: 130000, grossTransactionVolume: 300000, inspectionFeesCollected: 260000, label: "May 19" },
  { commissionsCollected: 120000, grossTransactionVolume: 395000, inspectionFeesCollected: 245000, label: "May 21" },
  { commissionsCollected: 115000, grossTransactionVolume: 445000, inspectionFeesCollected: 225000, label: "May 23" },
  { commissionsCollected: 320000, grossTransactionVolume: 325000, inspectionFeesCollected: 210000, label: "May 25" },
];

export const weeklyRevenueTrend: RevenueTrendPoint[] = [
  { commissionsCollected: 310000, grossTransactionVolume: 720000, inspectionFeesCollected: 92000, label: "Week 1" },
  { commissionsCollected: 255000, grossTransactionVolume: 875000, inspectionFeesCollected: 104000, label: "Week 2" },
  { commissionsCollected: 355000, grossTransactionVolume: 930000, inspectionFeesCollected: 118000, label: "Week 3" },
  { commissionsCollected: 280000, grossTransactionVolume: 810000, inspectionFeesCollected: 97000, label: "Week 4" },
];

export const revenueTransactions: RevenueTransaction[] = [
  { commissionPercent: 3, dateISO: "2025-05-25", dateLabel: "May 25, 2025", dealId: "D-2025-000123", id: "rev-1", netCommission: 735, productCategory: "Vegetables", relatedInspectionFees: 120, status: "completed", totalDealValue: 24500 },
  { commissionPercent: 3, dateISO: "2025-05-24", dateLabel: "May 24, 2025", dealId: "D-2025-000122", id: "rev-2", netCommission: 562.5, productCategory: "Fruits", relatedInspectionFees: 100, status: "completed", totalDealValue: 18750 },
  { commissionPercent: 2.75, dateISO: "2025-05-23", dateLabel: "May 23, 2025", dealId: "D-2025-000121", id: "rev-3", netCommission: 880, productCategory: "Grains", relatedInspectionFees: 150, status: "completed", totalDealValue: 32000 },
  { commissionPercent: 3, dateISO: "2025-05-23", dateLabel: "May 23, 2025", dealId: "D-2025-000120", id: "rev-4", netCommission: 456, productCategory: "Vegetables", relatedInspectionFees: 80, status: "completed", totalDealValue: 15200 },
  { commissionPercent: 3, dateISO: "2025-05-23", dateLabel: "May 23, 2025", dealId: "D-2025-000119", id: "rev-5", netCommission: 819, productCategory: "Herbs & Spices", relatedInspectionFees: 120, status: "completed", totalDealValue: 27300 },
];
