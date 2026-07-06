"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, ImageIcon, Users } from "lucide-react";

import type { AdminDispute } from "@/components/dashboard/admin/disputes/admin-disputes.types";
import { cn } from "@/lib/cn";

type AdminDisputeEvidenceCarouselProps = {
  dispute: AdminDispute;
  isNewestFirst: boolean;
  onEvidenceClick: () => void;
  onToggleOrder: () => void;
};

export function AdminDisputeEvidenceCarousel({
  dispute,
  isNewestFirst,
  onEvidenceClick,
  onToggleOrder,
}: AdminDisputeEvidenceCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const evidence = isNewestFirst ? [...dispute.evidence].reverse() : dispute.evidence;

  const updateScrollButtons = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    setCanScrollLeft(element.scrollLeft > 4);
    setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollButtons();

    const element = scrollRef.current;
    if (!element) {
      return undefined;
    }

    element.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [evidence.length, isNewestFirst, updateScrollButtons]);

  function scrollEvidence(direction: "left" | "right") {
    scrollRef.current?.scrollBy({ behavior: "smooth", left: direction === "right" ? 280 : -280 });
    window.setTimeout(updateScrollButtons, 320);
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-black text-slate-950">
          <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <Users className="size-4" />
          </span>
          Evidence Submitted
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">12</span>
        </h3>
        <button
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-[12px] font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50/30"
          onClick={onToggleOrder}
          type="button"
        >
          Newest First
        </button>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2">
          {evidence.map((item) => (
            <button className="w-[150px] shrink-0 snap-start text-left" key={item.id} onClick={onEvidenceClick} type="button">
              <span className="relative block h-24 overflow-hidden rounded-lg bg-slate-100">
                {item.image ? (
                  <Image alt={item.fileName} className="object-cover" fill sizes="150px" src={item.image} />
                ) : (
                  <span className="grid h-full place-items-center text-slate-400">
                    {item.fileType === "pdf" ? <FileText className="size-7" /> : <ImageIcon className="size-7" />}
                  </span>
                )}
                <span
                  className={cn(
                    "absolute left-2 top-2 rounded px-2 py-1 text-[10px] font-black text-white",
                    item.source === "Farmer" ? "bg-emerald-600" : "bg-blue-600",
                  )}
                >
                  {item.source}
                </span>
              </span>
              <span className="mt-2 block truncate text-[11px] font-black text-slate-800">{item.fileName}</span>
              <span className="block text-[10px] font-medium text-slate-400">
                {item.date} - {item.time}
              </span>
            </button>
          ))}
        </div>
        {canScrollLeft ? (
          <button
            aria-label="Scroll evidence left"
            className="absolute left-0 top-12 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-md transition hover:bg-emerald-50/30 hover:text-emerald-800"
            onClick={() => scrollEvidence("left")}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>
        ) : null}
        {canScrollRight ? (
          <button
            aria-label="Scroll evidence right"
            className="absolute right-0 top-12 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-md transition hover:bg-emerald-50/30 hover:text-emerald-800"
            onClick={() => scrollEvidence("right")}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
