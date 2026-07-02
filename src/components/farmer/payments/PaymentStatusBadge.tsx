import type { PaymentStatus } from "@/components/farmer/payments/payments.mock";
import { cn } from "@/lib/cn";

const statusStyles: Record<PaymentStatus, string> = {
  "In Escrow": "bg-amber-50 text-amber-700",
  Released: "bg-emerald-50 text-emerald-700",
  Withdrawn: "bg-sky-50 text-sky-700",
  Refunded: "bg-slate-100 text-slate-600",
  Failed: "bg-red-50 text-red-600",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase", statusStyles[status])}>
      {status}
    </span>
  );
}
