import Link from "next/link";

const quickLinks = [
  { label: "من نحن", href: "#about" },
  { label: "فريقنا", href: "#team" },
  { label: "الوظائف", href: "#footer" },
  { label: "المميزات", href: "#features" },
  { label: "الأسعار", href: "#footer" },
  { label: "الأمان", href: "#footer" },
  { label: "كيف نعمل", href: "#how-it-works" },
  { label: "مركز المساعدة", href: "#footer" },
];

export function LandingFooter() {
  return (
    <footer className="bg-[#f3f4f3] text-slate-700" id="footer">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-2xl font-black text-emerald-950">AgriBridge</h2>
          <p className="mt-7 max-w-md text-sm leading-8">
            المنصة الرقمية الأولى في الشرق الأوسط لربط التجار بالمزارعين من خلال حلول
            تقنية مبتكرة وآمنة.
          </p>
          <div className="mt-8 flex gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-emerald-950 text-white">
              <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 12v7h16v-7" />
                <path d="M16 6 12 2 8 6M12 2v14" />
              </svg>
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-emerald-950 text-white">
              <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16v12H4V6Z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-black text-emerald-950">الشركة</h3>
            <div className="mt-5 grid gap-4 text-sm">
              {quickLinks.slice(0, 3).map((link) => (
                <Link className="transition hover:text-emerald-900" href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-emerald-950">المنصة</h3>
            <div className="mt-5 grid gap-4 text-sm">
              {quickLinks.slice(3, 6).map((link) => (
                <Link className="transition hover:text-emerald-900" href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-emerald-950">الدعم</h3>
            <div className="mt-5 grid gap-4 text-sm">
              <Link className="transition hover:text-emerald-900" href="#footer">
                اتصل بنا
              </Link>
              <Link className="transition hover:text-emerald-900" href="#footer">
                المجتمع
              </Link>
              <Link className="transition hover:text-emerald-900" href="#footer">
                ملفات الارتباط
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-300/70 px-5 py-8 text-center text-sm text-slate-600">
        © 2026 AgriBridge. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
