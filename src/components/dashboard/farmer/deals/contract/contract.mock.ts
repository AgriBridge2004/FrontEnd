import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";

export const digitalContracts: DigitalContract[] = [
  {
    dealId: "DEAL-1042",
    contractId: "AB-2025-MAR-1042-Gaza",
    product: "Fresh Tomatoes",
    quantity: "500 kg",
    title: "Digital Contract DEAL-1042",
    status: "Signed by Both Parties",
    seller: {
      farmName: "Al-Nour Farm",
      authorizedBy: "Ahmed Hassan",
      address: "Beit Hanoun, North Gaza",
    },
    buyer: {
      companyName: "Green Kitchen Restaurant",
      authorizedBy: "Omar Nassar",
      address: "Al-Rimal District, Gaza City",
    },
    commodity: {
      description: "Premium Fresh Tomatoes (Export Grade)",
      quantity: "500 kg",
      unitPrice: "14 USD / kg",
      totalValue: "7,000 USD",
      deliveryDate: "March 14, 2025",
      deliveryLocation: "Central Distribution, Gaza City",
      terms: "AgriBridge Secured Escrow",
      logistics: "Seller Provided",
      insured: true,
    },
    signatures: {
      seller: {
        name: "Ahmed Hassan",
        timestamp: "MARCH 12, 2025 • 09:42 AM (GMT+2)",
      },
      buyer: {
        name: "Omar Nassar",
        timestamp: "MARCH 12, 2025 • 11:15 AM (GMT+2)",
      },
    },
    timeline: [
      { id: "draft-created", title: "Draft Created", date: "March 11, 2025 • 14:00", status: "completed" },
      { id: "sent-buyer", title: "Sent to Buyer", date: "March 11, 2025 • 14:30", status: "completed" },
      { id: "signed-buyer", title: "Signed by Buyer", date: "March 12, 2025 • 11:15", status: "completed" },
      { id: "signed-farmer", title: "Signed by Farmer", date: "March 12, 2025 • 09:42", status: "completed" },
      { id: "escrow-pending", title: "Escrow Pending", description: "Awaiting bank verification", status: "current" },
    ],
    meta: {
      version: "1.0.4 (Final)",
      blockchainId: "Verified",
      storage: "Immutable Cloud",
    },
  },
];

export function getDigitalContract(dealId: string) {
  return digitalContracts.find((contract) => contract.dealId.toLowerCase() === decodeURIComponent(dealId).toLowerCase());
}
