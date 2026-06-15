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

export default async function FarmerDashboardPage() {
  const farmerId = mockCurrentUserByRole.farmer;
  const [listings, rfqs, deals] = await Promise.all([
    api.listings.listByFarmer(farmerId),
    api.rfqs.list(),
    api.deals.listByFarmer(farmerId),
  ]);
  const activeListings = listings.filter((listing) => listing.status === "active");
  const escrowValue = deals.reduce((total, deal) => total + deal.totalValue, 0);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Farmer dashboard"
        title="Manage supply and buyer demand"
        description="Track live listings, open RFQs, and deal progress from a mock farmer session."
        actions={<Link className={buttonClasses("primary")} href="/farmer/listings/create">Create listing</Link>}
      />
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active listings" value={`${activeListings.length}`} helper="Published supply" />
        <StatCard label="Open RFQs" value={`${rfqs.filter((rfq) => rfq.status === "open").length}`} helper="Buyer requests" />
        <StatCard label="Deals" value={`${deals.length}`} helper="All statuses" />
        <StatCard label="Deal value" value={formatCurrency(escrowValue)} helper="Mock total" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-950">My recent listings</h2>
            <Link className="text-sm font-semibold text-emerald-700" href="/farmer/listings">View all</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {listings.slice(0, 2).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-950">Deal pipeline</h2>
            <Link className="text-sm font-semibold text-emerald-700" href="/farmer/deals">Open deals</Link>
          </div>
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
        <h2 className="mb-4 text-lg font-semibold text-slate-950">Open buyer RFQs</h2>
        <div className="grid gap-4">
          {rfqs.slice(0, 2).map((rfq) => (
            <RFQCard key={rfq.id} rfq={rfq} />
          ))}
        </div>
      </section>
    </div>
  );
}
