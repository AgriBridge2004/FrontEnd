"use client";

import { Archive, Download, FileText, Link } from "lucide-react";

import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type AssignmentAttachmentsCardProps = {
  attachments: AssignmentDetails["attachments"];
  onDownloadAll: () => void;
  onDownloadAttachment: () => void;
};

export function AssignmentAttachmentsCard({
  attachments,
  onDownloadAll,
  onDownloadAttachment,
}: AssignmentAttachmentsCardProps) {
  // TODO: Connect attachments download API.
  return (
    <DashboardCard className="mt-5 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600">
            <Link className="size-4" />
          </span>
          <h2 className="text-base font-black text-slate-950">Attachments ({attachments.length})</h2>
        </div>
        <button
          className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onDownloadAll}
          type="button"
        >
          <Download className="size-3.5" />
          Download All
        </button>
      </div>

      <div className="grid gap-3 p-4 lg:grid-cols-2">
        {attachments.map((attachment) => {
          const Icon = attachment.type === "pdf" ? FileText : Archive;
          const isPdf = attachment.type === "pdf";

          return (
            <article
              className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3.5 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
              key={attachment.id}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white">
                <Icon className={cn("size-4", isPdf ? "text-red-500" : "text-emerald-800")} />
                <span className={cn("text-[9px] font-black uppercase", isPdf ? "text-red-500" : "text-emerald-800")}>
                  {attachment.type}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-slate-950">{attachment.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase text-slate-400">
                  {attachment.type} - {attachment.size}
                </p>
              </div>
              <button
                aria-label={`Download ${attachment.name}`}
                className="grid size-7 place-items-center rounded-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-800"
                onClick={onDownloadAttachment}
                type="button"
              >
                <Download className="size-3.5" />
              </button>
            </article>
          );
        })}
      </div>
    </DashboardCard>
  );
}
