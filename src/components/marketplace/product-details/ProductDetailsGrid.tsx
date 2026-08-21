import { Award, BadgeCheck, Hourglass, Leaf, Package, Shapes, Snowflake, Tractor } from "lucide-react";

import type { ProductDetailsSpec, ProductDetailsTab } from "@/components/marketplace/product-details/marketplace-product-details.types";

type ProductDetailsGridProps = {
  activeTab: ProductDetailsTab;
  details: ProductDetailsSpec;
};

export function ProductDetailsGrid({ activeTab, details }: ProductDetailsGridProps) {
  if (activeTab === "farmer") {
    return <PlaceholderCard message={details.farmerProfile ?? "Farmer details not available."} />;
  }

  if (activeTab === "reviews") {
    return <PlaceholderCard message="Reviews will be connected later." />;
  }

  const items = [
    { label: "Product Type", value: details.productType, icon: <Leaf className="size-4" /> },
    { label: "Variety", value: details.variety, icon: <Shapes className="size-4" /> },
    { label: "Grade", value: details.grade, icon: <BadgeCheck className="size-4" /> },
    { label: "Farming Method", value: details.farmingMethod, icon: <Tractor className="size-4" /> },
    { label: "Packaging", value: details.packaging, icon: <Package className="size-4" /> },
    { label: "Shelf Life", value: details.shelfLife, icon: <Hourglass className="size-4" /> },
    { label: "Storage", value: details.storage, icon: <Snowflake className="size-4" /> },
    { label: "Certifications", value: details.certifications, icon: <Award className="size-4" /> },
  ];

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div className="flex gap-3" key={item.label}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
              {item.icon}
            </span>
            <span>
              <span className="block text-[10px] font-black uppercase tracking-wide text-slate-500">{item.label}</span>
              <span className="mt-1.5 block text-base font-black leading-6 text-slate-900">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlaceholderCard({ message }: { message: string }) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-bold text-slate-600">{message}</p>
    </section>
  );
}
