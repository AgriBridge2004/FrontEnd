export type FavoriteListingStatus = "available" | "low-stock" | "expiring-soon";

export type BuyerFavoriteListing = {
  id: string;
  name: string;
  price: number;
  currency: string;
  unit: string;
  supplier: string;
  rating: number;
  reviews: number;
  status: FavoriteListingStatus;
  category: string;
  image?: string;
};

export type FavoriteSortOption = "recent" | "price-asc" | "price-desc" | "rating" | "availability";
