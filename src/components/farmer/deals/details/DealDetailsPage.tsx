"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { ContractPdfRenderHost } from "@/components/farmer/deals/contract/ContractPdfRenderHost";
import { getDigitalContract } from "@/components/farmer/deals/contract/contract.mock";
import { ActivityTimeline } from "@/components/farmer/deals/details/ActivityTimeline";
import { DealActionsCard } from "@/components/farmer/deals/details/DealActionsCard";
import { DealDetailsToast } from "@/components/farmer/deals/details/DealDetailsToast";
import { DealDocumentsCard } from "@/components/farmer/deals/details/DealDocumentsCard";
import { DealHeader } from "@/components/farmer/deals/details/DealHeader";
import { DealProgressStepper } from "@/components/farmer/deals/details/DealProgressStepper";
import { DealSummaryCard } from "@/components/farmer/deals/details/DealSummaryCard";
import { InspectionInfoCard } from "@/components/farmer/deals/details/InspectionInfoCard";
import { InspectionNotice } from "@/components/farmer/deals/details/InspectionNotice";
import { getDealDetail } from "@/components/farmer/deals/details/deal-details.mock";
import { downloadContractPdf } from "@/lib/download-contract-pdf";

type DealDetailsPageProps = {
  dealId: string;
};

export function DealDetailsPage({ dealId }: DealDetailsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloadingContract, setIsDownloadingContract] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const contractPdfRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deal = getDealDetail(dealId);
  const contract = getDigitalContract(dealId);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  async function handleDownloadContract() {
    if (!contract || isDownloadingContract) {
      showToast("Failed to generate contract PDF. Please try again.");
      return;
    }

    try {
      setIsDownloadingContract(true);
      await downloadContractPdf(contractPdfRef.current, `AgriBridge-Contract-${contract.dealId}.pdf`);
      showToast("Contract PDF downloaded successfully.");
    } catch {
      showToast("Failed to generate contract PDF. Please try again.");
    } finally {
      setIsDownloadingContract(false);
    }
  }

  return (
    <FarmerDashboardLayout
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search by contract ID, product, or buyer name"
      searchValue={searchQuery}
    >
      <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-5 lg:px-6">
        {deal ? (
          <>
            <DealHeader deal={deal} />
            <DealProgressStepper currentStage={deal.currentStage} />
            <InspectionNotice inspectionDate={deal.inspection.inspectionDate} />

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="min-w-0">
                <DealSummaryCard deal={deal} />
                <ActivityTimeline timeline={deal.timeline} />
              </div>
              <aside className="grid h-fit gap-5 lg:sticky lg:top-24 lg:self-start">
                <DealActionsCard dealId={deal.id} />
                <InspectionInfoCard inspection={deal.inspection} />
                <DealDocumentsCard
                  documents={deal.documents}
                  isDownloadingContract={isDownloadingContract}
                  onDownload={handleDownloadContract}
                />
              </aside>
              {contract ? <ContractPdfRenderHost contract={contract} ref={contractPdfRef} /> : null}
            </div>
          </>
        ) : (
          <DealNotFound dealId={dealId} />
        )}
      </div>
      <DealDetailsToast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}

type DealNotFoundProps = {
  dealId: string;
};

function DealNotFound({ dealId }: DealNotFoundProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
      <AlertCircle className="mx-auto size-10 text-slate-400" />
      <h1 className="mt-4 text-2xl font-black text-slate-950">Deal not found</h1>
      <p className="mt-2 text-sm font-medium text-slate-500">
        We could not find a mock deal for <span className="font-black text-slate-700">{decodeURIComponent(dealId)}</span>.
      </p>
      <Link
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-700 px-5 text-sm font-black text-white transition hover:bg-emerald-800"
        href="/farmer/deals"
      >
        Back to Deals
      </Link>
    </section>
  );
}
