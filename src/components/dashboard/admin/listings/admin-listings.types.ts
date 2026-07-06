export type AdminListingStatus = "active" | "pending-review" | "flagged" | "removed";

export type AdminListingCategory = "Vegetables" | "Fruits" | "Grains" | "Dates" | "Oils";

export type AdminListing = {
  category: AdminListingCategory;
  datePublished: string;
  description?: string;
  farmer: {
    avatar?: string;
    name: string;
    verified?: boolean;
  };
  id: string;
  image?: string;
  location?: string;
  listingId: string;
  name: string;
  price: string;
  publishedDateISO: string;
  quantity: string;
  history?: Array<{
    date: string;
    title: string;
    value: string;
  }>;
  status: AdminListingStatus;
  timePublished: string;
};

export type AdminListingStatusFilter = "all" | AdminListingStatus;
export type AdminListingCategoryFilter = "all" | AdminListingCategory;
export type AdminListingFarmerFilter = "all" | "Omar Hassan" | "Ahmed Darwish" | "Sami Abdullah" | "Khaled Nasser";
