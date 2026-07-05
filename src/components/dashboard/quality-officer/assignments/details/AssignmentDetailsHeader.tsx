import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";

type AssignmentDetailsHeaderProps = {
  details: AssignmentDetails;
};

export function AssignmentDetailsHeader({ details }: AssignmentDetailsHeaderProps) {
  return (
    <header>
      <h1 className="text-[22px] font-black leading-tight tracking-tight text-slate-950 sm:text-2xl">Inspection Assignment Details</h1>
      <nav aria-label="Breadcrumb" className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link className="transition hover:text-emerald-700" href="/quality-officer/dashboard">
          Dashboard
        </Link>
        <ChevronRight className="size-3.5 text-slate-400" />
        <Link className="transition hover:text-emerald-700" href="/quality-officer/assignments">
          Assignments
        </Link>
        <ChevronRight className="size-3.5 text-slate-400" />
        <span aria-current="page" className="font-black text-emerald-900">
          Deal {details.dealId}
        </span>
      </nav>
    </header>
  );
}
