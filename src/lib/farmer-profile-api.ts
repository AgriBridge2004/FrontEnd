import type { EditFarmerProfileForm } from "@/components/dashboard/farmer/profile/edit/edit-profile.types";
import { ApiError, apiRequest } from "@/lib/api";
import { getStoredUser, updateStoredUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/types/auth";
import type { FarmerProfile, FarmerProfilePayload } from "@/types/farmer";

export const CURRENT_FARMER_PROFILE_ENDPOINT = "/farmer/profile/me";
export const SWAGGER_FARMER_PROFILE_ENDPOINT = "/farmers/profile/me";

type ApiFarmerProfileResponse = {
  farmer?: Record<string, unknown>;
  profile?: Record<string, unknown>;
  data?: Record<string, unknown>;
  user?: AuthUser;
  message?: string;
};

type SaveFarmerProfileOptions = {
  context: "onboarding" | "settings";
};

function appendOptional(formData: FormData, key: string, value: string | number | File | undefined) {
  if (value === undefined || value === "") {
    return;
  }

  formData.append(key, value instanceof File ? value : String(value));
}

export function mapEditProfileFormToApiPayload(form: EditFarmerProfileForm): FarmerProfilePayload {
  const farmSize = Number(form.farmSizeAcres);
  const cropTypes = form.specialties.map((specialty) => specialty.trim()).filter(Boolean).join(", ");

  return {
    fullName: form.fullName.trim(),
    phone: form.phone.trim(),
    farmName: form.farmName.trim() || undefined,
    bio: form.bio.trim() || undefined,
    cropTypes: cropTypes || undefined,
    region: form.location || undefined,
    farmSize: Number.isFinite(farmSize) && farmSize > 0 ? farmSize : undefined,
    profileImage: form.profilePhoto,
    coverImage: form.coverImage,
  };
}

function mapFarmerProfilePayloadToFormData(payload: FarmerProfilePayload) {
  const formData = new FormData();

  appendOptional(formData, "fullName", payload.fullName);
  appendOptional(formData, "phone", payload.phone);
  appendOptional(formData, "farmName", payload.farmName);
  appendOptional(formData, "bio", payload.bio);
  appendOptional(formData, "cropTypes", payload.cropTypes);
  appendOptional(formData, "region", payload.region);
  appendOptional(formData, "farmSize", payload.farmSize);
  appendOptional(formData, "profileImage", payload.profileImage);
  appendOptional(formData, "coverImage", payload.coverImage);

  return formData;
}

function asRecord(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function unwrapFarmerProfileResponse(response: ApiFarmerProfileResponse) {
  return asRecord(response.farmer ?? response.profile ?? response.data ?? response.user ?? response);
}

function mapFarmerProfileFromApi(response: ApiFarmerProfileResponse): FarmerProfile {
  const record = unwrapFarmerProfileResponse(response);
  const user = asRecord(record.user);

  return {
    id: getString(record.id ?? record._id),
    userId: getString(record.userId ?? user.id),
    fullName: getString(record.fullName ?? record.name),
    phone: getString(record.phone),
    farmName: getString(record.farmName),
    bio: getString(record.bio),
    cropTypes: getString(record.cropTypes),
    region: getString(record.region ?? record.location),
    farmSize: getNumber(record.farmSize),
    profileImage: getString(record.profileImage ?? record.avatar ?? record.avatarUrl),
    coverImage: getString(record.coverImage),
    createdAt: getString(record.createdAt),
    updatedAt: getString(record.updatedAt),
  };
}

function debugFarmerProfileRequest(mode: "create" | "update", endpoint: string, payload: FarmerProfilePayload) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const sanitizedPayload = {
    ...payload,
    profileImage: payload.profileImage ? "[File]" : undefined,
    coverImage: payload.coverImage ? "[File]" : undefined,
  };

  console.log("[FarmerProfile] mode:", mode);
  console.log("[FarmerProfile] endpoint:", endpoint);
  console.log("[FarmerProfile] payload:", sanitizedPayload);
}

function isCloudinaryProfileImageError(error: unknown): error is ApiError {
  if (!(error instanceof ApiError)) {
    return false;
  }

  const message = error.message.toLowerCase();
  const details = asRecord(error.details);
  const detailMessage = String(details.message ?? details.error ?? "").toLowerCase();

  return (
    message.includes("profileimage") ||
    detailMessage.includes("profileimage") ||
    message.includes("must supply api_key") ||
    detailMessage.includes("must supply api_key") ||
    message.includes("cloudinary") ||
    detailMessage.includes("cloudinary")
  );
}

function getErrorText(error: unknown) {
  if (!(error instanceof ApiError)) {
    return "";
  }

  const details = asRecord(error.details);

  return [
    error.message,
    typeof details.message === "string" ? details.message : "",
    typeof details.error === "string" ? details.error : "",
  ]
    .join(" ")
    .toLowerCase();
}

export function isFarmerProfileEndpointUnavailableError(error: unknown) {
  if (!(error instanceof ApiError) || error.status !== 404) {
    return false;
  }

  const text = getErrorText(error);

  return (
    text.includes("cannot get /farmers/profile/me") ||
    text.includes("endpoint not found: /farmers/profile/me") ||
    text.includes("cannot get /farmer/profile/me") ||
    text.includes("endpoint not found: /farmer/profile/me")
  );
}

function isFarmerProfileNotFoundError(error: unknown) {
  if (!(error instanceof ApiError) || error.status !== 404) {
    return false;
  }

  return !isFarmerProfileEndpointUnavailableError(error);
}

function isDuplicateFarmerProfileError(error: unknown) {
  if (!(error instanceof ApiError) || (error.status !== 400 && error.status !== 409)) {
    return false;
  }

  const text = getErrorText(error);

  return text.includes("already has a farmer profile") || text.includes("farmer profile already exists");
}

function normalizeFarmerProfileError(error: unknown): never {
  if (isCloudinaryProfileImageError(error)) {
    throw new ApiError("Profile image upload failed. Please try again.", error.status, "PROFILE_IMAGE_UPLOAD_FAILED", error.details);
  }

  throw error;
}

function debugFarmerOnboarding(message: string, data?: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.log(message, data ?? "");
  }
}

