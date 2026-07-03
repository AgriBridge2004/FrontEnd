"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { CreateListingHeader } from "@/components/dashboard/farmer/create-listing/shared/CreateListingHeader";
import { CreateListingSidebar } from "@/components/dashboard/farmer/create-listing/shared/CreateListingSidebar";
import { CreateListingStepper } from "@/components/dashboard/farmer/create-listing/shared/CreateListingStepper";
import { CreateListingToast } from "@/components/dashboard/farmer/create-listing/shared/CreateListingToast";
import { LogisticsFulfillmentStep, type LogisticsErrors } from "@/components/dashboard/farmer/create-listing/steps/logistics/LogisticsFulfillmentStep";
import { PricingQuantityStep, type PricingErrors } from "@/components/dashboard/farmer/create-listing/steps/pricing/PricingQuantityStep";
import { PricingStrategySidebar } from "@/components/dashboard/farmer/create-listing/steps/pricing/PricingStrategySidebar";
import { ProductDetailsStep } from "@/components/dashboard/farmer/create-listing/steps/details/ProductDetailsStep";
import { ReviewPublishStep } from "@/components/dashboard/farmer/create-listing/steps/review/ReviewPublishStep";
import { ShippingBestPracticesSidebar } from "@/components/dashboard/farmer/create-listing/steps/logistics/ShippingBestPracticesSidebar";
import { initialCreateListingDraft } from "@/components/dashboard/farmer/create-listing/create-listing.mock";
import type { CreateListingDraft } from "@/components/dashboard/farmer/create-listing/create-listing.types";
import { createFarmerListing, uploadListingImages } from "@/lib/farmer-listings-api";

type ProductDetailsErrors = Partial<Record<"productName" | "qualityGrade" | "harvestDate", string>>;

