import type { EditFarmerProfileForm } from "@/components/farmer/profile/edit/edit-profile.types";
import { apiRequest } from "@/lib/api";
import { updateStoredUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/types/auth";

type ApiFarmerProfileResponse = {
  farmer?: Record<string, unknown>;
  profile?: Record<string, unknown>;
  data?: Record<string, unknown>;
  user?: AuthUser;
  message?: string;
};

function appendOptional(formData: FormData, key: string, value: string | number | File | undefined) {
  if (value === undefined || value === "") {
    return;
  }

  formData.append(key, value instanceof File ? value : String(value));
}

export function mapEditProfileFormToApi(form: EditFarmerProfileForm) {
  const formData = new FormData();
  const farmSize = Number(form.farmSizeAcres);

  appendOptional(formData, "fullName", form.fullName.trim());
  appendOptional(formData, "phone", form.phone.trim());
  appendOptional(formData, "farmName", form.farmName.trim());
  appendOptional(formData, "bio", form.bio.trim());
  appendOptional(formData, "region", form.location);

  if (Number.isFinite(farmSize) && farmSize > 0) {
    appendOptional(formData, "farmSize", farmSize);
  }

  form.specialties.forEach((specialty) => formData.append("cropTypes", specialty));
  appendOptional(formData, "profileImage", form.profilePhoto);
  appendOptional(formData, "coverImage", form.coverImage);

  // Swagger does not document email, certifications, or business license on PUT /farmer/profile.
  return formData;
}

function asRecord(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function syncStoredUserFromFarmerProfile(response: ApiFarmerProfileResponse, fallbackForm: EditFarmerProfileForm) {
  const record = asRecord(response.user ?? response.farmer ?? response.profile ?? response.data ?? response);

  updateStoredUser({
    name: getString(record.fullName ?? record.name) ?? fallbackForm.fullName.trim(),
    fullName: getString(record.fullName ?? record.name) ?? fallbackForm.fullName.trim(),
    email: getString(record.email) ?? fallbackForm.email.trim(),
    farmName: getString(record.farmName) ?? fallbackForm.farmName.trim(),
    phone: getString(record.phone) ?? fallbackForm.phone.trim(),
    region: getString(record.region) ?? fallbackForm.location,
    avatar: getString(record.profileImage ?? record.avatar ?? record.avatarUrl),
    avatarUrl: getString(record.avatarUrl ?? record.profileImage ?? record.avatar),
    coverImage: getString(record.coverImage),
  });
}

export async function updateFarmerProfile(form: EditFarmerProfileForm) {
  const response = await apiRequest<ApiFarmerProfileResponse>("/farmer/profile", {
    auth: true,
    body: mapEditProfileFormToApi(form),
    method: "PUT",
  });

  syncStoredUserFromFarmerProfile(response, form);

  return response;
}
