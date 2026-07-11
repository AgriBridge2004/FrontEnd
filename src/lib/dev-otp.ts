import type { AuthResponse } from "@/types/auth";

const DEV_OTP_STORAGE_KEY = "agriBridgeDevOtp";
const DEV_OTP_EMAIL_STORAGE_KEY = "agriBridgeOtpEmail";
const LEGACY_DEV_OTP_STORAGE_KEY = "agribridge:dev-otp";

export function shouldShowDevOtp() {
  return "true";
}

export function extractDevOtp(response: AuthResponse) {
  const data = asRecord(response.data);
  const user = asRecord(response.user);
  const message = asRecord(response.message);
  const responseRecord = asRecord(response.response);
  const result = asRecord(response.result);
  const value =
    response.otp ??
    data.otp ??
    responseRecord.otp ??
    result.otp ??
    user.otp ??
    message.otp ??
    response.devOtp ??
    data.devOtp ??
    responseRecord.devOtp ??
    result.devOtp ??
    response.verificationCode ??
    data.verificationCode ??
    responseRecord.verificationCode ??
    result.verificationCode ??
    response.code ??
    data.code ??
    responseRecord.code ??
    result.code;

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

export function storeDevOtp(email: string, otp: string) {
  if (!shouldShowDevOtp() || typeof window === "undefined") {
    return;
  }

  // TEMPORARY DEV ONLY:
  // Backend currently returns OTP in register response for local testing.
  // Do not expose this in production.
  window.sessionStorage.setItem(DEV_OTP_STORAGE_KEY, otp);
  window.sessionStorage.setItem(DEV_OTP_EMAIL_STORAGE_KEY, email);
  window.sessionStorage.removeItem(LEGACY_DEV_OTP_STORAGE_KEY);
}

export function readDevOtp(email?: string) {
  if (!shouldShowDevOtp() || typeof window === "undefined") {
    return "";
  }

  const storedOtp = window.sessionStorage.getItem(DEV_OTP_STORAGE_KEY);
  const storedEmail = window.sessionStorage.getItem(DEV_OTP_EMAIL_STORAGE_KEY);

  if (storedOtp) {
    return !email || !storedEmail || storedEmail === email ? storedOtp : "";
  }

  const storedValue = window.sessionStorage.getItem(LEGACY_DEV_OTP_STORAGE_KEY);

  if (!storedValue) {
    return "";
  }

  try {
    const parsed = JSON.parse(storedValue) as { email?: string; otp?: string };
    return (!email || parsed.email === email) && parsed.otp ? parsed.otp : "";
  } catch {
    return "";
  }
}

export function clearDevOtp() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(DEV_OTP_STORAGE_KEY);
    window.sessionStorage.removeItem(DEV_OTP_EMAIL_STORAGE_KEY);
    window.sessionStorage.removeItem(LEGACY_DEV_OTP_STORAGE_KEY);
  }
}
