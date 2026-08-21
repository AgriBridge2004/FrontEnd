"use client";

import { DealDetailsPage } from "@/components/dashboard/farmer/deals/details/DealDetailsPage";
import { getDigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.mock";
import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";
import { getDealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.mock";
import type { DealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.types";

type BuyerDealDetailsPageProps = {
  dealId: string;
};

function normalizeBuyerDealId(dealId: string) {
  return decodeURIComponent(dealId).toUpperCase();
}

function getBuyerDealDetail(dealId: string): DealDetail | undefined {
  const requestedDealId = normalizeBuyerDealId(dealId);
  const deal = getDealDetail(requestedDealId) ?? getDealDetail("DEAL-1042");

  if (!deal) {
    return undefined;
  }

  return { ...deal, id: requestedDealId };
}

function getBuyerDigitalContract(dealId: string): DigitalContract | undefined {
  const requestedDealId = normalizeBuyerDealId(dealId);
  const contract = getDigitalContract(requestedDealId) ?? getDigitalContract("DEAL-1042");

  if (!contract) {
    return undefined;
  }

  return {
    ...contract,
    contractId: contract.contractId.replace(contract.dealId, requestedDealId),
    dealId: requestedDealId,
    title: `Digital Contract ${requestedDealId}`,
  };
}

export function BuyerDealDetailsPage({ dealId }: BuyerDealDetailsPageProps) {
  // TODO: Connect Buyer Deal Details to API when buyer deal endpoint is ready.
  return <DealDetailsPage dealId={dealId} getContractById={getBuyerDigitalContract} getDealById={getBuyerDealDetail} role="buyer" />;
}
