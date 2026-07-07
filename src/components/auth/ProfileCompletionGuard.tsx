"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { getAccessToken, getStoredUser } from "@/lib/auth-storage";
import {
  getDashboardPathByRole,
  normalizeRole,
  ONBOARDING_PROFILE_PATH,
  shouldCompleteProfile,
} from "@/lib/profile-completion";
import type { UserRole } from "@/types";

type ProfileCompletionGuardProps = {
  children: ReactNode;
  expectedRole?: UserRole;
};

export function ProfileCompletionGuard({ children, expectedRole }: ProfileCompletionGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    const user = getStoredUser();
    const userRole = normalizeRole(user?.role);

    if (!token || !user) {
      setIsChecking(false);
      return;
    }

    if (expectedRole && userRole && userRole !== expectedRole) {
      router.replace(getDashboardPathByRole(userRole));
      return;
    }

    if (shouldCompleteProfile(user) && pathname !== ONBOARDING_PROFILE_PATH) {
      router.replace(ONBOARDING_PROFILE_PATH);
      return;
    }

    setIsChecking(false);
  }, [expectedRole, pathname, router]);

  if (isChecking) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700" dir="ltr">
        <div className="rounded-2xl border border-emerald-100 bg-white px-6 py-4 text-sm font-black shadow-sm">
          Loading your workspace...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
