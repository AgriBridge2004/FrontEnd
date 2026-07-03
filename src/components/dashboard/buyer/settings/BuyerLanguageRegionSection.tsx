"use client";

import { CheckCircle } from "lucide-react";

import { BuyerSettingsCard } from "@/components/dashboard/buyer/settings/BuyerSettingsControls";
import type { BuyerLanguage } from "@/components/dashboard/buyer/settings/buyer-settings.types";
import { cn } from "@/lib/cn";

type BuyerLanguageRegionSectionProps = {
  language: BuyerLanguage;
  onLanguageChange: (language: BuyerLanguage) => void;
};

export function BuyerLanguageRegionSection({ language, onLanguageChange }: BuyerLanguageRegionSectionProps) {
  const languages = [
    { id: "en" as const, code: "EN", label: "English (US)" },
    { id: "ar" as const, code: "عربي", label: "Arabic (KSA)" },
  ];

  return (
    <BuyerSettingsCard id="language-region" title="Language & Region">
      <div className="grid gap-3 sm:grid-cols-2">
        {languages.map((item) => (
          <button
            className={cn(
              "relative rounded-xl border p-5 text-center transition-all duration-200 hover:shadow-md",
              language === item.id ? "border-emerald-800 bg-emerald-50/30" : "border-emerald-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/30",
            )}
            key={item.id}
            onClick={() => onLanguageChange(item.id)}
            type="button"
          >
            {language === item.id ? <CheckCircle className="absolute right-3 top-3 size-4 text-emerald-800" /> : null}
            <p className="text-sm font-medium text-slate-700">{item.code}</p>
            <p className="mt-2 font-black text-slate-900">{item.label}</p>
          </button>
        ))}
      </div>
    </BuyerSettingsCard>
  );
}
