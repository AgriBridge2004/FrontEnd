export type AssignmentStatus = "pending" | "in-progress" | "completed" | "overdue";

export type AssignmentTab = "all" | AssignmentStatus;

export type QualityOfficerAssignment = {
  id: string;
  dealId: string;
  productName: string;
  category: string;
  productImage?: string;
  farmName: string;
  location: string;
  buyer: string;
  requiredDate: string;
  requiredTime: string;
  urgencyLabel?: string;
  assignedDate: string;
  assignedTime: string;
  status: AssignmentStatus;
};

export type AssignmentTimeFilter = "all" | "today" | "this-week" | "this-month" | "overdue-only";
