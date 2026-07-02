import type { AuthResponse, AuthUser } from "@/types/auth";

const ACCESS_TOKEN_KEY = "agribridge_access_token";
const REFRESH_TOKEN_KEY = "agribridge_refresh_token";
const USER_KEY = "agribridge_user";
const ROLE_KEY = "agribridge_role";

function getResponseUser(response: AuthResponse): AuthUser | undefined {
  return response.user ?? response.data?.user;
}

function getResponseRole(response: AuthResponse) {
  return response.role ?? response.data?.role ?? getResponseUser(response)?.role;
}

function getStringField(source: Record<string, unknown> | undefined, key: string) {
  const value = source?.[key];

  return typeof value === "string" && value.trim() ? value.trim() : undefined;
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

  // TODO: Replace localStorage token handling with secure httpOnly cookie/session strategy later.
  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  if (user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  if (role) {
    window.localStorage.setItem(ROLE_KEY, role);
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
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(ROLE_KEY);
}
