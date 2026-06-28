"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";

import { farmerDashboardUser } from "@/lib/mock-data";

type FarmerTopbarProps = {
  onMenuClick: () => void;
  searchPlaceholder?: string;
};

export function FarmerTopbar({
  onMenuClick,
  searchPlaceholder = "Search listing, contracts, or buyers...",
}: FarmerTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-5 lg:px-7">
        <button
          aria-label="Open sidebar"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden h-11 w-full max-w-[360px] items-center gap-2.5 rounded-full border border-slate-300 bg-stone-50 px-4 md:flex">
          <Search className="size-[18px] shrink-0 text-slate-600" />
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-500"
            placeholder={searchPlaceholder}
            type="search"
          />
        </div>

        <div className="ml-auto hidden h-full items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          <Link className="transition hover:text-emerald-800" href="/marketplace">
            Marketplace
          </Link>
          <Link className="transition hover:text-emerald-800" href="/farmer/rfqs">
            RFQ
          </Link>
        </div>

        <div className="ml-auto flex h-full items-center gap-3 md:ml-0">
          <button className="relative grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100" type="button">
            <Bell className="size-[18px]" />
            <span className="absolute right-1 top-0.5 grid size-4 place-items-center rounded-full bg-red-500 text-[9px] font-black text-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="relative size-9 overflow-hidden rounded-full bg-emerald-900">
              <Image alt="Farmer profile avatar" className="object-cover p-1" fill sizes="36px" src="/images/brand/agribridge-logo.png" />
            </span>
            <div className="hidden sm:block">
              <p className="text-[13px] font-black leading-4 text-slate-900">{farmerDashboardUser.name}</p>
              <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">{farmerDashboardUser.farm}</p>
            </div>
            <ChevronDown className="hidden size-3.5 text-slate-400 sm:block" />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-2.5 md:hidden">
        <div className="flex h-10 items-center gap-3 rounded-full border border-slate-300 bg-stone-50 px-4">
          <Search className="size-4 shrink-0 text-slate-600" />
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
            placeholder={searchPlaceholder}
            type="search"
          />
        </div>
      </div>
    </header>
  );
}
