"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar";
import type { MarketplaceProductDetails, ProductDetailsTab } from "@/components/marketplace/product-details/marketplace-product-details.types";
import { ProductDetailsGrid } from "@/components/marketplace/product-details/ProductDetailsGrid";
import { ProductDetailsTabs } from "@/components/marketplace/product-details/ProductDetailsTabs";
import { ProductImageGallery } from "@/components/marketplace/product-details/ProductImageGallery";
import { ProductInfoPanel } from "@/components/marketplace/product-details/ProductInfoPanel";
import { getPublicListingById } from "@/lib/farmer-listings-api";
import type { Listing } from "@/types";

export function MarketplaceProductDetailsPage() {
  const params = useParams<{ listingId: string }>();
  const [product, setProduct] = useState<MarketplaceProductDetails | null>(null);
  const [activeTab, setActiveTab] = useState<ProductDetailsTab>("details");
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const listing = await getPublicListingById(params.listingId);
        setProduct(mapListingToProductDetails(listing));
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Unable to load listing.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProduct();
  }, [params.listingId]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900" dir="ltr">
      <MarketplaceNavbar />

      <main className="mx-auto max-w-[1160px] px-4 py-6 sm:px-6 lg:px-6">
        <Link
          className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-xs font-black text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          href="/marketplace"
        >
          <ArrowLeft className="size-3.5" />
          Back to Marketplace
        </Link>

        {isLoading ? (
          <div className="mt-6 h-[560px] animate-pulse rounded-3xl border border-emerald-100 bg-emerald-50/40" />
        ) : errorMessage ? (
          <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
            <p className="text-base font-black text-slate-950">Unable to load listing</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">{errorMessage}</p>
          </section>
        ) : product ? (
          <>
            <nav aria-label="Breadcrumb" className="mt-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Link className="transition hover:text-emerald-900" href="/marketplace">
                Marketplace
              </Link>
              <ChevronRight className="size-3.5 text-slate-300" />
              <span>{product.category}</span>
              <ChevronRight className="size-3.5 text-slate-300" />
              <span className="font-black text-slate-800">{product.title}</span>
            </nav>

            <section className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <ProductImageGallery images={product.images} title={product.title} />
              <ProductInfoPanel product={product} onToast={setToastMessage} />
            </section>

            <section className="mt-12">
              <ProductDetailsTabs activeTab={activeTab} reviewsCount={product.reviewsCount} onTabChange={setActiveTab} />
              <div className="mt-5">
                <ProductDetailsGrid activeTab={activeTab} details={product.details} />
              </div>
            </section>

            <section className="mt-12 rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-bold text-slate-600">Similar listings will appear when the backend exposes a related-listings endpoint.</p>
            </section>
          </>
        ) : null}
      </main>

      {toastMessage ? (
        <div className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
            <p className="flex-1 text-sm font-bold leading-6 text-slate-700">{toastMessage}</p>
            <button
              aria-label="Dismiss notification"
              className="grid size-7 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setToastMessage("")}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function mapListingToProductDetails(listing: Listing): MarketplaceProductDetails {
  return {
    id: listing.id,
    title: listing.title,
    category: listing.crop,
    farmerName: "Verified Farmer",
    verifiedFarmer: true,
    rating: 0,
    reviewsCount: 0,
    price: listing.pricePerUnit,
    currency: listing.currency,
    unit: listing.unit,
    availableQuantity: `${listing.quantity} ${listing.unit}`,
    harvestDate: listing.harvestDate,
    location: listing.location,
    grade: listing.qualityGrade ?? "Ungraded",
    listingType: "Spot",
    description: listing.description,
    images: [listing.imageUrl],
    details: {
      productType: listing.type,
      variety: listing.crop,
      grade: listing.qualityGrade ?? "Ungraded",
      farmingMethod: "Not provided",
      packaging: "Not provided",
      shelfLife: "Not provided",
      storage: "Not provided",
      certifications: listing.certifications.length ? listing.certifications.join(", ") : "Not provided",
    },
  };
}
