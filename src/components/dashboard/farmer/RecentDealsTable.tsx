import Link from "next/link";

import { cn } from "@/lib/cn";

type RecentDealsTableProps = {
  deals: Array<{
    id: string;
    buyer: string;
    product: string;
    quantity: string;
    amount: string;
    status: string;
  }>;
};

const statusClassNames: Record<string, string> = {
  "In Progress": "bg-amber-50 text-amber-700",
  Confirmed: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

export function RecentDealsTable({ deals }: RecentDealsTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-4 px-5 py-5">
        <h2 className="text-base font-black text-slate-900">Recent Deals</h2>
        <Link className="text-[13px] font-black text-emerald-700 hover:text-emerald-900" href="/farmer/deals">
          View all deals →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-emerald-50/30 text-[10px] font-black uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Deal ID</th>
              <th className="px-5 py-3.5">Buyer</th>
              <th className="px-5 py-3.5">Product</th>
              <th className="px-5 py-3.5">Quantity</th>
              <th className="px-5 py-3.5">Amount (SAR)</th>
              <th className="px-5 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td className="px-5 py-4 font-semibold text-slate-900">{deal.id}</td>
                <td className="px-5 py-4">{deal.buyer}</td>
                <td className="px-5 py-4">{deal.product}</td>
                <td className="px-5 py-4">{deal.quantity}</td>
                <td className="px-5 py-4 font-black text-slate-800">{deal.amount}</td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-black", statusClassNames[deal.status])}>
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
