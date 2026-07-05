"use client";

import { useEffect, useRef, useState } from "react";

import { SettingsToast } from "@/components/dashboard/farmer/settings/SettingsToast";
import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { QualityOfficerAccountProfileSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerAccountProfileSection";
import { QualityOfficerConnectedDevicesSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerConnectedDevicesSection";
import { QualityOfficerContactInfoSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerContactInfoSection";
import { QualityOfficerCoverageAreaSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerCoverageAreaSection";
import { QualityOfficerDangerZoneSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerDangerZoneSection";
import { QualityOfficerLanguageRegionSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerLanguageRegionSection";
import { QualityOfficerPaymentPayoutSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerPaymentPayoutSection";
import { QualityOfficerSecurityLoginSection } from "@/components/dashboard/quality-officer/settings/QualityOfficerSecurityLoginSection";
import { qualityOfficerSettings } from "@/components/dashboard/quality-officer/settings/quality-officer-settings.mock";
import type { QualityOfficerSettings } from "@/components/dashboard/quality-officer/settings/quality-officer-settings.types";
import {
  QualityOfficerSettingsNav,
  qualityOfficerSettingsSectionIds,
} from "@/components/dashboard/quality-officer/settings/QualityOfficerSettingsNav";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerSettingsPage() {
  const [settings, setSettings] = useState<QualityOfficerSettings>(qualityOfficerSettings);
  const [activeSection, setActiveSection] = useState("account-profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = qualityOfficerSettingsSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  function handleSectionChange(sectionId: string) {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <DashboardLayout
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={5}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search settings..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Ahmed Al-Zahrani"
      userSubLabel="Quality Lead"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-6 sm:px-5 lg:px-7">
        <div className="mx-auto w-full max-w-[1280px]">
          <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">Settings</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">
            Manage your professional credentials, security, and coverage regions.
          </p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-6 sm:px-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-7">
        <QualityOfficerSettingsNav activeSection={activeSection} onSectionChange={handleSectionChange} />

        <div className="grid min-w-0 gap-5">
          <QualityOfficerAccountProfileSection
            onProfileChange={(profile) => setSettings((current) => ({ ...current, profile }))}
            onToast={showToast}
            profile={settings.profile}
          />
          <QualityOfficerContactInfoSection onToast={showToast} profile={settings.profile} />
          <QualityOfficerSecurityLoginSection
            onChangePassword={() => showToast("Change password flow will be connected later.")}
            onToggleTwoFactor={() => {
              setSettings((current) => ({ ...current, twoFactorEnabled: !current.twoFactorEnabled }));
              showToast("Two-factor authentication setting updated.");
            }}
            twoFactorEnabled={settings.twoFactorEnabled}
          />
          <QualityOfficerLanguageRegionSection
            language={settings.profile.language}
            onLanguageChange={(language) => {
              setSettings((current) => ({ ...current, profile: { ...current.profile, language } }));
              showToast("Language preference updated.");
            }}
          />
          <QualityOfficerPaymentPayoutSection
            automaticWithdrawal={settings.automaticWithdrawal}
            onManagePayout={() => showToast("Payout management will be connected later.")}
            onToggleAutomaticWithdrawal={() => {
              setSettings((current) => ({ ...current, automaticWithdrawal: !current.automaticWithdrawal }));
              showToast("Automatic withdrawal setting updated.");
            }}
            payoutMethod={settings.profile.payoutMethod}
          />
          <QualityOfficerCoverageAreaSection
            coverageAreas={settings.profile.coverageAreas}
            onAddRegion={() => showToast("Add region flow will be connected later.")}
            onRemoveRegion={(region) => {
              setSettings((current) => ({
                ...current,
                profile: {
                  ...current.profile,
                  coverageAreas: current.profile.coverageAreas.filter((area) => area !== region),
                },
              }));
              showToast("Coverage area removed locally.");
            }}
            onSave={() => showToast("Coverage area saved locally.")}
          />
          <QualityOfficerConnectedDevicesSection
            activeSessions={settings.activeSessions}
            devices={settings.connectedDevices}
            onDeviceAction={() => showToast("Device actions will be connected later.")}
            onRevokeSession={() => showToast("Session revoke will be connected later.")}
          />
          <QualityOfficerDangerZoneSection onDeleteAccount={() => showToast("Delete account flow will be connected later.")} />
        </div>
      </div>

      <SettingsToast message={toastMessage} />
    </DashboardLayout>
  );
}
