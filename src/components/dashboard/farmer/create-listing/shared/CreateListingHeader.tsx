import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CreateListingHeader() {
  return (
    <div className="flex items-center gap-3">
      <Link
        aria-label="Back to My Listings"
        className="grid size-9 place-items-center rounded-full text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-900"
        href="/farmer/listings"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <h1 className="text-[22px] font-black tracking-tight text-emerald-950 sm:text-2xl">Create New Listing</h1>
    </div>
  );
}
