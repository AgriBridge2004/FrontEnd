import type { CommonDisputeReason } from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type CommonDisputeReasonsCardProps = {
  reasons: CommonDisputeReason[];
};

export function CommonDisputeReasonsCard({ reasons }: CommonDisputeReasonsCardProps) {
  return (
    <DashboardCard className="p-4">
      <h2 className="text-base font-black text-slate-950">Common Dispute Reasons</h2>

      <div className="mt-5 grid gap-4">
        {reasons.map((reason) => (
          <div key={reason.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-semibold text-slate-600">{reason.label}</span>
              <span className="text-[12px] font-black text-slate-900">{reason.percentage}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-800" style={{ width: `${reason.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
