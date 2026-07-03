import type { ReactNode } from "react";
import { Headphones, Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";

type PricingStrategySidebarProps = {
  onAdvisorClick: () => void;
};

export function PricingStrategySidebar({ onAdvisorClick }: PricingStrategySidebarProps) {
  return (
    <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
        <div className="flex items-center gap-3 bg-emerald-950 px-5 py-5 text-white">
          <Lightbulb className="size-5" />
          <h2 className="font-black">Pricing Strategy</h2>
        </div>
        <div className="grid gap-5 p-5">
          <div>
            <h3 className="text-sm font-black uppercase text-emerald-950">Why Bulk Pricing?</h3>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              Enterprise buyers typically purchase in high volumes. Tiered pricing incentivizes larger commitments,
              reducing your per-unit logistics and administrative overhead.
            </p>
          </div>

          <div className="rounded-lg bg-emerald-100 p-4 text-sm font-semibold italic leading-6 text-emerald-900">
            Sellers who offer at least 2 bulk tiers see a 35% higher conversion rate with institutional buyers.
          </div>

          <div className="grid gap-4">
            <InsightItem
              icon={<TrendingUp className="size-5 text-emerald-800" />}
              text="A discount of just 3-5% for high volume is often enough to trigger a buy decision for procurement officers."
              title="Psychological Triggers"
            />
            <InsightItem
              icon={<ShieldCheck className="size-5 text-emerald-800" />}
              text="Transparent pricing tiers build trust. Clearly defined MOQ prevents wasted negotiation time with mismatched buyers."
              title="Contract Confidence"
            />
          </div>

          {/* TODO: Replace this placeholder with /images/farmer/create-listing/grains-insights.jpg when the asset is available. */}
          <div className="relative h-40 overflow-hidden rounded-xl bg-gradient-to-br from-amber-900 via-emerald-950 to-slate-950 p-4 text-white">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(250,204,21,0.22),transparent_34%)]" />
            <span className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-black/55 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-base font-black leading-6">
              Global Market Insights: Grains 2024
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-center shadow-sm transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/30">
        <Headphones className="mx-auto size-7 text-emerald-800" />
        <h3 className="mt-3 font-black text-slate-950">Need help pricing?</h3>
        <button
          className="mt-1 text-sm font-black text-emerald-900 underline underline-offset-4"
          onClick={onAdvisorClick}
          type="button"
        >
          Speak with an AgriBridge Advisor
        </button>
      </section>
    </aside>
  );
}

type InsightItemProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

function InsightItem({ icon, title, text }: InsightItemProps) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span>
        <span className="block font-black text-slate-950">{title}</span>
        <span className="text-sm font-medium leading-5 text-slate-600">{text}</span>
      </span>
    </div>
  );
}
