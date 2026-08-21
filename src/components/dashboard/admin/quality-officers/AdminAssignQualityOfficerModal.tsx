"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clock, MapPin, Search, Star, X } from "lucide-react";

import { AdminOfficerAvatar } from "@/components/dashboard/admin/quality-officers/AdminOfficerAvatar";
import type {
  AdminQualityOfficer,
  AssignmentDistanceOption,
  AssignmentSortOption,
  DealNeedingAssignment,
} from "@/components/dashboard/admin/quality-officers/admin-quality-officers.types";
import { cn } from "@/lib/cn";

type AdminAssignQualityOfficerModalProps = {
  deal: DealNeedingAssignment | null;
  officers: AdminQualityOfficer[];
  onAssignmentHistory: () => void;
  onClose: () => void;
  onConfirm: (officer: AdminQualityOfficer, deal: DealNeedingAssignment) => void;
  onWidenSearchArea: () => void;
  open: boolean;
};

const sortOptions: AssignmentSortOption[] = ["Nearest", "Highest Rated", "Most Inspections", "Available Only"];
const distanceOptions: AssignmentDistanceOption[] = ["Within: 10 km", "Within: 25 km", "Within: 50 km", "Within: 100 km"];

export function AdminAssignQualityOfficerModal({
  deal,
  officers,
  onAssignmentHistory,
  onClose,
  onConfirm,
  onWidenSearchArea,
  open,
}: AdminAssignQualityOfficerModalProps) {
  const [selectedOfficerId, setSelectedOfficerId] = useState("qo-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<AssignmentSortOption>("Nearest");
  const [distance, setDistance] = useState<AssignmentDistanceOption>("Within: 50 km");

  useEffect(() => {
    if (open) {
      setSelectedOfficerId("qo-1");
      setSearchQuery("");
      setSortBy("Nearest");
      setDistance("Within: 50 km");
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const selectableOfficers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    let nextOfficers = officers
      .filter((officer) => officer.status === "available")
      .filter((officer) => !normalizedSearch || `${officer.name} ${officer.phone}`.toLowerCase().includes(normalizedSearch));

    if (sortBy === "Highest Rated") {
      nextOfficers = [...nextOfficers].sort((first, second) => second.averageRating - first.averageRating);
    } else if (sortBy === "Most Inspections") {
      nextOfficers = [...nextOfficers].sort((first, second) => second.completedInspections - first.completedInspections);
    } else {
      nextOfficers = [...nextOfficers].sort((first, second) => (first.distanceFromFarmKm ?? 0) - (second.distanceFromFarmKm ?? 0));
    }

    return nextOfficers.slice(0, 2);
  }, [officers, searchQuery, sortBy]);

  if (!open || !deal) {
    return null;
  }

  const selectedOfficer = officers.find((officer) => officer.id === selectedOfficerId) ?? selectableOfficers[0];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/20 px-4 py-6" onMouseDown={onClose} role="presentation">
      <section
        aria-labelledby="assign-quality-officer-title"
        aria-modal="true"
        className="flex max-h-[90vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-black text-slate-950" id="assign-quality-officer-title">
            Assign Quality Officer
          </h2>
          <button aria-label="Close assign quality officer modal" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700" onClick={onClose} type="button">
            <X className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid min-h-[400px] divide-y divide-slate-100 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:divide-x lg:divide-y-0">
            <aside className="p-6">
              <DealSummary deal={deal} />
            </aside>

            <main className="p-6">
              <div className="grid gap-3 lg:grid-cols-[minmax(180px,1fr)_140px_130px_40px]">
                <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-[13px] font-semibold text-slate-700">
                  <Search className="size-4 text-slate-400" />
                  <input
                    className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by name or phone..."
                    value={searchQuery}
                  />
                </label>
                <select className="h-10 rounded-lg border border-slate-300 px-3 text-[13px] font-semibold text-slate-700" onChange={(event) => setSortBy(event.target.value as AssignmentSortOption)} value={sortBy}>
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      Sort by: {option}
                    </option>
                  ))}
                </select>
                <select className="h-10 rounded-lg border border-slate-300 px-3 text-[13px] font-semibold text-slate-700" onChange={(event) => setDistance(event.target.value as AssignmentDistanceOption)} value={distance}>
                  {distanceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button aria-label="Assignment history" className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-emerald-50/30" onClick={onAssignmentHistory} type="button">
                  <Clock className="size-4" />
                </button>
              </div>

              <div className="mt-5 grid gap-3">
                {selectableOfficers.map((officer, index) => {
                  const isSelected = selectedOfficerId === officer.id;

                  return (
                    <button
                      className={cn(
                        "grid items-center gap-4 rounded-lg border p-4 text-left transition-all duration-200 sm:grid-cols-[24px_1fr_70px_90px_90px]",
                        isSelected ? "border-emerald-700 bg-emerald-50/40 shadow-sm" : "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30",
                      )}
                      key={officer.id}
                      onClick={() => setSelectedOfficerId(officer.id)}
                      type="button"
                    >
                      <span className={cn("grid size-5 place-items-center rounded-full border", isSelected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300")}>
                        {isSelected ? <Check className="size-3.5" /> : null}
                      </span>
                      <span className="flex min-w-0 items-center gap-3">
                        <AdminOfficerAvatar index={index} />
                        <span>
                          <span className="block text-[14px] font-black text-slate-900">{officer.name}</span>
                          <span className="text-[12px] font-medium text-slate-500">{officer.phone}</span>
                        </span>
                      </span>
                      <span className="text-[13px] font-black text-slate-900">
                        {officer.averageRating.toFixed(1)}
                        <span className="mt-1 flex items-center gap-0.5">
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star
                              className={cn("size-3", starIndex < Math.round(officer.averageRating) ? "fill-amber-400 text-amber-400" : "text-slate-300")}
                              key={starIndex}
                            />
                          ))}
                        </span>
                      </span>
                      <span className="text-[13px] font-black text-slate-900">
                        {officer.completedInspections}
                        <span className="block text-[11px] font-medium text-slate-400">Completed</span>
                      </span>
                      <span className="text-[13px] font-black text-slate-900">
                        {officer.distanceFromFarmKm} km
                        <span className="block text-[11px] font-medium text-slate-400">from farm</span>
                      </span>
                      <span className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700 sm:col-start-5">AVAILABLE</span>
                    </button>
                  );
                })}
              </div>
            </main>

            <aside className="p-6">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <MapPin className="size-5" />
                </span>
                <p className="mt-3 text-[12px] font-medium leading-5 text-slate-500">
                  Showing officers in the same area sorted by nearest distance.
                </p>
              </div>
              <div className="mt-7">
                <h3 className="text-[13px] font-black text-slate-900">Can&apos;t find available officers?</h3>
                <p className="mt-3 text-[12px] font-medium leading-5 text-slate-500">
                  Try widening your search area or increasing the distance.
                </p>
                <button
                  className="mt-4 h-9 rounded-lg border border-slate-200 px-4 text-[12px] font-black text-slate-700 hover:bg-emerald-50/30"
                  onClick={() => {
                    setDistance("Within: 100 km");
                    onWidenSearchArea();
                  }}
                  type="button"
                >
                  Widen Search Area
                </button>
              </div>
            </aside>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button className="h-10 rounded-lg border border-slate-200 bg-white px-6 text-[13px] font-black text-slate-600 hover:bg-slate-100" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-800 px-6 text-[13px] font-black text-white hover:bg-emerald-900"
            onClick={() => selectedOfficer && onConfirm(selectedOfficer, deal)}
            type="button"
          >
            <Check className="size-4" />
            Confirm Assignment
          </button>
        </div>
      </section>
    </div>
  );
}

function DealSummary({ deal }: { deal: DealNeedingAssignment }) {
  return (
    <div className="grid gap-6 text-[13px]">
      <Info label="Deal ID" value={deal.dealId} />
      <Info label="Product" value={deal.product} />
      <Info label="Farm Location" value={deal.farmLocation} />
      <Info label="Required Date" value={deal.requiredDate} />
      <Info label="Deal Value" value={`${deal.dealValue.toLocaleString()} SAR`} />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 font-black leading-5 text-slate-900">{value}</p>
    </div>
  );
}
