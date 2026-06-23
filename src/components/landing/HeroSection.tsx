import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[680px] overflow-hidden bg-emerald-950 pt-24 text-white">
      <Image
        alt="Farm field with fresh vegetables"
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/images/landing/hero-farm.png"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/72 to-emerald-950/20" />
      <div className="absolute inset-0 bg-emerald-950/20" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 pb-24 pt-14 lg:px-10">
        <div className="max-w-3xl">
          <h1 className="max-w-2xl text-5xl font-black leading-[1.16] tracking-tight sm:text-6xl lg:text-[64px]">
            Bridge the Gap Between Farmers & Commercial Buyers
          </h1>
          <p className="mt-8 max-w-xl text-xl font-medium leading-8 text-white/80">
            A secure and transparent B2B marketplace for agricultural trade built on trust.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex h-14 items-center justify-center gap-4 rounded-full bg-white px-8 text-base font-black text-emerald-950 shadow-xl shadow-emerald-950/20 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-950"
              href="/marketplace"
            >
              Explore Marketplace <ArrowRight className="size-5" />
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/85 px-8 text-base font-black text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-950"
              href="/buyer/rfqs/create"
            >
              Post an RFQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
