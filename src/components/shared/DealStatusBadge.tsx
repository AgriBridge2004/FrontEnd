import { StatusBadge } from "@/components/shared/StatusBadge";
import type { DealStatus } from "@/types";

type DealStatusBadgeProps = {
  status: DealStatus;
};

export function DealStatusBadge({ status }: DealStatusBadgeProps) {
  const toneByStatus: Record<DealStatus, "slate" | "emerald" | "amber" | "rose" | "sky"> = {
    draft: "slate",
    awaiting_inspection: "amber",
    inspection_scheduled: "sky",
    awaiting_payment: "amber",
    escrow_funded: "emerald",
    in_delivery: "sky",
    completed: "emerald",
    disputed: "rose",
    cancelled: "slate",
  };

  return <StatusBadge label={status} tone={toneByStatus[status]} />;
}
