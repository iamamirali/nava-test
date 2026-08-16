'use client';

import { OTPInput } from '@/components/ui/RHF/RhfOtpInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useSearchParams } from 'next/navigation';
import { MutationState } from '@/lib/api';
import { loginUser } from '@/actions/Auth';
import Image from 'next/image';
import Link from 'next/link';

const initialState: MutationState = {
  success: false,
  message: '',
  value: null,
};

const schema = z.object({
  code: z.string('کد تایید را وارد کنید').min(1, 'کد تایید را وارد کنید'),
});

type FormType = z.infer<typeof schema>;

export default function Otp() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [state, formAction, pending] = useActionState(loginUser, initialState);

  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: FormType) => {
    const formData = new FormData();
    formData.append('mobile', String(mobile));
    formData.append('code', values.code);
    formData.append('callbackUrl', callbackUrl);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className="min-h-screen bg-pink-50/40 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 overflow-hidden">
              <Image src="/favicon.ico" alt="nava" height={60} width={60} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">تایید شماره موبایل</h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">کد تایید ارسال‌شده به شماره</p>

            {mobile && (
              <p dir="ltr" className="mt-1 text-sm font-semibold text-gray-800">
                {mobile}
              </p>
            )}
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5">
              <div className="w-full">
                <OTPInput name="code" />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="
                  h-12 w-full rounded-full
                  bg-primary px-6
                  text-sm font-semibold text-white
                  shadow-sm
                  transition-all
                  hover:brightness-95
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {pending ? 'در حال ورود...' : 'تایید و ورود'}
              </button>

              {state.message && !pending && (
                <p
                  role="status"
                  className={`text-center text-sm leading-6 ${
                    state.success ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {state.message}
                </p>
              )}
            </form>
          </FormProvider>

          <Link href="/login">
            <button
              type="button"
              className="font-medium text-primary transition-opacity hover:opacity-80 cursor-pointer"
            >
              تغییر شماره موبایل
            </button>
          </Link>

          <p className="mt-6 text-center text-xs leading-5 text-gray-400">
            کد تایید را با کسی به اشتراک نگذارید.
          </p>
        </div>
      </div>
    </main>
  );
}
