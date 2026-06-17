import Image from "next/image";
import Link from "next/link";

const partners = ["AGRI-GLOBAL", "SMART-TECH", "FOOD-SAFE", "GREEN-FINANCE", "TECH-SEED"];

export function FinalCtaSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 text-center" id="partners">
          <p className="text-sm font-bold text-slate-600">شركاؤنا في النجاح</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-5 text-sm font-black tracking-wide text-slate-400">
            {partners.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-none shadow-[0_18px_48px_rgba(15,23,42,0.18)] sm:min-h-[410px]">
          <Image
            alt="حقول زراعية حديثة"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
          />
          <div className="absolute inset-0 bg-emerald-950/60" />
          <div className="relative flex min-h-[360px] items-center justify-center px-5 py-16 text-center sm:min-h-[410px]">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                جاهز لتحويل تجارتك الزراعية؟
              </h2>
              <p className="mt-6 text-base leading-8 text-white/85">
                انضم إلى آلاف المزارعين والمشترين الذين يستخدمون AgriBridge لتبسيط عملياتهم
                التجارية وزيادة أرباحهم اليوم.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  className="inline-flex h-16 min-w-36 items-center justify-center rounded-xl bg-emerald-700 px-8 text-lg font-bold text-white transition hover:bg-emerald-800"
                  href="/auth/register"
                >
                  ابدأ الآن
                </Link>
                <Link
                  className="inline-flex h-16 min-w-36 items-center justify-center rounded-xl bg-white/80 px-8 text-lg font-bold text-emerald-950 transition hover:bg-white"
                  href="#footer"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
