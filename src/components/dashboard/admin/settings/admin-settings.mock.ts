import { Bell, IdCard, KeyRound, Languages, Mail, Monitor, Smartphone, Trash2, User } from "lucide-react";

import type { AdminLanguage, AdminSession, AdminSettingsNavItem } from "@/components/dashboard/admin/settings/admin-settings.types";

export const adminSettingsNavItems: AdminSettingsNavItem[] = [
  { icon: User, id: "account-profile", label: "Account & Profile" },
  { icon: IdCard, id: "personal-information", label: "Personal Information" },
  { icon: Mail, id: "contact-info", label: "Contact Info" },
  { icon: KeyRound, id: "security-login", label: "Security & Login" },
  { icon: Languages, id: "language-region", label: "Language & Region" },
  { icon: Bell, id: "notification-preferences", label: "Notification Preferences" },
  { icon: Monitor, id: "active-sessions", label: "Active Sessions" },
  { icon: Smartphone, id: "connected-devices", label: "Connected Devices" },
  { danger: true, icon: Trash2, id: "delete-account", label: "Delete Account" },
];

export const adminProfileSettings = {
  bio: "Super Admin oversight for AgriBridge Pro. Responsible for platform stability, user governance, and revenue operations.",
  department: "Platform Management",
  displayName: "M. Al-Hassan",
  email: "admin@agribridge.com",
  fullName: "Mohammed Al-Hassan",
  id: "AB-ADMIN-1001",
  initials: "MA",
  jobTitle: "Platform Administrator",
  officeLocation: "Riyadh HQ, Saudi Arabia",
  phone: "+966 50 123 4567",
};

export const adminSessions: AdminSession[] = [
  { device: "MacBook Pro 16", icon: Monitor, id: "session-macbook", isCurrent: true, meta: "Riyadh, SA - Chrome" },
  { device: "iPhone 15 Pro", icon: Smartphone, id: "session-iphone", meta: "Riyadh, SA - App" },
];

export const adminLanguages: AdminLanguage[] = [
  { code: "EN", id: "english", label: "English (US)" },
  { code: "AR", id: "arabic", label: "Arabic (KSA)" },
];
