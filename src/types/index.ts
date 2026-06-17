export type UserRole = "farmer" | "buyer" | "quality_officer" | "admin";

export type UserStatus = "active" | "pending" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  location: string;
  status: UserStatus;
  joinedAt: string;
  avatarUrl?: string;
};

export type FarmerProfile = {
  userId: string;
  farmName: string;
  farmSizeHectares: number;
  primaryCrops: string[];
  certifications: string[];
  yearsInBusiness: number;
};

export type BuyerProfile = {
  userId: string;
  companyName: string;
  buyerType: "restaurant" | "factory" | "wholesaler" | "exporter" | "local_company";
  monthlyPurchaseVolume: string;
  preferredCrops: string[];
};

export type ListingType =
  | "fresh_produce"
  | "processed_goods"
  | "grains"
  | "livestock"
  | "inputs";

export type ListingStatus = "draft" | "active" | "reserved" | "sold" | "inactive";

export type QualityGrade = "A" | "B" | "C" | "Rejected";

export type Listing = {
  id: string;
  farmerId: string;
  title: string;
  type: ListingType;
  crop: string;
  description: string;
  quantity: number;
  unit: "kg" | "ton" | "box" | "crate" | "liter";
  pricePerUnit: number;
  currency: "USD";
  location: string;
  harvestDate: string;
  availableFrom: string;
  status: ListingStatus;
  qualityGrade?: QualityGrade;
  certifications: string[];
  imageUrl: string;
};

export type RFQStatus = "open" | "quoted" | "matched" | "closed" | "expired";

export type QuoteStatus = "submitted" | "accepted" | "rejected";

export type Quote = {
  id: string;
  rfqId: string;
  farmerId: string;
  pricePerUnit: number;
  totalPrice: number;
  currency: "USD";
  message: string;
  status: QuoteStatus;
  createdAt: string;
};

export type RFQ = {
  id: string;
  buyerId: string;
  title: string;
  crop: string;
  quantity: number;
  unit: "kg" | "ton" | "box" | "crate" | "liter";
  targetPrice?: number;
  currency: "USD";
  deliveryLocation: string;
  deadline: string;
  status: RFQStatus;
  createdAt: string;
  notes: string;
  quotes: Quote[];
};

export type DealStatus =
  | "draft"
  | "awaiting_inspection"
  | "inspection_scheduled"
  | "awaiting_payment"
  | "escrow_funded"
  | "in_delivery"
  | "completed"
  | "disputed"
  | "cancelled";

export type PaymentStatus = "pending" | "escrow_funded" | "released" | "refunded" | "failed";

export type Payment = {
  id: string;
  dealId: string;
  amount: number;
  currency: "USD";
  status: PaymentStatus;
  escrowReference: string;
  createdAt: string;
  releasedAt?: string;
};

export type Deal = {
  id: string;
  listingId?: string;
  rfqId?: string;
  farmerId: string;
  buyerId: string;
  title: string;
  quantity: number;
  unit: "kg" | "ton" | "box" | "crate" | "liter";
  unitPrice: number;
  totalValue: number;
  currency: "USD";
  status: DealStatus;
  deliveryDate: string;
  deliveryLocation: string;
  payment: Payment;
  createdAt: string;
};

export type InspectionStatus = "assigned" | "scheduled" | "submitted" | "approved" | "rejected";

export type InspectionReport = {
  id: string;
  inspectionId: string;
  grade: QualityGrade;
  moisturePercent?: number;
  defectRatePercent?: number;
  packagingNotes: string;
  summary: string;
  submittedAt: string;
  approved: boolean;
};

export type Inspection = {
  id: string;
  dealId: string;
  officerId: string;
  listingId: string;
  crop: string;
  location: string;
  scheduledDate: string;
  status: InspectionStatus;
  report?: InspectionReport;
};

export type DisputeStatus = "open" | "under_review" | "resolved" | "rejected";

export type Dispute = {
  id: string;
  dealId: string;
  openedByUserId: string;
  reason: string;
  status: DisputeStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
};

export type Review = {
  id: string;
  dealId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export type AdminDashboardStats = {
  activeUsers: number;
  activeListings: number;
  openRFQs: number;
  escrowBalance: number;
  monthlyRevenue: number;
  pendingInspections: number;
  openDisputes: number;
};
