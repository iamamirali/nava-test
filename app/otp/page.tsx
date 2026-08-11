'use client';

import { OTPInput } from '@/components/ui/RHF/RhfOtpInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { usersLogin } from '../../actions/Users';
import { useSearchParams } from 'next/navigation';

const initialState: any = {
  success: false,
  message: '',
  value: null,
};

const schema = z.object({
  code: z.string('موبایل اجباریه'),
});

type FormType = z.infer<typeof schema>;

export default function Otp() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [state, formAction, pending] = useActionState(usersLogin, initialState);

  const methods = useForm<FormType>({ resolver: zodResolver(schema) });
  const { handleSubmit } = methods;

  const onSubmit = (values: FormType) => {
    const formData = new FormData();

    formData.append('mobile', String(mobile));
    formData.append('code', String(values.code));
    formData.append('callbackUrl', callbackUrl);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex gap-3 items-center">
        <OTPInput name="code" />
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white rounded-lg p-2 cursor-pointer disabled:opacity-60"
        >
          {pending ? 'در حال ارسال...' : 'ثبت'}
        </button>
        <p role="status" className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
          {state.message}
        </p>
      </form>
    </FormProvider>
  );
}
