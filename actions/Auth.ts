'use server';

import { MutationState } from '@/lib/api';
import { signIn, signOut } from '@/lib/auth';
import { AuthError, CredentialsSignin } from 'next-auth';

export async function loginUser(_prevState: MutationState, formData: FormData) {
  const callbackUrl = formData.get('callbackUrl')?.toString() ?? '/';
  try {
    await signIn('credentials', {
      mobile: formData.get('mobile'),
      code: formData.get('code'),
      redirectTo: callbackUrl,
    });
    return {
      success: true,
      message: 'ورود با موفقیت انجام شد',
      value: null,
    };
  } catch (error) {
    if (error instanceof AuthError && error instanceof CredentialsSignin) {
      return {
        success: false,
        message: error.code,
        value: null,
      };
    }

    throw error;
  }
}

export async function logoutUser() {
  await signOut({
    redirectTo: '/login',
  });
}
