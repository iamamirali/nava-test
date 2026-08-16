import NextAuth, { AuthError } from 'next-auth';
import { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { MutationState } from './api';
import { usersLogin } from '@/actions/Users';

export class CredentialsSigninError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.code = message;
  }
}

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

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        mobile: {},
        code: {},
      },

      async authorize(credentials) {
        const mobile = String(credentials.mobile ?? '');
        const code = String(credentials.code ?? '');

        if (!mobile || !code) {
          return null;
        }

        const result = await usersLogin({
          mobile,
          code,
        });

        if (!result.success || !result.value) {
          throw new CredentialsSigninError(result.message);
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
