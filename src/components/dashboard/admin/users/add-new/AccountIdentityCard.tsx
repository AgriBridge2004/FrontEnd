"use client";

import type { ReactNode } from "react";
import { ClipboardCheck, Mail, Phone } from "lucide-react";

import type { AddNewUserValidationErrors } from "@/components/dashboard/admin/users/add-new/add-new-user.types";
import { cn } from "@/lib/cn";

type AccountIdentityCardProps = {
  email: string;
  errors: AddNewUserValidationErrors;
  fullName: string;
  onEmailChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  phone: string;
};

export function AccountIdentityCard({ email, errors, fullName, onEmailChange, onFullNameChange, onPhoneChange, phone }: AccountIdentityCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <CardTitle icon={<ClipboardCheck className="size-4" />} title="1. Account Identity" />
      <div className="mt-5 space-y-5">
        <Field label="Full Legal Name" error={errors.fullName}>
          <input className={inputClass(Boolean(errors.fullName))} onChange={(event) => onFullNameChange(event.target.value)} placeholder="e.g. Jonathan Arable" value={fullName} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Professional Email" error={errors.email}>
            <div className={cn(inputClass(Boolean(errors.email)), "flex items-center gap-2")}>
              <Mail className="size-4 text-slate-500" />
              <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onEmailChange(event.target.value)} placeholder="j.arable@agribridge.pro" value={email} />
            </div>
            <p className="mt-1.5 text-[11px] font-medium text-slate-500">System notifications will be sent here.</p>
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <div className={cn(inputClass(Boolean(errors.phone)), "flex items-center gap-2")}>
              <Phone className="size-4 text-slate-500" />
              <input className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => onPhoneChange(event.target.value)} placeholder="+1 (555) 000-0000" value={phone} />
            </div>
          </Field>
        </div>
      </div>
    </section>
  );
}

export function CardTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
      <span className="text-emerald-800">{icon}</span>
      <h2 className="text-base font-black text-slate-900">{title}</h2>
    </div>
  );
}

export function Field({ children, error, label }: { children: ReactNode; error?: string; label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1.5 block text-[11px] font-bold text-red-600">{error}</span> : null}
    </label>
  );
}

export function inputClass(hasError = false) {
  return cn(
    "h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-800/10",
    hasError ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-emerald-300",
  );
}
