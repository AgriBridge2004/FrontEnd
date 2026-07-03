import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type StatCardProps = {
  title: string;
  value: string | number;
  trend?: string;
  linkLabel?: string;
  icon: LucideIcon;
  tone?: "green" | "amber" | "red";
};

const toneClasses = {
  green: {
    icon: "bg-emerald-50 text-emerald-700",
    note: "text-emerald-700",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    note: "text-amber-600",
  },
  red: {
    icon: "bg-red-50 text-red-600",
    note: "text-red-600",
  },
};

export function StatCard({ icon: Icon, linkLabel, title, tone = "green", trend, value }: StatCardProps) {
  const classes = toneClasses[tone];

  return (
    <article className="min-h-[122px] rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-600">{title}</p>
          <p className="mt-1 text-3xl font-black leading-none text-slate-950">{value}</p>
        </div>
        <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", classes.icon)}>
          <Icon className="size-[17px]" strokeWidth={2.2} />
        </span>
      </div>

      {trend ? <p className={cn("mt-3 text-xs font-black", classes.note)}>{trend}</p> : null}
      {linkLabel ? (
        <button className={cn("mt-3 text-left text-xs font-black underline", classes.note)} type="button">
          {linkLabel}
        </button>
      ) : null}
    </article>
  );
}
