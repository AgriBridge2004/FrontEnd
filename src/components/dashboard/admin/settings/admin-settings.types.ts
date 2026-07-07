import type { LucideIcon } from "lucide-react";

export type AdminSettingsNavItem = {
  id: string;
  icon: LucideIcon;
  danger?: boolean;
  label: string;
};

export type AdminSession = {
  id: string;
  device: string;
  icon: LucideIcon;
  isCurrent?: boolean;
  meta: string;
};

export type AdminLanguage = {
  code: "EN" | "AR";
  id: "english" | "arabic";
  label: string;
};
