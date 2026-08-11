'use client';

import { useState, useEffect } from 'react';

export default function PushManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  async function registerServiceWorker() {
    try {
      await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      });
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if ('serviceWorker' in navigator) {
        setIsSupported(true);
        registerServiceWorker();
      }
    }, 0);
  }, []);

  if (!isSupported) {
    return (
      <p className="text-pink-800 bg-pink-50 p-4 rounded-xl text-center">
        مرورگر شما از هسته PWA پشتیبانی نمی‌کند.
      </p>
    );
  }

  return (
    <div className="w-full bg-pink-50/50 border border-pink-100 p-6 rounded-2xl flex flex-col gap-4 items-center">
      <h3 className="text-pink-600 font-bold text-xl">وضعیت اپلیکیشن ناوا</h3>
      {isRegistered ? (
        <p className="text-green-600 font-medium">هسته PWA با موفقیت راه‌اندازی شد.</p>
      ) : (
        <p className="text-pink-800">در حال راه‌اندازی سیستم...</p>
      )}
    </div>
  );
}
