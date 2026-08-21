"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AccessSettingsCard } from "@/components/dashboard/admin/users/add-new/AccessSettingsCard";
import { AccountIdentityCard } from "@/components/dashboard/admin/users/add-new/AccountIdentityCard";
import { AdminAddNewUserFooter } from "@/components/dashboard/admin/users/add-new/AdminAddNewUserFooter";
import { AdminAddNewUserHeader } from "@/components/dashboard/admin/users/add-new/AdminAddNewUserHeader";
import type { AddNewUserFormState, AddNewUserValidationErrors } from "@/components/dashboard/admin/users/add-new/add-new-user.types";
import { RoleClassificationCard } from "@/components/dashboard/admin/users/add-new/RoleClassificationCard";
import { VerificationDocumentsCard } from "@/components/dashboard/admin/users/add-new/VerificationDocumentsCard";
import { saveExtraAdminUser, setAdminUsersToast } from "@/components/dashboard/admin/users/admin-users.local-storage";
import type { AdminUser, AdminUserRole } from "@/components/dashboard/admin/users/admin-users.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const initialFormState: AddNewUserFormState = {
  accountType: "Farmer / Producer",
  apiAccessKeys: false,
  documentName: "land_deed_2024.pdf",
  email: "j.arable@agribridge.pro",
  fullName: "",
  marketSegment: "Industrial Grains",
  phone: "",
  temporaryPassword: "AGRI-X92J-K311",
  twoFactorEnabled: true,
};

export function AdminAddNewUserPage() {
  const router = useRouter();
  const [form, setForm] = useState<AddNewUserFormState>(initialFormState);
  const [errors, setErrors] = useState<AddNewUserValidationErrors>({});
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function updateForm<Value extends keyof AddNewUserFormState>(key: Value, value: AddNewUserFormState[Value]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

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

  function validateForm() {
    const nextErrors: AddNewUserValidationErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full legal name is required.";
    if (!form.email.trim()) nextErrors.email = "Professional email is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.accountType) nextErrors.accountType = "Account type is required.";
    if (!form.marketSegment) nextErrors.marketSegment = "Market segment is required.";
    if (!form.documentName.trim()) nextErrors.documentName = "Verification document is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleCreateUser() {
    if (!validateForm()) {
      showToast("Please complete all required fields before creating the user.");
      return;
    }

    // TODO: Connect create user form to Admin API.
    saveExtraAdminUser(createAdminUserFromForm(form));
    setAdminUsersToast("User created successfully.");
    setForm(initialFormState);
    router.push("/admin/users");
  }

  async function handleCopyPassword() {
    try {
      await navigator.clipboard?.writeText(form.temporaryPassword);
      showToast("Temporary password copied.");
    } catch {
      showToast("Temporary password copied.");
    }
  }

  return (
    <DashboardLayout
      navLinks={adminTopbarLinks}
      notificationCount={8}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder="Global search..."
      sidebarItems={adminSidebarItems}
      userName="Ahmed Mohamed"
      userSubLabel="Admin"
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-6 sm:px-5 lg:px-6">
        <AdminAddNewUserHeader onCreate={handleCreateUser} onDiscard={() => router.push("/admin/users")} />

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,1fr)]">
          <div className="space-y-6">
            <AccountIdentityCard
              email={form.email}
              errors={errors}
              fullName={form.fullName}
              onEmailChange={(value) => updateForm("email", value)}
              onFullNameChange={(value) => updateForm("fullName", value)}
              onPhoneChange={(value) => updateForm("phone", value)}
              phone={form.phone}
            />
            <RoleClassificationCard
              accountType={form.accountType}
              errors={errors}
              marketSegment={form.marketSegment}
              onAccountTypeChange={(value) => {
                // TODO: Connect role permissions to backend role configuration.
                updateForm("accountType", value);
              }}
              onMarketSegmentChange={(value) => updateForm("marketSegment", value)}
            />
          </div>
          <div className="space-y-6">
            <VerificationDocumentsCard
              documentName={form.documentName}
              errors={errors}
              onDocumentChange={(value) => updateForm("documentName", value)}
              onRemoveDocument={() => updateForm("documentName", "")}
            />
            <AccessSettingsCard
              apiAccessKeys={form.apiAccessKeys}
              onApiAccessKeysChange={(value) => updateForm("apiAccessKeys", value)}
              onCopyPassword={handleCopyPassword}
              onTemporaryPasswordChange={(value) => {
                // TODO: Connect temporary password generation to backend.
                updateForm("temporaryPassword", value);
              }}
              onTwoFactorChange={(value) => updateForm("twoFactorEnabled", value)}
              temporaryPassword={form.temporaryPassword}
              twoFactorEnabled={form.twoFactorEnabled}
            />
          </div>
        </div>

        {/* TODO: Connect draft save to API/local autosave. */}
        <AdminAddNewUserFooter onCancel={() => router.push("/admin/users")} onCreate={handleCreateUser} />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

function createAdminUserFromForm(form: AddNewUserFormState): AdminUser {
  const role = mapAccountTypeToRole(form.accountType);
  const registrationDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return {
    activityLabel: role === "quality-officer" ? "0 Inspections" : "0 Deals",
    activityScore: 0,
    email: form.email.trim(),
    fullLegalName: form.fullName.trim(),
    id: createLocalUserId(),
    initials: createInitials(form.fullName),
    memberSince: registrationDate,
    name: form.fullName.trim(),
    profileSubtitle: `${form.accountType} account`,
    registrationDate,
    role,
    status: "pending-verification",
    contactNumber: form.phone.trim(),
  };
}

function mapAccountTypeToRole(accountType: AddNewUserFormState["accountType"]): AdminUserRole {
  const roleMap: Record<AddNewUserFormState["accountType"], AdminUserRole> = {
    Admin: "admin",
    Buyer: "buyer",
    "Farmer / Producer": "farmer",
    "Quality Officer": "quality-officer",
  };

  return roleMap[accountType];
}

function createInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return "NU";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function createLocalUserId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `admin-user-${crypto.randomUUID()}`;
  }

  return `admin-user-${Date.now()}`;
}
