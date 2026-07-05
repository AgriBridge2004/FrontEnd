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

export type AdminActionRequiredItem = {
  id: string;
  title: string;
  time: string;
  buyer: string;
  farm: string;
};
