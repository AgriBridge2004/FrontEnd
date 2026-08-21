import type { UserRole } from "@/types";

export type RegisterUserRequest = {
  email: string;
  password: string;
  role: UserRole;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type ResendOtpRequest = {
  email: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type AuthUser = {
  id?: string;
  email?: string;
  fullName?: string;
  name?: string;
  farmName?: string;
  avatarUrl?: string;
  role?: UserRole | "quality-officer" | "officer";
  profileCompleted?: boolean;
  profile?: unknown;
  [key: string]: unknown;
};

export type AuthResponse = {
  message?: string;
  token?: string;
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
  resetToken?: string;
  reset_token?: string;
  user?: AuthUser;
  role?: UserRole | "quality-officer" | "officer";
  data?: {
    token?: string;
    accessToken?: string;
    access_token?: string;
    refreshToken?: string;
    refresh_token?: string;
    resetToken?: string;
    reset_token?: string;
    user?: AuthUser;
    role?: UserRole | "quality-officer" | "officer";
    [key: string]: unknown;
  };
  [key: string]: unknown;
};
