import { EmptyListings } from "@/components/dashboard/farmer/listings/EmptyListings";
import { ListingCard } from "@/components/dashboard/farmer/listings/ListingCard";
import type { FarmerListing } from "@/components/dashboard/farmer/listings/listings-types";

type ListingsGridProps = {
  listings: FarmerListing[];
};

export function ListingsGrid({ listings }: ListingsGridProps) {
  if (listings.length === 0) {
    return <EmptyListings />;
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </section>
  );
}
