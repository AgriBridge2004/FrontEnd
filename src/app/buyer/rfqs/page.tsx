"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { getStoredUser } from "@/lib/auth-storage";
import { getBuyerRfqs, type ApiRecord } from "@/lib/buyer-api";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

export default function BuyerRfqsPage() {
  const [rfqs, setRfqs] = useState<ApiRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  useEffect(() => {
    void loadRfqs();
  }, []);

  async function loadRfqs() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      setRfqs(await getBuyerRfqs());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load RFQs.");
      setRfqs([]);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredRfqs = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (!normalizedSearch) return rfqs;

    return rfqs.filter((rfq) => `${rfq.productType ?? ""} ${rfq.location ?? ""} ${rfq.status ?? ""}`.toLowerCase().includes(normalizedSearch));
  }, [rfqs, searchQuery]);

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      onSearchChange={setSearchQuery}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search RFQs..."
      searchValue={searchQuery}
      sidebarItems={buyerSidebarItems}
      userName={userName}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950">My RFQs</h1>
            <p className="mt-1 text-sm font-medium text-slate-600">Track purchase requests and farmer quotes.</p>
          </div>
          <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white" href="/buyer/rfqs/create">
            <Plus className="size-4" />
            Create RFQ
          </Link>
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
              <p className="mt-1 text-sm font-semibold text-slate-500">Create your first RFQ to start receiving quotes.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Quantity</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Delivery</th>
                    <th className="px-5 py-4">Budget</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRfqs.map((rfq) => (
                    <tr className="hover:bg-emerald-50/20" key={String(rfq.id ?? rfq._id)}>
                      <td className="px-5 py-4 font-black text-slate-950">{String(rfq.productType ?? "Product")}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.quantity ?? "Not specified")}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.location ?? "Not specified")}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.deliveryDate ?? "Not scheduled")}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{String(rfq.budget ?? "Not specified")}</td>
                      <td className="px-5 py-4 font-black text-emerald-800">{String(rfq.status ?? "Open")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
