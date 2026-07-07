"use client";

import type { ReactNode } from "react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";

import { BuyerSettingsCard, BuyerTextArea, BuyerTextInput } from "@/components/dashboard/buyer/settings/BuyerSettingsControls";
import { getStoredUser, updateStoredUser } from "@/lib/auth-storage";
import { getDashboardPathByRole } from "@/lib/profile-completion";

type BuyerProfileForm = {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  businessType: string;
  buyingCategories: string;
  bio: string;
  website: string;
  contactPreference: string;
};

type BuyerProfileErrors = Partial<Record<keyof BuyerProfileForm, string>>;

const initialBuyerProfileForm: BuyerProfileForm = {
  businessName: "",
  contactPerson: "",
  email: "",
  phone: "",
  location: "",
  businessType: "",
  buyingCategories: "",
  bio: "",
  website: "",
  contactPreference: "",
};

const businessTypes = ["Restaurant", "Factory", "Wholesaler", "Exporter", "Local company", "Retailer"];

export function BuyerProfileCompletionForm({ onToast }: { onToast: (message: string) => void }) {
  const [form, setForm] = useState<BuyerProfileForm>(initialBuyerProfileForm);
  const [errors, setErrors] = useState<BuyerProfileErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const hasInitializedFormRef = useRef(false);

  useEffect(() => {
    if (hasInitializedFormRef.current) {
      return;
    }

    const storedUser = getStoredUser();
    const profile = getProfileRecord(storedUser?.profile);

    if (storedUser) {
      setForm((current) => ({
        ...current,
        businessName:
          readProfileString(profile, "businessName") ||
          readProfileString(profile, "companyName") ||
          readString(storedUser.businessName) ||
          readString(storedUser.companyName) ||
          current.businessName,
        contactPerson:
          readProfileString(profile, "contactPerson") ||
          readProfileString(profile, "fullName") ||
          readProfileString(profile, "name") ||
          readString(storedUser.fullName) ||
          readString(storedUser.name) ||
          current.contactPerson,
        email: readProfileString(profile, "email") || readString(storedUser.email) || current.email,
        phone: readProfileString(profile, "phone") || readString(storedUser.phone) || current.phone,
        location:
          readProfileString(profile, "location") ||
          readProfileString(profile, "city") ||
          readString(storedUser.location) ||
          readString(storedUser.region) ||
          current.location,
        businessType: readProfileString(profile, "businessType") || readString(storedUser.businessType) || current.businessType,
        bio: readProfileString(profile, "bio") || readString(storedUser.bio) || current.bio,
        website: readProfileString(profile, "website") || readString(storedUser.website) || current.website,
        contactPreference:
          readProfileString(profile, "contactPreference") || readString(storedUser.contactPreference) || current.contactPreference,
      }));
      hasInitializedFormRef.current = true;
    }
  }, []);

  function updateField(field: keyof BuyerProfileForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleChange(field: keyof BuyerProfileForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateField(field, event.target.value);
    };
  }

  function validateForm() {
    const nextErrors: BuyerProfileErrors = {};

    if (!form.businessName.trim()) {
      nextErrors.businessName = "Company or business name is required.";
    }
    if (!form.contactPerson.trim()) {
      nextErrors.contactPerson = "Contact person is required.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!form.location.trim()) {
      nextErrors.location = "Location is required.";
    }
    if (!form.businessType.trim()) {
      nextErrors.businessType = "Business type is required.";
    }
    if (!form.buyingCategories.trim()) {
      nextErrors.buyingCategories = "Add at least one buying category.";
    }
    if (!form.bio.trim()) {
      nextErrors.bio = "Bio is required.";
    }
    if (form.website.trim() && !/^https?:\/\/\S+\.\S+/.test(form.website.trim())) {
      nextErrors.website = "Website must start with http:// or https://.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      onToast("Please fix the highlighted fields.");
      return false;
    }

    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSavingRef.current || !validateForm()) {
      return;
    }

    isSavingRef.current = true;
    setIsSaving(true);

    try {
      // TODO: Connect buyer profile completion to backend endpoint and persist profileCompleted=true.
      updateStoredUser({
        name: form.contactPerson.trim(),
        fullName: form.contactPerson.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        location: form.location.trim(),
        businessName: form.businessName.trim(),
        companyName: form.businessName.trim(),
        businessType: form.businessType,
        buyingCategories: form.buyingCategories
          .split(",")
          .map((category) => category.trim())
          .filter(Boolean),
        bio: form.bio.trim(),
        website: form.website.trim(),
        contactPreference: form.contactPreference.trim(),
        profile: form,
        profileCompleted: true,
      });

      onToast("Profile completed successfully.");

      window.setTimeout(() => {
        window.location.assign(getDashboardPathByRole("buyer"));
      }, 800);
    } catch {
      onToast("Could not save profile. Please try again.");
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <BuyerSettingsCard id="buyer-onboarding-profile" title="Buyer Profile">
        <div className="grid gap-5 lg:grid-cols-2">
          <Field error={errors.businessName} label="Company / Business Name">
            <BuyerTextInput onChange={handleChange("businessName")} placeholder="Kumar Fresh Imports" value={form.businessName} />
          </Field>
          <Field error={errors.contactPerson} label="Contact Person">
            <BuyerTextInput onChange={handleChange("contactPerson")} placeholder="Ahmad Hassan" value={form.contactPerson} />
          </Field>
          <Field error={errors.email} helperText="This email was used during registration." label="Email">
            <BuyerTextInput
              className="bg-slate-50 text-slate-500"
              onChange={handleChange("email")}
              placeholder="ahmad@example.com"
              readOnly
              type="email"
              value={form.email}
            />
          </Field>
          <Field label="Role">
            <BuyerTextInput className="bg-slate-50 text-slate-500" readOnly value="Buyer" />
          </Field>
          <Field error={errors.phone} label="Phone Number">
            <BuyerTextInput onChange={handleChange("phone")} placeholder="+970 59 999 9999" type="tel" value={form.phone} />
          </Field>
          <Field error={errors.location} label="Location / City">
            <BuyerTextInput onChange={handleChange("location")} placeholder="Gaza" value={form.location} />
          </Field>
          <Field error={errors.businessType} label="Business Type">
            <select
              className="h-9 min-w-0 rounded-lg border border-emerald-100 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400"
              onChange={handleChange("businessType")}
              value={form.businessType}
            >
              <option value="">Select business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
          <Field error={errors.website} label="Website">
            <BuyerTextInput onChange={handleChange("website")} placeholder="https://example.com" value={form.website} />
          </Field>
          <Field className="lg:col-span-2" error={errors.buyingCategories} label="Buying Categories">
            <BuyerTextInput
              onChange={handleChange("buyingCategories")}
              placeholder="Tomatoes, olives, wheat"
              value={form.buyingCategories}
            />
          </Field>
          <Field className="lg:col-span-2" error={errors.contactPreference} label="Payment / Contact Preferences">
            <BuyerTextInput onChange={handleChange("contactPreference")} placeholder="Email and phone" value={form.contactPreference} />
          </Field>
          <Field className="lg:col-span-2" error={errors.bio} label="Bio / Business Description">
            <BuyerTextArea
              className="min-h-32"
              onChange={handleChange("bio")}
              placeholder="Tell suppliers about your company, buying needs, and preferred products..."
              value={form.bio}
            />
          </Field>
        </div>
      </BuyerSettingsCard>

      <div className="sticky bottom-0 -mx-5 border-t border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <button
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none sm:w-auto"
          disabled={isSaving}
          type="submit"
        >
          <Save className="size-4" />
          {isSaving ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </form>
  );
}

function Field({
  children,
  className,
  error,
  helperText,
  label,
}: {
  children: ReactNode;
  className?: string;
  error?: string;
  helperText?: string;
  label: string;
}) {
  return (
    <label className={className}>
      <span className="text-sm font-black text-slate-900">{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <span className="mt-1.5 block text-xs font-semibold text-rose-600">{error}</span> : null}
      {helperText ? <span className="mt-1.5 block text-xs font-semibold text-slate-500">{helperText}</span> : null}
    </label>
  );
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function getProfileRecord(profile: unknown) {
  return profile && typeof profile === "object" && !Array.isArray(profile) ? (profile as Record<string, unknown>) : {};
}

function readProfileString(profile: Record<string, unknown>, key: string) {
  return readString(profile[key]);
}
