import type { FavoriteSortOption } from "@/components/dashboard/buyer/favorites/buyer-favorites.types";
import { FavoriteListingsFilters } from "@/components/dashboard/buyer/favorites/FavoriteListingsFilters";

type FavoriteListingsHeaderProps = {
  category: string;
  count: number;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: FavoriteSortOption) => void;
  sort: FavoriteSortOption;
};

export function FavoriteListingsHeader({ category, count, onCategoryChange, onSortChange, sort }: FavoriteListingsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-emerald-950">Favorite Listings</h1>
        <p className="mt-1 text-base font-medium text-slate-600">{count} Items Saved in your procurement shortlist</p>
      </div>

      <FavoriteListingsFilters category={category} onCategoryChange={onCategoryChange} onSortChange={onSortChange} sort={sort} />
    </div>
  );
}
