import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute =
        request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/pwa';

      if (isProtectedRoute) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
