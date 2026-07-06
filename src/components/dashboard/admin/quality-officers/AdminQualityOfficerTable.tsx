"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { AdminOfficerAvatar } from "@/components/dashboard/admin/quality-officers/AdminOfficerAvatar";
import type { AdminQualityOfficer, QualityOfficerStatus } from "@/components/dashboard/admin/quality-officers/admin-quality-officers.types";
import { cn } from "@/lib/cn";

export function AdminQualityOfficerTable({ officers }: { officers: AdminQualityOfficer[] }) {
  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4">Quality Officer</th>
              <th className="px-6 py-4">Coverage Area</th>
              <th className="px-6 py-4">Completed Inspections</th>
              <th className="px-6 py-4">Average Rating</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] font-semibold text-slate-700">
            {officers.map((officer, index) => (
              <tr className="transition-all duration-200 hover:bg-emerald-50/30" key={officer.id}>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <AdminOfficerAvatar index={index} />
                    <div>
                      <p className="font-black leading-5 text-slate-900">{officer.name}</p>
                      <p className="mt-1 text-[12px] font-medium leading-4 text-slate-500">{officer.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 leading-5 text-slate-600">{officer.coverageAreas.join(", ")}</td>
                <td className="px-6 py-5 font-black text-slate-900">{officer.completedInspections}</td>
                <td className="px-6 py-5">
                  <div className="font-black text-slate-900">{officer.averageRating.toFixed(1)}</div>
                  <div className="mt-1 flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star
                        className={cn("size-3.5", starIndex < Math.round(officer.averageRating) ? "fill-amber-400 text-amber-400" : "text-slate-300")}
                        key={starIndex}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={officer.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 text-[12px] font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1 to {officers.length} of 24 officers</span>
        <div className="flex items-center gap-1">
          <PageButton>
            <ChevronLeft className="size-4" />
          </PageButton>
          {[1, 2, 3, 4].map((page) => (
            <PageButton isActive={page === 1} key={page}>
              {page}
            </PageButton>
          ))}
          <PageButton>
            <ChevronRight className="size-4" />
          </PageButton>
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: QualityOfficerStatus }) {
  const styles = {
    available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    busy: "bg-orange-50 text-orange-700 ring-orange-200",
    suspended: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase ring-1", styles[status])}>
      {status}
    </span>
  );
}

function PageButton({ children, isActive = false }: { children: ReactNode; isActive?: boolean }) {
  return (
    <button
      className={cn(
        "grid size-8 place-items-center rounded-lg border text-[12px] font-black transition",
        isActive ? "border-emerald-800 bg-emerald-800 text-white" : "border-slate-200 bg-white text-slate-500 hover:bg-emerald-50/30",
      )}
      type="button"
    >
      {children}
    </button>
  );
}
