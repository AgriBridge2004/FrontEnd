"use client";

import type { ReactNode } from "react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";

import { BuyerSettingsCard, BuyerTextArea, BuyerTextInput } from "@/components/dashboard/buyer/settings/BuyerSettingsControls";
import { ProfileImageUpload } from "@/components/dashboard/farmer/profile/edit/ProfileImageUpload";
import { getStoredUser, updateStoredUser } from "@/lib/auth-storage";
import {
  createBuyerProfile,
  getBuyerProfileByUserId,
  isNotFoundError,
  syncStoredUserFromBuyerProfile,
  updateBuyerProfile,
  type BuyerProfile,
  type BuyerProfilePayload,
} from "@/lib/buyer-api";
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
  profileImage?: File;
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

const businessTypes = ["Restaurant", "Factory", "Wholesaler", "Retailer", "Other"];
const allowedProfileImageTypes = ["image/jpeg", "image/png", "image/webp"];
const profileImageMaxSize = 2 * 1024 * 1024;

export function BuyerProfileCompletionForm({ onToast }: { onToast: (message: string) => void }) {
  const [form, setForm] = useState<BuyerProfileForm>(initialBuyerProfileForm);
  const [errors, setErrors] = useState<BuyerProfileErrors>({});
  const [profileImagePreview, setProfileImagePreview] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const [profileMode, setProfileMode] = useState<"create" | "update">("create");
  const profileImageObjectUrlRef = useRef<string | null>(null);
  const isSavingRef = useRef(false);
  const hasInitializedFormRef = useRef(false);

  const replaceProfileImagePreview = useCallback((url?: string, isObjectUrl = false) => {
    if (profileImageObjectUrlRef.current) {
      URL.revokeObjectURL(profileImageObjectUrlRef.current);
      profileImageObjectUrlRef.current = null;
    }

    if (url && isObjectUrl) {
      profileImageObjectUrlRef.current = url;
    }

    setProfileImagePreview(url);
  }, []);

  const prefillFromBuyerProfile = useCallback(
    (profile: BuyerProfile) => {
      setForm((current) => ({
        ...current,
        bio: profile.bio ?? current.bio,
        businessName: profile.companyName ?? current.businessName,
        businessType: profile.businessType ?? current.businessType,
        contactPerson: profile.fullName ?? current.contactPerson,
        location: profile.address ?? current.location,
        phone: profile.phone ?? current.phone,
      }));

      if (profile.profileImage) {
        replaceProfileImagePreview(profile.profileImage);
      }
    },
    [replaceProfileImagePreview],
  );

  useEffect(() => {
    if (hasInitializedFormRef.current) {
      return;
    }

    const storedUser = getStoredUser();
    const profile = getProfileRecord(storedUser?.profile);

    if (storedUser) {
      if (storedUser.profileCompleted === true || getStoredBuyerProfileId(storedUser)) {
        setProfileMode("update");
      }

      const storedProfileImage =
        readProfileString(profile, "profileImage") ||
        readProfileString(profile, "profileImageUrl") ||
        readProfileString(profile, "avatar") ||
        readProfileString(profile, "avatarUrl") ||
        readString(storedUser.avatarUrl) ||
        readString(storedUser.avatar);
      if (storedProfileImage) {
        replaceProfileImagePreview(storedProfileImage);
      }

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

      const userId = getUserId(storedUser);
      if (userId) {
        void getBuyerProfileByUserId(userId)
          .then((buyerProfile) => {
            setProfileMode("update");
            prefillFromBuyerProfile(buyerProfile);
          })
          .catch((error) => {
            if (isNotFoundError(error)) {
              setProfileMode("create");
              return;
            }

            onToast(error instanceof Error ? error.message : "Could not check buyer profile.");
          });
      }
    }
  }, [onToast, prefillFromBuyerProfile, replaceProfileImagePreview]);

  useEffect(() => {
    return () => {
      if (profileImageObjectUrlRef.current) {
        URL.revokeObjectURL(profileImageObjectUrlRef.current);
      }
    };
  }, []);

  function updateField(field: keyof BuyerProfileForm, value: BuyerProfileForm[keyof BuyerProfileForm]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleChange(field: keyof BuyerProfileForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateField(field, event.target.value);
    };
  }

  function handleProfileImageSelect(file: File) {
    if (!allowedProfileImageTypes.includes(file.type)) {
      setErrors((current) => ({ ...current, profileImage: "Please upload a JPG, PNG, or WEBP image." }));
      onToast("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > profileImageMaxSize) {
      setErrors((current) => ({ ...current, profileImage: "Image size must be less than 2MB." }));
      onToast("Image size must be less than 2MB.");
      return;
    }

    updateField("profileImage", file);
    replaceProfileImagePreview(URL.createObjectURL(file), true);
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
      const storedUser = getStoredUser();
      const payload = mapBuyerProfileFormToPayload(form);
      const response = profileMode === "update" ? await updateBuyerProfile(payload) : await createBuyerProfile(payload);
      syncStoredUserFromBuyerProfile(response, storedUser);
      updateStoredUser({
        email: form.email.trim(),
        buyingCategories: form.buyingCategories
          .split(",")
          .map((category) => category.trim())
          .filter(Boolean),
        website: form.website.trim(),
        contactPreference: form.contactPreference.trim(),
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
          <div className="lg:col-span-2">
            <ProfileImageUpload error={errors.profileImage} onFileSelect={handleProfileImageSelect} previewUrl={profileImagePreview} />
          </div>
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

function mapBuyerProfileFormToPayload(form: BuyerProfileForm): BuyerProfilePayload {
  return {
    address: form.location.trim() || undefined,
    bio: form.bio.trim() || undefined,
    businessType: form.businessType.trim() || undefined,
    companyName: form.businessName.trim() || undefined,
    fullName: form.contactPerson.trim(),
    phone: form.phone.trim(),
    profileImage: form.profileImage,
  };
}

function getUserId(user: ReturnType<typeof getStoredUser>) {
  const candidate = user?.id ?? user?._id ?? user?.userId;
  return typeof candidate === "string" && candidate.trim() ? candidate.trim() : undefined;
}

function getStoredBuyerProfileId(user: ReturnType<typeof getStoredUser>) {
  const profile = getProfileRecord(user?.profile);
  const candidate = profile.id ?? profile._id ?? user?.buyerId;
  return typeof candidate === "string" && candidate.trim() ? candidate.trim() : undefined;
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
