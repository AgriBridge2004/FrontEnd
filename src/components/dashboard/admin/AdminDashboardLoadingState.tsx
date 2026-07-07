import { Loader2 } from "lucide-react";

export function AdminDashboardLoadingState() {
  return (
    <div className="mt-8 flex items-center justify-center gap-3 text-[13px] font-semibold text-slate-500">
      <Loader2 className="size-4 animate-spin text-emerald-700" />
      <div>
        <p className="font-black text-slate-700">Loading dashboard data</p>
        <p className="text-xs font-medium text-slate-400">This will just take a moment.</p>
      </div>
    </div>
  );
}
