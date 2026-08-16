'use client';

import { startTransition, useActionState } from 'react';
import z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RhfTextInput } from '@/components/ui/RHF/RhfTextInput';
import { MutationState } from '@/lib/api';
import { usersSendCode } from '../../actions/Users';
import { useSearchParams } from 'next/navigation';

const initialState: MutationState = {
  success: false,
  message: '',
  value: null,
};

const schema = z.object({
  mobile: z.string('موبایل اجباریه').min(1, 'موبایل اجباریه'),
});

type FormType = z.infer<typeof schema>;

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [state, formAction, pending] = useActionState(usersSendCode, initialState);

  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
  });
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex gap-3 items-center">
        <RhfTextInput<FormType> name="mobile" label="موبایل" />
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
