"use client";

import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window),
      );
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    }, 0);
  }, []);

  if (isStandalone) {
    return null;
  }

  return (
    <div className="w-full bg-pink-50/50 border border-pink-100 p-6 rounded-2xl flex flex-col gap-4 items-center">
      <h3 className="text-pink-600 font-bold text-xl">نصب اپلیکیشن</h3>
      <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-md shadow-pink-200 hover:bg-pink-600 transition-colors">
        افزودن به صفحه اصلی
      </button>
      {isIOS && (
        <p className="text-pink-800 text-center mt-2 text-sm leading-relaxed bg-white p-4 rounded-xl shadow-sm">
          برای نصب در آیفون، روی دکمه اشتراک‌گذاری (Share){" "}
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>{" "}
          کلیک کنید و سپس گزینه <br />{" "}
          <strong>&quot;Add to Home Screen&quot;</strong>{" "}
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>{" "}
          را انتخاب کنید.
        </p>
      )}
    </div>
  );
}
