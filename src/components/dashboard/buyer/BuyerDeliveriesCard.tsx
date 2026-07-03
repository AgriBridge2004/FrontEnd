import { MapPin, Truck } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import type { BuyerDelivery } from "@/components/dashboard/buyer/buyer-dashboard.types";

type BuyerDeliveriesCardProps = {
  deliveries: BuyerDelivery[];
};

export function BuyerDeliveriesCard({ deliveries }: BuyerDeliveriesCardProps) {
  return (
    <DashboardCard className="p-5">
      <div className="flex items-center gap-2 text-slate-900">
        <Truck className="size-5 text-emerald-700" />
        <h2 className="text-lg font-black">Deliveries</h2>
      </div>

      <div className="mt-5 grid gap-3">
        {deliveries.map((delivery) => (
          <article className="rounded-xl border border-emerald-100 bg-slate-50 p-4" key={delivery.id}>
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-red-600">
                <span className="size-5 rounded-full bg-red-500 shadow-inner" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-900">{delivery.product}</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">ID: {delivery.id}</p>
                  </div>
                  <span className="rounded-md bg-emerald-200 px-2.5 py-1 text-[10px] font-black text-emerald-700">{delivery.date}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-slate-200 pt-3">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <MapPin className="size-4 text-slate-600" />
                {delivery.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}
