"use client";

import { CreditCard, Globe, Lock, Mail, Map, Monitor, Trash2, User } from "lucide-react";

import { cn } from "@/lib/cn";

export const qualityOfficerSettingsSectionIds = [
  "account-profile",
  "contact-info",
  "security-login",
  "language-region",
  "payment-payout",
  "coverage-area",
  "connected-devices",
  "delete-account",
];

const navItems = [
  { id: "account-profile", label: "Account & Profile", icon: User },
  { id: "contact-info", label: "Contact Info", icon: Mail },
  { id: "security-login", label: "Security & Login", icon: Lock },
  { id: "language-region", label: "Language & Region", icon: Globe },
  { id: "payment-payout", label: "Payment & Payout", icon: CreditCard },
  { id: "coverage-area", label: "Coverage Area", icon: Map },
  { id: "connected-devices", label: "Connected Devices", icon: Monitor },
  { id: "delete-account", label: "Delete Account", icon: Trash2, danger: true },
];

type QualityOfficerSettingsNavProps = {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
};

export function QualityOfficerSettingsNav({ activeSection, onSectionChange }: QualityOfficerSettingsNavProps) {
  return (
    <aside className="h-fit lg:sticky lg:top-24">
      <nav className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              className={cn(
                "inline-flex min-w-fit items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition lg:w-full",
                item.danger
                  ? isActive
                    ? "bg-red-50 text-red-700"
                    : "text-red-600 hover:bg-red-50"
                  : isActive
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800",
              )}
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              type="button"
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
