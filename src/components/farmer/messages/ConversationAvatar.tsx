import { cn } from "@/lib/cn";

type ConversationAvatarProps = {
  initials: string;
  size?: "sm" | "md" | "lg";
  tone?: "green" | "orange" | "blue" | "farmer";
};

const sizeStyles = {
  sm: "size-7 text-[8px]",
  md: "size-10 text-[10px]",
  lg: "size-11 text-[11px]",
};

const toneStyles = {
  green: "bg-emerald-800 text-white",
  orange: "bg-orange-600 text-white",
  blue: "bg-blue-100 text-blue-700",
  farmer: "bg-slate-900 text-white",
};

export function ConversationAvatar({ initials, size = "md", tone = "green" }: ConversationAvatarProps) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full font-black leading-none", sizeStyles[size], toneStyles[tone])}>
      {initials}
    </span>
  );
}
