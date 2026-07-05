import type {
  AdminActionRequiredItem,
  AdminChartData,
  AdminChartPeriod,
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

export const adminChartPeriods: AdminChartPeriod[] = [
  "This Period",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month",
  "This Quarter",
];

export const adminChartDataByPeriod: Record<AdminChartPeriod, AdminChartData> = {
  "This Period": {
    dealGrowth: dealGrowthData,
    userRoleDistribution,
    dealGrowthTrend: "+8.7%",
  },
  "Last 7 Days": {
    dealGrowth: [
      { date: "Mon", activeDeals: 250 },
      { date: "Tue", activeDeals: 310 },
      { date: "Wed", activeDeals: 340 },
      { date: "Thu", activeDeals: 420 },
      { date: "Fri", activeDeals: 460 },
      { date: "Sat", activeDeals: 510 },
      { date: "Sun", activeDeals: 560 },
    ],
    userRoleDistribution: [
      { role: "Farmers", value: 720, percentage: 50 },
      { role: "Buyers", value: 515, percentage: 36 },
      { role: "Quality Officers", value: 205, percentage: 14 },
    ],
    dealGrowthTrend: "+5.1%",
  },
  "Last 30 Days": {
    dealGrowth: [
      { date: "Week 1", activeDeals: 520 },
      { date: "Week 2", activeDeals: 690 },
      { date: "Week 3", activeDeals: 820 },
      { date: "Week 4", activeDeals: 1040 },
      { date: "Now", activeDeals: 1260 },
    ],
    userRoleDistribution: [
      { role: "Farmers", value: 6840, percentage: 53 },
      { role: "Buyers", value: 4260, percentage: 33 },
      { role: "Quality Officers", value: 1810, percentage: 14 },
    ],
    dealGrowthTrend: "+11.4%",
  },
  "This Month": {
    dealGrowth: [
      { date: "Jun 1", activeDeals: 610 },
      { date: "Jun 8", activeDeals: 730 },
      { date: "Jun 15", activeDeals: 850 },
      { date: "Jun 22", activeDeals: 960 },
      { date: "Jun 29", activeDeals: 1120 },
    ],
    userRoleDistribution: [
      { role: "Farmers", value: 6725, percentage: 52 },
      { role: "Buyers", value: 4450, percentage: 34 },
      { role: "Quality Officers", value: 1785, percentage: 14 },
    ],
    dealGrowthTrend: "+9.8%",
  },
  "Last Month": {
    dealGrowth: [
      { date: "May 1", activeDeals: 450 },
      { date: "May 8", activeDeals: 520 },
      { date: "May 15", activeDeals: 620 },
      { date: "May 22", activeDeals: 710 },
      { date: "May 29", activeDeals: 890 },
    ],
    userRoleDistribution: [
      { role: "Farmers", value: 6350, percentage: 51 },
      { role: "Buyers", value: 4330, percentage: 35 },
      { role: "Quality Officers", value: 1740, percentage: 14 },
    ],
    dealGrowthTrend: "+6.2%",
  },
  "This Quarter": {
    dealGrowth: [
      { date: "Apr", activeDeals: 540 },
      { date: "May", activeDeals: 760 },
      { date: "Jun", activeDeals: 980 },
      { date: "Jul", activeDeals: 1180 },
      { date: "Aug", activeDeals: 1390 },
    ],
    userRoleDistribution: [
      { role: "Farmers", value: 7020, percentage: 54 },
      { role: "Buyers", value: 4285, percentage: 33 },
      { role: "Quality Officers", value: 1695, percentage: 13 },
    ],
    dealGrowthTrend: "+14.9%",
  },
};

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
