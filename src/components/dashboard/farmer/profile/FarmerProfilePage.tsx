import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { InfoCards } from "@/components/dashboard/farmer/profile/InfoCards";
import { ProfileHeroCard } from "@/components/dashboard/farmer/profile/ProfileHeroCard";
import { ProfileStats } from "@/components/dashboard/farmer/profile/ProfileStats";
import { RecentReviews } from "@/components/dashboard/farmer/profile/RecentReviews";
import { farmerProfile, profileReviews } from "@/components/dashboard/farmer/profile/profile.mock";

export function FarmerProfilePage() {
  // TODO: Connect profile data to backend later.
  // TODO: Add edit profile functionality later.
  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <ProfileHeroCard profile={farmerProfile} />
        <InfoCards profile={farmerProfile} />
        <ProfileStats stats={farmerProfile.stats} />
        <RecentReviews reviews={profileReviews} />
      </div>
    </FarmerDashboardLayout>
  );
}
