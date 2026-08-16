'use server';

import { redirect } from 'next/navigation';
import { MutationState, postApi } from '../lib/api';
import { UsersLoginDTO, UsersLoginResponse } from './types';

const ENTITY = 'Users';

export async function usersSendCode(_prevState: MutationState, formData: FormData) {
  const callbackUrl = formData.get('callbackUrl')?.toString() ?? '/';
  const rawMobile = formData.get('mobile');
  const mobile = typeof rawMobile === 'string' ? rawMobile.trim() : '';
  const response = await postApi(
    `/${ENTITY}/SendCode`,
    { mobile },
    { message: 'کد با موفقیت ارسال شد' },
  );
  if (response.success) {
    redirect(`/otp?mobile=${mobile}&callbackUrl=${callbackUrl}`);
  }
  return response;
}

export async function usersLogin(credentials: UsersLoginDTO) {
  return postApi<UsersLoginDTO, UsersLoginResponse>(`/${ENTITY}/Login`, {
    mobile: credentials.mobile,
    code: credentials.code,
  });
}
