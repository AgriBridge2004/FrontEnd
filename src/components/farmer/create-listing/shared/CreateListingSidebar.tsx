import { Lightbulb, ShieldCheck } from "lucide-react";

import { ListingHealthCard } from "@/components/farmer/create-listing/shared/ListingHealthCard";
import { ListingPreviewCard } from "@/components/farmer/create-listing/shared/ListingPreviewCard";
import type { CreateListingDraft } from "@/components/farmer/create-listing/create-listing.types";

type CreateListingSidebarProps = {
  completeness: number;
  draft: CreateListingDraft;
  logisticsComplete?: boolean;
  pricingComplete?: boolean;
};

export function CreateListingSidebar({
  completeness,
  draft,
  logisticsComplete = false,
  pricingComplete = false,
}: CreateListingSidebarProps) {
  return (
    <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
      <ListingHealthCard
        completeness={completeness}
        logisticsComplete={logisticsComplete}
        pricingComplete={pricingComplete}
      />
      <ListingPreviewCard draft={draft} />
      <section className="relative overflow-hidden rounded-2xl bg-emerald-950 p-6 text-white shadow-xl shadow-emerald-950/20">
        <span className="absolute -bottom-14 -right-10 size-32 rounded-full border border-white/10 bg-white/5" />
        <span className="absolute bottom-4 right-4 size-16 rounded-full border border-white/10" />
        <div className="relative">
          <ShieldCheck className="size-7 text-emerald-200" />
          <h2 className="mt-4 text-xl font-black">Grow with Pro</h2>
          <p className="mt-3 text-sm font-medium leading-6 text-emerald-100">
            Transparency is the bridge to trust. Ensure your certifications are up to date to access global retail buyers.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-emerald-100" type="button">
            <Lightbulb className="size-4" />
            Learn more about AgriBridge Verification
          </button>
        </div>
      </section>
    </aside>
  );
}
