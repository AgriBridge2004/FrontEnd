export type BuyerProfile = {
  name: string;
  companyName: string;
  location: string;
  memberSince: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  avatarUrl?: string;
  coverUrl?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  business: {
    companySize: string;
    businessType: string;
    mainCategories: string;
    certifications: string;
    marketsServed: string;
  };
  stats: {
    completedPurchases: number;
    onTimeDeliveryRate: number;
    activeContracts: number;
  };
};

export type BuyerProfileReview = {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number;
  date: string;
  text: string;
  avatarUrl?: string;
  initials: string;
};
