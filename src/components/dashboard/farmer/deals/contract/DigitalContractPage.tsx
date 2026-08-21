"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { ContractDocument } from "@/components/dashboard/farmer/deals/contract/ContractDocument";
import { ContractHeader } from "@/components/dashboard/farmer/deals/contract/ContractHeader";
import { ContractMetaCard } from "@/components/dashboard/farmer/deals/contract/ContractMetaCard";
import { ContractPrintStyles } from "@/components/dashboard/farmer/deals/contract/ContractPrintStyles";
import { ContractTimelineCard } from "@/components/dashboard/farmer/deals/contract/ContractTimelineCard";
import { ContractToast } from "@/components/dashboard/farmer/deals/contract/ContractToast";
import { EscrowProtectionCard } from "@/components/dashboard/farmer/deals/contract/EscrowProtectionCard";
import { getDigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.mock";
import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";
import { farmerSidebarItems } from "@/components/dashboard/farmer/FarmerSidebarConfig";
import { farmerDashboardUser } from "@/components/dashboard/farmer/farmer-dashboard.mock";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { downloadContractPdf } from "@/lib/download-contract-pdf";
import { downloadDealContractPdf } from "@/lib/workflow-api";

type DigitalContractPageProps = {
  dealId: string;
  getContractById?: (dealId: string) => DigitalContract | undefined;
  role?: "buyer" | "farmer";
};

export function DigitalContractPage({ dealId, getContractById = getDigitalContract, role = "farmer" }: DigitalContractPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const contractRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contract = getContractById(dealId);
  const routePrefix = role === "buyer" ? "/buyer" : "/farmer";
  const layoutConfig =
    role === "buyer"
      ? {
          navLinks: [
            { href: "/marketplace", label: "Marketplace" },
            { href: "/rfq", label: "RFQ" },
          ],
          profileHref: "/buyer/profile",
          searchPlaceholder: "Search by product, farmer, or deal ID...",
          sidebarItems: buyerSidebarItems,
          userName: "Ramesh Kumar",
          userSubLabel: undefined,
        }
      : {
          navLinks: [
            { href: "/marketplace", label: "Marketplace" },
            { href: "/rfq", label: "RFQ" },
          ],
          profileHref: "/farmer/profile",
          searchPlaceholder: "Search RFQs, commodities...",
          sidebarItems: farmerSidebarItems,
          userName: farmerDashboardUser.name,
          userSubLabel: farmerDashboardUser.farm,
        };

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
      try {
        const blob = await downloadDealContractPdf(contract.dealId);
        downloadBlob(blob, `AgriBridge-Contract-${contract.dealId}.pdf`);
      } catch {
        await downloadContractPdf(contractRef.current, `AgriBridge-Contract-${contract.dealId}.pdf`);
      }
      showToast("Contract PDF downloaded successfully.");
    } catch {
      showToast("Failed to generate contract PDF. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  }

  return (
    <DashboardLayout
      navLinks={layoutConfig.navLinks}
      notificationCount={3}
      onSearchChange={setSearchQuery}
      profileHref={layoutConfig.profileHref}
      role={role}
      searchPlaceholder={layoutConfig.searchPlaceholder}
      searchValue={searchQuery}
      sidebarItems={layoutConfig.sidebarItems}
      userName={layoutConfig.userName}
      userSubLabel={layoutConfig.userSubLabel}
    >
      <ContractPrintStyles />
      <div className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-5 lg:px-7">
        {contract ? (
          <>
            <ContractHeader
              contract={contract}
              dealDetailsHref={`${routePrefix}/deals/${contract.dealId}`}
              dealsHref={`${routePrefix}/deals`}
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
          <ContractNotFound backHref={`${routePrefix}/deals`} dealId={dealId} />
        )}
      </div>
      <ContractToast message={toastMessage} />
    </DashboardLayout>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

type ContractNotFoundProps = {
  backHref: string;
  dealId: string;
};

function ContractNotFound({ backHref, dealId }: ContractNotFoundProps) {
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
        href={backHref}
      >
        Back to Deals
      </Link>
    </section>
  );
}
