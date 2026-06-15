import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="buyer">{children}</DashboardShell>;
}
