"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bell,
  CreditCard,
  Handshake,
  Home,
  Layers,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  User,
  X,
} from "lucide-react";

import { cn } from "@/lib/cn";

const navItems = [
  { label: "Dashboard", href: "/farmer/dashboard", icon: Home },
  { label: "My Listings", href: "/farmer/listings", icon: Layers },
  { label: "Deals", href: "/farmer/deals", icon: Handshake },
  { label: "Messages", href: "/farmer/messages", icon: MessageSquare },
  { label: "Payments", href: "/farmer/payments", icon: CreditCard },
  { label: "Reviews & Ratings", href: "/farmer/reviews", icon: Star },
  { label: "Notifications", href: "/farmer/notifications", icon: Bell, badge: 3 },
  { label: "Profile", href: "/farmer/profile", icon: User },
  { label: "Settings", href: "/farmer/settings", icon: Settings },
];

type FarmerSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FarmerSidebar({ isOpen, onClose }: FarmerSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen ? (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          type="button"
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[232px] flex-col overflow-y-auto bg-[#eaf2ed] px-5 py-5 text-slate-700 transition-transform duration-200 lg:z-20 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-center">
          <Link
            className="flex h-12 w-full max-w-[176px] items-center justify-center rounded-xl bg-emerald-900 px-4 transition hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            href="/"
            onClick={onClose}
          >
            <span className="relative block h-8 w-full">
              <Image alt="AgriBridge logo" className="object-contain" fill sizes="138px" src="/images/brand/agribridge-logo.png" />
            </span>
          </Link>
          <button
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded-full bg-white text-slate-600 lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-9 grid gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                className={cn(
                  "flex h-10 items-center gap-2.5 rounded-lg px-3.5 text-sm font-semibold transition",
                  isActive ? "bg-emerald-800 text-white" : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-900",
                )}
                href={item.href}
                key={item.label}
                onClick={onClose}
              >
                <Icon className="size-[18px] shrink-0" strokeWidth={2.1} />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-[11px] font-black text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-emerald-900/10 pt-4">
          <button
            className="flex h-10 w-full items-center gap-2.5 rounded-lg bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-900"
            type="button"
          >
            <LogOut className="size-[18px]" strokeWidth={2.1} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
