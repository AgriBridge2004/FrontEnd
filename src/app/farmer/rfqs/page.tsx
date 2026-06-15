import { PageHeader } from "@/components/shared/PageHeader";
import { RFQCard } from "@/components/shared/RFQCard";
import { api } from "@/lib/api";

export default async function FarmerRFQsPage() {
  const rfqs = await api.rfqs.list();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="RFQs"
        title="Buyer requests for quote"
        description="Review buyer demand and prepare quote workflows for future API-backed submissions."
      />
      <div className="grid gap-4">
        {rfqs.map((rfq) => (
          <RFQCard key={rfq.id} rfq={rfq} />
        ))}
      </div>
    </div>
  );
}
