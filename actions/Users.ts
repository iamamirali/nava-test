'use server';

import { redirect } from 'next/navigation';
import { MutationState, postApi } from '../lib/api';
import { UsersLoginResponse } from './types';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth';

const ENTITY = 'Users';

export async function usersSendCode(_prevState: MutationState, formData: FormData) {
  const rawMobile = formData.get('mobile');
  const mobile = typeof rawMobile === 'string' ? rawMobile.trim() : '';
  const response = await postApi(
    `/${ENTITY}/SendCode`,
    { mobile },
    { message: 'کد با موفقیت ارسال شد' },
  );
  if (response.success) {
    redirect(`/otp?mobile=${mobile}`);
  }
  return response;
}

// export async function usersLogin(
//   _prevState: MutationState<UsersLoginResponse>,
//   formData: FormData,
// ) {
//   const rawMobile = formData.get('mobile');
//   const code = formData.get('code')?.toString() ?? '';
//   const mobile = typeof rawMobile === 'string' ? rawMobile.trim() : '';
//   return await postApi<{ mobile: string; code: string }, UsersLoginResponse>(
//     `/${ENTITY}/Login`,
//     { mobile, code },
//     { message: 'ورود با موفقیت انجام شد' },
//   );
// }

export async function usersLogin(_prevState: any, formData: FormData) {
  try {
    await signIn('credentials', {
      mobile: formData.get('mobile'),
      otp: formData.get('code'),
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'کد تایید اشتباه است.' };

        default:
          return 'خطایی رخ داد. لطفاً دوباره تلاش کنید.';
      }
    }

    throw error;
  }
}

export async function logout() {
  await signOut({
    redirectTo: '/login',
  });
}
