import { cn } from "@/lib/cn";

const gradients = [
  "from-orange-600 via-orange-200 to-amber-400",
  "from-emerald-900 via-emerald-200 to-lime-500",
  "from-indigo-500 via-orange-200 to-amber-500",
  "from-slate-950 via-slate-600 to-orange-500",
  "from-orange-700 via-yellow-300 to-orange-50",
  "from-orange-500 via-orange-200 to-amber-600",
];

export function AdminOfficerAvatar({ index, size = "md" }: { index: number; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "block shrink-0 rounded-full bg-gradient-to-br",
        gradients[index % gradients.length],
        size === "sm" ? "size-9" : "size-10",
      )}
    />
  );
}
