import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";
import { titleCase } from "@/lib/format";

export default async function BuyerProfilePage() {
  const [buyers, profiles] = await Promise.all([api.users.listBuyers(), api.profiles.listBuyerProfiles()]);
  const user = buyers.find((buyer) => buyer.id === mockCurrentUserByRole.buyer);
  const profile = profiles.find((item) => item.userId === mockCurrentUserByRole.buyer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Profile"
        title="Buyer profile"
        description="Company verification, purchase preferences, and documents can connect here later."
      />
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">{profile?.companyName}</h2>
            <p className="mt-1 text-sm text-slate-500">{user?.name} · {user?.email}</p>
          </div>
          {user ? <StatusBadge label={user.status} tone={user.status === "active" ? "emerald" : "amber"} /> : null}
        </div>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Buyer type</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile ? titleCase(profile.buyerType) : ""}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Location</dt>
            <dd className="mt-1 font-semibold text-slate-950">{user?.location}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Monthly volume</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.monthlyPurchaseVolume}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Preferred crops</dt>
            <dd className="mt-1 font-semibold text-slate-950">{profile?.preferredCrops.join(", ")}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
