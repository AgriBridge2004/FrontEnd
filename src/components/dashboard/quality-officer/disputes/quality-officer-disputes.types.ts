export type DisputeStatus = "in-investigation" | "escalated" | "resolved" | "mediation" | "appealed";

export type DisputeTab = "all" | "pending-investigation" | "mediation" | "resolved" | "appealed";

export type DisputeRecord = {
  id: string;
  reason: string;
  contractRef: string;
  buyer: string;
  farmer: string;
  lastUpdated: string;
  deadline: string;
  deadlineState: "active" | "expired" | "none";
  status: DisputeStatus;
};

export type PriorityAlert = {
  id: string;
  label: string;
  time: string;
  title: string;
  description: string;
};

export type CommonDisputeReason = {
  id: string;
  label: string;
  percentage: number;
};

export type MediationQueueItem = {
  id: string;
  month: string;
  day: string;
  title: string;
  time: string;
  icon: "video" | "calendar";
};
