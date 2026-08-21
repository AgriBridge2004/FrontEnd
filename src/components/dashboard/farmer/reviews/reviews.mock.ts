export type ReviewStatus = "Published" | "Needs Response" | "Flagged" | "Under Investigation";
export type ReviewFilter = "All Reviews" | "5 Star" | "4 Star" | "Needs Response" | "Flagged";

export type FarmerReview = {
  id: string;
  buyerName: string;
  buyerInitials: string;
  verified?: boolean;
  purchasedAt: string;
  rating: number;
  contractId: string;
  product: string;
  reviewText: string;
  qualityScore?: number;
  timelinessScore?: number;
  communicationScore?: number;
  response?: {
    text: string;
    respondedAt: string;
  };
  status: ReviewStatus;
  reportReason?: string;
};

export const reviewFilters: ReviewFilter[] = ["All Reviews", "5 Star", "4 Star", "Needs Response", "Flagged"];

export const ratingDistribution = [
  { rating: "5 Star", count: 128 },
  { rating: "4 Star", count: 18 },
  { rating: "3 Star", count: 6 },
  { rating: "2 Star", count: 2 },
  { rating: "1 Star", count: 2 },
];

export const performanceAreas = [
  { label: "Produce Quality", value: "4.9/5" },
  { label: "Delivery Speed", value: "4.7/5" },
  { label: "Communication", value: "4.8/5" },
];

export const farmerReviews: FarmerReview[] = [
  {
    id: "review-1",
    buyerName: "Green Kitchen Restaurant",
    buyerInitials: "GK",
    verified: true,
    purchasedAt: "Purchased 2 days ago",
    rating: 5,
    contractId: "#CTR-2025-104",
    product: "Tomatoes",
    reviewText:
      "Exceptional quality tomatoes! The delivery was on time and the produce was fresh and well-packed. Our chefs are very happy with the consistent size and color. Will definitely order again for our weekly supplies.",
    qualityScore: 5,
    timelinessScore: 5,
    communicationScore: 4.5,
    response: {
      text: "Thank you for your kind words! We take pride in our sorting process to ensure restaurants like yours get exactly what they need. We look forward to our next delivery.",
      respondedAt: "Yesterday",
    },
    status: "Published",
  },
  {
    id: "review-2",
    buyerName: "FreshMart Distributors",
    buyerInitials: "FM",
    verified: true,
    purchasedAt: "Purchased 5 hours ago",
    rating: 4,
    contractId: "#CTR-2025-112",
    product: "Organic Potatoes",
    reviewText:
      "The organic potatoes arrived in great condition. Excellent texture for frying. My only minor suggestion would be slightly more padding in the crates to prevent bruising during long transit.",
    qualityScore: 4.5,
    timelinessScore: 5,
    status: "Needs Response",
  },
  {
    id: "review-3",
    buyerName: "Anonymized User",
    buyerInitials: "AU",
    purchasedAt: "Reported for: Spam",
    rating: 1,
    contractId: "#CTR-2025-099",
    product: "Mixed Produce",
    reviewText: "Review content hidden during moderation...",
    status: "Under Investigation",
    reportReason: "Spam",
  },
  {
    id: "review-4",
    buyerName: "Oasis Fruits",
    buyerInitials: "OF",
    verified: true,
    purchasedAt: "Purchased 1 week ago",
    rating: 5,
    contractId: "#CTR-2025-098",
    product: "Olives",
    reviewText: "Reliable seller and excellent olive quality. Packaging was clean and shipment arrived as promised.",
    qualityScore: 5,
    timelinessScore: 4.5,
    communicationScore: 5,
    status: "Published",
  },
  {
    id: "review-5",
    buyerName: "Food Factory",
    buyerInitials: "FF",
    verified: true,
    purchasedAt: "Purchased 2 weeks ago",
    rating: 4,
    contractId: "#CTR-2025-085",
    product: "Wheat",
    reviewText: "Good wheat batch overall. Moisture levels were acceptable and documentation was complete.",
    qualityScore: 4,
    timelinessScore: 4.5,
    status: "Needs Response",
  },
];
