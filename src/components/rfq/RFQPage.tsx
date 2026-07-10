"use client";

import { ChangeEvent, FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { CheckCircle2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { MarketplaceNavbar } from "@/components/marketplace/MarketplaceNavbar";
import { RFQFiltersBar } from "@/components/rfq/RFQFiltersBar";
import { RFQFooter } from "@/components/rfq/RFQFooter";
import { RFQHelpCard } from "@/components/rfq/RFQHelpCard";
import { RFQHero } from "@/components/rfq/RFQHero";
import { RFQMarketSnapshot } from "@/components/rfq/RFQMarketSnapshot";
import { RFQRequestList } from "@/components/rfq/RFQRequestList";
import { RFQTipsCard } from "@/components/rfq/RFQTipsCard";
import { RFQ_IMAGE_FALLBACK } from "@/components/rfq/rfq.mock";
import type { RFQFilters, RFQRequest, RFQStatus } from "@/components/rfq/rfq.types";
import { buttonClasses } from "@/components/ui/Button";
import { Pagination } from "@/components/shared/Pagination";
import { cn } from "@/lib/cn";
import { getListingInteractionUser } from "@/lib/listing-interactions";
import {
  createDeal,
  createRfq,
  getDealMessages,
  getMyRfqs,
  getOpenRfqs,
  getRfqById,
  sendDealMessage,
  submitRfqQuote,
  type ApiRecord,
  type DealCreatePayload,
} from "@/lib/workflow-api";

const initialFilters: RFQFilters = {
  commodityType: "All Commodities",
  status: "All Statuses",
  region: "All Regions",
};

const initialRfqForm = {
  budget: "",
  deliveryDate: "",
  location: "",
  notes: "",
  productType: "",
  quantity: "",
};

const initialProposalForm = {
  message: "",
  price: "",
};

export function RFQPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<RFQFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [requests, setRequests] = useState<RFQRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RFQRequest | null>(null);
  const [rfqForm, setRfqForm] = useState(initialRfqForm);
  const [proposalForm, setProposalForm] = useState(initialProposalForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void loadRfqs();
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  async function loadRfqs() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { role } = getListingInteractionUser();
      const records = role === "buyer" ? await getMyRfqs() : await getOpenRfqs();
      setRequests(records.map(mapRfqFromApi).filter((request) => request.id));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load RFQs.");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesCommodity = filters.commodityType === "All Commodities" || request.category === filters.commodityType;
      const matchesStatus =
        filters.status === "All Statuses" ||
        (filters.status === "Open for Bids" && request.status === "open") ||
        (filters.status === "Closing Soon" && request.status === "closing-soon") ||
        (filters.status === "Submitted" && request.status === "submitted");
      const matchesRegion = filters.region === "All Regions" || request.location === filters.region;

      return matchesCommodity && matchesStatus && matchesRegion;
    });
  }, [filters, requests]);

  function handleFiltersChange(nextFilters: RFQFilters) {
    setFilters(nextFilters);
    setCurrentPage(1);
  }

  function requireRole(allowedRole: "buyer" | "farmer", blockedMessage: string) {
    const { isAuthenticated, role } = getListingInteractionUser();

    if (!isAuthenticated || !role) {
      setToastMessage("Please log in to continue.");
      return false;
    }

    if (role !== allowedRole) {
      setToastMessage(blockedMessage);
      return false;
    }

    return true;
  }

  function handleOpenCreate() {
    if (!requireRole("buyer", "Only buyers can post RFQs.")) {
      return;
    }

    setIsCreateOpen(true);
  }

  function handleOpenProposal(request: RFQRequest) {
    if (!requireRole("farmer", "Only farmers can submit proposals.")) {
      return;
    }

    setSelectedRequest(request);
    setIsProposalOpen(true);
  }

  function handleRfqFormChange(field: keyof typeof initialRfqForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRfqForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function handleProposalFormChange(field: keyof typeof initialProposalForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProposalForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleCreateRfq(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const quantity = Number(rfqForm.quantity);
    const budget = rfqForm.budget ? Number(rfqForm.budget) : undefined;

    if (!rfqForm.productType.trim() || !Number.isFinite(quantity) || quantity <= 0 || !rfqForm.location.trim()) {
      setToastMessage("Product, quantity, and location are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createRfq({
        budget: Number.isFinite(budget) ? budget : undefined,
        deliveryDate: rfqForm.deliveryDate || undefined,
        location: rfqForm.location.trim(),
        notes: rfqForm.notes.trim() || undefined,
        productType: rfqForm.productType.trim(),
        quantity,
      });
      setToastMessage("RFQ created successfully.");
      setRfqForm(initialRfqForm);
      setIsCreateOpen(false);
      await loadRfqs();
    } catch {
      setToastMessage("Failed to create RFQ.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmitProposal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedRequest) {
      return;
    }

    const price = Number(proposalForm.price);

    if (!Number.isFinite(price) || price <= 0) {
      setToastMessage("Enter a valid proposal price.");
      return;
    }

    setIsSubmitting(true);

    try {
      const request = selectedRequest;
      const proposalMessage = proposalForm.message.trim() || "Hi, I submitted a proposal for your RFQ.";
      const quoteResponse = await submitRfqQuote(request.id, {
        message: proposalMessage,
        price,
      });
      const refreshedRfq = await getRfqById(request.id).catch(() => null);
      let dealId = extractDealId(quoteResponse) ?? (refreshedRfq ? extractDealId(refreshedRfq) : undefined);

      setProposalForm(initialProposalForm);
      setSelectedRequest(null);
      setIsProposalOpen(false);
      await loadRfqs();

      if (!dealId) {
        try {
          dealId = extractDealId(await createDeal(mapRfqProposalToDealPayload(request, quoteResponse, price, proposalMessage)));
        } catch {
          setToastMessage("Proposal submitted, but chat could not be opened. Please try again.");
          return;
        }
      }

      if (dealId) {
        try {
          await sendProposalMessageIfNeeded(dealId, proposalMessage);
        } catch {
          setToastMessage("Proposal submitted, but failed to open chat.");
          return;
        }

        setToastMessage("Proposal sent. Opening chat...");
        router.push(`/farmer/messages?dealId=${encodeURIComponent(dealId)}`);
      } else {
        setToastMessage("Proposal submitted, but chat could not be opened. Please try again.");
      }
    } catch (error) {
      setToastMessage(isQuoteAlreadyCreatedError(error) ? "Proposal submitted, but chat could not be opened. Please try again." : "Failed to submit proposal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900" dir="ltr">
      <MarketplaceNavbar activeLink="RFQ" />
      <RFQHero />

      <main className="mx-auto grid max-w-[1280px] gap-5 px-5 py-6 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8">
        <section className="min-w-0">
          <RFQFiltersBar filters={filters} visibleCount={filteredRequests.length} onFiltersChange={handleFiltersChange} />
          <div className="mt-6">
            {isLoading ? (
              <div className="rounded-xl border border-emerald-100 bg-white p-6 text-sm font-black text-slate-600 shadow-sm">Loading RFQs...</div>
            ) : errorMessage ? (
              <div className="rounded-xl border border-red-100 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-black text-slate-900">{errorMessage}</p>
                <button className="mt-3 h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white" onClick={loadRfqs} type="button">
                  Retry
                </button>
              </div>
            ) : (
              <RFQRequestList requests={filteredRequests} onSubmitProposal={handleOpenProposal} />
            )}
          </div>
          <Pagination className="mt-9" currentPage={currentPage} totalPages={Math.max(1, Math.ceil(filteredRequests.length / 12))} onPageChange={setCurrentPage} />
        </section>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
          <button
            className={cn(buttonClasses("primary"), "h-12 rounded-xl bg-emerald-800 text-sm font-black shadow-lg shadow-emerald-900/10 hover:bg-emerald-900")}
            onClick={handleOpenCreate}
            type="button"
          >
            <PlusCircle className="mr-2 size-4" />
            Post New RFQ
          </button>
          <RFQTipsCard onViewGuides={() => setToastMessage("Guides will be connected later.")} />
          <RFQHelpCard onContactSupport={() => setToastMessage("Support contact will be connected later.")} />
          <RFQMarketSnapshot />
        </aside>
      </main>

      <RFQFooter />

      {isCreateOpen ? (
        <RfqModal title="Post New RFQ" onClose={() => setIsCreateOpen(false)}>
          <form className="grid gap-3.5" onSubmit={handleCreateRfq}>
            <Field label="Product Type" value={rfqForm.productType} onChange={handleRfqFormChange("productType")} placeholder="Tomatoes" />
            <Field label="Quantity" value={rfqForm.quantity} onChange={handleRfqFormChange("quantity")} placeholder="1000" type="number" />
            <Field label="Location" value={rfqForm.location} onChange={handleRfqFormChange("location")} placeholder="Gaza" />
            <Field label="Delivery Date" value={rfqForm.deliveryDate} onChange={handleRfqFormChange("deliveryDate")} type="date" />
            <Field label="Budget" value={rfqForm.budget} onChange={handleRfqFormChange("budget")} placeholder="5000" type="number" />
            <TextArea label="Notes" value={rfqForm.notes} onChange={handleRfqFormChange("notes")} />
            <ModalActions isSubmitting={isSubmitting} submitLabel="Create RFQ" onCancel={() => setIsCreateOpen(false)} />
          </form>
        </RfqModal>
      ) : null}

      {isProposalOpen && selectedRequest ? (
        <RfqModal title={`Submit Proposal for ${selectedRequest.title}`} onClose={() => setIsProposalOpen(false)}>
          <form className="grid gap-3.5" onSubmit={handleSubmitProposal}>
            <Field label="Price" value={proposalForm.price} onChange={handleProposalFormChange("price")} type="number" />
            <TextArea label="Proposal Message" value={proposalForm.message} onChange={handleProposalFormChange("message")} />
            <ModalActions isSubmitting={isSubmitting} submitLabel="Submit Proposal" onCancel={() => setIsProposalOpen(false)} />
          </form>
        </RfqModal>
      ) : null}

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

function mapRfqFromApi(record: ApiRecord): RFQRequest {
  const id = String(record.id ?? record._id ?? "");
  const productType = getString(record.productType ?? record.title ?? record.productName) ?? "Product";
  const quantity = getString(record.quantity) ?? "Not specified";
  const location = getString(record.location) ?? "Not specified";
  const deliveryDate = getString(record.deliveryDate ?? record.deadline) ?? "Not scheduled";
  const status = mapStatus(record.status);
  const buyer = asRecord(record.buyer);

  return {
    budget: getNumber(record.budget),
    buyer: getString(buyer.companyName ?? buyer.fullName ?? buyer.name ?? record.buyerName) ?? "Buyer",
    category: productType,
    deadline: deliveryDate,
    description: getString(record.notes ?? record.description) ?? "No notes provided.",
    id,
    image: RFQ_IMAGE_FALLBACK,
    location,
    raw: record,
    status,
    title: productType,
    totalVolume: quantity,
  };
}

function mapStatus(value: unknown): RFQStatus {
  const status = getString(value)?.toLowerCase();

  if (status === "submitted" || status === "quoted") return "submitted";
  if (status === "closing-soon" || status === "closing_soon") return "closing-soon";
  return "open";
}

function extractDealId(record: ApiRecord): string | undefined {
  const data = asRecord(record.data);
  const deal = asRecord(record.deal ?? data.deal);
  const quote = asRecord(record.quote ?? data.quote);
  const quotes = Array.isArray(record.quotes) ? record.quotes : Array.isArray(data.quotes) ? data.quotes : [];
  const quoteDealId = quotes.map((item) => extractDealId(asRecord(item))).find(Boolean);

  return getString(record.dealId ?? data.dealId ?? quote.dealId ?? deal.id ?? deal._id) ?? quoteDealId;
}

function mapRfqProposalToDealPayload(request: RFQRequest, quoteResponse: ApiRecord, price: number, message: string): DealCreatePayload {
  const raw = asRecord(request.raw);
  const quote = asRecord(quoteResponse.quote ?? asRecord(quoteResponse.data).quote ?? quoteResponse);
  const farmer = asRecord(quote.farmer ?? quote.seller);
  const storedUser = getListingInteractionUser().user;
  const storedProfile = asRecord(storedUser?.profile);
  const farmerId =
    getString(quote.farmerId ?? farmer.id ?? farmer._id) ??
    getString(storedUser?.farmerId ?? storedProfile.id ?? storedProfile._id ?? storedUser?.id ?? storedUser?.userId);
  const quantity = getNumber(quote.quantity ?? raw.quantity ?? request.totalVolume) ?? 1;

  return {
    deliveryDate: getString(quote.deliveryDate ?? raw.deliveryDate ?? raw.deadline ?? request.deadline),
    farmerId,
    notes: message,
    price,
    quantity,
    rfqId: request.id,
    source: "rfq",
  };
}

async function sendProposalMessageIfNeeded(dealId: string, message: string) {
  const existingMessages = await getDealMessages(dealId).catch(() => []);
  const hasSameMessage = existingMessages.some((record) => {
    const body = getString(record.text ?? record.body ?? record.message);
    return body === message;
  });

  if (!hasSameMessage) {
    await sendDealMessage(dealId, { text: message });
  }
}

function isQuoteAlreadyCreatedError(error: unknown) {
  return error instanceof Error && /already submitted|already exists|409/i.test(error.message);
}

function RfqModal({ children, onClose, title }: { children: ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/40 px-4 py-8">
      <section className="flex max-h-[calc(100vh-6rem)] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl">
        <div className="flex shrink-0 items-start justify-between gap-4">
          <h2 className="text-lg font-black text-slate-950">{title}</h2>
          <button aria-label="Close RFQ form" className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-4 overflow-y-auto pr-1">{children}</div>
      </section>
    </div>
  );
}

function Field({ label, onChange, placeholder, type = "text", value }: { label: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string; value: string }) {
  return (
    <label>
      <span className="text-sm font-black text-slate-900">{label}</span>
      <input className="mt-1.5 h-9 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-700" onChange={onChange} placeholder={placeholder} type={type} value={value} />
    </label>
  );
}

function TextArea({ label, onChange, value }: { label: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; value: string }) {
  return (
    <label>
      <span className="text-sm font-black text-slate-900">{label}</span>
      <textarea className="mt-1.5 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-700" onChange={onChange} value={value} />
    </label>
  );
}

function ModalActions({ isSubmitting, onCancel, submitLabel }: { isSubmitting: boolean; onCancel: () => void; submitLabel: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="h-10 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white disabled:bg-slate-300" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
      <button className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-black text-slate-600" onClick={onCancel} type="button">
        Cancel
      </button>
    </div>
  );
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}
