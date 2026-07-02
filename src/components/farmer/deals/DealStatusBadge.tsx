import { cn } from "@/lib/cn";
import type { FarmerDealStatus } from "@/lib/mock-data";

const statusStyles: Record<FarmerDealStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Pending: "bg-amber-50 text-amber-700 ring-amber-100",
  Completed: "bg-slate-100 text-slate-600 ring-slate-200",
  Disputed: "bg-red-50 text-red-600 ring-red-100",
  Cancelled: "bg-slate-100 text-slate-500 ring-slate-200",
};

type DealStatusBadgeProps = {
  status: FarmerDealStatus;
};

export function DealStatusBadge({ status }: DealStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1", statusStyles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
