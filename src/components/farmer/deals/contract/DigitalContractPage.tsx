"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { ContractDocument } from "@/components/farmer/deals/contract/ContractDocument";
import { ContractHeader } from "@/components/farmer/deals/contract/ContractHeader";
import { ContractMetaCard } from "@/components/farmer/deals/contract/ContractMetaCard";
import { ContractPrintStyles } from "@/components/farmer/deals/contract/ContractPrintStyles";
import { ContractTimelineCard } from "@/components/farmer/deals/contract/ContractTimelineCard";
import { ContractToast } from "@/components/farmer/deals/contract/ContractToast";
import { EscrowProtectionCard } from "@/components/farmer/deals/contract/EscrowProtectionCard";
import { getDigitalContract } from "@/components/farmer/deals/contract/contract.mock";
import { downloadContractPdf } from "@/lib/download-contract-pdf";

type DigitalContractPageProps = {
  dealId: string;
};

export function DigitalContractPage({ dealId }: DigitalContractPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const contractRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  function handlePrint() {
    // TODO: Add richer print-only formatting if legal export requirements expand.
    window.print();
  }

  async function handleDownloadPdf() {
    if (!contract || isDownloadingPdf) {
      return;
    }

    try {
      setIsDownloadingPdf(true);
      await downloadContractPdf(contractRef.current, `AgriBridge-Contract-${contract.dealId}.pdf`);
      showToast("Contract PDF downloaded successfully.");
    } catch {
      showToast("Failed to generate contract PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  }

  return (
    <FarmerDashboardLayout
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search RFQs, commodities..."
      searchValue={searchQuery}
    >
      <ContractPrintStyles />
      <div className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-5 lg:px-7">
        {contract ? (
          <>
            <ContractHeader
              contract={contract}
              isDownloadingPdf={isDownloadingPdf}
              onDownloadPdf={handleDownloadPdf}
              onPrint={handlePrint}
            />
            <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
              <div id="digital-contract-print-area" ref={contractRef}>
                <ContractDocument contract={contract} />
              </div>
              <aside className="grid h-fit gap-6 lg:sticky lg:top-24 lg:self-start print:hidden">
                <ContractTimelineCard timeline={contract.timeline} />
                <EscrowProtectionCard onViewTerms={() => showToast("Protection terms will be connected later.")} />
                <ContractMetaCard meta={contract.meta} />
              </aside>
            </div>
          </>
        ) : (
          <ContractNotFound dealId={dealId} />
        )}
      </div>
      <ContractToast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}

type ContractNotFoundProps = {
  dealId: string;
};

function ContractNotFound({ dealId }: ContractNotFoundProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
      <AlertCircle className="mx-auto size-10 text-slate-400" />
      <h1 className="mt-4 text-2xl font-black text-slate-950">Contract not found</h1>
      <p className="mt-2 text-sm font-medium text-slate-500">
        We could not find a mock contract for{" "}
        <span className="font-black text-slate-700">{decodeURIComponent(dealId)}</span>.
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
