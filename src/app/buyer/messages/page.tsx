import { PageHeader } from "@/components/shared/PageHeader";

const threads = [
  {
    contact: "Valley Harvest Cooperative",
    message: "We can deliver tomatoes in two batches this week.",
    time: "Today",
  },
  {
    contact: "AgriBridge Quality Team",
    message: "Inspection for the olive oil shipment has been submitted.",
    time: "Jun 16",
  },
];

export default function BuyerMessagesPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Messages"
        title="Supplier conversations"
        description="Messaging is mocked here and can later be replaced with conversations, attachments, and notifications."
      />
      <div className="grid gap-3">
        {threads.map((thread) => (
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={thread.contact}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-950">{thread.contact}</h2>
                <p className="mt-2 text-sm text-slate-600">{thread.message}</p>
              </div>
              <span className="text-xs font-medium text-slate-500">{thread.time}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
