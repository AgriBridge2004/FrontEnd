import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { DealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.types";

type DealHeaderProps = {
  deal: DealDetail;
  dealsHref?: string;
};

export function DealHeader({ deal, dealsHref = "/farmer/deals" }: DealHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
        <Link className="transition hover:text-emerald-800" href={dealsHref}>
          Deals
        </Link>
        <ChevronRight className="size-3" />
        <span>{deal.id}</span>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <h1 className="text-[24px] font-black tracking-tight text-slate-950 sm:text-[28px]">{deal.id}</h1>
        <p className="text-lg font-black text-slate-600 sm:text-xl">
          {deal.product} {deal.quantity.replace(" ", "")}
        </p>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
          <span className="size-1.5 rounded-full bg-current" />
          {deal.status}
        </span>
      </div>
    </header>
  );
}
