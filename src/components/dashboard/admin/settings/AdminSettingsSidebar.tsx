"use client";

import type { AdminSettingsNavItem } from "@/components/dashboard/admin/settings/admin-settings.types";
import { SettingsNav } from "@/components/dashboard/settings/SettingsNav";

type AdminSettingsSidebarProps = {
  activeItemId: string;
  items: AdminSettingsNavItem[];
  onNavigate: (item: AdminSettingsNavItem) => void;
};

export function AdminSettingsSidebar({ activeItemId, items, onNavigate }: AdminSettingsSidebarProps) {
  return <SettingsNav activeSection={activeItemId} items={items} onSectionChange={(sectionId) => onNavigate(items.find((item) => item.id === sectionId) ?? items[0])} />;
}
