import Image from "next/image";

const bullets = ["تقليل الاعتماد على الوسطاء", "ضمان جودة المنتجات", "حماية حقوق الطرفين"];

export function AboutSection() {
  return (
    <section className="bg-emerald-950 py-16 text-white sm:py-20" id="about">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <div className="lg:order-first">
          <div className="relative aspect-[1.05] overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <Image
              alt="مزارع يفحص محصولا في حقل أخضر"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 500px, 90vw"
              src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=80"
            />
          </div>
        </div>

        <div className="max-w-xl">
          <h2 className="text-4xl font-black sm:text-5xl">من نحن</h2>
          <p className="mt-6 text-base leading-9 text-emerald-50/85">
            AgriBridge منصة رقمية تهدف إلى بناء الثقة في التجارة الزراعية من خلال ربط
            المزارعين بالمشترين التجاريين ضمن بيئة منظمة وموثوقة.
          </p>

          <div className="mt-10 grid gap-7">
            {bullets.map((bullet) => (
              <div
                className="grid grid-cols-[44px_1fr] items-center gap-5"
                key={bullet}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-emerald-200">
                  <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <span className="text-lg font-black text-white">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
