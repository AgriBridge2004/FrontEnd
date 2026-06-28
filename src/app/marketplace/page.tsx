
"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Package2,
  Grid2x2,
  List,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/format";


type Product = {
  id: number;
  name: string;
  verified: boolean;
  price: number;
  unit: string;
  quantity: string;
  location: string;
  grade: string;
  listingType: string;
  image: string;
};

type Category = {
  id: string;
  label: string;
  emoji: string;
};

type FilterState = Record<string, boolean>;

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    verified: true,
    price: 0.45,
    unit: "kg",
    quantity: "5,000",
    location: "Al Ain, UAE",
    grade: "Grade A",
    listingType: "Spot",
    image: "/images/marketplace/tomatoes.jpg",
  },
  {
    id: 2,
    name: "Premium Olives",
    verified: true,
    price: 1.25,
    unit: "kg",
    quantity: "2,000",
    location: "Ajloun, Jordan",
    grade: "Grade A",
    listingType: "Spot",
    image: "/images/marketplace/olives.jpg",
  },
  {
    id: 3,
    name: "Wheat",
    verified: true,
    price: 0.32,
    unit: "kg",
    quantity: "20,000",
    location: "Sharjah, UAE",
    grade: "Grade A",
    listingType: "Spot",
    image: "/images/marketplace/wheat.jpg",
  },
  {
    id: 4,
    name: "Fresh Citrus",
    verified: true,
    price: 0.6,
    unit: "kg",
    quantity: "3,500",
    location: "Valencia, Spain",
    grade: "Grade A",
    listingType: "Spot",
    image: "/images/marketplace/orange.jpg",
  },
];

