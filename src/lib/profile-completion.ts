import type { UserRole } from "@/types";
import type { AuthResponse, AuthUser } from "@/types/auth";

export const ONBOARDING_PROFILE_PATH = "/onboarding/profile";

export type AuthRole = UserRole | "quality-officer" | "officer";

export function normalizeRole(role: AuthRole | string | null | undefined): UserRole | null {
  if (role === "farmer" || role === "buyer" || role === "admin") {
    return role;
  }

  if (role === "quality_officer" || role === "quality-officer" || role === "officer") {
    return "quality_officer";
  }

  return null;
}

export function getDashboardPathByRole(role: AuthRole | string | null | undefined) {
  switch (normalizeRole(role)) {
    case "farmer":
      return "/farmer/dashboard";
    case "buyer":
      return "/buyer/dashboard";
    case "quality_officer":
      return "/quality-officer/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}

export function shouldCompleteProfile(user: AuthUser | null | undefined) {
  const role = normalizeRole(user?.role);

  return (role === "farmer" || role === "buyer") && user?.profileCompleted !== true;
}

export function getResponseUser(response: AuthResponse): AuthUser | undefined {
  return response.user ?? response.data?.user;
}

export function getResponseRole(response: AuthResponse) {
  return response.role ?? response.data?.role ?? getResponseUser(response)?.role;
}

export function getPostLoginRedirectPath(user: AuthUser | null | undefined) {
  return shouldCompleteProfile(user) ? ONBOARDING_PROFILE_PATH : getDashboardPathByRole(user?.role);
}
