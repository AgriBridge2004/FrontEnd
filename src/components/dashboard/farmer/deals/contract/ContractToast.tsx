import { Check } from "lucide-react";

type ContractToastProps = {
  message: string;
};

export function ContractToast({ message }: ContractToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-xl print:hidden">
      <span className="inline-flex items-center gap-2">
        <Check className="size-4 text-emerald-300" />
        {message}
      </span>
    </div>
  );
}
