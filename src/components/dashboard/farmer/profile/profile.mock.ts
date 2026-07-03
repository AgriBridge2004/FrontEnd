export type FarmerProfile = {
  name: string;
  farmName: string;
  location: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  bio: string;
  avatar: string;
  coverImage: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  business: {
    farmSize: string;
    products: string;
    specialties: string;
    certifications: string;
  };
  stats: {
    completedDeals: number;
    successRate: string;
    activeListings: number;
  };
};

export type ProfileReview = {
  id: string;
  name: string;
  initials: string;
  role: string;
  rating: number;
  date: string;
  text: string;
};

export const farmerProfile: FarmerProfile = {
  name: "Ahmed Hassan",
  farmName: "Al-Nour Farm",
  location: "Gaza Strip",
  memberSince: "Member since 2024",
  rating: 4.8,
  reviewCount: 47,
  bio: "We are a family-owned organic farm committed to sustainable and regenerative farming practices. We grow high-quality fruits and vegetables using 100% organic methods, caring for our land and our community.",
  avatar: "/images/farmer/profile/farmer-avatar.jpg",
  coverImage: "/images/farmer/profile/profile-cover.png",
  contact: {
    email: "ahmed@alnourfarm.ps",
    phone: "+970 59 123 4567",
    address: "Beit Lahia: North Gaza, Gaza Strip, Palestine",
  },
  business: {
    farmSize: "25 Acres",
    products: "Tomatoes, Cucumbers, Olive Oil, Zucchini, Herbs",
    specialties: "Organic Vegetables, Drip Irrigation, Soil Health",
    certifications: "Organic Certified, GlobalG.A.P., Local Organic Seal",
  },
  stats: {
    completedDeals: 156,
    successRate: "98%",
    activeListings: 12,
  },
};

export const profileReviews: ProfileReview[] = [
  {
    id: "omar-khaled",
    name: "Omar Khaled",
    initials: "OK",
    role: "Wholesale Buyer",
    rating: 5,
    date: "May 18, 2025",
    text: "Excellent quality produce and very professional communication. Always delivers on time.",
  },
  {
    id: "sarah-almasri",
    name: "Sarah Al-Masri",
    initials: "SA",
    role: "Retail Buyer",
    rating: 5,
    date: "May 10, 2025",
    text: "Fresh, organic, and exactly as described. Great packaging and fast delivery.",
  },
  {
    id: "ibrahim-darwish",
    name: "Ibrahim Darwish",
    initials: "ID",
    role: "Export Buyer",
    rating: 5,
    date: "Apr 28, 2025",
    text: "Consistent quality and a trustworthy partner. Highly recommended!",
  },
];
