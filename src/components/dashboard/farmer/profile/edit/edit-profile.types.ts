export type EditFarmerProfileForm = {
  fullName: string;
  farmName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  farmSizeAcres: string;
  specialties: string[];
  profilePhoto?: File;
  coverImage?: File;
  certifications: File[];
  businessLicense?: File;
};

export type EditProfileErrors = Partial<Record<keyof EditFarmerProfileForm, string>>;
