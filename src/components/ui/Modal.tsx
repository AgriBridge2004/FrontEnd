import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type ModalProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function Modal({ title, description, children }: ModalProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 shadow-soft">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Modal placeholder
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="mt-5">{children}</div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button>Confirm later</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  );
}
