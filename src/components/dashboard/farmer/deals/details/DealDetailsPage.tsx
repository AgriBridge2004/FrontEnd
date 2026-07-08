"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { ContractPdfRenderHost } from "@/components/dashboard/farmer/deals/contract/ContractPdfRenderHost";
import { getDigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.mock";
import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";
import { farmerSidebarItems } from "@/components/dashboard/farmer/FarmerSidebarConfig";
import { farmerDashboardUser } from "@/components/dashboard/farmer/farmer-dashboard.mock";
import { ActivityTimeline } from "@/components/dashboard/farmer/deals/details/ActivityTimeline";
import { DealActionsCard } from "@/components/dashboard/farmer/deals/details/DealActionsCard";
import { DealDetailsToast } from "@/components/dashboard/farmer/deals/details/DealDetailsToast";
import { DealDocumentsCard } from "@/components/dashboard/farmer/deals/details/DealDocumentsCard";
import { DealHeader } from "@/components/dashboard/farmer/deals/details/DealHeader";
import { DealProgressStepper } from "@/components/dashboard/farmer/deals/details/DealProgressStepper";
import { DealSummaryCard } from "@/components/dashboard/farmer/deals/details/DealSummaryCard";
import { InspectionInfoCard } from "@/components/dashboard/farmer/deals/details/InspectionInfoCard";
import { InspectionNotice } from "@/components/dashboard/farmer/deals/details/InspectionNotice";
import { getDealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.mock";
import type { DealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { downloadContractPdf } from "@/lib/download-contract-pdf";
import { downloadDealContractPdf } from "@/lib/workflow-api";

type DealDetailsPageProps = {
  dealId: string;
  getContractById?: (dealId: string) => DigitalContract | undefined;
  getDealById?: (dealId: string) => DealDetail | undefined;
  role?: "buyer" | "farmer";
};

export function DealDetailsPage({ dealId, getContractById = getDigitalContract, getDealById = getDealDetail, role = "farmer" }: DealDetailsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloadingContract, setIsDownloadingContract] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const contractPdfRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deal = getDealById(dealId);
  const contract = getContractById(dealId);
  const routePrefix = role === "buyer" ? "/buyer" : "/farmer";
  const layoutConfig =
    role === "buyer"
      ? {
          navLinks: [
            { href: "/marketplace", label: "Marketplace" },
            { href: "/buyer/rfqs", label: "RFQ" },
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
            { href: "/farmer/rfqs", label: "RFQ" },
          ],
          profileHref: "/farmer/profile",
          searchPlaceholder: "Search by contract ID, product, or buyer name",
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

  async function handleDownloadContract() {
    if (!contract || isDownloadingContract) {
      showToast("Failed to generate contract PDF. Please try again.");
      return;
    }

    try {
      setIsDownloadingContract(true);
      try {
        const blob = await downloadDealContractPdf(contract.dealId);
        downloadBlob(blob, `AgriBridge-Contract-${contract.dealId}.pdf`);
      } catch {
        await downloadContractPdf(contractPdfRef.current, `AgriBridge-Contract-${contract.dealId}.pdf`);
      }
      showToast("Contract PDF downloaded successfully.");
    } catch {
      showToast("Failed to generate contract PDF. Please try again.");
    } finally {
      setIsDownloadingContract(false);
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
      <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-5 lg:px-6">
        {deal ? (
          <>
            <DealHeader deal={deal} dealsHref={`${routePrefix}/deals`} />
            <DealProgressStepper currentStage={deal.currentStage} />
            <InspectionNotice inspectionDate={deal.inspection.inspectionDate} />

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="min-w-0">
                <DealSummaryCard deal={deal} />
                <ActivityTimeline timeline={deal.timeline} />
              </div>
              <aside className="grid h-fit gap-5 lg:sticky lg:top-24 lg:self-start">
                <DealActionsCard
                  contractHref={`${routePrefix}/deals/${deal.id}/contract`}
                  dealId={deal.id}
                  messageHref={`${routePrefix}/messages`}
                  messageLabel={role === "buyer" ? "Message Farmer" : "Message Buyer"}
                />
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
          <DealNotFound backHref={`${routePrefix}/deals`} dealId={dealId} />
        )}
      </div>
      <DealDetailsToast message={toastMessage} />
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

type DealNotFoundProps = {
  backHref: string;
  dealId: string;
};

function DealNotFound({ backHref, dealId }: DealNotFoundProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
      <AlertCircle className="mx-auto size-10 text-slate-400" />
      <h1 className="mt-4 text-2xl font-black text-slate-950">Deal not found</h1>
      <p className="mt-2 text-sm font-medium text-slate-500">
        We could not find a mock deal for <span className="font-black text-slate-700">{decodeURIComponent(dealId)}</span>.
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
