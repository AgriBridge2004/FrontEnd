import { BuyerDealDetailsPage } from "@/components/dashboard/buyer/deals/details/BuyerDealDetailsPage";

type BuyerDealDetailsRouteProps = {
  params: {
    dealId: string;
  };
};

export default function BuyerDealDetailsRoute({ params }: BuyerDealDetailsRouteProps) {
  return <BuyerDealDetailsPage dealId={params.dealId} />;
}
