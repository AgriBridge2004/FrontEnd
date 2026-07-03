export function BuyerTrustScoreCard() {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-emerald-950 p-6 text-white shadow-lg">
      <div className="absolute -right-7 top-7 size-24 rotate-45 rounded-3xl bg-white/10" />
      <div className="relative text-center">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.24em] text-emerald-50">
          Official Rating
        </span>
        <h2 className="mx-auto mt-5 max-w-[220px] text-xl font-medium leading-7">Institutional Trust Score</h2>
        <p className="mx-auto mt-2.5 max-w-[235px] text-sm font-medium leading-5 text-emerald-50/80">
          Mediation effectiveness is in the top 5% of global institutional accounts.
        </p>

        <div className="mx-auto mt-6 grid size-24 place-items-center rounded-full border-[5px] border-emerald-300 bg-emerald-900 shadow-[0_0_0_7px_rgba(134,239,172,0.12)]">
          <div>
            <p className="text-3xl font-black leading-none">94</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-emerald-100">Points</p>
          </div>
        </div>

        <p className="mt-6 text-[11px] font-black uppercase tracking-[0.3em] text-lime-300">Gold Tier Mediator</p>
        <p className="mt-3 text-xs font-medium text-emerald-50/60">Verified since Nov 2021</p>
      </div>
    </article>
  );
}
