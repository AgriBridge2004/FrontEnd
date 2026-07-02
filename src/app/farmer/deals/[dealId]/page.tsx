import { DealDetailsPage } from "@/components/farmer/deals/details/DealDetailsPage";

type FarmerDealDetailsRouteProps = {
  params: {
    dealId: string;
  };
};

export default function FarmerDealDetailsRoute({ params }: FarmerDealDetailsRouteProps) {
  return <DealDetailsPage dealId={params.dealId} />;
}
