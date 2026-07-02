import { apiRequest } from "@/lib/api";
import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginUserRequest,
  RegisterUserRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "@/types/auth";

export function registerUser(payload: RegisterUserRequest) {
  return apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: payload,
    debug: {
      label: "register",
      body: {
        email: payload.email,
        role: payload.role,
      },
    },
  });
}

export function loginUser(payload: LoginUserRequest) {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function verifyOtp(payload: VerifyOtpRequest) {
  return apiRequest<AuthResponse>("/auth/verify-otp", {
    method: "POST",
    body: payload,
  });
}

export function resendOtp(payload: ResendOtpRequest) {
  return apiRequest<AuthResponse>("/auth/resend-otp", {
    method: "POST",
    body: payload,
  });
}

export function forgotPassword(payload: ForgotPasswordRequest) {
  return apiRequest<AuthResponse>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload: ResetPasswordRequest) {
  return apiRequest<AuthResponse>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
