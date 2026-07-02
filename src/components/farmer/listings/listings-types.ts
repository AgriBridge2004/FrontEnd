export type FarmerListingStatus = "Active" | "Expired" | "Draft";

export type ListingStatusFilter = "All" | FarmerListingStatus;
export type ListingsViewMode = "grid" | "table";
export type FarmerListing = {
  id: string;
  name: string;
  status: FarmerListingStatus;
  price: string;
  currency: string;
  unit: string;
  quantity: string;
  views: number;
  rfqsReceived: number;
  image: string;
};
