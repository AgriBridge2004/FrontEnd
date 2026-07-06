"use client";

import { Info, UserCog } from "lucide-react";

import { CardTitle, Field, inputClass } from "@/components/dashboard/admin/users/add-new/AccountIdentityCard";
import type {
  AddNewUserAccountType,
  AddNewUserMarketSegment,
  AddNewUserValidationErrors,
} from "@/components/dashboard/admin/users/add-new/add-new-user.types";
import { cn } from "@/lib/cn";

const accountTypes: AddNewUserAccountType[] = ["Farmer / Producer", "Buyer", "Quality Officer", "Admin"];
const marketSegments: AddNewUserMarketSegment[] = ["Industrial Grains", "Fresh Produce", "Dairy & Eggs", "Oils & Pulses", "Logistics", "Quality Assurance"];

const permissionCopy: Record<AddNewUserAccountType, string> = {
  Admin: "As an Admin, this user can manage platform operations, review activity, and coordinate governance workflows.",
  Buyer: "As a Buyer, this user can submit RFQs, negotiate deals, and manage purchasing activity across approved listings.",
  "Farmer / Producer": "As a Farmer, this user can list inventory, accept purchase orders, and track logistics but cannot approve global market prices.",
  "Quality Officer": "As a Quality Officer, this user can receive inspection assignments, submit reports, and verify product quality evidence.",
};

type RoleClassificationCardProps = {
  accountType: AddNewUserAccountType;
  errors: AddNewUserValidationErrors;
  marketSegment: AddNewUserMarketSegment;
  onAccountTypeChange: (value: AddNewUserAccountType) => void;
  onMarketSegmentChange: (value: AddNewUserMarketSegment) => void;
};

export function RoleClassificationCard({ accountType, errors, marketSegment, onAccountTypeChange, onMarketSegmentChange }: RoleClassificationCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <CardTitle icon={<UserCog className="size-4" />} title="2. Role & Classification" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Account Type" error={errors.accountType}>
          <select className={inputClass(Boolean(errors.accountType))} onChange={(event) => onAccountTypeChange(event.target.value as AddNewUserAccountType)} value={accountType}>
            {accountTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Market Segment" error={errors.marketSegment}>
          <select className={inputClass(Boolean(errors.marketSegment))} onChange={(event) => onMarketSegmentChange(event.target.value as AddNewUserMarketSegment)} value={marketSegment}>
            {marketSegments.map((segment) => (
              <option key={segment}>{segment}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-5 flex gap-3 rounded-lg border-l-4 border-emerald-700 bg-slate-50 p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-emerald-800" />
        <div>
          <h3 className="text-sm font-black text-emerald-900">Role Permissions</h3>
          <p className={cn("mt-1 text-sm font-medium leading-6 text-slate-700")}>{permissionCopy[accountType]}</p>
        </div>
      </div>
    </section>
  );
}
