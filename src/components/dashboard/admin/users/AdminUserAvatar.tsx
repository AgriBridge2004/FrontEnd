import Image from "next/image";

import type { AdminUser } from "@/components/dashboard/admin/users/admin-users.types";
import { cn } from "@/lib/cn";

const gradients = [
  "bg-blue-100 text-blue-700",
  "bg-sky-100 text-blue-700",
  "bg-emerald-900 text-white",
  "bg-slate-100 text-slate-700",
];

export function AdminUserAvatar({ size = "md", user }: { size?: "lg" | "md"; user: AdminUser }) {
  const dimensions = size === "lg" ? "size-20" : "size-9";

  if (user.avatar) {
    return (
      <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-slate-100", dimensions)}>
        <Image alt={`${user.name} avatar`} className="object-cover" fill sizes={size === "lg" ? "80px" : "36px"} src={user.avatar} />
      </span>
    );
  }

  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full text-sm font-black", dimensions, gradients[user.id.length % gradients.length])}>
      {user.initials ?? user.name.slice(0, 2).toUpperCase()}
    </span>
  );
}
