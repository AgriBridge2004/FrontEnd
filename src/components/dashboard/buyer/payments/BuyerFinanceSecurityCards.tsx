import { Landmark, ShieldCheck } from "lucide-react";

export function BuyerFinanceSecurityCards() {
  const cards = [
    {
      icon: Landmark,
      title: "Institutional Connection",
      subtitle: "Wells Fargo Treasury",
      detail: "(****8920)",
      status: "Encrypted & Active",
    },
    {
      icon: ShieldCheck,
      title: "Escrow Insurance",
      subtitle: "Insured by Agri-Protect (Up to $5M)",
      status: "Fully Bonded",
    },
  ];

  return (
    <div className="grid gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={card.title}
          >
            <div className="flex items-center gap-3.5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="font-black text-slate-950">{card.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{card.subtitle}</p>
                {card.detail ? <p className="mt-1 text-sm font-medium text-slate-500">{card.detail}</p> : null}
                <p className="mt-2 text-[11px] font-black uppercase tracking-wide text-emerald-800">• {card.status}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
