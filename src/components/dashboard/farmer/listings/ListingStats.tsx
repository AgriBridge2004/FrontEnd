import { AlertTriangle, CheckCircle, Eye, FileText } from "lucide-react";

import { cn } from "@/lib/cn";

const statIcons = {
  total: FileText,
  active: CheckCircle,
  expiring: AlertTriangle,
  views: Eye,
};

const statIconStyles = {
  total: "bg-emerald-50 text-emerald-700",
  active: "bg-blue-50 text-blue-600",
  expiring: "bg-orange-50 text-orange-600",
  views: "bg-teal-50 text-teal-600",
};

type ListingStatsProps = {
  stats: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
};

export function ListingStats({ stats }: ListingStatsProps) {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = statIcons[stat.icon as keyof typeof statIcons] ?? FileText;
        const iconClassName = statIconStyles[stat.icon as keyof typeof statIconStyles] ?? statIconStyles.total;

        return (
          <article
            className="flex min-h-[92px] items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.label}
          >
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", iconClassName)}>
              <Icon className="size-5" strokeWidth={2.1} />
            </span>
            <div>
              <p className="text-[22px] font-black leading-none text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
