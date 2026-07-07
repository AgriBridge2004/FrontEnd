"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Building2,
  Check,
  ChevronsRight,
  Circle,
  CircleDollarSign,
  MessageSquareWarning,
  Package,
  PauseCircle,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

import type { AdminDeal, AdminDealProgressStage } from "@/components/dashboard/admin/deals/admin-deals.types";
import {
  dashboardDrawerOverlayClass,
  dashboardDrawerPanelClass,
  dashboardIconButtonClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type AdminDealDetailPanelProps = {
  deal: AdminDeal;
  isOpen: boolean;
  onAdvanceDeal: () => void;
  onClose: () => void;
  onPauseDeal: () => void;
};

const tabs = ["Overview", "Messages (12)", "Inspection", "Payment", "Timeline", "Actions"] as const;
type DealDetailTab = (typeof tabs)[number];

const progressStages = ["Negotiation", "Confirmation", "Inspection", "Payment", "Completed"] as const;

export function AdminDealDetailPanel({ deal, isOpen, onAdvanceDeal, onClose, onPauseDeal }: AdminDealDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<DealDetailTab>("Overview");

  useEffect(() => {
    setActiveTab("Overview");
  }, [deal.id]);

  return (
    <>
      {isOpen ? (
        <button
          aria-label="Close deal detail overlay"
          className={dashboardDrawerOverlayClass}
          onClick={onClose}
          type="button"
        />
      ) : null}
      <aside
        aria-label="Deal detail"
        aria-modal="true"
        role="dialog"
        className={cn(
          dashboardDrawerPanelClass,
          "sm:w-[560px] xl:w-[600px] 2xl:w-[640px]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
          <h2 className="text-[15px] font-black text-slate-950">Deal Detail</h2>
          <button
            aria-label="Close deal detail"
            className={dashboardIconButtonClass}
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[22px] font-black leading-tight text-slate-950">{deal.dealId}</h3>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1",
                deal.status === "disputed"
                  ? "bg-red-50 text-red-700 ring-red-200"
                  : "bg-emerald-50 text-emerald-700 ring-emerald-200",
              )}
            >
              {deal.status === "disputed" ? <AlertCircle className="size-3.5" /> : null}
              {formatStatus(deal.status)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <SummaryItem icon={User} label="Farmer" value={deal.farmer} />
            <SummaryItem icon={Building2} label="Buyer" value={deal.buyer} />
            <SummaryItem icon={Package} label="Product" value={deal.product} />
            <SummaryItem icon={CircleDollarSign} label="Value" value={deal.value} />
          </div>

          <section className="mt-5">
            <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-800">Deal Progress</h4>
            <DealDetailProgress isProblem={deal.status === "disputed"} stage={deal.progressStage} />
          </section>

          <div className="mt-5 flex gap-2 overflow-x-auto border-b border-slate-100 text-xs font-black text-slate-400 sm:justify-between sm:overflow-x-visible">
            {tabs.map((tab) => (
              <button
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 px-2 py-2 transition sm:flex-1 sm:px-3",
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
            {activeTab === "Overview" ? (
              <OverviewTab deal={deal} onAdvanceDeal={onAdvanceDeal} onPauseDeal={onPauseDeal} />
            ) : (
              <p className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-500">
                {placeholderForTab(activeTab)}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-4 py-4">
          <button
            className="ml-auto flex h-9 items-center justify-center rounded-lg bg-slate-200 px-5 text-[13px] font-black text-slate-700 transition hover:bg-slate-300"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</span>
        <span className="block truncate text-[12px] font-black text-slate-900">{value}</span>
      </span>
    </div>
  );
}

const progressStageValues: AdminDealProgressStage[] = ["negotiation", "confirmation", "inspection", "payment", "completed"];

function DealDetailProgress({ isProblem, stage }: { isProblem: boolean; stage: AdminDealProgressStage }) {
  const activeIndex = progressStageValues.indexOf(stage);

  return (
    <div className="mt-4">
      <div className="flex items-center">
        {progressStages.map((stage, index) => {
          const isCompleted = index < activeIndex || activeIndex === progressStages.length - 1;
          const isCurrent = index === activeIndex && activeIndex !== progressStages.length - 1;
          const isPaymentProblem = isProblem && stage === "Payment";
          const Icon = isPaymentProblem ? AlertCircle : isCompleted ? Check : Circle;

          return (
            <div className="flex min-w-0 flex-1 items-center last:flex-none" key={stage}>
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border-2",
                  isCompleted && "border-emerald-600 bg-emerald-600 text-white",
                  isCurrent && !isPaymentProblem && "border-emerald-600 bg-white text-emerald-600",
                  isPaymentProblem && "border-red-500 bg-red-500 text-white",
                  !isCompleted && !isCurrent && !isPaymentProblem && "border-slate-200 bg-white text-slate-200",
                )}
              >
                <Icon className="size-4" />
              </span>
              {index < progressStages.length - 1 ? (
                <span
                  className={cn(
                    "h-0.5 min-w-7 flex-1",
                    index < activeIndex ? "bg-emerald-500" : "bg-slate-200",
                    index === activeIndex - 1 && isPaymentProblem && "bg-red-400",
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1 text-center text-[10px] font-black">
        {progressStages.map((stage, index) => (
          <span className={cn(stage === "Payment" && isProblem ? "text-red-600" : index > activeIndex ? "text-slate-300" : "text-slate-600")} key={stage}>
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

function OverviewTab({
  deal,
  onAdvanceDeal,
  onPauseDeal,
}: {
  deal: AdminDeal;
  onAdvanceDeal: () => void;
  onPauseDeal: () => void;
}) {
  const latestUpdate = deal.latestUpdate ?? {
    author: deal.buyer,
    message: "No detail update has been recorded for this mock deal yet.",
    timestamp: deal.lastUpdated ?? `${deal.date}, ${deal.time}`,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section>
          <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-800">Deal Information</h4>
          <dl className="mt-3 grid gap-2 text-[12px]">
            <InfoRow label="Deal ID" value={deal.dealId} />
            <InfoRow label="Created On" value={deal.createdOn ?? "8 Jun 2025, 10:22 AM"} />
            <InfoRow label="Last Updated" value={deal.lastUpdated ?? `${deal.date}, ${deal.time}`} />
            <InfoRow label="Current Stage" value={deal.progressStage === "payment" ? "Payment" : titleCase(deal.progressStage)} valueClassName={deal.progressStage === "payment" ? "text-red-600" : undefined} />
            <InfoRow label="Payment Method" value={deal.paymentMethod ?? "Bank Transfer"} />
            <InfoRow label="Expected Delivery" value={deal.expectedDelivery ?? "10 Jun 2025"} />
          </dl>
        </section>

        <section>
          <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-800">Latest Update</h4>
          <div className="mt-3 rounded-lg border border-red-100 bg-red-50/70 p-3 text-[12px] font-semibold leading-5 text-slate-700">
            <div className="flex gap-2">
              <MessageSquareWarning className="mt-0.5 size-4 shrink-0 text-red-500" />
              <p>{latestUpdate.message}</p>
            </div>
            <p className="mt-3 text-[11px] font-medium text-slate-500">
              {latestUpdate.timestamp}
              <br />
              by <span className="font-black text-slate-700">{latestUpdate.author}</span>
            </p>
          </div>
        </section>
      </div>

      <section>
        <h4 className="text-[11px] font-black uppercase tracking-wide text-slate-800">
          Admin Actions <span className="ml-1 text-[9px] font-bold normal-case text-slate-400">(Exceptional Use Only)</span>
        </h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ActionCard
            buttonLabel="Pause Deal"
            description="Temporarily pause the deal. Both parties will be notified."
            icon={PauseCircle}
            onClick={onPauseDeal}
            title="Pause Deal"
            tone="orange"
          />
          <ActionCard
            buttonLabel="Advance Deal"
            description="Bypass current step and move to the next stage."
            icon={ChevronsRight}
            onClick={onAdvanceDeal}
            title="Manually Advance Deal"
            tone="indigo"
          />
        </div>
        <div className="mt-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-[11px] font-semibold leading-4 text-amber-800">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>Bypassing the workflow is an exceptional action. Use only when absolutely necessary and with a valid reason.</p>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-2">
      <dt className="font-semibold text-slate-400">{label}</dt>
      <dd className={cn("font-black text-slate-900", valueClassName)}>{value}</dd>
    </div>
  );
}

function ActionCard({
  buttonLabel,
  description,
  icon: Icon,
  onClick,
  title,
  tone,
}: {
  buttonLabel: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  title: string;
  tone: "orange" | "indigo";
}) {
  const isOrange = tone === "orange";

  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-4 text-center transition-all duration-200 hover:shadow-md",
        isOrange ? "border-orange-200 hover:border-orange-300" : "border-indigo-200 hover:border-indigo-300",
      )}
    >
      <span
        className={cn(
          "mx-auto grid size-9 place-items-center rounded-full border",
          isOrange ? "border-orange-200 text-orange-600" : "border-indigo-200 text-indigo-600",
        )}
      >
        <Icon className="size-5" />
      </span>
      <h5 className={cn("mt-3 text-[12px] font-black", isOrange ? "text-orange-700" : "text-indigo-700")}>{title}</h5>
      <p className={cn("mt-2 min-h-10 text-[10px] font-semibold leading-4", isOrange ? "text-orange-600" : "text-indigo-600")}>
        {description}
      </p>
      <button
        className={cn(
          "mt-3 h-8 w-full rounded-md border text-[12px] font-black transition",
          isOrange
            ? "border-orange-300 text-orange-700 hover:bg-orange-50"
            : "border-indigo-300 text-indigo-700 hover:bg-indigo-50",
        )}
        onClick={onClick}
        type="button"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function formatStatus(status: AdminDeal["status"]) {
  return status
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function titleCase(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

function placeholderForTab(tab: DealDetailTab) {
  const labels: Record<DealDetailTab, string> = {
    Actions: "Actions will be connected later.",
    Inspection: "Inspection details will be connected later.",
    "Messages (12)": "Messages will be connected later.",
    Overview: "",
    Payment: "Payment details will be connected later.",
    Timeline: "Timeline will be connected later.",
  };

  // TODO: Connect tabs to messages, inspection, payment, timeline endpoints.
  return labels[tab];
}
