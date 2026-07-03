export type FarmerDashboardUser = {
  name: string;
  email: string;
  farm: string;
};

export type FarmerDashboardStat = {
  label: string;
  value: string;
  suffix?: string;
  note: string;
  tone: string;
  icon: string;
};

export type FarmerRevenuePoint = {
  label: string;
  revenue: number;
};

export type FarmerUpcomingTask = {
  title: string;
  field: string;
  date: string;
  time: string;
  badge: string;
};

export type FarmerRfqOpportunity = {
  title: string;
  buyer: string;
  location: string;
  quantity: string;
  color: string;
};

export type FarmerRecentDeal = {
  id: string;
  buyer: string;
  product: string;
  quantity: string;
  amount: string;
  status: string;
};
