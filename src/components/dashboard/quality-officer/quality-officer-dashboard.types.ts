export type QualityOfficerStat = {
  id: string;
  label: string;
  value: string | number;
  footer: string;
  icon: "assignments" | "inspections" | "reports" | "compensation";
  accent: "green" | "orange" | "lime";
  footerTone?: "green" | "orange";
};

export type QualityAssignmentRequest = {
  id: string;
  dealId: string;
  product: string;
  location: string;
  city: string;
  date: string;
  accent: "red" | "orange" | "green";
};

export type QualityScheduleItem = {
  id: string;
  title: string;
  meta: string;
  active?: boolean;
};

export type QualityReport = {
  id: string;
  dealId: string;
  inspectionDate: string;
  product: string;
  grade: "A" | "B" | "FAIL";
  status: "verified" | "pending-review" | "flagged";
};
