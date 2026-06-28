"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Lock, RefreshCcw } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { AuthSidePanel } from "@/components/auth/AuthSidePanel";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { resetPassword } from "@/lib/auth-api";

type PasswordRequirement = {
  label: string;
  isMet: boolean;
};

export function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requirements = useMemo<PasswordRequirement[]>(
    () => [
      { label: "At least 8 characters", isMet: newPassword.length >= 8 },
      { label: "One uppercase letter", isMet: /[A-Z]/.test(newPassword) },
      { label: "One number (0-9)", isMet: /\d/.test(newPassword) },
      { label: "One special character (@, #, $)", isMet: /[@#$]/.test(newPassword) },
    ],
    [newPassword],
  );

  const allRequirementsMet = requirements.every((requirement) => requirement.isMet);
  const hasNewPassword = newPassword.trim().length > 0;
  const hasConfirmPassword = confirmPassword.trim().length > 0;
  const passwordsMatch = newPassword === confirmPassword;
  const shouldShowMatchError = hasNewPassword && hasConfirmPassword && !passwordsMatch;
  const hasToken = token.trim().length > 0;
  const tokenErrorMessage = hasToken ? "" : "Invalid or missing reset token.";
  const isFormValid = hasToken && hasNewPassword && hasConfirmPassword && allRequirementsMet && passwordsMatch;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isFormValid) {
      setErrorMessage("Please complete the password requirements.");
      return;
    }

    if (!hasToken) {
      setErrorMessage(tokenErrorMessage);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await resetPassword({ token, newPassword });
      setSuccessMessage(response.message ?? "Password updated successfully.");
      window.setTimeout(() => {
        router.push("/auth/login");
      }, 800);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[1fr_1fr]">
        <AuthSidePanel
          bottomClassName="pb-7"
          contentClassName="px-8 py-8 xl:px-10 xl:py-9"
          description="Ensuring the integrity of your trade data and farm management with industry-standard security protocols."
          descriptionClassName="mt-3 max-w-[500px] text-sm font-medium leading-6 text-white/90"
          gradientClassName="bg-gradient-to-b from-emerald-950/10 via-emerald-950/15 to-emerald-950/65"
          imageAlt="Vegetable farm field for AgriBridge password security"
          imageSizes="50vw"
          imageSrc="/images/auth/reset-password-farm-bg.jpg"
          logoClassName="h-8 w-[142px]"
          overlayClassName="bg-emerald-950/20"
          title="Secure your agricultural ecosystem."
          titleClassName="max-w-[500px] text-base font-medium leading-6 text-white"
        />

        <section className="flex min-h-screen flex-col bg-slate-50 px-5 py-6 sm:px-8 lg:h-screen lg:min-h-0 lg:px-10 lg:py-0 xl:px-14">
          <div className="flex flex-1 items-center justify-center py-5 lg:min-h-0 lg:py-0">
            <div className="w-full max-w-[396px]">
              <div>
                <h1 className="text-[22px] font-black tracking-tight text-slate-900">
                  Create New Password
                </h1>
                <p className="mt-2 text-[13px] font-medium leading-5 text-slate-600">
                  Your new password must be different from previous passwords.
                </p>
              </div>

              <form className="mt-7" onSubmit={handleSubmit}>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-700">
                    New Password
                  </label>
                  <PasswordInput
                    ariaLabel="new password"
                    containerClassName="mt-2 flex h-12 items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10"
                    inputClassName="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500"
                    leftIcon={<Lock className="size-4 shrink-0 text-slate-500" strokeWidth={2} />}
                    onChange={setNewPassword}
                    onToggle={() => setShowNewPassword((value) => !value)}
                    placeholder="Enter new password"
                    showPassword={showNewPassword}
                    value={newPassword}
                  />
                </div>

                <div className="mt-6">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-700">
                    Confirm New Password
                  </label>
                  <PasswordInput
                    ariaLabel="confirm new password"
                    containerClassName={`mt-2 flex h-12 items-center gap-3 rounded-lg border bg-white px-4 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10 ${
                      shouldShowMatchError ? "border-rose-300" : "border-slate-300"
                    }`}
                    inputClassName="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-500"
                    leftIcon={<RefreshCcw className="size-4 shrink-0 text-slate-500" strokeWidth={2} />}
                    onChange={setConfirmPassword}
                    onToggle={() => setShowConfirmPassword((value) => !value)}
                    placeholder="Confirm new password"
                    showPassword={showConfirmPassword}
                    value={confirmPassword}
                  />
                  {shouldShowMatchError ? (
                    <p className="mt-2 text-xs font-semibold text-rose-600">Passwords do not match.</p>
                  ) : null}
                </div>

                <div className="mt-5 rounded-lg border border-slate-200 bg-white/80 px-4 py-3.5 shadow-sm">
                  <p className="text-xs font-black text-slate-800">Password Requirements:</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {requirements.map((requirement) => (
                      <li
                        className={`flex items-center gap-2 text-[13px] font-medium ${
                          requirement.isMet ? "text-emerald-700" : "text-slate-600"
                        }`}
                        key={requirement.label}
                      >
                        <span
                          className={`grid size-4 shrink-0 place-items-center rounded-full border ${
                            requirement.isMet
                              ? "border-emerald-700 bg-emerald-700 text-white"
                              : "border-slate-500 text-transparent"
                          }`}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {requirement.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {successMessage ? (
                  <p className="mt-4 rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-700">
                    {successMessage}
                  </p>
                ) : null}

                {errorMessage ? (
                  <p className="mt-4 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm font-semibold text-rose-600">
                    {errorMessage}
                  </p>
                ) : null}

                {!errorMessage && tokenErrorMessage ? (
                  <p className="mt-4 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm font-semibold text-rose-600">
                    {tokenErrorMessage}
                  </p>
                ) : null}

                <button
                  className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-green-800 px-6 text-base font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  disabled={!isFormValid || isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </button>
              </form>

              <div className="mt-7 text-center">
                <Link
                  className="inline-flex text-sm font-medium text-slate-700 transition hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                  href="/auth/login"
                >
                  &larr; Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
