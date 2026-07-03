import type { BuyerProfile, BuyerProfileReview } from "@/components/dashboard/buyer/profile/buyer-profile.types";

export const buyerProfile: BuyerProfile = {
  name: "Ahmed Al Qahtani",
  companyName: "Green Fields Trading Co.",
  location: "Riyadh, Saudi Arabia",
  memberSince: "Member since 2023",
  rating: 4.7,
  reviewsCount: 36,
  bio: "Green Fields Trading Co. is a leading importer and distributor of fresh produce and agricultural products. We work with trusted farms to deliver premium quality with reliability and integrity.",
  avatarUrl: "/images/farmer/profile/farmer-avatar.jpg",
  coverUrl: "/images/farmer/profile/profile-cover.png",
  contact: {
    email: "ahmed@gftrading.com",
    phone: "+966 55 123 4567",
    address: "King Fahd Road, Al Olaya\nRiyadh 12212, Saudi Arabia",
    website: "www.gftrading.com",
  },
  business: {
    companySize: "51-200 Employees",
    businessType: "Importer / Distributor",
    mainCategories: "Fresh Fruits, Vegetables, Herbs, Grains",
    certifications: "ISO 22000, HACCP Certified, Halal Certified",
    marketsServed: "KSA, UAE, Qatar, Kuwait, Bahrain, Oman",
  },
  stats: {
    completedPurchases: 247,
    onTimeDeliveryRate: 96,
    activeContracts: 18,
  },
};

export const buyerProfileReviews: BuyerProfileReview[] = [
  {
    id: "faisal-al-mutairi",
    reviewerName: "Faisal Al Mutairi",
    reviewerRole: "Supplier",
    rating: 5,
    date: "May 18, 2025",
    text: "Great buyer! Clear communication and smooth transaction. Highly recommended.",
    avatarUrl: "/images/farmer/profile/farmer-avatar.jpg",
    initials: "FM",
  },
  {
    id: "hassan-darwish",
    reviewerName: "Hassan Darwish",
    reviewerRole: "Supplier",
    rating: 5,
    date: "May 10, 2025",
    text: "Professional and reliable. Payments are always on time and processes are transparent.",
    avatarUrl: "/images/farmer/profile/farmer-avatar.jpg",
    initials: "HD",
  },
  {
    id: "nasser-al-harbi",
    reviewerName: "Nasser Al Harbi",
    reviewerRole: "Supplier",
    rating: 5,
    date: "Apr 28, 2025",
    text: "Excellent partner to work with. Provides clear requirements and long-term collaboration.",
    avatarUrl: "/images/farmer/profile/farmer-avatar.jpg",
    initials: "NH",
  },
];
