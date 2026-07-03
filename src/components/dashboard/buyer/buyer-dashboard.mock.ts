import type {
  BuyerAlert,
  BuyerDashboardStats,
  BuyerDelivery,
  BuyerRecentPurchase,
  BuyerSpendingPoint,
  BuyerSupplier,
} from "@/components/dashboard/buyer/buyer-dashboard.types";

export const buyerDashboardStats: BuyerDashboardStats = {
  activeContracts: 14,
  pendingDeliveries: 8,
  totalSpent: 248750,
  openDisputes: 2,
};

export const buyerSpendingData: BuyerSpendingPoint[] = [
  { label: "MAY 1", spending: 32000 },
  { label: "MAY 5", spending: 42000 },
  { label: "MAY 8", spending: 36000 },
  { label: "MAY 12", spending: 51000 },
  { label: "MAY 18", spending: 46000 },
  { label: "MAY 22", spending: 52000 },
  { label: "MAY 25", spending: 55000 },
  { label: "MAY 27", spending: 50000 },
  { label: "MAY 29", spending: 62000 },
];

export const buyerSpendingPeriods = {
  "This Week": [
    { label: "Mon", spending: 12000 },
    { label: "Tue", spending: 18000 },
    { label: "Wed", spending: 15000 },
    { label: "Thu", spending: 24000 },
    { label: "Fri", spending: 21000 },
    { label: "Sat", spending: 28000 },
    { label: "Sun", spending: 32000 },
  ],
  "This Month": buyerSpendingData,
  "Last 3 Months": [
    { label: "Mar", spending: 146000 },
    { label: "Apr", spending: 188000 },
    { label: "May", spending: 248750 },
  ],
  "This Year": [
    { label: "Jan", spending: 92000 },
    { label: "Feb", spending: 105000 },
    { label: "Mar", spending: 146000 },
    { label: "Apr", spending: 188000 },
    { label: "May", spending: 248750 },
    { label: "Jun", spending: 232000 },
    { label: "Jul", spending: 218000 },
    { label: "Aug", spending: 256000 },
    { label: "Sep", spending: 241000 },
    { label: "Oct", spending: 269000 },
    { label: "Nov", spending: 286000 },
    { label: "Dec", spending: 302000 },
  ],
} satisfies Record<string, BuyerSpendingPoint[]>;

export const buyerRecentPurchases: BuyerRecentPurchase[] = [
  {
    amount: 45000,
    id: "D-2025-045",
    product: "Tomatoes",
    status: "in-progress",
    supplier: "Green Fields Co.",
  },
  {
    amount: 32000,
    id: "D-2025-044",
    product: "Potatoes",
    status: "confirmed",
    supplier: "FreshMart LLC",
  },
];

export const buyerDeliveries: BuyerDelivery[] = [
  {
    date: "26 MAY",
    id: "D-2025-045",
    location: "Al Sa'adah Farm, Al Ahsa",
    product: "Tomatoes",
  },
];

export const buyerTopSuppliers: BuyerSupplier[] = [
  {
    location: "Al Ahsa",
    name: "Green Fields Co.",
    rating: 4.8,
  },
  {
    location: "Riyadh",
    name: "FreshMart LLC",
    rating: 4.6,
  },
];

export const buyerRecentAlerts: BuyerAlert[] = [
  {
    time: "Today at 10:00 AM",
    title: "Delivery scheduled: D-045",
  },
  {
    time: "Yesterday",
    title: "Payment confirmed: 32k SAR",
  },
];
