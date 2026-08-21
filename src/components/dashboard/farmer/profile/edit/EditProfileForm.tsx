"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { BusinessLicenseUpload } from "@/components/dashboard/farmer/profile/edit/BusinessLicenseUpload";
import { CertificationsUpload } from "@/components/dashboard/farmer/profile/edit/CertificationsUpload";
import { CoverImageUpload } from "@/components/dashboard/farmer/profile/edit/CoverImageUpload";
import { initialEditProfileForm, locationOptions } from "@/components/dashboard/farmer/profile/edit/edit-profile.mock";
import type { EditFarmerProfileForm, EditProfileErrors } from "@/components/dashboard/farmer/profile/edit/edit-profile.types";
import { ProfileImageUpload } from "@/components/dashboard/farmer/profile/edit/ProfileImageUpload";
import { SpecialtiesInput } from "@/components/dashboard/farmer/profile/edit/SpecialtiesInput";
import { saveFarmerProfile, updateFarmerProfile } from "@/lib/farmer-profile-api";
import { getStoredUser, updateStoredUser } from "@/lib/auth-storage";
import { getStringField } from "@/lib/farmer-display";
import { getDashboardPathByRole } from "@/lib/profile-completion";

const profilePhotoMaxSize = 2 * 1024 * 1024;
const documentMaxSize = 5 * 1024 * 1024;
const toastDurationMs = 3000;

type EditProfileFormProps = {
  cancelHref?: string;
  mode?: "settings" | "onboarding";
  submitLabel?: string;
};

