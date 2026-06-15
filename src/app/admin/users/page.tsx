import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { formatDate, titleCase } from "@/lib/format";
import type { User } from "@/types";

export default async function AdminUsersPage() {
  const users = await api.users.list();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Users"
        title="Users management"
        description="Admin user verification, role changes, and suspension flows are placeholders."
      />
      <DataTable<User>
        columns={[
          { key: "name", header: "Name", render: (user) => <span className="font-semibold text-slate-950">{user.name}</span> },
          { key: "role", header: "Role", render: (user) => titleCase(user.role) },
          { key: "email", header: "Email", render: (user) => user.email },
          { key: "location", header: "Location", render: (user) => user.location },
          { key: "status", header: "Status", render: (user) => <StatusBadge label={user.status} tone={user.status === "active" ? "emerald" : "amber"} /> },
          { key: "joined", header: "Joined", render: (user) => formatDate(user.joinedAt) },
        ]}
        getRowKey={(user) => user.id}
        rows={users}
      />
    </div>
  );
}
