import Link from "next/link";
import { Plus } from "lucide-react";

export function ListingsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">My Listings</h1>
      <Link
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
        href="/farmer/listings/create"
      >
        <Plus className="size-4" />
        Create Listing
      </Link>
    </div>
  );
}
