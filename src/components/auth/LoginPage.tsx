"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import { AuthLanguageSwitch } from "@/components/auth/AuthLanguageSwitch";
import { AuthSidePanel } from "@/components/auth/AuthSidePanel";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { loginUser } from "@/lib/auth-api";
import { getStoredUser, storeAuthSession } from "@/lib/auth-storage";
import { getPostLoginRedirectPath } from "@/lib/profile-completion";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [googleMessage, setGoogleMessage] = useState("");
  const isSubmittingRef = useRef(false);
  const isGoogleAuthEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) {
      return;
    }

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      isSubmittingRef.current = true;
      setIsSubmitting(true);
      const response = await loginUser({ email: email.trim(), password });
      storeAuthSession(response);
      router.push(getPostLoginRedirectPath(getStoredUser()));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function handleGoogleSignIn() {
    setGoogleMessage("");

    // TODO: Google login needs a Google OAuth Client ID and a backend endpoint to verify the Google token or handle the OAuth callback.
    if (!isGoogleAuthEnabled) {
      setGoogleMessage("Google sign-in is not configured yet.");
      return;
    }

    setGoogleMessage("Google sign-in is not configured yet.");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[1fr_1fr]">
        <AuthSidePanel
          bottomClassName="pb-2"
          contentClassName="px-10 py-9 xl:px-14 xl:py-10"
          description="Secure agricultural trading platform"
          descriptionClassName="mt-4 text-base font-medium text-white/85 xl:text-lg"
          gradientClassName="bg-gradient-to-b from-emerald-900/20 via-emerald-950/10 to-emerald-950/75"
          imageAlt="Green farm field for AgriBridge login"
          imageSizes="50vw"
          imageSrc="/images/auth/login-farm-bg.jpg"
          logoClassName="h-9 w-[136px]"
          overlayClassName="bg-emerald-950/45"
          title={
            <>
              Welcome back
              <br />
              to AgriBridge
            </>
          }
          titleClassName="max-w-lg font-serif text-[42px] font-black leading-tight tracking-tight xl:text-5xl"
        >
          <span className="pointer-events-none absolute -left-14 -top-14 size-56 rounded-full border border-white/20" />
          <span className="pointer-events-none absolute -right-20 top-36 size-48 rounded-full border border-white/20" />
        </AuthSidePanel>

        <section className="relative flex min-h-screen flex-col bg-white px-5 py-5 sm:px-8 lg:h-screen lg:min-h-0 lg:px-10 lg:py-0 xl:px-14">
          <div className="flex items-center justify-between lg:absolute lg:right-10 lg:top-7 lg:z-10 xl:right-14">
            <Link className="relative block h-9 w-[136px] rounded-sm bg-emerald-900 p-1 lg:hidden" href="/">
              <Image
                alt="AgriBridge logo"
                className="object-contain p-1"
                fill
                sizes="136px"
                src="/images/brand/agribridge-logo.png"
              />
            </Link>

            <AuthLanguageSwitch />
          </div>

          <div className="flex flex-1 items-center justify-center py-7 lg:min-h-0 lg:py-0">
            <div className="w-full max-w-[360px] rounded-[22px] bg-white px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/5 sm:px-7 lg:px-7 lg:py-6">
              <div className="text-center">
                <h2 className="font-serif text-[34px] font-black tracking-tight text-slate-800 lg:text-4xl">
                  Sign In
                </h2>
                <p className="mt-1.5 text-sm font-medium text-slate-500">Access your account</p>
              </div>

              <form className="mt-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs font-black text-slate-700" htmlFor="email">
                    Email
                  </label>
                  <div className="mt-2 flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-emerald-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-700/10 lg:h-10">
                    <Mail className="size-4 shrink-0 text-slate-400" strokeWidth={2.1} />
                    <input
                      className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                      id="email"
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-black text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <PasswordInput
                    ariaLabel="password"
                    containerClassName="mt-2 flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-emerald-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-700/10 lg:h-10"
                    inputClassName="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    leftIcon={<Lock className="size-4 shrink-0 text-slate-400" strokeWidth={2.1} />}
                    onChange={setPassword}
                    onToggle={() => setShowPassword((value) => !value)}
                    placeholder="Enter your password"
                    showPassword={showPassword}
                    value={password}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 text-xs font-medium sm:text-sm lg:text-xs">
                  <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                    <input
                      checked={rememberMe}
                      className="size-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                      onChange={(event) => setRememberMe(event.target.checked)}
                      type="checkbox"
                    />
                    Remember me
                  </label>
                  <Link className="font-bold text-emerald-800 transition hover:text-emerald-950" href="/auth/forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-emerald-800 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>

                {errorMessage ? (
                  <p className="mt-3 rounded-lg bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-600">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span>or</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border-2 border-emerald-800 bg-white px-7 text-sm font-black text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
                  onClick={handleGoogleSignIn}
                  type="button"
                >
                  <GoogleIcon />
                  Sign in with Google
                </button>

                {googleMessage ? (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3.5 py-2.5 text-xs font-semibold text-amber-700">
                    {googleMessage}
                  </p>
                ) : null}
              </form>

              <p className="mt-6 text-center text-sm font-medium text-slate-600">
                Don&apos;t have an account?{" "}
                <Link className="font-bold text-emerald-800 transition hover:text-emerald-950" href="/auth/register">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
