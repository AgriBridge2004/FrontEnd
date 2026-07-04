/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  CalendarDays,
  Package2,
  ShieldCheck,
  Phone,
  Mail,
  Heart,
  Send,
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
  const [saved, setSaved] = useState(false);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isRtl ? "rtl" : "ltr"}>
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-800 transition-colors cursor-pointer"
      >
        {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        {isRtl ? "العودة إلى السوق" : "Back to Marketplace"}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <img
              src={product.images[activeImage]}
              alt={title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            {product.verifiedFarmer && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-800 shadow-md">
                <ShieldCheck size={14} />
                {isRtl ? "مزارع معتمد" : "Verified Farmer"}
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                    activeImage === idx ? "border-brand-700" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${title} ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-2">{title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-slate-700">{product.farmRating}</span>
            <span className="text-sm text-slate-400">
              ({product.farmReviewsCount} {isRtl ? "تقييم" : "reviews"})
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-sm font-bold text-slate-600">{farm}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-black text-brand-800">${product.priceUsd.toFixed(2)}</span>
            <span className="text-sm font-semibold text-slate-500">/ kg</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                <Package2 size={14} className="text-brand-600" /> {isRtl ? "الكمية" : "Quantity"}
              </div>
              <p className="text-sm font-extrabold text-slate-800">
                {product.quantityAvailable.toLocaleString()} kg
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                <MapPin size={14} className="text-brand-600" /> {isRtl ? "الموقع" : "Location"}
              </div>
              <p className="text-sm font-extrabold text-slate-800">{location}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                <CalendarDays size={14} className="text-brand-600" /> {isRtl ? "تاريخ الحصاد" : "Harvest Date"}
              </div>
              <p className="text-sm font-extrabold text-slate-800">{harvestDate}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                <ShieldCheck size={14} className="text-brand-600" /> {isRtl ? "الدرجة" : "Grade"}
              </div>
              <p className="text-sm font-extrabold text-slate-800">{grade}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="flex-1 min-w-[160px] rounded-xl bg-brand-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-800 transition shadow-xs cursor-pointer"
            >
              {isRtl ? "طلب تسعيرة" : "Request Quote"}
            </button>
            <button
              type="button"
              onClick={() => setMessageOpen(true)}
              className="flex-1 min-w-[160px] rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              {isRtl ? "مراسلة المزارع" : "Message Farmer"}
            </button>
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              className={`rounded-xl border px-4 py-3.5 transition cursor-pointer ${
                saved ? "border-brand-300 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Heart size={18} className={saved ? "fill-brand-600" : ""} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-slate-100 mb-6">
            {(["details", "farmer", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition cursor-pointer ${
                  activeTab === tab
                    ? "border-brand-800 text-brand-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "details" && (isRtl ? "التفاصيل" : "Details")}
                {tab === "farmer" && (isRtl ? "ملف المزارع" : "Farmer Profile")}
                {tab === "reviews" && (isRtl ? "التقييمات" : "Reviews")}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div>
              <p className="text-sm leading-relaxed text-slate-600 mb-6">{description}</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  [isRtl ? "نوع المنتج" : "Product Type", isRtl ? product.specs.productTypeAr : product.specs.productTypeEn],
                  [isRtl ? "الصنف" : "Variety", isRtl ? product.specs.varietyAr : product.specs.varietyEn],
                  [isRtl ? "طريقة الزراعة" : "Farming Method", isRtl ? product.specs.farmingMethodAr : product.specs.farmingMethodEn],
                  [isRtl ? "التعبئة" : "Packaging", isRtl ? product.specs.packagingAr : product.specs.packagingEn],
                  [isRtl ? "مدة الصلاحية" : "Shelf Life", isRtl ? product.specs.shelfLifeAr : product.specs.shelfLifeEn],
                  [isRtl ? "التخزين" : "Storage", isRtl ? product.specs.storageAr : product.specs.storageEn],
                  [isRtl ? "الشهادات" : "Certifications", isRtl ? product.specs.certificationsAr : product.specs.certificationsEn],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-slate-50 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{label}</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "farmer" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-brand-100 flex items-center justify-center text-2xl">🌾</div>
                <div>
                  <p className="font-bold text-slate-900">{farm}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    {product.farmRating} ({product.farmReviewsCount} {isRtl ? "تقييم" : "reviews"})
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600">{isRtl ? "مزرعة موثوقة تلتزم بأعلى معايير الجودة والممارسات الزراعية المستدامة." : "A trusted farm committed to top quality standards and sustainable farming practices."}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone size={14} className="text-brand-600" /> +962 7X XXX XXXX
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail size={14} className="text-brand-600" /> contact@{farm.toLowerCase().replace(/\s+/g, "")}.com
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-bold text-sm text-slate-900">{isRtl ? review.userNameAr : review.userNameEn}</p>
                    <span className="text-xs text-slate-400">{isRtl ? review.dateAr : review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">{isRtl ? review.commentAr : review.commentEn}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-black text-2xl text-slate-900 mb-6">
            {isRtl ? "منتجات مشابهة" : "Similar Products"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(p.id)}
                className="text-left rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-brand-300 transition-all shadow-[0_10px_25px_rgba(15,23,42,0.06)] cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={p.images[0]} alt={isRtl ? p.titleAr : p.titleEn} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-slate-900 mb-1">{isRtl ? p.titleAr : p.titleEn}</p>
                  <p className="text-brand-800 font-black">${p.priceUsd.toFixed(2)} <span className="text-xs font-semibold text-slate-500">/ kg</span></p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {quoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-black text-xl text-slate-900 mb-2">
              {isRtl ? "طلب تسعيرة" : "Request a Quote"}
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              {isRtl ? "أرسل طلباً للحصول على تسعيرة مباشرة من المزارع." : "Send a quotation request directly to the farmer."}
            </p>
            <button
              type="button"
              onClick={() => setQuoteOpen(false)}
              className="w-full rounded-xl bg-brand-900 text-white font-bold py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={16} /> {isRtl ? "إرسال طلب التسعيرة" : "Send Quotation Request"}
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setMessageOpen(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-black text-xl text-slate-900 mb-2">
              {isRtl ? "مراسلة المزارع" : "Message Farmer"}
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              {isRtl ? "أرسل رسالة مباشرة إلى المزارع." : "Send a direct message to the farmer about this listing."}
            </p>
            <button
              type="button"
              onClick={() => setMessageOpen(false)}
              className="w-full rounded-xl bg-brand-900 text-white font-bold py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={16} /> {isRtl ? "إرسال الرسالة" : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}