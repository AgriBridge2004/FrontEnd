import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { QualityGradeBadge } from "@/components/shared/QualityGradeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";

type InspectionDetailsPageProps = {
  params: {
    inspectionId: string;
  };
};

export async function generateStaticParams() {
  const inspections = await api.inspections.list();
  return inspections.map((inspection) => ({ inspectionId: inspection.id }));
}

export default async function InspectionDetailsPage({ params }: InspectionDetailsPageProps) {
  const inspection = await api.inspections.getById(params.inspectionId);

  if (!inspection) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Inspection details"
        title={`${inspection.crop} inspection`}
        description="A detailed quality workflow placeholder for officer review and evidence collection."
        actions={<Link className={buttonClasses("primary")} href={`/officer/inspections/${inspection.id}/report`}>Submit report</Link>}
      />
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Assignment</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Deal</dt>
              <dd className="font-semibold text-slate-950">{inspection.dealId}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Listing</dt>
              <dd className="font-semibold text-slate-950">{inspection.listingId}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Location</dt>
              <dd className="font-semibold text-slate-950">{inspection.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Scheduled</dt>
              <dd className="font-semibold text-slate-950">{formatDate(inspection.scheduledDate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Status</dt>
              <dd><StatusBadge label={inspection.status} tone={inspection.status === "rejected" ? "rose" : "sky"} /></dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-950">Report summary</h2>
            <QualityGradeBadge grade={inspection.report?.grade} />
          </div>
          {inspection.report ? (
            <div className="mt-5 grid gap-4 text-sm text-slate-700">
              <p>{inspection.report.summary}</p>
              <p>Packaging: {inspection.report.packagingNotes}</p>
              <p>Submitted: {formatDate(inspection.report.submittedAt)}</p>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-slate-600">
              No report submitted yet. The final workflow will capture grade, photos, measurements,
              and officer notes.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
