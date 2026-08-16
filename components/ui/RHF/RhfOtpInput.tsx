'use client';

import { type ChangeEvent, type ClipboardEvent, type KeyboardEvent, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import clsx from 'clsx';

type OTPInputProps = {
  name: string;
  length?: number;
  disabled?: boolean;
};

export function OTPInput({ name, length = 6, disabled = false }: OTPInputProps) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const value = String(field.value ?? '');

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
    if (event.key === 'Backspace') {
      event.preventDefault();

      if (value[index]) {
        const chars = value.split('');
        chars[index] = '';

        field.onChange(chars.join(''));
        return;
      }

      if (index > 0) {
        const chars = value.split('');
        chars[index - 1] = '';

        field.onChange(chars.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
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
    <div className="w-full">
      <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={value[index] ?? ''}
            disabled={disabled}
            aria-label={`رقم ${index + 1} کد تایید`}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={clsx(
              'h-12 w-9 sm:h-15 sm:w-12',
              'rounded-2xl',
              'border bg-brown-0',
              'text-center text-xl font-semibold',
              'text-brown-900',
              'outline-none',
              'transition-all',

              'border-brown-40',
              'hover:border-brown-60',

              'focus:border-primary',
              'focus:ring-4',
              'focus:ring-primary/10',

              'disabled:cursor-not-allowed',
              'disabled:bg-brown-50',
              'disabled:opacity-60',

              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
            )}
          />
        ))}
      </div>

      {error?.message && <p className="mt-3 text-center text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
