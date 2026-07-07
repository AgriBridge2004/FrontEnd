export type FarmerDashboardStats = {
  activeListings: number;
  openRfqs: number;
  activeDeals: number;
  totalRevenue: number;
};

export type FarmerProfile = {
  id?: string;
  userId?: string;
  fullName?: string;
  phone?: string;
  farmName?: string;
  bio?: string;
  cropTypes?: string;
  region?: string;
  farmSize?: number;
  profileImage?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FarmerProfilePayload = {
  fullName?: string;
  phone?: string;
  farmName?: string;
  bio?: string;
  cropTypes?: string;
  region?: string;
  farmSize?: number;
  profileImage?: File;
  coverImage?: File;
};

export type FarmerProfileCreatePayload = FarmerProfilePayload & {
  fullName: string;
  phone: string;
};

export type FarmerProfileUpdatePayload = FarmerProfilePayload;

export type FarmerDeal = Record<string, unknown>;
export type FarmerContract = Record<string, unknown>;
export type FarmerPayment = Record<string, unknown>;
export type FarmerReview = Record<string, unknown>;
export type FarmerDispute = Record<string, unknown>;
export type FarmerNotification = Record<string, unknown>;
