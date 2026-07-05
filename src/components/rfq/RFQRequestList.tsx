import type { RFQRequest } from "@/components/rfq/rfq.types";
import { RFQRequestCard } from "@/components/rfq/RFQRequestCard";
import { EmptyState } from "@/components/shared/EmptyState";

type RFQRequestListProps = {
  requests: RFQRequest[];
  onSubmitProposal: () => void;
};

export function RFQRequestList({ requests, onSubmitProposal }: RFQRequestListProps) {
  if (requests.length === 0) {
    return (
      <EmptyState
        description="Try adjusting the filters to see matching RFQ opportunities."
        title="No RFQs match these filters"
      />
    );
  }

  return (
    <div className="grid gap-3.5">
      {requests.map((request) => (
        <RFQRequestCard key={request.id} request={request} onSubmitProposal={onSubmitProposal} />
      ))}
    </div>
  );
}
