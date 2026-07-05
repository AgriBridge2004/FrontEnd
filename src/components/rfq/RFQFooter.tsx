import Link from "next/link";
import { Globe2, Share2 } from "lucide-react";

const links = ["Privacy Policy", "Terms of Service", "Compliance", "Sustainability"];

export function RFQFooter() {
  return (
    <footer className="mt-14 border-t border-emerald-100 bg-stone-100/80">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-black text-emerald-900">AgriBridge</p>
          <p className="mt-1.5 text-xs font-medium text-slate-600">© 2024 AgriBridge Logistics. All rights reserved.</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link className="transition hover:text-emerald-900" href="#" key={link}>
              {link}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          <button
            aria-label="Global site"
            className="grid size-9 place-items-center rounded-full border border-emerald-200 bg-white text-emerald-900 transition hover:bg-emerald-50"
            type="button"
          >
            <Globe2 className="size-3.5" />
          </button>
          <button
            aria-label="Share"
            className="grid size-9 place-items-center rounded-full border border-emerald-200 bg-white text-emerald-900 transition hover:bg-emerald-50"
            type="button"
          >
            <Share2 className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
