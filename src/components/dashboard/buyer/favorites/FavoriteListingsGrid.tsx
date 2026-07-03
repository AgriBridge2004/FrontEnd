import type { BuyerFavoriteListing } from "@/components/dashboard/buyer/favorites/buyer-favorites.types";
import { FavoriteListingCard } from "@/components/dashboard/buyer/favorites/FavoriteListingCard";

type FavoriteListingsGridProps = {
  listings: BuyerFavoriteListing[];
  onAddToRequest: (listing: BuyerFavoriteListing) => void;
  onRemove: (listingId: string) => void;
  onViewDetails: (listing: BuyerFavoriteListing) => void;
};

export function FavoriteListingsGrid({ listings, onAddToRequest, onRemove, onViewDetails }: FavoriteListingsGridProps) {
  return (
    <div className="grid justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <FavoriteListingCard
          key={listing.id}
          listing={listing}
          onAddToRequest={onAddToRequest}
          onRemove={onRemove}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
