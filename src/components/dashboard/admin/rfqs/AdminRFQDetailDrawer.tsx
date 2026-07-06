"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  Clock,
  Flag,
  Info,
  Mail,
  Package,
  Phone,
  User,
  X,
  XCircle,
} from "lucide-react";

import type { AdminRFQ, AdminRFQConversationMessage } from "@/components/dashboard/admin/rfqs/admin-rfqs.types";
import { RFQStatusBadge } from "@/components/dashboard/admin/rfqs/AdminRFQsTable";
import { cn } from "@/lib/cn";

type AdminRFQDetailDrawerProps = {
  onClose: () => void;
  onCloseRFQ: () => void;
  onFlagForReview: () => void;
  open: boolean;
  rfq: AdminRFQ | null;
};

const tabs = ["Details", "Conversation (5)", "Related Deal", "Activity Log"] as const;
type RFQDetailTab = (typeof tabs)[number];

export function AdminRFQDetailDrawer({ onClose, onCloseRFQ, onFlagForReview, open, rfq }: AdminRFQDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<RFQDetailTab>("Details");
  const rfqId = rfq?.id;

  useEffect(() => {
    if (rfqId) {
      setActiveTab("Details");
    }
  }, [rfqId]);

  if (!rfq) {
    return null;
  }

  return (
    <>
      {open ? (
        <button
          aria-label="Close RFQ detail overlay"
          className="fixed bottom-0 right-0 top-14 z-40 w-full bg-slate-900/10 lg:left-[232px] lg:w-auto"
          onClick={onClose}
          type="button"
        />
      ) : null}
      <aside
        aria-label="RFQ detail"
        aria-modal="true"
        className={cn(
          "fixed bottom-0 right-0 top-14 z-50 flex w-full flex-col overflow-hidden border-l border-emerald-100 bg-white shadow-2xl transition-transform duration-200 sm:w-[560px] sm:rounded-l-xl xl:w-[600px] 2xl:w-[640px]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-950">{rfq.rfqId}</h2>
            <RFQStatusBadge status={rfq.status} />
          </div>
          <button
            aria-label="Close RFQ detail"
            className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-emerald-50/40 hover:text-emerald-900"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <PartySummary
              align="left"
              contact={rfq.buyer.contact}
              detailIcon={Mail}
              detailText={rfq.buyer.email ?? "sarah@freshlink.com"}
              label="Buyer"
              name={rfq.buyer.company}
            />
            <span className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-400">
              <ArrowLeftRight className="size-4" />
            </span>
            <PartySummary
              align="right"
              contact={rfq.farmer.contact}
              detailIcon={Phone}
              detailText={rfq.farmer.phone ?? "+970 59 933 4455"}
              label="Farmer"
              name={rfq.farmer.farmName}
            />
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-emerald-950 text-emerald-100">
                <Package className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-black text-slate-900">{rfq.product.name}</p>
                <p className="text-[12px] font-semibold text-slate-400">{rfq.product.subtitle}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Requested Quantity</p>
              <p className="text-[16px] font-black text-slate-950">{rfq.requestedQuantity}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 text-[12px]">
            <InfoBlock label="Date Submitted" value={`${rfq.dateSubmitted} ${rfq.dateSubmittedTime ?? ""}`.trim()} />
            <InfoBlock label="Valid Until" value={rfq.validUntil ?? "May 26, 2024"} />
            <InfoBlock label="Preferred Delivery" value={rfq.preferredDelivery ?? "May 28 - May 31, 2024"} />
            <InfoBlock label="Payment Terms" value={rfq.paymentTerms ?? "30% advance"} />
          </div>

          <div className="mt-6 flex gap-2 border-b border-slate-100 text-xs font-black text-slate-400 sm:justify-between">
            {tabs.map((tab) => (
              <button
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 px-2 py-2 transition sm:flex-1",
                  activeTab === tab ? "border-emerald-800 text-emerald-800" : "border-transparent hover:text-emerald-800",
                )}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {activeTab === "Details" ? (
              <DetailsTab onCloseRFQ={onCloseRFQ} onFlagForReview={onFlagForReview} rfq={rfq} />
            ) : activeTab === "Conversation (5)" ? (
              <ConversationTimeline messages={rfq.conversation ?? []} />
            ) : activeTab === "Related Deal" ? (
              <PlaceholderCard text="No deal created yet." />
            ) : (
              <PlaceholderCard text="Activity log will be connected later." />
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <BottomCard title="Related Deal (If Converted)" value={rfq.relatedDeal ?? "No deal created yet."} />
            <BottomCard title="Last Activity" value={rfq.lastActivityFull ?? "May 21, 2024 11:30 AM"} subtext="5h 48m ago" />
          </div>
        </div>
      </aside>
    </>
  );
}

function PartySummary({
  align,
  contact,
  detailIcon: DetailIcon,
  detailText,
  label,
  name,
}: {
  align: "left" | "right";
  contact: string;
  detailIcon: typeof Mail;
  detailText: string;
  label: string;
  name: string;
}) {
  return (
    <div className={cn("min-w-0", align === "right" ? "text-right" : "text-left")}>
      <span className={cn("mx-auto grid size-12 place-items-center rounded-full bg-slate-900 text-white", align === "right" ? "ml-auto mr-0" : "ml-0 mr-auto")}>
        <User className="size-5" />
      </span>
      <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-blue-600">{label}</p>
      <p className="truncate text-[14px] font-black text-slate-900">{name}</p>
      <p className="text-[12px] font-semibold text-slate-500">{contact}</p>
      <p className={cn("mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400", align === "right" && "justify-end")}>
        <DetailIcon className="size-3" />
        {detailText}
      </p>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-black leading-5 text-slate-800">{value}</p>
    </div>
  );
}

function DetailsTab({
  onCloseRFQ,
  onFlagForReview,
  rfq,
}: {
  onCloseRFQ: () => void;
  onFlagForReview: () => void;
  rfq: AdminRFQ;
}) {
  // TODO: Connect conversation timeline to API.
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
        <section>
          <h3 className="text-[11px] font-black uppercase tracking-wide text-slate-400">Original Request Details</h3>
          <dl className="mt-4 grid gap-3 text-[12px]">
            <DetailRow label="Quality Grade" value={rfq.qualityGrade ?? "Grade C"} />
            <DetailRow label="Packaging" value={rfq.packaging ?? "10 kg cartons"} />
            <DetailRow label="Delivery Location" value={rfq.deliveryLocation ?? "Nablus, Palestine"} />
            <div>
              <dt className="font-semibold text-slate-400">Notes from Buyer</dt>
              <dd className="mt-2 italic leading-5 text-slate-600">&quot;{rfq.buyerNotes ?? "Looking for consistent quality and timely delivery. Please share best price including transport."}&quot;</dd>
            </div>
          </dl>
        </section>
        <section>
          <h3 className="text-[11px] font-black uppercase tracking-wide text-slate-400">Admin Actions</h3>
          <div className="mt-4 grid gap-3">
            <button
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-orange-200 bg-white px-3 text-[12px] font-black text-orange-600 transition hover:bg-orange-50"
              onClick={onFlagForReview}
              type="button"
            >
              <Flag className="size-4" />
              Flag for Review
            </button>
            <button
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-[12px] font-black text-red-600 transition hover:bg-red-50"
              onClick={onCloseRFQ}
              type="button"
            >
              <XCircle className="size-4" />
              Close RFQ
            </button>
            <p className="text-center text-[10px] font-medium leading-4 text-slate-400">Actions notify both buyer and farmer.</p>
          </div>
        </section>
      </div>
      <ConversationTimeline messages={rfq.conversation ?? []} />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-3">
      <dt className="font-semibold text-slate-400">{label}</dt>
      <dd className="font-black text-slate-800">{value}</dd>
    </div>
  );
}

function ConversationTimeline({ messages }: { messages: AdminRFQConversationMessage[] }) {
  const fallbackMessages: AdminRFQConversationMessage[] = [
    {
      id: "fallback-1",
      message: "Hi, please send your best price for 3,000 kg of cucumbers.",
      role: "Buyer",
      sender: "Sarah Johnson",
      timestamp: "May 21, 9:18 AM",
    },
  ];

  return (
    <section>
      <h3 className="text-[11px] font-black uppercase tracking-wide text-slate-400">Conversation Timeline (Read-Only)</h3>
      <div className="mt-4 grid gap-4">
        {(messages.length ? messages : fallbackMessages).map((message) => (
          <div className="flex gap-3" key={message.id}>
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-black text-white", message.role === "Buyer" ? "bg-blue-500" : "bg-emerald-500")}>
              {message.role[0]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-black text-slate-800">
                  {message.sender} <span className="font-semibold text-slate-400">({message.role})</span>
                </p>
                <span className="shrink-0 text-[11px] font-medium text-slate-400">{message.timestamp}</span>
              </div>
              <p className={cn("mt-2 rounded-lg border px-3 py-2 text-[12px] font-medium leading-5 text-slate-700", message.role === "Buyer" ? "border-blue-100 bg-blue-50" : "border-emerald-100 bg-emerald-50")}>
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-3 text-[11px] font-black uppercase tracking-wide text-blue-700">
        <Info className="size-4" />
        This RFQ has been quoted. Awaiting buyer decision.
      </div>
    </section>
  );
}

function BottomCard({ subtext, title, value }: { subtext?: string; title: string; value: string }) {
  // TODO: Connect related deal data.
  return (
    <div className="rounded-lg border border-slate-100 bg-white p-4">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-3 text-[13px] font-black text-slate-800">{value}</p>
      {subtext ? <p className="mt-1 text-[12px] font-black text-emerald-600">{subtext}</p> : null}
    </div>
  );
}

function PlaceholderCard({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-500">
      {text}
      <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-400">
        <CalendarDays className="size-4" />
        Endpoint connection will be added later.
      </div>
    </div>
  );
}
