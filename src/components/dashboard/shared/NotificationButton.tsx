"use client";

import { Bell } from "lucide-react";

type NotificationButtonProps = {
  count?: number;
};

export function NotificationButton({ count = 0 }: NotificationButtonProps) {
  return (
    <button className="relative grid size-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100" type="button">
      <Bell className="size-4" />
      {count > 0 ? (
        <span className="absolute right-0.5 top-0 grid size-4 place-items-center rounded-full bg-red-500 text-[9px] font-black text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}
