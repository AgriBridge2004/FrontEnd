import { Eye } from "lucide-react";

import type { QualityReport } from "@/components/dashboard/quality-officer/quality-officer-dashboard.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import {
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type RecentSubmittedReportsProps = {
  onView: (report: QualityReport) => void;
  onViewAll: () => void;
  reports: QualityReport[];
};

const gradeClasses = {
  A: "bg-emerald-100 text-emerald-800",
  B: "bg-orange-100 text-orange-700",
  FAIL: "bg-red-100 text-red-700",
};

const statusClasses = {
  flagged: "bg-red-50 text-red-600",
  "pending-review": "bg-orange-50 text-orange-600",
  verified: "bg-emerald-50 text-emerald-700",
};

const statusLabels = {
  flagged: "Flagged",
  "pending-review": "Pending Review",
  verified: "Verified",
};

export function RecentSubmittedReports({ onView, onViewAll, reports }: RecentSubmittedReportsProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-black text-slate-950">Recent Submitted Reports</h2>
        <button className="text-xs font-black uppercase tracking-wide text-emerald-700 transition hover:text-emerald-900" onClick={onViewAll} type="button">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className={dashboardTableHeadClass}>
            <tr>
              <th className="px-6 py-4">Deal ID</th>
              <th className="px-5 py-3.5">Inspection Date</th>
              <th className="px-5 py-3.5">Product</th>
              <th className="px-5 py-3.5">Grade</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {reports.map((report) => (
              <tr className={dashboardTableRowClass} key={report.id}>
                <td className="px-5 py-3.5 font-black text-emerald-700">{report.dealId}</td>
                <td className="px-5 py-3.5 font-medium text-slate-500">{report.inspectionDate}</td>
                <td className="px-5 py-3.5 font-black text-slate-950">{report.product}</td>
                <td className="px-5 py-3.5">
                  <span className={cn("inline-flex min-w-8 justify-center rounded-lg px-2.5 py-1 text-[11px] font-black", gradeClasses[report.grade])}>
                    {report.grade}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={cn("inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase", statusClasses[report.status])}>
                    {statusLabels[report.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 transition hover:text-emerald-900" onClick={() => onView(report)} type="button">
                    <Eye className="size-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
