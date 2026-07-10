import type { ApiRecord } from "@/lib/buyer-api";

export type RFQQuoteStatus = "pending" | "submitted" | "open" | "under-review" | "accepted" | "rejected" | "countered" | "closed" | "cancelled";

export type BuyerRFQStatus = "open" | "has-proposals" | "accepted" | "rejected" | "countered" | "closed";

export type BuyerRFQ = {
  budget?: number;
  category?: string;
  createdAt: string;
  deliveryDate: string;
  id: string;
  location: string;
  notes: string;
  productName: string;
  proposalCount: number;
  quantity: string;
  raw: ApiRecord;
  status: BuyerRFQStatus;
  updatedAt: string;
};

export type RFQQuote = {
  avatarUrl?: string;
  dealId?: string;
  deliveryDate?: string;
  farmerId?: string;
  farmerLocation?: string;
  farmerName: string;
  id: string;
  message: string;
  price: number;
  quantity?: number;
  raw: ApiRecord;
  status: RFQQuoteStatus;
  submittedAt: string;
  unit?: string;
};

export type CounterOfferForm = {
  deliveryDate: string;
  message: string;
  price: string;
  quantity: string;
};
