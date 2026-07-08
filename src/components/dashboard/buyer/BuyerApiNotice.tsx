import { Info } from "lucide-react";

type BuyerApiNoticeProps = {
  description?: string;
  title?: string;
};

export function BuyerApiNotice({
  description = "The backend endpoint is not available in Swagger yet.",
  title = "API not connected yet for this page.",
}: BuyerApiNoticeProps) {
  return (
    <div className="mb-5 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-sm text-slate-700">
      <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
      <div>
        <p className="font-black text-slate-900">{title}</p>
        <p className="mt-0.5 font-semibold leading-5 text-slate-600">{description}</p>
      </div>
    </div>
  );
}
