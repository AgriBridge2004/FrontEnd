import Link from "next/link";
import { Calendar } from "lucide-react";

type UpcomingTasksCardProps = {
  tasks: Array<{
    title: string;
    field: string;
    date: string;
    time: string;
    badge: string;
  }>;
};

export function UpcomingTasksCard({ tasks }: UpcomingTasksCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:bg-emerald-50/20 hover:shadow-md">
      <h2 className="flex items-center gap-2 text-base font-black text-slate-900">
        <Calendar className="size-[18px] text-emerald-700" />
        Upcoming Tasks
      </h2>
      <div className="mt-4 rounded-xl border border-emerald-50 bg-emerald-50/20 p-3.5">
        {tasks.map((task) => (
          <div className="flex gap-2.5" key={task.title}>
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-emerald-700">
              <Calendar className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-black leading-5 text-slate-900">{task.title}</p>
                <span className="rounded bg-emerald-100 px-2 py-1 text-[9px] font-black text-emerald-700">{task.badge}</span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-slate-500">Wheat Crop - {task.field}</p>
              <p className="mt-1.5 text-[11px] font-medium text-slate-400">
                {task.date} · {task.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link className="mt-4 inline-flex text-[13px] font-black text-emerald-700 hover:text-emerald-900" href="/farmer/tasks">
        View all tasks
      </Link>
    </section>
  );
}
