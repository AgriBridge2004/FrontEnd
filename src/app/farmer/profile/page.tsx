import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";

export default async function FarmerProfilePage() {
  const [farmers, profiles] = await Promise.all([
    api.users.listFarmers(),
    api.profiles.listFarmerProfiles(),
  ]);
  const user = farmers.find((farmer) => farmer.id === mockCurrentUserByRole.farmer);
  const profile = profiles.find((item) => item.userId === mockCurrentUserByRole.farmer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Profile"
        title="Farmer profile"
        description="Profile fields are ready to connect to account, verification, and farm documents APIs."
      />
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">{user?.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
          </div>
          {user ? <StatusBadge label={user.status} tone={user.status === "active" ? "emerald" : "amber"} /> : null}
        </div>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Farm name</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.farmName}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Location</dt>
            <dd className="mt-1 font-semibold text-slate-950">{user?.location}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Farm size</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.farmSizeHectares} hectares</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Primary crops</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.primaryCrops.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Certifications</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.certifications.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Years in business</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.yearsInBusiness}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
