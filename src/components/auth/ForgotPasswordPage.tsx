"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Info, Lock, Mail } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import { AuthLanguageSwitch } from "@/components/auth/AuthLanguageSwitch";
import { AuthSidePanel } from "@/components/auth/AuthSidePanel";
import { forgotPassword } from "@/lib/auth-api";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const isSubmittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      isSubmittingRef.current = true;
      setIsSubmitting(true);
      await forgotPassword({ email: email.trim() });
      setSuccessMessage("If an account exists for this email, a reset link has been sent.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send reset email. Please try again.");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[0.45fr_0.55fr]">
        <AuthSidePanel
          description="We'll help you get back to AgriBridge securely."
          gradientClassName="bg-gradient-to-b from-emerald-900/5 via-emerald-950/5 to-emerald-950/55"
          imageAlt="Green farm rows for AgriBridge password recovery"
          imageSizes="45vw"
          imageSrc="/images/auth/forgot-password-farm-bg.png"
          title="Recover your account"
        />

        <section className="relative flex min-h-screen flex-col bg-slate-50 px-5 py-5 sm:px-8 lg:h-screen lg:min-h-0 lg:px-10 lg:py-0 xl:px-12">
          <div className="flex items-center justify-between lg:absolute lg:right-10 lg:top-7 lg:z-10 xl:right-12">
            <Link className="relative block h-9 w-[136px] rounded-sm bg-emerald-900 p-1 lg:hidden" href="/">
              <Image
                alt="AgriBridge logo"
                className="object-contain p-1"
                fill
                sizes="136px"
                src="/images/brand/agribridge-logo.png"
              />
            </Link>

            <AuthLanguageSwitch variant="pill" />
          </div>

          <div className="flex flex-1 items-center justify-center py-8 lg:min-h-0 lg:py-0">
            <div className="w-full max-w-[405px] rounded-[26px] bg-white px-6 py-7 shadow-[0_16px_42px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/5 sm:px-9 lg:px-9 lg:py-8">
              <div className="text-center">
                <div className="mx-auto grid size-[72px] place-items-center rounded-[1.2rem] bg-emerald-50">
                  <span className="grid size-12 place-items-center rounded-xl bg-emerald-800 text-white shadow-lg shadow-emerald-900/15">
                    <Lock className="size-6" strokeWidth={2.4} />
                  </span>
                </div>

                <h1 className="mt-6 font-serif text-3xl font-black tracking-tight text-slate-800">
                  Forgot Password?
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-6 text-slate-500">
                  Enter your email address and we&apos;ll send you a reset link.
                </p>
              </div>

              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10">
                  <Mail className="size-4 shrink-0 text-slate-400" strokeWidth={2.1} />
                  <input
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                  />
                </div>

                <button
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-800 px-6 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>

                {errorMessage ? (
                  <p className="mt-3 rounded-lg bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-600">
                    {errorMessage}
                  </p>
                ) : null}

                {successMessage ? (
                  <p className="mt-3 rounded-lg bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700">
                    {successMessage}
                  </p>
                ) : null}
              </form>

              <Link
                className="mx-auto mt-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                href="/auth/login"
              >
                <ArrowLeft className="size-4" strokeWidth={2.2} />
                Back to Sign In
              </Link>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5 text-sm font-medium leading-6 text-slate-600">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-slate-500 text-slate-600">
                  <Info className="size-3.5" strokeWidth={2.2} />
                </span>
                <p>Check your spam folder if you don&apos;t see the email within 5 minutes.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
