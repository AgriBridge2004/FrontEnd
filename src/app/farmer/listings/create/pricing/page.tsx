import Link from "next/link";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";

export default function CreateListingPricingPlaceholderPage() {
  return (
    <FarmerDashboardLayout searchPlaceholder="Search marketplace...">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1120px] items-center justify-center px-4 py-10 sm:px-5 lg:px-7">
        <div className="w-full max-w-lg rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Step 2</p>
          <h1 className="mt-2 text-2xl font-black text-slate-950">Pricing step coming next.</h1>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Step 1 details are saved locally for now. Pricing will be connected in the next iteration.
          </p>
          <Link
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
            href="/farmer/listings/create"
          >
            Back to Details
          </Link>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}
