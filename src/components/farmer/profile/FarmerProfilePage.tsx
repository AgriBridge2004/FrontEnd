import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { InfoCards } from "@/components/farmer/profile/InfoCards";
import { ProfileHeroCard } from "@/components/farmer/profile/ProfileHeroCard";
import { ProfileStats } from "@/components/farmer/profile/ProfileStats";
import { RecentReviews } from "@/components/farmer/profile/RecentReviews";
import { farmerProfile, profileReviews } from "@/components/farmer/profile/profile.mock";

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
