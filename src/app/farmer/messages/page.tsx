import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";

const threads = [
  {
    company: "Urban Plate Restaurants",
    message: "Can you split the tomato delivery into two morning windows?",
    time: "Today",
  },
  {
    company: "Golden Foods Factory",
    message: "Please confirm packaging dimensions for the next olive oil batch.",
    time: "Yesterday",
  },
];

export default function FarmerMessagesPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Messages"
        title="In-platform messaging"
        description="Conversation lists and message threads are static placeholders until realtime messaging is connected."
      />
      {threads.length > 0 ? (
        <div className="grid gap-3">
          {threads.map((thread) => (
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={thread.company}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-950">{thread.company}</h2>
                  <p className="mt-2 text-sm text-slate-600">{thread.message}</p>
                </div>
                <span className="text-xs font-medium text-slate-500">{thread.time}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState description="New deal and RFQ conversations will appear here." title="No messages yet" />
      )}
    </div>
  );
}
