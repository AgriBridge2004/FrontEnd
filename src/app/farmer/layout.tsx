import type { ReactNode } from "react";
import { ProfileCompletionGuard } from "@/components/auth/ProfileCompletionGuard";

export default function FarmerLayout({ children }: { children: ReactNode }) {
  return <ProfileCompletionGuard expectedRole="farmer">{children}</ProfileCompletionGuard>;
}
