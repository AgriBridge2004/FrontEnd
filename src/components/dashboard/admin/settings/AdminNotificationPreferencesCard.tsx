"use client";

import { Bell } from "lucide-react";

import { SettingsSectionCard } from "@/components/dashboard/settings/SettingsControls";

type AdminNotificationPreferencesCardProps = {
  onOpenNotifications: () => void;
};

export function AdminNotificationPreferencesCard({ onOpenNotifications }: AdminNotificationPreferencesCardProps) {
  return (
    <SettingsSectionCard id="notification-preferences" title="Notification Preferences">
      <div className="flex flex-col gap-4 rounded-xl border border-emerald-100 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Bell className="size-5 shrink-0 text-emerald-700" />
          <div>
            <p className="font-black text-slate-900">Manage admin notification templates</p>
            <p className="text-sm font-medium text-slate-600">Notification preferences will be connected through the templates center.</p>
          </div>
        </div>
        <button className="h-9 rounded-lg border border-emerald-100 px-4 text-sm font-black text-slate-700 transition hover:bg-emerald-50/30" onClick={onOpenNotifications} type="button">
          Open Notifications
        </button>
      </div>
    </SettingsSectionCard>
  );
}
