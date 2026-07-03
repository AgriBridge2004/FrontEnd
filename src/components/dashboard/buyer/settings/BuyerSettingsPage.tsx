"use client";

import { useEffect, useRef, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerAccountProfileSection } from "@/components/dashboard/buyer/settings/BuyerAccountProfileSection";
import { BuyerContactInfoSection } from "@/components/dashboard/buyer/settings/BuyerContactInfoSection";
import { BuyerDangerZoneSection } from "@/components/dashboard/buyer/settings/BuyerDangerZoneSection";
import { BuyerLanguageRegionSection } from "@/components/dashboard/buyer/settings/BuyerLanguageRegionSection";
import { BuyerNotificationDevicesSection } from "@/components/dashboard/buyer/settings/BuyerNotificationDevicesSection";
import { BuyerPaymentMethodsSection } from "@/components/dashboard/buyer/settings/BuyerPaymentMethodsSection";
import { BuyerSecurityLoginSection } from "@/components/dashboard/buyer/settings/BuyerSecurityLoginSection";
import { BuyerSettingsToast } from "@/components/dashboard/buyer/settings/BuyerSettingsControls";
import { BuyerSettingsNav } from "@/components/dashboard/buyer/settings/BuyerSettingsNav";
import { buyerSettings } from "@/components/dashboard/buyer/settings/buyer-settings.mock";
import type { BuyerLanguage, BuyerSettings } from "@/components/dashboard/buyer/settings/buyer-settings.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

const settingsSectionIds = [
  "account-profile",
  "contact-info",
  "security-login",
  "language-region",
  "payment-methods",
  "notification-devices",
  "delete-account",
];

export function BuyerSettingsPage() {
  const [settings, setSettings] = useState<BuyerSettings>(buyerSettings);
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

  function handleLanguageChange(language: BuyerLanguage) {
    setSettings((current) => ({ ...current, language }));
    showToast("Language preference updated.");
  }

  function handleToggleTwoFactor() {
    setSettings((current) => ({ ...current, twoFactorEnabled: !current.twoFactorEnabled }));
    showToast("Two-factor authentication setting updated.");
  }

  function handleRevokeSession(sessionId: string) {
    setSettings((current) => ({
      ...current,
      activeSessions: current.activeSessions.filter((session) => session.id !== sessionId),
    }));
    showToast("Session revoked locally.");
  }

  // TODO: Connect buyer settings data, profile updates, security changes, and payment settings to backend APIs.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      onSearchChange={setSearchQuery}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search for settings, profiles, or documentation..."
      searchValue={searchQuery}
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-6 sm:px-5 lg:px-7">
        <div className="mx-auto w-full max-w-[1280px]">
          <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">Settings</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">Manage your account, security, and preferences</p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-6 sm:px-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-7">
        <BuyerSettingsNav activeSection={activeSection} onSectionChange={handleSectionChange} />

        <div className="grid min-w-0 gap-5">
          <BuyerAccountProfileSection
            onProfileChange={(profile) => setSettings((current) => ({ ...current, profile }))}
            onToast={showToast}
            profile={settings.profile}
          />
          <BuyerContactInfoSection contact={settings.contact} />
          <BuyerSecurityLoginSection
            onChangePassword={() => showToast("Change password flow will be connected later.")}
            onRevokeSession={handleRevokeSession}
            onToggleTwoFactor={handleToggleTwoFactor}
            sessions={settings.activeSessions}
            twoFactorEnabled={settings.twoFactorEnabled}
          />
          <BuyerLanguageRegionSection language={settings.language} onLanguageChange={handleLanguageChange} />
          <BuyerPaymentMethodsSection
            onAddPaymentMethod={() => showToast("Payment method flow will be connected later.")}
            onManagePaymentMethod={() => showToast("Payment method flow will be connected later.")}
            paymentMethod={settings.paymentMethod}
          />
          <BuyerNotificationDevicesSection onOpenNotifications={() => showToast("Notification settings will be connected later.")} />
          <BuyerDangerZoneSection onDeleteAccount={() => showToast("Delete account flow will be connected later.")} />
        </div>
      </div>
      <BuyerSettingsToast message={toastMessage} />
    </DashboardLayout>
  );
}
