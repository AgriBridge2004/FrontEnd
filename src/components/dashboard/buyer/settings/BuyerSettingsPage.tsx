"use client";

import { useEffect, useRef, useState } from "react";

import { BuyerApiNotice } from "@/components/dashboard/buyer/BuyerApiNotice";
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
import { getStoredUser } from "@/lib/auth-storage";
import {
  getBuyerProfileByUserId,
  isNotFoundError,
  mapBuyerProfileFromApi,
  syncStoredUserFromBuyerProfile,
  updateBuyerProfile,
} from "@/lib/buyer-api";

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
const allowedProfileImageTypes = ["image/jpeg", "image/png", "image/webp"];
const profileImageMaxSize = 2 * 1024 * 1024;

export function BuyerSettingsPage() {
  const user = getStoredUser();
  const [settings, setSettings] = useState<BuyerSettings>(() => getInitialSettings(user));
  const [selectedProfileImage, setSelectedProfileImage] = useState<File>();
  const [profileImagePreview, setProfileImagePreview] = useState<string>();
  const [activeSection, setActiveSection] = useState("account-profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileImageObjectUrlRef = useRef<string | null>(null);
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";
  const userId = getUserId(user);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      if (profileImageObjectUrlRef.current) {
        URL.revokeObjectURL(profileImageObjectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const currentUserId = userId;

    let isMounted = true;

    async function loadBuyerProfile() {
      try {
        const profile = await getBuyerProfileByUserId(currentUserId);
        if (!isMounted) return;
        setSettings((current) => ({
          ...current,
          contact: {
            ...current.contact,
            phone: profile.phone ?? current.contact.phone,
          },
          profile: {
            ...current.profile,
            bio: profile.bio ?? current.profile.bio,
            businessName: profile.companyName ?? current.profile.businessName,
            fullName: profile.fullName ?? current.profile.fullName,
            id: profile.id ?? current.profile.id,
            profileImage: profile.profileImage ?? current.profile.profileImage,
          },
        }));
      } catch (error) {
        if (!isMounted || isNotFoundError(error)) {
          return;
        }
        showToast(error instanceof Error ? error.message : "Could not load buyer profile.");
      }
    }

    void loadBuyerProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

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

  function replaceProfileImagePreview(url?: string) {
    if (profileImageObjectUrlRef.current) {
      URL.revokeObjectURL(profileImageObjectUrlRef.current);
      profileImageObjectUrlRef.current = null;
    }

    if (url) {
      profileImageObjectUrlRef.current = url;
    }

    setProfileImagePreview(url);
  }

  function handleProfileImageSelect(file: File) {
    if (!allowedProfileImageTypes.includes(file.type)) {
      showToast("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > profileImageMaxSize) {
      showToast("Image size must be less than 2MB.");
      return;
    }

    setSelectedProfileImage(file);
    replaceProfileImagePreview(URL.createObjectURL(file));
  }

  async function handleProfileSave(profile: BuyerSettings["profile"]) {
    try {
      const response = await updateBuyerProfile({
        bio: profile.bio,
        companyName: profile.businessName,
        fullName: profile.fullName,
        phone: settings.contact.phone,
        profileImage: selectedProfileImage,
      });
      const updatedProfile = mapBuyerProfileFromApi(response);
      syncStoredUserFromBuyerProfile(response, user);
      setSelectedProfileImage(undefined);
      replaceProfileImagePreview(undefined);
      setSettings((current) => ({
        ...current,
        profile: {
          ...current.profile,
          profileImage: updatedProfile.profileImage ?? current.profile.profileImage,
        },
      }));
      showToast("Profile updated successfully.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Could not update profile.");
    }
  }

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      onSearchChange={setSearchQuery}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search for settings, profiles, or documentation..."
      searchValue={searchQuery}
      sidebarItems={buyerSidebarItems}
      userName={userName}
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
          <BuyerApiNotice description="Security, payment method, language, and device settings endpoints are not available in Swagger yet." />
          <BuyerAccountProfileSection
            onProfileChange={(profile) => setSettings((current) => ({ ...current, profile }))}
            onProfileImageSelect={handleProfileImageSelect}
            onProfileSave={handleProfileSave}
            onToast={showToast}
            profile={settings.profile}
            profileImagePreview={profileImagePreview}
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

function getUserId(user: ReturnType<typeof getStoredUser>) {
  const candidate = user?.id ?? user?._id ?? user?.userId;
  return typeof candidate === "string" && candidate.trim() ? candidate.trim() : undefined;
}

function getInitialSettings(user: ReturnType<typeof getStoredUser>): BuyerSettings {
  const profile = user?.profile && typeof user.profile === "object" && !Array.isArray(user.profile) ? (user.profile as Record<string, unknown>) : {};

  return {
    ...buyerSettings,
    contact: {
      ...buyerSettings.contact,
      email: getString(profile.email ?? user?.email) ?? buyerSettings.contact.email,
      phone: getString(profile.phone ?? user?.phone) ?? buyerSettings.contact.phone,
    },
    profile: {
      ...buyerSettings.profile,
      bio: getString(profile.bio ?? user?.bio) ?? buyerSettings.profile.bio,
      businessName: getString(profile.companyName ?? profile.businessName ?? user?.companyName ?? user?.businessName) ?? buyerSettings.profile.businessName,
      fullName: getString(profile.fullName ?? profile.name ?? user?.fullName ?? user?.name) ?? buyerSettings.profile.fullName,
      id: getString(profile.id ?? profile._id ?? user?.buyerId ?? user?.id) ?? buyerSettings.profile.id,
      profileImage: getString(profile.profileImage ?? profile.profileImageUrl ?? profile.avatar ?? profile.avatarUrl ?? user?.avatarUrl ?? user?.avatar),
    },
  };
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
