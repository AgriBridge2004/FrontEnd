import type { ReactNode } from "react";
import { ProfileCompletionGuard } from "@/components/auth/ProfileCompletionGuard";

export default function QualityOfficerLayout({ children }: { children: ReactNode }) {
  return <ProfileCompletionGuard expectedRole="quality_officer">{children}</ProfileCompletionGuard>;
}
