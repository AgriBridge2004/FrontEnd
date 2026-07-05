"use client";

import type { ReactNode } from "react";
import { Grid3X3, List } from "lucide-react";

import { MARKETPLACE_SORT_OPTIONS } from "@/components/marketplace/marketplace.mock";
import type { MarketplaceSortOption, MarketplaceViewMode } from "@/components/marketplace/marketplace.types";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";

type MarketplaceProductsHeaderProps = {
  productCount: number;
  sort: MarketplaceSortOption;
  viewMode: MarketplaceViewMode;
  onSortChange: (sort: MarketplaceSortOption) => void;
  onViewModeChange: (viewMode: MarketplaceViewMode) => void;
};

export function MarketplaceProductsHeader({
  productCount,
  sort,
  viewMode,
  onSortChange,
  onViewModeChange,
}: MarketplaceProductsHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-base font-semibold text-slate-600">
        <span className="font-black text-emerald-800">{productCount}</span> products found
      </p>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <label className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-xs font-medium text-slate-500">
            Sort by:
          </span>
          <Select
            aria-label="Sort products"
            className="h-10 min-w-52 rounded-lg bg-emerald-50/50 pl-[70px] pr-8 text-[13px] font-black"
            onChange={(event) => onSortChange(event.target.value as MarketplaceSortOption)}
            value={sort}
          >
            {MARKETPLACE_SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </label>

        <div className="flex h-10 w-fit items-center gap-1 rounded-lg border border-slate-200 bg-emerald-50/50 p-1">
          <ViewButton
            ariaLabel="Grid view"
            isActive={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
          >
            <Grid3X3 className="size-4" />
          </ViewButton>
          <ViewButton
            ariaLabel="List view"
            isActive={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
          >
            <List className="size-4" />
          </ViewButton>
        </div>
      </div>
    </div>
  );
}

function ViewButton({
  ariaLabel,
  children,
  isActive,
  onClick,
}: {
  ariaLabel: string;
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "grid size-8 place-items-center rounded-md transition focus:outline-none focus:ring-2 focus:ring-emerald-700/20",
        isActive ? "bg-emerald-800 text-white" : "text-slate-500 hover:bg-white hover:text-emerald-900",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
