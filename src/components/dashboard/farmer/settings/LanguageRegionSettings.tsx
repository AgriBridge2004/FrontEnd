"use client";

import { CheckCircle } from "lucide-react";

import { SettingsCard } from "@/components/dashboard/farmer/settings/SettingsControls";
import type { FarmerSettings } from "@/components/dashboard/farmer/settings/settings.mock";
import { cn } from "@/lib/cn";

type LanguageRegionSettingsProps = {
  language: FarmerSettings["language"];
  onLanguageChange: (language: FarmerSettings["language"]) => void;
};

export function LanguageRegionSettings({ language, onLanguageChange }: LanguageRegionSettingsProps) {
  const languages = [
    { id: "en" as const, code: "EN", label: "English (US)" },
    { id: "ar" as const, code: "عربي", label: "Arabic (KSA)" },
  ];

  // TODO: Connect selected language to future i18n integration.
  return (
    <SettingsCard id="language-region" title="Language & Region">
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
    </SettingsCard>
  );
}
