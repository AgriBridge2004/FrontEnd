import { FarmerListingDetailsPage } from "@/components/dashboard/farmer/listings/FarmerListingDetailsPage";

export default function FarmerListingDetailsRoute({ params }: { params: { listingId: string } }) {
  return <FarmerListingDetailsPage listingId={params.listingId} />;
}
