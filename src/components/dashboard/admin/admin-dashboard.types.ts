export type AdminStat = {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  subtext: string;
  accent: "green" | "blue" | "purple" | "orange";
};

export type DealGrowthPoint = {
  date: string;
  activeDeals: number;
};

export type UserRoleDistribution = {
  role: "Farmers" | "Buyers" | "Quality Officers";
  value: number;
  percentage: number;
};

export type AdminChartPeriod =
  | "This Period"
  | "Last 7 Days"
  | "Last 30 Days"
  | "This Month"
  | "Last Month"
  | "This Quarter";

export type AdminChartData = {
  dealGrowth: DealGrowthPoint[];
  userRoleDistribution: UserRoleDistribution[];
  dealGrowthTrend: string;
};

export type AdminActionRequiredItem = {
  id: string;
  title: string;
  time: string;
  buyer: string;
  farm: string;
};
