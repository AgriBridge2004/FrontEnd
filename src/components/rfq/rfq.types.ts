export type RFQStatus = "open" | "closing-soon" | "submitted";

export type RFQRequest = {
  id: string;
  title: string;
  buyer: string;
  location: string;
  description: string;
  deadline: string;
  totalVolume: string;
  category: string;
  budget?: number;
  raw?: Record<string, unknown>;
  status: RFQStatus;
  image: string;
};

export type RFQFilters = {
  commodityType: string;
  status: string;
  region: string;
};
