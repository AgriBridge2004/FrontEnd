const features = [
  {
    title: "سوق زراعي موثوق",
    description: "منصة موحدة لعرض المنتجات والوصول إلى المشترين المحتملين.",
    icon: "market",
  },
  {
    title: "طلبات شراء RFQ",
    description: "نظام منظم لاستقبال وتحليل عروض الأسعار بكفاءة عالية.",
    icon: "quote",
  },
  {
    title: "عقود رقمية",
    description: "توثيق وإدارة العقود إلكترونيا بضمانات قانونية كاملة.",
    icon: "contract",
  },
  {
    title: "دفع محمي",
    description: "حلول مالية متكاملة لضمان حقوق كافة الأطراف التجارية.",
    icon: "payment",
  },
  {
    title: "فحص جودة",
    description: "تكامل مع خدمات فحص الجودة لضمان مطابقة المواصفات.",
    icon: "quality",
  },
  {
    title: "رسائل داخلية",
    description: "تواصل مباشر وآمن بين المزارعين والتجار لتسهيل العمليات.",
    icon: "message",
  },
  {
    title: "تقييمات ومراجعات",
    description: "بناء سمعة رقمية من خلال تقييمات المشترين والمزارعين.",
    icon: "rating",
  },
  {
    title: "لوحة تحكم متقدمة",
    description: "إحصاءات وأدوات متابعة ذكية لكل خطوة في رحلة الصفقة.",
    icon: "dashboard",
  },
];

function FeatureIcon({ icon }: { icon: string }) {
  const common = "size-5";

  if (icon === "market") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 10h16l-1-5H5l-1 5Z" />
        <path d="M6 10v9h12v-9" />
        <path d="M9 19v-5h6v5" />
      </svg>
    );
  }

  if (icon === "quote") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M7 8h10M7 12h7" />
        <path d="M5 4h14v13H8l-3 3V4Z" />
      </svg>
    );
  }

  if (icon === "contract") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M7 3h8l4 4v14H7V3Z" />
        <path d="M15 3v5h4M10 13h6M10 17h4" />
      </svg>
    );
  }

  if (icon === "payment") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 7h16v10H4V7Z" />
        <path d="M4 10h16M8 15h3" />
      </svg>
    );
  }

  if (icon === "quality") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 5h14v14H5V5Z" />
        <path d="m8 12 2 2 5-5" />
      </svg>
    );
  }

  if (icon === "rating") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    );
  }

  if (icon === "dashboard") {
    return (
      <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 5h16v14H4V5Z" />
        <path d="M8 15v-3M12 15V9M16 15v-5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function FeaturesSection() {
  return (
    <section className="bg-[#f3f4f3] py-16 sm:py-20" id="features">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black text-emerald-950 sm:text-5xl">مميزات المنصة</h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-emerald-700" />
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              className="group min-h-[224px] rounded-xl border border-slate-200 bg-white px-7 py-8 text-right shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
              key={feature.title}
            >
              <div className="mb-8 grid size-12 place-items-center rounded-xl bg-emerald-700 text-white transition group-hover:bg-emerald-800">
                <FeatureIcon icon={feature.icon} />
              </div>
              <h3 className="text-xl font-black text-emerald-950">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
