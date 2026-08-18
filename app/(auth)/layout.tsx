import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 animate-ping rounded-full bg-pink-200 opacity-75" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-pink-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              </div>
            </div>

            <p className="text-sm font-medium text-pink-600">در حال بارگذاری...</p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
