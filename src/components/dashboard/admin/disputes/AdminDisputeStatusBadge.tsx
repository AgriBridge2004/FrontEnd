import type { AdminDisputeStatus } from "@/components/dashboard/admin/disputes/admin-disputes.types";
import { cn } from "@/lib/cn";

export function AdminDisputeStatusBadge({ status }: { status: AdminDisputeStatus }) {
  const styles = {
    open: "bg-orange-50 text-orange-700 ring-orange-200",
    resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    "under-review": "bg-amber-50 text-amber-700 ring-amber-200",
  };
  const labels = {
    open: "OPEN",
    resolved: "RESOLVED",
    "under-review": "UNDER REVIEW",
  };

  return (
    <span className={cn("inline-flex rounded-md px-2 py-1 text-[10px] font-black ring-1", styles[status])}>
      {labels[status]}
    </span>
  );
}
