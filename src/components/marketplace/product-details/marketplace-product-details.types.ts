export type ProductDetailsTab = "details" | "farmer" | "reviews";

export type ProductDetailsSpec = {
  productType: string;
  variety: string;
  grade: string;
  farmingMethod: string;
  packaging: string;
  shelfLife: string;
  storage: string;
  certifications: string;
};

export type MarketplaceProductDetails = {
  id: string;
  title: string;
  category: string;
  farmerName: string;
  verifiedFarmer: boolean;
  rating: number;
  reviewsCount: number;
  price: number;
  currency: string;
  unit: string;
  availableQuantity: string;
  harvestDate: string;
  location: string;
  grade: string;
  listingType: string;
  description: string;
  images: string[];
  details: ProductDetailsSpec;
};

export type SimilarMarketplaceProduct = {
  id: string;
  title: string;
  farmerName: string;
  verifiedFarmer: boolean;
  rating: number;
  reviewsCount: number;
  price: number;
  currency: string;
  unit: string;
  availableQuantity: string;
  image: string;
};
