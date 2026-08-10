'use client';

import { type ChangeEvent, type ClipboardEvent, type KeyboardEvent, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type OTPInputProps = {
  name: string;
  length?: number;
  disabled?: boolean;
};

export function OTPInput({ name, length = 6, disabled = false }: OTPInputProps) {
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const value = field.value ?? '';

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const digit = event.target.value.replace(/\D/g, '').slice(-1);

    const chars = value.split('');
    chars[index] = digit;

    const nextValue = chars.join('').slice(0, length);

    field.onChange(nextValue);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);

    field.onChange(pasted);

    const nextIndex = Math.min(pasted.length, length - 1);

    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div>
      <div className="flex gap-2" dir="ltr">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] ?? ''}
            disabled={disabled}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="h-12 w-12 rounded-md border text-center text-xl"
          />
        ))}
      </div>

      {fieldState.error && <p className="mt-2 text-sm text-red-500">{fieldState.error.message}</p>}
    </div>
  );
}
