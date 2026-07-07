"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { getFarmerListingById, updateFarmerListing } from "@/lib/farmer-listings-api";
import type { CreateFarmerListingPayload } from "@/types/listing";

type FarmerListingEditPageProps = {
  listingId: string;
};

type EditListingForm = CreateFarmerListingPayload;
type EditListingErrors = Partial<Record<keyof EditListingForm, string>>;

const initialForm: EditListingForm = {
  name: "",
  productType: "Plant",
  category: "",
  description: "",
  qty: 0,
  unit: "kg",
  price: 0,
  location: "",
  expiry: "",
};

export function FarmerListingEditPage({ listingId }: FarmerListingEditPageProps) {
  const [form, setForm] = useState<EditListingForm>(initialForm);
  const [errors, setErrors] = useState<EditListingErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadListing = useCallback(async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const listing = await getFarmerListingById(listingId);
      setForm({
        name: listing.productName || listing.title,
        productType: "Plant",
        category: listing.productName || listing.title,
        description: listing.title,
        qty: listing.quantity ?? 0,
        unit: listing.unit ?? "kg",
        price: listing.price ?? 0,
        location: "",
        expiry: "",
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load listing.");
    } finally {
      setIsLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    void loadListing();
  }, [loadListing]);

  function updateField(field: keyof EditListingForm, value: string | number) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleTextChange(field: keyof EditListingForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = field === "qty" || field === "price" ? Number(event.target.value) : event.target.value;
      updateField(field, value);
    };
  }

  function validateForm() {
    const nextErrors: EditListingErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.category.trim()) nextErrors.category = "Category is required.";
    if (!form.description.trim()) nextErrors.description = "Description is required.";
    if (!form.qty || form.qty <= 0) nextErrors.qty = "Quantity must be greater than 0.";
    if (!form.price || form.price <= 0) nextErrors.price = "Price must be greater than 0.";
    if (!form.location.trim()) nextErrors.location = "Location is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      await updateFarmerListing(listingId, form);
      setMessage("Listing updated successfully.");
      window.setTimeout(() => window.location.assign(`/farmer/listings/${listingId}`), 700);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update listing.");
      setIsSaving(false);
    }
  }

  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[920px] px-4 py-6 sm:px-5 lg:px-7">
        <Link className="inline-flex items-center gap-2 text-sm font-black text-emerald-800 hover:text-emerald-950" href={`/farmer/listings/${listingId}`}>
          <ArrowLeft className="size-4" />
          Back to listing
        </Link>
        <h1 className="mt-5 text-3xl font-black text-slate-950">Edit Listing</h1>

        {isLoading ? (
          <div className="mt-6 h-96 animate-pulse rounded-2xl border border-emerald-100 bg-white" />
        ) : (
          <form className="mt-6 grid gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField error={errors.name} label="Name" onChange={handleTextChange("name")} value={form.name} />
              <TextField error={errors.category} label="Category" onChange={handleTextChange("category")} value={form.category} />
              <TextField error={errors.qty} label="Quantity" onChange={handleTextChange("qty")} type="number" value={String(form.qty)} />
              <TextField error={errors.unit} label="Unit" onChange={handleTextChange("unit")} value={form.unit} />
              <TextField error={errors.price} label="Price" onChange={handleTextChange("price")} type="number" value={String(form.price)} />
              <TextField error={errors.location} label="Location" onChange={handleTextChange("location")} value={form.location} />
              <label className="block sm:col-span-2">
                <span className="text-sm font-black text-slate-700">Description</span>
                <textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-medium outline-none focus:border-emerald-700" onChange={handleTextChange("description")} value={form.description} />
                {errors.description ? <span className="mt-1.5 block text-xs font-semibold text-rose-600">{errors.description}</span> : null}
              </label>
            </div>
            {message ? <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">{message}</p> : null}
            <button className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 text-sm font-black text-white disabled:bg-slate-300" disabled={isSaving} type="submit">
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </FarmerDashboardLayout>
  );
}

function TextField({ error, label, onChange, type = "text", value }: { error?: string; label: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; type?: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3.5 text-sm font-medium outline-none focus:border-emerald-700" onChange={onChange} type={type} value={value} />
      {error ? <span className="mt-1.5 block text-xs font-semibold text-rose-600">{error}</span> : null}
    </label>
  );
}
