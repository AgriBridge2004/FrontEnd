"use client";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerBusinessDetailsCard } from "@/components/dashboard/buyer/profile/BuyerBusinessDetailsCard";
import { BuyerContactInfoCard } from "@/components/dashboard/buyer/profile/BuyerContactInfoCard";
import { buyerProfile, buyerProfileReviews } from "@/components/dashboard/buyer/profile/buyer-profile.mock";
import { BuyerProfileHero } from "@/components/dashboard/buyer/profile/BuyerProfileHero";
import { BuyerProfileStats } from "@/components/dashboard/buyer/profile/BuyerProfileStats";
import { BuyerRecentReviews } from "@/components/dashboard/buyer/profile/BuyerRecentReviews";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

export function BuyerProfilePage() {
  // TODO: Connect buyer profile data to backend when profile endpoints are ready.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search profile, suppliers, or contracts..."
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <BuyerProfileHero profile={buyerProfile} />
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <BuyerContactInfoCard contact={buyerProfile.contact} />
          <BuyerBusinessDetailsCard business={buyerProfile.business} />
        </section>
        <BuyerProfileStats stats={buyerProfile.stats} />
        <BuyerRecentReviews reviews={buyerProfileReviews} />
      </div>
    </DashboardLayout>
  );
}
