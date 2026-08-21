export type QualityOfficerStatus = "available" | "busy" | "suspended";

export type AdminQualityOfficer = {
  id: string;
  name: string;
  phone: string;
  coverageAreas: string[];
  completedInspections: number;
  averageRating: number;
  status: QualityOfficerStatus;
  avatar?: string;
  distanceFromFarmKm?: number;
};

export type AssignmentPriority = "high" | "normal";

export type DealNeedingAssignment = {
  id: string;
  dealId: string;
  product: string;
  farmLocation: string;
  requiredDate: string;
  dealValue: number;
  priority?: AssignmentPriority;
};

export type AdminQualityOfficerTab = "officers" | "assignments";
export type CoverageAreaFilter = "all" | "Al Ahsa" | "Riyadh" | "Jeddah" | "Dammam" | "Abha";
export type AssignmentSortOption = "Nearest" | "Highest Rated" | "Most Inspections" | "Available Only";
export type AssignmentDistanceOption = "Within: 10 km" | "Within: 25 km" | "Within: 50 km" | "Within: 100 km";