function warnFarmerProfileEndpointMismatch(error: unknown) {
  if (process.env.NODE_ENV === "development" && isFarmerProfileEndpointUnavailableError(error)) {
    console.warn("[Farmer Profile] GET /farmers/profile/me failed. Check backend route or Swagger mismatch.");
  }
}

export function syncStoredUserFromFarmerProfile(response: ApiFarmerProfileResponse, fallbackForm: EditFarmerProfileForm) {
  const record = unwrapFarmerProfileResponse(response);
  const user = asRecord(record.user);
  const profileImage = getString(record.profileImage ?? record.avatar ?? record.avatarUrl);
  const coverImage = getString(record.coverImage);

  updateStoredUser({
    name: getString(record.fullName ?? record.name) ?? fallbackForm.fullName.trim(),
    fullName: getString(record.fullName ?? record.name) ?? fallbackForm.fullName.trim(),
    email: getString(record.email) ?? fallbackForm.email.trim(),
    farmName: getString(record.farmName) ?? fallbackForm.farmName.trim(),
    phone: getString(record.phone) ?? fallbackForm.phone.trim(),
    region: getString(record.region) ?? fallbackForm.location,
    location: getString(record.region ?? record.location) ?? fallbackForm.location,
    farmAddress: getString(record.farmAddress ?? record.address) ?? fallbackForm.farmAddress.trim(),
    serviceArea: getString(record.serviceArea ?? record.deliveryArea) ?? fallbackForm.serviceArea.trim(),
    bio: getString(record.bio) ?? fallbackForm.bio.trim(),
    specialties: fallbackForm.specialties,
    profile: {
      ...fallbackForm,
      id: getString(record.id ?? record._id),
      userId: getString(record.userId ?? user.id),
      fullName: getString(record.fullName ?? record.name) ?? fallbackForm.fullName.trim(),
      phone: getString(record.phone) ?? fallbackForm.phone.trim(),
      farmName: getString(record.farmName) ?? fallbackForm.farmName.trim(),
      bio: getString(record.bio) ?? fallbackForm.bio.trim(),
      region: getString(record.region ?? record.location) ?? fallbackForm.location,
      farmSize: getNumber(record.farmSize),
      cropTypes: getString(record.cropTypes) ?? fallbackForm.specialties.join(", "),
      profileImage,
      coverImage,
    },
    avatar: profileImage,
    avatarUrl: getString(record.avatarUrl ?? record.profileImage ?? record.avatar),
    coverImage,
    profileCompleted: true,
  });
}

