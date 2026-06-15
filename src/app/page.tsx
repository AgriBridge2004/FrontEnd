import Image from "next/image";
import Link from "next/link";
import { ListingCard } from "@/components/shared/ListingCard";
import { StatCard } from "@/components/shared/StatCard";
import { buttonClasses } from "@/components/ui/Button";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { api } from "@/lib/api";

export default async function LandingPage() {
  const [listings, stats] = await Promise.all([api.listings.list(), api.admin.getDashboardStats()]);
  const featuredListings = listings.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />
      <main>
        <section className="relative isolate flex min-h-[72vh] items-center overflow-hidden bg-slate-950">
          <Image
            alt=""
            className="absolute inset-0 -z-10 object-cover opacity-45"
            fill
            priority
            sizes="100vw"
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/75 to-emerald-950/50" />
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
                B2B agricultural trade
              </p>
              <h1 className="mt-5 text-4xl font-bold tracking-normal text-white md:text-6xl">
                AgriBridge
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
                A trusted marketplace skeleton for farmers, commercial buyers, quality officers,
                and admins to manage listings, RFQs, inspections, escrow-ready deals, and disputes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className={buttonClasses("primary")} href="/marketplace">
                  Explore marketplace
                </Link>
                <Link className={buttonClasses("secondary")} href="/register">
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          <StatCard helper="Mock active users" label="Verified network" value={`${stats.activeUsers}`} />
          <StatCard helper="Available now" label="Active listings" value={`${stats.activeListings}`} />
          <StatCard helper="Buyer demand" label="Open RFQs" value={`${stats.openRFQs}`} />
          <StatCard helper="Needs review" label="Inspections" value={`${stats.pendingInspections}`} />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Featured supply
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Fresh marketplace listings</h2>
            </div>
            <Link className={buttonClasses("secondary")} href="/marketplace">
              View all
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
