"use client";

import { Calendar, ChevronDown, MapPin, RotateCcw, SlidersHorizontal } from "lucide-react";

import type { MarketplaceCategory, MarketplaceFiltersState, MarketplaceListingType } from "@/components/marketplace/marketplace.types";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/cn";

type MarketplaceFiltersProps = {
  filters: MarketplaceFiltersState;
  onFiltersChange: (filters: MarketplaceFiltersState) => void;
};

const listingTypes: MarketplaceListingType[] = ["Spot", "Pre-Harvest"];
const marketplaceCategories: MarketplaceCategory[] = ["Fruits", "Vegetables", "Nuts", "Herbs", "Grains", "Meat", "Dairy", "Eggs", "Honey"];
const marketplaceLocations = ["All locations", "Gaza", "North Gaza", "Khan Yunis", "Rafah", "Deir al-Balah"];

export function MarketplaceFilters({ filters, onFiltersChange }: MarketplaceFiltersProps) {
  function updateFilters(nextFilters: Partial<MarketplaceFiltersState>) {
    onFiltersChange({ ...filters, ...nextFilters });
  }

  function toggleCategory(category: MarketplaceCategory) {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category];

    updateFilters({ categories });
  }

  return (
    <aside className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 shadow-sm lg:sticky lg:top-24 lg:h-fit">
      <div className="flex items-center gap-2.5 border-b border-emerald-100 pb-4">
        <SlidersHorizontal className="size-[18px] text-slate-500" />
        <h2 className="text-[15px] font-black text-slate-900">Filters</h2>
      </div>

      <div className="mt-6 space-y-6">
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-[13px] font-black text-slate-700">Category</h3>
            <ChevronDown className="size-4 text-slate-400" />
          </div>
          <div className="grid gap-2.5">
            {marketplaceCategories.map((category) => (
              <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-slate-600" key={category}>
                <input
                  checked={filters.categories.includes(category)}
                  className="size-3.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                  onChange={() => toggleCategory(category)}
                  type="checkbox"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </section>

        <RangeFilter
          label="Price"
          max={10}
          min={0.1}
          minLabel="$0.10"
          maxLabel="$10.00"
          step={0.1}
          value={filters.priceMax}
          onChange={(value) => updateFilters({ priceMax: value })}
        />

        <RangeFilter
          label="Quantity"
          max={100000}
          min={100}
          minLabel="100"
          maxLabel="100,000"
          step={100}
          value={filters.quantityMax}
          onChange={(value) => updateFilters({ quantityMax: value })}
        />

        <section>
          <h3 className="mb-2.5 text-[13px] font-black text-slate-700">Location</h3>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Select
              className="h-10 rounded-lg bg-white pl-9 pr-8 text-[13px] text-slate-600"
              onChange={(event) => updateFilters({ location: event.target.value })}
              value={filters.location}
            >
              {marketplaceLocations.map((location) => (
                <option key={location} value={location}>
                  {location === "All locations" ? "Select location" : location}
                </option>
              ))}
            </Select>
          </div>
        </section>

        <section>
          <h3 className="mb-2.5 text-[13px] font-black text-slate-700">Listing Type</h3>
          <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
            {listingTypes.map((type) => (
              <button
                className={cn(
                  "h-9 rounded-lg text-[11px] font-black transition focus:outline-none focus:ring-2 focus:ring-emerald-700/20",
                  filters.listingType === type
                    ? "bg-white text-emerald-900 shadow-sm"
                    : "text-slate-500 hover:text-emerald-900",
                )}
                key={type}
                onClick={() => updateFilters({ listingType: type })}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <h3 className="text-[13px] font-black text-slate-700">Availability</h3>
            {filters.availableFrom || filters.availableTo ? (
              <button
                className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 transition hover:text-emerald-950"
                onClick={() => updateFilters({ availableFrom: "", availableTo: "" })}
                type="button"
              >
                <RotateCcw className="size-3" />
                Clear
              </button>
            ) : null}
          </div>
          <div className="grid gap-2.5">
            <DateInput
              label="Available From"
              onChange={(value) => updateFilters({ availableFrom: value })}
              value={filters.availableFrom}
            />
            <DateInput
              label="Available To"
              onChange={(value) => updateFilters({ availableTo: value })}
              value={filters.availableTo}
            />
          </div>
        </section>
      </div>
    </aside>
  );
}

function RangeFilter({
  label,
  max,
  maxLabel,
  min,
  minLabel,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  maxLabel: string;
  min: number;
  minLabel: string;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    <section>
      <h3 className="mb-4 text-[13px] font-black text-slate-700">{label}</h3>
      <input
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-emerald-800 accent-emerald-800"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
      <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-400">
        <span>
          Min
          <br />
          {minLabel}
        </span>
        <span className="text-right">
          Max
          <br />
          {maxLabel}
        </span>
      </div>
    </section>
  );
}

function DateInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-black uppercase text-slate-500">{label}</span>
      <span className="relative block">
        <Calendar className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        <input
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13px] font-medium text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          onChange={(event) => onChange(event.target.value)}
          type="date"
          value={value}
        />
      </span>
    </label>
  );
}