const CATEGORIES: Category[] = [
  { id: "fruits", label: "Fruits", emoji: "🍎" },
  { id: "vegetables", label: "Vegetables", emoji: "🥦" },
  { id: "grains", label: "Grains & Cereals", emoji: "🌾" },
  { id: "oilseeds", label: "Oilseeds & Pulses", emoji: "🌻" },
  { id: "dairy", label: "Dairy & Eggs", emoji: "🥚" },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            {product.verified && (
              <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm" />
                Verified Farmer
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-900">{formatCurrency(product.price)}</span>
            <span className="text-sm text-slate-500">/ {product.unit}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              <Package2 size={14} /> Quantity
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">{product.quantity}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              <MapPin size={14} /> Location
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">{product.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">{product.grade}</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">{product.listingType}</span>
        </div>

        <button className="mt-auto rounded-3xl bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
          View Details
        </button>
      </div>
    </div>
  );
}

function FiltersSidebar() {
  const [checked, setChecked] = useState<FilterState>({});
  const [priceRange, setPriceRange] = useState({ min: 0.1, max: 10 });
  const [quantityRange, setQuantityRange] = useState({ min: 100, max: 100000 });
  const [listingType, setListingType] = useState<"spot" | "pre-harvest">("spot");

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="rounded-lg border border-slate-300 bg-slate-100 p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <SlidersHorizontal size={18} className="text-slate-700" />
        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
      </div>

      {/* Category Section */}
      <div className="mb-6 pb-6 border-b border-slate-300">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-700">Category</label>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category.id} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={!!checked[category.id]}
                onChange={() => toggle(category.id)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-700"
              />
              <span className="text-base">{category.emoji}</span>
              <span className="text-sm text-slate-600">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6 pb-6 border-b border-slate-300">
        <label className="text-sm font-semibold text-slate-700 block mb-3">Price (Usr d)</label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-700"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Min ${priceRange.min.toFixed(2)}</span>
          <span>Max ${priceRange.max.toFixed(2)}</span>
        </div>
      </div>

      {/* Quantity Section */}
      <div className="mb-6 pb-6 border-b border-slate-300">
        <label className="text-sm font-semibold text-slate-700 block mb-3">Quantity (dl )</label>
        <input
          type="range"
          min="100"
          max="100000"
          step="100"
          value={quantityRange.max}
          onChange={(e) => setQuantityRange({ ...quantityRange, max: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-700"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Min {formatNumber(quantityRange.min)}</span>
          <span>Max {formatNumber(quantityRange.max)}</span>
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-6 pb-6 border-b border-slate-300">
        <label className="text-sm font-semibold text-slate-700 block mb-3">Location</label>
        <button className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" />
            <span>Select location</span>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

      {/* Listing Type Section */}
      <div className="mb-6 pb-6 border-b border-slate-300">
        <label className="text-sm font-semibold text-slate-700 block mb-3">Listing Type</label>
        <div className="flex gap-3">
          <button
            onClick={() => setListingType("spot")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              listingType === "spot"
                ? "bg-emerald-700 text-white"
                : "border border-slate-300 bg-white text-slate-700"
            }`}
          >
            Spot
          </button>
          <button
            onClick={() => setListingType("pre-harvest")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              listingType === "pre-harvest"
                ? "bg-emerald-700 text-white"
                : "border border-slate-300 bg-white text-slate-700"
            }`}
          >
            Pre-Harvest
          </button>
        </div>
      </div>

      {/* Availability Section */}
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-3">Availability</label>
        <button className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-slate-400" />
            <span>Select date range</span>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </aside>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white">
      <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
        <span className="bg-emerald-800 text-white rounded-lg w-9 h-9 flex items-center justify-center text-base">
          🚜
        </span>
        AgriBridge
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        <a href="#" className="hover:text-emerald-800">How It Works</a>
        <a href="#" className="hover:text-emerald-800">FAQ</a>
        <a href="#" className="text-emerald-800 border-b-2 border-emerald-800 pb-1">Marketplace</a>
        <a href="#" className="hover:text-emerald-800">RFQ</a>
      </nav>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 font-medium">
          <span className="text-emerald-800">EN</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">AR</span>
        </div>
        <button className="px-4 py-2 rounded-full bg-gray-100 font-medium text-gray-800">
          Login
        </button>
        <button className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-900 font-medium">
          Get Started
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/marketplace/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      <div className="relative px-8 py-16 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Marketplace</h1>
        <p className="text-lg text-gray-600">Browse verified products from local farmers</p>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}) {
  const buildPages = () => {
    if (lastPage <= 7) {
      return Array.from({ length: lastPage }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "dots", lastPage] as (number | "dots")[];
    }

    if (currentPage >= lastPage - 3) {
      return [1, "dots", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage] as (number | "dots")[];
    }

    return [
      1,
      "dots",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "dots",
      lastPage,
    ] as (number | "dots")[];
  };

  const pages = buildPages();
  const isFirst = currentPage === 1;
  const isLast = currentPage === lastPage;

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <button
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        disabled={isFirst}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-gray-400 ${
          isFirst ? "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed" : "border-gray-200 hover:border-emerald-800 hover:text-emerald-800"
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, index) =>
        page === "dots" ? (
          <span key={`dots-${index}`} className="px-1 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium ${
              currentPage === page
                ? "bg-emerald-800 text-white"
                : "border border-gray-200 text-gray-600 hover:border-emerald-800 hover:text-emerald-800"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        disabled={isLast}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-gray-400 ${
          isLast ? "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed" : "border-gray-200 hover:border-emerald-800 hover:text-emerald-800"
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function AgriBridgeMarketplace() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 25;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <Hero />

      <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 max-w-7xl mx-auto">
        <FiltersSidebar />

        <main>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-700">
              <span className="font-bold text-gray-900">248</span> products found
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Sort by:</span>
                <button className="flex items-center gap-1 font-medium text-gray-800">
                  Newest <ChevronDown size={14} />
                </button>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md ${view === "grid" ? "bg-emerald-800 text-white" : "text-gray-500"}`}
                >
                  <Grid2x2 size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md ${view === "list" ? "bg-emerald-800 text-white" : "text-gray-500"}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
        </main>
      </div>
    </div>
  );
}