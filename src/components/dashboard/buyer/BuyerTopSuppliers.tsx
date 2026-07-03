import Link from "next/link";
import { Star } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import type { BuyerSupplier } from "@/components/dashboard/buyer/buyer-dashboard.types";

type BuyerTopSuppliersProps = {
  suppliers: BuyerSupplier[];
};

export function BuyerTopSuppliers({ suppliers }: BuyerTopSuppliersProps) {
  return (
    <DashboardCard className="p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-slate-900">Top Suppliers</h2>
        <Link className="text-xs font-black text-emerald-700 hover:text-emerald-900" href="/marketplace">
          All
        </Link>
      </div>

      <div className="mt-5 grid gap-4">
        {suppliers.map((supplier) => (
          <article className="flex items-center gap-3" key={supplier.name}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-xs font-black text-emerald-800">
              {supplier.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-slate-900">{supplier.name}</p>
              <p className="text-xs font-medium text-slate-500">{supplier.location}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-black text-slate-900">
              {supplier.rating}
              <Star className="size-3 fill-amber-400 text-amber-400" />
            </span>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}
