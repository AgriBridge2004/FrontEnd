import { BuyerDigitalContractPage } from "@/components/dashboard/buyer/deals/contract/BuyerDigitalContractPage";

type BuyerContractRouteProps = {
  params: {
    dealId: string;
  };
};

export default function BuyerContractRoute({ params }: BuyerContractRouteProps) {
  return <BuyerDigitalContractPage dealId={params.dealId} />;
}
