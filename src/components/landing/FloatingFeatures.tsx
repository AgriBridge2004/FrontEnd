import { BadgeCheck, ClipboardList, FileText, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Verified Quality",
    description: "All suppliers and products are verified for quality and compliance.",
    icon: BadgeCheck,
  },
  {
    title: "Escrow Protection",
    description: "Your payments are held securely until you confirm satisfaction.",
    icon: ShieldCheck,
  },
  {
    title: "Digital Contracts",
    description: "Legally recognized digital contracts for hassle-free agreements.",
    icon: FileText,
  },
  {
    title: "RFQ",
    description: "Post your requirements and get the best quotes from trusted sellers.",
    icon: ClipboardList,
  },
];

export function FloatingFeatures() {
  return (
    <section className="relative z-20 bg-transparent">
      <div className="mx-auto -mt-16 grid max-w-7xl gap-6 px-6 pb-16 lg:grid-cols-4 lg:px-10">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              className="flex min-h-32 gap-5 rounded-2xl bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.13)] ring-1 ring-slate-900/5"
              key={feature.title}
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                <Icon className="size-7" strokeWidth={2.2} />
              </span>
              <div>
                <h2 className="text-lg font-black text-emerald-950">{feature.title}</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
