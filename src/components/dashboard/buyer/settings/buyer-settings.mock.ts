import type { BuyerSettings } from "@/components/dashboard/buyer/settings/buyer-settings.types";

export const buyerSettings: BuyerSettings = {
  profile: {
    fullName: "Ramesh Kumar",
    id: "AM-BUY-78123",
    businessName: "Kumar Fresh Imports",
    bio: "Fresh produce buyer and importer focusing on quality fruits and vegetables for retail and wholesale markets.",
    verified: true,
  },
  contact: {
    email: "ramesh.kumar@kumarimports.com",
    emailVerified: true,
    phone: "+966 50 987 6543",
    phoneVerified: true,
  },
  twoFactorEnabled: true,
  language: "en",
  activeSessions: [
    { id: "macbook-pro-14", device: "MacBook Pro 14", location: "Riyadh, SA", browser: "Chrome", current: true },
    { id: "iphone-15-pro", device: "iPhone 15 Pro", location: "Riyadh, SA", browser: "Safari" },
  ],
  paymentMethod: {
    label: "Primary Payment Method",
    card: "Visa •••• •••• 4242",
  },
};
