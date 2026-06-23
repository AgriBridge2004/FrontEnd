"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthDecorativeDots } from "@/components/auth/AuthDecorativeDots";
import { Check } from "lucide-react";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const OTP_LENGTH = 6;
const INITIAL_SECONDS = 4 * 60 + 32;

export default function OtpPage() {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
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

  function handlePaste(index: number, event: React.ClipboardEvent<HTMLInputElement>) {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = digits.join("");
    void code;
    // TODO: Connect this form to the OTP verification backend.
  }

  function handleResend() {
    setDigits(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(INITIAL_SECONDS);
    focusInput(0);
    // TODO: Connect resend action to the backend.
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 lg:h-screen lg:overflow-hidden" dir="ltr">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[0.48fr_0.52fr]">
        <section className="relative hidden h-screen overflow-hidden bg-emerald-950 text-white lg:block">
          <Image
            alt="Sunlit farm field for AgriBridge verification"
            className="object-cover"
            fill
            priority
            sizes="48vw"
            src="/images/auth/verification-farm-bg.png"
          />
          <div className="absolute inset-0 bg-emerald-950/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/5 via-emerald-950/5 to-emerald-950/70" />

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
              <h1 className="max-w-sm text-4xl font-black leading-none tracking-tight text-white xl:text-[42px]">
                Verify your
                <br />
                identity
              </h1>
              <p className="mt-5 text-base font-medium text-white/90">
                We sent a code to your email.
              </p>
              <AuthDecorativeDots />
            </div>
          </div>
        </section>

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
                <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                  {digits.map((digit, index) => (
                    <input
                      aria-label={`Verification digit ${index + 1}`}
                      className="h-12 min-w-0 rounded-xl border border-slate-500 bg-white text-center text-base font-black text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 sm:h-14"
                      inputMode="numeric"
                      key={index}
                      maxLength={1}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        updateDigit(index, event.target.value)
                      }
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onPaste={(event) => handlePaste(index, event)}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      value={digit}
                    />
                  ))}
                </div>

                <p className="mt-6 text-sm font-medium text-slate-500">
                  Code expires in{" "}
                  <span className="font-semibold text-orange-500">
                    {minutes}:{seconds}
                  </span>
                </p>

                <button
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-800 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
                  type="submit"
                >
                  Verify Code
                </button>
              </form>

              <p className="mt-7 text-sm font-medium text-slate-500">
                Didn&apos;t receive code?{" "}
                <button
                  className="font-black text-emerald-700 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                  onClick={handleResend}
                  type="button"
                >
                  Resend
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
