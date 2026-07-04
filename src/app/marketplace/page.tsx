
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  ShieldCheck,
} from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/format";
import { PRODUCTS as RICH_PRODUCTS } from "@/lib/data"; 
import { Language } from "@/types/types"; // سيقرأ من src/types/index.ts
import ProductDetails from "@/components/shared/ProductDetails"; // المسار الصحيح في مشروعك

type Product = {
  id: number;
  name: string;
  nameAr: string;
  verified: boolean;
  price: number;
  unit: string;
  unitAr: string;
  quantity: string;
  quantityAr: string;
  location: string;
  locationAr: string;
  grade: string;
  gradeAr: string;
  listingType: string;
  listingTypeAr: string;
  image: string;
};

type Category = {
  id: string;
  label: string;
  labelAr: string;
  emoji: string;
};

type FilterState = Record<string, boolean>;

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    nameAr: "طماطم طازجة",
    verified: true,
    price: 0.45,
    unit: "kg",
    unitAr: "كجم",
    quantity: "5,000",
    quantityAr: "٥,٠٠٠",
    location: "Al Ain, UAE",
    locationAr: "العين، الإمارات",
    grade: "Grade A",
    gradeAr: "درجة أ",
    listingType: "Spot",
    listingTypeAr: "فوري",
    image: "/images/marketplace/tomatoes.jpg",
  },
  {
    id: 2,
    name: "Premium Olives",
    nameAr: "زيتون بلدي ممتاز",
    verified: true,
    price: 1.25,
    unit: "kg",
    unitAr: "كجم",
    quantity: "2,000",
    quantityAr: "٢,٠٠٠",
    location: "Ajloun, Jordan",
    locationAr: "عجلون، الأردن",
    grade: "Grade A",
    gradeAr: "درجة أ",
    listingType: "Spot",
    listingTypeAr: "فوري",
    image: "/images/marketplace/olives.jpg",
  },
  {
    id: 3,
    name: "Wheat",
    nameAr: "القمح الذهبي",
    verified: true,
    price: 0.32,
    unit: "kg",
    unitAr: "كجم",
    quantity: "20,000",
    quantityAr: "٢٠,٠٠٠",
    location: "Sharjah, UAE",
    locationAr: "الشارقة، الإمارات",
    grade: "Grade A",
    gradeAr: "درجة أ",
    listingType: "Spot",
    listingTypeAr: "فوري",
    image: "/images/marketplace/wheat.jpg",
  },
  {
    id: 4,
    name: "Fresh Citrus",
    nameAr: "حمضيات فالنسيا الطازجة",
    verified: true,
    price: 0.60,
    unit: "kg",
    unitAr: "كجم",
    quantity: "3,500",
    quantityAr: "٣,٥٠٠",
    location: "Valencia, Spain",
    locationAr: "فالنسيا، إسبانيا",
    grade: "Grade A",
    gradeAr: "درجة أ",
    listingType: "Spot",
    listingTypeAr: "فوري",
    image: "/images/marketplace/orange.jpg",
  },
];

const CATEGORIES: Category[] = [
  { id: "fruits", label: "Fruits", labelAr: "الفواكه", emoji: "🍎" },
  { id: "vegetables", label: "Vegetables", labelAr: "الخضروات", emoji: "🥦" },
  { id: "grains", label: "Grains & Cereals", labelAr: "الحبوب والقمح", emoji: "🌾" },
  { id: "oilseeds", label: "Oilseeds & Pulses", labelAr: "البقوليات والزيوت", emoji: "🌻" },
  { id: "dairy", label: "Dairy & Eggs", labelAr: "الألبان والبيض", emoji: "🥚" },
];

const LOCATIONS = [
  "Al Ain, UAE",
  "Ajloun, Jordan",
  "Sharjah, UAE",
  "Valencia, Spain",
];

