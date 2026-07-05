export type MarketplaceCategory =
  | "Fruits"
  | "Vegetables"
  | "Grains & Cereals"
  | "Oil seeds & Pulses"
  | "Dairy & Eggs";

export type MarketplaceListingType = "Spot" | "Pre-Harvest";

export type MarketplaceSortOption =
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Quantity"
  | "Rating";

export type MarketplaceViewMode = "grid" | "list";

export type MarketplaceProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  unit: string;
  quantity: string;
  quantityValue: number;
  location: string;
  grade: string;
  listingType: MarketplaceListingType;
  verifiedFarmer: boolean;
  category: MarketplaceCategory;
  rating: number;
  availableFrom: string;
  availableTo: string;
};

export type MarketplaceFiltersState = {
  categories: MarketplaceCategory[];
  priceMax: number;
  quantityMax: number;
  location: string;
  listingType: MarketplaceListingType;
  availableFrom: string;
  availableTo: string;
};
