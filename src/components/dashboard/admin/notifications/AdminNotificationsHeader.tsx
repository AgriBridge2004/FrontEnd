"use client";

import { Plus } from "lucide-react";

type AdminNotificationsHeaderProps = {
  onNewTemplate: () => void;
};

export function AdminNotificationsHeader({ onNewTemplate }: AdminNotificationsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-950">Notifications Management</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Manage notification templates and view admin alerts.</p>
      </div>
      <button
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white shadow-sm shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/25"
        onClick={onNewTemplate}
        type="button"
      >
        <Plus className="size-4" />
        New Template
      </button>
    </div>
  );
}
