"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flag,
  MapPin,
  Package,
  Trash2,
  X,
} from "lucide-react";

import type { AdminListing, AdminListingStatus } from "@/components/dashboard/admin/listings/admin-listings.types";
import { cn } from "@/lib/cn";

type AdminListingDetailDrawerProps = {
  canGoNext: boolean;
  canGoPrevious: boolean;
  listing: AdminListing | null;
  onApprove: (listing: AdminListing) => void;
  onClose: () => void;
  onFarmerProfile: (listing: AdminListing) => void;
  onFlag: (listing: AdminListing) => void;
  onMoreImages: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRemove: (listing: AdminListing) => void;
  open: boolean;
};

const thumbnailStyles = [
  "from-red-700 via-orange-500 to-red-900",
  "from-cyan-900 via-slate-500 to-cyan-950",
  "from-rose-300 via-pink-400 to-red-500",
];

export function AdminListingDetailDrawer({
  canGoNext,
  canGoPrevious,
  listing,
  onApprove,
  onClose,
  onFarmerProfile,
  onFlag,
  onMoreImages,
  onNext,
  onPrevious,
  onRemove,
  open,
}: AdminListingDetailDrawerProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const listingId = listing?.id;

  useEffect(() => {
    setSelectedImageIndex(0);
    setIsDescriptionExpanded(false);
  }, [listingId]);

  if (!open || !listing) {
    return null;
  }

  const description = listing.description ?? "Not provided";

  return (
    <>
      <button aria-label="Close listing detail overlay" className="fixed inset-0 z-40 bg-slate-900/10 lg:left-[232px]" onClick={onClose} type="button" />
      <aside
        aria-labelledby="listing-detail-title"
        aria-modal="true"
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col overflow-hidden border-l border-emerald-100 bg-white shadow-2xl sm:w-[420px] xl:w-[460px] 2xl:w-[500px]"
        role="dialog"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <button aria-label="Close listing detail" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-emerald-50/30 hover:text-emerald-800" onClick={onClose} type="button">
              <X className="size-4" />
            </button>
            <h2 className="text-base font-black text-slate-950" id="listing-detail-title">
              Listing Detail
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-emerald-50/30 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canGoPrevious}
              onClick={onPrevious}
              type="button"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-emerald-50/30 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canGoNext}
              onClick={onNext}
              type="button"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <section className="grid grid-cols-[minmax(0,1fr)_70px] gap-2.5">
            <ProductVisual listing={listing} selectedIndex={selectedImageIndex} />
            <div className="grid gap-2.5">
              {thumbnailStyles.map((style, index) => (
                <button
                  aria-label={`Select listing image ${index + 1}`}
                  className={cn("h-14 rounded-lg bg-gradient-to-br shadow-inner ring-2", style, selectedImageIndex === index ? "ring-emerald-600" : "ring-transparent")}
                  key={style}
                  onClick={() => setSelectedImageIndex(index)}
                  type="button"
                />
              ))}
              <button className="grid h-14 place-items-center rounded-lg bg-slate-950/80 text-sm font-black text-white" onClick={onMoreImages} type="button">
                +6
              </button>
            </div>
          </section>

          <section className="mt-4">
            <StatusBadge status={listing.status} />
            <h3 className="mt-2 text-lg font-black text-slate-950">{listing.name}</h3>
            <p className="mt-1 text-[12px] font-semibold text-slate-400">
              {listing.listingId} - Published on {listing.datePublished} at {listing.timePublished}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 border-b border-slate-100 pb-4">
              <InfoItem label="Price" value={listing.price} />
              <InfoItem label="Quantity Available" value={listing.quantity} />
              <InfoItem icon={<BookOpen className="size-4 text-emerald-600" />} label="Category" value={listing.category} />
              <InfoItem icon={<MapPin className="size-4 text-slate-400" />} label="Location" value={listing.location ?? "Not provided"} />
            </div>
          </section>

          <section className="border-b border-slate-100 py-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Farmer</h4>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-slate-900 via-orange-700 to-amber-200 text-sm font-black text-white">
                  {createInitials(listing.farmer.name)}
                </span>
                <div>
                  <p className="text-sm font-black text-slate-950">{listing.farmer.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="size-3" />
                    {listing.farmer.verified ? "Verified Farmer" : "Farmer profile"}
                  </p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 hover:underline" onClick={() => onFarmerProfile(listing)} type="button">
                View Profile
                <ExternalLink className="size-3" />
              </button>
            </div>
          </section>

          <section className="border-b border-slate-100 py-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Description</h4>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              {isDescriptionExpanded ? `${description} Current batch is ready for immediate marketplace moderation and buyer review.` : description}
            </p>
            <button className="mt-2 inline-flex items-center gap-1 text-sm font-black text-emerald-700" onClick={() => setIsDescriptionExpanded((current) => !current)} type="button">
              {isDescriptionExpanded ? "Show less" : "Show more"}
              <ChevronDown className={cn("size-4 transition", isDescriptionExpanded && "rotate-180")} />
            </button>
          </section>

          <section className="border-b border-slate-100 py-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Moderation Actions</h4>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <ActionCard icon={<CheckCircle2 className="size-5" />} label="Approve Listing" onClick={() => onApprove(listing)} subtitle="Make listing active" tone="green" />
              <ActionCard icon={<Flag className="size-5" />} label="Flag Listing" onClick={() => onFlag(listing)} subtitle="Mark for review" tone="orange" />
              <ActionCard icon={<Trash2 className="size-5" />} label="Remove Listing" onClick={() => onRemove(listing)} subtitle="Remove from platform" tone="red" />
            </div>
          </section>

          <section className="py-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Listing History</h4>
            <div className="mt-3 space-y-3">
              {(listing.history ?? []).map((item) => (
                <HistoryItem date={item.date} key={`${item.date}-${item.title}`} title={item.title} value={item.value} />
              ))}
              <HistoryItem date={`${listing.datePublished} ${listing.timePublished}`} title="Listing created" value={`by ${listing.farmer.name}`} />
              <HistoryItem date="Jun 28, 2024 10:45 AM" title="Listing approved" value="by Admin" />
              <HistoryItem date="Jun 29, 2024 08:10 AM" title="Quantity updated" value={`${listing.quantity} available`} />
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}

