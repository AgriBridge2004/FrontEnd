import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function FarmerLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="farmer">{children}</DashboardShell>;
}
