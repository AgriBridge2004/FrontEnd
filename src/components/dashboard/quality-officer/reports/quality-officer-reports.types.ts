export type QualityTrendPoint = {
  month: string;
  yield: number;
  quality: number;
};

export type CommodityQualityMetric = {
  id: string;
  name: string;
  subtitle: string;
  rejectionRate: number;
  priceStability: "High" | "Med" | "Very High";
  rejectionColor: "green" | "red" | "gray";
  priceStabilityProgress: number;
};

export type QualityReportRow = {
  id: string;
  date: string;
  product: string;
  supplier: string;
  inspector: string;
  grade: "Grade A" | "Grade B+" | "Grade A+" | "Grade C";
  productColor: "red" | "orange" | "green";
};
