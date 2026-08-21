export type AssignmentDetails = {
  id: string;
  dealId: string;
  status: "pending" | "accepted" | "rejected";
  inspectionLocation: {
    farmName: string;
    region: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  requiredDate: string;
  requiredTime: string;
  deadlineLabel: string;
  assignmentType: string;
  assignmentDescription: string;
  product: string;
  category: string;
  offeredQuantity: string;
  farmer: string;
  buyer: string;
  harvestDate: string;
  dealCreated: string;
  dealValue: string;
  expectedDuration: string;
  priority: string;
  adminNotes: string;
  attachments: {
    id: string;
    name: string;
    type: "pdf" | "zip";
    size: string;
  }[];
};
