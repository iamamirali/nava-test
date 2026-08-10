import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from '@/auth.config';
import { fetchApi } from './api';
import { UsersLoginResponse } from '@/actions/types';

export interface LoginCredentials {
  mobile: string;
  otp: string;
}

export async function loginApi(credentials: LoginCredentials) {
  return fetchApi<UsersLoginResponse>('/Users/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: credentials.mobile,
      code: credentials.otp,
    }),
  });
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        mobile: {},
        otp: {},
      },

      async authorize(credentials) {
        console.log(credentials);
        const mobile = String(credentials.mobile ?? '');
        const otp = String(credentials.otp ?? '');

        if (!mobile || !otp) {
          return null;
        }

        const result = await loginApi({
          mobile,
          otp,
        });

        if (!result.success || !result.value) {
          return null;
        }

        const { user, accessToken, refreshToken } = result.value;

        return {
          id: String(user.id),
          name: user.name,
          mobile: user.mobile,

          backendUser: user,

          accessToken: accessToken.token,
          accessTokenExpires: accessToken.expireDate,

          refreshToken: refreshToken.token,
          refreshTokenExpires: refreshToken.expireDate,
        };
      },
    }),
  ],
});
