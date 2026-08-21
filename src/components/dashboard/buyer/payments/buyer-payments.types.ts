export type BuyerPaymentStatus = "escrow" | "released" | "pending";

export type BuyerPaymentFilter = "all" | "escrow" | "released";

export type BuyerPayment = {
  id: string;
  contractId: string;
  recipientName: string;
  recipientSubtitle: string;
  recipientIconType?: "leaf" | "equipment" | "logistics";
  amount: number;
  status: BuyerPaymentStatus;
  authDate: string;
};

export type BuyerPaymentStats = {
  escrowBalance: number;
  totalSettledYtd: number;
  upcomingPayouts: number;
};
