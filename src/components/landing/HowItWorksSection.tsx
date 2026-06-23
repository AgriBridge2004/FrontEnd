"use client";

import Image from "next/image";
import { Handshake, Search, ShieldCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    number: "1",
    title: "Create Account",
    description: "Sign up as a buyer or supplier in minutes.",
    icon: UserPlus,
    className: "lg:col-start-1 lg:row-start-1",
  },
  {
    number: "2",
    title: "Find or Post",
    description: "Browse products or post an RFQ for quotes.",
    icon: Search,
    className: "lg:col-start-1 lg:row-start-2",
  },
  {
    number: "3",
    title: "Negotiate & Agree",
    description: "Discuss terms and finalize your deal.",
    icon: Handshake,
    className: "lg:col-start-2 lg:row-start-2",
  },
  {
    number: "4",
    title: "Secure Trade",
    description: "Pay securely and receive quality products on time.",
    icon: ShieldCheck,
    className: "lg:col-start-2 lg:row-start-1",
  },
];

const carouselSlides = [
  {
    label: "Create Account",
    src: "/images/landing/how-it-works/step-1.png",
  },
  {
    label: "Find or Post",
    src: "/images/landing/how-it-works/step-2.png",
  },
  {
    label: "Negotiate & Agree",
    src: "/images/landing/how-it-works/step-3.png",
  },
  {
    label: "Secure Trade",
    src: "/images/landing/how-it-works/step-4.png",
  },
];

export function HowItWorksSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % carouselSlides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-white pb-16 pt-3" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-center gap-5">
          <span className="hidden h-px w-40 bg-emerald-800/35 sm:block" />
          <h2 className="text-center text-4xl font-black tracking-tight text-emerald-950">
            How It Works
          </h2>
          <span className="hidden h-px w-40 bg-emerald-800/35 sm:block" />
        </div>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[430px]">
            <Image
              alt=""
              className="pointer-events-none select-none object-contain object-left-bottom "
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              src="/images/landing/leaf-decoration.png"
            />
            <div className="pointer-events-none absolute left-[5.25rem] top-[7rem] z-0 hidden h-44 border-l-2 border-dotted border-emerald-200/80 lg:block" />
            <div className="pointer-events-none absolute left-[calc(50%+8.25rem)] top-[7rem] z-0 hidden h-44 border-l-2 border-dotted border-emerald-200/80 lg:block" />
            <div className="pointer-events-none absolute left-[5.25rem] right-[calc(50%-8.25rem)] top-[18rem] z-0 hidden border-t-2 border-dotted border-emerald-200/80 lg:block" />

            <div className="relative z-10 grid gap-10 pt-20 sm:grid-cols-2 lg:grid-rows-[4rem_4rem] lg:gap-x-24 lg:gap-y-28">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <article className={`flex items-center gap-4 ${step.className}`} key={step.title}>
                    <span className="w-10 shrink-0 text-right text-5xl font-black text-emerald-300/80">
                      {step.number}
                    </span>
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-800 shadow-sm">
                      <Icon className="size-6" strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3 className="text-base font-black leading-tight text-emerald-950">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-[160px] text-xs font-semibold leading-5 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            <div className="relative h-[330px] overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(15,118,110,0.12)] sm:h-[420px] lg:h-[440px]">
              {carouselSlides.map((slide, index) => (
                <Image
                  alt={slide.label}
                  className={`object-contain transition-opacity duration-700 ease-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  fill
                  key={slide.src}
                  priority={index === 0}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  src={slide.src}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {carouselSlides.map((slide, index) => (
                <button
                  aria-label={`Show ${slide.label} slide`}
                  aria-pressed={index === currentSlide}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 ${
                    index === currentSlide
                      ? "w-8 bg-emerald-700"
                      : "w-2.5 bg-emerald-100 hover:bg-emerald-200"
                  }`}
                  key={slide.label}
                  onClick={() => setCurrentSlide(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
