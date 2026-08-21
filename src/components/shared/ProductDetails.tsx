/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import useFavorites from "@/lib/useFavorites";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  Package2,
  ShieldCheck,
  Mail,
  Send,
  FileText,
} from "lucide-react";
import { Product, Language } from "@/types/types";

interface ProductDetailsProps {
  product: Product;
  allProducts: Product[];
  language: Language;
  onBack: () => void;
  onSelectProduct: (id: string) => void;
}

export default function ProductDetails({
  product,
  allProducts,
  language,
  onBack,
  onSelectProduct,
}: ProductDetailsProps) {
  const isRtl = language === "ar";
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "farmer" | "reviews">("details");
  const { isFavorite, toggleFavorite } = useFavorites();
  const [popped, setPopped] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const title = isRtl ? product.titleAr : product.titleEn;
  const farm = isRtl ? product.farmAr : product.farmEn;
  const location = isRtl ? product.locationAr : product.locationEn;
  const grade = isRtl ? product.gradeAr : product.gradeEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;
  const harvestDate = isRtl ? product.harvestDateAr : product.harvestDate;

  const similarProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="min-h-screen bg-[#fafdfa]" dir={isRtl ? "rtl" : "ltr"}>
      {/* Breadcrumb & Back Button */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:border-brand-300 hover:text-brand-800 transition-all cursor-pointer"
          >
            {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {isRtl ? "العودة للسوق" : "Back to Marketplace"}
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{isRtl ? "السوق الإلكتروني" : "Marketplace"}</span>
            <span className="text-slate-300">/</span>
            <span>{isRtl ? "الخضروات" : "Vegetables"}</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900">{title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-md">
              <img
                src={product.images[activeImage]}
                alt={title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Save Button */}
              <button
                type="button"
                aria-pressed={isFavorite(product.id)}
                aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                onClick={() => {
                  toggleFavorite(product.id);
                  setPopped(true);
                  window.setTimeout(() => setPopped(false), 260);
                }}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-transform duration-200 ${
                  popped ? "scale-110" : "scale-100"
                } cursor-pointer`}
              >
                <span className={isFavorite(product.id) ? "text-rose-500 text-2xl" : "text-slate-400 text-2xl"}>
                  {isFavorite(product.id) ? "❤" : "♡"}
                </span>
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                      activeImage === idx ? "border-brand-700" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${title} ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    {idx === product.images.length - 1 && product.images.length > 5 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">+{product.images.length - 5}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Info Card */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 mb-3 leading-tight">{title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-700" />
                  <span className="font-bold text-slate-900">{farm}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-500">⭐</span>
                  <span className="font-bold text-slate-800">{product.farmRating}</span>
                  <span className="text-slate-400 text-sm">({product.farmReviewsCount} {isRtl ? "تقييم" : "reviews"})</span>
                </div>
              </div>
            </div>

            {/* Price & Availability */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-5xl font-black text-brand-800">{product.priceUsd.toFixed(0)}</span>
                <span className="text-sm font-semibold text-slate-600 ml-1">USD / kg</span>
              </div>
              <div className="rounded-full border-2 border-brand-700 px-5 py-2.5 flex items-center gap-2">
                <Package2 size={16} className="text-brand-700" />
                <span className="font-bold text-slate-900">{product.quantityAvailable}</span>
                <span className="text-sm font-semibold text-slate-600">kg</span>
                <span className="text-xs font-semibold text-slate-500">{isRtl ? "متاح" : "Available"}</span>
              </div>
            </div>

            {/* Harvest & Location Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <CalendarDays size={16} className="text-brand-700" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{isRtl ? "تاريخ الحصاد" : "HARVEST DATE"}</p>
                  <p className="font-bold text-slate-900 text-sm mt-1">{harvestDate}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <MapPin size={16} className="text-brand-700" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{isRtl ? "الموقع" : "LOCATION"}</p>
                  <p className="font-bold text-slate-900 text-sm mt-1">{location}</p>
                </div>
              </div>
            </div>

            {/* Grade & Spot Available Badges */}
            <div className="flex gap-3 flex-wrap">
              <button className="rounded-full border-2 border-brand-700 px-5 py-2.5 flex items-center gap-2 hover:bg-brand-50 transition cursor-pointer">
                <span className="text-amber-500">⭐</span>
                <span className="font-bold text-slate-800">{grade}</span>
              </button>
              <button className="rounded-full border-2 border-brand-700 px-5 py-2.5 flex items-center gap-2 hover:bg-brand-50 transition cursor-pointer">
                <span className="text-brand-700">⚡</span>
                <span className="font-bold text-slate-800">{isRtl ? "متوفر فوري" : "Spot Available Now"}</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-slate-700 leading-relaxed">{description}</p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="w-full rounded-2xl bg-brand-800 hover:bg-brand-700 px-6 py-3.5 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <FileText size={16} />
                {isRtl ? "طلب عرض سعر" : "Request Quote"}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  aria-pressed={isFavorite(product.id)}
                  aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                  onClick={() => {
                    toggleFavorite(product.id);
                    setPopped(true);
                    window.setTimeout(() => setPopped(false), 260);
                  }}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-transform duration-200 ${
                    isFavorite(product.id)
                      ? "bg-brand-50 border-2 border-brand-700 text-brand-700"
                      : "border-2 border-slate-200 text-slate-700 hover:border-brand-700"
                  } ${popped ? "scale-105" : "scale-100"}`}
                >
                  <span className={isFavorite(product.id) ? "text-rose-500 text-lg" : "text-slate-400 text-lg"}>
                    {isFavorite(product.id) ? "❤" : "♡"}
                  </span>
                  {isRtl ? "حفظ" : "Save Listing"}
                </button>
                <button
                  type="button"
                  onClick={() => setMessageOpen(true)}
                  className="rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 flex items-center justify-center gap-2 hover:border-brand-700 transition cursor-pointer"
                >
                  <Mail size={16} />
                  {isRtl ? "مراسلة" : "Message"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex gap-6 border-b border-slate-200 mb-8">
            {(["details", "farmer", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 -mb-px transition cursor-pointer ${
                  activeTab === tab
                    ? "border-brand-800 text-brand-800"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "details" && <FileText size={16} />}
                {tab === "farmer" && <span className="text-xl">👤</span>}
                {tab === "reviews" && <span className="text-amber-500">⭐</span>}
                {tab === "details" && (isRtl ? "التفاصيل" : "Details")}
                {tab === "farmer" && (isRtl ? "ملف المزارع" : "Farmer Profile")}
                {tab === "reviews" && `${isRtl ? "التقييمات" : "Reviews"} (${product.reviews.length})`}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "details" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <span className="text-xl">🌱</span>,
                    label: isRtl ? "نوع المنتج" : "PRODUCT TYPE",
                    value: isRtl ? product.specs.productTypeAr : product.specs.productTypeEn,
                  },
                  {
                    icon: <span className="text-xl">🏆</span>,
                    label: isRtl ? "الصنف" : "VARIETY",
                    value: isRtl ? product.specs.varietyAr : product.specs.varietyEn,
                  },
                  {
                    icon: <ShieldCheck size={18} className="text-brand-700" />,
                    label: isRtl ? "الدرجة" : "GRADE",
                    value: isRtl ? product.gradeAr : product.gradeEn,
                  },
                  {
                    icon: <span className="text-xl">🚜</span>,
                    label: isRtl ? "طريقة الزراعة" : "FARMING METHOD",
                    value: isRtl ? product.specs.farmingMethodAr : product.specs.farmingMethodEn,
                  },
                  {
                    icon: <Package2 size={18} className="text-brand-700" />,
                    label: isRtl ? "التعبئة" : "PACKAGING",
                    value: isRtl ? product.specs.packagingAr : product.specs.packagingEn,
                  },
                  {
                    icon: <span className="text-xl">⏱️</span>,
                    label: isRtl ? "مدة الصلاحية" : "SHELF LIFE",
                    value: isRtl ? product.specs.shelfLifeAr : product.specs.shelfLifeEn,
                  },
                  {
                    icon: <span className="text-xl">❄️</span>,
                    label: isRtl ? "التخزين" : "STORAGE",
                    value: isRtl ? product.specs.storageAr : product.specs.storageEn,
                  },
                  {
                    icon: <span className="text-xl">✅</span>,
                    label: isRtl ? "الشهادات" : "CERTIFICATIONS",
                    value: isRtl ? product.specs.certificationsAr : product.specs.certificationsEn,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-3">{item.icon}</div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{item.label}</p>
                    <p className="font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "farmer" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-brand-100 flex items-center justify-center text-3xl">🌾</div>
                <div>
                  <p className="font-black text-lg text-slate-900">{farm}</p>
                  <div className="flex items-center gap-1.5 text-sm text-slate-600 mt-1">
                    <span className="text-amber-500">⭐</span>
                    <span className="font-bold">{product.farmRating}</span>
                    <span>({product.farmReviewsCount} {isRtl ? "تقييم" : "reviews"})</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {isRtl
                  ? "مزرعة موثوقة تلتزم بأعلى معايير الجودة والممارسات الزراعية المستدامة والصديقة للبيئة."
                  : "A trusted farm committed to top quality standards and sustainable, eco-friendly farming practices."}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="text-xl">☎</span>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">{isRtl ? "رقم الهاتف" : "PHONE"}</p>
                    <p className="font-bold text-slate-900">+962 7X XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Mail size={18} className="text-brand-700" />
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">{isRtl ? "البريد الإلكتروني" : "EMAIL"}</p>
                    <p className="font-bold text-slate-900">contact@{farm.toLowerCase().replace(/\s+/g, "")}.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-slate-100 p-4 hover:border-brand-200 transition">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-900">{isRtl ? review.userNameAr : review.userNameEn}</p>
                    <span className="text-xs text-slate-400">{isRtl ? review.dateAr : review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < review.rating ? "text-amber-500 text-lg" : "text-slate-200 text-lg"}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">{isRtl ? review.commentAr : review.commentEn}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-black text-3xl text-slate-900">{isRtl ? "منتجات مشابهة" : "Similar Products"}</h2>
              <a href="#" className="font-bold text-brand-800 hover:text-brand-700 flex items-center gap-1">
                {isRtl ? "عرض الكل" : "View All"} <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectProduct(p.id)}
                  className="text-left rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-brand-300 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={p.images[0]} alt={isRtl ? p.titleAr : p.titleEn} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    <button
                      type="button"
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition"
                    >
                      <span className="text-slate-400 text-lg">❤</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-slate-900 mb-1">{isRtl ? p.titleAr : p.titleEn}</p>
                    <div className="flex items-center gap-2 mb-3 text-xs text-slate-600">
                      <span>{isRtl ? p.farmAr : p.farmEn}</span>
                      <ShieldCheck size={12} className="text-brand-700" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-brand-800">{p.priceUsd.toFixed(0)}</span>
                        <span className="text-xs font-semibold text-slate-500">USD / kg</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">{p.quantityAvailable} kg</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-2">
                      <span className="text-amber-500">⭐</span>
                      <span className="text-xs font-bold text-slate-700">{p.farmRating}</span>
                      <span className="text-xs text-slate-400">({p.farmReviewsCount})</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      {quoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-black text-2xl text-slate-900 mb-2">
              {isRtl ? "طلب عرض سعر" : "Request a Quote"}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {isRtl ? "أرسل طلباً مباشراً للحصول على عرض سعر من المزارع." : "Send a quotation request directly to the farmer."}
            </p>
            <button
              type="button"
              onClick={() => setQuoteOpen(false)}
              className="w-full rounded-2xl bg-brand-800 hover:bg-brand-700 text-white font-bold py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition"
            >
              <Send size={16} /> {isRtl ? "إرسال الطلب" : "Send Request"}
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setMessageOpen(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-black text-2xl text-slate-900 mb-2">
              {isRtl ? "مراسلة المزارع" : "Message Farmer"}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {isRtl ? "أرسل رسالة مباشرة إلى المزارع حول هذا المنتج." : "Send a direct message to the farmer about this product."}
            </p>
            <button
              type="button"
              onClick={() => setMessageOpen(false)}
              className="w-full rounded-2xl bg-brand-800 hover:bg-brand-700 text-white font-bold py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition"
            >
              <Send size={16} /> {isRtl ? "إرسال الرسالة" : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}