import type { FarmerProfile } from "@/components/farmer/profile/profile.mock";
import type { AuthUser } from "@/types/auth";

export const DEFAULT_FARMER_AVATAR = "/images/farmer/profile/farmer-avatar.jpg";
export const DEFAULT_FARMER_COVER_IMAGE = "/images/farmer/profile/profile-cover.png";

type FarmerProfileLike = Partial<FarmerProfile> & Record<string, unknown>;

export function getFarmerDisplayName(user: AuthUser | null, profile?: FarmerProfileLike | null) {
  return (
    getStringField(profile, "fullName") ||
    getStringField(profile, "name") ||
    getStringField(user, "fullName") ||
    getStringField(user, "name") ||
    getEmailUsername(getStringField(user, "email")) ||
    "Farmer"
  );
}

export function getFarmerFarmName(user: AuthUser | null, profile?: FarmerProfileLike | null) {
  return (
    getStringField(profile, "farmName") ||
    getStringField(user, "farmName") ||
    getStringField(user, "farm") ||
    getStringField(user, "businessName") ||
    "Farm profile incomplete"
  );
}

export function getFarmerAvatarUrl(user: AuthUser | null, profile?: FarmerProfileLike | null) {
  return (
    getStringField(profile, "avatarUrl") ||
    getStringField(profile, "avatar") ||
    getStringField(user, "avatarUrl") ||
    getStringField(user, "avatar") ||
    getStringField(user, "profileImage") ||
    DEFAULT_FARMER_AVATAR
  );
}

export function getFarmerCoverImage(user: AuthUser | null, profile?: FarmerProfileLike | null) {
  return getStringField(profile, "coverImage") || getStringField(user, "coverImage") || DEFAULT_FARMER_COVER_IMAGE;
}

export function getFarmerEmail(user: AuthUser | null, profile?: FarmerProfileLike | null, fallback = "Email not provided") {
  return getStringField(profile, "email") || getStringField(user, "email") || fallback;
}

export function getFarmerLocation(user: AuthUser | null, profile?: FarmerProfileLike | null, fallback = "Location not provided") {
  return (
    getStringField(profile, "location") ||
    getStringField(profile, "region") ||
    getStringField(user, "region") ||
    getStringField(user, "location") ||
    fallback
  );
}

export function getFarmerPhone(user: AuthUser | null, profile?: FarmerProfileLike | null, fallback = "Phone not provided") {
  return getStringField(profile, "phone") || getStringField(user, "phone") || fallback;
}

export function getStringField(source: Record<string, unknown> | null | undefined, key: string) {
  const value = source?.[key];

  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function getEmailUsername(email: string) {
  if (!email) {
    return "";
  }

  const username = email.split("@")[0]?.trim();

  return username || "";
}
