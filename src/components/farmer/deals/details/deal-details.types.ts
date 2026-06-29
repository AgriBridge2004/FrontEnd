export type DealStageStatus = "completed" | "current" | "pending";

export type DealDetailStatus = "Active" | "Pending" | "Completed" | "Disputed";

export type DealDetail = {
  id: string;
  product: string;
  quantity: string;
  status: DealDetailStatus;
  unitPrice: string;
  totalAmount: string;
  buyer: string;
  farmer: string;
  dealCreated: string;
  expectedDelivery: string;
  currentStage: number;
  inspection: {
    officer: string;
    assignedOn: string;
    inspectionDate: string;
    location: string;
    status: string;
  };
  timeline: {
    id: string;
    title: string;
    description: string;
    time: string;
    status: DealStageStatus;
  }[];
  documents: {
    id: string;
    name: string;
    description: string;
    status: "available" | "pending";
  }[];
};
