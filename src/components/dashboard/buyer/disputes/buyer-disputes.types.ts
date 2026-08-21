export type BuyerDisputeStatus = "under-review" | "mediation" | "resolved";

export type BuyerDisputePriority = "urgent" | "high" | "medium" | "low";

export type BuyerDisputeTab = "all" | "active" | "resolved";

export type BuyerDisputeCase = {
  id: string;
  contractTitle: string;
  contractId: string;
  merchant: string;
  reason: string;
  status: BuyerDisputeStatus;
  priority: BuyerDisputePriority;
};

export type BuyerDisputeStats = {
  openDisputes: number;
  resolvedCases: number;
  averageResolutionDays: number;
};

export type ResolutionEfficiencyPoint = {
  day: string;
  activity: number;
  closed: number;
};
