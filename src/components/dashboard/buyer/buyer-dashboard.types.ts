export type BuyerDashboardStats = {
  activeContracts: number;
  pendingDeliveries: number;
  totalSpent: number;
  openDisputes: number;
};

export type BuyerRecentPurchase = {
  id: string;
  supplier: string;
  product: string;
  amount: number;
  status: "in-progress" | "confirmed" | "pending" | "completed";
};

export type BuyerDelivery = {
  product: string;
  id: string;
  date: string;
  location: string;
  image?: string;
};

export type BuyerSupplier = {
  name: string;
  location: string;
  rating: number;
  image?: string;
};

export type BuyerAlert = {
  title: string;
  time: string;
};

export type BuyerSpendingPoint = {
  label: string;
  spending: number;
};
