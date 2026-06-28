export type CreateListingStep = "details" | "pricing" | "logistics" | "review";

export type StepperStep = {
  id: number;
  label: string;
};

export type CreateListingDraft = {
  productName: string;
  variety: string;
  qualityGrade: string;
  harvestDate: string;
  /** TODO: Connect product photo upload to backend/cloud storage later. */
  photos: string[];
  pricing: CreateListingPricing;
  logistics: CreateListingLogistics;
};

export type UploadPhotoOption = {
  label: string;
  src: string;
};

export type BulkPricingTier = {
  id: string;
  range: string;
  unitPrice: string;
};

export type CreateListingPricing = {
  unitPrice: string;
  minimumOrder: string;
  totalQuantity: string;
  bulkPricingEnabled: boolean;
  tiers: BulkPricingTier[];
};

export type Incoterm = "FOB" | "CIF" | "EXW" | "DDP";

export type LogisticsCertification = {
  id: string;
  name: string;
  status: "active" | "pending" | "uploaded";
  fileName?: string;
};

export type CreateListingLogistics = {
  originLocation: string;
  incoterm: Incoterm;
  packagingOptions: string[];
  leadTimeDays: number;
  certifications: LogisticsCertification[];
};
