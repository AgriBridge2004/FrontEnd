export type AdminPaymentStatus = "pending" | "released" | "refunded" | "frozen" | "failed";

export type AdminPayment = {
  id: string;
  transactionId: string;
  dealId: string;
  payer: string;
  payee: string;
  amount: string;
  amountValue: number;
  commission: string;
  commissionValue: number;
  inspectionFee: string;
  netAmount: string;
  paymentMethod: string;
  status: AdminPaymentStatus;
  statusLabel: string;
  transactionDate: string;
  transactionDateISO: string;
  transactionTime: string;
  linkedDeal: {
    product: string;
    quantity: string;
  };
  relatedDispute?: {
    id: string;
    title: string;
    raisedBy: string;
    status: string;
  };
  failureReason?: string;
};

export type AdminPaymentStatusFilter = "all" | AdminPaymentStatus;
