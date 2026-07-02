export type ContractTimelineStatus = "completed" | "current" | "pending";

export type DigitalContract = {
  dealId: string;
  contractId: string;
  product?: string;
  quantity?: string;
  title: string;
  status: string;
  seller: {
    farmName: string;
    authorizedBy: string;
    address: string;
  };
  buyer: {
    companyName: string;
    authorizedBy: string;
    address: string;
  };
  commodity: {
    description: string;
    quantity: string;
    unitPrice: string;
    totalValue: string;
    deliveryDate: string;
    deliveryLocation: string;
    terms: string;
    logistics: string;
    insured: boolean;
  };
  signatures: {
    seller: {
      name: string;
      timestamp: string;
    };
    buyer: {
      name: string;
      timestamp: string;
    };
  };
  timeline: {
    id: string;
    title: string;
    date?: string;
    description?: string;
    status: ContractTimelineStatus;
  }[];
  meta: {
    version: string;
    blockchainId: string;
    storage: string;
  };
};
