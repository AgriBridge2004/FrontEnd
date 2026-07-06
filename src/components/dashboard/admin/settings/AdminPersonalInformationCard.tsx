import { SettingsSectionCard } from "@/components/dashboard/settings/SettingsControls";

type AdminPersonalInformationCardProps = {
  department: string;
  jobTitle: string;
  officeLocation: string;
};

export function AdminPersonalInformationCard({ department, jobTitle, officeLocation }: AdminPersonalInformationCardProps) {
  const fields = [
    { label: "Job Title", value: jobTitle },
    { label: "Department", value: department },
    { label: "Office Location", value: officeLocation },
  ];

  return (
    <SettingsSectionCard id="personal-information" title="Personal Information">
      <div className="grid gap-4 sm:grid-cols-3">
        {fields.map((field) => (
          <div className="rounded-xl border border-emerald-100 bg-white p-3" key={field.label}>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{field.label}</p>
            <p className="mt-2 text-sm font-black text-slate-900">{field.value}</p>
          </div>
        ))}
      </div>
    </SettingsSectionCard>
  );
}
