import type { ReactNode } from "react";
import { ProfileCompletionGuard } from "@/components/auth/ProfileCompletionGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ProfileCompletionGuard expectedRole="admin">{children}</ProfileCompletionGuard>;
}