export async function getFarmerProfile() {
  try {
    const response = await apiRequest<ApiFarmerProfileResponse>(CURRENT_FARMER_PROFILE_ENDPOINT, { auth: true });

    return mapFarmerProfileFromApi(response);
  } catch (error) {
    warnFarmerProfileEndpointMismatch(error);
    throw error;
  }
}

export async function createFarmerProfile(payload: FarmerProfilePayload) {
  const endpoint = "/farmer";
  debugFarmerProfileRequest("create", endpoint, payload);

  try {
    const response = await apiRequest<ApiFarmerProfileResponse>(endpoint, {
      auth: true,
      body: mapFarmerProfilePayloadToFormData(payload),
      method: "POST",
    });

    return response;
  } catch (error) {
    normalizeFarmerProfileError(error);
  }
}

export async function updateFarmerProfilePayload(payload: FarmerProfilePayload) {
  const endpoint = "/farmer/profile";
  debugFarmerProfileRequest("update", endpoint, payload);

  try {
    const response = await apiRequest<ApiFarmerProfileResponse>(endpoint, {
      auth: true,
      body: mapFarmerProfilePayloadToFormData(payload),
      method: "PUT",
    });

    return response;
  } catch (error) {
    normalizeFarmerProfileError(error);
  }
}

export async function updateFarmerProfile(form: EditFarmerProfileForm) {
  const response = await updateFarmerProfilePayload(mapEditProfileFormToApiPayload(form));

  syncStoredUserFromFarmerProfile(response, form);

  return response;
}

export async function saveFarmerProfile(form: EditFarmerProfileForm, options: SaveFarmerProfileOptions) {
  const payload = mapEditProfileFormToApiPayload(form);
  let shouldCreateProfile = options.context === "onboarding";

  if (options.context === "onboarding") {
    try {
      await getFarmerProfile();
      shouldCreateProfile = false;
    } catch (error) {
      if (isFarmerProfileNotFoundError(error) || isFarmerProfileEndpointUnavailableError(error)) {
        shouldCreateProfile = true;
      } else {
        throw error;
      }
    }
  }

  debugFarmerOnboarding("[Farmer Onboarding] profile mode:", shouldCreateProfile ? "create" : "update");
  debugFarmerOnboarding("[Farmer Onboarding] profile check endpoint:", CURRENT_FARMER_PROFILE_ENDPOINT);

  try {
    const response = shouldCreateProfile ? await createFarmerProfile(payload) : await updateFarmerProfilePayload(payload);
    debugFarmerOnboarding("[Farmer Onboarding] create/update profile response:", response);
    syncStoredUserFromFarmerProfile(response, form);

    return response;
  } catch (error) {
    if (options.context === "onboarding" && !shouldCreateProfile && isFarmerProfileNotFoundError(error)) {
      const response = await createFarmerProfile(payload);
      syncStoredUserFromFarmerProfile(response, form);

      return response;
    }

    if (options.context === "onboarding" && shouldCreateProfile && isDuplicateFarmerProfileError(error)) {
      try {
        const profile = await getFarmerProfile();
        const profileResponse: ApiFarmerProfileResponse = { farmer: { ...profile } };
        syncStoredUserFromFarmerProfile(profileResponse, form);

        return profileResponse;
      } catch (profileError) {
        warnFarmerProfileEndpointMismatch(profileError);
        syncStoredUserFromFarmerProfile({ farmer: { userId: getStoredUser()?.id } }, form);

        return { message: "Farmer profile already exists", farmer: { userId: getStoredUser()?.id } };
      }
    }

    throw error;
  }
}
