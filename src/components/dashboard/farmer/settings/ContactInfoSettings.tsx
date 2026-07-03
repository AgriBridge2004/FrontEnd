import { Mail, Phone } from "lucide-react";

import { SettingsCard } from "@/components/dashboard/farmer/settings/SettingsControls";
import type { FarmerSettings } from "@/components/dashboard/farmer/settings/settings.mock";

export function ContactInfoSettings({ contact }: { contact: FarmerSettings["contact"] }) {
  return (
    <SettingsCard id="contact-info" title="Contact Info">
      <div className="space-y-3">
        <ContactRow icon={Mail} label="Email Address" value={contact.email} verified={contact.emailVerified} />
        <ContactRow icon={Phone} label="Phone Number" value={contact.phone} verified={contact.phoneVerified} />
      </div>
    </SettingsCard>
  );
}

function ContactRow({ icon: Icon, label, value, verified }: { icon: typeof Mail; label: string; value: string; verified: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3">
      <Icon className="size-5 shrink-0 text-slate-600" />
      <div className="min-w-0 flex-1">
        <p className="font-black text-slate-900">{label}</p>
        <p className="truncate text-sm font-medium text-slate-600">{value}</p>
      </div>
      {verified ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-800">VERIFIED</span> : null}
    </div>
  );
}
