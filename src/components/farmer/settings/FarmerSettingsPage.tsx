"use client";

import { useEffect, useRef, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { AccountProfileSettings } from "@/components/farmer/settings/AccountProfileSettings";
import { ConnectedDevicesSettings } from "@/components/farmer/settings/ConnectedDevicesSettings";
import { ContactInfoSettings } from "@/components/farmer/settings/ContactInfoSettings";
import { DangerZoneSettings } from "@/components/farmer/settings/DangerZoneSettings";
import { LanguageRegionSettings } from "@/components/farmer/settings/LanguageRegionSettings";
import { PaymentPayoutSettings } from "@/components/farmer/settings/PaymentPayoutSettings";
import { SecurityLoginSettings } from "@/components/farmer/settings/SecurityLoginSettings";
import { SettingsSideNav } from "@/components/farmer/settings/SettingsSideNav";
import { SettingsToast } from "@/components/farmer/settings/SettingsToast";
import { farmerSettings, type FarmerSettings } from "@/components/farmer/settings/settings.mock";

const settingsSectionIds = [
  "account-profile",
  "contact-info",
  "security-login",
  "connected-devices",
  "language-region",
  "payment-payout",
  "delete-account",
];

export function FarmerSettingsPage() {
  const [settings, setSettings] = useState<FarmerSettings>(farmerSettings);
  const [activeSection, setActiveSection] = useState("account-profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = settingsSectionIds
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

  function handleLanguageChange(language: FarmerSettings["language"]) {
    setSettings((current) => ({ ...current, language }));
    showToast("Language preference updated.");
  }

  function handleToggleTwoFactor() {
    setSettings((current) => ({ ...current, twoFactorEnabled: !current.twoFactorEnabled }));
    showToast("Two-factor authentication setting updated.");
  }

  function handleToggleAutomaticWithdrawal() {
    setSettings((current) => ({ ...current, automaticWithdrawal: !current.automaticWithdrawal }));
    showToast("Automatic withdrawal setting updated.");
  }

  function handleRevokeSession(sessionId: string) {
    setSettings((current) => ({
      ...current,
      activeSessions: current.activeSessions.filter((session) => session.id !== sessionId),
    }));
    showToast("Session revoked locally.");
  }

  // TODO: Connect settings data, profile updates, security changes, and payout settings to backend APIs.
  return (
    <FarmerDashboardLayout
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search settings..."
      searchValue={searchQuery}
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-6 sm:px-5 lg:px-7">
        <div className="mx-auto w-full max-w-[1280px]">
          <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">Settings</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">Manage your account, security, and preferences</p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-6 sm:px-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-7">
        <SettingsSideNav activeSection={activeSection} onSectionChange={handleSectionChange} />

        <div className="grid min-w-0 gap-5">
          <AccountProfileSettings
            onProfileChange={(profile) => setSettings((current) => ({ ...current, profile }))}
            onToast={showToast}
            profile={settings.profile}
          />
          <ContactInfoSettings contact={settings.contact} />
          <SecurityLoginSettings
            onToast={showToast}
            onToggleTwoFactor={handleToggleTwoFactor}
            twoFactorEnabled={settings.twoFactorEnabled}
          />
          <ConnectedDevicesSettings sessions={settings.activeSessions} onRevokeSession={handleRevokeSession} />
          <LanguageRegionSettings language={settings.language} onLanguageChange={handleLanguageChange} />
          <PaymentPayoutSettings
            automaticWithdrawal={settings.automaticWithdrawal}
            onManagePayout={() => showToast("Payout management will be connected later.")}
            onToggleAutomaticWithdrawal={handleToggleAutomaticWithdrawal}
            payoutMethod={settings.payoutMethod}
          />
          <DangerZoneSettings
            isDeleteModalOpen={isDeleteModalOpen}
            onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
            onConfirmDelete={() => {
              setIsDeleteModalOpen(false);
              showToast("Account deletion request is mocked.");
            }}
            onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
          />
        </div>
      </div>
      <SettingsToast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}
