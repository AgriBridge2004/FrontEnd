export type RFQStatus = "open" | "closing-soon" | "submitted";

export type RFQRequest = {
  id: string;
  title: string;
  buyer: string;
  location: string;
  description: string;
  deadline: string;
  totalVolume: string;
  category: "Vegetables" | "Oils & Fats" | "Grains" | "Fruits";
  status: RFQStatus;
  image: string;
};

export type RFQFilters = {
  commodityType: string;
  status: string;
  region: string;
};
