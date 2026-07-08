"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { getStoredUser } from "@/lib/auth-storage";
import { createBuyerRfq } from "@/lib/buyer-api";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

type RfqForm = {
  productType: string;
  quantity: string;
  location: string;
  deliveryDate: string;
  budget: string;
  notes: string;
};

const initialForm: RfqForm = {
  budget: "",
  deliveryDate: "",
  location: "",
  notes: "",
  productType: "",
  quantity: "",
};

export default function CreateBuyerRfqPage() {
  const router = useRouter();
  const [form, setForm] = useState<RfqForm>(initialForm);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  function handleChange(field: keyof RfqForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const quantity = Number(form.quantity);
    const budget = form.budget ? Number(form.budget) : undefined;

    if (!form.productType.trim() || !Number.isFinite(quantity) || quantity <= 0 || !form.location.trim()) {
      setMessage("Product, quantity, and location are required.");
      return;
    }

    setIsSaving(true);

    try {
      await createBuyerRfq({
        budget: Number.isFinite(budget) ? budget : undefined,
        deliveryDate: form.deliveryDate || undefined,
        location: form.location.trim(),
        notes: form.notes.trim() || undefined,
        productType: form.productType.trim(),
        quantity,
      });
      setMessage("RFQ created successfully.");
      window.setTimeout(() => router.push("/buyer/rfqs"), 700);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create RFQ.");
      setIsSaving(false);
    }
  }

  return (
    <DashboardLayout navLinks={buyerTopbarLinks} profileHref="/buyer/profile" role="buyer" searchPlaceholder="Search RFQs..." sidebarItems={buyerSidebarItems} userName={userName}>
      <div className="mx-auto w-full max-w-[920px] px-4 py-8 sm:px-5 lg:px-7">
        <h1 className="text-2xl font-black text-slate-950">Create RFQ</h1>
        <p className="mt-1 text-sm font-medium text-slate-600">Post a structured agricultural purchase request.</p>

        <form className="mt-6 grid gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
          <Field label="Product Type" value={form.productType} onChange={handleChange("productType")} placeholder="Tomatoes" />
          <Field label="Quantity" value={form.quantity} onChange={handleChange("quantity")} placeholder="1000" type="number" />
          <Field label="Location" value={form.location} onChange={handleChange("location")} placeholder="Gaza" />
          <Field label="Delivery Date" value={form.deliveryDate} onChange={handleChange("deliveryDate")} type="date" />
          <Field label="Budget" value={form.budget} onChange={handleChange("budget")} placeholder="5000" type="number" />
          <label>
            <span className="text-sm font-black text-slate-900">Notes</span>
            <textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-700" onChange={handleChange("notes")} value={form.notes} />
          </label>
          {message ? <p className="text-sm font-black text-slate-700">{message}</p> : null}
          <button className="h-11 rounded-lg bg-emerald-800 px-6 text-sm font-black text-white disabled:bg-slate-300" disabled={isSaving} type="submit">
            {isSaving ? "Creating..." : "Create RFQ"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Field({
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label>
      <span className="text-sm font-black text-slate-900">{label}</span>
      <input className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-700" onChange={onChange} placeholder={placeholder} type={type} value={value} />
    </label>
  );
}
