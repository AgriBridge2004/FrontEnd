import type { FarmerListingItem, FarmerListingStatus } from "@/lib/mock-data";

export type ListingStatusFilter = "All" | FarmerListingStatus;
export type ListingsViewMode = "grid" | "table";
export type FarmerListing = FarmerListingItem;
