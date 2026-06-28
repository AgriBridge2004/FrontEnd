"use client";

import { Eye, EyeOff } from "lucide-react";
import type { ReactNode } from "react";

type PasswordInputProps = {
  ariaLabel: string;
  containerClassName: string;
  inputClassName: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  showPassword: boolean;
  onToggle: () => void;
  leftIcon?: ReactNode;
  buttonClassName?: string;
  iconClassName?: string;
};

export function PasswordInput({
  ariaLabel,
  containerClassName,
  inputClassName,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggle,
  leftIcon,
  buttonClassName = "grid size-7 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30",
  iconClassName = "size-4",
}: PasswordInputProps) {
  return (
    <div className={containerClassName}>
      {leftIcon}
      <input
        aria-label={ariaLabel}
        className={inputClassName}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={value}
      />
      <button
        aria-label={showPassword ? `Hide ${ariaLabel}` : `Show ${ariaLabel}`}
        className={buttonClassName}
        onClick={onToggle}
        type="button"
      >
        {showPassword ? <EyeOff className={iconClassName} /> : <Eye className={iconClassName} />}
      </button>
    </div>
  );
}
