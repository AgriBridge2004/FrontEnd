type EmptyListingsProps = {
  description?: string;
  title?: string;
};

export function EmptyListings({
  description = "Create your first listing to start receiving RFQs.",
  title = "No listings found",
}: EmptyListingsProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
      <p className="text-base font-black text-slate-900">{title}</p>
      <p className="mt-1">{description}</p>
    </div>
  );
}
