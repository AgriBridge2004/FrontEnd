"use client";

import { CheckCircle2, PlusCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar";
import { RFQFiltersBar } from "@/components/rfq/RFQFiltersBar";
import { RFQFooter } from "@/components/rfq/RFQFooter";
import { RFQHelpCard } from "@/components/rfq/RFQHelpCard";
import { RFQHero } from "@/components/rfq/RFQHero";
import { RFQMarketSnapshot } from "@/components/rfq/RFQMarketSnapshot";
import { RFQRequestList } from "@/components/rfq/RFQRequestList";
import { RFQTipsCard } from "@/components/rfq/RFQTipsCard";
import { RFQ_REQUESTS } from "@/components/rfq/rfq.mock";
import type { RFQFilters } from "@/components/rfq/rfq.types";
import { buttonClasses } from "@/components/ui/Button";
import { Pagination } from "@/components/shared/Pagination";
import { cn } from "@/lib/cn";

const initialFilters: RFQFilters = {
  commodityType: "All Commodities",
  status: "All Statuses",
  region: "All Regions",
};

export function RFQPage() {
  const [filters, setFilters] = useState<RFQFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  const filteredRequests = useMemo(() => {
    return RFQ_REQUESTS.filter((request) => {
      const matchesCommodity = filters.commodityType === "All Commodities" || request.category === filters.commodityType;
      const matchesStatus =
        filters.status === "All Statuses" ||
        (filters.status === "Open for Bids" && request.status === "open") ||
        (filters.status === "Closing Soon" && request.status === "closing-soon") ||
        (filters.status === "Submitted" && request.status === "submitted");
      const matchesRegion = filters.region === "All Regions" || request.location === filters.region;

      return matchesCommodity && matchesStatus && matchesRegion;
    });
  }, [filters]);

  function handleFiltersChange(nextFilters: RFQFilters) {
    setFilters(nextFilters);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900" dir="ltr">
      <MarketplaceNavbar activeLink="RFQ" />
      <RFQHero />

      <main className="mx-auto grid max-w-[1280px] gap-5 px-5 py-6 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8">
        <section className="min-w-0">
          <RFQFiltersBar filters={filters} visibleCount={filteredRequests.length} onFiltersChange={handleFiltersChange} />
          <div className="mt-6">
            <RFQRequestList
              requests={filteredRequests}
              onSubmitProposal={() => setToastMessage("Proposal submission flow will be connected later.")}
            />
          </div>
          <Pagination className="mt-9" currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
        </section>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
          <button
            className={cn(buttonClasses("primary"), "h-12 rounded-xl bg-emerald-800 text-sm font-black shadow-lg shadow-emerald-900/10 hover:bg-emerald-900")}
            onClick={() => setToastMessage("Post RFQ flow will be connected later.")}
            type="button"
          >
            <PlusCircle className="mr-2 size-4" />
            Post New RFQ
          </button>
          <RFQTipsCard onViewGuides={() => setToastMessage("Guides will be connected later.")} />
          <RFQHelpCard onContactSupport={() => setToastMessage("Support contact will be connected later.")} />
          <RFQMarketSnapshot />
        </aside>
      </main>

      <RFQFooter />

      {toastMessage ? (
        <div className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
            <p className="flex-1 text-sm font-bold leading-6 text-slate-700">{toastMessage}</p>
            <button
              aria-label="Dismiss notification"
              className="grid size-7 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setToastMessage("")}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
