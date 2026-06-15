import Link from "next/link";
import { DealStatusBadge } from "@/components/shared/DealStatusBadge";
import { ListingCard } from "@/components/shared/ListingCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { RFQCard } from "@/components/shared/RFQCard";
import { StatCard } from "@/components/shared/StatCard";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";
import { formatCurrency } from "@/lib/format";

export default async function BuyerDashboardPage() {
  const buyerId = mockCurrentUserByRole.buyer;
  const [listings, rfqs, deals] = await Promise.all([
    api.listings.list(),
    api.rfqs.listByBuyer(buyerId),
    api.deals.listByBuyer(buyerId),
  ]);
  const spend = deals.reduce((total, deal) => total + deal.totalValue, 0);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Buyer dashboard"
        title="Source verified agricultural supply"
        description="Browse listings, manage RFQs, and track deals with mock buyer data."
        actions={<Link className={buttonClasses("primary")} href="/buyer/rfqs/create">Create RFQ</Link>}
      />
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Open RFQs" value={`${rfqs.filter((rfq) => rfq.status === "open").length}`} helper="Active requests" />
        <StatCard label="Deals" value={`${deals.length}`} helper="In pipeline" />
        <StatCard label="Committed spend" value={formatCurrency(spend)} helper="Mock total" />
        <StatCard label="Available listings" value={`${listings.filter((listing) => listing.status === "active").length}`} helper="Marketplace supply" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-950">Recommended listings</h2>
            <Link className="text-sm font-semibold text-emerald-700" href="/buyer/browse-listings">Browse all</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {listings.slice(0, 2).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-950">Recent deal status</h2>
          <div className="grid gap-3">
            {deals.map((deal) => (
              <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm" key={deal.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-950">{deal.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{formatCurrency(deal.totalValue)}</p>
                  </div>
                  <DealStatusBadge status={deal.status} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-950">My RFQs</h2>
        <div className="grid gap-4">
          {rfqs.map((rfq) => (
            <RFQCard key={rfq.id} rfq={rfq} />
          ))}
        </div>
      </section>
    </div>
  );
}
