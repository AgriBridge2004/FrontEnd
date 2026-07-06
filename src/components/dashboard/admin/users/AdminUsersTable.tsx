"use client";

import type { ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, Minus } from "lucide-react";

import { AdminUserAvatar } from "@/components/dashboard/admin/users/AdminUserAvatar";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/components/dashboard/admin/users/admin-users.types";
import { cn } from "@/lib/cn";

type AdminUsersTableProps = {
  onInspectUser: (user: AdminUser) => void;
  onSelectedUsersChange: (ids: string[]) => void;
  selectedInspectorUserId?: string;
  selectedUserIds: string[];
  users: AdminUser[];
};

export function AdminUsersTable({
  onInspectUser,
  onSelectedUsersChange,
  selectedInspectorUserId,
  selectedUserIds,
  users,
}: AdminUsersTableProps) {
  const visibleUserIds = users.map((user) => user.id);
  const selectedVisibleCount = visibleUserIds.filter((userId) => selectedUserIds.includes(userId)).length;
  const areAllVisibleUsersSelected = users.length > 0 && selectedVisibleCount === users.length;
  const areSomeVisibleUsersSelected = selectedVisibleCount > 0 && !areAllVisibleUsersSelected;

  function toggleUser(userId: string) {
    const nextIds = selectedUserIds.includes(userId)
      ? selectedUserIds.filter((id) => id !== userId)
      : [...selectedUserIds, userId];
    onSelectedUsersChange(nextIds);
  }

  function toggleVisibleUsers() {
    if (areAllVisibleUsersSelected) {
      onSelectedUsersChange(selectedUserIds.filter((userId) => !visibleUserIds.includes(userId)));
      return;
    }

    onSelectedUsersChange(Array.from(new Set([...selectedUserIds, ...visibleUserIds])));
  }

  return (
    <section className="mt-4 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[940px] text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
            <tr>
              <th className="w-14 px-4 py-3">
                <button
                  aria-label={areAllVisibleUsersSelected ? "Clear visible user selection" : "Select all visible users"}
                  className={cn(
                    "grid size-5 place-items-center rounded-full border transition hover:bg-emerald-50",
                    areAllVisibleUsersSelected || areSomeVisibleUsersSelected
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-300 bg-white text-slate-400",
                  )}
                  onClick={toggleVisibleUsers}
                  type="button"
                >
                  {areAllVisibleUsersSelected ? <Check className="size-3.5" /> : null}
                  {areSomeVisibleUsersSelected ? <Minus className="size-3.5" /> : null}
                </button>
              </th>
              <th className="px-4 py-3">Account Holder</th>
              <th className="px-4 py-3">Classification</th>
              <th className="px-4 py-3">Registration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Activity Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] font-semibold text-slate-700">
            {users.map((user) => {
              const isChecked = selectedUserIds.includes(user.id);
              const isInspectorSelected = selectedInspectorUserId === user.id;

              return (
                <tr
                  className={cn(
                    "transition-all duration-200 hover:bg-emerald-50/20",
                    isChecked && "bg-emerald-50/40",
                    isInspectorSelected && "bg-emerald-50/30 ring-1 ring-inset ring-emerald-200",
                  )}
                  key={user.id}
                >
                  <td className="px-4 py-3.5">
                    <button
                      aria-label={`Select ${user.name}`}
                      className={cn(
                        "grid size-5 place-items-center rounded-full border transition hover:bg-emerald-50",
                        isChecked ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white text-slate-400",
                      )}
                      onClick={() => toggleUser(user.id)}
                      type="button"
                    >
                      {isChecked ? <Check className="size-3.5" /> : null}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      className="group flex items-center gap-3 rounded-xl text-left outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-700/20"
                      onClick={() => onInspectUser(user)}
                      type="button"
                    >
                      <AdminUserAvatar user={user} />
                      <div>
                        <p className="font-black text-slate-950 group-hover:text-emerald-800 group-hover:underline">{user.name}</p>
                        <p className="mt-1 text-[12px] font-medium text-slate-400">{user.email}</p>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-600">{user.registrationDate}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-20 rounded-full bg-slate-100">
                        <span
                          className={cn(
                            "block h-full rounded-full",
                            user.status === "pending-verification" ? "bg-amber-400" : "bg-emerald-500",
                          )}
                          style={{ width: `${user.activityScore}%` }}
                        />
                      </span>
                      <span className="text-[12px] font-black text-slate-700">{user.activityLabel}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-[12px] font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span>Showing 1 to 10 of 1,248 users</span>
          <label className="flex items-center gap-2">
            Rows per page
            <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[12px] font-black text-slate-700">
              <option>10</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-1">
          <PageButton>
            <ChevronLeft className="size-4" />
          </PageButton>
          <PageButton isActive>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <span className="px-2 text-slate-400">...</span>
          <PageButton>125</PageButton>
          <PageButton>
            <ChevronRight className="size-4" />
          </PageButton>
        </div>
      </div>
    </section>
  );
}

function RoleBadge({ role }: { role: AdminUserRole }) {
  const labels = {
    admin: "Admin",
    buyer: "Buyer",
    farmer: "Farmer",
    "quality-officer": "Quality Officer",
  };
  const styles = {
    admin: "bg-slate-100 text-slate-700",
    buyer: "bg-blue-50 text-blue-700",
    farmer: "bg-emerald-50 text-emerald-700",
    "quality-officer": "bg-purple-50 text-purple-700",
  };

  return <span className={cn("rounded-lg px-3 py-1 text-[10px] font-black uppercase", styles[role])}>{labels[role]}</span>;
}

function StatusBadge({ status }: { status: AdminUserStatus }) {
  const labels = {
    active: "Active",
    disabled: "Disabled",
    "pending-verification": "Pending Verification",
    suspended: "Suspended",
  };
  const styles = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    disabled: "bg-slate-100 text-slate-600 ring-slate-200",
    "pending-verification": "bg-orange-50 text-orange-700 ring-orange-200",
    suspended: "bg-red-50 text-red-700 ring-red-200",
  };

  return <span className={cn("inline-flex rounded-full px-3 py-1 text-[11px] font-black ring-1", styles[status])}>{labels[status]}</span>;
}

function PageButton({ children, isActive = false }: { children: ReactNode; isActive?: boolean }) {
  return (
    <button
      className={cn(
        "grid size-8 place-items-center rounded-lg text-[12px] font-black transition",
        isActive ? "bg-emerald-800 text-white shadow-md" : "text-slate-500 hover:bg-emerald-50/30",
      )}
      type="button"
    >
      {children}
    </button>
  );
}
