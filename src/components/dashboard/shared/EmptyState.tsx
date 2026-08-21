import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export function EmptyState({ description, icon: Icon, title }: EmptyStateProps) {
  return (
    <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
      <div>
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <Icon className="size-5" />
        </span>
        <p className="mt-3 text-sm font-black text-slate-900">{title}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
      </div>
    </div>
  );
}
