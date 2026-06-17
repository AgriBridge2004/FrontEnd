import { getProtectedRouteLabel } from "@/lib/auth";
import type { UserRole } from "@/types";

type AppHeaderProps = {
  role: UserRole;
};

export function AppHeader({ role }: AppHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Protected route placeholder
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {getProtectedRouteLabel(role)} will use real authentication once the backend is ready.
          </p>
        </div>
        <div className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Mock session active
        </div>
      </div>
    </header>
  );
}
