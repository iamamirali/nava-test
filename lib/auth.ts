import NextAuth from 'next-auth';
import { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { usersLogin } from '@/actions/Users';

export class CredentialsSigninError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.code = message;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  trustHost: true,
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
