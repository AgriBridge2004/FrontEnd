"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthDecorativeDots } from "@/components/auth/AuthDecorativeDots";
import { Building2, Check, Eye, EyeOff, Tractor } from "lucide-react";
import { FormEvent, useState } from "react";

type Role = "farmer" | "buyer";

const roles = [
  { id: "farmer" as const, label: "Farmer", icon: Tractor },
  { id: "buyer" as const, label: "Buyer", icon: Building2 },
];

export default function AuthRegisterPage() {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Connect this form to the registration backend.
    router.push("/auth/otp");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[1fr_1fr]">
        <section className="relative hidden h-screen overflow-hidden rounded-r-[24px] bg-emerald-950 text-white lg:block">
          <Image
            alt="Farm tractor field for AgriBridge registration"
            className="object-cover"
            fill
            priority
            sizes="50vw"
            src="/images/auth/register-farm-bg.png"
          />
          <div className="absolute inset-0 bg-emerald-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 via-emerald-950/5 to-emerald-950/70" />

          <span className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full border border-white/20" />

          <div className="relative z-10 flex h-full flex-col justify-between px-8 py-8 xl:px-12 xl:py-9">
            <Link className="relative block h-8 w-[121px]" href="/">
              <Image
                alt="AgriBridge logo"
                className="object-contain"
                fill
                sizes="121px"
                src="/images/brand/agribridge-logo.png"
              />
            </Link>

            <div className="pb-7">
              <h1 className="max-w-lg text-4xl font-black leading-tight tracking-tight text-white xl:text-[42px]">
                Join AgriBridge
              </h1>
              <p className="mt-3 text-sm font-medium text-white/85 xl:text-base">
                Connect with farmers and buyers securely.
              </p>
              <AuthDecorativeDots />
            </div>
          </div>
        </section>

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

            <div className="flex overflow-hidden rounded-md border border-slate-200 bg-white text-[11px] font-bold uppercase tracking-wide text-slate-400">
              <span className="bg-white px-3.5 py-1.5 text-emerald-950">EN</span>
              <span className="border-l border-slate-200 px-3.5 py-1.5">AR</span>
            </div>
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

                  <div className="flex h-9 items-center rounded-full border border-slate-500 bg-white px-3.5 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10">
                    <input
                      className="h-full min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-500 sm:text-sm"
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="grid size-6 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                      onClick={() => setShowPassword((value) => !value)}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>

                  <div className="flex h-9 items-center rounded-full border border-slate-500 bg-white px-3.5 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10">
                    <input
                      className="h-full min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-500 sm:text-sm"
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                    />
                    <button
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      className="grid size-6 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      type="button"
                    >
                      {showConfirmPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
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
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-emerald-800 px-6 text-xs font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 sm:text-sm"
                  type="submit"
                >
                  Create Account
                </button>
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
