'use client';

import { startTransition, useActionState } from 'react';
import z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { RhfTextInput } from '@/components/ui/RHF/RhfTextInput';
import { MutationState } from '@/lib/api';
import { usersSendCode } from '../../actions/Users';
import Image from 'next/image';

const initialState: MutationState = { success: false, message: '', value: null };

const schema = z.object({ mobile: z.string('موبایل اجباریه').min(1, 'موبایل اجباریه') });

type FormType = z.infer<typeof schema>;

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [state, formAction, pending] = useActionState(usersSendCode, initialState);

  const methods = useForm<FormType>({ resolver: zodResolver(schema) });
  const { handleSubmit } = methods;

  const onSubmit = (values: FormType) => {
    const formData = new FormData();
    formData.append('mobile', values.mobile);
    formData.append('callbackUrl', callbackUrl);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className="grow bg-pink-50/40 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 overflow-hidden">
              <Image src="/favicon.ico" alt="nava" height={60} width={60} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900"> ورود به ناوا </h1>{' '}
            <p className="mt-2 text-sm leading-6 text-gray-500">
              برای ورود، شماره موبایل خود را وارد کنید
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <RhfTextInput<FormType>
                name="mobile"
                label="شماره موبایل"
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0912 345 6789"
              />
              <button
                type="submit"
                disabled={pending}
                className="h-12 w-full rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 "
              >
                {pending ? 'در حال ارسال...' : 'دریافت کد ورود'}
              </button>
              {state.message && (
                <p
                  role="status"
                  className={`text-center text-sm leading-6 ${state.success ? 'text-green-600' : 'text-red-600'}`}
                >
                  {state.message}
                </p>
              )}
            </form>
          </FormProvider>

          <p className="mt-8 text-center text-xs leading-5 text-gray-400">
            با ورود به ناوا، شرایط استفاده از خدمات را می‌پذیرید.
          </p>
        </div>
      </div>
    </main>
  );
}
