import { ApiError } from "@/lib/api";
import { getStoredUser, updateStoredUser } from "@/lib/auth-storage";
import { getBuyerProfileByUserId, syncStoredUserFromBuyerProfile } from "@/lib/buyer-api";
import { getFarmerProfile } from "@/lib/farmer-profile-api";
import { getDashboardPathByRole, normalizeRole, ONBOARDING_PROFILE_PATH } from "@/lib/profile-completion";
import type { AuthUser } from "@/types/auth";

export type ProfileCompletionStatus = {
  isComplete: boolean;
  redirectPath: string;
};

function getUserId(user: AuthUser | null | undefined) {
  const candidate = user?.id ?? user?._id ?? user?.userId;
  return typeof candidate === "string" && candidate.trim() ? candidate.trim() : undefined;
}

function isNotFound(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

function syncFarmerProfileToUser(profile: Awaited<ReturnType<typeof getFarmerProfile>>, user?: AuthUser | null) {
  updateStoredUser({
    avatar: profile.profileImage,
    avatarUrl: profile.profileImage,
    farmName: profile.farmName ?? user?.farmName,
    fullName: profile.fullName ?? user?.fullName,
    location: profile.region,
    name: profile.fullName ?? user?.name,
    phone: profile.phone ?? user?.phone,
    profile,
    profileCompleted: true,
  });
}

export async function resolveProfileCompletionStatus(user: AuthUser | null | undefined = getStoredUser()): Promise<ProfileCompletionStatus> {
  const role = normalizeRole(user?.role);
  const dashboardPath = getDashboardPathByRole(role);

  if (role !== "farmer" && role !== "buyer") {
    return { isComplete: true, redirectPath: dashboardPath };
  }

  if (role === "farmer") {
    try {
      const profile = await getFarmerProfile();
      syncFarmerProfileToUser(profile, user);
      return { isComplete: true, redirectPath: dashboardPath };
    } catch (error) {
      if (isNotFound(error)) {
        updateStoredUser({ profileCompleted: false });
        return { isComplete: false, redirectPath: ONBOARDING_PROFILE_PATH };
      }
      throw error;
    }
  }

  const userId = getUserId(user);
  if (!userId) {
    updateStoredUser({ profileCompleted: false });
    return { isComplete: false, redirectPath: ONBOARDING_PROFILE_PATH };
  }

  try {
    const profile = await getBuyerProfileByUserId(userId);
    syncStoredUserFromBuyerProfile({ buyer: profile }, user);
    return { isComplete: true, redirectPath: dashboardPath };
  } catch (error) {
    if (isNotFound(error)) {
      updateStoredUser({ profileCompleted: false });
      return { isComplete: false, redirectPath: ONBOARDING_PROFILE_PATH };
    }
    throw error;
  }
}

export function getRoleProfileHref(role: string | null | undefined) {
  switch (normalizeRole(role)) {
    case "farmer":
      return "/farmer/profile";
    case "buyer":
      return "/buyer/profile";
    case "quality_officer":
      return "/quality-officer/settings";
    case "admin":
      return "/admin/settings";
    default:
      return "/auth/login";
  }
}
