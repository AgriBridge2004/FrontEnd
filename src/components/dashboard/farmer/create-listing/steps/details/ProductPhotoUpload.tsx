"use client";

/* eslint-disable @next/next/no-img-element */
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Camera, Upload } from "lucide-react";

import type { UploadPhotoOption } from "@/components/dashboard/farmer/create-listing/create-listing.types";
import { cn } from "@/lib/cn";

type ProductPhotoSlot = UploadPhotoOption & {
  file?: File;
  previewUrl?: string;
};

type ProductPhotoUploadProps = {
  uploadedPhotoUrls: string[];
  photos: UploadPhotoOption[];
  onPhotosChange: (previewUrls: string[]) => void;
};

export function ProductPhotoUpload({ uploadedPhotoUrls, photos, onPhotosChange }: ProductPhotoUploadProps) {
  const [photoSlots, setPhotoSlots] = useState<ProductPhotoSlot[]>(() =>
    photos.map((photo, index) => ({ ...photo, previewUrl: uploadedPhotoUrls[index] })),
  );
  const [missingPlaceholderIds, setMissingPlaceholderIds] = useState<string[]>([]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setPhotoSlots((currentSlots) =>
      photos.map((photo, index) => ({
        ...photo,
        file: currentSlots[index]?.file,
        previewUrl: uploadedPhotoUrls[index] ?? currentSlots[index]?.previewUrl,
      })),
    );
  }, [photos, uploadedPhotoUrls]);

  function updatePhotoSlot(index: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPhotoSlots((currentSlots) => {
      const previousPreviewUrl = currentSlots[index]?.previewUrl;
      if (previousPreviewUrl) {
        URL.revokeObjectURL(previousPreviewUrl);
      }

      const nextSlots = currentSlots.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, file, previewUrl } : slot,
      );
      const nextPreviewUrls = nextSlots.map((slot) => slot.previewUrl ?? "");
      onPhotosChange(nextPreviewUrls);
      return nextSlots;
    });

    event.target.value = "";
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {photoSlots.map((photo, index) => {
        const hasUploadedImage = Boolean(photo.previewUrl);
        const hasPlaceholderImage = !missingPlaceholderIds.includes(photo.id);

        return (
          <div className="relative" key={photo.id}>
            <input
              accept="image/*"
              aria-label={`Upload product image ${index + 1}`}
              className="sr-only"
              onChange={(event) => updatePhotoSlot(index, event)}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="file"
            />
            <button
              aria-label={`Upload product image ${index + 1}`}
              className="group relative h-32 w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-emerald-200 bg-emerald-50 text-slate-900 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
              onClick={() => inputRefs.current[index]?.click()}
              type="button"
            >
              {hasUploadedImage && photo.previewUrl ? (
                <img
                  alt={`Selected product image ${index + 1}`}
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                  src={photo.previewUrl}
                />
              ) : hasPlaceholderImage ? (
                <img
                  alt={`${photo.label} upload placeholder`}
                  className="h-full w-full object-cover blur-[1.5px] transition duration-200 group-hover:scale-105"
                  onError={() => setMissingPlaceholderIds((currentIds) => [...currentIds, photo.id])}
                  src={photo.placeholderImage}
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-emerald-50 via-slate-100 to-emerald-100" />
              )}
              <span
                className={cn(
                  "absolute inset-0 transition duration-200",
                  hasUploadedImage ? "bg-slate-950/5 group-hover:bg-slate-950/20" : "bg-slate-950/38 group-hover:bg-slate-950/48",
                )}
              />
              <span className="absolute inset-0 grid place-items-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black shadow-sm transition duration-200",
                    hasUploadedImage
                      ? "bg-white/0 text-white opacity-0 group-hover:bg-white/90 group-hover:text-slate-900 group-hover:opacity-100"
                      : "bg-white/90 text-slate-900",
                  )}
                >
                  {hasUploadedImage ? <Camera className="size-4" /> : <Upload className="size-4" />}
                  {hasUploadedImage ? "Change image" : "Upload image"}
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
