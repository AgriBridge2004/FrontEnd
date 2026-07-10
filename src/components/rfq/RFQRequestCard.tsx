"use client";

import Image from "next/image";
import { Building2, MapPin } from "lucide-react";
import { useState } from "react";

import { RFQ_IMAGE_FALLBACK } from "@/components/rfq/rfq.mock";
import type { RFQRequest } from "@/components/rfq/rfq.types";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type RFQRequestCardProps = {
  request: RFQRequest;
  onSubmitProposal: (request: RFQRequest) => void;
};

export function RFQRequestCard({ request, onSubmitProposal }: RFQRequestCardProps) {
  const [imageSrc, setImageSrc] = useState(request.image || RFQ_IMAGE_FALLBACK);

  return (
    <article className="grid overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md md:grid-cols-[230px_1fr]">
      <div className="relative min-h-48 bg-slate-100 md:min-h-full">
        <Image
          alt={request.title}
          className="object-cover"
          fill
          onError={() => setImageSrc(RFQ_IMAGE_FALLBACK)}
          sizes="(min-width: 768px) 230px, 100vw"
          src={imageSrc}
        />
        <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-800 shadow-sm">
          {request.category}
        </span>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-lg font-black tracking-normal text-emerald-900">{request.title}</h2>
          <StatusBadge />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="size-3.5" />
            {request.buyer}
          </span>
          <span className="text-slate-400">•</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {request.location}
          </span>
        </div>

        <p className="mt-4 max-w-3xl text-[13px] font-medium leading-5 text-slate-600">{request.description}</p>

        <div className="mt-5 grid gap-3 border-t border-emerald-100 pt-3.5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <Metric label="Deadline" value={request.deadline} />
          <Metric label="Total Volume" value={request.totalVolume} />
          <button
            className={cn(buttonClasses("primary"), "h-9 rounded-lg bg-emerald-800 px-5 text-sm font-black hover:bg-emerald-900")}
            onClick={() => onSubmitProposal(request)}
            type="button"
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </article>
  );
}

function StatusBadge() {
  return (
    <span className="inline-flex w-fit rounded-full bg-emerald-800 px-2.5 py-1 text-[11px] font-black text-emerald-50">
      Open for Bids
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-black text-slate-900">{value}</p>
    </div>
  );
}
