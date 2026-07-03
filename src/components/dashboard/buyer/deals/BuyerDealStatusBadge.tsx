import type { BuyerDealStatus } from "@/components/dashboard/buyer/deals/buyer-deals.types";
import { cn } from "@/lib/cn";

const statusLabels: Record<BuyerDealStatus, string> = {
  active: "Active",
  awaiting: "Awaiting",
  cancelled: "Cancelled",
  completed: "Completed",
  refunded: "Refunded",
};

const statusStyles: Record<BuyerDealStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  awaiting: "bg-amber-50 text-amber-700 ring-amber-100",
  cancelled: "bg-red-50 text-red-600 ring-red-100",
  completed: "bg-violet-50 text-violet-700 ring-violet-100",
  refunded: "bg-blue-50 text-blue-700 ring-blue-100",
};

type BuyerDealStatusBadgeProps = {
  status: BuyerDealStatus;
};

export function BuyerDealStatusBadge({ status }: BuyerDealStatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1", statusStyles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
