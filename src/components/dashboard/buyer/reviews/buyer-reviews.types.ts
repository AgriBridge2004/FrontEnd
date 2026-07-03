export type BuyerReviewStatus = "published" | "draft" | "pending";

export type BuyerReview = {
  id: string;
  supplierName: string;
  supplierSubtitle: string;
  supplierInitials: string;
  productCategory: string;
  productSubcategory?: string;
  rating: number | null;
  reviewDate: string | null;
  status: BuyerReviewStatus;
};

export type BuyerReviewsStats = {
  averageRatingGiven: number;
  awaitingFeedback: number;
  sentiment: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    others: number;
  };
  totalSubmitted: number;
};

export type BuyerReviewRatingFilter = "All Ratings" | "5 Stars" | "4 Stars" | "3 Stars" | "2 Stars" | "1 Star";

export type BuyerReviewCategoryFilter =
  | "Category: All"
  | "Organic Wheat"
  | "Fertilizer"
  | "Irrigation"
  | "Packaging"
  | "Logistics";
