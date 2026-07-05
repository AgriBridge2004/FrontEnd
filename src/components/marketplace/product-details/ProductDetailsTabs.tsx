"use client";

import type { ReactNode } from "react";
import { FileText, Star, User } from "lucide-react";

import type { ProductDetailsTab } from "@/components/marketplace/product-details/marketplace-product-details.types";
import { cn } from "@/lib/cn";

type ProductDetailsTabsProps = {
  activeTab: ProductDetailsTab;
  reviewsCount: number;
  onTabChange: (tab: ProductDetailsTab) => void;
};

const tabs: Array<{ id: ProductDetailsTab; label: string; icon: ReactNode }> = [
  { id: "details", label: "Details", icon: <FileText className="size-3.5" /> },
  { id: "farmer", label: "Farmer Profile", icon: <User className="size-3.5" /> },
  { id: "reviews", label: "Reviews", icon: <Star className="size-3.5" /> },
];

export function ProductDetailsTabs({ activeTab, reviewsCount, onTabChange }: ProductDetailsTabsProps) {
  return (
    <div className="border-b border-slate-200">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const label = tab.id === "reviews" ? `${tab.label} (${reviewsCount})` : tab.label;

          return (
            <button
              className={cn(
                "inline-flex h-[52px] shrink-0 items-center gap-2 rounded-t-xl border border-b-0 px-6 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-emerald-700/20",
                isActive
                  ? "border-emerald-100 bg-white text-emerald-800 shadow-sm"
                  : "border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-900",
              )}
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              {tab.icon}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
