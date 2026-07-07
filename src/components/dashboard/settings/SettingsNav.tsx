"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

export type SharedSettingsNavItem = {
  danger?: boolean;
  icon: LucideIcon;
  id: string;
  label: string;
};

type SettingsNavProps = {
  activeSection: string;
  items: SharedSettingsNavItem[];
  onSectionChange: (sectionId: string) => void;
};

export function SettingsNav({ activeSection, items, onSectionChange }: SettingsNavProps) {
  return (
    <aside className="h-fit lg:sticky lg:top-24">
      <nav className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0">
        {items.map((item) => {
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
