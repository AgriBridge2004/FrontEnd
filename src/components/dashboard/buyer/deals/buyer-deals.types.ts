export type BuyerDealStatus = "active" | "awaiting" | "completed" | "cancelled" | "refunded";

export type BuyerDeal = {
  id: string;
  productName: string;
  productDetail: string;
  productImage?: string;
  farmerName: string;
  farmerAvatar?: string;
  farmerRating: number;
  status: BuyerDealStatus;
  quantity: string;
  amount: number;
  deliveryDate: string;
};

export type BuyerDealStatusFilter = "all" | BuyerDealStatus;
