import type { ReactNode } from "react";

import {
  dashboardTableBodyClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";

type DashboardTableColumn<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type DashboardTableProps<T> = {
  columns: Array<DashboardTableColumn<T>>;
  getRowKey: (row: T) => string;
  rows: T[];
};

export function DashboardTable<T>({ columns, getRowKey, rows }: DashboardTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead className={dashboardTableHeadClass}>
          <tr>
            {columns.map((column) => (
              <th className={column.className ?? "px-5 py-3.5"} key={column.header}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={dashboardTableBodyClass}>
          {rows.map((row) => (
            <tr className={dashboardTableRowClass} key={getRowKey(row)}>
              {columns.map((column) => (
                <td className={column.className ?? "px-5 py-4"} key={column.header}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
