import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function BuyerSettingsCard({
  children,
  danger = false,
  id,
  title,
}: {
  children: ReactNode;
  danger?: boolean;
  id: string;
  title?: string;
}) {
  return (
    <section
      className={cn(
        "scroll-mt-24 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md",
        danger
          ? "border-red-200 bg-red-50/10 hover:border-red-300 hover:bg-red-50/20"
          : "border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/30",
      )}
      id={id}
    >
      {title ? <h2 className="mb-5 text-base font-semibold text-slate-800">{title}</h2> : null}
      {children}
    </section>
  );
}

export function BuyerTextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-9 min-w-0 rounded-lg border border-emerald-100 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400",
        props.className,
      )}
    />
  );
}

export function BuyerTextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-20 w-full resize-none rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400",
        props.className,
      )}
    />
  );
}

export function BuyerToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button className={cn("relative h-6 w-11 rounded-full transition", checked ? "bg-emerald-800" : "bg-slate-300")} onClick={onChange} type="button">
      <span className={cn("absolute top-1 size-4 rounded-full bg-white shadow transition", checked ? "left-6" : "left-1")} />
    </button>
  );
}

export function BuyerSettingsToast({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
      {message}
    </div>
  );
}
