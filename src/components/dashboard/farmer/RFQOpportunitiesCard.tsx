import Link from "next/link";
import { MapPin } from "lucide-react";

type RFQOpportunitiesCardProps = {
  opportunities: Array<{
    title: string;
    buyer: string;
    location: string;
    quantity: string;
    color: string;
  }>;
};

export function RFQOpportunitiesCard({ opportunities }: RFQOpportunitiesCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:bg-emerald-50/20 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="max-w-40 text-lg font-black leading-6 text-slate-900">Recent RFQ Opportunities</h2>
        <Link className="text-xs font-black leading-5 text-emerald-700 hover:text-emerald-900" href="/farmer/rfqs">
          View all RFQs →
        </Link>
      </div>

      <div className="mt-5 grid gap-3.5">
        {opportunities.map((item) => (
          <article className="flex items-center gap-3 rounded-xl border border-emerald-50 bg-emerald-50/20 p-3.5" key={item.title}>
            <span className={`size-9 shrink-0 rounded-full ${item.color}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-black leading-5 text-slate-900">{item.title}</p>
              <p className="text-[11px] font-medium text-slate-500">{item.buyer}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <MapPin className="size-3" fill="currentColor" />
                {item.location}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[9px] font-black uppercase text-slate-400">Qty Needed</p>
              <p className="text-[11px] font-black text-slate-800">{item.quantity}</p>
              <Link
                className="mt-2 inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-[11px] font-black text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800"
                href="/farmer/rfqs"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
