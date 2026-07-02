import type { EditFarmerProfileForm } from "@/components/farmer/profile/edit/edit-profile.types";

export const locationOptions = ["Gaza", "North Gaza", "Khan Yunis", "Rafah", "Deir al-Balah"];

export const initialEditProfileForm: EditFarmerProfileForm = {
  fullName: "Ahmad Al-Masri",
  farmName: "Al-Masri Farm",
  email: "ahmad@almasrifarm.com",
  phone: "+970 59 123 4567",
  location: "Gaza",
  bio: "Third-generation farmer passionate about sustainable agriculture. We grow healthy crops and support our local community.",
  farmSizeAcres: "25",
  specialties: ["Tomatoes", "Olives", "Wheat", "Potatoes"],
  certifications: [],
};
