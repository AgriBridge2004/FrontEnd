"use client";

import { DigitalContractPage } from "@/components/dashboard/farmer/deals/contract/DigitalContractPage";
import { getDigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.mock";
import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";

type BuyerDigitalContractPageProps = {
  dealId: string;
};

function getBuyerDigitalContract(dealId: string): DigitalContract | undefined {
  const requestedDealId = decodeURIComponent(dealId).toUpperCase();
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

export function BuyerDigitalContractPage({ dealId }: BuyerDigitalContractPageProps) {
  // TODO: Connect Buyer Deal Contract to API when buyer deal endpoint is ready.
  return <DigitalContractPage dealId={dealId} getContractById={getBuyerDigitalContract} role="buyer" />;
}
