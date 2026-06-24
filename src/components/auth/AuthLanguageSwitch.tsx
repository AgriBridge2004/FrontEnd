type AuthLanguageSwitchProps = {
  variant?: "plain" | "boxed" | "pill";
};

export function AuthLanguageSwitch({ variant = "plain" }: AuthLanguageSwitchProps) {
  if (variant === "boxed") {
    return (
      <div className="flex overflow-hidden rounded-md border border-slate-200 bg-white text-[11px] font-bold uppercase tracking-wide text-slate-400">
        <span className="bg-white px-3.5 py-1.5 text-emerald-950">EN</span>
        <span className="border-l border-slate-200 px-3.5 py-1.5">AR</span>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div className="flex overflow-hidden rounded-full border border-slate-200 bg-white p-1 text-[11px] font-bold uppercase tracking-wide text-slate-400 shadow-sm">
        <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-slate-800">EN</span>
        <span className="px-3.5 py-1.5">AR</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
      <span className="text-emerald-800">EN</span>
      <span className="h-4 w-px bg-slate-300" />
      <span className="text-slate-400">AR</span>
    </div>
  );
}
