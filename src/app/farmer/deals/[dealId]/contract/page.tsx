import { DigitalContractPage } from "@/components/dashboard/farmer/deals/contract/DigitalContractPage";

type FarmerContractRouteProps = {
  params: {
    dealId: string;
  };
};

export default function FarmerContractRoute({ params }: FarmerContractRouteProps) {
  return <DigitalContractPage dealId={params.dealId} />;
}
