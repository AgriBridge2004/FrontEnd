export type BuyerLanguage = "en" | "ar";

export type BuyerSession = {
  id: string;
  device: string;
  location: string;
  browser: string;
  current?: boolean;
};

export type BuyerSettings = {
  profile: {
    fullName: string;
    id: string;
    businessName: string;
    bio: string;
    verified: boolean;
  };
  contact: {
    email: string;
    emailVerified: boolean;
    phone: string;
    phoneVerified: boolean;
  };
  twoFactorEnabled: boolean;
  language: BuyerLanguage;
  activeSessions: BuyerSession[];
  paymentMethod: {
    label: string;
    card: string;
  };
};
