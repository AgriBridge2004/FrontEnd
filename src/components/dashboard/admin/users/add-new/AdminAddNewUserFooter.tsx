"use client";

import { ArrowRight, RotateCcw } from "lucide-react";

type AdminAddNewUserFooterProps = {
  onCancel: () => void;
  onCreate: () => void;
};

export function AdminAddNewUserFooter({ onCancel, onCreate }: AdminAddNewUserFooterProps) {
  return (
    <footer className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <RotateCcw className="size-4" />
        Draft saved 2 minutes ago
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="h-11 rounded-lg px-5 text-sm font-black text-slate-700 transition hover:bg-emerald-50/30" onClick={onCancel} type="button">
          Cancel & Return
        </button>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-950" onClick={onCreate} type="button">
          Finalize & Create User
          <ArrowRight className="size-4" />
        </button>
      </div>
    </footer>
  );
}
