import type { EditFarmerProfileForm } from "@/components/dashboard/farmer/profile/edit/edit-profile.types";

export const locationOptions = ["Gaza", "North Gaza", "Khan Yunis", "Rafah", "Deir al-Balah"];

export const initialEditProfileForm: EditFarmerProfileForm = {
  fullName: "",
  farmName: "",
  email: "",
  phone: "",
  location: "",
  farmAddress: "",
  bio: "",
  farmSizeAcres: "",
  serviceArea: "",
  specialties: [],
  certifications: [],
};
