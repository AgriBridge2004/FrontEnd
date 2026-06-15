import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { QualityGradeBadge } from "@/components/shared/QualityGradeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { formatCurrency, formatDate, formatNumber, titleCase } from "@/lib/format";

type ListingDetailsPageProps = {
  params: {
    listingId: string;
  };
};

export async function generateStaticParams() {
  const listings = await api.listings.list();
  return listings.map((listing) => ({ listingId: listing.id }));
}

export default async function ListingDetailsPage({ params }: ListingDetailsPageProps) {
  const listing = await api.listings.getById(params.listingId);

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Listing details"
          title={listing.title}
          description={listing.description}
          actions={<Link className={buttonClasses("secondary")} href="/marketplace">Back to marketplace</Link>}
        />
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] bg-slate-100">
              <Image alt="" className="object-cover" fill priority sizes="(min-width: 1024px) 60vw, 100vw" src={listing.imageUrl} />
            </div>
          </div>
          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <QualityGradeBadge grade={listing.qualityGrade} />
              <StatusBadge label={listing.status} tone={listing.status === "active" ? "emerald" : "slate"} />
            </div>
            <dl className="mt-6 grid gap-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Crop</dt>
                <dd className="font-semibold text-slate-950">{listing.crop}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Type</dt>
                <dd className="font-semibold text-slate-950">{titleCase(listing.type)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Quantity</dt>
                <dd className="font-semibold text-slate-950">
                  {formatNumber(listing.quantity)} {listing.unit}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Price</dt>
                <dd className="font-semibold text-slate-950">
                  {formatCurrency(listing.pricePerUnit)} / {listing.unit}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Harvest date</dt>
                <dd className="font-semibold text-slate-950">{formatDate(listing.harvestDate)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Available from</dt>
                <dd className="font-semibold text-slate-950">{formatDate(listing.availableFrom)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Location</dt>
                <dd className="font-semibold text-slate-950">{listing.location}</dd>
              </div>
            </dl>
            <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
              RFQ and deal creation will connect to backend workflows later. For now, this button is a
              frontend placeholder.
            </div>
            <Link className={buttonClasses("primary") + " mt-4 w-full"} href="/buyer/rfqs/create">
              Request quote
            </Link>
          </aside>
        </section>
      </main>
    </div>
  );
}
