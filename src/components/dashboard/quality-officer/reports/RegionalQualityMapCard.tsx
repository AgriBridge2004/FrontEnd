import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

const clusters = [
  { label: "Al Ahsa", score: "96%" },
  { label: "Qassim", score: "94%" },
  { label: "Tabuk", score: "88%" },
];

export function RegionalQualityMapCard() {
  // TODO: Connect regional quality map to API.
  // TODO: Replace with actual map visualization when regional geo data is available.
  return (
    <DashboardCard className="p-4">
      <h2 className="text-base font-black text-slate-950">Regional Quality Map</h2>

      <div className="relative mt-4 h-[250px] overflow-hidden rounded-xl border border-emerald-100 bg-stone-100">
        <span className="absolute left-[34%] top-[25%] size-10 rounded-full border border-emerald-900 bg-emerald-700/40" />
        <span className="absolute left-[52%] top-[45%] size-14 rounded-full border border-emerald-900 bg-emerald-800/60" />
        <span className="absolute left-[62%] top-[68%] size-8 rounded-full border border-amber-800 bg-amber-500/50" />

        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-emerald-100 bg-white/95 p-2.5 shadow-xl">
          <p className="text-[11px] font-black text-slate-900">Cluster Performance</p>
          <div className="mt-2 grid gap-1">
            {clusters.map((cluster) => (
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold" key={cluster.label}>
                <span className="text-slate-600">{cluster.label}</span>
                <span className="font-black text-emerald-800">{cluster.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
