import type { MarketplaceCategory, MarketplaceProduct, MarketplaceSortOption } from "@/components/marketplace/marketplace.types";

export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  "Fruits",
  "Vegetables",
  "Grains & Cereals",
  "Oil seeds & Pulses",
  "Dairy & Eggs",
];

export const MARKETPLACE_LOCATIONS = [
  "All locations",
  "Al Ain, UAE",
  "Ajloun, Jordan",
  "Sharjah, UAE",
  "Valencia, Spain",
];

export const MARKETPLACE_SORT_OPTIONS: MarketplaceSortOption[] = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Quantity",
  "Rating",
];

export const DEFAULT_PRODUCT_IMAGE = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

// TODO: Connect marketplace products to API when endpoint is ready.
export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: "fresh-organic-tomatoes",
    title: "Fresh Tomatoes",
    image: "/images/marketplace/tomatoes.jpg",
    price: 0.45,
    unit: "kg",
    quantity: "5,000",
    quantityValue: 5000,
    location: "Al Ain, UAE",
    grade: "Grade A",
    listingType: "Spot",
    verifiedFarmer: true,
    category: "Vegetables",
    rating: 4.8,
    availableFrom: "2025-05-01",
    availableTo: "2025-06-30",
  },
  {
    id: "premium-olives",
    title: "Premium Olives",
    image: "/images/marketplace/olives.jpg",
    price: 1.25,
    unit: "kg",
    quantity: "2,000",
    quantityValue: 2000,
    location: "Ajloun, Jordan",
    grade: "Grade A",
    listingType: "Spot",
    verifiedFarmer: true,
    category: "Fruits",
    rating: 4.9,
    availableFrom: "2025-05-15",
    availableTo: "2025-07-15",
  },
  {
    id: "wheat-grains",
    title: "Wheat",
    image: "/images/marketplace/wheat.jpg",
    price: 0.32,
    unit: "kg",
    quantity: "20,000",
    quantityValue: 20000,
    location: "Sharjah, UAE",
    grade: "Grade A",
    listingType: "Spot",
    verifiedFarmer: true,
    category: "Grains & Cereals",
    rating: 4.7,
    availableFrom: "2025-06-01",
    availableTo: "2025-08-31",
  },
  {
    id: "fresh-citrus",
    title: "Fresh Citrus",
    image: "/images/marketplace/orange.jpg",
    price: 0.6,
    unit: "kg",
    quantity: "3,500",
    quantityValue: 3500,
    location: "Valencia, Spain",
    grade: "Grade A",
    listingType: "Spot",
    verifiedFarmer: true,
    category: "Fruits",
    rating: 4.8,
    availableFrom: "2025-04-15",
    availableTo: "2025-06-15",
  },
];
