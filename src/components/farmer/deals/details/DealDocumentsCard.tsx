import { Download, FileText, Folder } from "lucide-react";

import type { DealDetail } from "@/components/farmer/deals/details/deal-details.types";

type DealDocumentsCardProps = {
  documents: DealDetail["documents"];
  isDownloadingContract?: boolean;
  onDownload: () => void;
};

export function DealDocumentsCard({ documents, isDownloadingContract = false, onDownload }: DealDocumentsCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <div className="border-b border-slate-100 px-5 py-5">
        <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
          <Folder className="size-5 text-emerald-600" />
          Documents
        </h2>
      </div>
      <div className="divide-y divide-slate-100">
        {documents.map((document) => (
          <div className="flex items-center gap-3 p-5" key={document.id}>
            <span className={document.status === "available" ? "grid size-10 place-items-center rounded-lg bg-red-50 text-red-500" : "grid size-10 place-items-center rounded-lg bg-slate-50 text-slate-400"}>
              <FileText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-black text-slate-950">{document.name}</p>
              <p className="text-xs font-medium text-slate-400">{document.description}</p>
            </div>
            {document.status === "available" ? (
              <button
                className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-emerald-100 px-3 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
                disabled={isDownloadingContract}
                onClick={onDownload}
                type="button"
              >
                <Download className="size-3.5" />
                {isDownloadingContract ? "Generating..." : "Download"}
              </button>
            ) : (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-600 ring-1 ring-amber-100">
                Pending
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
