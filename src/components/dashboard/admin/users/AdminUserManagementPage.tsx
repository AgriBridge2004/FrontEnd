"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminProfileInspectorDrawer } from "@/components/dashboard/admin/users/AdminProfileInspectorDrawer";
import { AdminUserFilters } from "@/components/dashboard/admin/users/AdminUserFilters";
import { AdminUserGovernanceActions } from "@/components/dashboard/admin/users/AdminUserGovernanceActions";
import { AdminUserHeader } from "@/components/dashboard/admin/users/AdminUserHeader";
import { AdminUsersTable } from "@/components/dashboard/admin/users/AdminUsersTable";
import { loadExtraAdminUsers, takeAdminUsersToast } from "@/components/dashboard/admin/users/admin-users.local-storage";
import { adminUsers } from "@/components/dashboard/admin/users/admin-users.mock";
import type {
  AdminUser,
  AdminUserRoleFilter,
  AdminUserStatusFilter,
} from "@/components/dashboard/admin/users/admin-users.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

export function AdminUserManagementPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<AdminUserRoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<AdminUserStatusFilter>("all");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [extraUsers, setExtraUsers] = useState<AdminUser[]>([]);
  const [inspectorUser, setInspectorUser] = useState<AdminUser | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setExtraUsers(loadExtraAdminUsers());
    const queuedToast = takeAdminUsersToast();
    if (queuedToast) {
      showToast(queuedToast);
    }

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const mergedUsers = mergeAdminUsers(extraUsers, adminUsers);

    return mergedUsers.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        `${user.name} ${user.email} ${user.idNumber ?? ""} ${user.contactNumber ?? ""}`.toLowerCase().includes(normalizedSearch);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [extraUsers, roleFilter, searchQuery, statusFilter]);

  function openInspector(user: AdminUser) {
    // TODO: Connect profile inspector detail API.
    setInspectorUser(user);
    setIsInspectorOpen(true);
  }

  const selectedGovernanceUserName = inspectorUser?.name ?? "the selected user";

  // TODO: Connect users list to Admin API.
  return (
    <DashboardLayout
      hideSearch
      navLinks={adminTopbarLinks}
      notificationCount={8}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder=""
      sidebarItems={adminSidebarItems}
      userName="Ahmed Mohamed"
      userSubLabel="Admin"
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-4 sm:px-5 lg:px-5">
        <AdminUserHeader
          onAddUser={() => {
            router.push("/admin/users/new");
          }}
          onRefreshLiveUpdates={() => {
            // TODO: Connect live updates to WebSocket/SSE.
            showToast("Live updates refreshed locally.");
          }}
        />

        <AdminUserFilters
          hasSelectedUsers={selectedUserIds.length > 0}
          onBulkVerification={() => {
            // TODO: Connect bulk verification endpoint.
            showToast("Bulk verification will be connected later.");
          }}
          onDisableSelected={() => {
            // TODO: Connect disable selected endpoint.
            showToast("Selected users disable flow will be connected later.");
          }}
          onExport={() => showToast("User export will be connected later.")}
          onFilters={() => {
            // TODO: Connect user filters to API query params.
            showToast("Advanced user filters will be connected later.");
          }}
          onRoleChange={setRoleFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          role={roleFilter}
          searchQuery={searchQuery}
          status={statusFilter}
        />

        <AdminUsersTable
          onInspectUser={openInspector}
          onSelectedUsersChange={setSelectedUserIds}
          selectedInspectorUserId={isInspectorOpen ? inspectorUser?.id : undefined}
          selectedUserIds={selectedUserIds}
          users={filteredUsers}
        />

        <AdminUserGovernanceActions
          onPurge={() => {
            // TODO: Connect suspend/delete/purge actions.
            showToast("Purge account flow will be connected later.");
          }}
          onSuspend={() => {
            // TODO: Connect suspend/delete/purge actions.
            showToast("Suspend account flow will be connected later.");
          }}
          selectedUserName={selectedGovernanceUserName}
        />
      </div>

      <AdminProfileInspectorDrawer
        onClose={() => setIsInspectorOpen(false)}
        onDelete={() => {
          // TODO: Connect suspend/delete/purge actions.
          showToast("Delete user flow will be connected later.");
        }}
        onFinalizeVerification={() => {
          // TODO: Connect finalize verification endpoint.
          showToast("Verification finalization will be connected later.");
        }}
        onSuspend={() => {
          // TODO: Connect suspend/delete/purge actions.
          showToast("Suspend user flow will be connected later.");
        }}
        onUpdate={() => showToast("Profile update flow will be connected later.")}
        open={isInspectorOpen}
        user={inspectorUser}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

function mergeAdminUsers(extraUsers: AdminUser[], baseUsers: AdminUser[]) {
  const seenKeys = new Set<string>();

  return [...extraUsers, ...baseUsers].filter((user) => {
    const key = `${user.id}:${user.email.toLowerCase()}`;
    const idKey = `id:${user.id}`;
    const emailKey = `email:${user.email.toLowerCase()}`;

    if (seenKeys.has(key) || seenKeys.has(idKey) || seenKeys.has(emailKey)) {
      return false;
    }

    seenKeys.add(key);
    seenKeys.add(idKey);
    seenKeys.add(emailKey);
    return true;
  });
}
