import type { AuthResponse, AuthUser } from "@/types/auth";
import { getResponseRole, getResponseUser } from "@/lib/profile-completion";

const ACCESS_TOKEN_KEY = "agribridge_access_token";
const REFRESH_TOKEN_KEY = "agribridge_refresh_token";
const USER_KEY = "agribridge_user";
const ROLE_KEY = "agribridge_role";
const PENDING_REGISTRATION_PROFILE_KEY = "agribridge_pending_registration_profile";
const AUTH_LOCAL_STORAGE_KEYS = [
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_KEY,
  ROLE_KEY,
  PENDING_REGISTRATION_PROFILE_KEY,
  "agribridge:auth-token",
  "agribridge:access-token",
  "agribridge:token",
  "agribridge:user",
  "accessToken",
  "token",
  "user",
];
const AUTH_SESSION_STORAGE_KEYS = [
  "agriBridgeDevOtp",
  "agriBridgeOtpEmail",
  "agribridge:dev-otp",
];
const AUTH_COOKIE_KEYS = [
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  "accessToken",
  "refreshToken",
  "token",
];

type PendingRegistrationProfile = Pick<AuthUser, "email" | "fullName" | "name" | "phone" | "role">;
type LogoutRouter = {
  replace: (href: string) => void;
};

const AUTH_CHANGED_EVENT = "agribridge:auth-changed";

function emitAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
}

export function subscribeToAuthChanges(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener(AUTH_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getStringField(source: Record<string, unknown> | undefined, key: string) {
  const value = source?.[key];

  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getBooleanField(source: Record<string, unknown> | undefined, key: string) {
  const value = source?.[key];

  return typeof value === "boolean" ? value : undefined;
}

function normalizeAuthUser(response: AuthResponse): AuthUser | undefined {
  const responseUser = getResponseUser(response) ?? {};
  const email = getStringField(responseUser, "email") ?? getStringField(response, "email") ?? getStringField(response.data, "email");
  const role = getResponseRole(response);
  const user: AuthUser = {
    ...responseUser,
    email,
    role,
  };
  const profileCompleted =
    getBooleanField(responseUser, "profileCompleted") ??
    getBooleanField(responseUser, "isProfileComplete") ??
    getBooleanField(responseUser, "profile_completed") ??
    getBooleanField(responseUser, "onboardingCompleted") ??
    getBooleanField(responseUser, "hasCompletedProfile") ??
    getBooleanField(response, "profileCompleted") ??
    getBooleanField(response.data, "profileCompleted");

  if (profileCompleted !== undefined) {
    user.profileCompleted = profileCompleted;
  }

  delete user.password;

  if (!Object.values(user).some((value) => value !== undefined && value !== "")) {
    return undefined;
  }

  return user;
}

export function storeAuthSession(response: AuthResponse) {
  if (typeof window === "undefined") {
    return;
  }

  const accessToken = response.accessToken ?? response.access_token ?? response.token ?? response.data?.accessToken ?? response.data?.access_token ?? response.data?.token;
  const refreshToken = response.refreshToken ?? response.refresh_token ?? response.data?.refreshToken ?? response.data?.refresh_token;
  const user = normalizeAuthUser(response);
  const role = getResponseRole(response);
  const pendingRegistrationProfile = getPendingRegistrationProfile();

  // TODO: Replace localStorage token handling with secure httpOnly cookie/session strategy later.
  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  if (user) {
    const shouldMergePendingProfile =
      pendingRegistrationProfile?.email &&
      user.email &&
      pendingRegistrationProfile.email.toLowerCase() === user.email.toLowerCase();
    const nextUser = shouldMergePendingProfile
      ? {
          ...pendingRegistrationProfile,
          ...user,
          fullName: user.fullName ?? pendingRegistrationProfile.fullName,
          name: user.name ?? pendingRegistrationProfile.name,
          phone: user.phone ?? pendingRegistrationProfile.phone,
          role: user.role ?? pendingRegistrationProfile.role,
        }
      : user;

    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    if (shouldMergePendingProfile) {
      window.localStorage.removeItem(PENDING_REGISTRATION_PROFILE_KEY);
    }
  }

  if (role) {
    window.localStorage.setItem(ROLE_KEY, role);
  }

  emitAuthChanged();
}

export function storePendingRegistrationProfile(profile: PendingRegistrationProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PENDING_REGISTRATION_PROFILE_KEY, JSON.stringify(profile));
}

export function getPendingRegistrationProfile(): PendingRegistrationProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const profile = window.localStorage.getItem(PENDING_REGISTRATION_PROFILE_KEY);

  if (!profile) {
    return null;
  }

  try {
    return JSON.parse(profile) as PendingRegistrationProfile;
  } catch {
    return null;
  }
}

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = window.localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredRole() {
  if (typeof window === "undefined") {
    return null;
  }

  return getStoredUser()?.role ?? window.localStorage.getItem(ROLE_KEY);
}

export function updateStoredUser(updates: Partial<AuthUser>) {
  if (typeof window === "undefined") {
    return;
  }

  const currentUser = getStoredUser() ?? {};
  const nextUser = { ...currentUser, ...updates };

  window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

  if (nextUser.role) {
    window.localStorage.setItem(ROLE_KEY, nextUser.role);
  }

  emitAuthChanged();
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  AUTH_LOCAL_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
  AUTH_SESSION_STORAGE_KEYS.forEach((key) => window.sessionStorage.removeItem(key));
  AUTH_COOKIE_KEYS.forEach((key) => {
    document.cookie = `${key}=; Max-Age=0; path=/`;
  });
  emitAuthChanged();
}

export function logoutAndRedirectHome(router?: LogoutRouter) {
  clearAuthSession();

  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname === "/") {
    return;
  }

  if (router) {
    router.replace("/");
    return;
  }

  window.location.replace("/");
}
