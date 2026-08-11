import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      //   const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
      const isProtectedRoute =
        request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/pwa';

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
