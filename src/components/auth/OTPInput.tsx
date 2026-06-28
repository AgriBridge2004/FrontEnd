"use client";

import type { ChangeEvent, ClipboardEvent, KeyboardEvent, MutableRefObject } from "react";

type OTPInputProps = {
  digits: string[];
  inputRefs: MutableRefObject<Array<HTMLInputElement | null>>;
  onChangeDigit: (index: number, value: string) => void;
  onPasteDigits: (index: number, event: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDownDigit: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
};

export function OTPInput({
  digits,
  inputRefs,
  onChangeDigit,
  onPasteDigits,
  onKeyDownDigit,
}: OTPInputProps) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
      {digits.map((digit, index) => (
        <input
          aria-label={`Verification digit ${index + 1}`}
          className="h-12 min-w-0 rounded-xl border border-slate-500 bg-white text-center text-base font-black text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 sm:h-14"
          inputMode="numeric"
          key={index}
          maxLength={1}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeDigit(index, event.target.value)}
          onKeyDown={(event) => onKeyDownDigit(index, event)}
          onPaste={(event) => onPasteDigits(index, event)}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          value={digit}
        />
      ))}
    </div>
  );
}
