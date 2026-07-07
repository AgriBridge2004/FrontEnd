export type AddNewUserAccountType = "Farmer / Producer" | "Buyer" | "Quality Officer" | "Admin";

export type AddNewUserMarketSegment =
  | "Industrial Grains"
  | "Fresh Produce"
  | "Dairy & Eggs"
  | "Oils & Pulses"
  | "Logistics"
  | "Quality Assurance";

export type AddNewUserFormState = {
  accountType: AddNewUserAccountType;
  apiAccessKeys: boolean;
  documentName: string;
  email: string;
  fullName: string;
  marketSegment: AddNewUserMarketSegment;
  phone: string;
  temporaryPassword: string;
  twoFactorEnabled: boolean;
};

export type AddNewUserValidationErrors = Partial<Record<"accountType" | "documentName" | "email" | "fullName" | "marketSegment" | "phone", string>>;
