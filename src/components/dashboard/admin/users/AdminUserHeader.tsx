"use client";

import { RefreshCw, UserPlus } from "lucide-react";

type AdminUserHeaderProps = {
  onAddUser: () => void;
  onRefreshLiveUpdates: () => void;
};

export function AdminUserHeader({ onAddUser, onRefreshLiveUpdates }: AdminUserHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-black leading-tight tracking-tight text-slate-950">User Management</h1>
        <p className="mt-1 text-[13px] font-medium leading-5 text-slate-500">
          Oversee ecosystem participants and credentials.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 text-[12px] font-bold text-slate-500 transition hover:bg-emerald-50/30"
          onClick={onRefreshLiveUpdates}
          type="button"
        >
          <span className="size-2 rounded-full bg-emerald-500" />
          Live Updates Enabled
          <RefreshCw className="size-3.5" />
        </button>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-800 px-4 text-[13px] font-black text-white shadow-lg shadow-emerald-800/20 transition hover:bg-emerald-900"
          onClick={onAddUser}
          type="button"
        >
          <UserPlus className="size-4" />
          Add New User
        </button>
      </div>
    </header>
  );
}