const LOCATIONS_AR: Record<string, string> = {
  "Al Ain, UAE": "العين، الإمارات",
  "Ajloun, Jordan": "عجلون، الأردن",
  "Sharjah, UAE": "الشارقة، الإمارات",
  "Valencia, Spain": "فالنسيا، إسبانيا",
};

const AVAILABILITY_OPTIONS = [
  "Next 7 days",
  "Next 30 days",
  "This month",
  "Anytime",
];

const AVAILABILITY_OPTIONS_AR: Record<string, string> = {
  "Next 7 days": "الـ ٧ أيام القادمة",
  "Next 30 days": "الـ ٣٠ يوماً القادمة",
  "This month": "هذا الشهر",
  "Anytime": "في أي وقت",
};

const mapToDetailProduct = (product: Product) => {
  if (product.id === 1 || product.name.toLowerCase().includes("tomatoes")) {
    return RICH_PRODUCTS.find(p => p.id === 'fresh-organic-tomatoes');
  } else if (product.id === 2 || product.name.toLowerCase().includes("olives")) {
    return RICH_PRODUCTS.find(p => p.id === 'premium-olives');
  } else if (product.id === 3 || product.name.toLowerCase().includes("wheat")) {
    return RICH_PRODUCTS.find(p => p.id === 'wheat-grains');
  } else if (product.id === 4 || product.name.toLowerCase().includes("citrus") || product.name.toLowerCase().includes("orange")) {
    return RICH_PRODUCTS.find(p => p.id === 'fresh-citrus');
  }
  return RICH_PRODUCTS[0];
};

