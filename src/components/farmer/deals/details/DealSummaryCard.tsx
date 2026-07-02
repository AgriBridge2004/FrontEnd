import { Building2, CalendarDays, Package, ReceiptText, Scale, ShieldCheck, Truck, User, Wallet } from "lucide-react";

import type { DealDetail } from "@/components/farmer/deals/details/deal-details.types";

type DealSummaryCardProps = {
  deal: DealDetail;
};

export function DealSummaryCard({ deal }: DealSummaryCardProps) {
  const items = [
    { label: "Product", value: deal.product, icon: Package },
    { label: "Buyer", value: deal.buyer, icon: Building2 },
    { label: "Quantity", value: deal.quantity, icon: Scale },
    { label: "Farmer", value: deal.farmer, icon: User },
    { label: "Unit Price", value: deal.unitPrice, icon: ShieldCheck },
    { label: "Deal Created", value: deal.dealCreated, icon: CalendarDays },
    { label: "Total Amount", value: deal.totalAmount, icon: Wallet, accent: true },
    { label: "Expected Delivery", value: deal.expectedDelivery, icon: Truck },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <div className="border-b border-slate-100 px-5 py-5">
        <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
          <ReceiptText className="size-5 text-emerald-700" />
          Deal Summary
        </h2>
      </div>
      <div className="grid gap-6 p-5 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div className="flex items-center gap-4" key={`${item.label}-${item.value}`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-xs font-medium text-slate-500">{item.label}</span>
                <span className={item.accent ? "font-black text-emerald-600" : "font-black text-slate-950"}>
                  {item.value}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
