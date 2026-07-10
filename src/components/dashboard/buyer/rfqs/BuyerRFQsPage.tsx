"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileText, Handshake, MessageSquare, Package, Search, X } from "lucide-react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getStoredRole, getStoredUser } from "@/lib/auth-storage";
import {
  createBuyerDeal,
  getBuyerDealMessages,
  getBuyerRfqById,
  getBuyerRfqs,
  getBuyerUnreadNotificationCount,
  respondToBuyerRfqQuote,
  sendBuyerDealMessage,
  type ApiRecord,
  type BuyerDealCreatePayload,
} from "@/lib/buyer-api";
import type { BuyerRFQ, BuyerRFQStatus, CounterOfferForm, RFQQuote, RFQQuoteStatus } from "./buyer-rfqs.types";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rfq", label: "RFQ" },
];

const statusFilters = ["All", "Open", "Has Proposals", "Accepted", "Rejected", "Countered", "Closed"] as const;

const initialCounterForm: CounterOfferForm = {
  deliveryDate: "",
  message: "",
  price: "",
  quantity: "",
};

export function BuyerRFQsPage() {
  const router = useRouter();
  const [{ role, user }] = useState(() => ({
    role: getStoredRole(),
    user: getStoredUser(),
  }));
  const inFlightRfqsRef = useRef(false);
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";
  const [rfqs, setRfqs] = useState<BuyerRFQ[]>([]);
  const [selectedRfq, setSelectedRfq] = useState<BuyerRFQ | null>(null);
  const [selectedQuotes, setSelectedQuotes] = useState<RFQQuote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topbarSearchQuery, setTopbarSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsErrorMessage, setDetailsErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState("");
  const [confirmAction, setConfirmAction] = useState<{ kind: "accept" | "reject"; quote: RFQQuote } | null>(null);
  const [counterQuote, setCounterQuote] = useState<RFQQuote | null>(null);
  const [counterForm, setCounterForm] = useState<CounterOfferForm>(initialCounterForm);
  const [busyQuoteId, setBusyQuoteId] = useState("");

  const loadRfqs = useCallback(async () => {
    if (inFlightRfqsRef.current) {
      return;
    }

    inFlightRfqsRef.current = true;
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (process.env.NODE_ENV === "development") {
        console.log("[Buyer RFQs] fetching /rfqs/my");
      }

      const records = await getBuyerRfqs();
      setRfqs(records.map(normalizeBuyerRfq));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load RFQs.");
      setRfqs([]);
    } finally {
      inFlightRfqsRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (role && role !== "buyer") {
      router.replace(`/${role === "quality_officer" ? "quality-officer" : role}/dashboard`);
      return;
    }

    void loadRfqs();
  }, [loadRfqs, role, router, user]);

  const loadRfqDetails = useCallback(async (rfq: BuyerRFQ) => {
    setSelectedRfq(rfq);
    setSelectedQuotes([]);
    setDetailsErrorMessage("");
    setIsDetailsLoading(true);

    try {
      const details = await getBuyerRfqById(rfq.id);
      const normalizedRfq = normalizeBuyerRfq(details);
      const quotes = getQuotesFromRfq(details).map(normalizeRfqQuote);
      if (process.env.NODE_ENV === "development") {
        console.log("[Buyer RFQs] normalized selected RFQ:", normalizedRfq);
        console.log("[Buyer RFQs] normalized quotes:", quotes);
      }
      setSelectedRfq(normalizedRfq);
      setSelectedQuotes(quotes);
      setRfqs((current) => current.map((item) => (item.id === normalizedRfq.id ? normalizedRfq : item)));
    } catch (error) {
      setSelectedQuotes([]);
      setDetailsErrorMessage(error instanceof Error ? error.message : "Unable to load RFQ proposals.");
      showToast("Unable to load RFQ proposals.");
    } finally {
      setIsDetailsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedRfq) {
      return;
    }

    const currentRfq = selectedRfq;

    function handleFocus() {
      if (document.visibilityState !== "hidden") {
        void loadRfqDetails(currentRfq);
      }
    }

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [loadRfqDetails, selectedRfq]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  const filteredRfqs = useMemo(() => {
    const localSearch = searchQuery.trim().toLowerCase();
    const topbarSearch = topbarSearchQuery.trim().toLowerCase();
    const targetStatus = mapFilterToStatus(statusFilter);

    return rfqs.filter((rfq) => {
      const searchableText = `${rfq.id} ${rfq.productName} ${rfq.category ?? ""} ${rfq.location} ${rfq.notes}`.toLowerCase();
      const matchesSearch = (!localSearch || searchableText.includes(localSearch)) && (!topbarSearch || searchableText.includes(topbarSearch));
      const matchesStatus = !targetStatus || rfq.status === targetStatus;
      return matchesSearch && matchesStatus;
    });
  }, [rfqs, searchQuery, statusFilter, topbarSearchQuery]);

  const stats = useMemo(() => {
    return {
      dealsCreated: rfqs.filter((rfq) => rfq.status === "accepted" || rfq.status === "countered").length,
      openRfqs: rfqs.filter((rfq) => rfq.status === "open" || rfq.status === "has-proposals").length,
      proposalsReceived: rfqs.reduce((total, rfq) => total + rfq.proposalCount, 0),
      totalRfqs: rfqs.length,
    };
  }, [rfqs]);

  function openCounterModal(quote: RFQQuote) {
    setCounterQuote(quote);
    setCounterForm({
      deliveryDate: quote.deliveryDate ?? "",
      message: "",
      price: quote.price ? String(quote.price) : "",
      quantity: quote.quantity ? String(quote.quantity) : "",
    });
  }

  function handleCounterChange(field: keyof CounterOfferForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCounterForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleConfirmedAction() {
    if (!selectedRfq || !confirmAction) return;

    const { kind, quote } = confirmAction;
    setBusyQuoteId(quote.id);

    try {
      const response = await respondToBuyerRfqQuote(selectedRfq.id, quote.id, kind === "accept" ? mapAcceptQuotePayload() : mapRejectQuotePayload());
      await getBuyerUnreadNotificationCount().catch(() => undefined);

      if (kind === "reject") {
        setConfirmAction(null);
        showToast("Proposal rejected.");
        await refreshAfterAction(selectedRfq);
        return;
      }

      let dealId = "";
      try {
        dealId = await resolveDealId(response, selectedRfq, quote, {
          notes: "Hi, I accepted your proposal. Let's continue here.",
          price: quote.price,
          quantity: quote.quantity,
          deliveryDate: quote.deliveryDate,
        });
      } catch {
        setConfirmAction(null);
        showToast("Proposal accepted, but chat could not be opened.");
        await refreshAfterAction(selectedRfq);
        return;
      }

      await sendMessageIfNeeded(dealId, "Hi, I accepted your proposal. Let's continue here.").catch(() => undefined);
      setConfirmAction(null);
      showToast("Proposal accepted. Opening chat...");
      await refreshAfterAction(selectedRfq);
      router.push(`/buyer/messages?dealId=${encodeURIComponent(dealId)}`);
    } catch {
      showToast(kind === "accept" ? "Failed to accept proposal." : "Failed to reject proposal.");
    } finally {
      setBusyQuoteId("");
    }
  }

  async function handleCounterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedRfq || !counterQuote) return;

    const counterPrice = Number(counterForm.price);
    const counterQuantity = counterForm.quantity ? Number(counterForm.quantity) : undefined;

    if (!Number.isFinite(counterPrice) || counterPrice <= 0) {
      showToast("Enter a valid counter price.");
      return;
    }

    if (!counterForm.quantity || !Number.isFinite(counterQuantity) || Number(counterQuantity) <= 0) {
      showToast("Enter a valid counter quantity.");
      return;
    }

    if (!counterQuote.id) {
      showToast("This proposal is missing a quote id.");
      return;
    }

    if (!getFarmerIdFromQuote(counterQuote.raw) && !counterQuote.farmerId) {
      showToast("Farmer information is missing for this proposal.");
      return;
    }

    const counterMessage = counterForm.message.trim() || "Hi, I sent a counter offer for your proposal. Let's continue here.";
    setBusyQuoteId(counterQuote.id);

    try {
      if (process.env.NODE_ENV === "development") {
        console.log("[Buyer RFQ Counter] selected RFQ:", selectedRfq);
        console.log("[Buyer RFQ Counter] selected quote:", counterQuote);
      }

      const response = await respondToBuyerRfqQuote(selectedRfq.id, counterQuote.id, mapCounterQuotePayload(counterPrice));
      if (process.env.NODE_ENV === "development") {
        console.log("[Buyer RFQ Counter] PATCH response:", response);
      }

      let dealId = "";
      let messageFailed = false;

      try {
        dealId = await resolveDealId(response, selectedRfq, counterQuote, {
          deliveryDate: counterForm.deliveryDate || counterQuote.deliveryDate,
          notes: counterMessage,
          price: counterPrice,
          quantity: counterQuantity,
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[Buyer RFQs] Counter saved but deal chat handoff failed:", error);
        }
        showToast(error instanceof Error ? error.message : "Counter offer updated, but chat could not be opened.");
        await refreshAfterAction(selectedRfq);
        return;
      }

      if (!responseIncludesMessage(response)) {
        try {
          await sendMessageIfNeeded(dealId, counterMessage);
        } catch (error) {
          messageFailed = true;
          if (process.env.NODE_ENV === "development") {
            console.error("[Buyer RFQs] Counter message send failed:", error);
          }
        }
      }

      await getBuyerUnreadNotificationCount().catch(() => undefined);
      setCounterQuote(null);
      setCounterForm(initialCounterForm);
      showToast(messageFailed ? "Chat opened, but the counter message was not sent." : "Counter offer sent. Opening chat...");
      await refreshAfterAction(selectedRfq);

      if (messageFailed) {
        router.push(`/buyer/messages?dealId=${encodeURIComponent(dealId)}&notice=counterMessageFailed`);
        return;
      }

      router.push(`/buyer/messages?dealId=${encodeURIComponent(dealId)}`);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[Buyer RFQs] Failed to send counter offer:", error);
      }
      showToast("Failed to send counter offer.");
    } finally {
      setBusyQuoteId("");
    }
  }

  async function refreshAfterAction(rfq: BuyerRFQ) {
    await Promise.all([loadRfqs(), loadRfqDetails(rfq)]);
  }

  async function resolveDealId(
    response: ApiRecord,
    rfq: BuyerRFQ,
    quote: RFQQuote,
    values: { deliveryDate?: string; notes: string; price: number; quantity?: number },
  ) {
    const responseDealId = extractDealId(response) ?? quote.dealId;
    if (responseDealId) return responseDealId;

    const dealPayload = mapQuoteToDealPayload(rfq, quote, values);

    if (!dealPayload.farmerId) {
      throw new Error("Farmer information is missing for this proposal.");
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Buyer RFQ Counter] deal payload:", dealPayload);
    }

    const createdDeal = await createBuyerDeal(dealPayload);
    if (process.env.NODE_ENV === "development") {
      console.log("[Buyer RFQ Counter] deal response:", createdDeal);
    }

    const createdDealId = extractDealId(createdDeal);

    if (!createdDealId) {
      throw new Error("Deal was created but no dealId was returned.");
    }

    return createdDealId;
  }

  async function sendMessageIfNeeded(dealId: string, text: string) {
    const existingMessages = await getBuyerDealMessages(dealId).catch(() => []);
    const hasSameMessage = existingMessages.some((message) => getString(message.text ?? message.body ?? message.message ?? message.content) === text);

    if (!hasSameMessage) {
      const messagePayload = { text };
      if (process.env.NODE_ENV === "development") {
        console.log("[Buyer RFQ Counter] message payload:", messagePayload);
      }
      await sendBuyerDealMessage(dealId, messagePayload);
    }
  }

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      onSearchChange={setTopbarSearchQuery}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search RFQs, products, farmers..."
      searchValue={topbarSearchQuery}
      sidebarItems={buyerSidebarItems}
      userName={userName}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-5 lg:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">Buyer RFQs</h1>
            <p className="mt-1 text-sm font-medium text-slate-600">Review farmer proposals, respond to offers, and continue negotiations in chat.</p>
          </div>
          <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-900" href="/rfq">
            <FileText className="size-4" />
            Go to RFQ page
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={FileText} label="Total RFQs" value={stats.totalRfqs} />
          <SummaryCard icon={Package} label="Open RFQs" value={stats.openRfqs} />
          <SummaryCard icon={MessageSquare} label="Proposals Received" value={stats.proposalsReceived} />
          <SummaryCard icon={Handshake} label="Deals Created" value={stats.dealsCreated} />
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_150px]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm font-semibold outline-none transition focus:border-emerald-700"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search RFQs, products, farmers..."
                value={searchQuery}
              />
            </label>
            <select
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 outline-none transition focus:border-emerald-700"
              onChange={(event) => setStatusFilter(event.target.value as (typeof statusFilters)[number])}
              value={statusFilter}
            >
              {statusFilters.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <button className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-600 transition hover:border-emerald-200 hover:text-emerald-800" onClick={() => showToast("Date filter will be connected later.")} type="button">
              Date Filter
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
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
              <p className="text-lg font-black text-slate-950">No RFQs yet</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Your posted RFQs will appear here once created.</p>
              <Link className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-800 px-5 text-sm font-black text-white" href="/rfq">
                Go to RFQ page
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50 text-xs font-black uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">RFQ</th>
                    <th className="px-5 py-3">Quantity</th>
                    <th className="px-5 py-3">Location</th>
                    <th className="px-5 py-3">Deadline</th>
                    <th className="px-5 py-3">Budget</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Proposals</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRfqs.map((rfq) => (
                    <tr className="transition hover:bg-emerald-50/20" key={rfq.id}>
                      <td className="px-5 py-4">
                        <p className="font-black text-slate-950">{rfq.productName}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{rfq.id}</p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{rfq.quantity}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{rfq.location}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{rfq.deliveryDate}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{formatMoney(rfq.budget)}</td>
                      <td className="px-5 py-4"><RfqStatusBadge status={rfq.status} /></td>
                      <td className="px-5 py-4 font-black text-emerald-800">{rfq.proposalCount}</td>
                      <td className="px-5 py-4 text-right">
                        <button className="h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white transition hover:bg-emerald-900" onClick={() => void loadRfqDetails(rfq)} type="button">
                          View Proposals
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedRfq ? (
        <DetailsDrawer
          errorMessage={detailsErrorMessage}
          isLoading={isDetailsLoading}
          onClose={() => setSelectedRfq(null)}
          onRetry={() => void loadRfqDetails(selectedRfq)}
          onRefresh={() => void loadRfqDetails(selectedRfq)}
          rfq={selectedRfq}
        >
          {detailsErrorMessage ? null : selectedQuotes.length === 0 ? (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-bold text-slate-600">No proposals have been submitted for this RFQ yet.</div>
          ) : (
            <div className="grid gap-3">
              {selectedQuotes.map((quote) => (
                <ProposalCard
                  busyQuoteId={busyQuoteId}
                  key={quote.id}
                  onAccept={() => setConfirmAction({ kind: "accept", quote })}
                  onCounter={() => openCounterModal(quote)}
                  onReject={() => setConfirmAction({ kind: "reject", quote })}
                  quote={quote}
                />
              ))}
            </div>
          )}
        </DetailsDrawer>
      ) : null}

      {confirmAction ? (
        <Modal title={confirmAction.kind === "accept" ? "Accept Proposal" : "Reject Proposal"} onClose={() => setConfirmAction(null)}>
          <p className="text-sm font-semibold leading-6 text-slate-600">
            {confirmAction.kind === "accept" ? "Accept this proposal and open a deal chat?" : "Reject this proposal?"}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="h-10 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white disabled:bg-slate-300" disabled={Boolean(busyQuoteId)} onClick={() => void handleConfirmedAction()} type="button">
              {busyQuoteId ? "Working..." : "Confirm"}
            </button>
            <button className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-black text-slate-600" onClick={() => setConfirmAction(null)} type="button">
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}

      {counterQuote ? (
        <Modal title="Counter Offer" onClose={() => setCounterQuote(null)}>
          <form className="grid gap-3.5" onSubmit={handleCounterSubmit}>
            <Field label="Counter price" onChange={handleCounterChange("price")} type="number" value={counterForm.price} />
            <Field label="Counter quantity" onChange={handleCounterChange("quantity")} type="number" value={counterForm.quantity} />
            <Field label="Counter delivery date" onChange={handleCounterChange("deliveryDate")} type="date" value={counterForm.deliveryDate} />
            <TextArea label="Counter message / notes" onChange={handleCounterChange("message")} value={counterForm.message} />
            <div className="flex flex-wrap gap-3">
              <button className="h-10 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white disabled:bg-slate-300" disabled={Boolean(busyQuoteId)} type="submit">
                {busyQuoteId ? "Sending..." : "Send Counter Offer"}
              </button>
              <button className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-black text-slate-600" onClick={() => setCounterQuote(null)} type="button">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

function SummaryCard({ icon: Icon, label, value }: { icon: typeof FileText; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
        </div>
        <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}

function DetailsDrawer({
  children,
  errorMessage,
  isLoading,
  onClose,
  onRefresh,
  onRetry,
  rfq,
}: {
  children: ReactNode;
  errorMessage: string;
  isLoading: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onRetry: () => void;
  rfq: BuyerRFQ;
}) {
  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/30">
      <aside className="ml-auto flex h-full w-full max-w-[520px] flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">RFQ Details</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{rfq.productName}</h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">{rfq.id}</p>
          </div>
          <button aria-label="Close RFQ details" className="grid size-9 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="grid gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 text-sm">
            <InfoRow label="Quantity" value={rfq.quantity} />
            <InfoRow label="Location" value={rfq.location} />
            <InfoRow label="Deadline" value={rfq.deliveryDate} />
            <InfoRow label="Budget" value={formatMoney(rfq.budget)} />
            <InfoRow label="Created" value={rfq.createdAt} />
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Notes</p>
              <p className="mt-1 font-semibold leading-6 text-slate-700">{rfq.notes}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">Farmer Proposals</h3>
            <div className="flex items-center gap-2">
              <button className="h-8 rounded-lg border border-slate-200 px-3 text-xs font-black text-slate-600 transition hover:border-emerald-200 hover:text-emerald-800" onClick={onRefresh} type="button">
                Refresh
              </button>
              <RfqStatusBadge status={rfq.status} />
            </div>
          </div>
          <div className="mt-3">
            {isLoading ? (
              <div className="p-4 text-sm font-black text-slate-600">Loading proposals...</div>
            ) : errorMessage ? (
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm">
                <p className="font-black text-rose-700">{errorMessage}</p>
                <button className="mt-3 h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white" onClick={onRetry} type="button">
                  Retry
                </button>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ProposalCard({ busyQuoteId, onAccept, onCounter, onReject, quote }: { busyQuoteId: string; onAccept: () => void; onCounter: () => void; onReject: () => void; quote: RFQQuote }) {
  const canAct = ["pending", "submitted", "open", "under-review"].includes(quote.status);
  const isBusy = busyQuoteId === quote.id;

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {quote.avatarUrl ? (
            <span aria-hidden="true" className="size-10 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${quote.avatarUrl})` }} />
          ) : (
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">
              {getInitials(quote.farmerName)}
            </span>
          )}
          <div className="min-w-0">
            <h4 className="truncate font-black text-slate-950">{quote.farmerName}</h4>
            <p className="mt-1 text-xs font-semibold text-slate-500">{quote.farmerLocation ?? "Location not specified"}</p>
          </div>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <InfoRow label="Price" value={formatMoney(quote.price)} />
        <InfoRow label="Quantity" value={formatQuantity(quote.quantity, quote.unit)} />
        <InfoRow label="Delivery" value={quote.deliveryDate ? formatDate(quote.deliveryDate) : "Not scheduled"} />
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{quote.message || "No proposal message provided."}</p>
      <p className="mt-2 text-xs font-semibold text-slate-400">Submitted {quote.submittedAt}</p>
      {canAct ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white disabled:bg-slate-300" disabled={isBusy || Boolean(busyQuoteId)} onClick={onAccept} type="button">
            {isBusy ? "Working..." : "Accept"}
          </button>
          <button className="h-9 rounded-lg border border-amber-200 px-4 text-xs font-black text-amber-700 disabled:text-slate-300" disabled={isBusy || Boolean(busyQuoteId)} onClick={onCounter} type="button">
            Counter Offer
          </button>
          <button className="h-9 rounded-lg border border-rose-200 px-4 text-xs font-black text-rose-700 disabled:text-slate-300" disabled={isBusy || Boolean(busyQuoteId)} onClick={onReject} type="button">
            Reject
          </button>
        </div>
      ) : null}
    </article>
  );
}

function Modal({ children, onClose, title }: { children: ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/40 px-4 py-8">
      <section className="w-full max-w-[460px] rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-black text-slate-950">{title}</h2>
          <button aria-label="Close modal" className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}

function Field({ label, onChange, type = "text", value }: { label: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; type?: string; value: string }) {
  return (
    <label>
      <span className="text-sm font-black text-slate-900">{label}</span>
      <input className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-700" onChange={onChange} type={type} value={value} />
    </label>
  );
}

function TextArea({ label, onChange, value }: { label: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; value: string }) {
  return (
    <label>
      <span className="text-sm font-black text-slate-900">{label}</span>
      <textarea className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-700" onChange={onChange} value={value} />
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function RfqStatusBadge({ status }: { status: BuyerRFQStatus }) {
  const tone = status === "accepted" ? "emerald" : status === "rejected" || status === "closed" ? "rose" : status === "countered" ? "amber" : status === "has-proposals" ? "sky" : "slate";
  return <StatusBadge label={status === "has-proposals" ? "Has Proposals" : status} tone={tone} />;
}

function QuoteStatusBadge({ status }: { status: RFQQuoteStatus }) {
  const tone = status === "accepted" ? "emerald" : status === "rejected" || status === "closed" ? "rose" : status === "countered" ? "amber" : "slate";
  return <StatusBadge label={status} tone={tone} />;
}

function normalizeBuyerRfq(record: ApiRecord): BuyerRFQ {
  const data = unwrapRfqRecord(record);
  const id = String(data.id ?? data._id ?? "");
  const quotes = getQuotesFromRfq(data);
  const quoteStatuses = quotes.map((quote) => normalizeQuoteStatus(quote.status ?? quote.action));
  const baseStatus = normalizeRfqStatus(data.status, quotes.length, quoteStatuses);
  const unit = getString(data.unit);
  const quantity = getString(data.quantity ?? data.qty);

  return {
    budget: getNumber(data.budget),
    category: getString(data.category ?? data.commodity),
    createdAt: formatDate(data.createdAt),
    deliveryDate: formatDate(data.deliveryDate ?? data.deadline),
    id,
    location: getString(data.location) ?? "Not specified",
    notes: getString(data.notes ?? data.description) ?? "No notes provided.",
    productName: getString(data.productType ?? data.productName ?? data.commodity ?? data.title) ?? "Product",
    proposalCount: getNumber(data.proposalCount ?? data.proposalsCount ?? data.quotesCount ?? data.offersCount ?? data.bidsCount ?? data.rfqQuotesCount) ?? quotes.length,
    quantity: quantity ? `${quantity}${unit ? ` ${unit}` : ""}` : "Not specified",
    raw: data,
    status: baseStatus,
    updatedAt: formatDate(data.updatedAt ?? data.createdAt),
  };
}

function normalizeRfqQuote(record: ApiRecord): RFQQuote {
  const quote = asRecord(record.quote ?? record.rfqQuote ?? record.proposal ?? record.bid ?? record.offer ?? record);
  const farmer = asRecord(quote.farmer ?? quote.farmerProfile ?? quote.seller ?? quote.profile ?? quote.user);
  const farmerUser = asRecord(farmer.user ?? quote.farmerUser ?? quote.user);

  return {
    avatarUrl: getString(farmer.profileImage ?? farmer.avatarUrl ?? farmer.avatar ?? farmerUser.avatarUrl ?? farmerUser.avatar),
    dealId: extractDealId(quote),
    deliveryDate: getString(quote.deliveryDate ?? quote.delivery_date ?? quote.deadline),
    farmerId: getFarmerIdFromQuote(quote),
    farmerLocation: getString(farmer.location ?? farmer.region ?? farmer.address ?? quote.farmerLocation),
    farmerName: getString(farmer.fullName ?? farmer.name ?? farmer.farmName ?? farmerUser.fullName ?? farmerUser.name ?? quote.farmerName) ?? "Farmer",
    id: getQuoteId(quote),
    message: getString(quote.message ?? quote.notes ?? quote.proposal ?? quote.proposalText ?? quote.description ?? quote.content) ?? "",
    price: getNumber(quote.price ?? quote.proposedPrice ?? quote.offerPrice ?? quote.counterPrice) ?? 0,
    quantity: getNumber(quote.quantity ?? quote.qty ?? quote.proposedQuantity),
    raw: quote,
    status: normalizeQuoteStatus(quote.status ?? quote.action),
    submittedAt: formatDate(quote.createdAt ?? quote.submittedAt),
    unit: getString(quote.unit),
  };
}

function getQuotesFromRfq(record: ApiRecord) {
  const data = unwrapRfqRecord(record);
  const roots = [record, data, asRecord(record.data), asRecord(asRecord(record.data).rfq), asRecord(record.rfq)];
  const keys = ["quotes", "proposals", "bids", "offers", "rfqQuotes", "quote"];

  for (const root of roots) {
    for (const key of keys) {
      const value = root[key];
      if (Array.isArray(value)) return value.map(asRecord);
      if (value && typeof value === "object") return [asRecord(value)];
    }
  }

  return findNestedQuoteRecords(record, keys);
}

function unwrapRfqRecord(record: ApiRecord) {
  const data = asRecord(record.data);
  const candidate = data.rfq ?? record.rfq ?? record.item ?? record.result ?? data.item ?? data.result;

  if (candidate && typeof candidate === "object") {
    return asRecord(candidate);
  }

  return Object.keys(data).length > 0 ? data : record;
}

function findNestedQuoteRecords(value: unknown, keys: string[], visited = new WeakSet<object>()): ApiRecord[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  if (visited.has(value)) {
    return [];
  }

  visited.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      const nestedQuotes = findNestedQuoteRecords(item, keys, visited);
      if (nestedQuotes.length > 0) return nestedQuotes;
    }

    return [];
  }

  const record = asRecord(value);

  for (const key of keys) {
    const entry = record[key];
    if (Array.isArray(entry)) return entry.map(asRecord);
    if (entry && typeof entry === "object") return [asRecord(entry)];
  }

  for (const entry of Object.values(record)) {
    const nestedQuotes = findNestedQuoteRecords(entry, keys, visited);
    if (nestedQuotes.length > 0) return nestedQuotes;
  }

  return [];
}

function mapAcceptQuotePayload() {
  return { action: "accept" as const };
}

function mapRejectQuotePayload() {
  return { action: "reject" as const };
}

function mapCounterQuotePayload(counterPrice: number) {
  return { action: "counter" as const, counterPrice };
}

function mapQuoteToDealPayload(
  rfq: BuyerRFQ,
  quote: RFQQuote,
  values: { deliveryDate?: string; notes: string; price: number; quantity?: number },
): BuyerDealCreatePayload {
  return {
    deliveryDate: values.deliveryDate,
    farmerId: quote.farmerId ?? getFarmerIdFromQuote(quote.raw),
    notes: values.notes,
    price: values.price,
    quantity: values.quantity ?? quote.quantity ?? getNumber(rfq.raw.quantity) ?? 1,
    rfqId: rfq.id,
    source: "rfq",
  };
}

function extractDealId(record: ApiRecord): string | undefined {
  for (const item of getDealCandidateRecords(record)) {
    const directDealId = getString(item.dealId ?? item.deal_id ?? item.dealID);
    if (directDealId) return directDealId;

    const deal = asRecord(item.deal);
    const nestedDealId = getString(deal.id ?? deal._id ?? deal.dealId ?? deal.deal_id);
    if (nestedDealId) return nestedDealId;
  }

  return undefined;
}

function responseIncludesMessage(record: ApiRecord) {
  const data = asRecord(record.data);
  const result = asRecord(record.result ?? data.result);
  const item = asRecord(record.item ?? data.item);
  const candidates = [record, data, result, item];

  for (const candidate of candidates) {
    if (getString(candidate.messageId ?? candidate.message_id)) {
      return true;
    }

    const message = candidate.message ?? candidate.createdMessage ?? candidate.chatMessage;
    if (Array.isArray(candidate.messages) && candidate.messages.length > 0) {
      return true;
    }

    if (message && typeof message === "object") {
      const messageRecord = asRecord(message);
      if (getString(messageRecord.id ?? messageRecord._id ?? messageRecord.text ?? messageRecord.content ?? messageRecord.body)) {
        return true;
      }
    }
  }

  return false;
}

function getDealCandidateRecords(record: ApiRecord) {
  const data = asRecord(record.data);
  const result = asRecord(record.result ?? data.result);
  const item = asRecord(record.item ?? data.item);
  return [
    record,
    data,
    result,
    item,
    asRecord(record.deal),
    asRecord(data.deal),
    asRecord(result.deal),
    asRecord(item.deal),
    asRecord(record.quote ?? record.rfqQuote ?? record.proposal ?? record.bid ?? record.offer),
    asRecord(data.quote ?? data.rfqQuote ?? data.proposal ?? data.bid ?? data.offer),
    asRecord(result.quote ?? result.rfqQuote ?? result.proposal ?? result.bid ?? result.offer),
    asRecord(item.quote ?? item.rfqQuote ?? item.proposal ?? item.bid ?? item.offer),
  ];
}

function getQuoteId(quote: ApiRecord) {
  return getString(quote.id ?? quote._id ?? quote.quoteId ?? quote.quote_id ?? quote.qid ?? quote.uuid) ?? "";
}

function getFarmerIdFromQuote(quote: ApiRecord) {
  const farmer = asRecord(quote.farmer ?? quote.farmerProfile ?? quote.seller ?? quote.profile ?? quote.user);
  const farmerUser = asRecord(farmer.user ?? quote.farmerUser);
  return getString(
    quote.farmerId ??
      quote.farmer_id ??
      quote.sellerId ??
      quote.seller_id ??
      farmer.id ??
      farmer._id ??
      farmer.farmerId ??
      farmer.farmer_id ??
      farmer.userId ??
      farmer.user_id ??
      farmerUser.id ??
      farmerUser._id,
  );
}

function normalizeRfqStatus(value: unknown, quoteCount: number, quoteStatuses: RFQQuoteStatus[]): BuyerRFQStatus {
  const status = getString(value)?.toLowerCase().replaceAll("_", "-");
  if (status === "accepted" || quoteStatuses.includes("accepted")) return "accepted";
  if (status === "rejected") return "rejected";
  if (status === "countered" || quoteStatuses.includes("countered")) return "countered";
  if (status === "closed" || status === "cancelled") return "closed";
  if (quoteCount > 0) return "has-proposals";
  return "open";
}

function normalizeQuoteStatus(value: unknown): RFQQuoteStatus {
  const status = getString(value)?.toLowerCase().replaceAll("_", "-");
  if (status === "accepted" || status === "accept") return "accepted";
  if (status === "rejected" || status === "reject") return "rejected";
  if (status === "countered" || status === "counter") return "countered";
  if (status === "submitted") return "submitted";
  if (status === "open") return "open";
  if (status === "under-review" || status === "underreview") return "under-review";
  if (status === "cancelled" || status === "canceled") return "cancelled";
  if (status === "closed" || status === "cancelled") return "closed";
  return "pending";
}

function mapFilterToStatus(filter: (typeof statusFilters)[number]): BuyerRFQStatus | undefined {
  if (filter === "Open") return "open";
  if (filter === "Has Proposals") return "has-proposals";
  if (filter === "Accepted") return "accepted";
  if (filter === "Rejected") return "rejected";
  if (filter === "Countered") return "countered";
  if (filter === "Closed") return "closed";
  return undefined;
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function formatDate(value: unknown) {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Not scheduled";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatQuantity(quantity: unknown, unit?: string) {
  const value = getNumber(quantity) ?? getString(quantity);
  if (value === undefined) return "Not specified";
  return `${value}${unit ? ` ${unit}` : ""}`;
}

function formatMoney(value: unknown) {
  const number = getNumber(value);
  if (number === undefined) return "Not specified";
  return new Intl.NumberFormat("en", { maximumFractionDigits: 2, style: "currency", currency: "USD" }).format(number);
}

function getInitials(value: string) {
  return (
    value
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "FR"
  );
}