function ProductCardComponent({
  product,
  view,
  onViewDetails,
  language,
}: {
  key?: React.Key;
  product: Product;
  view: "grid" | "list";
  onViewDetails: (product: Product) => void;
  language: Language;
}) {
  const isRtl = language === 'ar';
  const name = isRtl ? product.nameAr : product.name;
  const unit = isRtl ? product.unitAr : product.unit;
  const quantity = isRtl ? product.quantityAr : product.quantity;
  const location = isRtl ? product.locationAr : product.location;
  const grade = isRtl ? product.gradeAr : product.grade;
  const listingType = isRtl ? product.listingTypeAr : product.listingType;

  if (view === "list") {
    return (
      <div className="flex flex-col sm:flex-row overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)] group hover:border-brand-300 transition-all duration-300">
        <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden bg-slate-100">
          <img src={product.image} alt={name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors">{name}</h3>
              {product.verified && (
                <div className="mt-1.5 inline-flex items-center gap-2 text-xs font-semibold text-brand-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-xs animate-pulse" />
                  {isRtl ? "مزارع معتمد" : "Verified Farmer"}
                </div>
              )}
            </div>
            <div className={isRtl ? "text-left" : "text-right"}>
              <div className="text-2xl font-black text-brand-800">{formatCurrency(product.price)}</div>
              <div className="text-xs font-semibold text-slate-500">/ {unit}</div>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <Package2 size={14} className="text-brand-600" /> {isRtl ? "الكمية" : "Quantity"}
              </div>
              <p className="mt-1 text-sm font-extrabold text-slate-800">{quantity} {unit}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <MapPin size={14} className="text-brand-600" /> {isRtl ? "الموقع" : "Location"}
              </div>
              <p className="mt-1 text-sm font-extrabold text-slate-800 truncate">{location}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-50 border border-brand-100 px-3.5 py-1 text-xs font-bold text-brand-800">{grade}</span>
            <span className="rounded-full bg-amber-50 border border-amber-100 px-3.5 py-1 text-xs font-bold text-amber-800">{listingType}</span>
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="mt-2 sm:mt-auto self-start rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-800 shadow-xs cursor-pointer"
          >
            {isRtl ? "عرض التفاصيل" : "View Details"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)] group hover:border-brand-300 transition-all duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img src={product.image} alt={name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1.5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors">{name}</h3>
            {product.verified && (
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-xs animate-pulse" />
                {isRtl ? "مزارع معتمد" : "Verified Farmer"}
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-brand-800">{formatCurrency(product.price)}</span>
            <span className="text-xs font-semibold text-slate-500">/ {unit}</span>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <Package2 size={14} className="text-brand-600" /> {isRtl ? "الكمية" : "Quantity"}
            </div>
            <p className="mt-1 text-sm font-extrabold text-slate-800">{quantity} {unit}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <MapPin size={14} className="text-brand-600" /> {isRtl ? "الموقع" : "Location"}
            </div>
            <p className="mt-1 text-sm font-extrabold text-slate-800 truncate">{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-50 border border-brand-100 px-3 py-1 text-xs font-bold text-brand-800">{grade}</span>
          <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{listingType}</span>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="mt-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-800 shadow-xs cursor-pointer"
        >
          {isRtl ? "عرض التفاصيل" : "View Details"}
        </button>
      </div>
    </div>
  );
}

function FiltersSidebarComponent({
  language,
}: {
  language: Language;
}) {
  const isRtl = language === 'ar';
  const [checked, setChecked] = useState<FilterState>({});
  const [priceRange, setPriceRange] = useState({ min: 0.1, max: 10 });
  const [quantityRange, setQuantityRange] = useState({ min: 100, max: 100000 });
  const [listingType, setListingType] = useState<"spot" | "pre-harvest">("spot");
  
  const initialLocationText = isRtl ? "اختر الموقع" : "Select location";
  const initialAvailabilityText = isRtl ? "اختر نطاق التاريخ" : "Select date range";
  
  const [location, setLocation] = useState(initialLocationText);
  const [availability, setAvailability] = useState(initialAvailabilityText);
  const [locationOpen, setLocationOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const selectLocation = (value: string) => {
    setLocation(isRtl ? LOCATIONS_AR[value] || value : value);
    setLocationOpen(false);
  };

  const selectAvailability = (value: string) => {
    setAvailability(isRtl ? AVAILABILITY_OPTIONS_AR[value] || value : value);
    setAvailabilityOpen(false);
  };

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs h-fit" id="filters-sidebar-container">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
        <SlidersHorizontal size={18} className="text-brand-800" />
        <h3 className="font-display font-extrabold text-base text-slate-900">
          {isRtl ? "تصفية المنتجات" : "Filters"}
        </h3>
      </div>

      {/* Category Section */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-700">{isRtl ? "الفئات" : "Category"}</label>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
        <div className="space-y-2.5">
          {CATEGORIES.map((category) => (
            <label key={category.id} className="flex cursor-pointer items-center gap-3 group text-slate-600 hover:text-slate-800">
              <input
                type="checkbox"
                checked={!!checked[category.id]}
                onChange={() => toggle(category.id)}
                className="h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-500 focus:ring-2"
              />
              <span className="text-base">{category.emoji}</span>
              <span className="text-sm font-semibold">{isRtl ? category.labelAr : category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <label className="text-sm font-bold text-slate-700 block mb-3">
          {isRtl ? "السعر (دولار/كجم)" : "Price (USD/kg)"}
        </label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-700"
        />
        <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
          <span>Min ${priceRange.min.toFixed(2)}</span>
          <span>Max ${priceRange.max.toFixed(2)}</span>
        </div>
      </div>

      {/* Quantity Section */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <label className="text-sm font-bold text-slate-700 block mb-3">
          {isRtl ? "الكمية المطلوبة" : "Quantity (kg)"}
        </label>
        <input
          type="range"
          min="100"
          max="100000"
          step="100"
          value={quantityRange.max}
          onChange={(e) => setQuantityRange({ ...quantityRange, max: parseInt(e.target.value) })}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-700"
        />
        <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
          <span>Min {formatNumber(quantityRange.min)}</span>
          <span>Max {formatNumber(quantityRange.max)}</span>
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <label className="text-sm font-bold text-slate-700 block mb-3">{isRtl ? "الموقع" : "Location"}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setLocationOpen((prev) => !prev);
              setAvailabilityOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-600" />
              <span>{location}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {locationOpen && (
            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg animate-in fade-in duration-150">
              {LOCATIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectLocation(option)}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-50 last:border-none"
                >
                  <MapPin size={14} className="text-brand-500" />
                  {isRtl ? LOCATIONS_AR[option] || option : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Listing Type Section */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <label className="text-sm font-bold text-slate-700 block mb-3">{isRtl ? "نوع العرض" : "Listing Type"}</label>
        <div className="flex gap-2.5">
          <button
            onClick={() => setListingType("spot")}
            className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              listingType === "spot"
                ? "bg-brand-700 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {isRtl ? "فوري" : "Spot"}
          </button>
          <button
            onClick={() => setListingType("pre-harvest")}
            className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              listingType === "pre-harvest"
                ? "bg-brand-700 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {isRtl ? "قبل الحصاد" : "Pre-Harvest"}
          </button>
        </div>
      </div>

      {/* Availability Section */}
      <div>
        <label className="text-sm font-bold text-slate-700 block mb-3">{isRtl ? "التوفر" : "Availability"}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setAvailabilityOpen((prev) => !prev);
              setLocationOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2">
              <CalendarDays size={14} className="text-brand-600" />
              <span>{availability}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {availabilityOpen && (
            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg animate-in fade-in duration-150">
              {AVAILABILITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectAvailability(option)}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-50 last:border-none"
                >
                  <CalendarDays size={14} className="text-brand-500" />
                  {isRtl ? AVAILABILITY_OPTIONS_AR[option] || option : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavbarComponent({
  language,
  setLanguage,
  onGoToMarketplace,
}: {
  language: Language;
  setLanguage: (lang: Language) => void;
  onGoToMarketplace: () => void;
}) {
  const isRtl = language === 'ar';
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 shadow-xs">
      <div 
        onClick={onGoToMarketplace}
        className="flex items-center gap-2.5 font-display font-extrabold text-2xl tracking-tight text-slate-900 cursor-pointer group"
      >
        <span className="bg-brand-800 text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg shadow-md shadow-brand-100 group-hover:bg-brand-700 transition-colors">
          🚜
        </span>
        <span className="group-hover:text-brand-800 transition-colors">AgriBridge</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
        <a href="#how-it-works" onClick={onGoToMarketplace} className="hover:text-brand-800 transition-colors">{isRtl ? "كيف نعمل" : "How It Works"}</a>
        <a href="#faq" onClick={onGoToMarketplace} className="hover:text-brand-800 transition-colors">{isRtl ? "الأسئلة الشائعة" : "FAQ"}</a>
        <a href="#marketplace" onClick={(e) => { e.preventDefault(); onGoToMarketplace(); }} className="text-brand-800 border-b-2 border-brand-800 pb-1">{isRtl ? "السوق الإلكتروني" : "Marketplace"}</a>
        <a href="#rfq" onClick={onGoToMarketplace} className="hover:text-brand-800 transition-colors">{isRtl ? "طلب عروض أسعار" : "RFQ"}</a>
      </nav>

      <div className="flex items-center gap-5 text-sm">
        {/* Bilingual Lang Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200/50">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              language === 'ar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            عربي
          </button>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all font-bold text-slate-700 cursor-pointer">
          {isRtl ? "تسجيل الدخول" : "Login"}
        </button>
        
        <button className="px-5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-all text-brand-800 font-bold cursor-pointer">
          {isRtl ? "البدء الآن" : "Get Started"}
        </button>
      </div>
    </header>
  );
}

function HeroComponent({ language }: { language: Language }) {
  const isRtl = language === 'ar';
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center min-h-[180px] flex items-center"
      style={{ backgroundImage: "url('/images/marketplace/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      <div className="relative px-8 py-12 max-w-2xl ml-[1cm]">
        <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 mb-2">
          {isRtl ? "السوق الإلكتروني" : "Marketplace"}
        </h1>
        <p className="text-base sm:text-lg font-bold text-slate-600">
          {isRtl ? "تصفح واطلب عروض أسعار للمنتجات الطازجة من المزارعين المحليين المعتمدين" : "Browse verified products from local farmers"}
        </p>
      </div>
    </div>
  );
}

function PaginationComponent({
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
    <div className="flex items-center justify-center gap-2 py-10" id="pagination-container">
      <button
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        disabled={isFirst}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-slate-400 ${
          isFirst ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed" : "border-slate-200 hover:border-brand-800 hover:text-brand-800"
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
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold ${
              currentPage === page
                ? "bg-brand-800 text-white"
                : "border border-slate-200 text-slate-600 hover:border-brand-800 hover:text-brand-800"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        disabled={isLast}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-slate-400 ${
          isLast ? "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed" : "border-slate-200 hover:border-brand-800 hover:text-brand-800"
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const lastPage = 25;

  const isRtl = language === 'ar';

  const handleGoToMarketplace = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-[#fafdfa] flex flex-col selection:bg-brand-100 selection:text-brand-900" dir={isRtl ? 'rtl' : 'ltr'}>
        <NavbarComponent 
          language={language} 
          setLanguage={setLanguage} 
          onGoToMarketplace={handleGoToMarketplace} 
        />
        <main className="flex-grow">
          <ProductDetails 
  product={selectedProduct} 
  allProducts={RICH_PRODUCTS} 
  language={language} 
  onBack={handleGoToMarketplace} 
  onSelectProduct={(id: string) => { // 💡 تم إضافة ": string" هنا لحل الخطأ
    const richProd = RICH_PRODUCTS.find((p: any) => p.id === id); // 💡 تم إضافة ": any" هنا لتفادي الأخطاء
    if (richProd) {
      setSelectedProduct(richProd);
    }
  }} 
/>
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800" id="global-footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="bg-brand-600 text-white rounded-lg w-8 h-8 flex items-center justify-center">
                  🚜
                </span>
                <span className="font-display font-black text-lg text-white">
                  AgriBridge
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                © {new Date().getFullYear()} {isRtl ? 'جميع الحقوق محفوظة' : 'All rights reserved.'} AgriBridge Inc.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafdfa] flex flex-col selection:bg-brand-100 selection:text-brand-900" dir={isRtl ? 'rtl' : 'ltr'}>
      <NavbarComponent 
        language={language} 
        setLanguage={setLanguage} 
        onGoToMarketplace={handleGoToMarketplace} 
      />
      <HeroComponent language={language} />

      <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 max-w-7xl mx-auto flex-grow">
        <FiltersSidebarComponent language={language} />

        <main>
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600 font-semibold">
              <span className="font-extrabold text-slate-900">248</span> {isRtl ? "منتج متوفر" : "products found"}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 font-bold">{isRtl ? "ترتيب حسب:" : "Sort by:"}</span>
                <button className="flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900">
                  {isRtl ? "الأحدث" : "Newest"} <ChevronDown size={14} />
                </button>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200/40">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md cursor-pointer transition-all ${view === "grid" ? "bg-brand-800 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <Grid2x2 size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md cursor-pointer transition-all ${view === "list" ? "bg-brand-800 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200"
                : "flex flex-col gap-6 animate-in fade-in duration-200"
            }
          >
            {PRODUCTS.map((p) => (
              <ProductCardComponent 
                key={p.id} 
                product={p} 
                view={view} 
                onViewDetails={(product) => setSelectedProduct(mapToDetailProduct(product))} 
                language={language}
              />
            ))}
          </div>

          <PaginationComponent currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
        </main>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800" id="global-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="bg-brand-600 text-white rounded-lg w-8 h-8 flex items-center justify-center">
                🚜
              </span>
              <span className="font-display font-black text-lg text-white">
                AgriBridge
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              © {new Date().getFullYear()} {isRtl ? 'جميع الحقوق محفوظة' : 'All rights reserved.'} AgriBridge Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}