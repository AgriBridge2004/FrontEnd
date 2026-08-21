import { Clock, FileText, ShieldCheck } from "lucide-react";

type RFQTipsCardProps = {
  onViewGuides: () => void;
};

const tips = [
  {
    icon: <FileText className="size-4" />,
    title: "Be Detailed",
    description: "Mention product grade, variety, and packaging preferences.",
  },
  {
    icon: <Clock className="size-4" />,
    title: "Set Realistic Dates",
    description: "Give yourself enough time for preparation and logistics.",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    title: "Build Trust",
    description: "Keep your profile updated with recent certifications.",
  },
];

export function RFQTipsCard({ onViewGuides }: RFQTipsCardProps) {
  return (
    <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-emerald-900">RFQ Tips for Farmers</h2>
      <div className="mt-4 grid gap-4">
        {tips.map((tip) => (
          <div className="flex gap-2.5" key={tip.title}>
            <span className="shrink-0 text-amber-700">{tip.icon}</span>
            <div>
              <h3 className="text-[13px] font-black text-slate-900">{tip.title}</h3>
              <p className="mt-0.5 text-[11px] font-semibold leading-4 text-slate-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-5 text-[13px] font-black text-emerald-800 transition hover:text-emerald-950"
        onClick={onViewGuides}
        type="button"
      >
        View all guides →
      </button>
    </section>
  );
}
