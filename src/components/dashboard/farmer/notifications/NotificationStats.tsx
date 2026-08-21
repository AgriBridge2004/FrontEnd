import { AlertCircle, Bell, CalendarCheck, CalendarDays } from "lucide-react";

import { cn } from "@/lib/cn";

type NotificationStatsProps = {
  unreadCount: number;
};

const stats = [
  { label: "Unread", value: "07", icon: Bell, tone: "green" },
  { label: "Action Required", value: "03", icon: AlertCircle, tone: "red" },
  { label: "New Today", value: "04", icon: CalendarCheck, tone: "green" },
  { label: "This Week", value: "18", icon: CalendarDays, tone: "slate" },
];

const toneStyles = {
  green: "bg-emerald-50 text-emerald-800",
  red: "bg-red-50 text-red-600",
  slate: "bg-slate-100 text-slate-600",
};

export function NotificationStats({ unreadCount }: NotificationStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const value = stat.label === "Unread" ? String(unreadCount).padStart(2, "0") : stat.value;

        return (
          <article
            className={cn(
              "flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md",
              stat.tone === "red"
                ? "border-emerald-100 hover:border-red-200 hover:bg-red-50/10"
                : "border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/30",
            )}
            key={stat.label}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">{stat.label}</p>
              <p className="mt-1 text-2xl font-black leading-none text-slate-950">{value}</p>
            </div>
            <span className={cn("grid size-10 place-items-center rounded-md", toneStyles[stat.tone as keyof typeof toneStyles])}>
              <Icon className="size-5" />
            </span>
          </article>
        );
      })}
    </section>
  );
}
