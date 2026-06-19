import type { UserRole } from "@/types";

export const mockCurrentUserByRole: Record<UserRole, string> = {
  farmer: "farmer-1",
  buyer: "buyer-1",
  quality_officer: "officer-1",
  admin: "admin-1",
};

export function getProtectedRouteLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    farmer: "Farmer workspace",
    buyer: "Buyer workspace",
    quality_officer: "Quality officer workspace",
    admin: "Admin workspace",
  };

  return labels[role];
}
