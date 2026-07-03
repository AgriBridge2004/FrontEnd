import { CircleHelp } from "lucide-react";

type BuyerDealsHeaderProps = {
  onHelpClick: () => void;
};

export function BuyerDealsHeader({ onHelpClick }: BuyerDealsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">My Deals</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Track and manage all your purchase agreements.</p>
      </div>

      <button
        className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
        onClick={onHelpClick}
        type="button"
      >
        <CircleHelp className="size-4" />
        Buyer Help
      </button>
    </div>
  );
}
