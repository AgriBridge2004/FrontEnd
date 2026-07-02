export type FarmerListingStatus = "active" | "draft" | "expired" | "pending" | "inactive";

export type FarmerListing = {
  id: string;
  title: string;
  productName: string;
  qualityGrade?: string;
  price?: number;
  currency?: string;
  unit?: string;
  quantity?: number;
  status: FarmerListingStatus;
  views?: number;
  rfqsReceived?: number;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type CreateFarmerListingPayload = {
  name: string;
  productType: "Plant" | "Animal";
  category: string;
  description: string;
  qty: number;
  unit: string;
  price: number;
  location: string;
  expiry?: string;
};

