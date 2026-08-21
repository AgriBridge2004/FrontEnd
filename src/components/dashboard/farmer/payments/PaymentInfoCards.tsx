import { Landmark, Lock } from "lucide-react";

export function PaymentInfoCards() {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2">
      <InfoCard
        icon={Lock}
        linkText="Learn more about Escrow"
        text="All payments are held in our secure escrow system until both parties confirm delivery. This ensures 100% protection for both buyers and sellers."
        title="AgriBridge Escrow Protection"
      />
      <InfoCard
        icon={Landmark}
        linkText="Update Payout Settings"
        text="Your automatic monthly withdrawal is scheduled for July 1st, 2025. Ensure your bank details are up to date."
        title="Next Scheduled Withdrawal"
      />
    </section>
  );
}

type InfoCardProps = {
  icon: typeof Lock;
  linkText: string;
  text: string;
  title: string;
};

function InfoCard({ icon: Icon, linkText, text, title }: InfoCardProps) {
  return (
    <article className="flex gap-5 rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
      <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
        <Icon className="size-6" />
      </span>
      <div>
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
        <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">{text}</p>
        <button className="mt-4 text-xs font-black text-emerald-800 transition hover:text-emerald-950" type="button">
          {linkText}
        </button>
      </div>
    </article>
  );
}
