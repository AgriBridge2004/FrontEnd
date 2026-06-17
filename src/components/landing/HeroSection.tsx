import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-[#f7f8f7]" id="home">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-14 sm:py-16 lg:min-h-[540px] lg:grid-cols-2 lg:py-12">
        <div className="max-w-xl text-center lg:text-right">
          <h1 className="text-4xl font-black leading-[1.25] text-emerald-950 sm:text-5xl lg:text-[54px]">
            تحويل التجارة الزراعية من خلال التكنولوجيا
          </h1>
          <p className="mt-7 text-base leading-8 text-slate-700">
            نحن نبني جسرا رقميا آمنا يربط المزارعين والمشترين مباشرة، لضمان تجارة عادلة
            وشفافة وفعالة مدعومة بأحدث التقنيات الرقمية.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-950 px-7 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900"
              href="/auth/register"
            >
              ابدأ الآن
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl border border-emerald-900 bg-white px-7 text-sm font-bold text-emerald-950 transition hover:bg-emerald-50"
              href="/marketplace"
            >
              تصفح السوق
            </Link>
          </div>

          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <span className="grid size-11 place-items-center rounded-full bg-emerald-100 text-emerald-800">
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 3 4 7v6c0 5 3.4 7.7 8 8 4.6-.3 8-3 8-8V7l-8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span className="text-right leading-tight">
              <span className="block text-xs font-bold text-slate-500">عقود موثقة</span>
              <span className="block text-2xl font-black text-emerald-950">100% آمنة</span>
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:order-first">
          <div className="absolute -inset-5 rounded-[2.2rem] bg-emerald-100/60 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,#275c4d_0%,#0b3d34_42%,#062a25_100%)] shadow-[0_28px_70px_rgba(15,23,42,0.22)]">
            <Image
              alt=""
              className="absolute inset-0 object-cover opacity-15"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
            />
            <div className="absolute left-1/2 top-[52%] h-[54%] w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[2rem] border border-white/20 bg-slate-950/55 shadow-2xl" />
            <div className="absolute left-1/2 top-[52%] grid h-[42%] w-[54%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] grid-cols-4 gap-1 rounded-xl border border-emerald-200/40 bg-emerald-700/35 p-3 shadow-xl">
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  className="rounded-sm bg-[linear-gradient(135deg,#9bd56e,#208346)] opacity-95"
                  key={index}
                />
              ))}
            </div>
            <div className="absolute left-[28%] top-[25%] h-28 w-20 rotate-[-10deg] rounded-xl border border-cyan-200/25 bg-cyan-300/10 backdrop-blur-sm" />
            <div className="absolute left-[44%] top-[17%] h-40 w-28 rotate-[12deg] rounded-2xl border border-cyan-200/30 bg-cyan-300/10 backdrop-blur-sm" />
            <div className="absolute right-[25%] top-[47%] h-16 w-16 rounded-full bg-lime-500/80 blur-sm" />
            <div className="absolute right-[31%] top-[40%] h-14 w-20 rounded-full bg-lime-600/90 blur-[1px]" />
            <div className="absolute left-[18%] top-[35%] h-5 w-16 rotate-[-15deg] rounded-full border border-cyan-100/50 bg-white/10" />
            <div className="absolute left-[16%] top-[32%] h-2 w-2 rounded-full bg-cyan-100" />
            <div className="absolute left-[30%] bottom-[24%] rounded-xl bg-white/90 px-3 py-2 text-xs font-black text-emerald-950 shadow-lg">
              RFQ
            </div>
            <div className="absolute right-[22%] bottom-[22%] rounded-xl bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-950 shadow-lg">
              AI
            </div>
            <div className="absolute inset-x-10 bottom-9 h-px bg-cyan-100/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
