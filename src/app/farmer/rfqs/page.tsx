"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { getOpenRfqs, submitRfqQuote, type ApiRecord } from "@/lib/workflow-api";

type QuoteForm = {
  price: string;
  message: string;
};

const initialQuoteForm: QuoteForm = {
  message: "",
  price: "",
};

export default function FarmerRfqsPage() {
  const [rfqs, setRfqs] = useState<ApiRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRfqId, setActiveRfqId] = useState("");
  const [quoteForm, setQuoteForm] = useState<QuoteForm>(initialQuoteForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    void loadRfqs();
  }, []);

  async function loadRfqs() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      setRfqs(await getOpenRfqs());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load RFQs.");
      setRfqs([]);
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  const filteredRfqs = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (!normalizedSearch) return rfqs;

    return rfqs.filter((rfq) => {
      const searchableText = `${rfq.productType ?? ""} ${rfq.location ?? ""} ${rfq.notes ?? ""}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [rfqs, searchQuery]);

  function handleQuoteChange(field: keyof QuoteForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuoteForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleSubmitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(quoteForm.price);

    if (!activeRfqId || !Number.isFinite(price) || price <= 0) {
      showToast("Enter a valid quote price.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRfqQuote(activeRfqId, {
        message: quoteForm.message.trim() || undefined,
        price,
      });
      setQuoteForm(initialQuoteForm);
      setActiveRfqId("");
      showToast("Quote submitted successfully.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to submit quote.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FarmerDashboardLayout onSearchChange={setSearchQuery} searchPlaceholder="Search open RFQs..." searchValue={searchQuery}>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Farmer RFQs</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">Review buyer purchase requests and submit quotes.</p>
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-6 text-sm font-black text-slate-600">Loading RFQs...</div>
          ) : errorMessage ? (
            <div className="p-6 text-center">
              <p className="text-sm font-black text-slate-900">{errorMessage}</p>
              <button className="mt-3 h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white" onClick={loadRfqs} type="button">
                Retry
              </button>
            </div>
          ) : filteredRfqs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black text-slate-950">No RFQs found.</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Open buyer purchase requests will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Quantity</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Delivery</th>
                    <th className="px-5 py-4">Budget</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRfqs.map((rfq) => {
                    const rfqId = String(rfq.id ?? rfq._id ?? "");
                    return (
                      <tr className="hover:bg-emerald-50/20" key={rfqId}>
                        <td className="px-5 py-4 font-black text-slate-950">{String(rfq.productType ?? "Product")}</td>
                        <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.quantity ?? "Not specified")}</td>
                        <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.location ?? "Not specified")}</td>
                        <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.deliveryDate ?? "Not scheduled")}</td>
                        <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.budget ?? "Not specified")}</td>
                        <td className="px-5 py-4">
                          <button
                            className="h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white transition hover:bg-emerald-900"
                            onClick={() => setActiveRfqId(rfqId)}
                            type="button"
                          >
                            Submit Quote
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {activeRfqId ? (
          <form className="mt-5 grid gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm" onSubmit={handleSubmitQuote}>
            <h2 className="text-lg font-black text-slate-950">Submit Quote</h2>
            <label>
              <span className="text-sm font-black text-slate-900">Price</span>
              <input
                className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-700"
                onChange={handleQuoteChange("price")}
                type="number"
                value={quoteForm.price}
              />
            </label>
            <label>
              <span className="text-sm font-black text-slate-900">Message</span>
              <textarea
                className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-700"
                onChange={handleQuoteChange("message")}
                value={quoteForm.message}
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <button className="h-10 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white disabled:bg-slate-300" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Submit Quote"}
              </button>
              <button className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-black text-slate-600" onClick={() => setActiveRfqId("")} type="button">
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </FarmerDashboardLayout>
  );
}
