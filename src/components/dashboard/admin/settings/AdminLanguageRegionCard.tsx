"use client";

import { CheckCircle } from "lucide-react";

import type { AdminLanguage } from "@/components/dashboard/admin/settings/admin-settings.types";
import { SettingsSectionCard } from "@/components/dashboard/settings/SettingsControls";
import { cn } from "@/lib/cn";

type AdminLanguageRegionCardProps = {
  languages: AdminLanguage[];
  onLanguageChange: (languageId: AdminLanguage["id"]) => void;
  selectedLanguage: AdminLanguage["id"];
};

export function AdminLanguageRegionCard({ languages, onLanguageChange, selectedLanguage }: AdminLanguageRegionCardProps) {
  return (
    <SettingsSectionCard id="language-region" title="Language & Region">
      <div className="grid gap-3 sm:grid-cols-2">
        {languages.map((language) => {
          const isSelected = selectedLanguage === language.id;

          return (
            <button
              className={cn(
                "relative rounded-xl border p-5 text-center transition-all duration-200 hover:shadow-md",
                isSelected ? "border-emerald-800 bg-emerald-50/30" : "border-emerald-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/30",
              )}
              key={language.id}
              onClick={() => onLanguageChange(language.id)}
              type="button"
            >
              {isSelected ? <CheckCircle className="absolute right-3 top-3 size-4 text-emerald-800" /> : null}
              <p className="text-sm font-medium text-slate-700">{language.code}</p>
              <p className="mt-2 font-black text-slate-900">{language.label}</p>
            </button>
          );
        })}
      </div>
    </SettingsSectionCard>
  );
}
