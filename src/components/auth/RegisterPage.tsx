"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Check, Tractor } from "lucide-react";
import { FormEvent, useState } from "react";

import { AuthLanguageSwitch } from "@/components/auth/AuthLanguageSwitch";
import { AuthSidePanel } from "@/components/auth/AuthSidePanel";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { registerUser } from "@/lib/auth-api";

type Role = "farmer" | "buyer";

const roles = [
  { id: "farmer" as const, label: "Farmer", icon: Tractor },
  { id: "buyer" as const, label: "Buyer", icon: Building2 },
];

const PASSWORD_ERROR_MESSAGE =
  "Password must be at least 8 characters and include an uppercase letter, a number, and a special character (@, #, $).";

function isStrongPassword(value: string) {
  return value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value) && /[@#$]/.test(value);
}

export function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("farmer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");
    const trimmedEmail = email.trim();

    if (!selectedRole || !fullName.trim() || !trimmedEmail || !phoneNumber.trim() || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(PASSWORD_ERROR_MESSAGE);
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Please accept the terms and conditions.");
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        email: trimmedEmail,
        password,
        role: selectedRole,
      });
      router.push(`/auth/otp?email=${encodeURIComponent(trimmedEmail)}&flow=register`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[1fr_1fr]">
        <AuthSidePanel
          bottomClassName="pb-7"
          contentClassName="px-8 py-8 xl:px-12 xl:py-9"
          description="Connect with farmers and buyers securely."
          imageAlt="Farm tractor field for AgriBridge registration"
          imageSizes="50vw"
          imageSrc="/images/auth/register-farm-bg.png"
          logoClassName="h-8 w-[121px]"
          sectionClassName="rounded-r-[24px]"
          title="Join AgriBridge"
          titleClassName="max-w-lg text-4xl font-black leading-tight tracking-tight text-white xl:text-[42px]"
        >
          <span className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full border border-white/20" />
        </AuthSidePanel>

        <section className="relative flex min-h-screen flex-col bg-slate-50 px-5 py-5 sm:px-8 lg:h-screen lg:min-h-0 lg:px-8 lg:py-0 xl:px-12">
          <div className="flex items-center justify-between lg:absolute lg:right-8 lg:top-6 lg:z-10 xl:right-12">
            <Link className="relative block h-9 w-[136px] rounded-sm bg-emerald-900 p-1 lg:hidden" href="/">
              <Image
                alt="AgriBridge logo"
                className="object-contain p-1"
                fill
                sizes="136px"
                src="/images/brand/agribridge-logo.png"
              />
            </Link>

            <AuthLanguageSwitch variant="boxed" />
          </div>

          <div className="flex flex-1 items-center justify-center py-7 lg:min-h-0 lg:py-0">
            <div className="w-full max-w-[480px] rounded-[20px] bg-white px-5 py-5 shadow-[0_16px_42px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/5 sm:px-6 lg:px-6 lg:py-5">
              <span className="inline-flex rounded-full bg-emerald-50 px-3.5 py-1 text-[11px] font-medium text-emerald-700">
                Step 1 of 2
              </span>

              <div className="mt-4">
                <h2 className="text-3xl font-black tracking-tight text-emerald-950 lg:text-[32px]">
                  Create Account
                </h2>
                <p className="mt-1.5 text-xs font-medium text-slate-500">
                  Choose your role to get started.
                </p>
              </div>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;

                    return (
                      <button
                        className={`relative flex h-24 flex-col items-center justify-center gap-2 rounded-xl border text-center transition focus:outline-none focus:ring-2 focus:ring-emerald-700/30 ${
                          isSelected
                            ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                            : "border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50/40"
                        }`}
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        type="button"
                      >
                        {isSelected ? (
                          <span className="absolute right-3 top-3 grid size-4 place-items-center rounded-full bg-emerald-700 text-white">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                        ) : null}
                        <Icon className="size-7 text-emerald-700" strokeWidth={2.1} />
                        <span className="text-sm font-black">{role.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 grid gap-2.5">
                  <input
                    className="h-9 rounded-full border border-slate-500 bg-white px-3.5 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 sm:text-sm"
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Full Name"
                    type="text"
                    value={fullName}
                  />
                  <input
                    className="h-9 rounded-full border border-slate-500 bg-white px-3.5 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 sm:text-sm"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    type="email"
                    value={email}
                  />
                  <input
                    className="h-9 rounded-full border border-slate-500 bg-white px-3.5 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 sm:text-sm"
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder="Phone Number"
                    type="tel"
                    value={phoneNumber}
                  />

                  <PasswordInput
                    ariaLabel="password"
                    buttonClassName="grid size-6 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    containerClassName="flex h-9 items-center rounded-full border border-slate-500 bg-white px-3.5 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10"
                    iconClassName="size-3.5"
                    inputClassName="h-full min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-500 sm:text-sm"
                    onChange={setPassword}
                    onToggle={() => setShowPassword((value) => !value)}
                    placeholder="Password"
                    showPassword={showPassword}
                    value={password}
                  />

                  <PasswordInput
                    ariaLabel="confirm password"
                    buttonClassName="grid size-6 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    containerClassName="flex h-9 items-center rounded-full border border-slate-500 bg-white px-3.5 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10"
                    iconClassName="size-3.5"
                    inputClassName="h-full min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-500 sm:text-sm"
                    onChange={setConfirmPassword}
                    onToggle={() => setShowConfirmPassword((value) => !value)}
                    placeholder="Confirm Password"
                    showPassword={showConfirmPassword}
                    value={confirmPassword}
                  />
                </div>

                <label className="mt-3 flex cursor-pointer items-center gap-2 text-[11px] font-medium text-slate-700 sm:text-xs">
                  <input
                    checked={termsAccepted}
                    className="size-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    I agree to <span className="font-black text-emerald-700">Terms & Conditions</span>
                  </span>
                </label>

                <button
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-emerald-800 px-6 text-xs font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>

                {errorMessage ? (
                  <p className="mt-3 rounded-lg bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-600">
                    {errorMessage}
                  </p>
                ) : null}
              </form>

              <p className="mt-4 text-center text-[11px] font-medium text-slate-500 sm:text-xs">
                Already have an account?{" "}
                <Link className="font-black text-emerald-700 transition hover:text-emerald-950" href="/auth/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
