"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminEditTemplatePanel } from "@/components/dashboard/admin/notifications/AdminEditTemplatePanel";
import { AdminNotificationCenter } from "@/components/dashboard/admin/notifications/AdminNotificationCenter";
import { AdminNotificationTabs, type AdminNotificationTab } from "@/components/dashboard/admin/notifications/AdminNotificationTabs";
import { AdminNotificationTemplatesTable } from "@/components/dashboard/admin/notifications/AdminNotificationTemplatesTable";
import { AdminNotificationsHeader } from "@/components/dashboard/admin/notifications/AdminNotificationsHeader";
import {
  adminNotificationAlerts,
  adminNotificationTemplates,
} from "@/components/dashboard/admin/notifications/admin-notifications.mock";
import type {
  AdminNotificationAlert,
  NotificationChannel,
  NotificationTemplate,
  NotificationTemplateDraft,
} from "@/components/dashboard/admin/notifications/admin-notifications.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

export function AdminNotificationsManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminNotificationTab>("templates");
  const [alerts, setAlerts] = useState<AdminNotificationAlert[]>(adminNotificationAlerts);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [templates, setTemplates] = useState<NotificationTemplate[]>(adminNotificationTemplates);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePanel();
      }
    }

    if (isPanelOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPanelOpen]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const filteredTemplates = useMemo(() => {
    // TODO: Connect notification templates list to Admin Notifications API.
    // TODO: Connect channel preferences endpoint.
    const normalizedSearch = searchValue.trim().toLowerCase();
    if (!normalizedSearch) {
      return templates;
    }

    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(normalizedSearch) ||
        template.triggerEvent.toLowerCase().includes(normalizedSearch) ||
        template.status.toLowerCase().includes(normalizedSearch),
    );
  }, [searchValue, templates]);

  const filteredAlerts = useMemo(() => {
    // TODO: Connect admin alerts API.
    const normalizedSearch = searchValue.trim().toLowerCase();
    if (!normalizedSearch) {
      return alerts;
    }

    return alerts.filter(
      (alert) =>
        alert.title.toLowerCase().includes(normalizedSearch) ||
        alert.message.toLowerCase().includes(normalizedSearch) ||
        alert.time.toLowerCase().includes(normalizedSearch),
    );
  }, [alerts, searchValue]);

  const unreadCount = alerts.filter((alert) => alert.isUnread).length;

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

  function closePanel() {
    setIsPanelOpen(false);
  }

  function openTemplate(template: NotificationTemplate) {
    // TODO: Connect template detail API.
    setSelectedTemplate(template);
    setIsPanelOpen(true);
  }

  function openNewTemplate() {
    // TODO: Connect new template creation endpoint.
    showToast("New notification template flow will be connected later.");
  }

  function toggleTemplateChannel(templateId: string, channel: NotificationChannel) {
    setTemplates((currentTemplates) =>
      currentTemplates.map((template) =>
        template.id === templateId ? { ...template, channels: { ...template.channels, [channel]: !template.channels[channel] } } : template,
      ),
    );
    setSelectedTemplate((currentTemplate) =>
      currentTemplate?.id === templateId
        ? { ...currentTemplate, channels: { ...currentTemplate.channels, [channel]: !currentTemplate.channels[channel] } }
        : currentTemplate,
    );
  }

  function saveTemplate(templateId: string, draft: NotificationTemplateDraft) {
    // TODO: Connect save template endpoint.
    // TODO: Connect preview rendering to backend if required.
    setTemplates((currentTemplates) =>
      currentTemplates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              bodyEn: draft.bodyEn,
              channels: draft.channels,
              subjectEn: draft.subjectEn,
            }
          : template,
      ),
    );
    setSelectedTemplate((currentTemplate) =>
      currentTemplate?.id === templateId
        ? {
            ...currentTemplate,
            bodyEn: draft.bodyEn,
            channels: draft.channels,
            subjectEn: draft.subjectEn,
          }
        : currentTemplate,
    );
    showToast("Notification template saved successfully.");
  }

  function markAllRead() {
    // TODO: Connect mark all as read endpoint.
    setAlerts((currentAlerts) => currentAlerts.map((alert) => ({ ...alert, badge: undefined, isUnread: false })));
    showToast("All notifications marked as read.");
  }

  function handleAlertAction(alert: AdminNotificationAlert) {
    if (alert.actionHref) {
      router.push(alert.actionHref);
      return;
    }

    showToast(`${alert.actionLabel} will be connected later.`);
  }

  return (
    <DashboardLayout
      navLinks={adminTopbarLinks}
      notificationCount={12}
      onSearchChange={setSearchValue}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder="Search users, deals, listings..."
      searchValue={searchValue}
      sidebarItems={adminSidebarItems}
      userName="Ramesh Kumar"
      userSubLabel="Admin"
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-6 sm:px-5 lg:px-6">
        <AdminNotificationsHeader onNewTemplate={openNewTemplate} />
        <AdminNotificationTabs activeTab={activeTab} onTabChange={setActiveTab} unreadCount={unreadCount} />

        <div className="mt-6 grid gap-6">
          {activeTab === "templates" ? (
            <>
              <AdminNotificationTemplatesTable
                onOpenTemplate={openTemplate}
                onToggleChannel={toggleTemplateChannel}
                openTemplateId={isPanelOpen ? selectedTemplate?.id : undefined}
                templates={filteredTemplates}
              />
              <AdminNotificationCenter
                alerts={filteredAlerts}
                onAction={handleAlertAction}
                onMarkAllRead={markAllRead}
                onViewAll={() => showToast("All notifications page will be connected later.")}
              />
            </>
          ) : (
            <AdminNotificationCenter
              alerts={filteredAlerts}
              onAction={handleAlertAction}
              onMarkAllRead={markAllRead}
              onViewAll={() => showToast("All notifications page will be connected later.")}
            />
          )}
        </div>
      </div>

      <AdminEditTemplatePanel
        onCancel={closePanel}
        onClose={closePanel}
        onSave={saveTemplate}
        onShowToast={showToast}
        open={isPanelOpen}
        template={selectedTemplate}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
