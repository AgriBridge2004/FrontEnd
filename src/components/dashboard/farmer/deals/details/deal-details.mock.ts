import type { DealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.types";

export const dealStages = [
  "Quote Accepted",
  "Contract Signed",
  "Escrow Funded",
  "Inspection Scheduled",
  "Delivery",
  "Payment Released",
];

export const dealDetails: DealDetail[] = [
  {
    id: "DEAL-1042",
    product: "Fresh Tomatoes",
    quantity: "500 kg",
    status: "Active",
    unitPrice: "$14.00 / kg",
    totalAmount: "$7,000.00",
    buyer: "Green Kitchen",
    farmer: "Al-Nour Farm",
    dealCreated: "Feb 28, 2025",
    expectedDelivery: "Mar 14, 2025",
    currentStage: 4,
    inspection: {
      officer: "Fatima Hassan",
      assignedOn: "Mar 07, 2025",
      inspectionDate: "Mar 12, 2025",
      location: "Al-Nour Farm, Field 3",
      status: "Scheduled",
    },
    timeline: [
      {
        id: "contract-signed",
        title: "Contract Signed",
        description: "The contract has been signed by both parties.",
        time: "Mar 05, 2025 10:15 AM",
        status: "completed",
      },
      {
        id: "escrow-funded",
        title: "Escrow Funded",
        description: "Escrow has been funded by the buyer.",
        time: "Mar 06, 2025 02:30 PM",
        status: "completed",
      },
      {
        id: "inspection-scheduled",
        title: "Inspection Scheduled",
        description: "Quality inspection has been assigned.",
        time: "Mar 07, 2025 09:45 AM",
        status: "current",
      },
      {
        id: "delivery-pending",
        title: "Delivery Pending",
        description: "Awaiting inspection completion.",
        time: "Mar 14, 2025",
        status: "pending",
      },
    ],
    documents: [
      {
        id: "contract",
        name: "contract.pdf",
        description: "Uploaded on Mar 05, 2025",
        status: "available",
      },
      {
        id: "inspection",
        name: "inspection.pdf",
        description: "Pending",
        status: "pending",
      },
    ],
  },
];

export function getDealDetail(dealId: string) {
  return dealDetails.find((deal) => deal.id.toLowerCase() === decodeURIComponent(dealId).toLowerCase());
}
