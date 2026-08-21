import { CheckCircle } from "lucide-react";

export function Toast({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-xl">
      <CheckCircle className="size-5 text-emerald-400" />
      {message}
    </div>
  );
}
