export type AdminDealStatus = "negotiating" | "confirmed" | "under-inspection" | "completed" | "disputed";

export type AdminDealProgressStage = "negotiation" | "confirmation" | "inspection" | "payment" | "completed";

export type AdminDealDetailUpdate = {
  message: string;
  timestamp: string;
  author: string;
};

export type AdminDeal = {
  id: string;
  dealId: string;
  farmer: string;
  buyer: string;
  product: string;
  value: string;
  status: AdminDealStatus;
  date: string;
  time: string;
  progressStage: AdminDealProgressStage;
  createdOn?: string;
  lastUpdated?: string;
  paymentMethod?: string;
  expectedDelivery?: string;
  latestUpdate?: AdminDealDetailUpdate;
};

export type AdminDealStatusFilter = "all" | AdminDealStatus;

export type AdminDealProductFilter = "all" | "Tomatoes" | "Olive Oil" | "Potatoes" | "Wheat" | "Dates";

export type AdminDealSortKey = "dealId" | "farmer" | "buyer" | "product" | "value" | "status";
