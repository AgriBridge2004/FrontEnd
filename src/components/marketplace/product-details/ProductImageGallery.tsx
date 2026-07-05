"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";

import { PRODUCT_IMAGE_FALLBACK } from "@/components/marketplace/product-details/marketplace-product-details.mock";
import { cn } from "@/lib/cn";

type ProductImageGalleryProps = {
  images: string[];
  title: string;
};

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const safeImages = images.length > 0 ? images : [PRODUCT_IMAGE_FALLBACK];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageSrc, setActiveImageSrc] = useState(safeImages[0]);
  const visibleThumbnails = safeImages.slice(0, 6);
  const extraCount = Math.max(safeImages.length - visibleThumbnails.length + 1, 0);

  function selectImage(index: number) {
    setActiveIndex(index);
    setActiveImageSrc(safeImages[index] ?? PRODUCT_IMAGE_FALLBACK);
  }

  return (
    <section>
      <div className="relative h-[390px] overflow-hidden rounded-2xl bg-slate-100 shadow-sm sm:h-[420px]">
        <Image
          alt={title}
          className="object-cover"
          fill
          onError={() => setActiveImageSrc(PRODUCT_IMAGE_FALLBACK)}
          priority
          sizes="(min-width: 1024px) 590px, 100vw"
          src={activeImageSrc}
        />
        <button
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={cn(
            "absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white text-slate-600 shadow-md transition hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30",
            isFavorite && "text-rose-500",
          )}
          onClick={() => setIsFavorite((value) => !value)}
          type="button"
        >
          <Heart className={cn("size-5", isFavorite && "fill-current")} />
        </button>
      </div>

      <div className="mt-4 flex gap-2.5 overflow-x-auto pb-2">
        {visibleThumbnails.map((image, index) => {
          const isLastVisible = index === visibleThumbnails.length - 1 && extraCount > 0;

          return (
            <button
              aria-label={`Show product image ${index + 1}`}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-100 transition hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30",
                activeIndex === index ? "border-emerald-700" : "border-transparent",
              )}
              key={`${image}-${index}`}
              onClick={() => selectImage(index)}
              type="button"
            >
              <Image
                alt={`${title} thumbnail ${index + 1}`}
                className="object-cover"
                fill
                onError={() => undefined}
                sizes="64px"
                src={image || PRODUCT_IMAGE_FALLBACK}
              />
              {isLastVisible ? (
                <span className="absolute inset-0 grid place-items-center bg-emerald-950/55 text-sm font-black text-white">
                  +{extraCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