function ProductVisual({ listing, selectedIndex }: { listing: AdminListing; selectedIndex: number }) {
  const visualClass = selectedIndex === 0 ? "from-red-800 via-orange-600 to-red-950" : selectedIndex === 1 ? "from-cyan-900 via-slate-500 to-cyan-950" : "from-rose-300 via-pink-400 to-red-500";

  return (
    <div className={cn("relative h-44 overflow-hidden rounded-lg bg-gradient-to-br shadow-inner", visualClass)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_42%)]" />
      <span className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-red-500 via-red-700 to-red-950 shadow-2xl">
        <Package className="size-12 text-red-100/80" />
      </span>
      <span className="sr-only">{listing.name}</span>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm font-black text-slate-950">
        {icon}
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: AdminListingStatus }) {
  const labels = {
    active: "Active",
    flagged: "Flagged",
    "pending-review": "Pending Review",
    removed: "Removed",
  };
  const styles = {
    active: "bg-emerald-50 text-emerald-700",
    flagged: "bg-red-50 text-red-700",
    "pending-review": "bg-amber-50 text-orange-700",
    removed: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black", styles[status])}>
      <span className={cn("size-2 rounded-full", status === "active" ? "bg-emerald-700" : status === "pending-review" ? "bg-orange-600" : status === "flagged" ? "bg-red-600" : "bg-slate-500")} />
      {labels[status]}
    </span>
  );
}

function ActionCard({ icon, label, onClick, subtitle, tone }: { icon: ReactNode; label: string; onClick: () => void; subtitle: string; tone: "green" | "orange" | "red" }) {
  const styles = {
    green: "border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-emerald-200",
    orange: "border-orange-100 bg-orange-50 text-orange-600 hover:border-orange-200",
    red: "border-red-100 bg-red-50 text-red-600 hover:border-red-200",
  };

  return (
    <button className={cn("rounded-xl border px-2 py-3 text-center transition-all duration-200 hover:shadow-sm", styles[tone])} onClick={onClick} type="button">
      <span className="mx-auto grid size-7 place-items-center">{icon}</span>
      <span className="mt-1.5 block text-[10px] font-black">{label}</span>
      <span className="mt-1 block text-[9px] font-semibold">{subtitle}</span>
    </button>
  );
}

function HistoryItem({ date, title, value }: { date: string; title: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3 text-[11px]">
      <p className="font-medium leading-5 text-slate-400">{date}</p>
      <div className="relative border-l border-slate-200 pl-4">
        <span className="absolute -left-1 top-1 size-2 rounded-full bg-slate-300" />
        <p className="font-black text-slate-900">{title}</p>
        <p className="mt-1 font-semibold text-slate-500">{value}</p>
      </div>
    </div>
  );
}

function createInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
