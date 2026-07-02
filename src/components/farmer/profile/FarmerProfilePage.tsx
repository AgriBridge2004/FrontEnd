"use client";

import { useEffect, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { InfoCards } from "@/components/farmer/profile/InfoCards";
import { ProfileHeroCard } from "@/components/farmer/profile/ProfileHeroCard";
import { ProfileStats } from "@/components/farmer/profile/ProfileStats";
import { RecentReviews } from "@/components/farmer/profile/RecentReviews";
import { farmerProfile, profileReviews, type FarmerProfile } from "@/components/farmer/profile/profile.mock";
import { getStoredUser } from "@/lib/auth-storage";
import {
  getFarmerAvatarUrl,
  getFarmerCoverImage,
  getFarmerDisplayName,
  getFarmerEmail,
  getFarmerFarmName,
  getFarmerLocation,
  getFarmerPhone,
  getStringField,
} from "@/lib/farmer-display";

export function FarmerProfilePage() {
  const [profile, setProfile] = useState<FarmerProfile>(() => buildProfileFromStoredUser());

  useEffect(() => {
    setProfile(buildProfileFromStoredUser());
  }, []);

  // TODO: Current farmer profile endpoint is missing from Swagger. Replace stored-user fallback when a documented GET endpoint exists.
  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <ProfileHeroCard profile={profile} />
        <InfoCards profile={profile} />
        <ProfileStats stats={profile.stats} />
        <RecentReviews reviews={profileReviews} />
      </div>
    </FarmerDashboardLayout>
  );
}

function buildProfileFromStoredUser(): FarmerProfile {
  const storedUser = getStoredUser();
  const region = getFarmerLocation(storedUser);

  return {
    ...farmerProfile,
    avatar: getFarmerAvatarUrl(storedUser),
    coverImage: getFarmerCoverImage(storedUser),
    farmName: getFarmerFarmName(storedUser),
    location: region,
    name: getFarmerDisplayName(storedUser),
    // TODO: Current farmer profile endpoint is missing from Swagger, so mock-only profile fields stay as placeholders.
    bio: getStringField(storedUser, "bio") || farmerProfile.bio,
    contact: {
      ...farmerProfile.contact,
      address: region,
      email: getFarmerEmail(storedUser),
      phone: getFarmerPhone(storedUser),
    },
  };
}
