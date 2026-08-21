import { AlertTriangle, CheckCircle2, CircleX, Clock, Inbox, MessageCircle, XCircle, type LucideIcon } from "lucide-react";

import { adminRFQStats } from "@/components/dashboard/admin/rfqs/admin-rfqs.mock";
import { cn } from "@/lib/cn";

const icons: Record<(typeof adminRFQStats)[number]["label"], LucideIcon> = {
  "Converted to Deal": CheckCircle2,
  Expired: CircleX,
  "Flagged for Review": AlertTriangle,
  "Pending Farmer Response": Clock,
  Quoted: MessageCircle,
  Rejected: XCircle,
  "Total RFQs": Inbox,
};

const tones = {
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-600",
  rose: "bg-red-50 text-red-600",
  sky: "bg-sky-50 text-sky-600",
  slate: "bg-slate-100 text-slate-500",
};

export function AdminRFQsStats() {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {adminRFQStats.map((stat) => {
        const Icon = icons[stat.label];

        return (
          <div
            className="flex min-h-[88px] items-center gap-3 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.label}
          >
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", tones[stat.tone])}>
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-black leading-tight text-slate-950">{stat.value}</p>
              <p className="text-[11px] font-semibold leading-4 text-slate-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
