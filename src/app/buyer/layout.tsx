import type { ReactNode } from "react";
import { ProfileCompletionGuard } from "@/components/auth/ProfileCompletionGuard";

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return <ProfileCompletionGuard expectedRole="buyer">{children}</ProfileCompletionGuard>;
}