export function EditProfileForm({ cancelHref = "/farmer/profile", mode = "settings", submitLabel = "Save Changes" }: EditProfileFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<EditFarmerProfileForm>(initialEditProfileForm);
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [toastMessage, setToastMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef(false);
  const profilePhotoPreviewRef = useRef("");
  const coverImagePreviewRef = useRef("");
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
        email: getProfileString(profile, "email") || getStringField(storedUser, "email") || current.email,
        farmName: getProfileString(profile, "farmName") || getStringField(storedUser, "farmName") || current.farmName,
        fullName:
          getProfileString(profile, "fullName") ||
          getProfileString(profile, "name") ||
          getStringField(storedUser, "fullName") ||
          getStringField(storedUser, "name") ||
          current.fullName,
        location:
          getProfileString(profile, "region") ||
          getProfileString(profile, "location") ||
          getStringField(storedUser, "region") ||
          getStringField(storedUser, "location") ||
          current.location,
        farmAddress:
          getProfileString(profile, "farmAddress") ||
          getProfileString(profile, "address") ||
          getStringField(storedUser, "farmAddress") ||
          current.farmAddress,
        phone: getProfileString(profile, "phone") || getStringField(storedUser, "phone") || current.phone,
        bio: getProfileString(profile, "bio") || getStringField(storedUser, "bio") || current.bio,
        serviceArea:
          getProfileString(profile, "serviceArea") ||
          getProfileString(profile, "deliveryArea") ||
          getStringField(storedUser, "serviceArea") ||
          current.serviceArea,
      }));
      hasInitializedFormRef.current = true;
    }

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      revokePreview(profilePhotoPreviewRef.current);
      revokePreview(coverImagePreviewRef.current);
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, toastDurationMs);
  }

  function updateField(field: keyof EditFarmerProfileForm, value: string | string[] | File | File[] | undefined) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleTextChange(field: keyof EditFarmerProfileForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateField(field, event.target.value);
    };
  }

  function handleProfilePhotoSelect(file: File) {
    if (!validateImageFile(file, profilePhotoMaxSize, "Profile photo must be an image under 2MB.")) {
      return;
    }

    revokePreview(profilePhotoPreviewRef.current);
    const previewUrl = URL.createObjectURL(file);
    profilePhotoPreviewRef.current = previewUrl;
    setProfilePhotoPreview(previewUrl);
    updateField("profilePhoto", file);
  }

  function handleCoverImageSelect(file: File) {
    if (!validateImageFile(file, documentMaxSize, "Cover image must be an image under 5MB.")) {
      return;
    }

    revokePreview(coverImagePreviewRef.current);
    const previewUrl = URL.createObjectURL(file);
    coverImagePreviewRef.current = previewUrl;
    setCoverImagePreview(previewUrl);
    updateField("coverImage", file);
  }

  function handleCertificationsSelect(files: File[]) {
    const validFiles = files.filter((file) => validateDocumentFile(file, "Each certificate must be a PDF or image under 5MB."));

    if (validFiles.length > 0) {
      updateField("certifications", [...form.certifications, ...validFiles]);
    }
  }

  function handleBusinessLicenseSelect(file: File) {
    if (validateDocumentFile(file, "Business license must be a PDF or image under 5MB.")) {
      updateField("businessLicense", file);
    }
  }

  function validateImageFile(file: File, maxSize: number, message: string) {
    const isValid = file.type.startsWith("image/") && file.size <= maxSize;

    if (!isValid) {
      showToast(message);
    }

    return isValid;
  }

  function validateDocumentFile(file: File, message: string) {
    const isValidType = file.type === "application/pdf" || file.type.startsWith("image/");
    const isValid = isValidType && file.size <= documentMaxSize;

    if (!isValid) {
      showToast(message);
    }

    return isValid;
  }

  function validateForm() {
    const nextErrors: EditProfileErrors = {};
    const emailPattern = /^\S+@\S+\.\S+$/;
    const farmSize = Number(form.farmSizeAcres);

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }
    if (!form.farmName.trim()) {
      nextErrors.farmName = "Farm name is required.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      nextErrors.phone = "Phone is required.";
    }
    if (!form.location) {
      nextErrors.location = "Location is required.";
    }
    if (!form.farmSizeAcres || Number.isNaN(farmSize) || farmSize <= 0) {
      nextErrors.farmSizeAcres = "Farm size must be greater than 0.";
    }
    if (form.specialties.length === 0) {
      nextErrors.specialties = "Please add at least one specialty.";
    }
    if (form.bio.length > 500) {
      nextErrors.bio = "Bio must be 500 characters or less.";
    }
    if (!form.bio.trim()) {
      nextErrors.bio = "Bio is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showToast("Please fix the highlighted fields.");
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
      await (mode === "onboarding" ? saveFarmerProfile(form, { context: "onboarding" }) : updateFarmerProfile(form));
      if (mode === "onboarding") {
        // TODO: Backend should persist profile fields and profileCompleted=true after profile submission.
        updateStoredUser({
          profileCompleted: true,
          profile: form,
        });
        showToast("Profile completed successfully.");

        window.setTimeout(() => {
          router.replace(getDashboardPathByRole("farmer"));
        }, 800);
        return;
      }

      showToast("Profile updated successfully.");

      window.setTimeout(() => {
        router.push("/farmer/profile");
      }, 800);
    } catch (error) {
      const message = error instanceof Error && error.message === "Validation error"
        ? "Profile validation failed. Please check the required fields."
        : error instanceof Error
          ? error.message
          : "Could not save profile. Please try again.";

      showToast(message);
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }

  return (
    <>
      <form
        className="mt-7 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md sm:p-6 lg:p-8"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-7 lg:grid-cols-2 lg:gap-8">
          <div className="grid gap-5">
            <ProfileImageUpload error={errors.profilePhoto} onFileSelect={handleProfilePhotoSelect} previewUrl={profilePhotoPreview} />
            <CoverImageUpload error={errors.coverImage} onFileSelect={handleCoverImageSelect} previewUrl={coverImagePreview} />
            <TextInput error={errors.fullName} label="Full Name" onChange={handleTextChange("fullName")} placeholder="Ahmad Hassan" value={form.fullName} />
            <TextInput error={errors.farmName} label="Farm Name" onChange={handleTextChange("farmName")} placeholder="Al-Masri Farm" value={form.farmName} />
            <TextInput
              error={errors.email}
              helperText={mode === "onboarding" ? "This email was used during registration." : undefined}
              label="Email"
              onChange={handleTextChange("email")}
              placeholder="ahmad@example.com"
              readOnly={mode === "onboarding"}
              type="email"
              value={form.email}
            />
            {mode === "onboarding" ? (
              <TextInput label="Role" onChange={() => undefined} readOnly value="Farmer" />
            ) : null}
            <TextInput error={errors.phone} label="Phone" onChange={handleTextChange("phone")} placeholder="+970 59 999 9999" type="tel" value={form.phone} />
            <SelectInput error={errors.location} label="Location" onChange={handleTextChange("location")} options={locationOptions} value={form.location} />
            <TextInput error={errors.farmAddress} label="Farm Address" onChange={handleTextChange("farmAddress")} placeholder="Al Karama Street, Gaza" value={form.farmAddress} />
          </div>

          <div className="grid gap-5">
            <TextAreaInput
              error={errors.bio}
              label="Bio"
              maxLength={500}
              onChange={handleTextChange("bio")}
              placeholder="Tell buyers about your farm, products, and experience..."
              value={form.bio}
            />
            <TextInput
              error={errors.farmSizeAcres}
              label="Farm Size (acres)"
              min="1"
              onChange={handleTextChange("farmSizeAcres")}
              placeholder="25"
              type="number"
              value={form.farmSizeAcres}
            />
            <TextInput error={errors.serviceArea} label="Delivery / Service Area" onChange={handleTextChange("serviceArea")} placeholder="Gaza" value={form.serviceArea} />
            <SpecialtiesInput error={errors.specialties} value={form.specialties} onChange={(specialties) => updateField("specialties", specialties)} />
            <CertificationsUpload files={form.certifications} onFilesSelect={handleCertificationsSelect} />
            <BusinessLicenseUpload file={form.businessLicense} onFileSelect={handleBusinessLicenseSelect} />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-center">
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-7 text-sm font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            href={cancelHref}
          >
            <X className="size-4" />
            Cancel
          </Link>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
            disabled={isSaving}
            type="submit"
          >
            <Save className="size-4" />
            {isSaving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
      <EditProfileToast message={toastMessage} />
    </>
  );
}

