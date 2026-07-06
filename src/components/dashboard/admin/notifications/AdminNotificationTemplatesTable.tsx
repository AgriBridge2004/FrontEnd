"use client";

import { Bell, ChevronRight, Mail, MessageSquare, Smartphone } from "lucide-react";

import type { NotificationChannel, NotificationTemplate } from "@/components/dashboard/admin/notifications/admin-notifications.types";
import { cn } from "@/lib/cn";

type AdminNotificationTemplatesTableProps = {
  onOpenTemplate: (template: NotificationTemplate) => void;
  onToggleChannel: (templateId: string, channel: NotificationChannel) => void;
  openTemplateId?: string;
  templates: NotificationTemplate[];
};

const channelMeta: Record<NotificationChannel, { label: string; icon: typeof Bell }> = {
  email: { icon: Mail, label: "Email" },
  inApp: { icon: MessageSquare, label: "In-App" },
  sms: { icon: Smartphone, label: "SMS" },
};

const channels: NotificationChannel[] = ["inApp", "email", "sms"];

export function AdminNotificationTemplatesTable({
  onOpenTemplate,
  onToggleChannel,
  openTemplateId,
  templates,
}: AdminNotificationTemplatesTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.06em] text-slate-400">
            <tr>
              <th className="w-12 px-4 py-4">#</th>
              <th className="px-4 py-4">Notification Name</th>
              <th className="px-4 py-4">Trigger Event</th>
              <th className="px-4 py-4">Channels</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {templates.map((template, index) => {
              const Icon = template.icon;
              const isSelected = openTemplateId === template.id;

              return (
                <tr
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:bg-emerald-50/30",
                    isSelected ? "bg-emerald-50/60 ring-1 ring-inset ring-emerald-200" : "bg-white",
                  )}
                  key={template.id}
                  onClick={() => onOpenTemplate(template)}
                >
                  <td className="px-4 py-4 font-semibold text-slate-400">{index + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
                        <Icon className="size-4" />
                      </span>
                      <button className="text-left font-black text-slate-900 hover:text-emerald-800" type="button">
                        {template.name}
                      </button>
                    </div>
                  </td>
                  <td className="max-w-[260px] px-4 py-4 font-medium text-slate-500">{template.triggerEvent}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-3">
                      {channels.map((channel) => {
                        const ChannelIcon = channelMeta[channel].icon;
                        const isEnabled = template.channels[channel];

                        return (
                          <button
                            aria-label={`${channelMeta[channel].label} channel ${isEnabled ? "enabled" : "disabled"}`}
                            className="inline-flex items-center gap-1.5 text-slate-500"
                            key={channel}
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleChannel(template.id, channel);
                            }}
                            type="button"
                          >
                            <ChannelIcon className="size-3.5" />
                            <span
                              className={cn(
                                "relative h-4 w-8 rounded-full transition",
                                isEnabled ? "bg-emerald-700" : "bg-slate-100",
                              )}
                            >
                              <span
                                className={cn(
                                  "absolute top-0.5 size-3 rounded-full bg-white shadow transition",
                                  isEnabled ? "left-[17px]" : "left-0.5",
                                )}
                              />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-black",
                          template.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500",
                        )}
                      >
                        {template.status === "active" ? "Active" : "Disabled"}
                      </span>
                      <ChevronRight className="size-4 text-slate-300" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1 to 6 of 24 templates</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((page) => (
            <button
              className={cn(
                "grid size-8 place-items-center rounded-md border text-xs font-black",
                page === 1 ? "border-emerald-800 bg-emerald-800 text-white" : "border-transparent text-slate-500 hover:border-slate-200",
              )}
              key={page}
              type="button"
            >
              {page}
            </button>
          ))}
          <button className="grid size-8 place-items-center rounded-md border border-transparent text-slate-500 hover:border-slate-200" type="button">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
