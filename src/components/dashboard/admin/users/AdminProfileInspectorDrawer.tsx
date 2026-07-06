"use client";

import { useEffect, useState } from "react";
import { Ban, Camera, Pencil, ShieldCheck, Trash2, UserSearch, X } from "lucide-react";

import { AdminUserAvatar } from "@/components/dashboard/admin/users/AdminUserAvatar";
import type { AdminUser } from "@/components/dashboard/admin/users/admin-users.types";
import { cn } from "@/lib/cn";

type AdminProfileInspectorDrawerProps = {
  onClose: () => void;
  onDelete: () => void;
  onFinalizeVerification: () => void;
  onSuspend: () => void;
  onUpdate: () => void;
  open: boolean;
  user: AdminUser | null;
};

const tabs = ["Overview", "Activities", "Inspections", "Vault"] as const;
type InspectorTab = (typeof tabs)[number];

export function AdminProfileInspectorDrawer({
  onClose,
  onDelete,
  onFinalizeVerification,
  onSuspend,
  onUpdate,
  open,
  user,
}: AdminProfileInspectorDrawerProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("Overview");
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      setActiveTab("Overview");
    }
  }, [userId]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open || !user) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close profile inspector overlay"
        className="fixed bottom-0 right-0 top-14 z-40 w-full bg-slate-900/10 lg:left-[232px] lg:w-auto"
        onClick={onClose}
        type="button"
      />
      <aside
        aria-labelledby="profile-inspector-title"
        aria-modal="true"
        className="fixed bottom-0 right-0 top-14 z-50 flex w-full flex-col overflow-hidden border-l border-emerald-100 bg-white shadow-2xl sm:w-[480px] sm:rounded-l-xl xl:w-[520px] 2xl:w-[560px]"
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-500" id="profile-inspector-title">
            <UserSearch className="size-4" />
            Profile Inspector
          </h2>
          <button aria-label="Close profile inspector" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-emerald-50/30 hover:text-emerald-800" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <section className="bg-gradient-to-br from-white via-emerald-50/40 to-purple-50 px-5 py-5 text-center">
            <div className="relative mx-auto w-fit">
              <AdminUserAvatar size="lg" user={user} />
              <span className="absolute bottom-0.5 right-0.5 grid size-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm">
                <Camera className="size-3.5" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <h3 className="text-xl font-black text-slate-950">{user.name}</h3>
              <RoleBadge role={user.role} />
            </div>
            <p className="mt-1.5 text-[13px] font-semibold text-slate-500">{user.profileSubtitle ?? "Ecosystem participant profile"}</p>
            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 text-left">
              <InfoTiny label="Status" value={statusLabel(user.status)} tone={user.status === "pending-verification" ? "orange" : "green"} />
              <InfoTiny label="Member Since" value={user.memberSince ?? user.registrationDate} />
              <InfoTiny label="ID Number" value={user.idNumber ?? "#USR-00000"} />
            </div>
          </section>

          <div className="grid grid-cols-4 bg-slate-50 px-5 py-1.5 text-center text-xs font-black text-slate-400">
            {tabs.map((tab) => (
              <button
                className={cn("rounded-lg px-3 py-2 transition", activeTab === tab ? "bg-white text-emerald-800 shadow-sm" : "hover:text-emerald-800")}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-5 py-4">
            {activeTab === "Overview" ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Profile Information</h3>
                  <button className="inline-flex h-8 items-center gap-2 rounded-full bg-slate-50 px-3 text-xs font-black text-slate-600 hover:bg-emerald-50/30" onClick={onUpdate} type="button">
                    <Pencil className="size-3.5" />
                    Update
                  </button>
                </div>
                <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <InfoField label="Full Legal Name" value={user.fullLegalName ?? user.name} />
                  <InfoField label="License Identity" value={user.licenseIdentity ?? "Not provided"} />
                  <InfoField label="Date of Birth" value={user.dateOfBirth ?? "Not provided"} />
                  <InfoField label="Primary Specialization" value={user.primarySpecialization ?? "Not provided"} />
                  <InfoField label="Nationality" value={user.nationality ?? "Not provided"} />
                  <InfoField label="Years Experience" value={user.yearsExperience ?? "Not provided"} />
                  <InfoField className="sm:col-span-2" label="Affiliated Organization" value={user.affiliatedOrganization ?? "Not provided"} />
                  <InfoField label="Contact Number" value={user.contactNumber ?? "Not provided"} />
                  <InfoField label="Verified Location" value={user.verifiedLocation ?? "Not provided"} />
                </div>

                <section className="mt-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Governance Actions</h3>
                  <button className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 text-[13px] font-black text-white shadow-lg shadow-emerald-800/20 hover:bg-emerald-900" onClick={onFinalizeVerification} type="button">
                    <ShieldCheck className="size-4" />
                    Finalize Verification
                  </button>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-orange-200 text-[12px] font-black text-orange-600 hover:bg-orange-50" onClick={onSuspend} type="button">
                      <Ban className="size-4" />
                      Suspend
                    </button>
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-red-200 text-[12px] font-black text-red-600 hover:bg-red-50" onClick={onDelete} type="button">
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </div>
                </section>
              </>
            ) : (
              <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-500">
                {activeTab} will be connected later.
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function RoleBadge({ role }: { role: AdminUser["role"] }) {
  return (
    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-black uppercase text-purple-700">
      {role === "quality-officer" ? "Quality Officer" : role}
    </span>
  );
}

function InfoTiny({ label, tone, value }: { label: string; tone?: "green" | "orange"; value: string }) {
  return (
    <div className="px-2.5">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className={cn("mt-1 text-sm font-semibold text-slate-800", tone === "green" && "text-emerald-700", tone === "orange" && "text-orange-600")}>{value}</p>
    </div>
  );
}

function InfoField({ className, label, value }: { className?: string; label: string; value: string }) {
  return (
    <div className={className}>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function statusLabel(status: AdminUser["status"]) {
  return status
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}
