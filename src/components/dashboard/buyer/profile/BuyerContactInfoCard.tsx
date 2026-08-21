import { Globe, Mail, MapPin, Phone } from "lucide-react";

import type { BuyerProfile } from "@/components/dashboard/buyer/profile/buyer-profile.types";

type BuyerContactInfoCardProps = {
  contact: BuyerProfile["contact"];
};

export function BuyerContactInfoCard({ contact }: BuyerContactInfoCardProps) {
  const rows = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone },
    { icon: MapPin, label: "Address", value: contact.address },
    { icon: Globe, label: "Website", value: contact.website, href: `https://${contact.website}` },
  ];

  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <h2 className="text-lg font-black text-slate-950">Contact Info</h2>
      <div className="mt-6 space-y-6">
        {rows.map((row) => {
          const Icon = row.icon;
          const value = row.href ? (
            <a className="whitespace-pre-line transition hover:text-emerald-800" href={row.href}>
              {row.value}
            </a>
          ) : (
            <span className="whitespace-pre-line">{row.value}</span>
          );

          return (
            <div className="grid gap-4 sm:grid-cols-[40px_112px_minmax(0,1fr)] sm:items-start" key={row.label}>
              <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon className="size-5" />
              </span>
              <p className="font-black text-slate-900">{row.label}</p>
              <p className="text-sm font-medium leading-6 text-slate-600">{value}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}
