import Link from "next/link";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "المميزات", href: "#features" },
  { label: "كيف نعمل", href: "#how-it-works" },
  { label: "من نحن", href: "#about" },
  { label: "الفريق", href: "#team" },
  { label: "شركاؤنا", href: "#partners" },
];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link className="text-2xl font-black tracking-normal text-emerald-950" href="/">
          AgriBridge
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
          {navLinks.map((link) => (
            <Link
              className="relative py-2 transition hover:text-emerald-900 first:text-emerald-950 first:after:absolute first:after:inset-x-0 first:after:bottom-0 first:after:h-0.5 first:after:rounded-full first:after:bg-emerald-800"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            className="hidden h-9 items-center rounded-xl border border-emerald-900 px-6 text-sm font-bold text-emerald-950 transition hover:bg-emerald-50 sm:inline-flex"
            href="/auth/login"
          >
            تسجيل الدخول
          </Link>
          <Link
            className="inline-flex h-9 items-center rounded-xl bg-emerald-950 px-6 text-sm font-bold text-white transition hover:bg-emerald-900"
            href="/auth/register"
          >
            تسجيل جديد
          </Link>
        </div>
      </nav>
    </header>
  );
}
