import Link from "next/link";
import { publicNavItems } from "@/lib/navigation";
import { buttonClasses } from "@/components/ui/Button";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3 font-bold text-slate-950" href="/">
          <span className="grid size-9 place-items-center rounded-md bg-emerald-700 text-white">A</span>
          <span>AgriBridge</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {publicNavItems.slice(0, 1).map((item) => (
            <Link className="transition hover:text-emerald-700" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link className={buttonClasses("ghost")} href="/auth/login">
            Login
          </Link>
          <Link className={buttonClasses("primary")} href="/auth/register">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
