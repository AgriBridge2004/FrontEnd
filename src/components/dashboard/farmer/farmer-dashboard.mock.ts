import type {
  FarmerDashboardStat,
  FarmerDashboardUser,
  FarmerRecentDeal,
  FarmerRevenuePoint,
  FarmerRfqOpportunity,
  FarmerUpcomingTask,
} from "@/components/dashboard/farmer/farmer-dashboard.types";

export const farmerDashboardUser: FarmerDashboardUser = {
  name: "Ramesh Kumar",
  email: "ramesh@alnourfarm.example",
  farm: "AL-NOUR FARM",
};

export const farmerStats: FarmerDashboardStat[] = [
  { label: "Active Listings", value: "12", note: "↑ 2 from last week", tone: "positive", icon: "listing" },
  { label: "Open RFQs", value: "8", note: "↑ 1 from last week", tone: "positive", icon: "rfq" },
  { label: "Active Deals", value: "5", note: "No change", tone: "neutral", icon: "deal" },
  {
    label: "Total Revenue",
    value: "24,500",
    suffix: "SAR",
    note: "↑ 8% from last month",
    tone: "positive",
    icon: "revenue",
  },
];

export const farmerRevenueData: FarmerRevenuePoint[] = [
  { label: "May 1", revenue: 8500 },
  { label: "May 5", revenue: 10500 },
  { label: "May 9", revenue: 13500 },
  { label: "May 13", revenue: 11800 },
  { label: "May 17", revenue: 14500 },
  { label: "May 21", revenue: 9800 },
  { label: "May 25", revenue: 17200 },
  { label: "May 29", revenue: 15000 },
  { label: "May 31", revenue: 24500 },
];

export const farmerRevenuePeriods = {
  "This Week": [
    { label: "Mon", revenue: 2400 },
    { label: "Tue", revenue: 3200 },
    { label: "Wed", revenue: 2800 },
    { label: "Thu", revenue: 4200 },
    { label: "Fri", revenue: 3900 },
    { label: "Sat", revenue: 5200 },
    { label: "Sun", revenue: 6100 },
  ],
  "This Month": farmerRevenueData,
  "Last 3 Months": [
    { label: "Mar", revenue: 42000 },
    { label: "Apr", revenue: 57500 },
    { label: "May", revenue: 68000 },
  ],
  "This Year": [
    { label: "Jan", revenue: 18000 },
    { label: "Feb", revenue: 22000 },
    { label: "Mar", revenue: 42000 },
    { label: "Apr", revenue: 57500 },
    { label: "May", revenue: 68000 },
    { label: "Jun", revenue: 73000 },
    { label: "Jul", revenue: 69000 },
    { label: "Aug", revenue: 81000 },
    { label: "Sep", revenue: 78000 },
    { label: "Oct", revenue: 86000 },
    { label: "Nov", revenue: 91000 },
    { label: "Dec", revenue: 98000 },
  ],
} satisfies Record<string, FarmerRevenuePoint[]>;

export const farmerUpcomingTasks: FarmerUpcomingTask[] = [
  {
    title: "Inspection Scheduled",
    field: "Field A7",
    date: "24 May",
    time: "10:00 AM",
    badge: "Upcoming",
  },
];

export const farmerRfqOpportunities: FarmerRfqOpportunity[] = [
  {
    title: "Wheat Supply",
    buyer: "Al Madinah Mills",
    location: "Madinah, KSA",
    quantity: "20,000 kg",
    color: "bg-amber-100",
  },
  {
    title: "Potato Supply",
    buyer: "Saudi Fresh Ltd.",
    location: "Riyadh, KSA",
    quantity: "15,000 kg",
    color: "bg-orange-100",
  },
  {
    title: "Onion Supply",
    buyer: "Gulf Traders",
    location: "Dammam, KSA",
    quantity: "12,000 kg",
    color: "bg-rose-100",
  },
];

export const farmerRecentDeals: FarmerRecentDeal[] = [
  {
    id: "D-2025-045",
    buyer: "GreenFields Co.",
    product: "Tomatoes",
    quantity: "10,000 kg",
    amount: "4,500",
    status: "In Progress",
  },
  {
    id: "D-2025-044",
    buyer: "FreshMart LLC",
    product: "Potatoes",
    quantity: "8,000 kg",
    amount: "3,200",
    status: "Confirmed",
  },
  {
    id: "D-2025-043",
    buyer: "Agri Foods",
    product: "Onions",
    quantity: "6,000 kg",
    amount: "2,400",
    status: "Shipped",
  },
  {
    id: "D-2025-042",
    buyer: "Healthy Basket",
    product: "Cucumbers",
    quantity: "5,000 kg",
    amount: "2,000",
    status: "Completed",
  },
  {
    id: "D-2025-041",
    buyer: "Daily Fresh",
    product: "Green Beans",
    quantity: "3,500 kg",
    amount: "1,750",
    status: "In Progress",
  },
];