function revokePreview(previewUrl: string) {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
}

type TextInputProps = {
  error?: string;
  helperText?: string;
  label: string;
  min?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  value: string;
};

function TextInput({ error, helperText, label, min, onChange, placeholder, readOnly = false, type = "text", value }: TextInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input
        className={`mt-2 h-11 w-full rounded-lg border border-slate-200 px-3.5 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 ${
          readOnly ? "bg-slate-50 text-slate-500" : "bg-white"
        }`}
        min={min}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        value={value}
      />
      {error ? <span className="mt-1.5 block text-xs font-semibold text-rose-600">{error}</span> : null}
      {helperText ? <span className="mt-1.5 block text-xs font-semibold text-slate-500">{helperText}</span> : null}
    </label>
  );
}

type SelectInputProps = {
  error?: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  value: string;
};

function SelectInput({ error, label, onChange, options, value }: SelectInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <select
        className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
        onChange={onChange}
        value={value}
      >
        <option value="">Select a location</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1.5 block text-xs font-semibold text-rose-600">{error}</span> : null}
    </label>
  );
}

type TextAreaInputProps = {
  error?: string;
  label: string;
  maxLength: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
};

function TextAreaInput({ error, label, maxLength, onChange, placeholder, value }: TextAreaInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <textarea
        className="mt-2 min-h-36 w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <span className="mt-1 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-rose-600">{error}</span>
        <span className="ml-auto text-xs font-semibold text-slate-400">
          {value.length} / {maxLength}
        </span>
      </span>
    </label>
  );
}

function getProfileRecord(profile: unknown) {
  return profile && typeof profile === "object" && !Array.isArray(profile) ? (profile as Record<string, unknown>) : {};
}

function getProfileString(profile: Record<string, unknown>, key: string) {
  const value = profile[key];

  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function EditProfileToast({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-2xl">
      {message}
    </div>
  );
}
