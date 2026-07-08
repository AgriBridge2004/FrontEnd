"use client";

import { useEffect, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerBusinessDetailsCard } from "@/components/dashboard/buyer/profile/BuyerBusinessDetailsCard";
import { BuyerContactInfoCard } from "@/components/dashboard/buyer/profile/BuyerContactInfoCard";
import type { BuyerProfile } from "@/components/dashboard/buyer/profile/buyer-profile.types";
import { BuyerProfileHero } from "@/components/dashboard/buyer/profile/BuyerProfileHero";
import { BuyerProfileStats } from "@/components/dashboard/buyer/profile/BuyerProfileStats";
import { BuyerRecentReviews } from "@/components/dashboard/buyer/profile/BuyerRecentReviews";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { getStoredUser } from "@/lib/auth-storage";
import { getBuyerProfileByUserId, isNotFoundError, type BuyerProfile as ApiBuyerProfile } from "@/lib/buyer-api";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

export function BuyerProfilePage() {
  const user = getStoredUser();
  const userId = getUserId(user);
  const [apiProfile, setApiProfile] = useState<ApiBuyerProfile | null>(null);
  const [toast, setToast] = useState("");
  const profile = getProfileFromStoredUser(user, apiProfile);

  useEffect(() => {
    if (!userId) return;
    const currentUserId = userId;

    let isMounted = true;

    async function loadProfile() {
      try {
        const profileRecord = await getBuyerProfileByUserId(currentUserId);
        if (isMounted) {
          setApiProfile(profileRecord);
        }
      } catch (error) {
        if (!isMounted || isNotFoundError(error)) {
          return;
        }
        setToast(error instanceof Error ? error.message : "Could not load buyer profile.");
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search profile, suppliers, or contracts..."
      sidebarItems={buyerSidebarItems}
      userName={profile.name}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <BuyerProfileHero profile={profile} />
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <BuyerContactInfoCard contact={profile.contact} />
          <BuyerBusinessDetailsCard business={profile.business} />
        </section>
        <BuyerProfileStats stats={profile.stats} />
        <BuyerRecentReviews reviews={[]} />
      </div>
      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

function getProfileFromStoredUser(user: ReturnType<typeof getStoredUser>, apiProfile: ApiBuyerProfile | null): BuyerProfile {
  const profile = user?.profile && typeof user.profile === "object" && !Array.isArray(user.profile) ? (user.profile as Record<string, unknown>) : {};
  const name = apiProfile?.fullName ?? getString(profile.fullName ?? profile.contactPerson ?? user?.fullName ?? user?.name) ?? "Buyer";
  const companyName = apiProfile?.companyName ?? getString(profile.businessName ?? profile.companyName ?? user?.businessName ?? user?.companyName) ?? "Company not provided";

  return {
    avatarUrl: apiProfile?.profileImage ?? getString(user?.avatarUrl),
    bio: apiProfile?.bio ?? getString(profile.bio ?? user?.bio) ?? "Business description not provided.",
    business: {
      businessType: apiProfile?.businessType ?? getString(profile.businessType ?? user?.businessType) ?? "Not provided",
      certifications: "Not provided",
      companySize: "Not provided",
      mainCategories: Array.isArray(user?.buyingCategories) ? user.buyingCategories.join(", ") : getString(profile.buyingCategories) ?? "Not provided",
      marketsServed: "Not provided",
    },
    companyName,
    contact: {
      address: apiProfile?.address ?? getString(profile.location ?? user?.location) ?? "Not provided",
      email: getString(profile.email ?? user?.email) ?? "Not provided",
      phone: apiProfile?.phone ?? getString(profile.phone ?? user?.phone) ?? "Not provided",
      website: getString(profile.website ?? user?.website) ?? "Not provided",
    },
    location: apiProfile?.address ?? getString(profile.location ?? user?.location) ?? "Not provided",
    memberSince: "Not provided",
    name,
    rating: 0,
    reviewsCount: 0,
    stats: {
      activeContracts: 0,
      completedPurchases: 0,
      onTimeDeliveryRate: 0,
    },
  };
}

function getUserId(user: ReturnType<typeof getStoredUser>) {
  const candidate = user?.id ?? user?._id ?? user?.userId;
  return typeof candidate === "string" && candidate.trim() ? candidate.trim() : undefined;
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
