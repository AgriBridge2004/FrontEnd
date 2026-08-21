export type RevenueCategory = "Vegetables" | "Fruits" | "Grains" | "Herbs & Spices" | "Dates" | "Oils";
export type RevenueCategoryFilter = "all" | RevenueCategory;
export type RevenueDateRange = "this-month" | "last-month" | "this-quarter";
export type RevenueChartPeriod = "daily" | "weekly";
export type RevenueTransactionStatus = "completed";

export type RevenueTransaction = {
  id: string;
  dealId: string;
  dateISO: string;
  dateLabel: string;
  totalDealValue: number;
  commissionPercent: number;
  netCommission: number;
  relatedInspectionFees: number;
  productCategory: RevenueCategory;
  status: RevenueTransactionStatus;
};

export type RevenueTrendPoint = {
  label: string;
  grossTransactionVolume: number;
  commissionsCollected: number;
  inspectionFeesCollected: number;
};
