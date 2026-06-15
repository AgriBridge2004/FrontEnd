import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { RFQCard } from "@/components/shared/RFQCard";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";

export default async function BuyerRFQsPage() {
  const rfqs = await api.rfqs.listByBuyer(mockCurrentUserByRole.buyer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="RFQs"
        title="My requests for quote"
        description="Manage demand posts and compare farmer quotes once quote submission is connected."
        actions={<Link className={buttonClasses("primary")} href="/buyer/rfqs/create">Create RFQ</Link>}
      />
      <div className="grid gap-4">
        {rfqs.map((rfq) => (
          <RFQCard key={rfq.id} rfq={rfq} />
        ))}
      </div>
    </div>
  );
}
