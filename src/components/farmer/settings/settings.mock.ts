export type FarmerSettings = {
  profile: {
    fullName: string;
    farmName: string;
    id: string;
    bio: string;
    avatar?: string;
    verified: boolean;
  };
  contact: {
    email: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
  language: "en" | "ar";
  twoFactorEnabled: boolean;
  automaticWithdrawal: boolean;
  payoutMethod: {
    bankName: string;
    last4: string;
  };
  activeSessions: Array<{
    id: string;
    device: string;
    location: string;
    browser?: string;
    lastActive: string;
    current?: boolean;
  }>;
};

export const farmerSettings: FarmerSettings = {
  profile: {
    fullName: "Ahmad Al-Sayed",
    farmName: "Green Oasis Sustainable Orchards",
    id: "AM-45920-B2B",
    bio: "Certified organic producer specializing in heritage date varieties and sustainable citrus farming since 1998.",
    verified: true,
  },
  contact: {
    email: "ahmad.sayed@agrimarket.com",
    phone: "+966 50 123 4567",
    emailVerified: true,
    phoneVerified: true,
  },
  language: "en",
  twoFactorEnabled: true,
  automaticWithdrawal: true,
  payoutMethod: {
    bankName: "Al-Rajhi Bank",
    last4: "8842",
  },
  activeSessions: [
    {
      id: "macbook",
      device: "MacBook Pro 14",
      location: "Riyadh, SA",
      browser: "Chrome",
      lastActive: "Current",
      current: true,
    },
    {
      id: "iphone",
      device: "iPhone 15 Pro",
      location: "Dubai, UAE",
      lastActive: "2h ago",
    },
  ],
};
