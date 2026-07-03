import Link from "next/link";

import { EmptyListings } from "@/components/dashboard/farmer/listings/EmptyListings";
import { ListingStatusBadge } from "@/components/dashboard/farmer/listings/ListingStatusBadge";
import type { FarmerListing } from "@/components/dashboard/farmer/listings/listings-types";

type ListingsTableProps = {
  listings: FarmerListing[];
};

export function ListingsTable({ listings }: ListingsTableProps) {
  if (listings.length === 0) {
    return <EmptyListings />;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left">
          <thead className="bg-emerald-50/30 text-[10px] font-black uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Views</th>
              <th className="px-5 py-4">RFQs</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {listings.map((listing) => (
              <tr className="transition hover:bg-emerald-50/20" key={listing.id}>
                <td className="px-5 py-4 font-black text-slate-950">{listing.name}</td>
                <td className="px-5 py-4">
                  <ListingStatusBadge status={listing.status} />
                </td>
                <td className="px-5 py-4 font-semibold">
                  {listing.currency} {listing.price} / {listing.unit}
                </td>
                <td className="px-5 py-4">{listing.quantity}</td>
                <td className="px-5 py-4">{listing.views}</td>
                <td className="px-5 py-4">{listing.rfqsReceived}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Link
                      className="rounded-md border border-emerald-700 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-emerald-50"
                      href={`/farmer/listings/${listing.id}/edit`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="rounded-md border border-emerald-700 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-emerald-50"
                      href={`/farmer/listings/${listing.id}`}
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
