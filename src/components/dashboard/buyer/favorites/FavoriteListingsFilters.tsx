"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

import type { FavoriteSortOption } from "@/components/dashboard/buyer/favorites/buyer-favorites.types";

export const favoriteCategories = ["All Categories", "Vegetables", "Grains", "Fruits", "Coffee", "Olives"] as const;

export const favoriteSortOptions: Array<{ label: string; value: FavoriteSortOption }> = [
  { label: "Recently Added", value: "recent" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Availability", value: "availability" },
];

type FavoriteListingsFiltersProps = {
  category: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: FavoriteSortOption) => void;
  sort: FavoriteSortOption;
};

export function FavoriteListingsFilters({ category, onCategoryChange, onSortChange, sort }: FavoriteListingsFiltersProps) {
  const selectedSort = favoriteSortOptions.find((option) => option.value === sort)?.label ?? "Recently Added";

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/30 hover:text-emerald-800"
        type="button"
      >
        <SlidersHorizontal className="size-4" />
        Filter
      </button>

      <label className="relative h-11 min-w-[190px]">
        <span className="sr-only">Category</span>
        <select
          className="h-full w-full appearance-none rounded-lg border border-emerald-100 bg-white px-4 pr-9 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={category}
        >
          {favoriteCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      </label>

      <label className="relative h-11 min-w-[230px]">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm font-medium text-slate-600">Sort by:</span>
        <select
          aria-label={`Sort by ${selectedSort}`}
          className="h-full w-full appearance-none rounded-lg border border-emerald-100 bg-white pl-[92px] pr-9 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          onChange={(event) => onSortChange(event.target.value as FavoriteSortOption)}
          value={sort}
        >
          {favoriteSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute left-[82px] top-1/2 h-6 w-px -translate-y-1/2 bg-slate-200" />
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
      </label>
    </div>
  );
}
