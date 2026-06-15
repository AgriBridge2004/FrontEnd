import { ListingCard } from "@/components/shared/ListingCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { api } from "@/lib/api";

export default async function BuyerBrowseListingsPage() {
  const listings = await api.listings.list();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Browse listings"
        title="Find supply for your business"
        description="Search controls are visual placeholders until marketplace filtering is wired to backend endpoints."
      />
      <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
        <Input aria-label="Search" placeholder="Search crop, farm, or region" />
        <Select aria-label="Grade" defaultValue="">
          <option value="">Any grade</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
        </Select>
        <Select aria-label="Status" defaultValue="active">
          <option value="active">Active only</option>
          <option value="">All statuses</option>
        </Select>
        <Select aria-label="Sort" defaultValue="available">
          <option value="available">Soonest available</option>
          <option value="price">Lowest price</option>
          <option value="quantity">Largest quantity</option>
        </Select>
      </section>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
