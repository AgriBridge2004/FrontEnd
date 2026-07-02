import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { DealStatusBadge } from "@/components/farmer/deals/DealStatusBadge";
import { EmptyDeals } from "@/components/farmer/deals/EmptyDeals";
import type { FarmerDeal } from "@/components/farmer/deals/deals-types";

type DealsTableProps = {
  deals: FarmerDeal[];
};

export function DealsTable({ deals }: DealsTableProps) {
  if (deals.length === 0) {
    return <EmptyDeals />;
  }

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4">Deal ID</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {deals.map((deal) => (
              <tr className="transition hover:bg-emerald-50/20" key={deal.id}>
                <td className="px-6 py-5 font-black leading-5 text-emerald-700">{deal.id}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-emerald-50">
                      <Image alt={`${deal.product} deal`} className="object-cover" fill sizes="40px" src={deal.image} />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-950">{deal.product}</p>
                      {deal.quantity ? <p className="text-sm font-medium text-slate-600">{deal.quantity}</p> : null}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 font-medium text-slate-600">{deal.buyer}</td>
                <td className="px-6 py-5">
                  <DealStatusBadge status={deal.status} />
                </td>
                <td className="px-6 py-5 font-black text-slate-950">{deal.amount}</td>
                <td className="px-6 py-5 font-medium text-slate-500">{deal.date}</td>
                <td className="px-6 py-5">
                  <Link
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                    href={`/farmer/deals/${deal.id}`}
                  >
                    View
                    <Eye className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
