"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthDecorativeDots } from "@/components/auth/AuthDecorativeDots";
import { ArrowLeft, Info, Lock, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Connect this form to the password reset backend.
    router.push("/auth/login");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[0.45fr_0.55fr]">
        <section className="relative hidden h-screen overflow-hidden bg-emerald-950 text-white lg:block">
          <Image
            alt="Green farm rows for AgriBridge password recovery"
            className="object-cover"
            fill
            priority
            sizes="45vw"
            src="/images/auth/forgot-password-farm-bg.png"
          />
          <div className="absolute inset-0 bg-emerald-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 via-emerald-950/5 to-emerald-950/55" />

          <div className="relative z-10 flex h-full flex-col justify-between px-9 py-8 xl:px-12 xl:py-9">
            <Link className="relative block h-7 w-[109px]" href="/">
              <Image
                alt="AgriBridge logo"
                className="object-contain"
                fill
                sizes="109px"
                src="/images/brand/agribridge-logo.png"
              />
            </Link>

            <div className="pb-10">
              <h1 className="max-w-sm text-4xl font-black leading-tight tracking-tight text-white xl:text-[42px]">
                Recover your account
              </h1>
              <p className="mt-3 text-sm font-medium text-white/85 xl:text-base">
                We&apos;ll help you get back to AgriBridge securely.
              </p>
              <AuthDecorativeDots />
            </div>
          </div>
        </section>

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

            <div className="flex overflow-hidden rounded-full border border-slate-200 bg-white p-1 text-[11px] font-bold uppercase tracking-wide text-slate-400 shadow-sm">
              <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-slate-800">EN</span>
              <span className="px-3.5 py-1.5">AR</span>
            </div>
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
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-800 px-6 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
                  type="submit"
                >
                  Send Reset Link
                </button>
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
