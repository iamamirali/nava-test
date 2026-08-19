'use client';

import { logoutUser } from '@/actions/Auth';
import { MutationState } from '@/lib/api';
import Link from 'next/link';
import { useActionState } from 'react';

const initialState: MutationState = { success: false, message: '', value: null };

export default function Home() {
  const [, formAction, pending] = useActionState(logoutUser, initialState);

  return (
    <main className="min-h-screen bg-primary-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white flex flex-col items-center p-8 rounded-3xl shadow-xl shadow-primary-100 border border-primary-100 gap-8">
        <h1 className="bg-primary-100 text-primary text-center text-4xl font-extrabold px-10 py-4 rounded-full w-full tracking-wide">
          سامانه ناوا
        </h1>

        <Link href="/pwa" className="text-white bg-primary p-2 rounded-xl">
          صفحه PWA
        </Link>

        <form action={formAction}>
          <button
            type="submit"
            disabled={pending}
            className="bg-primary text-white rounded-2xl p-2 cursor-pointer disabled:opacity-50"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}
