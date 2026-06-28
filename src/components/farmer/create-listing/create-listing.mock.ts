import type { CreateListingDraft, UploadPhotoOption } from "@/components/farmer/create-listing/create-listing.types";

export const productOptions = [
  "Tomatoes",
  "Olives",
  "Wheat",
  "Potatoes",
  "Cucumbers",
  "Dates",
  "Olive Oil",
  "Herbs",
];

export const qualityGradeOptions = [
  "Grade A (Premium)",
  "Grade B (Standard)",
  "Organic Certified",
  "Export Quality",
];

export const uploadPhotoOptions: UploadPhotoOption[] = [
  { label: "Tomato", src: "/images/farmer/create-listing/tomato-upload.jpg" },
  { label: "Olive", src: "/images/farmer/create-listing/olive-upload.jpg" },
  { label: "Wheat", src: "/images/farmer/create-listing/wheat-upload.jpg" },
];

export const initialCreateListingDraft: CreateListingDraft = {
  productName: "",
  variety: "",
  qualityGrade: "Grade A (Premium)",
  harvestDate: "",
  photos: [],
  pricing: {
    unitPrice: "",
    minimumOrder: "500",
    totalQuantity: "10000",
    bulkPricingEnabled: true,
    tiers: [
      { id: "tier-1", range: "1,000 - 4,999", unitPrice: "1.45" },
      { id: "tier-2", range: "5,000+", unitPrice: "1.38" },
    ],
  },
  logistics: {
    originLocation: "Mendoza, Argentina",
    incoterm: "FOB",
    packagingOptions: ["Standard Pallets"],
    leadTimeDays: 14,
    certifications: [
      { id: "globalgap", name: "GlobalGAP", status: "active" },
      { id: "organic", name: "Organic Cert.", status: "pending" },
    ],
  },
};
