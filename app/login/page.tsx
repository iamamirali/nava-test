'use client';

import { useActionState } from 'react';
import { sendCode, SendCodeState } from '../actions/Users';

const initialState: SendCodeState = {
  success: false,
  message: '',
};

export default function Login() {
  const [state, formAction, pending] = useActionState(sendCode, initialState);

  return (
    <form action={formAction} className="p-6 flex gap-3 items-center">
      <label htmlFor="mobile">موبایل:</label>
      <input
        id="mobile"
        name="mobile"
        className="border-2 rounded-lg p-2 border-primary min-w-64"
        dir="ltr"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="09120000000"
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-white rounded-lg p-2 cursor-pointer disabled:opacity-60"
      >
        {pending ? 'در حال ارسال...' : 'ثبت'}
      </button>

      <p role="status" className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
        {state.errors?.mobile}
      </p>
    </form>
  );
}
