export type AdminRFQStatus =
  | "pending-farmer-response"
  | "quoted"
  | "accepted"
  | "expired"
  | "rejected"
  | "flagged-for-review";

export type AdminRFQConversationMessage = {
  id: string;
  sender: string;
  role: "Buyer" | "Farmer";
  timestamp: string;
  message: string;
};

export type AdminRFQ = {
  id: string;
  rfqId: string;
  buyer: {
    company: string;
    contact: string;
    email?: string;
    avatar?: string;
  };
  farmer: {
    farmName: string;
    contact: string;
    phone?: string;
    avatar?: string;
  };
  product: {
    name: string;
    subtitle: string;
    image?: string;
    category?: string;
  };
  requestedQuantity: string;
  status: AdminRFQStatus;
  dateSubmitted: string;
  dateSubmittedTime?: string;
  lastActivity: string;
  activityState?: "normal" | "inactive";
  validUntil?: string;
  preferredDelivery?: string;
  paymentTerms?: string;
  qualityGrade?: string;
  packaging?: string;
  deliveryLocation?: string;
  buyerNotes?: string;
  relatedDeal?: string | null;
  lastActivityFull?: string;
  conversation?: AdminRFQConversationMessage[];
};

export type AdminRFQStatusFilter = "all" | AdminRFQStatus;
export type AdminRFQCategoryFilter = "all" | "Vegetables" | "Fruits" | "Grains" | "Oils" | "Dates";
export type AdminRFQSortKey =
  | "rfqId"
  | "buyer"
  | "farmer"
  | "product"
  | "requestedQuantity"
  | "status"
  | "dateSubmitted"
  | "lastActivity";
