export function ProfileCompletionCard() {
  return (
    <aside className="w-full rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm sm:w-[340px]">
      <p className="text-xs font-semibold text-slate-700">Profile 80% complete</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <span className="block h-full w-4/5 rounded-full bg-emerald-800" />
      </div>
    </aside>
  );
}
