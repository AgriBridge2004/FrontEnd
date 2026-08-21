"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit, MapPin, Package, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { ListingStatusBadge } from "@/components/dashboard/farmer/listings/ListingStatusBadge";
import { deleteFarmerListing, getFarmerListingById } from "@/lib/farmer-listings-api";
import type { FarmerListing } from "@/types/listing";

const fallbackImage = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

type FarmerListingDetailsPageProps = {
  listingId: string;
};

export function FarmerListingDetailsPage({ listingId }: FarmerListingDetailsPageProps) {
  const [listing, setListing] = useState<FarmerListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const loadListing = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiListing = await getFarmerListingById(listingId);
      setListing(apiListing);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load listing.");
    } finally {
      setIsLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    void loadListing();
  }, [loadListing]);

  async function handleDelete() {
    if (!window.confirm("Delete this listing? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteFarmerListing(listingId);
      window.location.assign("/farmer/listings");
    } catch (error) {
      setToastMessage(error instanceof Error ? error.message : "Unable to delete listing.");
    }
  }

  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-5 lg:px-7">
        <Link className="inline-flex items-center gap-2 text-sm font-black text-emerald-800 hover:text-emerald-950" href="/farmer/listings">
          <ArrowLeft className="size-4" />
          Back to listings
        </Link>

        {isLoading ? (
          <div className="mt-6 h-96 animate-pulse rounded-2xl border border-emerald-100 bg-white" />
        ) : errorMessage ? (
          <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
            <p className="text-base font-black text-slate-950">Unable to load listing</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">{errorMessage}</p>
            <button className="mt-5 h-10 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white" onClick={loadListing} type="button">
              Retry
            </button>
          </section>
        ) : listing ? (
          <article className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
            <div className="relative h-72 bg-slate-100">
              <Image alt={listing.productName} className="object-cover" fill sizes="1120px" src={listing.images[0] || fallbackImage} />
            </div>
            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-950">{listing.productName || listing.title}</h1>
                  <ListingStatusBadge status={listing.status === "expired" ? "Expired" : listing.status === "active" ? "Active" : "Draft"} />
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <InfoTile label="Price" value={`${listing.price ?? 0} ${listing.currency ?? "USD"} / ${listing.unit ?? "kg"}`} />
                  <InfoTile icon={<Package className="size-4" />} label="Quantity" value={`${listing.quantity ?? 0} ${listing.unit ?? "kg"}`} />
                  <InfoTile icon={<MapPin className="size-4" />} label="Views" value={String(listing.views ?? 0)} />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white" href={`/farmer/listings/${listing.id}/edit`}>
                  <Edit className="size-4" />
                  Edit
                </Link>
                <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-5 text-sm font-black text-red-700" onClick={handleDelete} type="button">
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ) : null}
      </div>
      {toastMessage ? <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white">{toastMessage}</div> : null}
    </FarmerDashboardLayout>
  );
}

function InfoTile({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
      <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">{icon}{label}</p>
      <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
    </div>
  );
}
