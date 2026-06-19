import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">{description}</p>
      {actionLabel && actionHref ? (
        <Link className={buttonClasses("primary") + " mt-5"} href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
