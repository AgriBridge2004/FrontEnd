export type InspectionStatus = "in-progress" | "scheduled" | "flagged" | "completed";

export type QualityOfficerInspection = {
  id: string;
  productName: string;
  productImage?: string;
  farmName: string;
  location: string;
  date: string;
  schedule: string;
  inspectorName: string;
  inspectorAvatar?: string;
  status: InspectionStatus;
};

export type CriticalFlag = {
  id: string;
  title: string;
  description: string;
  meta: string;
};

export type InspectionTrendPoint = {
  week: string;
  inspections: number;
  quality: number;
};

export type InspectionTab = "all" | "scheduled" | "in-progress" | "completed" | "flagged";
