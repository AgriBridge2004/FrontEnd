const rows = [
  { label: "Active RFQs", value: "1,240" },
  { label: "Avg. Response Time", value: "4.2 hrs" },
  { label: "Successful Deals", value: "89%" },
];

export function RFQMarketSnapshot() {
  return (
    <section className="rounded-xl border border-emerald-100 bg-stone-100/70 p-5 shadow-sm">
      <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Market Snapshot</h2>
      <div className="mt-5 grid gap-3.5">
        {rows.map((row) => (
          <div className="flex items-center justify-between gap-4" key={row.label}>
            <span className="text-[13px] font-medium text-slate-800">{row.label}</span>
            <span className="text-sm font-black text-emerald-800">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
