"use client";

import { ChevronRight, Mail } from "lucide-react";

import { BuyerSettingsCard } from "@/components/dashboard/buyer/settings/BuyerSettingsControls";

type BuyerNotificationDevicesSectionProps = {
  onOpenNotifications: () => void;
};

export function BuyerNotificationDevicesSection({ onOpenNotifications }: BuyerNotificationDevicesSectionProps) {
  return (
    <BuyerSettingsCard id="notification-devices" title="Notifications">
      <button
        className="flex w-full items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/30"
        onClick={onOpenNotifications}
        type="button"
      >
        <Mail className="size-5 shrink-0 text-slate-500" />
        <span className="min-w-0 flex-1">
          <span className="block font-black text-slate-900">Email & Push Notifications</span>
          <span className="block text-sm font-medium text-slate-600">Manage how you receive updates and alerts</span>
        </span>
        <ChevronRight className="size-5 text-slate-400" />
      </button>
    </BuyerSettingsCard>
  );
}
