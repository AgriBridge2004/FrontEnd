"use client";

import { KeyboardEvent, useState } from "react";
import { Plus, X } from "lucide-react";

type SpecialtiesInputProps = {
  error?: string;
  value: string[];
  onChange: (specialties: string[]) => void;
};

export function SpecialtiesInput({ error, onChange, value }: SpecialtiesInputProps) {
  const [inputValue, setInputValue] = useState("");

  function addSpecialty(rawValue: string) {
    const specialty = rawValue.trim();

    if (!specialty) {
      setInputValue("");
      return;
    }

    const alreadyExists = value.some((item) => item.toLowerCase() === specialty.toLowerCase());

    if (!alreadyExists) {
      onChange([...value, specialty]);
    }

    setInputValue("");
  }

  function removeSpecialty(specialty: string) {
    onChange(value.filter((item) => item !== specialty));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addSpecialty(inputValue);
      return;
    }

    if (event.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div>
      <label className="text-sm font-black text-slate-700" htmlFor="specialties-input">
        Specialties
      </label>
      <div className="mt-2 flex min-h-12 flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10">
        {value.map((specialty) => (
          <span
            className="inline-flex h-8 max-w-full items-center gap-1 rounded-md bg-emerald-50 px-2.5 text-xs font-black text-emerald-800 transition hover:bg-emerald-100"
            key={specialty}
          >
            <span className="truncate">{specialty}</span>
            <button
              aria-label={`Remove ${specialty}`}
              className="grid size-4 shrink-0 place-items-center rounded-full text-emerald-700 transition hover:bg-emerald-200 hover:text-emerald-950"
              onClick={() => removeSpecialty(specialty)}
              type="button"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          className="h-8 min-w-[220px] flex-1 border-0 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
          id="specialties-input"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a specialty and press Enter"
          type="text"
          value={inputValue}
        />
        <button
          className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg bg-emerald-800 px-3 text-xs font-black text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          disabled={!inputValue.trim()}
          onClick={() => addSpecialty(inputValue)}
          type="button"
        >
          <Plus className="size-3.5" />
          Add
        </button>
      </div>
      {error ? <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p> : null}
    </div>
  );
}
