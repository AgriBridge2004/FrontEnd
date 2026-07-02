import { cn } from "@/lib/cn";
import type { FarmerListingStatus } from "@/components/farmer/listings/listings-types";

const statusStyles: Record<FarmerListingStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Expired: "bg-slate-100 text-slate-500 ring-slate-200",
  Draft: "bg-amber-50 text-amber-700 ring-amber-100",
};

type ListingStatusBadgeProps = {
  status: FarmerListingStatus;
};

export function ListingStatusBadge({ status }: ListingStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ring-1", statusStyles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
