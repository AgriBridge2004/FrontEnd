"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { clearAuthSession } from "@/lib/auth-storage";

type UserMenuProps = {
  avatarInitials?: string;
  name: string;
  profileHref: string;
  subLabel?: string;
};

export function UserMenu({ avatarInitials = "RK", name, profileHref, subLabel }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearAuthSession();
    router.push("/login");
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full pr-1 transition hover:bg-slate-50"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-emerald-950 text-xs font-black text-white">
          {avatarInitials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-black leading-4 text-slate-900">{name}</span>
          {subLabel ? <span className="block text-[9px] font-bold uppercase tracking-wide text-slate-500">{subLabel}</span> : null}
        </span>
        <ChevronDown className="hidden size-3.5 text-slate-400 sm:block" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          <Link
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800"
            href={profileHref}
            onClick={() => setIsOpen(false)}
          >
            <User className="size-4" />
            Profile
          </Link>
          <button
            className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
            type="button"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
