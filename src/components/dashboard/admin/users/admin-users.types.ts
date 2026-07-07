export type AdminUserRole = "farmer" | "buyer" | "quality-officer" | "admin";

export type AdminUserStatus = "active" | "pending-verification" | "suspended" | "disabled";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  initials?: string;
  avatar?: string;
  role: AdminUserRole;
  registrationDate: string;
  status: AdminUserStatus;
  activityLabel: string;
  activityScore: number;
  memberSince?: string;
  idNumber?: string;
  profileSubtitle?: string;
  fullLegalName?: string;
  licenseIdentity?: string;
  dateOfBirth?: string;
  primarySpecialization?: string;
  nationality?: string;
  yearsExperience?: string;
  affiliatedOrganization?: string;
  contactNumber?: string;
  verifiedLocation?: string;
};

export type AdminUserRoleFilter = "all" | AdminUserRole;
export type AdminUserStatusFilter = "all" | AdminUserStatus;
