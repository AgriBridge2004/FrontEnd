import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";

export const assignmentDetails: AssignmentDetails = {
  id: "D-2025-1542",
  dealId: "#D-2025-1542",
  status: "pending",
  inspectionLocation: {
    farmName: "Al Sa'adah Farm",
    region: "Al Ahsa, Eastern Province",
    address: "Al Ahsa, Eastern Province, Saudi Arabia",
    coordinates: {
      lat: 25.383,
      lng: 49.586,
    },
  },
  requiredDate: "May 26, 2025",
  requiredTime: "09:00 AM",
  deadlineLabel: "2 days left",
  assignmentType: "On-site Inspection",
  assignmentDescription: "Quality & Quantity Check",
  product: "Tomatoes",
  category: "Fresh Vegetables",
  offeredQuantity: "10,000 KG",
  farmer: "Abdullah Al Mutairi",
  buyer: "Green Fields Trading Co.",
  harvestDate: "May 24, 2025",
  dealCreated: "May 20, 2025",
  dealValue: "25,000 SAR",
  expectedDuration: "2-3 hours",
  priority: "Standard",
  adminNotes:
    "Please ensure to check the quality grade, size, ripeness, and packaging condition. Upload clear images and report any issues immediately.",
  attachments: [
    {
      id: "deal-agreement",
      name: "Deal Agreement",
      type: "pdf",
      size: "245 KB",
    },
    {
      id: "farm-images",
      name: "Farm Images",
      type: "zip",
      size: "1.2 MB",
    },
  ],
};
