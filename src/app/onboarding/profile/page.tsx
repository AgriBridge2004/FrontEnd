"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, Leaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { EditProfileForm } from "@/components/dashboard/farmer/profile/edit/EditProfileForm";
import { BuyerProfileCompletionForm } from "@/components/onboarding/BuyerProfileCompletionForm";
import { getAccessToken, getStoredUser } from "@/lib/auth-storage";
import { getDashboardPathByRole, normalizeRole, shouldCompleteProfile } from "@/lib/profile-completion";

export default function ProfileCompletionPage() {
  const router = useRouter();
  const [role, setRole] = useState<"farmer" | "buyer" | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    const user = getStoredUser();
    const normalizedRole = normalizeRole(user?.role);

    if (!token || !user) {
      router.replace("/auth/login");
      return;
    }

    if (!shouldCompleteProfile(user)) {
      router.replace(getDashboardPathByRole(normalizedRole));
      return;
    }

    if (normalizedRole !== "farmer" && normalizedRole !== "buyer") {
      router.replace(getDashboardPathByRole(normalizedRole));
      return;
    }

    setRole(normalizedRole);
    setIsChecking(false);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [router]);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  if (isChecking) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700" dir="ltr">
        <div className="rounded-2xl border border-emerald-100 bg-white px-6 py-4 text-sm font-black shadow-sm">
          Preparing your profile...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
      <div className="mx-auto w-full max-w-[1060px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative block h-10 w-[151px] shrink-0 rounded-md bg-emerald-900 p-1">
              <Image
                alt="AgriBridge logo"
                className="object-contain p-1"
                fill
                sizes="151px"
                src="/images/brand/agribridge-logo.png"
              />
            </span>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-800">
              <Leaf className="size-3.5" />
              Step 2 of 2
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-slate-600">
            <CheckCircle2 className="size-4 text-emerald-700" />
            Signed in
          </span>
        </header>

        <section className="mb-6">
          <h1 className="text-[28px] font-black tracking-tight text-emerald-950 sm:text-3xl">Complete your profile</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Add the required information so your dashboard and marketplace tools can work correctly.
          </p>
        </section>

        {role === "farmer" ? (
          <EditProfileForm cancelHref="/auth/login" mode="onboarding" submitLabel="Save & Continue" />
        ) : (
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <BuyerProfileCompletionForm onToast={showToast} />
          </div>
        )}
      </div>

      {toastMessage ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toastMessage}
        </div>
      ) : null}
    </main>
  );
}
