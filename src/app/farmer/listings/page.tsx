import Link from "next/link";
import { ListingCard } from "@/components/shared/ListingCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";

export default async function FarmerListingsPage() {
  const listings = await api.listings.listByFarmer(mockCurrentUserByRole.farmer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Listings"
        title="My listings"
        description="Manage active, reserved, and sold products. Editing and publishing actions are placeholders."
        actions={<Link className={buttonClasses("primary")} href="/farmer/listings/create">Create listing</Link>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
