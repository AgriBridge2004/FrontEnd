export type AdminDisputeStatus = "open" | "under-review" | "resolved";

export type AdminDisputeResolutionType = "full-release-to-farmer" | "full-refund-to-buyer" | "partial-split";

export type AdminDisputeEvidence = {
  id: string;
  source: "Farmer" | "Buyer";
  fileName: string;
  fileType: "image" | "pdf";
  date: string;
  time: string;
  image?: string;
};

export type AdminDisputeInspectionReport = {
  reportId: string;
  inspector: string;
  overallGrade: string;
  status: "completed" | "pending";
  inspectionDate: string;
};

export type AdminDisputeMessage = {
  id: string;
  sender: string;
  role: "Buyer" | "Farmer" | "Admin";
  message: string;
  date: string;
  time: string;
};

export type AdminDispute = {
  id: string;
  disputeId: string;
  dealId: string;
  status: AdminDisputeStatus;
  openedByRole: "Buyer" | "Farmer";
  openedByName: string;
  openedAt: string;
  openedDate: string;
  openedAge: string;
  amountInDispute: number;
  product: string;
  farmer: string;
  buyer: string;
  paymentStatus: "frozen" | "released" | "refunded";
  dealValue: number;
  evidence: AdminDisputeEvidence[];
  inspectionReport: AdminDisputeInspectionReport;
  communicationLog: AdminDisputeMessage[];
};

export type AdminDisputeStatusFilter = "all" | AdminDisputeStatus;
