import { BriefcaseBusiness, Building2, Globe2, ShieldCheck, ShoppingCart } from "lucide-react";

import type { BuyerProfile } from "@/components/dashboard/buyer/profile/buyer-profile.types";

type BuyerBusinessDetailsCardProps = {
  business: BuyerProfile["business"];
};

export function BuyerBusinessDetailsCard({ business }: BuyerBusinessDetailsCardProps) {
  const rows = [
    { icon: Building2, label: "Company Size", value: business.companySize },
    { icon: BriefcaseBusiness, label: "Business Type", value: business.businessType },
    { icon: ShoppingCart, label: "Main Categories", value: business.mainCategories },
    { icon: ShieldCheck, label: "Certifications", value: business.certifications },
    { icon: Globe2, label: "Markets Served", value: business.marketsServed },
  ];

  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <h2 className="text-lg font-black text-slate-950">Business Details</h2>
      <div className="mt-6 space-y-6">
        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div className="grid gap-4 sm:grid-cols-[40px_132px_minmax(0,1fr)] sm:items-start" key={row.label}>
              <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon className="size-5" />
              </span>
              <p className="font-black text-slate-900">{row.label}</p>
              <p className="text-sm font-medium leading-6 text-slate-600">{row.value}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}
