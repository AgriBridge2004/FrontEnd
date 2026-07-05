import type {
  AdminActionRequiredItem,
  AdminStat,
  DealGrowthPoint,
  UserRoleDistribution,
} from "@/components/dashboard/admin/admin-dashboard.types";

export const adminStats: AdminStat[] = [
  {
    id: "active-users",
    title: "Active Users",
    value: "12,845",
    trend: "+12.4%",
    trendDirection: "up",
    subtext: "vs last period",
    accent: "green",
  },
  {
    id: "active-deals",
    title: "Active Deals",
    value: "1,258",
    trend: "+8.7%",
    trendDirection: "up",
    subtext: "vs last period",
    accent: "blue",
  },
  {
    id: "pending-inspection",
    title: "Deals Pending Inspection",
    value: "342",
    trend: "+5.2%",
    trendDirection: "up",
    subtext: "vs last period",
    accent: "purple",
  },
  {
    id: "open-disputes",
    title: "Open Disputes",
    value: "28",
    trend: "-33.3%",
    trendDirection: "down",
    subtext: "vs last period",
    accent: "orange",
  },
  {
    id: "revenue-summary",
    title: "Revenue Summary (This Period)",
    value: "$243,560",
    trend: "+15.6%",
    trendDirection: "up",
    subtext: "vs last period",
    accent: "green",
  },
];

export const dealGrowthData: DealGrowthPoint[] = [
  { date: "May 15", activeDeals: 420 },
  { date: "May 22", activeDeals: 390 },
  { date: "May 29", activeDeals: 420 },
  { date: "Jun 5", activeDeals: 610 },
  { date: "Jun 12", activeDeals: 780 },
  { date: "Jun 19", activeDeals: 980 },
];

export const userRoleDistribution: UserRoleDistribution[] = [
  { role: "Farmers", value: 6645, percentage: 52 },
  { role: "Buyers", value: 4359, percentage: 34 },
  { role: "Quality Officers", value: 1841, percentage: 14 },
];

export const openDisputes: AdminActionRequiredItem[] = [
  {
    id: "DIS-2024-1028",
    title: "Dispute #DIS-2024-1028",
    time: "2h ago",
    buyer: "GreenField Imports",
    farm: "Al Noor Farms",
  },
  {
    id: "DIS-2024-1023",
    title: "Dispute #DIS-2024-1023",
    time: "5h ago",
    buyer: "FreshLink LLC",
    farm: "Sunrise Produce",
  },
  {
    id: "DIS-2024-1019",
    title: "Dispute #DIS-2024-1019",
    time: "1d ago",
    buyer: "Global Harvest Co.",
    farm: "Green Valley",
  },
  {
    id: "DIS-2024-1012",
    title: "Dispute #DIS-2024-1012",
    time: "1d ago",
    buyer: "Nature's Basket",
    farm: "Al Waha Farm",
  },
  {
    id: "DIS-2024-1007",
    title: "Dispute #DIS-2024-1007",
    time: "2d ago",
    buyer: "AgriWorld Traders",
    farm: "Badr Farm",
  },
];
