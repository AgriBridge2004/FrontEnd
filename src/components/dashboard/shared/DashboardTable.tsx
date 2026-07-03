import type { ReactNode } from "react";

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
        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((column) => (
              <th className={column.className ?? "px-5 py-3.5"} key={column.header}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
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
