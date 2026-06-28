import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Edit3, Eye, FileText } from "lucide-react";

import { ListingStatusBadge } from "@/components/farmer/listings/ListingStatusBadge";
import type { FarmerListing } from "@/components/farmer/listings/listings-types";
import { cn } from "@/lib/cn";

type ListingCardProps = {
  listing: FarmerListing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:bg-emerald-50/20 hover:shadow-md">
      <div className="relative h-40 bg-emerald-50">
        <Image
          alt={`${listing.name} listing`}
          className="object-cover"
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
          src={listing.image}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-black leading-6 text-slate-950">{listing.name}</h2>
          <ListingStatusBadge status={listing.status} />
        </div>

        <p className="mt-2 text-xl font-black text-slate-950">
          {listing.currency} {listing.price}
          <span className="ml-1 text-xs font-medium text-slate-400">/ {listing.unit}</span>
        </p>

        <div className="mt-4">
          <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Quantity</p>
          <p className="mt-1 text-sm font-black text-slate-900">{listing.quantity}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 border-t border-slate-100 pt-3">
          <ListingMetric icon={Eye} label="Views" value={listing.views} />
          <ListingMetric className="border-l border-slate-100" icon={FileText} label="RFQs Received" value={listing.rfqsReceived} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-emerald-700 bg-white text-sm font-black text-slate-950 transition hover:bg-emerald-50"
            href={`/farmer/listings/${listing.id}/edit`}
          >
            <Edit3 className="size-[17px]" />
            Edit
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-emerald-700 bg-white text-sm font-black text-slate-950 transition hover:bg-emerald-50"
            href={`/farmer/listings/${listing.id}`}
          >
            <Eye className="size-[17px]" />
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

type ListingMetricProps = {
  className?: string;
  icon: LucideIcon;
  label: string;
  value: number;
};

function ListingMetric({ className, icon: Icon, label, value }: ListingMetricProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Icon className="size-[18px] shrink-0 text-slate-400" strokeWidth={2} />
      <div>
        <p className="text-sm font-black leading-4 text-slate-900">{value}</p>
        <p className="text-[10px] font-medium uppercase leading-3 text-slate-400">{label}</p>
      </div>
    </div>
  );
}
