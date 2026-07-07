import { FarmerListingEditPage } from "@/components/dashboard/farmer/listings/FarmerListingEditPage";

export default function EditFarmerListingRoute({ params }: { params: { listingId: string } }) {
  return <FarmerListingEditPage listingId={params.listingId} />;
}
