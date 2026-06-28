import { BadgeCheck, Heart, Mail, MapPin, Package, Phone, ShieldCheck, Sprout } from "lucide-react";

import type { FarmerProfile } from "@/components/farmer/profile/profile.mock";

type InfoCardsProps = {
  profile: FarmerProfile;
};

export function InfoCards({ profile }: InfoCardsProps) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2">
      <InfoCard
        title="Contact Info"
        rows={[
          { icon: Mail, label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
          { icon: Phone, label: "Phone", value: profile.contact.phone },
          { icon: MapPin, label: "Address", value: profile.contact.address },
        ]}
      />
      <InfoCard
        title="Business Details"
        rows={[
          { icon: Sprout, label: "Farm Size", value: profile.business.farmSize },
          { icon: Package, label: "Products", value: profile.business.products },
          { icon: Heart, label: "Specialties", value: profile.business.specialties },
          { icon: ShieldCheck, label: "Certifications", value: profile.business.certifications },
        ]}
      />
    </section>
  );
}

type Row = {
  icon: typeof BadgeCheck;
  label: string;
  value: string;
  href?: string;
};

function InfoCard({ rows, title }: { rows: Row[]; title: string }) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      <div className="mt-6 space-y-6">
        {rows.map((row) => {
          const Icon = row.icon;
          const value = row.href ? (
            <a className="transition hover:text-emerald-800" href={row.href}>
              {row.value}
            </a>
          ) : (
            row.value
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
