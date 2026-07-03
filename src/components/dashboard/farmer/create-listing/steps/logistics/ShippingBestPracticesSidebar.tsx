import type { ReactNode } from "react";
import { BookOpen, PackageCheck, ShieldCheck, Ship, Thermometer, Truck } from "lucide-react";

type ShippingBestPracticesSidebarProps = {
  onGuideClick: () => void;
};

export function ShippingBestPracticesSidebar({ onGuideClick }: ShippingBestPracticesSidebarProps) {
  return (
    <aside className="grid h-fit gap-5 lg:sticky lg:top-24 lg:self-start">
      <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-800 text-white">
            <Truck className="size-5" />
          </span>
          <h2 className="text-xl font-black leading-6 text-slate-950">Shipping Best Practices</h2>
        </div>

        <div className="mt-6 grid gap-6">
          <PracticeSection
            icon={<Ship className="size-4 text-emerald-800" />}
            text="Using FOB (Free on Board) is the industry standard for bulk agri-exports. It clearly defines the transfer of risk once the goods are loaded onto the vessel."
            title="Incoterm Selection"
          />
          <PracticeSection
            icon={<PackageCheck className="size-4 text-emerald-800" />}
            text="Ensure your pallets are ISPM 15 certified if shipping internationally to avoid quarantine delays at destination ports."
            title="Packaging Compliance"
          />
          <PracticeSection
            icon={<Thermometer className="size-4 text-emerald-800" />}
            text="For perishable goods, specify if reefer containers are used and if real-time temperature tracking is available for the buyer."
            title="Cold Chain Assurance"
          />
        </div>

        <div className="my-6 h-px bg-slate-200" />

        <button
          className="inline-flex items-center gap-2 font-black text-emerald-900 transition hover:text-emerald-700"
          onClick={onGuideClick}
          type="button"
        >
          <BookOpen className="size-5" />
          View Detailed Guide
        </button>

        {/* TODO: Replace this placeholder with /images/farmer/create-listing/logistics-partners.jpg when the asset is available. */}
        <div className="relative mt-8 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-emerald-950 to-emerald-800 p-4 text-white">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_32%)]" />
          <span className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-black/60 to-transparent" />
          <ShieldCheck className="absolute right-4 top-4 size-7 text-emerald-100/70" />
          <p className="absolute bottom-4 left-4 right-4 text-base font-black leading-6">
            Connect with our logistics partners for pre-negotiated rates.
          </p>
        </div>
      </section>
    </aside>
  );
}

type PracticeSectionProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

function PracticeSection({ icon, title, text }: PracticeSectionProps) {
  return (
    <div>
      <h3 className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-emerald-950">
        {icon}
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{text}</p>
    </div>
  );
}
