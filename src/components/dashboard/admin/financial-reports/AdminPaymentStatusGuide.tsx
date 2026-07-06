"use client";

export function AdminPaymentStatusGuide() {
  const items = [
    ["bg-emerald-500", "Released", "Payment successfully released to farmer"],
    ["bg-orange-500", "Pending", "Payment is being processed"],
    ["bg-purple-500", "Frozen - Under Dispute", "Payment frozen pending dispute resolution"],
    ["bg-blue-500", "Refunded", "Payment refunded to buyer"],
    ["bg-red-500", "Failed", "Payment failed and requires attention"],
  ];
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-black text-slate-950">Status Guide</h3>
      <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
        {items.map(([dot, label, text]) => (
          <div className="grid grid-cols-[12px_100px_1fr] items-start gap-2 text-sm" key={label}>
            <span className={`mt-1.5 size-2 rounded-full ${dot}`} />
            <span className="font-black text-slate-800">{label}</span>
            <span className="text-slate-500">{text}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
