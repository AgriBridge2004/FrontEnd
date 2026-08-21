import type { AdminUser } from "@/components/dashboard/admin/users/admin-users.types";

export const ADMIN_USERS_EXTRA_STORAGE_KEY = "agribridge_admin_users_extra";
export const ADMIN_USERS_TOAST_STORAGE_KEY = "agribridge_admin_users_toast";

export function loadExtraAdminUsers() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawUsers = window.localStorage.getItem(ADMIN_USERS_EXTRA_STORAGE_KEY);
    if (!rawUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(rawUsers);
    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers.filter(isAdminUser);
  } catch {
    return [];
  }
}

export function saveExtraAdminUser(user: AdminUser) {
  if (typeof window === "undefined") {
    return;
  }

  const existingUsers = loadExtraAdminUsers();
  const nextUsers = [user, ...existingUsers.filter((existingUser) => existingUser.id !== user.id && existingUser.email !== user.email)];
  window.localStorage.setItem(ADMIN_USERS_EXTRA_STORAGE_KEY, JSON.stringify(nextUsers));
}

export function takeAdminUsersToast() {
  if (typeof window === "undefined") {
    return "";
  }

  const message = window.localStorage.getItem(ADMIN_USERS_TOAST_STORAGE_KEY) ?? "";
  if (message) {
    window.localStorage.removeItem(ADMIN_USERS_TOAST_STORAGE_KEY);
  }

  return message;
}

export function setAdminUsersToast(message: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_USERS_TOAST_STORAGE_KEY, message);
}

function isAdminUser(value: unknown): value is AdminUser {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<AdminUser>;
  return Boolean(candidate.id && candidate.name && candidate.email && candidate.role && candidate.registrationDate && candidate.status);
}
