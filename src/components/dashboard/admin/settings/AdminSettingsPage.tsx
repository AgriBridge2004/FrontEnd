"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminAccountProfileCard } from "@/components/dashboard/admin/settings/AdminAccountProfileCard";
import { AdminContactInfoCard } from "@/components/dashboard/admin/settings/AdminContactInfoCard";
import { AdminDangerZoneCard } from "@/components/dashboard/admin/settings/AdminDangerZoneCard";
import { AdminLanguageRegionCard } from "@/components/dashboard/admin/settings/AdminLanguageRegionCard";
import { AdminNotificationPreferencesCard } from "@/components/dashboard/admin/settings/AdminNotificationPreferencesCard";
import { AdminPersonalInformationCard } from "@/components/dashboard/admin/settings/AdminPersonalInformationCard";
import { AdminSecurityLoginCard } from "@/components/dashboard/admin/settings/AdminSecurityLoginCard";
import { AdminSettingsSidebar } from "@/components/dashboard/admin/settings/AdminSettingsSidebar";
import {
  adminLanguages,
  adminProfileSettings,
  adminSessions,
  adminSettingsNavItems,
} from "@/components/dashboard/admin/settings/admin-settings.mock";
import type { AdminLanguage, AdminSession, AdminSettingsNavItem } from "@/components/dashboard/admin/settings/admin-settings.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { SettingsToast } from "@/components/dashboard/settings/SettingsControls";

const adminSettingsSectionIds = [
  "account-profile",
  "personal-information",
  "contact-info",
  "security-login",
  "language-region",
  "notification-preferences",
  "active-sessions",
  "delete-account",
];

export function AdminSettingsPage() {
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("account-profile");
  const [bio, setBio] = useState(adminProfileSettings.bio);
  const [displayName, setDisplayName] = useState(adminProfileSettings.displayName);
  const [fullName, setFullName] = useState(adminProfileSettings.fullName);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<AdminLanguage["id"]>("english");
  const [sessions, setSessions] = useState<AdminSession[]>(adminSessions);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = adminSettingsSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

        if (visibleEntries[0]?.target.id) {
          setActiveNavItem(visibleEntries[0].target.id);
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

    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  function handleNavigate(item: AdminSettingsNavItem) {
    setActiveNavItem(item.id);
    const targetId = item.id === "connected-devices" ? "active-sessions" : item.id;
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function revokeSession(sessionId: string) {
    // TODO: Connect revoke session endpoint.
    setSessions((currentSessions) => currentSessions.filter((session) => session.id !== sessionId));
    showToast("Session revoked locally.");
  }

  function updateLanguage(languageId: AdminLanguage["id"]) {
    // TODO: Connect language preference endpoint.
    setSelectedLanguage(languageId);
    showToast("Language preference updated locally.");
  }

  return (
    <DashboardLayout
      navLinks={adminTopbarLinks}
      notificationCount={2}
      onSearchChange={setSearchValue}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder="Search platform settings..."
      searchValue={searchValue}
      sidebarItems={adminSidebarItems}
      userName="Mohammed Al-Hassan"
      userSubLabel="SUPER ADMIN"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-6 sm:px-5 lg:px-7">
        <div className="mx-auto w-full max-w-[1280px]">
          <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">Settings</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">Manage your platform preferences</p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-6 overflow-x-hidden px-4 py-6 sm:px-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-7">
        <AdminSettingsSidebar activeItemId={activeNavItem} items={adminSettingsNavItems} onNavigate={handleNavigate} />

        <div className="grid min-w-0 gap-5">
            <AdminAccountProfileCard
              bio={bio}
              displayName={displayName}
              fullName={fullName}
              initials={adminProfileSettings.initials}
              onBioChange={setBio}
              onDisplayNameChange={setDisplayName}
              onFullNameChange={setFullName}
              onSaveBio={() => {
                // TODO: Connect admin profile settings to Admin Profile API.
                showToast("Bio updated locally.");
              }}
              onSaveProfile={() => {
                // TODO: Connect admin profile settings to Admin Profile API.
                showToast("Profile changes saved locally.");
              }}
              profileId={adminProfileSettings.id}
            />

            <AdminPersonalInformationCard
              department={adminProfileSettings.department}
              jobTitle={adminProfileSettings.jobTitle}
              officeLocation={adminProfileSettings.officeLocation}
            />

            {/* TODO: Connect contact info verification to backend. */}
            <AdminContactInfoCard email={adminProfileSettings.email} phone={adminProfileSettings.phone} />

            {/* TODO: Connect active sessions endpoint. */}
            <AdminSecurityLoginCard
              isTwoFactorEnabled={isTwoFactorEnabled}
              onChangePassword={() => {
                // TODO: Connect password change flow.
                showToast("Change password flow will be connected later.");
              }}
              onRevokeSession={revokeSession}
              onToggleTwoFactor={() => {
                // TODO: Connect 2FA settings endpoint.
                setIsTwoFactorEnabled((currentValue) => !currentValue);
                showToast("Two-factor authentication setting updated locally.");
              }}
              sessions={sessions}
            />

            <AdminLanguageRegionCard languages={adminLanguages} onLanguageChange={updateLanguage} selectedLanguage={selectedLanguage} />

            <AdminNotificationPreferencesCard
              onOpenNotifications={() => {
                // TODO: Connect notification preferences endpoint.
                router.push("/admin/notifications");
              }}
            />

            <AdminDangerZoneCard
              isModalOpen={isDeleteModalOpen}
              onCancelDelete={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() => {
                // TODO: Connect account deletion endpoint.
                setIsDeleteModalOpen(false);
                showToast("Account deletion flow will be connected later.");
              }}
              onOpenDelete={() => setIsDeleteModalOpen(true)}
            />
        </div>
      </div>

      <SettingsToast message={toast} />
    </DashboardLayout>
  );
}
