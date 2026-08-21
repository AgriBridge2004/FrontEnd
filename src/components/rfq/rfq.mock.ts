import type { RFQRequest } from "@/components/rfq/rfq.types";

export const RFQ_IMAGE_FALLBACK = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

export const RFQ_REQUESTS: RFQRequest[] = [
  {
    id: "tomatoes-500kg",
    title: "500 kg Fresh Tomatoes needed",
    buyer: "Green Kitchen Restaurant",
    location: "Chicago, IL",
    description:
      "Looking for high-quality beefsteak tomatoes for daily restaurant operations. Must be organic and delivered twice weekly.",
    deadline: "Oct 25, 2024",
    totalVolume: "500 kg",
    category: "Vegetables",
    status: "open",
    image: "/images/rfq/rfq-tomatoes.png",
  },
  {
    id: "olive-oil-200l",
    title: "Bulk Extra Virgin Olive Oil (200L)",
    buyer: "Mediterranean Logistics Co.",
    location: "Valencia, Spain",
    description:
      "Urgent requirement for cold-pressed extra virgin olive oil. Preference for harvest from 2023 season. Quality certificates required.",
    deadline: "Oct 30, 2024",
    totalVolume: "200 Liters",
    category: "Oils & Fats",
    status: "open",
    image: "/images/rfq/rfq-olive-oil.png",
  },
  {
    id: "wheat-2tons",
    title: "2 Tons Hard Red Winter Wheat",
    buyer: "Artisan Flour Mills",
    location: "Kansas City, KS",
    description:
      "Seeking premium grade hard red winter wheat for specialty flour production. Minimum protein content 12%.",
    deadline: "Nov 05, 2024",
    totalVolume: "2 Tons",
    category: "Grains",
    status: "open",
    image: "/images/rfq/rfq-wheat.png",
  },
];

export const RFQ_COMMODITY_OPTIONS = ["All Commodities", "Vegetables", "Oils & Fats", "Grains", "Fruits"];
export const RFQ_STATUS_OPTIONS = ["All Statuses", "Open for Bids", "Closing Soon", "Submitted"];
export const RFQ_REGION_OPTIONS = ["All Regions", "Chicago, IL", "Valencia, Spain", "Kansas City, KS"];
