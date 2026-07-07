"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type AdminAddNewUserHeaderProps = {
  onCreate: () => void;
  onDiscard: () => void;
};

export function AdminAddNewUserHeader({ onCreate, onDiscard }: AdminAddNewUserHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-slate-600">
          <Link className="transition-colors hover:text-emerald-700" href="/admin/users">
            User Management
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="font-black text-slate-950">Add New User</span>
        </div>
        <h1 className="text-xl font-black text-slate-950">Onboard New Participant</h1>
        <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
          Initialize a new secure account within the AgriBridge Pro ecosystem. Ensure all identification documents are valid before proceeding.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="h-11 rounded-lg border border-emerald-800/20 bg-white px-6 text-sm font-black text-emerald-900 transition hover:bg-emerald-50/30" onClick={onDiscard} type="button">
          Discard Draft
        </button>
        <button className="h-11 rounded-lg bg-emerald-900 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-950" onClick={onCreate} type="button">
          Create User
        </button>
      </div>
    </header>
  );
}
