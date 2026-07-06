"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  FileText,
  Mail,
  MessageSquare,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";

import { notificationVariables, samplePreviewData } from "@/components/dashboard/admin/notifications/admin-notifications.mock";
import type {
  NotificationChannel,
  NotificationTemplate,
  NotificationTemplateDraft,
} from "@/components/dashboard/admin/notifications/admin-notifications.types";
import { cn } from "@/lib/cn";

type AdminEditTemplatePanelProps = {
  onCancel: () => void;
  onClose: () => void;
  onSave: (templateId: string, draft: NotificationTemplateDraft) => void;
  onShowToast: (message: string) => void;
  open: boolean;
  template: NotificationTemplate | null;
};

type PreviewDevice = "desktop" | "mobile";
type LanguageTab = "en" | "ar";

const channels: Array<{ id: NotificationChannel; label: string; icon: typeof Bell }> = [
  { icon: MessageSquare, id: "inApp", label: "In-App" },
  { icon: Mail, id: "email", label: "Email" },
  { icon: Smartphone, id: "sms", label: "SMS" },
];

function renderWithSampleData(value: string) {
  return value.replace(/\{\{([^}]+)\}\}/g, (match, key: string) => samplePreviewData[key.trim()] ?? match);
}

export function AdminEditTemplatePanel({ onCancel, onClose, onSave, onShowToast, open, template }: AdminEditTemplatePanelProps) {
  const [activeLanguage, setActiveLanguage] = useState<LanguageTab>("en");
  const [body, setBody] = useState("");
  const [channelsDraft, setChannelsDraft] = useState<Record<NotificationChannel, boolean>>({
    email: true,
    inApp: true,
    sms: false,
  });
  const [isRtl, setIsRtl] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (!template) {
      return;
    }

    setActiveLanguage("en");
    setBody(template.bodyEn);
    setChannelsDraft(template.channels);
    setIsRtl(false);
    setPreviewDevice("desktop");
    setSubject(template.subjectEn);
  }, [template]);

  const previewSubject = useMemo(() => renderWithSampleData(subject), [subject]);
  const previewBody = useMemo(() => renderWithSampleData(body), [body]);

  function appendVariable(variable: string, target: "subject" | "body") {
    if (target === "subject") {
      setSubject((current) => `${current}${current ? " " : ""}${variable}`.slice(0, 100));
      return;
    }

    setBody((current) => `${current}${current ? "\n" : ""}${variable}`.slice(0, 2000));
  }

  function toggleChannel(channel: NotificationChannel) {
    setChannelsDraft((current) => ({ ...current, [channel]: !current[channel] }));
  }

  if (!open || !template) {
    return null;
  }

  const isArabic = activeLanguage === "ar";

  return (
    <>
      <button aria-label="Close edit template overlay" className="fixed inset-0 z-40 bg-slate-900/10" onClick={onClose} type="button" />
      <aside className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl shadow-slate-900/15 sm:w-[560px] xl:w-[640px] 2xl:w-[720px]">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-purple-50 text-purple-600">
              <FileText className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-950">Edit Template</h2>
              <p className="text-xs font-semibold text-slate-400">{template.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="hidden h-8 items-center rounded-lg border border-slate-200 px-3 text-xs font-black text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
              onClick={onClose}
              type="button"
            >
              Back to Templates
            </button>
            <button
              aria-label="Close edit template panel"
              className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              onClick={onClose}
              type="button"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 px-6 py-5">
            <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-4">
              <button
                className={cn(
                  "border-b-2 pb-2 text-sm font-black",
                  activeLanguage === "en" ? "border-emerald-800 text-emerald-800" : "border-transparent text-slate-400",
                )}
                onClick={() => setActiveLanguage("en")}
                type="button"
              >
                English (EN)
              </button>
              <button
                className={cn(
                  "border-b-2 pb-2 text-sm font-black",
                  activeLanguage === "ar" ? "border-emerald-800 text-emerald-800" : "border-transparent text-slate-400",
                )}
                onClick={() => setActiveLanguage("ar")}
                type="button"
              >
                Arabic (AR)
              </button>
              <div className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400">
                <span>Preview Language</span>
                <select className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-700">
                  <option>English (EN)</option>
                </select>
                <span>RTL</span>
                <button
                  aria-pressed={isRtl}
                  className={cn("relative h-5 w-9 rounded-full transition", isRtl ? "bg-emerald-700" : "bg-slate-200")}
                  onClick={() => setIsRtl((current) => !current)}
                  type="button"
                >
                  <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition", isRtl ? "left-[18px]" : "left-0.5")} />
                </button>
              </div>
            </div>

            {isArabic ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-500">
                Arabic template content will be connected later.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
                <div className="space-y-5">
                  <label className="block">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-slate-700">Subject (English) *</span>
                      <button
                        className="inline-flex items-center gap-1 text-xs font-black text-emerald-800"
                        onClick={() => appendVariable("{{rfq_id}}", "subject")}
                        type="button"
                      >
                        Insert Variable
                        <ChevronDown className="size-3.5" />
                      </button>
                    </div>
                    <textarea
                      className="min-h-[76px] w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      maxLength={100}
                      onChange={(event) => setSubject(event.target.value)}
                      value={subject}
                    />
                    <span className="mt-1 block text-right text-xs font-semibold text-slate-400">{subject.length}/100</span>
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-slate-700">Body (English) *</span>
                      <button
                        className="inline-flex items-center gap-1 text-xs font-black text-emerald-800"
                        onClick={() => appendVariable("{{buyer_name}}", "body")}
                        type="button"
                      >
                        Insert Variable
                        <ChevronDown className="size-3.5" />
                      </button>
                    </div>
                    <textarea
                      className="min-h-[220px] w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold leading-6 text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      maxLength={2000}
                      onChange={(event) => setBody(event.target.value)}
                      value={body}
                    />
                    <span className="mt-1 block text-right text-xs font-semibold text-slate-400">{body.length}/2000</span>
                  </label>
                </div>

                <div>
                  {/* TODO: Connect variable library endpoint. */}
                  <h3 className="mb-3 text-sm font-black text-slate-700">Variables</h3>
                  <div className="grid gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    {notificationVariables.map((variable) => (
                      <button
                        className="rounded border border-slate-200 bg-white px-2.5 py-2 text-left font-mono text-[11px] font-bold text-slate-500 transition hover:border-emerald-200 hover:text-emerald-800"
                        key={variable}
                        onClick={() => appendVariable(variable, "body")}
                        type="button"
                      >
                        {variable}
                      </button>
                    ))}
                    <button
                      className="mt-2 text-center text-xs font-black text-emerald-800"
                      onClick={() => onShowToast("Full variable library will be connected later.")}
                      type="button"
                    >
                      View all variables -&gt;
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 border-t border-slate-100 pt-5 lg:grid-cols-[150px_minmax(0,1fr)]">
              <div>
                <h3 className="mb-4 text-[12px] font-black uppercase tracking-[0.08em] text-slate-900">Channels</h3>
                <div className="grid gap-3">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    const isEnabled = channelsDraft[channel.id];

                    return (
                      <button
                        className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition hover:bg-emerald-50/40"
                        key={channel.id}
                        onClick={() => toggleChannel(channel.id)}
                        type="button"
                      >
                        <span className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <Icon className="size-4 text-emerald-800" />
                          {channel.label}
                        </span>
                        <span className={cn("relative h-4 w-8 rounded-full transition", isEnabled ? "bg-emerald-700" : "bg-slate-200")}>
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
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black uppercase tracking-[0.04em] text-slate-900">Preview (English)</h3>
                  <div className="flex rounded-lg bg-slate-100 p-1">
                    <button
                      aria-label="Desktop preview"
                      className={cn("grid size-8 place-items-center rounded-md", previewDevice === "desktop" ? "bg-emerald-800 text-white" : "text-slate-400")}
                      onClick={() => setPreviewDevice("desktop")}
                      type="button"
                    >
                      <Monitor className="size-4" />
                    </button>
                    <button
                      aria-label="Mobile preview"
                      className={cn("grid size-8 place-items-center rounded-md", previewDevice === "mobile" ? "bg-emerald-800 text-white" : "text-slate-400")}
                      onClick={() => setPreviewDevice("mobile")}
                      type="button"
                    >
                      <Smartphone className="size-4" />
                    </button>
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm",
                    previewDevice === "mobile" ? "mx-auto max-w-[230px]" : "w-full",
                  )}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <h4 className="font-black text-slate-900">{previewSubject || "New notification preview"}</h4>
                  <div className="my-3 h-px bg-slate-100" />
                  <p className="whitespace-pre-line text-sm font-medium leading-6 text-slate-600">{previewBody}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-slate-100 bg-white px-6 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className="h-11 rounded-lg border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-slate-50"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="h-11 rounded-lg bg-emerald-800 text-sm font-black text-white shadow-sm shadow-emerald-900/20 transition hover:bg-emerald-900"
              onClick={() =>
                onSave(template.id, {
                  bodyEn: body,
                  channels: channelsDraft,
                  name: template.name,
                  subjectEn: subject,
                })
              }
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
