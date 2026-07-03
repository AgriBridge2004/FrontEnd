import Image from "next/image";
import { Eye, Star } from "lucide-react";

import { BuyerDealStatusBadge } from "@/components/dashboard/buyer/deals/BuyerDealStatusBadge";
import type { BuyerDeal } from "@/components/dashboard/buyer/deals/buyer-deals.types";
import { EmptyState } from "@/components/dashboard/shared/EmptyState";

type BuyerDealsTableProps = {
  deals: BuyerDeal[];
  onViewDetails: (deal: BuyerDeal) => void;
};

function formatDeliveryDate(date: string) {
  const [monthDay, year] = date.split(", ");
  return { monthDay, year };
}

export function BuyerDealsTable({ deals, onViewDetails }: BuyerDealsTableProps) {
  if (deals.length === 0) {
    return (
      <div className="p-6">
        <EmptyState description="Try changing your filters or search term." icon={Eye} title="No deals found" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1040px] text-left">
        <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-6 py-4">Deal ID</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Farmer</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Delivery</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {deals.map((deal) => {
            const delivery = formatDeliveryDate(deal.deliveryDate);

            return (
              <tr className="transition hover:bg-emerald-50/20" key={deal.id}>
                <td className="px-6 py-5 font-black leading-5 text-emerald-700">{deal.id}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-emerald-50">
                      <Image
                        alt={`${deal.productName} deal`}
                        className="object-cover"
                        fill
                        sizes="40px"
                        src={deal.productImage ?? "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg"}
                      />
                    </span>
                    <div>
                      <p className="font-black text-slate-950">{deal.productName}</p>
                      <p className="text-sm font-medium text-slate-600">{deal.productDetail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-emerald-50">
                      <Image
                        alt={`${deal.farmerName} avatar`}
                        className="object-cover"
                        fill
                        sizes="40px"
                        src={deal.farmerAvatar ?? "/images/farmer/profile/farmer-avatar.jpg"}
                      />
                    </span>
                    <div>
                      <p className="font-black leading-5 text-slate-950">{deal.farmerName}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs font-black text-amber-500">
                        <Star className="size-3 fill-current" />
                        {deal.farmerRating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <BuyerDealStatusBadge status={deal.status} />
                </td>
                <td className="px-6 py-5 font-black text-slate-950">{deal.quantity}</td>
                <td className="px-6 py-5 font-black text-slate-950">{deal.amount.toLocaleString()}</td>
                <td className="px-6 py-5 text-center font-medium text-slate-500">
                  <span className="block">{delivery.monthDay},</span>
                  <span className="block text-xs text-slate-400">{delivery.year}</span>
                </td>
                <td className="px-6 py-5">
                  <button
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                    onClick={() => onViewDetails(deal)}
                    type="button"
                  >
                    View Details
                    <Eye className="size-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
