import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function OfficerLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="quality_officer">{children}</DashboardShell>;
}
