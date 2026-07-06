"use client";

import { BookOpen, Check, Flag, MoreVertical } from "lucide-react";

import type { AdminListing, AdminListingStatus } from "@/components/dashboard/admin/listings/admin-listings.types";
import { cn } from "@/lib/cn";

type AdminListingsTableProps = {
  listings: AdminListing[];
  currentPage: number;
  onActionClick: (listing: AdminListing) => void;
  onFarmerProfileClick: (listing: AdminListing) => void;
  onRowsPerPageChange: (value: number) => void;
  onSelectedListingsChange: (ids: string[]) => void;
  rowsPerPage: number;
  selectedDetailListingId?: string;
  selectedListingIds: string[];
  totalCount: number;
};

export function AdminListingsTable({
  currentPage,
  listings,
  onActionClick,
  onFarmerProfileClick,
  onRowsPerPageChange,
  onSelectedListingsChange,
  rowsPerPage,
  selectedDetailListingId,
  selectedListingIds,
  totalCount,
}: AdminListingsTableProps) {
  const startRow = totalCount === 0 || listings.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = totalCount === 0 || listings.length === 0 ? 0 : Math.min(currentPage * rowsPerPage, totalCount);

  function toggleListing(listingId: string) {
    onSelectedListingsChange(
      selectedListingIds.includes(listingId) ? selectedListingIds.filter((id) => id !== listingId) : [...selectedListingIds, listingId],
    );
  }

  return (
    <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="w-14 px-4 py-3">
                <span className="block size-4 rounded border border-slate-300" />
              </th>
              <th className="px-4 py-3">Listing</th>
              <th className="px-4 py-3">Farmer</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date Published</th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {listings.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center" colSpan={9}>
                  <p className="text-sm font-black text-slate-900">No listings found</p>
                  <p className="mt-1 text-sm font-medium text-slate-500">Try adjusting the filters or date range.</p>
                </td>
              </tr>
            ) : null}
            {listings.map((listing) => {
              const isSelected = selectedListingIds.includes(listing.id);
              const isDetailSelected = selectedDetailListingId === listing.id;

              return (
                <tr className={cn("transition hover:bg-emerald-50/20", isSelected && "bg-emerald-50/40", isDetailSelected && "ring-1 ring-inset ring-emerald-200")} key={listing.id}>
                  <td className="px-4 py-4">
                    <button
                      aria-label={`Select ${listing.name}`}
                      className={cn(
                        "grid size-5 place-items-center rounded border transition hover:bg-emerald-50",
                        isSelected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white text-slate-400",
                      )}
                      onClick={() => toggleListing(listing.id)}
                      type="button"
                    >
                      {isSelected ? <Check className="size-3.5" /> : null}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <button className="group flex items-center gap-3 text-left" onClick={() => onActionClick(listing)} type="button">
                      <ListingImage listing={listing} />
                      <div>
                        <p className="font-black text-slate-950 group-hover:text-emerald-800 group-hover:underline">{listing.name}</p>
                        <p className="mt-1 text-[11px] font-medium text-slate-400">{listing.listingId}</p>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-slate-950">{listing.farmer.name}</p>
                    <button className="mt-1 text-[11px] font-black text-emerald-700 hover:underline" onClick={() => onFarmerProfileClick(listing)} type="button">
                      View Profile
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <BookOpen className={cn("size-4", categoryColor(listing.category))} />
                      {listing.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-600">{listing.quantity}</td>
                  <td className="px-4 py-4 font-black text-slate-950">{listing.price}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={listing.status} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-600">{listing.datePublished}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-400">{listing.timePublished}</p>
                  </td>
                  <td className="px-4 py-4">
                    <button aria-label={`Open actions for ${listing.name}`} className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-emerald-50/30 hover:text-emerald-800" onClick={() => onActionClick(listing)} type="button">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-[12px] font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {startRow} to {endRow} of {totalCount.toLocaleString()} listings
        </span>
        <label className="flex items-center gap-2">
          Rows per page:
          <select className="rounded border border-slate-200 bg-white px-2 py-1 text-[12px] font-black text-slate-700" onChange={(event) => onRowsPerPageChange(Number(event.target.value))} value={rowsPerPage}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
    </section>
  );
}

function ListingImage({ listing }: { listing: AdminListing }) {
  const imageClass = {
    "Fresh Tomatoes": "from-red-600 via-orange-500 to-emerald-700",
    "Valencia Oranges": "from-orange-400 via-yellow-400 to-emerald-600",
    "Wheat Grains": "from-amber-200 via-yellow-600 to-orange-900",
    "White Potatoes": "from-yellow-100 via-amber-300 to-stone-900",
  }[listing.name] ?? "from-emerald-100 to-emerald-800";

  return <span className={cn("block size-10 shrink-0 rounded-lg bg-gradient-to-br shadow-inner", imageClass)} />;
}

function StatusBadge({ status }: { status: AdminListingStatus }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-700",
    flagged: "bg-red-50 text-red-700",
    "pending-review": "bg-amber-100 text-orange-700",
    removed: "bg-slate-100 text-slate-600",
  };
  const labels = {
    active: "Active",
    flagged: "Flagged",
    "pending-review": "Pending Review",
    removed: "Removed",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-black", styles[status])}>
      {status === "flagged" ? <Flag className="size-3" /> : <span className={cn("size-2 rounded-full", status === "active" ? "bg-emerald-700" : status === "pending-review" ? "bg-orange-600" : "bg-slate-500")} />}
      {labels[status]}
    </span>
  );
}

function categoryColor(category: AdminListing["category"]) {
  const colors = {
    Dates: "text-orange-500",
    Fruits: "text-purple-500",
    Grains: "text-orange-500",
    Oils: "text-amber-500",
    Vegetables: "text-emerald-500",
  };

  return colors[category];
}
