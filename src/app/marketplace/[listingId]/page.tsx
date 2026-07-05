"use client";

import { notFound, useRouter } from "next/navigation";

import ProductDetails from "@/components/shared/ProductDetails";
import { PRODUCTS } from "@/lib/data";
import type { Language } from "@/types/types";

type MarketplaceListingPageProps = {
  params: {
    listingId: string;
  };
};

export default function MarketplaceListingPage({ params }: MarketplaceListingPageProps) {
  const router = useRouter();
  const language: Language = "en";
  const product = PRODUCTS.find((item) => item.id === params.listingId);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetails
      product={product}
      allProducts={PRODUCTS}
      language={language}
      onBack={() => router.push("/marketplace")}
      onSelectProduct={(id) => router.push(`/marketplace/${id}`)}
    />
  );
}
