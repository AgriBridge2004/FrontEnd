import { ListingCard } from "@/components/shared/ListingCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { api } from "@/lib/api";

export default async function MarketplacePage() {
  const listings = await api.listings.list();

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Marketplace"
          title="Browse agricultural supply"
          description="Mock listings are shown here while backend search, filtering, and saved buyer preferences are prepared."
          actions={<StatusBadge label={`${listings.length} listings`} tone="emerald" />}
        />
        <section className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
          <Input aria-label="Search listings" placeholder="Search crop or product" />
          <Select aria-label="Listing type" defaultValue="">
            <option value="">All types</option>
            <option value="fresh_produce">Fresh produce</option>
            <option value="processed_goods">Processed goods</option>
            <option value="grains">Grains</option>
          </Select>
          <Select aria-label="Quality grade" defaultValue="">
            <option value="">Any grade</option>
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
          </Select>
          <Select aria-label="Location" defaultValue="">
            <option value="">All locations</option>
            <option value="Jenin">Jenin</option>
            <option value="Nablus">Nablus</option>
            <option value="Jericho">Jericho</option>
          </Select>
        </section>
        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>
      </main>
    </div>
  );
}
