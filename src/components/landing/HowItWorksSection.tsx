const steps = [
  {
    title: "ينشر المزارع المحصول",
    description: "يسجل بيانات محصوله وكمياته ومواعيد توفره.",
  },
  {
    title: "يتفاوض المشتري",
    description: "يناقش الشروط والأسعار عبر أدوات المنصة.",
  },
  {
    title: "يتم إنشاء العقد",
    description: "تتحول تفاصيل الاتفاق إلى عقد رقمي واضح.",
  },
  {
    title: "يتم فحص الجودة",
    description: "تراجع المواصفات لضمان مطابقة المنتج.",
  },
  {
    title: "يتم إتمام الصفقة",
    description: "تسلم المنتجات ويتم الدفع بكل أمان.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#f7f8f7] py-16 sm:py-20" id="how-it-works">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black text-emerald-950 sm:text-5xl">كيفية العمل</h2>
          <p className="mt-4 text-sm font-medium text-slate-600">
            خطوات بسيطة لبدء رحلتك في التجارة الزراعية
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-5 md:gap-7">
          <div className="absolute left-16 right-16 top-[46px] hidden h-0.5 bg-slate-300 md:block" />
          {steps.map((step, index) => (
            <article
              className={`relative z-10 flex flex-col items-center ${
                index % 2 === 1 ? "md:pt-14" : ""
              }`}
              key={step.title}
            >
              <div
                className={`grid size-16 place-items-center rounded-full text-xl font-black text-white shadow-[0_8px_18px_rgba(15,23,42,0.18)] ring-4 ring-white ${
                  index % 2 === 1 ? "bg-emerald-700" : "bg-emerald-950"
                }`}
              >
                {index + 1}
              </div>
              <div className="mt-4 min-h-[132px] w-full rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <h3 className="text-lg font-black text-emerald-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
