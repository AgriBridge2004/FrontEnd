import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { EditProfileForm } from "@/components/dashboard/farmer/profile/edit/EditProfileForm";
import { ProfileCompletionCard } from "@/components/dashboard/farmer/profile/edit/ProfileCompletionCard";

export function EditProfilePage() {
  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[26px] font-black tracking-tight text-emerald-900">Edit Profile</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">Update your farm information.</p>
          </div>
          <ProfileCompletionCard />
        </div>

        <EditProfileForm />
      </div>
    </FarmerDashboardLayout>
  );
}