export function CreateListingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [draft, setDraft] = useState<CreateListingDraft>(initialCreateListingDraft);
  const [errors, setErrors] = useState<ProductDetailsErrors>({});
  const [logisticsErrors, setLogisticsErrors] = useState<LogisticsErrors>({});
  const [pricingErrors, setPricingErrors] = useState<PricingErrors>({});
  const [isLogisticsComplete, setIsLogisticsComplete] = useState(false);
  const [isPricingComplete, setIsPricingComplete] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [photoFiles, setPhotoFiles] = useState<Array<File | undefined>>([]);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photoPreviewUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      photoPreviewUrlsRef.current.forEach((previewUrl) => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, []);

  const completeness = useMemo(() => {
    const completedFields = [draft.productName, draft.qualityGrade, draft.harvestDate].filter(Boolean).length;
    const photoBoost = draft.photos.some(Boolean) ? 5 : 0;
    const pricingBoost = isPricingComplete ? 25 : 0;
    const logisticsBoost = isLogisticsComplete ? 20 : 0;
    return Math.min(90, 25 + completedFields * 10 + photoBoost + pricingBoost + logisticsBoost);
  }, [
    draft.harvestDate,
    draft.photos,
    draft.productName,
    draft.qualityGrade,
    isLogisticsComplete,
    isPricingComplete,
  ]);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  function validateStep() {
    const nextErrors: ProductDetailsErrors = {};

    if (!draft.productName) {
      nextErrors.productName = "Product name is required.";
    }
    if (!draft.qualityGrade) {
      nextErrors.qualityGrade = "Quality grade is required.";
    }
    if (!draft.harvestDate) {
      nextErrors.harvestDate = "Harvest date is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function parsePositiveNumber(value: string) {
    return Number(value.replace(/,/g, ""));
  }

  function validatePricing() {
    const nextErrors: PricingErrors = {};
    const unitPrice = parsePositiveNumber(draft.pricing.unitPrice);
    const minimumOrder = parsePositiveNumber(draft.pricing.minimumOrder);
    const totalQuantity = parsePositiveNumber(draft.pricing.totalQuantity);

    if (!draft.pricing.unitPrice || Number.isNaN(unitPrice) || unitPrice <= 0) {
      nextErrors.unitPrice = "Unit price must be greater than 0.";
    }
    if (!draft.pricing.minimumOrder || Number.isNaN(minimumOrder) || minimumOrder <= 0) {
      nextErrors.minimumOrder = "Minimum order must be greater than 0.";
    }
    if (!draft.pricing.totalQuantity || Number.isNaN(totalQuantity) || totalQuantity <= 0) {
      nextErrors.totalQuantity = "Total quantity must be greater than 0.";
    }
    if (minimumOrder > 0 && totalQuantity > 0 && minimumOrder > totalQuantity) {
      nextErrors.minimumOrder = "MOQ cannot be greater than total available quantity.";
    }

    setPricingErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateLogistics() {
    const nextErrors: LogisticsErrors = {};

    if (!draft.logistics.originLocation.trim()) {
      nextErrors.originLocation = "Origin location is required.";
    }
    if (!draft.logistics.incoterm) {
      nextErrors.incoterm = "Shipping method is required.";
    }
    if (draft.logistics.packagingOptions.length === 0) {
      nextErrors.packagingOptions = "Select at least one packaging option.";
    }
    if (!draft.logistics.leadTimeDays || draft.logistics.leadTimeDays <= 0) {
      nextErrors.leadTimeDays = "Lead time must be greater than 0.";
    }

    setLogisticsErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function saveDraftLocally() {
    // TODO: Persist listing drafts through the backend listing creation API.
    localStorage.setItem("agribridge:create-listing-draft", JSON.stringify(draft));
  }

  function handleSaveDraft() {
    saveDraftLocally();
    showToast("Draft saved locally.");
  }

  function handleContinue() {
    if (currentStep === 1 && !validateStep()) {
      showToast("Please complete required details before continuing.");
      return;
    }
    if (currentStep === 2 && !validatePricing()) {
      showToast("Please complete pricing details before continuing.");
      return;
    }
    if (currentStep === 3 && !validateLogistics()) {
      showToast("Please complete logistics details before continuing.");
      return;
    }

    if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
      saveDraftLocally();
    }
    if (currentStep === 2) {
      setIsPricingComplete(true);
    }
    if (currentStep === 3) {
      setIsLogisticsComplete(true);
    }

    // TODO: Implement final review submission.
    setCurrentStep((step) => Math.min(step + 1, 4));
  }

  function handleBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function buildCreateListingPayload() {
    return {
      name: draft.productName.trim(),
      productType: "Plant" as const,
      category: draft.variety.trim() || draft.productName.trim(),
      description: [
        draft.variety.trim() ? `Variety: ${draft.variety.trim()}` : undefined,
        draft.qualityGrade ? `Quality grade: ${draft.qualityGrade}` : undefined,
        draft.harvestDate ? `Harvest date: ${draft.harvestDate}` : undefined,
      ]
        .filter(Boolean)
        .join(". "),
      qty: parsePositiveNumber(draft.pricing.totalQuantity),
      unit: "kg",
      price: parsePositiveNumber(draft.pricing.unitPrice),
      location: draft.logistics.originLocation.trim(),
      expiry: draft.harvestDate || undefined,
    };
  }

  async function handlePublish() {
    const isDetailsValid = validateStep();
    const isPricingValid = validatePricing();
    const isLogisticsValid = validateLogistics();

    if (!isDetailsValid || !isPricingValid || !isLogisticsValid) {
      showToast("Please complete all required listing steps before publishing.");
      if (!isDetailsValid) {
        setCurrentStep(1);
      } else if (!isPricingValid) {
        setCurrentStep(2);
      } else {
        setCurrentStep(3);
      }
      return;
    }

    setIsPublishing(true);
    try {
      const listing = await createFarmerListing(buildCreateListingPayload());
      const uploadedFiles = photoFiles.filter((file): file is File => Boolean(file));

      if (listing.id && uploadedFiles.length > 0) {
        await uploadListingImages(listing.id, uploadedFiles);
      }

      setIsPublishing(false);
      setIsPricingComplete(true);
      setIsLogisticsComplete(true);
      showToast("Listing published successfully.");
      localStorage.removeItem("agribridge:create-listing-draft");
      router.push("/farmer/listings");
    } catch (error) {
      setIsPublishing(false);
      showToast(error instanceof Error ? error.message : "Unable to publish listing.");
    }
  }

  function handleDiscardDraft() {
    photoPreviewUrlsRef.current.forEach((previewUrl) => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    });
    photoPreviewUrlsRef.current = [];
    localStorage.removeItem("agribridge:create-listing-draft");
    setDraft(initialCreateListingDraft);
    setIsDiscardModalOpen(false);
    showToast("Draft discarded.");
    router.push("/farmer/listings");
  }

  return (
    <FarmerDashboardLayout
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search marketplace..."
      searchValue={searchQuery}
    >
      <div className="mx-auto w-full max-w-[1120px] px-4 py-5 sm:px-5 lg:px-7">
        <CreateListingHeader />
        <div className="mt-7">
          <CreateListingStepper currentStep={currentStep} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_296px]">
          {currentStep === 1 ? (
            <ProductDetailsStep
              draft={draft}
              errors={errors}
              onChange={(nextDraft) => {
                setDraft(nextDraft);
                setErrors((current) => ({
                  ...current,
                  productName: nextDraft.productName ? undefined : current.productName,
                  qualityGrade: nextDraft.qualityGrade ? undefined : current.qualityGrade,
                  harvestDate: nextDraft.harvestDate ? undefined : current.harvestDate,
                }));
              }}
              onContinue={handleContinue}
              onPhotosChange={(previewUrls, files) => {
                photoPreviewUrlsRef.current = previewUrls;
                setPhotoFiles(files);
                setDraft((currentDraft) => ({ ...currentDraft, photos: previewUrls }));
              }}
              onSaveDraft={handleSaveDraft}
            />
          ) : currentStep === 2 ? (
            <PricingQuantityStep
              errors={pricingErrors}
              onBack={handleBack}
              onChange={(pricing) => {
                setDraft((currentDraft) => ({ ...currentDraft, pricing }));
                setIsPricingComplete(false);
                setPricingErrors((current) => ({
                  ...current,
                  unitPrice: parsePositiveNumber(pricing.unitPrice) > 0 ? undefined : current.unitPrice,
                  minimumOrder: parsePositiveNumber(pricing.minimumOrder) > 0 ? undefined : current.minimumOrder,
                  totalQuantity: parsePositiveNumber(pricing.totalQuantity) > 0 ? undefined : current.totalQuantity,
                }));
              }}
              onContinue={handleContinue}
              pricing={draft.pricing}
            />
          ) : currentStep === 3 ? (
            <LogisticsFulfillmentStep
              errors={logisticsErrors}
              logistics={draft.logistics}
              onBack={handleBack}
              onCertificateToast={showToast}
              onChange={(logistics) => {
                setDraft((currentDraft) => ({ ...currentDraft, logistics }));
                setIsLogisticsComplete(false);
                setLogisticsErrors((current) => ({
                  ...current,
                  originLocation: logistics.originLocation.trim() ? undefined : current.originLocation,
                  incoterm: logistics.incoterm ? undefined : current.incoterm,
                  packagingOptions: logistics.packagingOptions.length > 0 ? undefined : current.packagingOptions,
                  leadTimeDays: logistics.leadTimeDays > 0 ? undefined : current.leadTimeDays,
                }));
              }}
              onContinue={handleContinue}
            />
          ) : currentStep === 4 ? (
            <ReviewPublishStep
              draft={draft}
              isDiscardModalOpen={isDiscardModalOpen}
              isPublishing={isPublishing}
              onBack={handleBack}
              onCloseDiscardModal={() => setIsDiscardModalOpen(false)}
              onConfirmDiscard={handleDiscardDraft}
              onEditStep={setCurrentStep}
              onOpenDiscardModal={() => setIsDiscardModalOpen(true)}
              onPublish={handlePublish}
            />
          ) : (
            <CreateListingPlaceholderStep currentStep={currentStep} onBack={handleBack} onContinue={handleContinue} />
          )}
          {currentStep === 2 ? (
            <PricingStrategySidebar onAdvisorClick={() => showToast("Advisor support will be connected later.")} />
          ) : currentStep === 3 ? (
            <ShippingBestPracticesSidebar onGuideClick={() => showToast("Shipping guide will be connected later.")} />
          ) : currentStep === 4 ? null : (
            <CreateListingSidebar
              completeness={completeness}
              draft={draft}
              logisticsComplete={isLogisticsComplete}
              pricingComplete={isPricingComplete}
            />
          )}
        </div>
      </div>
      <CreateListingToast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}

type CreateListingPlaceholderStepProps = {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
};

function CreateListingPlaceholderStep({ currentStep, onBack, onContinue }: CreateListingPlaceholderStepProps) {
  const stepLabels: Record<number, string> = {
    2: "Pricing step coming next.",
    3: "Logistics step coming next.",
    4: "Review step coming next.",
  };

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Step {currentStep}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{stepLabels[currentStep]}</h2>
      <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
        This section is intentionally a placeholder while the full create-listing flow is being built.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
        {currentStep < 4 ? (
          <button
            className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-800 px-6 text-sm font-black text-white shadow-sm transition hover:bg-emerald-900"
            onClick={onContinue}
            type="button"
          >
            Continue to Next Step
          </button>
        ) : null}
      </div>
    </section>
  );
}
