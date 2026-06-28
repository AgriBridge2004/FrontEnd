"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { AuthSidePanel } from "@/components/auth/AuthSidePanel";
import { OTPInput } from "@/components/auth/OTPInput";
import { resendOtp, verifyOtp } from "@/lib/auth-api";

const OTP_LENGTH = 6;
const INITIAL_SECONDS = 4 * 60 + 32;

export function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const flow = searchParams.get("flow") ?? "";
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  function focusInput(index: number) {
    inputRefs.current[index]?.focus();
  }

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    setDigits((currentDigits) => {
      const nextDigits = [...currentDigits];
      nextDigits[index] = digit;
      return nextDigits;
    });

    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH - index)
      .split("");

    if (pastedDigits.length === 0) {
      return;
    }

    setDigits((currentDigits) => {
      const nextDigits = [...currentDigits];
      pastedDigits.forEach((digit, digitIndex) => {
        nextDigits[index + digitIndex] = digit;
      });
      return nextDigits;
    });

    focusInput(Math.min(index + pastedDigits.length, OTP_LENGTH - 1));
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = digits.join("");

    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Email is missing. Please restart the verification flow.");
      return;
    }

    if (code.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await verifyOtp({ email, otp: code });

      if (flow === "forgot-password") {
        const resetToken =
          response.resetToken ?? response.reset_token ?? response.token ?? response.data?.resetToken ?? response.data?.reset_token ?? response.data?.token;

        if (resetToken) {
          router.push(`/auth/reset-password?token=${encodeURIComponent(resetToken)}`);
          return;
        }

        setSuccessMessage(response.message ?? "OTP verified. Please use the reset link sent to your email.");
        return;
      }

      router.push("/auth/login");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to verify code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Email is missing. Please restart the verification flow.");
      return;
    }

    try {
      setIsResending(true);
      const response = await resendOtp({ email });
      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(INITIAL_SECONDS);
      focusInput(0);
      setSuccessMessage(response.message ?? "Verification code resent successfully.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[0.48fr_0.52fr]">
        <AuthSidePanel
          description="We sent a code to your email."
          descriptionClassName="mt-5 text-base font-medium text-white/90"
          imageAlt="Sunlit farm field for AgriBridge verification"
          imageSizes="48vw"
          imageSrc="/images/auth/verification-farm-bg.png"
          overlayClassName="bg-emerald-950/25"
          title={
            <>
              Verify your
              <br />
              identity
            </>
          }
          titleClassName="max-w-sm text-4xl font-black leading-none tracking-tight text-white xl:text-[42px]"
        />

        <section className="flex min-h-screen flex-col bg-white px-5 py-6 sm:px-8 lg:h-screen lg:min-h-0 lg:px-10 lg:py-0 xl:px-14">
          <div className="flex items-center justify-between lg:hidden">
            <Link className="relative block h-9 w-[136px] rounded-sm bg-emerald-900 p-1" href="/">
              <Image
                alt="AgriBridge logo"
                className="object-contain p-1"
                fill
                sizes="136px"
                src="/images/brand/agribridge-logo.png"
              />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center py-9 lg:min-h-0 lg:py-0">
            <div className="w-full max-w-[390px] text-center">
              <div className="mx-auto grid size-[86px] place-items-center rounded-full bg-emerald-50">
                <span className="grid size-14 place-items-center rounded-full border-2 border-emerald-600 text-emerald-600">
                  <Check className="size-7" strokeWidth={3} />
                </span>
              </div>

              <h1 className="mt-8 text-[28px] font-black tracking-tight text-slate-800 sm:text-3xl">
                Enter Verification Code
              </h1>
              <p className="mt-4 text-sm font-medium text-slate-500">
                We sent a 6-digit code to your Email
              </p>

              <form className="mt-8" onSubmit={handleSubmit}>
                <OTPInput
                  digits={digits}
                  inputRefs={inputRefs}
                  onChangeDigit={updateDigit}
                  onKeyDownDigit={handleKeyDown}
                  onPasteDigits={handlePaste}
                />

                <p className="mt-6 text-sm font-medium text-slate-500">
                  Code expires in{" "}
                  <span className="font-semibold text-orange-500">
                    {minutes}:{seconds}
                  </span>
                </p>

                <button
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-800 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Verifying..." : "Verify Code"}
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

              <p className="mt-7 text-sm font-medium text-slate-500">
                Didn&apos;t receive code?{" "}
                <button
                  className="font-black text-emerald-700 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 disabled:cursor-not-allowed disabled:text-slate-400"
                  disabled={isResending}
                  onClick={handleResend}
                  type="button"
                >
                  {isResending ? "Resending..." : "Resend"}
                </button>
              </p>

              <Link
                className="mt-5 inline-flex text-sm font-medium text-emerald-700 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                href="/auth/register"
              >
                Change phone number
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
