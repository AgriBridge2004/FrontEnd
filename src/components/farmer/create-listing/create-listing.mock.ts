import type { CreateListingDraft, UploadPhotoOption } from "@/components/farmer/create-listing/create-listing.types";

export const qualityGradeOptions = [
  "Class A",
  "Class B",
  "Class C",
];

export const uploadPhotoOptions: UploadPhotoOption[] = [
  ...Array.from({ length: 10 }, (_, index) => {
    const slotNumber = index + 1;

    return {
      id: `listing-photo-${slotNumber}`,
      label: `Product photo ${slotNumber}`,
      placeholderImage: `/images/farmer/create-listing/placeholders/listing-photo-placeholder-${slotNumber}.jpg`,
    };
  }),
];

export const initialCreateListingDraft: CreateListingDraft = {
  productName: "",
  variety: "",
  qualityGrade: "Class A",
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
