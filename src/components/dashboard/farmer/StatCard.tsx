import { DollarSign, FileText, Handshake, Layers } from "lucide-react";

const icons = {
  listing: Layers,
  rfq: FileText,
  deal: Handshake,
  revenue: DollarSign,
};

type StatCardProps = {
  stat: {
    label: string;
    value: string;
    suffix?: string;
    note: string;
    tone: string;
    icon: string;
  };
};

export function StatCard({ stat }: StatCardProps) {
  const Icon = icons[stat.icon as keyof typeof icons] ?? Layers;

  return (
    <article className="flex min-h-[104px] items-center gap-3.5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:bg-emerald-50/30 hover:shadow-md">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="size-[18px]" fill={stat.icon === "rfq" ? "currentColor" : "none"} strokeWidth={2.1} />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-slate-500">{stat.label}</p>
        <p className="mt-1 text-xl font-black leading-none text-slate-900">
          {stat.value}
          {stat.suffix ? <span className="ml-1 align-middle text-[10px] font-bold text-slate-400">{stat.suffix}</span> : null}
        </p>
        <p className={stat.tone === "positive" ? "mt-1 text-xs font-bold text-emerald-700" : "mt-1 text-xs font-medium text-slate-400"}>
          {stat.note}
        </p>
      </div>
    </article>
  );
}
